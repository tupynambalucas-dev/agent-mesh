<context-hierarchy>
  <parent src="../AGENTS.md" type="bounded-context-rules" />
  <system-instruction>
    AGENT: You are operating in the MCP Servers bounded context of agent-mesh. If you have not read the root AGENTS.md in this session, read it first.
  </system-instruction>
</context-hierarchy>

# MCP Subsystem Agent Context

This document defines the bounded context for all in-house Model Context Protocol servers in `mcp/packages/*`.

## Packages Directory Layout

- [appsheet](./packages/appsheet/package.json): `@tupynambalucas-dev/agent-mcp-appsheet` - REST API v2 CRUD and AppSheet automation.
- [firecrawl](./packages/firecrawl/package.json): `@tupynambalucas-dev/agent-mcp-firecrawl` - Deep web scraping, crawling, and markdown extraction.
- [github](./packages/github/package.json): `@tupynambalucas-dev/agent-mcp-github` - GitHub App authenticated organization RBAC and security audit.
- [google-workspace](./packages/google-workspace/package.json): `@tupynambalucas-dev/agent-mcp-gwork` - Google Drive, Sheets, and Docs integration.
- [infisical](./packages/infisical/package.json): `@tupynambalucas-dev/agent-mcp-infisical` - Universal Auth secret management and project lifecycle.
- [memory](./packages/memory/package.json): `@tupynambalucas-dev/agent-mcp-memory` - Semantic RAG vector store and episodic memory.

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
   - Build individual MCP: `pnpm --filter @tupynambalucas-dev/agent-mcp-<target> build`.

## Operational Guardrails

- MUST NOT print debug logs to `stdout` in stdio mode; use `stderr` for all diagnostic logging.
- MUST handle missing credentials gracefully with descriptive errors instead of process crashes.
- MUST enforce strict input validation via Zod schemas on all tool arguments.
