import { z } from 'zod';
import { memoryApiClient } from '../client/memory-api.client.js';

export const ingestToolDefinition = {
  name: 'ingest_document',
  description: 'Ingests a document to be chunked, embedded, and indexed into MongoDB vector store.',
  inputSchema: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'Document title' },
      content: { type: 'string', description: 'Raw document text or markdown content' },
      source: { type: 'string', description: 'Source URL or origin identifier' },
    },
    required: ['title', 'content'],
  },
};

export const ingestToolSchema = z.object({
  title: z.string(),
  content: z.string(),
  source: z.string().optional(),
});

export async function handleIngestTool(args: unknown) {
  const parsed = ingestToolSchema.parse(args);
  const result = await memoryApiClient.ingestDocument(parsed.title, parsed.content, parsed.source);
  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
  };
}
