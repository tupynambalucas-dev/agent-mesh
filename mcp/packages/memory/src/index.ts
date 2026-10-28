import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
} from '@modelcontextprotocol/sdk/types.js';
import Fastify from 'fastify';
import { config } from './config.js';
import { searchToolDefinition, handleSearchTool } from './tools/search.tool.js';
import { chatToolDefinition, handleChatTool } from './tools/chat.tool.js';
import { graphToolDefinition, handleGraphTool } from './tools/graph.tool.js';
import { ingestToolDefinition, handleIngestTool } from './tools/ingest.tool.js';
import { resolveGraphToolDefinition, handleResolveGraphTool } from './tools/resolve-graph.tool.js';

const fastify = Fastify({ logger: true });

fastify.all('/mcp', async (req, reply) => {
  try {
    reply.hijack();
    const server = new Server(
      {
        name: 'cortex-memory-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          searchToolDefinition,
          chatToolDefinition,
          graphToolDefinition,
          ingestToolDefinition,
          resolveGraphToolDefinition,
        ],
      };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'search_knowledge':
          return await handleSearchTool(request.params.arguments);
        case 'store_episodic':
          return await handleChatTool(request.params.arguments);
        case 'query_graph':
          return await handleGraphTool(request.params.arguments);
        case 'ingest_document':
          return await handleIngestTool(request.params.arguments);
        case 'resolve_graph_entity':
          return await handleResolveGraphTool(request.params.arguments);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
      }
    });

    const requestTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await server.connect(requestTransport);
    await requestTransport.handleRequest(req.raw, reply.raw, req.body ?? undefined);
  } catch (err) {
    fastify.log.error(err);
  }
});

fastify.listen({ port: config.PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Cortex Memory MCP Server listening on port ${config.PORT}`);
});
