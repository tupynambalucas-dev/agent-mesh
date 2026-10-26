# Google AppSheet Domain Plugin (`@tupynambalucas-dev/agent-plugin-appsheet`)

Enterprise Antigravity plugin for Google AppSheet hybrid lifecycle orchestration: Greenfield Prompt-to-App generation and Brownfield REST API v2 administration.

## Modular Skills Catalog

1. **`appsheet-prompt-architect`**: Translates natural language prompts into relational schemas, deduces `Ref` parent-child relationships, derives key columns, and constructs deterministic AppSheet ingestion URLs (`https://www.appsheet.com/start/initialize?docId=...`).
2. **`appsheet-data-operator`**: Interacts directly with existing AppSheet applications via the AppSheet REST API v2 to execute `Find` queries, `Add`/`Edit`/`Delete` mutations, and `Invoke Action` workflow triggers.
3. **`appsheet-ui-designer`**: Models and validates UI/UX configurations including deck views, table views, form views, card views, and conditional format rules.

## Connection Mode

- Mode A: Cluster Envoy AgentGateway (`http://localhost:8080/mcp`)
- Mode B: Automatic fallback via `pnpm dlx @tupynambalucas-dev/cortex-mcp-appsheet`
