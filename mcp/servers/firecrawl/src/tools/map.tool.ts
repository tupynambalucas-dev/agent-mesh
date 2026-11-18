import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const mapToolDefinition = {
  name: 'map',
  description: 'Fast endpoint to map and retrieve all discoverable links on a website without extracting page bodies.',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The website URL to map',
      },
      search: {
        type: 'string',
        description: 'Optional search keyword to filter discovered paths',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of links to return (default: 100)',
      },
      sitemap: {
        type: 'string',
        enum: ['include', 'skip', 'only'],
        description: 'Sitemap parsing strategy',
      },
      includeSubdomains: {
        type: 'boolean',
        description: 'Whether to include links on subdomains',
      },
    },
    required: ['url'],
  },
};

export const mapToolSchema = z.object({
  url: z.string().describe('The website URL to map'),
  search: z.string().optional(),
  limit: z.number().optional().default(100),
  sitemap: z.enum(['include', 'skip', 'only']).optional(),
  includeSubdomains: z.boolean().optional(),
});

export async function handleMapTool(args: unknown) {
  const parsed = mapToolSchema.parse(args);
  const result = await (firecrawlClient as any).mapUrl(parsed.url, {
    search: parsed.search,
    limit: parsed.limit,
    sitemap: parsed.sitemap,
    includeSubdomains: parsed.includeSubdomains,
  });

  return {
    content: [
      { type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) },
    ],
  };
}
