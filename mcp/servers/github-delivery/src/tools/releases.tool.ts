import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

export const listReleasesToolDefinition = {
  name: 'list_releases',
  description: 'List GitHub releases published for a repository with tag names, release notes, and assets.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      per_page: { type: 'number', description: 'Results per page (max 100)', default: 30 },
    },
    required: ['repo'],
  },
};

export async function handleListReleases(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    per_page: z.number().optional().default(30),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('automation');

  const res = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: parsed.owner,
    repo: parsed.repo,
    per_page: parsed.per_page,
  });

  return formatMcpResponse(res.data);
}
