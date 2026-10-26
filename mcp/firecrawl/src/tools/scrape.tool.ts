import { z } from 'zod';
import { firecrawlClient } from '../client.js';

export const scrapeToolDefinition = {
  name: 'scrape',
  description: 'Scrapes clean Markdown, HTML, or structured JSON content from a single URL.',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The URL of the webpage to scrape',
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
      includeTags: {
        type: 'array',
        items: { type: 'string' },
        description: 'HTML tags to include',
      },
      excludeTags: {
        type: 'array',
        items: { type: 'string' },
        description: 'HTML tags to exclude',
      },
      waitFor: {
        type: 'number',
        description: 'Milliseconds to wait before scraping (for dynamic rendering)',
      },
      mobile: {
        type: 'boolean',
        description: 'Emulate a mobile device browser',
      },
      skipTlsVerification: {
        type: 'boolean',
        description: 'Skip TLS/SSL certificate verification',
      },
    },
    required: ['url'],
  },
};

export const scrapeToolSchema = z.object({
  url: z.string().describe('The URL of the webpage to scrape'),
  formats: z
    .array(z.enum(['markdown', 'html', 'rawHtml', 'links', 'screenshot', 'json']))
    .optional()
    .default(['markdown']),
  onlyMainContent: z.boolean().optional().default(true),
  includeTags: z.array(z.string()).optional(),
  excludeTags: z.array(z.string()).optional(),
  waitFor: z.number().optional(),
  mobile: z.boolean().optional(),
  skipTlsVerification: z.boolean().optional(),
});

export async function handleScrapeTool(args: unknown) {
  const parsed = scrapeToolSchema.parse(args);
  const result = await firecrawlClient.scrape(parsed.url, {
    formats: parsed.formats,
    onlyMainContent: parsed.onlyMainContent,
    includeTags: parsed.includeTags,
    excludeTags: parsed.excludeTags,
    waitFor: parsed.waitFor,
    mobile: parsed.mobile,
    skipTlsVerification: parsed.skipTlsVerification,
  });

  return {
    content: [
      { type: 'text', text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) },
    ],
  };
}
