# Agent Mesh Architecture & Granular Consumption Specification

Universal enterprise AI agent substrate, domain plugin marketplace, modular skills, and Model Context Protocol (MCP) servers for the `tupynambalucas-dev` organization.

---

## 1. Executive Summary & Root Purge Rationale

### 1.1 The Monolithic Bottleneck
In early architectural iterations, `agent-mesh` (formerly `agent-toolkit`) operated as a single, monolithic Antigravity plugin. A top-level [plugin.json](../plugins/meta/plugin.json), a top-level `mcp_config.json`, and an undivided `skills/` directory defined the entire agent runtime.

This design suffered from four structural flaws:
1. **Context Window Contamination**: Every agent session loaded all 19 skills, all tool definitions, and all system rules simultaneously. An agent writing Docusaurus documentation was burdened with Kubernetes RBAC rules, GitHub enterprise administration tools, and AppSheet relational schemas.
2. **Antigravity Directory Discovery Suppression**: Antigravity's discovery engine checks if a target directory contains `plugin.json`. If present at the root, Antigravity treats the root directory as the solitary plugin boundary, completely ignoring nested `plugin.json` manifests inside child folders such as `plugins/`.
3. **Claude Code Marketplace Incompatibility**: Claude Code distinguishes between an individual plugin (`.claude-plugin/plugin.json`) and a multi-plugin registry (`.claude-plugin/marketplace.json`). A root plugin manifest prevented selective plugin installations (`/plugin install <name>@<marketplace>`).
4. **Coupled Lifecycle & Release Friction**: Modifying a single skill or MCP server forced a full version bump of the entire toolkit, impeding independent package release and consumption across external projects.

### 1.2 The Root Purge Implementation
To establish an enterprise-grade, modular substrate, the legacy root artifacts were purged:
- **Deleted**: `agent-mesh/plugin.json`
- **Deleted**: `agent-mesh/mcp_config.json`
- **Deleted**: `agent-mesh/skills/` (all operational scripts, references, and markdown skills migrated into domain plugins)
- **Deleted**: `agent-mesh/.claude-plugin/plugin.json` (replaced with [.claude-plugin/marketplace.json](../.claude-plugin/marketplace.json))

The root `agent-mesh` repository now functions strictly as a **Monorepo Orchestrator and Marketplace Hub**.

---

## 2. Directory Hierarchy & Package Ecosystem

The workspace is organized as a `pnpm` monorepo managing 13 independent packages published to GitHub Packages (`https://npm.pkg.github.com/tupynambalucas-dev`):

```text
agent-mesh/
├── package.json                         # Root workspace orchestrator (@tupynambalucas-dev/agent-mesh)
├── pnpm-workspace.yaml                  # Monorepo packages mapping (plugins/*, mcp/*)
├── .claude-plugin/
│   └── marketplace.json                 # Claude Code Plugin Marketplace registry
├── rules/
│   └── AGENTS.md                        # Enterprise governance rules (SSH commit signing, Zero-Emoji)
├── plugins/                             # 6 Sovereign Domain Plugins
│   ├── appsheet/                        # @tupynambalucas-dev/agent-plugin-appsheet
│   │   ├── plugin.json                  # Antigravity plugin manifest
│   │   ├── mcp_config.json              # Scoped MCP server routing
│   │   ├── package.json                 # Independent npm package metadata
│   │   └── skills/                      # 3 domain-specific skills (appsheet-api, schema, web-ui)
│   ├── docusaurus/                      # @tupynambalucas-dev/agent-plugin-docusaurus
│   │   ├── plugin.json
│   │   ├── package.json
│   │   └── skills/                      # 3 domain-specific skills (diataxis, mdx, config)
│   ├── github/                          # @tupynambalucas-dev/agent-plugin-github
│   │   ├── plugin.json
│   │   ├── mcp_config.json
│   │   ├── package.json
│   │   └── skills/                      # 3 domain-specific skills (org, rulesets, triage)
│   ├── google-workspace/                # @tupynambalucas-dev/agent-plugin-google-workspace
│   │   ├── plugin.json
│   │   ├── mcp_config.json
│   │   ├── package.json
│   │   └── skills/                      # 3 domain-specific skills (drive, sheets, docs)
│   ├── meta/                            # @tupynambalucas-dev/agent-plugin-meta
│   │   ├── plugin.json
│   │   ├── package.json
│   │   └── skills/                      # 4 meta-governance skills (skill, plugin, router, markdown)
│   ├── research/                        # @tupynambalucas-dev/agent-plugin-research
│   │   ├── plugin.json
│   │   ├── mcp_config.json              # Scoped Firecrawl + Context7 routing
│   │   ├── package.json
│   │   └── skills/                      # 2 research skills (documentation-researcher, web-deep-researcher)
│   ├── secrets/                         # @tupynambalucas-dev/agent-plugin-secrets
│   └── web/                             # @tupynambalucas-dev/agent-plugin-web
│       ├── plugin.json
│       ├── mcp_config.json              # Scoped Playwright + Firecrawl routing
│       ├── package.json
│       └── skills/                      # 2 web skills (browser-automator, web-scraper)
│       ├── plugin.json
│       ├── mcp_config.json
│       ├── package.json
│       └── skills/                      # 3 secrets skills (infisical, rotation, sync)
├── mcp/                                 # 6 In-House Dual-Transport MCP Servers
│   ├── appsheet/                        # @tupynambalucas-dev/agent-mcp-appsheet
│   ├── firecrawl/                       # @tupynambalucas-dev/agent-mcp-firecrawl
│   ├── github/                          # @tupynambalucas-dev/agent-mcp-github
│   ├── google-workspace/                # @tupynambalucas-dev/agent-mcp-gwork
│   ├── infisical/                       # @tupynambalucas-dev/agent-mcp-infisical
│   └── memory/                          # @tupynambalucas-dev/agent-mcp-memory
└── scripts/
    ├── mcp-gateway-router.js            # Zero-downtime healthcheck proxy and fallback router
    ├── mcp-runner.js                    # 3-tier fallback environment loader for legacy tools
    └── publish-packages.js              # Idempotent multi-package publishing engine
```

---

## 3. In-House MCP Architecture & Infisical Implementation

### 3.1 Dual-Transport Design
Every MCP server in `mcp/*` is written in TypeScript and implements **dual transport modes**:
1. **HTTP Microservice Mode (`src/index.ts`)**: Built with Fastify on port `8080`. Designed to run inside the Kubernetes cluster behind the Cortex AgentGateway (Envoy-based), handling tool requests with distributed caching and centralized monitoring.
2. **Stdio Binary Mode (`src/bin.ts`)**: Invoked by CLI agents (Antigravity, Claude Code, Cursor) when operating locally or during gateway failover. Implements standard JSON-RPC 2.0 communication over standard input/output.

### 3.2 Infisical MCP Server (`@tupynambalucas-dev/agent-mcp-infisical`)
The Infisical MCP server was custom built to replace external or ad-hoc secret management scripts. It features:
- **Authentication**: Native Universal Auth (`POST /api/v1/auth/universal-auth/login`) with automatic machine token renewal and in-memory caching.
- **Three-Tier Configuration Fallback**:
  1. Process Environment Variables (`INFISICAL_CLIENT_ID`, `INFISICAL_CLIENT_SECRET`, `INFISICAL_PROJECT_ID`).
  2. Workspace `.env` / Root `.env` file loading.
  3. Machine-level fallback configuration.
- **Implemented Tool Primitives**:
  - `infisical_list_secrets`: Retrieves all secrets for a given environment (`dev`, `staging`, `prod`) and workspace path.
  - `infisical_get_secret`: Fetches single secret key value and metadata.
  - `infisical_create_secret`: Creates a new secret key-value pair.
  - `infisical_update_secret`: Modifies an existing secret value.
  - `infisical_delete_secret`: Removes a secret key from an environment.

### 3.3 Zero-Downtime Smart Router (`scripts/mcp-gateway-router.js`)
When an agent invokes an MCP tool, the invocation passes through `mcp-gateway-router.js`:
1. **Cluster Probe**: Sends a 300ms non-blocking HTTP health check (`GET http://localhost:8080/healthz` or the configured AgentGateway endpoint).
2. **Gateway Route (Primary)**: If healthy, proxy the JSON-RPC traffic over Streamable HTTP to the cluster gateway.
3. **Local Stdio Binary (Fallback)**: If the cluster gateway is unreachable or offline, spawn `node mcp/<target>/dist/bin.js` directly.
4. **Developer Continuity**: The failover occurs silently and instantly; developers never experience agent initialization failures or broken sessions due to offline clusters.

---

## 4. Granular Consumption Topologies

### Scenario A: Local Monorepo Integration (Inside `org-core`)

When operating inside the umbrella meta-repository where `agent-mesh` is checked out as a Git submodule:

#### Option 1: Load All Domain Plugins Simultaneously
In `.agents/plugins.json`:
```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins"
    }
  ]
}
```
*Antigravity Behavior*: The discovery engine inspects `entries` paths **one level deep**. Because `agent-mesh/plugins` contains subdirectories with valid `plugin.json` manifests, all 6 domain plugins are auto-discovered without requiring individual entries.

#### Option 2: Selective Plugin Loading via `include_only`
To conserve context window tokens for specialized workflows, restrict loaded plugins:
```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins",
      "include_only": ["github", "secrets", "meta"]
    }
  ]
}
```

#### Option 3: Direct Plugin Path Declarations
```json
{
  "entries": [
    { "path": "agent-mesh/plugins/docusaurus" },
    { "path": "agent-mesh/plugins/meta" }
  ]
}
```

---

### Scenario B: Standalone Workspace Integration (Outside `org-core`)

When developing in an external repository (e.g. `tessel`, client repositories, or CI runners) where `agent-mesh` is **not** present on disk and `.agents/plugins.json` does not exist:

#### 1. Via NPM Packages (GitHub Packages Registry)
Configure `.npmrc` to resolve the `@tupynambalucas-dev` scope:
```ini
@tupynambalucas-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Install only the domain plugins required by the workspace:
```bash
# Documentation monorepo:
pnpm add -D @tupynambalucas-dev/agent-plugin-docusaurus @tupynambalucas-dev/agent-plugin-meta

# Kubernetes platform service:
pnpm add -D @tupynambalucas-dev/agent-plugin-github @tupynambalucas-dev/agent-plugin-secrets
```

Create `.agents/plugins.json` in the root of the standalone project:
```json
{
  "entries": [
    { "path": "node_modules/@tupynambalucas-dev/agent-plugin-docusaurus" },
    { "path": "node_modules/@tupynambalucas-dev/agent-plugin-meta" }
  ]
}
```

#### 2. Via Antigravity CLI Plugin Installer (`agy`)
Install plugins directly into the workstation user profile (`~/.gemini/config/plugins/`):
```bash
# Install individual domain plugin globally
agy plugin install @tupynambalucas-dev/agent-plugin-github

# Or install directly from GitHub repository:
agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/github
```

#### 3. Via Claude Code Marketplace
Register the organization marketplace in Claude Code:
```bash
/plugin marketplace add tupynambalucas-dev/agent-mesh
```

Selectively install domain plugins:
```bash
/plugin install agent-plugin-github@tupynambalucas-dev
/plugin install agent-plugin-secrets@tupynambalucas-dev
/plugin install agent-plugin-meta@tupynambalucas-dev
```

#### 4. Direct CLI Execution of MCP Servers
MCP servers can be spawned on-demand in any environment using `npx` or `pnpm dlx`:
```bash
# Execute Infisical MCP server on stdio
npx -y @tupynambalucas-dev/agent-mcp-infisical

# Execute Firecrawl MCP server on stdio
npx -y @tupynambalucas-dev/agent-mcp-firecrawl

# Execute Google Workspace MCP server on stdio
npx -y @tupynambalucas-dev/agent-mcp-gwork
```

---

## 5. Validation and Verification Matrix

All 6 domain plugins have been verified using the official Antigravity plugin validator:

| Plugin Name | Manifest Path | Validator Status | Modular Skills | Rules | Scoped MCP Server |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `agent-plugin-appsheet` | `plugins/appsheet/plugin.json` | 100% PASS (0 warnings) | 3 skills | 1 rule | `cortex-appsheet`, `playwright` |
| `agent-plugin-docusaurus`| `plugins/docusaurus/plugin.json` | 100% PASS (0 warnings) | 3 skills | 1 rule | N/A |
| `agent-plugin-github` | `plugins/github/plugin.json` | 100% PASS (0 warnings) | 4 skills | 1 rule | `cortex-github` |
| `agent-plugin-google-workspace` | `plugins/google-workspace/plugin.json` | 100% PASS (0 warnings) | 3 skills | 1 rule | `cortex-gwork` |
| `agent-plugin-meta` | `plugins/meta/plugin.json` | 100% PASS (0 warnings) | 4 skills | 1 rule | N/A |
| `agent-plugin-research` | `plugins/research/plugin.json` | 100% PASS (0 warnings) | 2 skills | 1 rule | `cortex-firecrawl`, `context7` |
| `agent-plugin-secrets` | `plugins/secrets/plugin.json` | 100% PASS (0 warnings) | 2 skills | 1 rule | `cortex-infisical` |
| `agent-plugin-web` | `plugins/web/plugin.json` | 100% PASS (0 warnings) | 2 skills | 1 rule | `playwright`, `cortex-firecrawl` |

### 5.2 Live MCP Verification & JSON-RPC Test Matrix

All 8 MCP server targets were validated using direct JSON-RPC 2.0 handshake (`initialize`) and tool introspection (`tools/list`) through `scripts/mcp-gateway-router.js`:

| Target Service | Handshake Name & Version | Status | Verified Tool Count | Core Tool Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| `appsheet` | `cortex-appsheet-mcp@1.0.0` | **PASS** | 3 tools | `find_records`, `mutate_records`, `invoke_action` |
| `firecrawl` | `cortex-firecrawl-mcp@1.0.0` | **PASS** | 6 tools | `scrape`, `crawl`, `search`, `map`, `extract`, `batch_scrape` |
| `github` | `cortex-github-mcp@1.0.0` | **PASS** | 6 tools | `get_repo_info`, `list_org_repos`, `list_rulesets`, `get_ruleset`, `list_dependabot_alerts`, `list_secret_scanning_alerts` |
| `google-workspace` | `cortex-gwork-mcp@1.0.0` | **PASS** | 3 tools | `search_drive_files`, `create_spreadsheet`, `create_document` |
| `infisical` | `cortex-infisical-mcp@1.0.0` | **PASS** | 5 tools | `infisical_list_secrets`, `infisical_get_secret`, `infisical_create_secret`, `infisical_update_secret`, `infisical_delete_secret` |
| `memory` | `cortex-memory-mcp@1.0.0` | **PASS** | 4 tools | `search_knowledge`, `store_episodic`, `query_graph`, `ingest_document` |
| `context7` | `Context7@4.4.4` | **PASS** | 2 tools | `resolve-library-id`, `query-docs` |
| `playwright` | `Playwright@1.64.0-alpha` | **PASS** | 25 tools | `browser_navigate`, `browser_click`, `browser_type`, `browser_fill_form`, `browser_take_screenshot`, `browser_snapshot`, `browser_wait_for`, etc. |

All 13 workspace packages are published and maintained in GitHub Packages under `@tupynambalucas-dev/*`.
