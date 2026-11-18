import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import Fastify from 'fastify';
import { config } from './config.js';
import { allTools, executeTool } from './tools/index.js';

const fastify = Fastify({ logger: true });

fastify.all('/mcp', async (req, reply) => {
  try {
    reply.hijack();
    const server = new Server(
      {
        name: 'linkedin-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools: allTools };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return await executeTool(request.params.name, request.params.arguments);
    });

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    await server.connect(transport);
    await transport.handleRequest(req.raw, reply.raw, req.body ?? undefined);
  } catch (error) {
    if (!reply.raw.headersSent) {
      reply.status(500).send({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Internal error',
        },
        id: null,
      });
    }
  }
});

fastify.get('/healthz', async () => {
  return { status: 'ok', service: 'mcp-linkedin', timestamp: new Date().toISOString() };
});

fastify.get('/readyz', async () => {
  return { ready: true, resumesDir: config.LINKEDIN_RESUMES_DIR };
});

const start = async () => {
  try {
    await fastify.listen({ port: config.PORT, host: '0.0.0.0' });
    process.stderr.write(`LinkedIn MCP Fastify server running on port ${config.PORT}\n`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
