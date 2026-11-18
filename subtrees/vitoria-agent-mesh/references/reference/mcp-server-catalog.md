# MCP Server Catalog

Technical reference detailing all 4 in-house Model Context Protocol (MCP) server packages authored in `mcp/servers/*` and the shared core library in `mcp/core/*`, their dual transports, exposed tools, and environment variables.

---

## Dual Transport Model

Every MCP server package in `mcp/servers/*` implements two execution entrypoints:
- **`src/index.ts` (Streamable HTTP)**: Fastify server listening on `:8080` (or `PORT` environment variable) serving `/mcp` endpoints for Kubernetes Envoy AgentGateway deployments.
- **`src/bin.ts` (Stdio Transport)**: Standalone Stdio JSON-RPC 2.0 runner directing diagnostic logs to `stderr` for local developer CLI pairing and fallback execution.

---

## Server & Core Matrix

| Directory Path | NPM Package Name | Entrypoint / Binary | Default HTTP Port | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| `mcp/servers/firecrawl` | `@vitoria-rodrigues/mcp-firecrawl` | `dist/bin.cjs` / `scripts/launcher.cjs` | `:8080` | Deep web scraping, crawling, domain mapping, and markdown extraction. |
| `mcp/servers/github-flow` | `@vitoria-rodrigues/mcp-github-flow` | `dist/bin.cjs` / `scripts/launcher.cjs` | `:8080` | Tier 3 developer Git workflows, branches, pull requests, and Actions diagnostics. |
| `mcp/servers/linkedin` | `@vitoria-rodrigues/mcp-linkedin` | `dist/bin.cjs` / `scripts/launcher.cjs` | `:8080` | LinkedIn profile optimization, job matching, Easy Apply automation, and candidate resume catalog management. |
| `mcp/servers/playwright` | `@vitoria-rodrigues/mcp-playwright` | `dist/bin.cjs` / `scripts/launcher.cjs` | `:8080` | Universal browser automation, extension bridge, and ARIA snapshots. |
| `mcp/core/github` | `@vitoria-rodrigues/mcp-core-github` | `dist/index.js` *(Library)* | N/A | Shared Three-Tier GitHub App authentication, Octokit client factory, and Zod schemas. |

---

## Sovereign Launcher & Self-Contained Bundling Architecture

To enable frictionless consumption across external repositories (such as `omnichannel`) and prevent runtime module resolution errors (e.g. `Cannot find package '@modelcontextprotocol/sdk'`), each MCP server enforces a sovereign packaging model:

1. **Self-Contained CJS Bundle (`dist/bin.cjs`)**:
   - Built via `tsup` targeting Node 20.
   - All runtime dependencies (`@modelcontextprotocol/sdk`, `@octokit/*`, `zod`, `fastify`, etc.) are bundled directly into the standalone binary. Consumers require zero external packages or peer dependencies to execute the server.
2. **Dedicated Sovereign Launcher (`scripts/launcher.cjs`)**:
   - Packaged directly within each MCP server (`mcp/servers/<name>/scripts/launcher.cjs`).
   - Automatically executes `loadEnvCascade()` across parent directories to inject environment configurations.
   - Dispatches directly to the co-located bundled binary `dist/bin.cjs` with standard Node.js without requiring path traversals outside its package structure.
   - Manages upstream delegation or native bundles based on environment configuration.
3. **Declarative MCP Stdio Specification (`mcp.json`)**:
   - Each MCP server ships its own `mcp.json` declaring its executable command (`node ./scripts/launcher.cjs`), allowing direct inclusion in Antigravity or Claude Code configurations.
4. **Playwright Resilient Fallback (`mcp-playwright`)**:
   - Because OS-native browser binaries cannot be inlined into a JS bundle, `mcp/servers/playwright/tsup.config.ts` marks `playwright` and `playwright-core` as external while bundling `@modelcontextprotocol/sdk`, `fastify`, `zod`, `dotenv`, and `ws`.
   - When `mcp/servers/playwright/scripts/launcher.cjs` runs, it checks whether `playwright` is resolvable in the local workspace: if present, it spawns the bundled `dist/bin.cjs`; if absent (e.g., in backend services like `omnichannel`), it automatically falls back to `npx -y @playwright/mcp@0.0.84` with all configured mode flags (`--headless`, `--user-data-dir`, `--extension`, `--cdp-endpoint`).
5. **Git Persistence for Zero-Token Consumption (`!mcp/servers/*/dist/`)**:
   - All `mcp/servers/*/dist/*.cjs` bundles are tracked in Git so external repositories consuming `github:Vitoria-Rodrigues/agent-mesh` can execute every MCP server immediately without a build step or `NODE_AUTH_TOKEN`.

---

## Tools Specification by Server Package

### 1. `@vitoria-rodrigues/mcp-firecrawl`
- `scrape`: Scrapes single URL and extracts clean GitHub Flavored Markdown.
- `crawl`: Asynchronously crawls a domain hierarchy up to a configured depth.
- `map`: Rapidly maps all URLs belonging to a domain without fetching full HTML.
- `extract`: Extracts structured JSON data from web pages based on a Zod schema.

### 2. `@vitoria-rodrigues/mcp-github-flow`
- `get_repo_info`: Retrieves repository metadata, default branch, and visibility.
- `list_branches`: Lists repository branches with protection status and head commit SHA.
- `list_pull_requests`: Lists pull requests filtered by state or base branch.
- `get_pull_request`: Retrieves detailed mergeability and branch metadata for a pull request.
- `list_workflow_runs`: Lists GitHub Actions workflow runs for a repository.
- `get_workflow_run`: Retrieves execution status, conclusion, and timing for a specific workflow run.

### 3. `@vitoria-rodrigues/mcp-linkedin`
- `get_my_profile`: Extracts full candidate profile including headline, experience, and skills.
- `search_jobs`: Multi-vector job search matching titles, location, and keywords.
- `get_job_details`: Fetches job description, requirements, and hiring team context.
- `get_easy_apply_form`: Parses multi-step Easy Apply modal form schemas in dry-run mode.
- `submit_easy_apply`: Submits application to LinkedIn (gated: requires explicit user confirmation).
- `list_resumes`: Scans `$PLUGIN_DATA/resumes/` for tailored candidate CVs.
- `connect_with_person`: Dispatches invitation note to recruiter (gated: requires confirmation).
- `send_message`: Dispatches direct message or InMail (gated: requires confirmation).

### 4. `@vitoria-rodrigues/mcp-playwright`
- `browser_navigate`: Navigates active tab to target URL.
- `browser_tabs`: Lists open browser tabs in active desktop session or headless runtime.
- `browser_snapshot`: Captures ARIA accessibility tree with element bounding boxes.
- `browser_click`: Clicks element matching selector or accessible label.
- `browser_fill_form`: Fills form input fields with deterministic values.
- `browser_wait_for`: Waits for network settle or DOM selector presence.
- `browser_close`: Closes browser or active session tab.
