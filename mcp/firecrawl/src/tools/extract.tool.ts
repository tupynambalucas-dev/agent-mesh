import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const extractToolDefinition = {
  name: 'extract',
  description:
    'Extracts structured information from one or more web pages matching a JSON schema or prompt.',
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
        description: 'Natural language prompt describing what to extract',
      },
      schema: {
        type: 'object',
        description: 'JSON Schema object describing the output shape',
      },
      systemPrompt: {
        type: 'string',
        description: 'System prompt instructions for extraction',
      },
      allowExternalLinks: {
        type: 'boolean',
        description: 'Allow following external links during extraction',
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
  const result = await firecrawlClient.v1.extract(parsed.urls, {
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
