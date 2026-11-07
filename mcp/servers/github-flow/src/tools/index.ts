import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { formatMcpError } from '@tupynambalucas-dev/mcp-core-github';
import {
  getRepoInfoToolDefinition,
  handleGetRepoInfo,
  listBranchesToolDefinition,
  handleListBranches,
} from './repos.tool.js';
import {
  listPullRequestsToolDefinition,
  handleListPullRequests,
  getPullRequestToolDefinition,
  handleGetPullRequest,
} from './pulls.tool.js';
import {
  listWorkflowRunsToolDefinition,
  handleListWorkflowRuns,
  getWorkflowRunToolDefinition,
  handleGetWorkflowRun,
} from './actions.tool.js';

export const allTools = [
  getRepoInfoToolDefinition,
  listBranchesToolDefinition,
  listPullRequestsToolDefinition,
  getPullRequestToolDefinition,
  listWorkflowRunsToolDefinition,
  getWorkflowRunToolDefinition,
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
        case 'list_branches':
          return await handleListBranches(args);
        case 'list_pull_requests':
          return await handleListPullRequests(args);
        case 'get_pull_request':
          return await handleGetPullRequest(args);
        case 'list_workflow_runs':
          return await handleListWorkflowRuns(args);
        case 'get_workflow_run':
          return await handleGetWorkflowRun(args);
        default:
          throw new Error(`Unknown tool requested: ${name}`);
      }
    } catch (err: unknown) {
      return formatMcpError(name, err);
    }
  });
}
