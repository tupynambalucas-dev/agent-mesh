import { z } from 'zod';
import { memoryApiClient } from '../client/memory-api.client.js';

export const searchToolDefinition = {
  name: 'search_knowledge',
  description:
    'Executes Hybrid RAG vector search over indexed documents and memory planes in Cortex Memory. ALWAYS call this tool BEFORE assuming system architecture, code structures, or rewriting documents. You can use exact keyword terms or semantic questions.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Semantic search prompt or exact keywords' },
      limit: { type: 'number', description: 'Maximum number of results to retrieve (default: 5)' },
      minScore: {
        type: 'number',
        description: 'Minimum similarity score threshold (default: 0.7)',
      },
      filter: {
        type: 'object',
        description:
          'Dynamic Meta-Filtering constraints. Keys: workspace (e.g. cortex, platform), diataxis_type (e.g. reference, explanation, tutorial), tags (e.g. fastify, proxy).',
        additionalProperties: true,
      },
    },
    required: ['query'],
  },
};

export const searchToolSchema = z.object({
  query: z.string(),
  limit: z.number().optional().default(5),
  minScore: z.number().optional().default(0.7),
  filter: z.record(z.string(), z.unknown()).optional(),
});

export async function handleSearchTool(args: unknown) {
  const parsed = searchToolSchema.parse(args);
  const results = await memoryApiClient.searchKnowledge(
    parsed.query,
    parsed.limit,
    parsed.minScore,
    parsed.filter,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
  };
}
