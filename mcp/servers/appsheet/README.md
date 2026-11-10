# @tupynambalucas-dev/mcp-appsheet

Model Context Protocol server for Google AppSheet REST API v2 automation and schema management.

---

## Overview

`@tupynambalucas-dev/mcp-appsheet` provides dual-transport access (Fastify Streamable HTTP on `:8080` via `dist/index.cjs` and Stdio via `dist/bin.cjs` / `scripts/launcher.cjs`) for AI agents interacting with AppSheet applications.

Built with `tsup` (`noExternal`), `dist/bin.cjs` is a self-contained CommonJS bundle inlining `@modelcontextprotocol/sdk`, `fastify`, `zod`, and `dotenv` so the server executes with zero external dependencies when consumed inside external repositories (such as `omnichannel`).

## Tools Exposed

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `find_records` | `tableName`, `selector` (optional) | Queries records from an AppSheet table using expression filters. |
| `mutate_records` | `tableName`, `action` (`Add`, `Edit`, `Delete`), `rows` | Performs batch row mutations with deterministic key validation. |
| `invoke_action` | `tableName`, `actionName`, `rows` | Dispatches predefined AppSheet workflow actions across target records. |

---

## Configuration

The server requires the following environment variables:

| Variable | Description |
| :--- | :--- |
| `APPSHEET_APP_ID` | The AppSheet application ID. |
| `APPSHEET_APPLICATION_ACCESS_KEY` | The application access token generated in AppSheet settings. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## Building and Running

```bash
# Bundle into dist/bin.cjs and dist/index.cjs via tsup
pnpm build

# Run via Sovereign Launcher (recommended - loads .env cascade)
node scripts/launcher.cjs

# Run via Stdio bundle directly
node dist/bin.cjs

# Run HTTP server
node dist/index.cjs
```
