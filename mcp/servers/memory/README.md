# Memory MCP Server (`@tupynambalucas-dev/mcp-memory`)

Dual-transport Model Context Protocol adapter for the Cortex Memory RAG Subsystem. Bridges AI agents and the Kubernetes Envoy AgentGateway to the `memory-api` Fastify REST service, exposing four tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## Technology Stack

| Layer             | Technology                                               |
| :---------------- | :------------------------------------------------------- |
| Runtime           | Node.js 20+ (Node.js 22 LTS recommended)                 |
| Bundler           | `tsup` (`noExternal` self-contained CommonJS bundles)    |
| HTTP server       | Fastify 5                                                |
| MCP transport     | `@modelcontextprotocol/sdk` (Stdio & Streamable HTTP)    |
| Schema validation | Zod                                                      |
| Language          | TypeScript 6                                             |

---

## Available Tools

| Tool               | Description                                                     | Required Params                |
| :----------------- | :-------------------------------------------------------------- | :----------------------------- |
| `search_knowledge` | RAG vector similarity search over indexed documents.            | `query`                        |
| `store_episodic`   | Persists a conversation turn in episodic chat history.          | `sessionId`, `role`, `content` |
| `query_graph`      | Traverses knowledge graph from an entity by depth.              | `entityId`                     |
| `ingest_document`  | Ingests a document and triggers the full docs re-sync pipeline. | `title`, `content`             |

---

## Transport & Sovereign Execution

1. **Stdio Transport (`dist/bin.cjs` / `scripts/launcher.cjs`)**:
   - Self-contained CJS bundle inlining `@modelcontextprotocol/sdk`, `fastify`, `zod`, and `dotenv` so the server runs in standalone consumer repositories without external dependencies.
2. **Streamable HTTP Transport (`dist/index.cjs`)**:
   - **Path**: `/mcp` on port `8080`.
   - **Session model**: Stateless (`sessionIdGenerator: undefined`). Each POST to `/mcp` creates a fresh `Server` instance that is disposed after the response completes.

---

## Dependency: memory-api

All tools delegate HTTP calls to the `memory-api` Fastify service:

```text
mcp-memory -> memory-api:3006/api/memory/*
```

### MemoryApiClient URL Resolution
1. Reads `MEMORY_API_URL` (defaults to `http://memory-api:3006`).
2. If the URL does not end with `/api/memory`, appends `/api/memory`.
3. All tool method calls use relative paths against this resolved base.

---

## Configuration & Environment

| Variable         | Required | Default                  | Description                              |
| :--------------- | :------: | :----------------------- | :--------------------------------------- |
| `MEMORY_API_URL` |    No    | `http://memory-api:3006` | Base URL of the `memory-api` service.    |
| `PORT`           |    No    | `8080`                   | Port the Fastify MCP adapter listens on. |

---

## Development Scripts

```bash
pnpm dev                    # tsx watch src/index.ts - hot-reload development server
pnpm build                  # tsup - bundle into dist/bin.cjs and dist/index.cjs
node scripts/launcher.cjs   # Run sovereign Stdio launcher with .env cascade
node dist/bin.cjs           # Run compiled Stdio bundle directly
pnpm start                  # node dist/index.cjs - run compiled HTTP server
pnpm typecheck              # tsc --noEmit - type-check without emitting
```

---

## Health Check (HTTP Mode)

```text
GET /health
```

Returns `{ "status": "healthy", "service": "memory-mcp" }`.
