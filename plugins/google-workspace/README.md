# Google Workspace Domain Plugin (`@tupynambalucas-dev/agent-plugin-google-workspace`)

Enterprise Antigravity plugin for sovereign Google Workspace automation, including Drive folder organization, multi-table Sheets synthesis for AppSheet, and Diátaxis Docs publishing.

## Modular Skills Catalog

1. **`gwork-drive-manager`**: Deep search and lifecycle management over Google Drive folders, permissions, file sharing, and cross-format exports.
2. **`gwork-sheets-builder`**: Programmatic synthesis of enterprise-grade multi-table workbooks formatted specifically for Google AppSheet and analytics.
3. **`gwork-docs-publisher`**: Converts markdown technical plans and specifications into richly formatted Google Docs.

## Connection Mode

- Mode A: Cluster Envoy AgentGateway (`http://localhost:8080/mcp`)
- Mode B: Automatic fallback via `pnpm dlx @tupynambalucas-dev/cortex-mcp-gwork`
