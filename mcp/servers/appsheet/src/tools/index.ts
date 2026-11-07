import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { findRecordsToolDefinition, handleFindRecords } from './find.tool.js';
import { mutateRecordsToolDefinition, handleMutateRecords } from './mutate.tool.js';
import { invokeActionToolDefinition, handleInvokeAction } from './action.tool.js';

export const allTools = [
  findRecordsToolDefinition,
  mutateRecordsToolDefinition,
  invokeActionToolDefinition,
];

export function registerToolHandlers(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, () => {
    return Promise.resolve({ tools: allTools });
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'find_records':
          return await handleFindRecords(args);
        case 'mutate_records':
          return await handleMutateRecords(args);
        case 'invoke_action':
          return await handleInvokeAction(args);
        default:
          throw new Error(`Unknown tool requested: ${name}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        isError: true,
        content: [{ type: 'text', text: `Error executing AppSheet tool '${name}': ${errorMessage}` }],
      };
    }
  });
}
