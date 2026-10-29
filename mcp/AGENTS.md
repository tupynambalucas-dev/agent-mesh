<context-hierarchy>
  <parent src="../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the MCP Servers bounded context of agent-mesh. If you have not read the parent AGENTS.md in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# MCP Subsystem Agent Context

This document defines the bounded context router for all in-house Model Context Protocol servers in `mcp/packages/*`.

## Packages Directory Layout

| Package Directory | NPM Package | AGENTS Router | Documentation | Primary Purpose |
| :--- | :--- | :--- | :--- | :--- |
| [packages/appsheet/](./packages/appsheet/) | `@tupynambalucas-dev/agent-mcp-appsheet` | [AGENTS.md](./packages/appsheet/AGENTS.md) | [README.md](./packages/appsheet/README.md) | Relational schema modeling and REST API v2 CRUD automation. |
| [packages/firecrawl/](./packages/firecrawl/) | `@tupynambalucas-dev/agent-mcp-firecrawl` | [AGENTS.md](./packages/firecrawl/AGENTS.md) | [README.md](./packages/firecrawl/README.md) | Deep web scraping, crawling, site mapping, and markdown extraction. |
| [packages/github/](./packages/github/) | `@tupynambalucas-dev/agent-mcp-github` | [AGENTS.md](./packages/github/AGENTS.md) | [README.md](./packages/github/README.md) | GitHub App authenticated organization RBAC and security auditing. |
| [packages/google-workspace/](./packages/google-workspace/) | `@tupynambalucas-dev/agent-mcp-gwork` | [AGENTS.md](./packages/google-workspace/AGENTS.md) | [README.md](./packages/google-workspace/README.md) | Drive folder taxonomy, Sheets synthesis, and Docs publishing. |
| [packages/infisical/](./packages/infisical/) | `@tupynambalucas-dev/agent-mcp-infisical` | [AGENTS.md](./packages/infisical/AGENTS.md) | [README.md](./packages/infisical/README.md) | Universal Auth machine tokens, secret CRUD, and vault management. |
| [packages/memory/](./packages/memory/) | `@tupynambalucas-dev/agent-mcp-memory` | [AGENTS.md](./packages/memory/AGENTS.md) | [README.md](./packages/memory/README.md) | Semantic RAG vector store, episodic memory, and chat history. |
| [packages/playwright/](./packages/playwright/) | `@tupynambalucas-dev/agent-mcp-playwright` | [AGENTS.md](./packages/playwright/AGENTS.md) | [README.md](./packages/playwright/README.md) | Headless browser automation, extension bridge, and ARIA snapshots. |

## Architecture & Conventions

1. **Dual Transport Pattern**:
   - Each package compiles to `dist/bin.js` for stdio communication and `dist/index.js` for HTTP Streamable transport.
   - `src/bin.ts`: `StdioServerTransport` entrypoint with `stderr` diagnostic logging.
   - `src/index.ts`: Fastify server listening on `:8080` (or `PORT` env) with `StreamableHTTPServerTransport`.
2. **Catalog Consumption**:
   - Packages MUST use `catalog:mcp-stack` for `@modelcontextprotocol/sdk` and `fastify`.
   - Packages MUST use `catalog:shared` for `zod` and `dotenv`.
   - Packages MUST use `catalog:` for dev tooling (`@types/node`, `typescript`, `tsx`, `rimraf`).
3. **Build Pipeline**:
   - Build all MCPs via Turborepo: `pnpm mcp:build`.
   - Build individual MCP: `pnpm mcp:<target>:build` (e.g. `pnpm mcp:playwright:build`).

## Operational Guardrails

- MUST NOT print debug logs to `stdout` in stdio mode; use `stderr` for all diagnostic logging.
- MUST handle missing credentials gracefully with descriptive errors instead of process crashes.
- MUST enforce strict input validation via Zod schemas on all tool arguments.
- MUST maintain zero-hardcoded-path discipline across all tools and transports.
