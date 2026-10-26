# cortex-memory-mcp

MCP adapter for the Cortex Memory RAG Subsystem. Bridges AgentGateway to the
`memory-api` Fastify REST service, exposing four tools over a Streamable HTTP
transport at `/mcp` on port `8080`.

---

## Technology Stack

| Layer             | Technology                                    |
| :---------------- | :-------------------------------------------- |
| Runtime           | Node.js 22                                    |
| HTTP server       | Fastify 5                                     |
| MCP transport     | `@modelcontextprotocol/sdk` (Streamable HTTP) |
| Schema validation | Zod                                           |
| Language          | TypeScript 5                                  |

---

## Available Tools

| Tool               | Description                                                     | Required Params                |
| :----------------- | :-------------------------------------------------------------- | :----------------------------- |
| `search_knowledge` | RAG vector similarity search over indexed documents.            | `query`                        |
| `store_episodic`   | Persists a conversation turn in episodic chat history.          | `sessionId`, `role`, `content` |
| `query_graph`      | Traverses knowledge graph from an entity by depth.              | `entityId`                     |
| `ingest_document`  | Ingests a document and triggers the full docs re-sync pipeline. | `title`, `content`             |

---

## Transport

- **Path**: `/mcp`
- **Protocol**: Streamable HTTP (MCP specification)
- **Session model**: Stateless. `sessionIdGenerator` is `undefined` — each POST
  to `/mcp` creates a fresh `Server` instance that is destroyed after the
  response completes.

---

## Dependency: memory-api

All tools delegate HTTP calls to the `memory-api` Fastify service:

```
mcp-memory:8080/mcp  ->  memory-api:3006/api/memory/*
```

The `memory-api` service must be reachable from within the same Kubernetes
namespace or Docker network as `mcp-memory`.

---

## MemoryApiClient

The `MemoryApiClient` class encapsulates all HTTP calls to `memory-api`. URL
resolution logic:

1. Reads `MEMORY_API_URL` (defaults to `http://memory-api:3006`).
2. If the URL does not end with `/api/memory`, appends `/api/memory`.
3. All tool method calls use relative paths against this resolved base.

Both `http://memory-api:3006` and `http://memory-api:3006/api/memory` are valid
values for `MEMORY_API_URL`.

---

## Configuration & Environment

| Variable         | Required | Default                  | Description                              |
| :--------------- | :------: | :----------------------- | :--------------------------------------- |
| `MEMORY_API_URL` |    No    | `http://memory-api:3006` | Base URL of the `memory-api` service.    |
| `PORT`           |    No    | `8080`                   | Port the Fastify MCP adapter listens on. |

---

## Development Scripts

```bash
pnpm dev        # tsx watch — hot-reload TypeScript development server
pnpm build      # tsc — compile to dist/
pnpm start      # node dist/index.js — run compiled output
pnpm typecheck  # tsc --noEmit — type-check without emitting
pnpm lint       # eslint — lint TypeScript sources
```

---

## Health Check

```
GET /health
```

Returns `{ "status": "healthy", "service": "cortex-memory-mcp" }`.

---

## Integration

This service is not called directly by agents. It is registered as a downstream
target in the AgentGateway configuration (`cortex/gateway/config.yaml`). All
requests pass through:

```
AgentGateway (agentgateway:8080) -> mcp-memory:8080/mcp -> memory-api:3006
```

Do not configure agents to call `mcp-memory` or `memory-api` directly.
