# Universal Agent Mesh (`@tupynambalucas-dev/agent-mesh`)

Universal enterprise AI agent substrate, domain plugin marketplace, modular skills, and Model Context Protocol (MCP) servers for the `tupynambalucas-dev` organization.

Compatible natively with **Google Antigravity (`agy`)**, **Anthropic Claude Code**, **Cursor**, **GitHub Copilot**, and the **Agent Plugins 1.0.0 (`agent-plugins.org`)** specification.

---

## 1. Architecture Overview

`agent-mesh` operates as an **Enterprise Agent Marketplace and Monorepo Hub**. Rather than bundling all tools and instructions into a single monolithic plugin, the substrate partitions capabilities into sovereign, independently versioned, and granularly importable packages:

- **10 Domain Plugins** ([plugins/](./plugins/README.md)): Self-contained plugins compliant with `agent-plugins.org` v1.0.0 and native Antigravity with dedicated manifests, dual-mode MCP servers (`mcp.json` + `mcp_config.json`), domain rules (`rules/AGENTS.md`), and modular skills.
- **7 MCP Servers** ([mcp/](./mcp/README.md)): Dual-transport TypeScript services operating as Kubernetes microservices (HTTP on port 8080) and local Stdio binaries for smart gateway failover.
- **1 Marketplace Registry** ([.claude-plugin/marketplace.json](./.claude-plugin/marketplace.json)): Canonical manifest enabling selective plugin discovery and installation in Claude Code.
- **Orchestration Scripts** ([scripts/](./scripts/README.md)): Smart MCP gateway router, fallback runners, and package publisher.

```text
agent-mesh/
├── package.json             # Root monorepo workspace orchestrator (Turborepo)
├── turbo.json               # Turborepo task pipeline configuration
├── pnpm-workspace.yaml      # Monorepo packages mapping with pnpm catalogs
├── AGENTS.md                # Sovereign root context router for agent-mesh
├── README.md                # Primary developer documentation
├── .claude-plugin/
│   └── marketplace.json     # Claude Code Plugin Marketplace registry
├── plugins/                 # 10 Sovereign Domain Plugins
│   ├── AGENTS.md            # Plugins subsystem context router
│   ├── README.md            # Plugins subsystem documentation
│   └── packages/            # Domain plugin packages
│       ├── appsheet/        # @tupynambalucas-dev/plugin-appsheet
│       ├── atelier/         # @tupynambalucas-dev/plugin-atelier (AI Agent Atelier)
│       ├── docusaurus/      # @tupynambalucas-dev/plugin-docusaurus
│       ├── github-flow/     # @tupynambalucas-dev/plugin-github-flow
│       ├── github-org/      # @tupynambalucas-dev/plugin-github-org
│       ├── gwork/           # @tupynambalucas-dev/plugin-gwork
│       ├── repo/            # @tupynambalucas-dev/plugin-repo (Repository Standards & Health)
│       ├── research/        # @tupynambalucas-dev/plugin-research (Context7 + Firecrawl)
│       ├── secrets/         # @tupynambalucas-dev/plugin-secrets
│       └── web/             # @tupynambalucas-dev/plugin-web (Playwright + Firecrawl)
├── mcp/                     # 7 In-House Dual-Transport MCP Servers
│   ├── AGENTS.md            # MCP subsystem context router
│   ├── README.md            # MCP subsystem documentation
│   └── packages/            # MCP server packages
│       ├── appsheet/        # @tupynambalucas-dev/mcp-appsheet
│       ├── firecrawl/       # @tupynambalucas-dev/mcp-firecrawl
│       ├── github/          # @tupynambalucas-dev/mcp-github
│       ├── gwork/           # @tupynambalucas-dev/mcp-gwork
│       ├── infisical/       # @tupynambalucas-dev/mcp-infisical
│       ├── memory/          # @tupynambalucas-dev/mcp-memory
│       └── playwright/      # @tupynambalucas-dev/mcp-playwright
└── scripts/
    ├── AGENTS.md            # Scripts subsystem context router
    ├── README.md            # Scripts subsystem documentation
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

Configure [.agents/plugins.json](../.agents/plugins.json) in your project root:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages"
    }
  ]
}
```

*Mechanism*: Antigravity scans `entries` directories **one level deep**. Pointing to `agent-mesh/plugins/packages` automatically discovers all 10 plugins (`appsheet`, `atelier`, `docusaurus`, `github-flow`, `github-org`, `gwork`, `repo`, `research`, `secrets`, `web`) and loads their modular skills, active rules, and scoped MCP servers.

#### 2. Selectively Load Specific Domain Plugins

To minimize context window token consumption, load only the plugins required by the active task using `include_only`:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages",
      "include_only": ["github-flow", "secrets", "atelier"]
    }
  ]
}
```

Or declare direct paths to individual plugin folders:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/docusaurus" },
    { "path": "agent-mesh/plugins/packages/atelier" }
  ]
}
```

---

### Scenario B: Standalone Workspace Integration (Without `agent-mesh` Local Directory)

When working in an independent repository where `agent-mesh` is not present on disk and `.agents/plugins.json` does not exist:

#### 1. Via NPM Packages (GitHub Packages Registry)

Install only the domain plugins required by your project:

```bash
# Example for a documentation portal:
pnpm add -D @tupynambalucas-dev/plugin-docusaurus @tupynambalucas-dev/plugin-atelier

# Example for a platform service:
pnpm add -D @tupynambalucas-dev/plugin-github-flow @tupynambalucas-dev/plugin-secrets
```

Create `.agents/plugins.json` in the root of your standalone project:

```json
{
  "entries": [
    { "path": "node_modules/@tupynambalucas-dev/plugin-docusaurus" },
    { "path": "node_modules/@tupynambalucas-dev/plugin-atelier" }
  ]
}
```

#### 2. Via Antigravity CLI Plugin Installer (`agy`)

Install plugins directly into your workstation's global configuration (`~/.gemini/config/plugins/`):

```bash
# Install individual domain plugin globally
agy plugin install @tupynambalucas-dev/plugin-github-flow
agy plugin install @tupynambalucas-dev/plugin-github-org

# Or install from git URL:
agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/packages/github-flow
```

#### 3. Via Claude Code Plugin Marketplace

Register the `tupynambalucas-dev` marketplace in Claude Code:

```bash
/plugin marketplace add tupynambalucas-dev/agent-mesh
```

Selectively install only the plugins you need for your active workflow:

```bash
/plugin install github-flow@tupynambalucas-dev
/plugin install github-org@tupynambalucas-dev
/plugin install secrets@tupynambalucas-dev
/plugin install atelier@tupynambalucas-dev
```

---

## 3. Sovereign Governance Rules

All contributions, automated agents, and developers operating within `agent-mesh` must adhere strictly to the enterprise constraints:

1. **Cryptographic SSH Signatures**: Every commit must be signed using SSH (`git commit -S -m "..."`). Unsigned commits are rejected by branch rulesets.
2. **Conventional Commits Standard**: All commit messages must follow `<type>(<scope>): <description>` (v1.0.0).
3. **Zero-Emoji Policy**: Emojis are strictly forbidden across code, markdown headers, body text, commit messages, and PR descriptions.
4. **Secret Hygiene**: Zero plaintext credentials. All tokens cascade from Infisical or local `.env` files.
5. **Language Standards**: Technical specifications, configuration files, and git messages are authored strictly in English (en-US). Conversational developer pairing is conducted in Brazilian Portuguese (pt-BR).
