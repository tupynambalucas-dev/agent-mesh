import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { searchToolDefinition, handleSearchTool } from './search.tool.js';
import { chatToolDefinition, handleChatTool } from './chat.tool.js';
import { graphToolDefinition, handleGraphTool } from './graph.tool.js';
import { ingestToolDefinition, handleIngestTool } from './ingest.tool.js';

export const allTools = [
  searchToolDefinition,
  chatToolDefinition,
  graphToolDefinition,
  ingestToolDefinition,
];

export function registerToolHandlers(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, () => {
    return Promise.resolve({ tools: allTools });
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'search_knowledge':
        return await handleSearchTool(args);
      case 'store_episodic':
        return await handleChatTool(args);
      case 'query_graph':
        return await handleGraphTool(args);
      case 'ingest_document':
        return await handleIngestTool(args);
      default:
        throw new Error(`Unknown tool requested: ${name}`);
    }
  });
}
