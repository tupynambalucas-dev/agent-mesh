import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const searchToolDefinition = {
  name: 'search',
  description:
    'Searches the web via Firecrawl and returns relevant search results with page summaries and clean markdown content.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query string',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of search results to return (default: 5)',
      },
      location: {
        type: 'string',
        description: 'Location country code or region (e.g. "US", "BR")',
      },
      includeDomains: {
        type: 'array',
        items: { type: 'string' },
        description: 'Domains to include in the search',
      },
      excludeDomains: {
        type: 'array',
        items: { type: 'string' },
        description: 'Domains to exclude from the search',
      },
      scrapeResults: {
        type: 'boolean',
        description:
          'Whether to scrape and return full markdown content for the top results (default: true)',
      },
    },
    required: ['query'],
  },
};

export const searchToolSchema = z.object({
  query: z.string().describe('Search query string'),
  limit: z.number().optional().default(5),
  location: z.string().optional(),
  includeDomains: z.array(z.string()).optional(),
  excludeDomains: z.array(z.string()).optional(),
  scrapeResults: z.boolean().optional().default(true),
});

export async function handleSearchTool(args: unknown) {
  const parsed = searchToolSchema.parse(args);
  const result = await firecrawlClient.search(parsed.query, {
    limit: parsed.limit,
    location: parsed.location,
    includeDomains: parsed.includeDomains,
    excludeDomains: parsed.excludeDomains,
    scrapeOptions: parsed.scrapeResults ? { formats: ['markdown'] } : undefined,
  });

  return {
    content: [
      { type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) },
    ],
  };
}
