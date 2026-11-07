import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { scrapeToolDefinition, handleScrapeTool } from './scrape.tool.js';
import { crawlToolDefinition, handleCrawlTool } from './crawl.tool.js';
import { searchToolDefinition, handleSearchTool } from './search.tool.js';
import { mapToolDefinition, handleMapTool } from './map.tool.js';
import { extractToolDefinition, handleExtractTool } from './extract.tool.js';
import { batchScrapeToolDefinition, handleBatchScrapeTool } from './batch-scrape.tool.js';

export const allTools = [
  scrapeToolDefinition,
  crawlToolDefinition,
  searchToolDefinition,
  mapToolDefinition,
  extractToolDefinition,
  batchScrapeToolDefinition,
];

export function registerToolHandlers(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, () => {
    return Promise.resolve({ tools: allTools });
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'scrape':
          return await handleScrapeTool(args);
        case 'crawl':
          return await handleCrawlTool(args);
        case 'search':
          return await handleSearchTool(args);
        case 'map':
          return await handleMapTool(args);
        case 'extract':
          return await handleExtractTool(args);
        case 'batch_scrape':
          return await handleBatchScrapeTool(args);
        default:
          throw new Error(`Unknown tool requested: ${name}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        isError: true,
        content: [{ type: 'text', text: `Error executing tool '${name}': ${errorMessage}` }],
      };
    }
  });
}
