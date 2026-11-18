# Google Workspace Model Context Protocol Server (`@tupynambalucas-dev/mcp-gwork`)

Dual-transport Model Context Protocol (MCP) server for Google Drive taxonomy, Google Sheets relational modeling, and Google Docs publishing automation. Exposes tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## 1. Overview

`@tupynambalucas-dev/mcp-gwork` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` via `dist/index.cjs` and Stdio via `dist/bin.cjs` / `scripts/launcher.cjs`) enabling AI agents to search Drive, build multi-sheet tabular databases for AppSheet, and publish rich documents.

Built with `tsup` (`noExternal`), `dist/bin.cjs` bundles `@modelcontextprotocol/sdk`, `googleapis`, `fastify`, `zod`, and `dotenv` into a standalone CommonJS binary for zero-dependency execution across external consumer repositories.

---

## 2. Capabilities / Exports Catalog

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `search_drive_files` | `query`, `folderId` (optional) | Queries files and folders across designated team drives. |
| `create_spreadsheet` | `title`, `sheets`, `folderId` (optional) | Programmatically synthesizes normalized multi-table workbooks formatted for AppSheet. |
| `create_document` | `title`, `content`, `folderId` (optional) | Creates structured Google Docs conforming to typography guidelines. |

---

## 3. Directory Layout

```text
mcp/servers/gwork/
├── scripts/
│   └── launcher.cjs             # Sovereign MCP launcher with .env cascade
├── src/
│   ├── client/
│   │   └── google-auth.client.ts # Google Cloud Service Account auth client
│   ├── tools/
│   │   ├── docs.tool.ts         # create_document tool implementation
│   │   ├── drive.tool.ts        # search_drive_files tool implementation
│   │   ├── index.ts             # Tool registry and registration
│   │   └── sheets.tool.ts       # create_spreadsheet tool implementation
│   ├── bin.ts                   # Stdio transport entrypoint
│   ├── config.ts                # Zod environment schema
│   ├── index.ts                 # Fastify Streamable HTTP transport entrypoint (:8080)
│   └── types.ts                 # Google Workspace types
├── AGENTS.md                    # Layer 3 context router
├── mcp.json                     # Agent Plugins stdio declaration
├── package.json                 # Package manifest (@tupynambalucas-dev/mcp-gwork)
├── README.md                    # Layer 3 package documentation
├── tsconfig.json                # TypeScript compiler configuration
└── tsup.config.ts               # Inlined CommonJS bundle configuration
```

---

## 4. Configuration & Usage

| Environment Variable | Description |
| :--- | :--- |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Google Cloud Service Account credentials JSON or path. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## 5. Development Scripts

```bash
# Bundle into dist/bin.cjs and dist/index.cjs via tsup
pnpm build

# Run via Sovereign Launcher (loads .env cascade)
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
