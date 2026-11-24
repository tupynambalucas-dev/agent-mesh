import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

export const evaluatePullRequestGatesToolDefinition = {
  name: 'evaluate_pull_request_gates',
  description: 'Evaluate quality gates, check runs, reviews, and branch rulesets compliance for a specific pull request.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      pull_number: { type: 'number', description: 'Pull request number' },
    },
    required: ['repo', 'pull_number'],
  },
};

export async function handleEvaluatePullRequestGates(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    pull_number: z.number(),
  });
  const parsed = schema.parse(args);

  // Use guardian identity if available, fallback to developer-tools/automation
  const octokit = await getOctokitClient('guardian');

  // 1. Get PR details
  const prRes = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
    owner: parsed.owner,
    repo: parsed.repo,
    pull_number: parsed.pull_number,
  });
  const pr = prRes.data;

  // 2. Get check runs for head commit
  const checksRes = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
    owner: parsed.owner,
    repo: parsed.repo,
    ref: pr.head.sha,
  });

  // 3. Get reviews
  const reviewsRes = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
    owner: parsed.owner,
    repo: parsed.repo,
    pull_number: parsed.pull_number,
  });

  const checkRuns = checksRes.data.check_runs || [];
  const failingChecks = checkRuns.filter(
    (c: { conclusion: string | null }) => c.conclusion === 'failure' || c.conclusion === 'timed_out'
  );
  const pendingChecks = checkRuns.filter(
    (c: { status: string }) => c.status !== 'completed'
  );

  const reviews = reviewsRes.data || [];
  const approvals = reviews.filter((r: { state: string }) => r.state === 'APPROVED');
  const changesRequested = reviews.filter((r: { state: string }) => r.state === 'CHANGES_REQUESTED');

  const passed =
    pr.mergeable !== false &&
    failingChecks.length === 0 &&
    pendingChecks.length === 0 &&
    changesRequested.length === 0;

  return formatMcpResponse({
    pull_number: parsed.pull_number,
    head_sha: pr.head.sha,
    mergeable: pr.mergeable,
    mergeable_state: pr.mergeable_state,
    gate_verdict: passed ? 'PASSED' : 'BLOCKED',
    summary: {
      total_check_runs: checkRuns.length,
      failing_checks: failingChecks.map((c: { name: string; conclusion: string | null }) => ({
        name: c.name,
        conclusion: c.conclusion,
      })),
      pending_checks: pendingChecks.map((c: { name: string; status: string }) => ({
        name: c.name,
        status: c.status,
      })),
      approvals_count: approvals.length,
      changes_requested_count: changesRequested.length,
    },
  });
}
