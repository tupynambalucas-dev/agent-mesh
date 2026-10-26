import { z } from 'zod';
import { memoryApiClient } from '../client/memory-api.client.js';

export const graphToolDefinition = {
  name: 'query_graph',
  description: 'Queries relationl associative graph nodes and connections in Cortex Memory.',
  inputSchema: {
    type: 'object',
    properties: {
      entityId: { type: 'string', description: 'Central entity ID or subject name' },
      maxDepth: { type: 'number', description: 'Graph traversal depth (default: 2)' },
    },
    required: ['entityId'],
  },
};

export const graphToolSchema = z.object({
  entityId: z.string(),
  maxDepth: z.number().optional().default(2),
});

export async function handleGraphTool(args: unknown) {
  const parsed = graphToolSchema.parse(args);
  const result = await memoryApiClient.queryGraph(parsed.entityId, parsed.maxDepth);
  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
  };
}
