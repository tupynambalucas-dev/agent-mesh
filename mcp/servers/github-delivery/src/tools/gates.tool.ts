import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

const AUTHORIZED_HUMAN_LOGINS = new Set(['tupynambalucas', 'tupynambalucas-dev']);
const AUTHORIZED_BOT_LOGINS = new Set([
  'tupynambalucas-automation[bot]',
  'tupynambalucas-ci-bot[bot]',
  'dependabot[bot]',
]);
const ALLOWED_CHECK_CONCLUSIONS = new Set(['success', 'neutral', 'skipped']);
const CONVENTIONAL_TITLE_REGEX =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9._/-]+\))?!?: .{1,100}$/;
const EMOJI_REGEX =
  /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
const BOT_ALLOWED_PATHS: RegExp[] = [
  /(^|\/)CHANGELOG\.md$/,
  /(^|\/)package\.json$/,
  /(^|\/)pnpm-lock\.yaml$/,
  /(^|\/)pnpm-workspace\.yaml$/,
  /(^|\/)\.release-please-manifest\.json$/,
  /(^|\/)release-please-config\.json$/,
  /(^|\/)go\.mod$/,
  /(^|\/)go\.sum$/,
  /(^|\/)Cargo\.toml$/,
  /(^|\/)Cargo\.lock$/,
  /(^|\/)pyproject\.toml$/,
  /^\.github\/workflows\/[^/]+\.ya?ml$/,
];

export const evaluatePullRequestGatesToolDefinition = {
  name: 'evaluate_pull_request_gates',
  description:
    'Evaluate all 7 Enterprise Quality Gates (CI checks, SSH signatures, RBAC author, security alerts, Conventional Commits & Zero-Emoji, head SHA idempotency, bot file confinement) and optionally submit a formal APPROVE review under guardian.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      pull_number: { type: 'number', description: 'Pull request number' },
      approve: {
        type: 'boolean',
        description: 'When true and all 7 gates pass, submits an idempotent APPROVE review for head_sha',
        default: false,
      },
    },
    required: ['repo', 'pull_number'],
  },
};

export async function handleEvaluatePullRequestGates(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    pull_number: z.number(),
    approve: z.boolean().optional().default(false),
  });
  const parsed = schema.parse(args);

  const octokit = await getOctokitClient('guardian');

  const prRes = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
    owner: parsed.owner,
    repo: parsed.repo,
    pull_number: parsed.pull_number,
  });
  const pr = prRes.data;
  const headSha = pr.head.sha;
  const authorLogin = pr.user?.login || 'unknown';
  const isBot = authorLogin.endsWith('[bot]') || AUTHORIZED_BOT_LOGINS.has(authorLogin);

  const [checksRes, commitsRes, reviewsRes] = await Promise.all([
    octokit.request('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
      owner: parsed.owner,
      repo: parsed.repo,
      ref: headSha,
      per_page: 100,
    }),
    octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', {
      owner: parsed.owner,
      repo: parsed.repo,
      pull_number: parsed.pull_number,
      per_page: 100,
    }),
    octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
      owner: parsed.owner,
      repo: parsed.repo,
      pull_number: parsed.pull_number,
      per_page: 100,
    }),
  ]);

  // Gate 1: CI Status Checks & Mergeability
  const checkRuns = checksRes.data.check_runs || [];
  const failingChecks = checkRuns.filter(
    (c: { conclusion: string | null }) => c.conclusion !== null && !ALLOWED_CHECK_CONCLUSIONS.has(c.conclusion)
  );
  const pendingChecks = checkRuns.filter((c: { status: string }) => c.status !== 'completed');
  const reviews = reviewsRes.data || [];
  const changesRequested = reviews.filter((r: { state: string }) => r.state === 'CHANGES_REQUESTED');
  const gate1Passed =
    pr.mergeable !== false &&
    failingChecks.length === 0 &&
    pendingChecks.length === 0 &&
    changesRequested.length === 0;

  // Gate 2: Cryptographic SSH Signatures
  const commits = commitsRes.data || [];
  const unverifiedCommits = commits
    .filter((c: { commit: { verification?: { verified?: boolean } } }) => c.commit.verification?.verified !== true)
    .map((c: { sha: string }) => c.sha.slice(0, 7));
  const gate2Passed = commits.length > 0 && unverifiedCommits.length === 0;

  // Gate 3: RBAC Membership Authorization
  const gate3Passed = AUTHORIZED_HUMAN_LOGINS.has(authorLogin) || AUTHORIZED_BOT_LOGINS.has(authorLogin);

  // Gate 4: Security Alerts (non-blocking if scope unavailable, blocks on open secret scanning alerts)
  let openSecretAlerts = 0;
  let openHighDependabotAlerts = 0;
  try {
    const secRes = await octokit.request('GET /repos/{owner}/{repo}/secret-scanning/alerts', {
      owner: parsed.owner,
      repo: parsed.repo,
      state: 'open',
      per_page: 10,
    });
    openSecretAlerts = Array.isArray(secRes.data) ? secRes.data.length : 0;
  } catch {
    // Scope or feature not enabled
  }
  try {
    const depRes = await octokit.request('GET /repos/{owner}/{repo}/dependabot/alerts', {
      owner: parsed.owner,
      repo: parsed.repo,
      state: 'open',
      severity: 'high,critical',
      per_page: 10,
    });
    openHighDependabotAlerts = Array.isArray(depRes.data) ? depRes.data.length : 0;
  } catch {
    // Scope or feature not enabled
  }
  const gate4Passed = openSecretAlerts === 0;

  // Gate 5: Conventional Commits & Zero-Emoji
  const prTitle = pr.title || '';
  const prBody = pr.body || '';
  const commitHeadlines = commits.map(
    (c: { commit: { message: string } }) => (c.commit.message || '').split('\n')[0] || ''
  );
  const titleValid = prTitle.length <= 100 && CONVENTIONAL_TITLE_REGEX.test(prTitle);
  const emojiFound =
    EMOJI_REGEX.test(prTitle) ||
    EMOJI_REGEX.test(prBody) ||
    commitHeadlines.some((h: string) => EMOJI_REGEX.test(h));
  const gate5Passed = titleValid && !emojiFound;

  // Gate 7: Bot File Confinement
  let gate7Passed = true;
  let disallowedBotFiles: string[] = [];
  if (isBot) {
    const filesRes = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
      owner: parsed.owner,
      repo: parsed.repo,
      pull_number: parsed.pull_number,
      per_page: 100,
    });
    const filenames = (filesRes.data || []).map((f: { filename: string }) => f.filename);
    disallowedBotFiles = filenames.filter(
      (fp: string) => !BOT_ALLOWED_PATHS.some((pattern) => pattern.test(fp))
    );
    gate7Passed = filenames.length > 0 && disallowedBotFiles.length === 0;
  }

  // Gate 6: Head SHA Idempotency & Optional Approval
  const alreadyApprovedForHead = reviews.some(
    (r: { state: string; commit_id?: string | null }) =>
      r.state === 'APPROVED' && r.commit_id === headSha
  );

  const allPassed =
    gate1Passed && gate2Passed && gate3Passed && gate4Passed && gate5Passed && gate7Passed;

  let reviewSubmitted = false;
  if (parsed.approve && allPassed && !alreadyApprovedForHead) {
    await octokit.request('POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
      owner: parsed.owner,
      repo: parsed.repo,
      pull_number: parsed.pull_number,
      commit_id: headSha,
      event: 'APPROVE',
      body: `Automated 7-Gate Quality Verification: PASSED for head SHA \`${headSha}\`.`,
    });
    reviewSubmitted = true;
  }

  return formatMcpResponse({
    pull_number: parsed.pull_number,
    head_sha: headSha,
    author: authorLogin,
    mergeable: pr.mergeable,
    mergeable_state: pr.mergeable_state,
    gate_verdict: allPassed ? 'PASSED' : 'BLOCKED',
    review_submitted: reviewSubmitted,
    already_approved_for_head: alreadyApprovedForHead,
    gates: {
      ci: {
        status: gate1Passed ? 'PASS' : 'FAIL',
        total_check_runs: checkRuns.length,
        failing_checks: failingChecks.map((c: { name: string; conclusion: string | null }) => ({
          name: c.name,
          conclusion: c.conclusion,
        })),
        pending_checks: pendingChecks.map((c: { name: string; status: string }) => ({
          name: c.name,
          status: c.status,
        })),
      },
      signatures: {
        status: gate2Passed ? 'PASS' : 'FAIL',
        total_commits: commits.length,
        unverified_commits: unverifiedCommits,
      },
      rbac: {
        status: gate3Passed ? 'PASS' : 'FAIL',
        author: authorLogin,
      },
      security: {
        status: gate4Passed ? 'PASS' : 'FAIL',
        open_secret_scanning_alerts: openSecretAlerts,
        open_high_critical_dependabot_alerts: openHighDependabotAlerts,
      },
      semantic: {
        status: gate5Passed ? 'PASS' : 'FAIL',
        conventional_title: titleValid,
        zero_emoji: !emojiFound,
      },
      head_sha: {
        status: 'PASS',
        commit_id: headSha,
        already_approved: alreadyApprovedForHead,
      },
      bot_confinement: {
        status: gate7Passed ? 'PASS' : 'FAIL',
        is_bot: isBot,
        disallowed_files: disallowedBotFiles,
      },
    },
  });
}
