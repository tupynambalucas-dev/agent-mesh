# @tupynambalucas-dev/mcp-gwork

Model Context Protocol server for Google Drive, Google Sheets, and Google Docs lifecycle automation.

---

## Overview

`@tupynambalucas-dev/mcp-gwork` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` and Stdio via `dist/bin.js`) enabling AI agents to search Drive, build multi-sheet tabular databases for AppSheet, and publish rich documents.

---

## Tools Exposed

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `search_drive_files` | `query`, `folderId` (optional) | Queries files and folders across designated team drives. |
| `create_spreadsheet` | `title`, `sheets`, `folderId` (optional) | Programmatically synthesizes normalized multi-table workbooks formatted for AppSheet. |
| `create_document` | `title`, `content`, `folderId` (optional) | Creates structured Google Docs conforming to typography guidelines. |

---

## Configuration

| Environment Variable | Description |
| :--- | :--- |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Google Cloud Service Account credentials JSON or path. |
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
