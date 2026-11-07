# MCP Server Catalog

Technical reference detailing all 8 in-house Model Context Protocol (MCP) server packages authored in `mcp/servers/*` and the shared core library in `mcp/core/*`, their dual transports, exposed tools, and environment variables.

---

## Dual Transport Model

Every MCP server package in `mcp/servers/*` implements two execution entrypoints:
- **`src/index.ts` (Streamable HTTP)**: Fastify server listening on `:8080` (or `PORT` environment variable) serving `/mcp` endpoints for Kubernetes Envoy AgentGateway deployments.
- **`src/bin.ts` (Stdio Transport)**: Standalone Stdio JSON-RPC 2.0 runner directing diagnostic logs to `stderr` for local developer CLI pairing and fallback execution.

---

## Server & Core Matrix

| Directory Path | NPM Package Name | Entrypoint / Binary | Default HTTP Port | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| `mcp/servers/appsheet` | `@tupynambalucas-dev/mcp-appsheet` | `dist/bin.js` | `:8080` | AppSheet REST API v2 CRUD, table queries, and action triggers. |
| `mcp/servers/firecrawl` | `@tupynambalucas-dev/mcp-firecrawl` | `dist/bin.js` | `:8080` | Deep web scraping, crawling, domain mapping, and markdown extraction. |
| `mcp/servers/github-flow` | `@tupynambalucas-dev/mcp-github-flow` | `dist/bin.js` | `:8080` | Tier 3 developer Git workflows, branches, pull requests, and Actions diagnostics. |
| `mcp/servers/github-org` | `@tupynambalucas-dev/mcp-github-org` | `dist/bin.js` | `:8080` | Tier 1 GitHub App authenticated RBAC, teams, rulesets, and Dependabot/Secret auditing. |
| `mcp/servers/gwork` | `@tupynambalucas-dev/mcp-gwork` | `dist/bin.js` | `:8080` | Google Drive folder taxonomy, Sheets synthesis, and Docs authoring. |
| `mcp/servers/infisical` | `@tupynambalucas-dev/mcp-infisical` | `dist/bin.js` | `:8080` | Universal Auth machine tokens, secret CRUD, and vault management. |
| `mcp/servers/memory` | `@tupynambalucas-dev/mcp-memory` | `dist/bin.js` | `:8080` | Semantic RAG vector store, episodic memory, and knowledge graph. |
| `mcp/servers/playwright` | `@tupynambalucas-dev/mcp-playwright` | `dist/bin.js` | `:8080` | Universal browser automation, extension bridge, and ARIA snapshots. |
| `mcp/core/github` | `@tupynambalucas-dev/mcp-core-github` | `dist/index.js` *(Library)* | N/A | Shared Three-Tier GitHub App authentication, Octokit client factory, and Zod schemas. |

---

## Tools Specification by Server Package

### 1. `@tupynambalucas-dev/mcp-appsheet`
- `find_records`: Queries records from an AppSheet table using filter expressions.
- `mutate_records`: Executes deterministic Add, Edit, or Delete operations over records.
- `invoke_action`: Dispatches configured workflow actions against table entities.

### 2. `@tupynambalucas-dev/mcp-firecrawl`
- `scrape`: Scrapes single URL and extracts clean GitHub Flavored Markdown.
- `crawl`: Asynchronously crawls a domain hierarchy up to a configured depth.
- `map`: Rapidly maps all URLs belonging to a domain without fetching full HTML.
- `extract`: Extracts structured JSON data from web pages based on a Zod schema.

### 3. `@tupynambalucas-dev/mcp-github-flow`
- `get_repo_info`: Retrieves repository metadata, default branch, and visibility.
- `list_branches`: Lists repository branches with protection status and head commit SHA.
- `list_pull_requests`: Lists pull requests filtered by state or base branch.
- `get_pull_request`: Retrieves detailed mergeability and branch metadata for a pull request.
- `list_workflow_runs`: Lists GitHub Actions workflow runs for a repository.
- `get_workflow_run`: Retrieves execution status, conclusion, and timing for a specific workflow run.

### 4. `@tupynambalucas-dev/mcp-github-org`
- `get_repo_info`: Retrieves repository metadata, default branch, and security status.
- `list_org_repos`: Lists repositories belonging to an organization.
- `list_org_teams`: Lists teams in the organization with slugs and privacy levels.
- `list_rulesets`: Inspects branch and tag protection rulesets.
- `get_ruleset`: Retrieves full configuration rules and bypass actors for a specific ruleset.
- `list_dependabot_alerts`: Queries active Dependabot vulnerability alerts.
- `list_secret_scanning_alerts`: Queries detected credential leaks.

### 5. `@tupynambalucas-dev/mcp-gwork`
- `search_drive_files`: Performs query search across Google Drive folders.
- `create_spreadsheet`: Synthesizes 1NF-normalized Google Sheets workbooks.
- `create_document`: Authors formatted Google Docs conforming to typographic standards.

### 6. `@tupynambalucas-dev/mcp-infisical`
- `infisical_list_secrets`: Lists secrets in an Infisical project environment and path.
- `infisical_get_secret`: Retrieves decrypted secret value by key.
- `infisical_create_secret`: Vaults a new secret into an environment path.
- `infisical_update_secret`: Rotates or updates an existing secret value.
- `infisical_delete_secret`: Deletes a secret key from a vault path.

### 7. `@tupynambalucas-dev/mcp-memory`
- `search_knowledge`: RAG vector similarity search over indexed documentation.
- `store_episodic`: Persists a conversation turn in episodic chat history.
- `query_graph`: Traverses knowledge graph from an entity by depth.
- `ingest_document`: Triggers document ingestion and indexing pipeline.

### 8. `@tupynambalucas-dev/mcp-playwright`
- `browser_navigate`: Navigates active tab to target URL.
- `browser_tabs`: Lists open browser tabs in active desktop session or headless runtime.
- `browser_snapshot`: Captures ARIA accessibility tree with element bounding boxes.
- `browser_click`: Clicks element matching selector or accessible label.
- `browser_fill_form`: Fills form input fields with deterministic values.
- `browser_wait_for`: Waits for network settle or DOM selector presence.
- `browser_close`: Closes browser or active session tab.
