import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

export const getRepoInfoToolDefinition = {
  name: 'get_repo_info',
  description: 'Retrieve detailed repository information, default branch, permissions, and visibility.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
    },
    required: ['repo'],
  },
};

export const listBranchesToolDefinition = {
  name: 'list_branches',
  description: 'List branches for a repository with protection status and head commit SHA.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      protected: { type: 'boolean', description: 'Filter by branch protection status' },
      per_page: { type: 'number', description: 'Results per page (max 100)', default: 30 },
    },
    required: ['repo'],
  },
};

export async function handleGetRepoInfo(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('developer-tools');

  const res = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: parsed.owner,
    repo: parsed.repo,
  });

  return formatMcpResponse(res.data);
}

export async function handleListBranches(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    protected: z.boolean().optional(),
    per_page: z.number().optional().default(30),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('developer-tools');

  const res = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner: parsed.owner,
    repo: parsed.repo,
    ...(parsed.protected !== undefined ? { protected: parsed.protected } : {}),
    per_page: parsed.per_page,
  });

  return formatMcpResponse(res.data);
}
