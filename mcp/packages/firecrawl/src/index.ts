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
        name: 'cortex-firecrawl-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      },
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
  return { status: 'healthy', service: 'cortex-firecrawl-mcp' };
});

fastify.listen({ port: config.PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Cortex Firecrawl MCP Server listening on port ${config.PORT}`);
});
