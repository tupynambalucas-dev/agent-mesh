import { z } from 'zod';
import { memoryApiClient } from '../client/memory-api.client.js';

export const resolveGraphToolDefinition = {
  name: 'resolve_graph_entity',
  description:
    'Retrieves detailed node information and its connected context edges (e.g. BELONGS_TO, NEXT_CHUNK, DEPENDS_ON) using its graph ID. Use this to perform Graph-Sliding Window traversal when a vector search result is incomplete.',
  inputSchema: {
    type: 'object',
    properties: {
      entityId: {
        type: 'string',
        description: 'The unique ID of the graph node (entity) to resolve',
      },
    },
    required: ['entityId'],
  },
};

export const resolveGraphToolSchema = z.object({
  entityId: z.string(),
});

export async function handleResolveGraphTool(args: unknown) {
  const parsed = resolveGraphToolSchema.parse(args);
  const results = await memoryApiClient.queryGraph(parsed.entityId);
  return {
    content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
  };
}
