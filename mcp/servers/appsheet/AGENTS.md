<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-appsheet package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# AppSheet MCP Server Agent Context (`@tupynambalucas-dev/mcp-appsheet`)

This bounded context encapsulates the in-house Model Context Protocol server providing REST API v2 interaction with Google AppSheet applications.

## Directory Layout

- [scripts/launcher.cjs](./scripts/launcher.cjs): Sovereign MCP launcher (`bin: mcp-appsheet`) loading `.env` in cascade and executing `dist/bin.cjs` or routing to the Cortex Gateway.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio server configuration targeting `./scripts/launcher.cjs`.
- [tsup.config.ts](./tsup.config.ts): Declarative `tsup` configuration bundling all dependencies (`noExternal`) into `dist/bin.cjs` and `dist/index.cjs`.
- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint listening on `:8080`.
- [src/config.ts](./src/config.ts): Environment variable validation via Zod (`APPSHEET_APP_ID`, `APPSHEET_APPLICATION_ACCESS_KEY`).
- [src/client/appsheet-api.client.ts](./src/client/appsheet-api.client.ts): Low-level HTTP client executing AppSheet REST API v2 payloads.
- [src/tools/find.tool.ts](./src/tools/find.tool.ts): `find_records` - Queries records from target tables using selector expressions.
- [src/tools/mutate.tool.ts](./src/tools/mutate.tool.ts): `mutate_records` - Executes Add, Edit, and Delete row mutations.
- [src/tools/action.tool.ts](./src/tools/action.tool.ts): `invoke_action` - Triggers automated AppSheet workflow actions.
- [README.md](./README.md): Developer setup, installation, and tool catalog documentation.

## Architecture & Conventions

1. **Self-Contained Dual Transport**: Bundles `dist/bin.cjs` (Stdio) and `dist/index.cjs` (Fastify HTTP on `:8080`) with zero external runtime dependencies.
2. **Deterministic Keys**: All mutations require unique key identifiers to guarantee REST API v2 idempotency during retries.
3. **Selector Filtering**: Find operations accept AppSheet expression selectors (e.g. `FILTER(TableName, [Status] = "Active")`).

## Operational Guardrails

- MUST route all logging to `process.stderr`. Never output debug information to `process.stdout`.
- MUST validate all incoming parameters with strict Zod schemas before issuing API calls.
- MUST NOT commit plaintext AppSheet application access keys.

## Required Skills

- **`appsheet-data-operator`**: Active when executing AppSheet CRUD operations and workflow triggers.
- **`appsheet-prompt-architect`**: Active when designing or translating relational schemas for AppSheet.
