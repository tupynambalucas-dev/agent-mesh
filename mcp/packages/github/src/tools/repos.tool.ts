import { z } from 'zod';
import { getOctokitClient } from '../auth/github-app.auth.js';
import { config } from '../config.js';

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

export const listOrgReposToolDefinition = {
  name: 'list_org_repos',
  description: 'List all repositories under the organization with visibility and branch status.',
  inputSchema: {
    type: 'object',
    properties: {
      org: { type: 'string', description: 'Organization name (defaults to GITHUB_ORG)' },
      type: { type: 'string', description: 'Filter by type: all, public, private, forks', default: 'all' },
      per_page: { type: 'number', description: 'Results per page (max 100)', default: 30 },
    },
  },
};

export async function handleGetRepoInfo(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient();

  const res = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: parsed.owner,
    repo: parsed.repo,
  });

  return {
    content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }],
  };
}

export async function handleListOrgRepos(args: unknown) {
  const schema = z.object({
    org: z.string().optional().default(config.GITHUB_ORG),
    type: z.string().optional().default('all'),
    per_page: z.number().optional().default(30),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient();

  const res = await octokit.request('GET /orgs/{org}/repos', {
    org: parsed.org,
    type: parsed.type as 'all' | 'public' | 'private' | 'forks',
    per_page: parsed.per_page,
  });

  return {
    content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }],
  };
}
