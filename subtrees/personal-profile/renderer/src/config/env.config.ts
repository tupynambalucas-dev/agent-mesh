import dotenv from 'dotenv';
import ProjectConfig from '../../../project.config.js';

dotenv.config();

const fallbackOwner = ProjectConfig.REPOSITORY_OWNER;
const fallbackRepo = ProjectConfig.REPOSITORY_NAME;

const githubRepo = process.env.GITHUB_REPOSITORY ?? `${fallbackOwner}/${fallbackRepo}`;
const [owner, name] = githubRepo.split('/');

/**
 * Parses a comma-separated string or a JSON array into a trimmed string array.
 */
function parseList(val: string | undefined): string[] {
  if (val === undefined || val.trim().length === 0) return [];
  const trimmed = val.trim();
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // Fall back to comma-delimited string parsing
  }
  return trimmed
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export const config = {
  // Only the token MUST come from the environment (secrets)
  githubToken: process.env.RENDERER_GH_PAT ?? '',

  // Resolve dynamically in CI or fallback to the local default from project.config
  repositoryOwner: owner || fallbackOwner,
  repositoryName: name || fallbackRepo,
  targetBranch: process.env.TARGET_BRANCH ?? 'main',

  // Glob patterns to filter repositories and languages from statistics cards
  // Accepts comma-separated values ("repo1, repo2, *temp*") or JSON arrays ('["repo1", "*temp*"]')
  excludeRepos: parseList(process.env.EXCLUDE_REPOS),
  excludeLangs: parseList(process.env.EXCLUDE_LANGS),
  excludePrivate: process.env.EXCLUDE_PRIVATE === 'true',

  isGitHubAction: process.env.GITHUB_ACTIONS === 'true',
  maxRetries: 3,
};
