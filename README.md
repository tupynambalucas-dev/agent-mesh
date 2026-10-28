# Universal Agent Mesh (`@tupynambalucas-dev/agent-mesh`)

Universal enterprise AI agent substrate, domain plugin marketplace, modular skills, and Model Context Protocol (MCP) servers for the `tupynambalucas-dev` organization.

Compatible natively with **Google Antigravity (`agy`)**, **Anthropic Claude Code**, **Cursor**, and **GitHub Copilot**.

---

## 1. Architecture Overview

`agent-mesh` operates as an **Enterprise Agent Marketplace and Monorepo Hub**. Rather than bundling all tools and instructions into a single monolithic plugin, the substrate partitions capabilities into sovereign, independently versioned, and granularly importable packages:

- **8 Domain Plugins** ([plugins/](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-mesh/plugins)): Self-contained Antigravity and Claude Code plugins with dedicated manifests, scoped MCP servers, and modular skills.
- **6 MCP Servers** ([mcp/](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-mesh/mcp)): Dual-transport TypeScript services operating as Kubernetes microservices (HTTP on port 8080) and local Stdio binaries for smart gateway failover.
- **1 Marketplace Registry** ([.claude-plugin/marketplace.json](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-mesh/.claude-plugin/marketplace.json)): Canonical manifest enabling selective plugin discovery and installation in Claude Code.
- **Enterprise Rules** ([rules/AGENTS.md](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-mesh/rules/AGENTS.md)): Authoritative organizational governance constraints (commit signing, conventional commits, zero-emoji invariant, secret hygiene).

```text
agent-mesh/
├── package.json             # Root monorepo workspace orchestrator
├── pnpm-workspace.yaml      # Monorepo packages mapping (plugins/*, mcp/*)
├── .claude-plugin/
│   └── marketplace.json     # Claude Code Plugin Marketplace registry
├── rules/
│   └── AGENTS.md            # Enterprise governance constraints and always-on rules
├── plugins/                 # 8 Sovereign Domain Plugins
│   ├── appsheet/            # @tupynambalucas-dev/agent-plugin-appsheet (AppSheet API + Playwright)
│   ├── docusaurus/          # @tupynambalucas-dev/agent-plugin-docusaurus
│   ├── github/              # @tupynambalucas-dev/agent-plugin-github
│   ├── google-workspace/    # @tupynambalucas-dev/agent-plugin-google-workspace
│   ├── meta/                # @tupynambalucas-dev/agent-plugin-meta
│   ├── research/            # @tupynambalucas-dev/agent-plugin-research (Context7 + Firecrawl)
│   ├── secrets/             # @tupynambalucas-dev/agent-plugin-secrets
│   └── web/                 # @tupynambalucas-dev/agent-plugin-web (Playwright + Firecrawl)
├── mcp/                     # 6 In-House Dual-Transport MCP Servers
│   ├── appsheet/            # @tupynambalucas-dev/agent-mcp-appsheet
│   ├── firecrawl/           # @tupynambalucas-dev/agent-mcp-firecrawl
│   ├── github/              # @tupynambalucas-dev/agent-mcp-github
│   ├── google-workspace/    # @tupynambalucas-dev/agent-mcp-gwork
│   ├── infisical/           # @tupynambalucas-dev/agent-mcp-infisical
│   └── memory/              # @tupynambalucas-dev/agent-mcp-memory
└── scripts/
    ├── mcp-runner.js        # 3-tier fallback environment loader for legacy tools
    ├── mcp-gateway-router.js# Zero-downtime healthcheck proxy and fallback router
    └── publish-packages.js  # Idempotent GitHub Packages multi-package publisher
```

---

## 2. Granular Consumption Guide

`agent-mesh` supports multiple integration topologies depending on whether the consumer repository has the `agent-mesh` folder mounted locally (as a Git submodule) or operates in total isolation.

### Scenario A: Local Monorepo Integration (Inside `org-core`)

When operating inside the `org-core` meta-repository where `agent-mesh` is mounted as a Git submodule, plugins are discovered directly from local disk with zero network overhead.

#### 1. Load All Domain Plugins Simultaneously

Configure [.agents/plugins.json](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/.agents/plugins.json) in your project root:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins"
    }
  ]
}
```

*Mechanism*: Antigravity scans `entries` directories **one level deep**. Pointing to `agent-mesh/plugins` automatically discovers all 6 plugins (`appsheet`, `docusaurus`, `github`, `google-workspace`, `meta`, `secrets`) and loads their 19 modular skills and scoped MCP servers.

#### 2. Selectively Load Specific Domain Plugins

To minimize context window token consumption, load only the plugins required by the active task using `include_only`:

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

Or declare direct paths to individual plugin folders:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/docusaurus" },
    { "path": "agent-mesh/plugins/meta" }
  ]
}
```

---

### Scenario B: Standalone Workspace Integration (Without `agent-mesh` Local Directory)

When working in an independent repository (e.g. `tessel`, external client projects, or a fresh workstation checkout) where `agent-mesh` is **not** present on disk and [.agents/plugins.json](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/.agents/plugins.json) does not exist:

#### 1. Via NPM Packages (GitHub Packages Registry)

Install only the domain plugins required by your project:

```bash
# Example for a documentation portal:
pnpm add -D @tupynambalucas-dev/agent-plugin-docusaurus @tupynambalucas-dev/agent-plugin-meta

# Example for a platform service:
pnpm add -D @tupynambalucas-dev/agent-plugin-github @tupynambalucas-dev/agent-plugin-secrets
```

Create `.agents/plugins.json` in the root of your standalone project:

```json
{
  "entries": [
    { "path": "node_modules/@tupynambalucas-dev/agent-plugin-docusaurus" },
    { "path": "node_modules/@tupynambalucas-dev/agent-plugin-meta" }
  ]
}
```

*Benefit*: Zero token waste. The agent does not load AppSheet, Kubernetes, or GitHub administration skills into sessions that only touch documentation or backend APIs.

#### 2. Via Antigravity CLI Plugin Installer (`agy`)

Install plugins directly into your workstation's global configuration (`~/.gemini/config/plugins/`):

```bash
# Install individual domain plugin globally
agy plugin install @tupynambalucas-dev/agent-plugin-github

# Or install from git URL:
agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/github
```

#### 3. Via Claude Code Plugin Marketplace

Register the `tupynambalucas-dev` marketplace in Claude Code:

```bash
/plugin marketplace add tupynambalucas-dev/agent-mesh
```

Selectively install only the plugins you need for your active workflow:

```bash
/plugin install agent-plugin-github@tupynambalucas-dev
/plugin install agent-plugin-secrets@tupynambalucas-dev
/plugin install agent-plugin-meta@tupynambalucas-dev
```

---

## 3. In-House MCP Packages Inventory (`mcp/*`)

All 6 in-house MCP servers are compiled TypeScript packages with dual transports:

| MCP Package Name | Directory | Primary Capabilities | Dual Transports |
| :--- | :--- | :--- | :--- |
| `@tupynambalucas-dev/agent-mcp-firecrawl` | `mcp/firecrawl` | Deep web scraping, crawling, markdown extraction | Fastify :8080 & Stdio (`bin.js`) |
| `@tupynambalucas-dev/agent-mcp-memory` | `mcp/memory` | Semantic RAG vector store, episodic memory | Fastify :8080 & Stdio (`bin.js`) |
| `@tupynambalucas-dev/agent-mcp-github` | `mcp/github` | Organization RBAC, rulesets, security triage | Fastify :8080 & Stdio (`bin.js`) |
| `@tupynambalucas-dev/agent-mcp-gwork` | `mcp/google-workspace` | Drive folders, Sheets synthesis, Docs publishing | Fastify :8080 & Stdio (`bin.js`) |
| `@tupynambalucas-dev/agent-mcp-appsheet` | `mcp/appsheet` | Relational schema modeling, REST API v2 CRUD | Fastify :8080 & Stdio (`bin.js`) |
| `@tupynambalucas-dev/agent-mcp-infisical` | `mcp/infisical` | Universal Auth machine tokens, secret CRUD | Fastify :8080 & Stdio (`bin.js`) |

### Direct CLI Execution

Any in-house MCP server can be executed directly via `npx` or `pnpm dlx`:

```bash
# Execute Firecrawl MCP server on stdio
npx -y @tupynambalucas-dev/agent-mcp-firecrawl

# Execute Infisical MCP server on stdio
npx -y @tupynambalucas-dev/agent-mcp-infisical
```

### Smart Gateway Router & Zero-Downtime Fallback

Plugins invoke MCP tools through [scripts/mcp-gateway-router.js](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-mesh/scripts/mcp-gateway-router.js). The router performs a 300ms non-blocking probe on the cluster Envoy AgentGateway:
- If AgentGateway is healthy: routes requests over Streamable HTTP to `http://localhost:8080/mcp`.
- If AgentGateway is offline: spawns the local compiled binary `node mcp/<target>/dist/bin.js` with zero interruption to developer sessions.

---

## 4. Multi-Package Deployment Engine

Package publishing is orchestrated via [.github/workflows/publish.yml](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-mesh/.github/workflows/publish.yml) and [scripts/publish-packages.js](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-mesh/scripts/publish-packages.js).

When changes are pushed to `main`, the workflow:
1. Validates all domain plugins using `agy plugin validate . --strict`.
2. Compiles all TypeScript MCP packages (`tsc -p tsconfig.build.json`).
3. Evaluates all 13 workspace packages against `https://npm.pkg.github.com`.
4. Idempotently publishes new versions to the GitHub Packages registry.

---

## 5. Governance Standards

All commits, pull requests, and agent contributions must strictly comply with:
- **Cryptographic SSH Signatures**: `git commit -S -m "..."`.
- **Conventional Commits**: `<type>(<scope>): <description>`.
- **Zero-Emoji Policy**: Emojis are strictly prohibited in code, commits, PRs, and chat.
- **Secret Hygiene**: Zero plaintext credentials committed to Git.
