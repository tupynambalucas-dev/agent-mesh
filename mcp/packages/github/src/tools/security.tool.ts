import { z } from 'zod';
import { getOctokitClient } from '../auth/github-app.auth.js';
import { config } from '../config.js';

export const listDependabotAlertsToolDefinition = {
  name: 'list_dependabot_alerts',
  description: 'List Dependabot security vulnerability alerts for a repository. Requires GitHub App or security manager permissions.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      state: { type: 'string', description: 'Filter alerts by state: open, fixed, dismissed, auto_dismissed', default: 'open' },
      severity: { type: 'string', description: 'Filter alerts by severity: low, medium, high, critical' },
    },
    required: ['repo'],
  },
};

export const listSecretScanningAlertsToolDefinition = {
  name: 'list_secret_scanning_alerts',
  description: 'List secret scanning alerts for a repository. Requires GitHub App with secret scanning permissions.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      state: { type: 'string', description: 'Filter by state: open, resolved', default: 'open' },
    },
    required: ['repo'],
  },
};

export async function handleListDependabotAlerts(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    state: z.string().optional().default('open'),
    severity: z.string().optional(),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient();

  const res = await octokit.request('GET /repos/{owner}/{repo}/dependabot/alerts', {
    owner: parsed.owner,
    repo: parsed.repo,
    state: parsed.state as 'open' | 'fixed' | 'dismissed' | 'auto_dismissed',
    ...(parsed.severity ? { severity: parsed.severity } : {}),
  });

  return {
    content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }],
  };
}

export async function handleListSecretScanningAlerts(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    state: z.string().optional().default('open'),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient();

  const res = await octokit.request('GET /repos/{owner}/{repo}/secret-scanning/alerts', {
    owner: parsed.owner,
    repo: parsed.repo,
    state: parsed.state as 'open' | 'resolved',
  });

  return {
    content: [{ type: 'text', text: JSON.stringify(res.data, null, 2) }],
  };
}
