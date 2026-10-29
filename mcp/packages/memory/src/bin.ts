#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerToolHandlers } from './tools/index.js';

async function main() {
  const server = new Server(
    {
      name: 'memory-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  registerToolHandlers(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write('Memory MCP server running on stdio\n');
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`Fatal error: ${message}\n`);
  process.exit(1);
});
