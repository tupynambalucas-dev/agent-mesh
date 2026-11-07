import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { formatMcpError } from '@tupynambalucas-dev/mcp-core-github';
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
import {
  listOrgTeamsToolDefinition,
  handleListOrgTeams,
} from './teams.tool.js';

export const allTools = [
  getRepoInfoToolDefinition,
  listOrgReposToolDefinition,
  listOrgTeamsToolDefinition,
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
        case 'list_org_teams':
          return await handleListOrgTeams(args);
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
      return formatMcpError(name, err);
    }
  });
}
