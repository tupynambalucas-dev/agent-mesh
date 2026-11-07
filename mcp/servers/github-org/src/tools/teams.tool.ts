import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

export const listOrgTeamsToolDefinition = {
  name: 'list_org_teams',
  description: 'List teams in the organization with slugs, privacy levels, and descriptions.',
  inputSchema: {
    type: 'object',
    properties: {
      org: { type: 'string', description: 'Organization name (defaults to GITHUB_ORG)' },
      per_page: { type: 'number', description: 'Results per page (max 100)', default: 30 },
    },
  },
};

export async function handleListOrgTeams(args: unknown) {
  const schema = z.object({
    org: z.string().optional().default(config.GITHUB_ORG),
    per_page: z.number().optional().default(30),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('org-manager');

  const res = await octokit.request('GET /orgs/{org}/teams', {
    org: parsed.org,
    per_page: parsed.per_page,
  });

  return formatMcpResponse(res.data);
}
