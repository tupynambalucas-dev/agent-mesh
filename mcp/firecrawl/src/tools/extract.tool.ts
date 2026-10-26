import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const extractToolDefinition = {
  name: 'extract',
  description: 'Uses Firecrawl AI extraction capabilities to extract structured, schema-compliant JSON data from one or more URLs.',
  inputSchema: {
    type: 'object',
    properties: {
      urls: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of URLs to extract information from',
      },
      prompt: {
        type: 'string',
        description: 'Natural language instructions on what to extract',
      },
      schema: {
        type: 'object',
        description: 'Optional JSON Schema defining the desired return format',
      },
      systemPrompt: {
        type: 'string',
        description: 'System-level prompt to customize AI extraction behavior',
      },
      allowExternalLinks: {
        type: 'boolean',
        description: 'Whether to allow extraction from external domains',
      },
    },
    required: ['urls'],
  },
};

export const extractToolSchema = z.object({
  urls: z.array(z.string()).describe('Array of URLs to extract information from'),
  prompt: z.string().optional(),
  schema: z.record(z.string(), z.unknown()).optional(),
  systemPrompt: z.string().optional(),
  allowExternalLinks: z.boolean().optional(),
});

export async function handleExtractTool(args: unknown) {
  const parsed = extractToolSchema.parse(args);
  const result = await (firecrawlClient as any).asyncExtract(parsed.urls, {
    prompt: parsed.prompt,
    schema: parsed.schema,
    systemPrompt: parsed.systemPrompt,
    allowExternalLinks: parsed.allowExternalLinks,
  });

  return {
    content: [
      { type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) },
    ],
  };
}
