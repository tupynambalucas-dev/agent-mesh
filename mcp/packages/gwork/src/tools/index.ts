import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { searchDriveFilesToolDefinition, handleSearchDriveFiles } from './drive.tool.js';
import { createSpreadsheetToolDefinition, handleCreateSpreadsheet } from './sheets.tool.js';
import { createDocumentToolDefinition, handleCreateDocument } from './docs.tool.js';

export const allTools = [
  searchDriveFilesToolDefinition,
  createSpreadsheetToolDefinition,
  createDocumentToolDefinition,
];

export function registerToolHandlers(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, () => {
    return Promise.resolve({ tools: allTools });
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'search_drive_files':
          return await handleSearchDriveFiles(args);
        case 'create_spreadsheet':
          return await handleCreateSpreadsheet(args);
        case 'create_document':
          return await handleCreateDocument(args);
        default:
          throw new Error(`Unknown tool requested: ${name}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        isError: true,
        content: [{ type: 'text', text: `Error executing Google Workspace tool '${name}': ${errorMessage}` }],
      };
    }
  });
}
