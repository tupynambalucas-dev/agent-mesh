# Google AppSheet Model Context Protocol Server (`@tupynambalucas-dev/mcp-appsheet`)

Dual-transport Model Context Protocol (MCP) server providing REST API v2 automation and relational schema management for Google AppSheet applications. Exposes tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## 1. Overview

`@tupynambalucas-dev/mcp-appsheet` provides dual-transport access (Fastify Streamable HTTP on `:8080` via `dist/index.cjs` and Stdio via `dist/bin.cjs` / `scripts/launcher.cjs`) for AI agents interacting with AppSheet applications.

Built with `tsup` (`noExternal`), `dist/bin.cjs` is a self-contained CommonJS bundle inlining `@modelcontextprotocol/sdk`, `fastify`, `zod`, and `dotenv` so the server executes with zero external dependencies when consumed inside external repositories (such as `omnichannel`).

---

## 2. Capabilities / Exports Catalog

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `find_records` | `tableName`, `selector` (optional) | Queries records from an AppSheet table using expression filters. |
| `mutate_records` | `tableName`, `action` (`Add`, `Edit`, `Delete`), `rows` | Performs batch row mutations with deterministic key validation. |
| `invoke_action` | `tableName`, `actionName`, `rows` | Dispatches predefined AppSheet workflow actions across target records. |

---

## 3. Directory Layout

```text
mcp/servers/appsheet/
├── scripts/
│   └── launcher.cjs             # Sovereign MCP launcher with .env cascade
├── src/
│   ├── client/
│   │   └── appsheet-api.client.ts # Low-level HTTP client for REST API v2
│   ├── tools/
│   │   ├── action.tool.ts       # invoke_action tool implementation
│   │   ├── find.tool.ts         # find_records tool implementation
│   │   ├── index.ts             # Tool registry and registration
│   │   └── mutate.tool.ts       # mutate_records tool implementation
│   ├── bin.ts                   # Stdio transport entrypoint
│   ├── config.ts                # Zod environment schema
│   ├── index.ts                 # Fastify Streamable HTTP transport entrypoint (:8080)
│   └── types.ts                 # AppSheet REST API types
├── AGENTS.md                    # Layer 3 context router
├── mcp.json                     # Agent Plugins stdio declaration
├── package.json                 # Package manifest (@tupynambalucas-dev/mcp-appsheet)
├── README.md                    # Layer 3 package documentation
├── tsconfig.json                # TypeScript compiler configuration
└── tsup.config.ts               # Inlined CommonJS bundle configuration
```

---

## 4. Configuration & Usage

The server requires the following environment variables:

| Variable | Description |
| :--- | :--- |
| `APPSHEET_APP_ID` | The AppSheet application ID. |
| `APPSHEET_APPLICATION_ACCESS_KEY` | The application access token generated in AppSheet settings. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## 5. Development Scripts

```bash
# Bundle into dist/bin.cjs and dist/index.cjs via tsup
pnpm build

# Run via Sovereign Launcher (recommended - loads .env cascade)
node scripts/launcher.cjs

# Run via Stdio bundle directly
node dist/bin.cjs

# Run HTTP server
node dist/index.cjs

# Typecheck package
pnpm typecheck
```

---

## 6. Governance & Context

This package adheres to enterprise governance standards:
- [Root Context Router](../../../AGENTS.md)
- [MCP Subsystem Context](../../AGENTS.md)
- [MCP Subsystem README](../../README.md)
- [License](./LICENSE): Apache License 2.0
