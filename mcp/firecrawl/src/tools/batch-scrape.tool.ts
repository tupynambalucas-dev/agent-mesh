import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const batchScrapeToolDefinition = {
  name: 'batch_scrape',
  description:
    'Scrapes multiple URLs simultaneously, returning extracted content for all requested pages.',
  inputSchema: {
    type: 'object',
    properties: {
      urls: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of URLs to scrape',
      },
      formats: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['markdown', 'html', 'rawHtml', 'links', 'screenshot', 'json'],
        },
        description: 'Formats to return in the response (default: ["markdown"])',
      },
      onlyMainContent: {
        type: 'boolean',
        description:
          'Extract only main content, excluding headers, navs, and footers (default: true)',
      },
    },
    required: ['urls'],
  },
};

export const batchScrapeToolSchema = z.object({
  urls: z.array(z.string()).describe('Array of URLs to scrape'),
  formats: z
    .array(z.enum(['markdown', 'html', 'rawHtml', 'links', 'screenshot', 'json']))
    .optional()
    .default(['markdown']),
  onlyMainContent: z.boolean().optional().default(true),
});

export async function handleBatchScrapeTool(args: unknown) {
  const parsed = batchScrapeToolSchema.parse(args);
  const result = await firecrawlClient.batchScrape(parsed.urls, {
    options: {
      formats: parsed.formats,
      onlyMainContent: parsed.onlyMainContent,
    },
  });

  return {
    content: [
      { type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) },
    ],
  };
}
