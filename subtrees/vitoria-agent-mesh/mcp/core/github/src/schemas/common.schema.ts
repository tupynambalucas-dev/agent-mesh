import { z } from 'zod';
import { config } from '../config.js';

export const ownerRepoSchema = z.object({
  owner: z.string().optional().default(config.GITHUB_ORG),
  repo: z.string(),
});

export function formatMcpResponse(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  };
}

export function formatMcpError(toolName: string, err: unknown) {
  const errorMessage = err instanceof Error ? err.message : String(err);
  return {
    isError: true,
    content: [{ type: 'text' as const, text: `Error executing GitHub tool '${toolName}': ${errorMessage}` }],
  };
}
