# cortex-firecrawl-mcp

Stateless Fastify MCP adapter that bridges AgentGateway to the Firecrawl
web-intelligence API. Exposes six tools over a Streamable HTTP transport at
`/mcp` on port `8080`.

---

## Technology Stack

| Layer             | Technology                                    |
| :---------------- | :-------------------------------------------- |
| Runtime           | Node.js 22                                    |
| HTTP server       | Fastify 5                                     |
| MCP transport     | `@modelcontextprotocol/sdk` (Streamable HTTP) |
| Firecrawl client  | `@mendable/firecrawl-js` SDK                  |
| Schema validation | Zod                                           |
| Language          | TypeScript 5                                  |

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

## Transport

- **Path**: `/mcp`
- **Protocol**: Streamable HTTP (MCP specification)
- **Session model**: Stateless. `sessionIdGenerator` is `undefined` — each POST
  to `/mcp` instantiates a fresh `Server` object that is destroyed after the
  response completes. No server-side session memory is retained between requests.

---

## Architecture

Each incoming POST to `/mcp` follows this flow:

1. Fastify receives the request.
2. A new `@modelcontextprotocol/sdk` `Server` instance is created with all six
   tools registered.
3. The MCP `StreamableHTTPServerTransport` handles framing and dispatches the
   tool call to the corresponding Firecrawl SDK method.
4. The result is returned and the `Server` instance is discarded.

`localhost` / `127.0.0.1` URLs in tool arguments are automatically rewritten to
`host.docker.internal` to allow containerized tools to reach host-machine
processes.

---

## Configuration & Environment

| Variable            | Required | Default                     | Description                                               |
| :------------------ | :------: | :-------------------------- | :-------------------------------------------------------- |
| `FIRECRAWL_API_KEY` |   Yes    | —                           | API key for the Firecrawl service.                        |
| `FIRECRAWL_API_URL` |    No    | `https://api.firecrawl.dev` | Firecrawl base URL. Override for self-hosted deployments. |
| `PORT`              |    No    | `8080`                      | Port the Fastify server listens on.                       |
| `NODE_ENV`          |    No    | `development`               | Runtime environment flag.                                 |

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

Returns `{ "status": "healthy", "service": "cortex-firecrawl-mcp" }`.

---

## Integration

This service is not called directly by agents. It is registered as a downstream
target in the AgentGateway configuration (`cortex/gateway/config.yaml`). All
requests pass through:

```
AgentGateway (agentgateway:8080) -> mcp-firecrawl:8080/mcp
```

Do not configure agents to call `mcp-firecrawl` directly.
