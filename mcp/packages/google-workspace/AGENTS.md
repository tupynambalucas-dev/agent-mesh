<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/agent-mcp-gwork package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# Google Workspace MCP Server Agent Context (`@tupynambalucas-dev/agent-mcp-gwork`)

This bounded context encapsulates the in-house Model Context Protocol server providing Google Drive, Google Sheets, and Google Docs lifecycle automation.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint listening on `:8080`.
- [src/config.ts](./src/config.ts): Configuration schema via Zod (`GOOGLE_SERVICE_ACCOUNT_JSON`).
- [src/auth/google-auth.ts](./src/auth/google-auth.ts): Google Cloud Service Account JWT client authentication.
- [src/tools/drive.tool.ts](./src/tools/drive.tool.ts): `search_drive_files` - Queries Google Drive folder hierarchies and files.
- [src/tools/sheets.tool.ts](./src/tools/sheets.tool.ts): `create_spreadsheet` - Generates multi-sheet tabular workbooks for AppSheet ingestion.
- [src/tools/docs.tool.ts](./src/tools/docs.tool.ts): `create_document` - Creates formatted Google Docs from technical specs.
- [README.md](./README.md): Developer architecture, credentials, and tool reference.

## Operational Guardrails

- MUST NOT print debug logs to `stdout`; route all logging to `process.stderr`.
- Service Account credentials must be resolved dynamically and never committed to version control.
- Google Sheets generation must follow 1NF tabular modeling rules (frozen row 1, no merged cells).

## Required Skills

- **`gwork-drive-manager`**: Active when searching and organizing Google Drive folders and files.
- **`gwork-sheets-builder`**: Active when generating structured spreadsheets for AppSheet databases.
- **`gwork-docs-publisher`**: Active when publishing formatted technical specifications into Google Docs.
