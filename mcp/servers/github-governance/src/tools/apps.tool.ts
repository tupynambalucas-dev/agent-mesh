import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
  getAppJwtOctokit,
} from '@tupynambalucas-dev/mcp-core-github';

export const auditGithubAppsToolDefinition = {
  name: 'audit_github_apps',
  description: 'Audit GitHub Apps metadata, installations, permissions, and declarative alignment across the organization.',
  inputSchema: {
    type: 'object',
    properties: {
      org: { type: 'string', description: 'Organization name (defaults to GITHUB_ORG)' },
    },
  },
};

export async function handleAuditGithubApps(args: unknown) {
  const schema = z.object({
    org: z.string().optional().default(config.GITHUB_ORG),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('org-manager');

  try {
    const res = await octokit.request('GET /orgs/{org}/installations', {
      org: parsed.org,
    });
    return formatMcpResponse(res.data);
  } catch {
    // If org installations list endpoint requires specific permissions or fails, attempt app-level check
    const appOctokit = await getAppJwtOctokit('org-manager');
    if (appOctokit) {
      const appRes = await appOctokit.request('GET /app');
      return formatMcpResponse({ app: appRes.data, note: 'Retrieved app-level metadata via JWT' });
    }
    throw new Error('Unable to list organization installations or retrieve app metadata.');
  }
}
