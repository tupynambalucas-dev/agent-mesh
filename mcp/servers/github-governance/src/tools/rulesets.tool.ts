import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

export const listRulesetsToolDefinition = {
  name: 'list_rulesets',
  description: 'List branch and tag protection rulesets for a repository or organization.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      includes_parents: { type: 'boolean', description: 'Include org-level rulesets', default: true },
    },
    required: ['repo'],
  },
};

export const getRulesetToolDefinition = {
  name: 'get_ruleset',
  description: 'Retrieve details of a specific ruleset by ID.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      ruleset_id: { type: 'number', description: 'The unique ruleset identifier' },
    },
    required: ['repo', 'ruleset_id'],
  },
};

export async function handleListRulesets(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    includes_parents: z.boolean().optional().default(true),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('org-manager');

  const res = await octokit.request('GET /repos/{owner}/{repo}/rulesets', {
    owner: parsed.owner,
    repo: parsed.repo,
    includes_parents: parsed.includes_parents,
  });

  return formatMcpResponse(res.data);
}

export async function handleGetRuleset(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    ruleset_id: z.number(),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('org-manager');

  const res = await octokit.request('GET /repos/{owner}/{repo}/rulesets/{ruleset_id}', {
    owner: parsed.owner,
    repo: parsed.repo,
    ruleset_id: parsed.ruleset_id,
  });

  return formatMcpResponse(res.data);
}
