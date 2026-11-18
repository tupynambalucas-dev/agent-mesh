import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const crawlToolDefinition = {
  name: 'crawl',
  description: 'Initiates a website crawl starting from a base URL, discovering and extracting content across linked sub-pages.',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The starting base URL for the crawl',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of pages to crawl (default: 10)',
      },
      maxDiscoveryDepth: {
        type: 'number',
        description: 'Maximum depth level to traverse links',
      },
      allowExternalLinks: {
        type: 'boolean',
        description: 'Whether to traverse outbound external domain links',
      },
      allowSubdomains: {
        type: 'boolean',
        description: 'Whether to traverse subdomains of the base URL',
      },
      sitemap: {
        type: 'string',
        enum: ['include', 'skip', 'only'],
        description: 'Sitemap discovery mode',
      },
      includePaths: {
        type: 'array',
        items: { type: 'string' },
        description: 'URL path patterns to explicitly include',
      },
      excludePaths: {
        type: 'array',
        items: { type: 'string' },
        description: 'URL path patterns to explicitly exclude',
      },
    },
    required: ['url'],
  },
};

export const crawlToolSchema = z.object({
  url: z.string().describe('The starting base URL for the crawl'),
  limit: z.number().optional().default(10),
  maxDiscoveryDepth: z.number().optional(),
  allowExternalLinks: z.boolean().optional(),
  allowSubdomains: z.boolean().optional(),
  sitemap: z.enum(['include', 'skip', 'only']).optional(),
  includePaths: z.array(z.string()).optional(),
  excludePaths: z.array(z.string()).optional(),
});

export async function handleCrawlTool(args: unknown) {
  const parsed = crawlToolSchema.parse(args);
  const result = await (firecrawlClient as any).crawlUrl(parsed.url, {
    limit: parsed.limit,
    maxDiscoveryDepth: parsed.maxDiscoveryDepth,
    allowExternalLinks: parsed.allowExternalLinks,
    allowSubdomains: parsed.allowSubdomains,
    sitemap: parsed.sitemap,
    includePaths: parsed.includePaths,
    excludePaths: parsed.excludePaths,
    scrapeOptions: {
      formats: ['markdown'],
    },
  });

  return {
    content: [
      { type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) },
    ],
  };
}
