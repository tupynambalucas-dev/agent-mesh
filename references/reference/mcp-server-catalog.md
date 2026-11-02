# MCP Server Catalog

Technical reference detailing all 7 in-house Model Context Protocol (MCP) packages authored in `mcp/packages/*`, their dual transports, exposed tools, and environment variables.

---

## Dual Transport Model

Every MCP server package implements two execution entrypoints:
- **`src/index.ts` (Streamable HTTP)**: Fastify server listening on `:8080` (or `PORT` environment variable) serving `/mcp` endpoints for Kubernetes Envoy AgentGateway deployments.
- **`src/bin.ts` (Stdio Transport)**: Standalone Stdio JSON-RPC 2.0 runner directing diagnostic logs to `stderr` for local developer CLI pairing and fallback execution.

---

## Server Matrix

| Package Directory | NPM Package Name | Stdio Binary | Default HTTP Port | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| `mcp/packages/appsheet` | `@tupynambalucas-dev/mcp-appsheet` | `dist/bin.js` | `:8080` | AppSheet REST API v2 CRUD, table queries, and action triggers. |
| `mcp/packages/firecrawl` | `@tupynambalucas-dev/mcp-firecrawl` | `dist/bin.js` | `:8080` | Deep web scraping, crawling, domain mapping, and markdown extraction. |
| `mcp/packages/github` | `@tupynambalucas-dev/mcp-github` | `dist/bin.js` | `:8080` | GitHub App authenticated RBAC, rulesets, and Dependabot auditing. |
| `mcp/packages/gwork` | `@tupynambalucas-dev/mcp-gwork` | `dist/bin.js` | `:8080` | Google Drive folder taxonomy, Sheets synthesis, and Docs authoring. |
| `mcp/packages/infisical` | `@tupynambalucas-dev/mcp-infisical` | `dist/bin.js` | `:8080` | Universal Auth machine tokens, secret CRUD, and vault management. |
| `mcp/packages/memory` | `@tupynambalucas-dev/mcp-memory` | `dist/bin.js` | `:8080` | Semantic RAG vector store, episodic memory, and knowledge graph. |
| `mcp/packages/playwright` | `@tupynambalucas-dev/mcp-playwright` | `dist/bin.js` | `:8080` | Universal browser automation, extension bridge, and ARIA snapshots. |

---

## Tools Specification by Package

### 1. `@tupynambalucas-dev/mcp-appsheet`
- `find_records`: Queries records from an AppSheet table using filter expressions.
- `mutate_records`: Executes deterministic Add, Edit, or Delete operations over records.
- `invoke_action`: Dispatches configured workflow actions against table entities.

### 2. `@tupynambalucas-dev/mcp-firecrawl`
- `scrape`: Scrapes single URL and extracts clean GitHub Flavored Markdown.
- `crawl`: Asynchronously crawls a domain hierarchy up to a configured depth.
- `map`: Rapidly maps all URLs belonging to a domain without fetching full HTML.
- `extract`: Extracts structured JSON data from web pages based on a Zod schema.

### 3. `@tupynambalucas-dev/mcp-github`
- `get_repo_info`: Retrieves repository metadata, default branch, and security status.
- `list_org_repos`: Lists repositories belonging to an organization.
- `list_rulesets`: Inspects branch and tag protection rulesets.
- `list_dependabot_alerts`: Queries active Dependabot vulnerability alerts.
- `list_secret_scanning_alerts`: Queries detected credential leaks.

### 4. `@tupynambalucas-dev/mcp-gwork`
- `search_drive_files`: Performs query search across Google Drive folders.
- `create_spreadsheet`: Synthesizes 1NF-normalized Google Sheets workbooks.
- `create_document`: Authors formatted Google Docs conforming to typographic standards.

### 5. `@tupynambalucas-dev/mcp-infisical`
- `infisical_list_secrets`: Lists secrets in an Infisical project environment and path.
- `infisical_get_secret`: Retrieves decrypted secret value by key.
- `infisical_create_secret`: Vaults a new secret into an environment path.
- `infisical_update_secret`: Rotates or updates an existing secret value.
- `infisical_delete_secret`: Deletes a secret key from a vault path.

### 6. `@tupynambalucas-dev/mcp-memory`
- `search_knowledge`: RAG vector similarity search over indexed documentation.
- `store_episodic`: Persists a conversation turn in episodic chat history.
- `query_graph`: Traverses knowledge graph from an entity by depth.
- `ingest_document`: Triggers document ingestion and indexing pipeline.

### 7. `@tupynambalucas-dev/mcp-playwright`
- `browser_navigate`: Navigates active tab to target URL.
- `browser_tabs`: Lists open browser tabs in active desktop session or headless runtime.
- `browser_snapshot`: Captures ARIA accessibility tree with element bounding boxes.
- `browser_click`: Clicks element matching selector or accessible label.
- `browser_fill_form`: Fills form input fields with deterministic values.
- `browser_wait_for`: Waits for network settle or DOM selector presence.
- `browser_close`: Closes browser or active session tab.
