import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
  getRepoInfoToolDefinition,
  handleGetRepoInfo,
  listOrgReposToolDefinition,
  handleListOrgRepos,
} from './repos.tool.js';
import {
  listRulesetsToolDefinition,
  handleListRulesets,
  getRulesetToolDefinition,
  handleGetRuleset,
} from './rulesets.tool.js';
import {
  listDependabotAlertsToolDefinition,
  handleListDependabotAlerts,
  listSecretScanningAlertsToolDefinition,
  handleListSecretScanningAlerts,
} from './security.tool.js';

export const allTools = [
  getRepoInfoToolDefinition,
  listOrgReposToolDefinition,
  listRulesetsToolDefinition,
  getRulesetToolDefinition,
  listDependabotAlertsToolDefinition,
  listSecretScanningAlertsToolDefinition,
];

export function registerToolHandlers(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, () => {
    return Promise.resolve({ tools: allTools });
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'get_repo_info':
          return await handleGetRepoInfo(args);
        case 'list_org_repos':
          return await handleListOrgRepos(args);
        case 'list_rulesets':
          return await handleListRulesets(args);
        case 'get_ruleset':
          return await handleGetRuleset(args);
        case 'list_dependabot_alerts':
          return await handleListDependabotAlerts(args);
        case 'list_secret_scanning_alerts':
          return await handleListSecretScanningAlerts(args);
        default:
          throw new Error(`Unknown tool requested: ${name}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        isError: true,
        content: [{ type: 'text', text: `Error executing GitHub tool '${name}': ${errorMessage}` }],
      };
    }
  });
}
