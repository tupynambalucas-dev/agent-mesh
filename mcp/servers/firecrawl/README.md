# Firecrawl MCP Server (`@tupynambalucas-dev/mcp-firecrawl`)

Dual-transport Model Context Protocol server that bridges AI agents and the Kubernetes Envoy AgentGateway to the Firecrawl web-intelligence API. Exposes six tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## Technology Stack

| Layer             | Technology                                               |
| :---------------- | :------------------------------------------------------- |
| Runtime           | Node.js 20+ (Node.js 22 LTS recommended)                 |
| Bundler           | `tsup` (`noExternal` self-contained CommonJS bundles)    |
| HTTP server       | Fastify 5                                                |
| MCP transport     | `@modelcontextprotocol/sdk` (Stdio & Streamable HTTP)    |
| Firecrawl client  | `firecrawl` SDK                                          |
| Schema validation | Zod                                                      |
| Language          | TypeScript 6                                             |

---

## Available Tools

| Tool           | Description                                                       | Required Params |
| :------------- | :---------------------------------------------------------------- | :-------------- |
| `scrape`       | Fetches clean Markdown, HTML, or JSON from a single URL.          | `url`           |
| `crawl`        | Recursively crawls all subpages from a base URL.                  | `url`           |
| `search`       | Web search returning full Markdown results per page.              | `query`         |
| `map`          | Discovers all indexed URLs and sitemap routes for a domain.       | `url`           |
| `extract`      | Extracts structured JSON matching a schema from one or more URLs. | `urls`          |
| `batch_scrape` | Scrapes multiple URLs concurrently.                               | `urls`          |

---

## Transport & Sovereign Execution

1. **Stdio Transport (`dist/bin.cjs` / `scripts/launcher.cjs`)**:
   - Invoked directly by domain plugins (`@tupynambalucas-dev/plugin-research`, `@tupynambalucas-dev/plugin-web`) or standalone consumers via `node scripts/launcher.cjs`.
   - Self-contained CJS bundle requires zero external packages in consumer `node_modules`.
2. **Streamable HTTP Transport (`dist/index.cjs`)**:
   - **Path**: `/mcp` on port `8080`.
   - **Session model**: Stateless (`sessionIdGenerator: undefined`). Each POST to `/mcp` instantiates a fresh `Server` object that is disposed after the response completes.
   - `localhost` / `127.0.0.1` URLs in tool arguments are automatically rewritten to `host.docker.internal` to allow containerized tools to reach host-machine processes.

---

## Configuration & Environment

| Variable            | Required | Default                     | Description                                               |
| :------------------ | :------: | :-------------------------- | :-------------------------------------------------------- |
| `FIRECRAWL_API_KEY` |   Yes    | *(none)*                    | API key for the Firecrawl service.                        |
| `FIRECRAWL_API_URL` |    No    | `https://api.firecrawl.dev` | Firecrawl base URL. Override for self-hosted deployments. |
| `PORT`              |    No    | `8080`                      | Port the Fastify server listens on.                       |
| `NODE_ENV`          |    No    | `development`               | Runtime environment flag.                                 |

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

Returns `{ "status": "healthy", "service": "firecrawl-mcp" }`.
