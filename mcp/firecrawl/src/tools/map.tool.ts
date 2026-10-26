import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const mapToolDefinition = {
  name: 'map',
  description: 'Maps and discovers all indexed URLs and sitemap routes for a given website.',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The URL of the website to map',
      },
      search: {
        type: 'string',
        description: 'Search query to filter discovered URLs',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of URLs to return (default: 50)',
      },
      sitemap: {
        type: 'string',
        enum: ['include', 'skip', 'only'],
        description: 'How to handle sitemaps ("include", "skip", or "only")',
      },
      includeSubdomains: {
        type: 'boolean',
        description: 'Include links to subdomains',
      },
    },
    required: ['url'],
  },
};

export const mapToolSchema = z.object({
  url: z.string().describe('The URL of the website to map'),
  search: z.string().optional(),
  limit: z.number().optional().default(50),
  sitemap: z.enum(['include', 'skip', 'only']).optional(),
  includeSubdomains: z.boolean().optional(),
});

export async function handleMapTool(args: unknown) {
  const parsed = mapToolSchema.parse(args);
  const result = await firecrawlClient.map(parsed.url, {
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
