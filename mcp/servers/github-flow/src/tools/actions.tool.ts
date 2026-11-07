import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
} from '@tupynambalucas-dev/mcp-core-github';

export const listWorkflowRunsToolDefinition = {
  name: 'list_workflow_runs',
  description: 'List GitHub Actions workflow runs for a repository with status and conclusion filters.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      branch: { type: 'string', description: 'Filter workflow runs by branch name' },
      status: {
        type: 'string',
        description: 'Filter by status: completed, action_required, cancelled, failure, neutral, skipped, stale, success, timed_out, in_progress, queued, requested, waiting, pending',
      },
      per_page: { type: 'number', description: 'Results per page (max 100)', default: 20 },
    },
    required: ['repo'],
  },
};

export const getWorkflowRunToolDefinition = {
  name: 'get_workflow_run',
  description: 'Retrieve detailed execution status, conclusion, and timing for a specific GitHub Actions workflow run.',
  inputSchema: {
    type: 'object',
    properties: {
      owner: { type: 'string', description: 'Repository owner (defaults to GITHUB_ORG)' },
      repo: { type: 'string', description: 'Repository name' },
      run_id: { type: 'number', description: 'Unique identifier of the workflow run' },
    },
    required: ['repo', 'run_id'],
  },
};

export async function handleListWorkflowRuns(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    branch: z.string().optional(),
    status: z.string().optional(),
    per_page: z.number().optional().default(20),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('developer-tools');

  const res = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
    owner: parsed.owner,
    repo: parsed.repo,
    ...(parsed.branch ? { branch: parsed.branch } : {}),
    ...(parsed.status ? { status: parsed.status as never } : {}),
    per_page: parsed.per_page,
  });

  return formatMcpResponse(res.data);
}

export async function handleGetWorkflowRun(args: unknown) {
  const schema = z.object({
    owner: z.string().optional().default(config.GITHUB_ORG),
    repo: z.string(),
    run_id: z.number(),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('developer-tools');

  const res = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}', {
    owner: parsed.owner,
    repo: parsed.repo,
    run_id: parsed.run_id,
  });

  return formatMcpResponse(res.data);
}
