import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import Fastify from 'fastify';
import { config } from './config.js';
import { registerToolHandlers } from './tools/index.js';

const fastify = Fastify({ logger: true });

fastify.all('/mcp', async (req, reply) => {
  try {
    reply.hijack();
    const server = new Server(
      {
        name: 'playwright-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    registerToolHandlers(server);
    const requestTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await server.connect(requestTransport);
    await requestTransport.handleRequest(req.raw, reply.raw, req.body ?? undefined);
  } catch (err) {
    fastify.log.error(err);
  }
});

fastify.get('/health', () => {
  return { status: 'healthy', service: 'playwright-mcp' };
});

fastify.listen({ port: config.PORT, host: config.HOST }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Universal Playwright MCP Server listening on port ${config.PORT}`);
});
