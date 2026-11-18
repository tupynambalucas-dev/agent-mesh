import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const batchScrapeToolDefinition = {
  name: 'batch_scrape',
  description: 'Asynchronously scrape multiple URLs concurrently with unified format options.',
  inputSchema: {
    type: 'object',
    properties: {
      urls: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of webpage URLs to scrape concurrently',
      },
      formats: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['markdown', 'html', 'rawHtml', 'links', 'screenshot', 'json'],
        },
        description: 'Response formats (default: ["markdown"])',
      },
      onlyMainContent: {
        type: 'boolean',
        description: 'Extract only main content (default: true)',
      },
    },
    required: ['urls'],
  },
};

export const batchScrapeToolSchema = z.object({
  urls: z.array(z.string()).describe('Array of webpage URLs to scrape concurrently'),
  formats: z
    .array(z.enum(['markdown', 'html', 'rawHtml', 'links', 'screenshot', 'json']))
    .optional()
    .default(['markdown']),
  onlyMainContent: z.boolean().optional().default(true),
});

export async function handleBatchScrapeTool(args: unknown) {
  const parsed = batchScrapeToolSchema.parse(args);
  const result = await (firecrawlClient as any).batchScrapeUrls(parsed.urls, {
    formats: parsed.formats,
    onlyMainContent: parsed.onlyMainContent,
  });

  return {
    content: [
      { type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) },
    ],
  };
}
