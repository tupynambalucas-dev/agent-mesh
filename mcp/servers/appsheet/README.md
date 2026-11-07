# @tupynambalucas-dev/mcp-appsheet

Model Context Protocol server for Google AppSheet REST API v2 automation and schema management.

---

## Overview

`@tupynambalucas-dev/mcp-appsheet` provides dual-transport access (Fastify Streamable HTTP on `:8080` and Stdio via `dist/bin.js`) for AI agents interacting with AppSheet applications.

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
# Build the TypeScript package
pnpm build

# Run via Stdio
node dist/bin.js

# Run HTTP server
node dist/index.js
```
