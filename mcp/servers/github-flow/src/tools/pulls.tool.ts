import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

export const listPullRequestsToolDefinition = {
  name: 'list_pull_requests',
  description: 'List pull requests in a repository filtered by state, head, or base branch.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      state: { type: 'string', description: 'Filter by state: open, closed, all', default: 'open' },
      base: { type: 'string', description: 'Filter by base branch name (e.g. main)' },
      per_page: { type: 'number', description: 'Results per page (max 100)', default: 30 },
    },
    required: ['repo'],
  },
};

export const getPullRequestToolDefinition = {
  name: 'get_pull_request',
  description: 'Retrieve detailed status, mergeability, and branch metadata for a specific pull request.',
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

export async function handleListPullRequests(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    state: z.enum(['open', 'closed', 'all']).optional().default('open'),
    base: z.string().optional(),
    per_page: z.number().optional().default(30),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('developer-tools');

  const res = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: parsed.owner,
    repo: parsed.repo,
    state: parsed.state,
    ...(parsed.base ? { base: parsed.base } : {}),
    per_page: parsed.per_page,
  });

  return formatMcpResponse(res.data);
}

export async function handleGetPullRequest(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    pull_number: z.number(),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('developer-tools');

  const res = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
    owner: parsed.owner,
    repo: parsed.repo,
    pull_number: parsed.pull_number,
  });

  return formatMcpResponse(res.data);
}
