import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const crawlToolDefinition = {
  name: 'crawl',
  description:
    'Crawls all accessible subpages of a website starting from a base URL, returning extracted content for all discovered pages.',
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
        description: 'Maximum link discovery depth to crawl',
      },
      allowExternalLinks: {
        type: 'boolean',
        description: 'Allow crawling external links outside the domain',
      },
      allowSubdomains: {
        type: 'boolean',
        description: 'Allow crawling subdomains of the base URL domain',
      },
      sitemap: {
        type: 'string',
        enum: ['include', 'skip', 'only'],
        description: 'How to handle sitemaps ("include", "skip", or "only")',
      },
      includePaths: {
        type: 'array',
        items: { type: 'string' },
        description: 'URL patterns/paths to include',
      },
      excludePaths: {
        type: 'array',
        items: { type: 'string' },
        description: 'URL patterns/paths to exclude',
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
  const result = await firecrawlClient.crawl(parsed.url, {
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
