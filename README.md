# Universal Agent Mesh (`@tupynambalucas-dev/agent-mesh`)

Universal enterprise AI agent substrate, domain plugin marketplace, modular skills, and Model Context Protocol (MCP) servers for the `tupynambalucas-dev` organization.

Compatible natively with **Google Antigravity (`agy`)**, **Anthropic Claude Code**, **Cursor**, and **GitHub Copilot**.

---

## 1. Architecture Overview

`agent-mesh` operates as an **Enterprise Agent Marketplace and Monorepo Hub**. Rather than bundling all tools and instructions into a single monolithic plugin, the substrate partitions capabilities into sovereign, independently versioned, and granularly importable packages:

- **9 Domain Plugins** ([plugins/](./plugins/README.md)): Self-contained Antigravity and Claude Code plugins with dedicated manifests, scoped MCP servers, domain rules, and modular skills.
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
├── plugins/                 # 9 Sovereign Domain Plugins
│   ├── AGENTS.md            # Plugins subsystem context router
│   ├── README.md            # Plugins subsystem documentation
│   └── packages/            # Domain plugin packages
│       ├── appsheet/        # @tupynambalucas-dev/agent-plugin-appsheet
│       ├── docusaurus/      # @tupynambalucas-dev/agent-plugin-docusaurus
│       ├── github-assistant/# @tupynambalucas-dev/agent-plugin-github-assistant
│       ├── github-manager/  # @tupynambalucas-dev/agent-plugin-github-manager
│       ├── google-workspace/# @tupynambalucas-dev/agent-plugin-google-workspace
│       ├── meta/            # @tupynambalucas-dev/agent-plugin-meta
│       ├── research/        # @tupynambalucas-dev/agent-plugin-research (Context7 + Firecrawl)
│       ├── secrets/         # @tupynambalucas-dev/agent-plugin-secrets
│       └── web/             # @tupynambalucas-dev/agent-plugin-web (Playwright + Firecrawl)
├── mcp/                     # 7 In-House Dual-Transport MCP Servers
│   ├── AGENTS.md            # MCP subsystem context router
│   ├── README.md            # MCP subsystem documentation
│   └── packages/            # MCP server packages
│       ├── appsheet/        # @tupynambalucas-dev/agent-mcp-appsheet
│       ├── firecrawl/       # @tupynambalucas-dev/agent-mcp-firecrawl
│       ├── github/          # @tupynambalucas-dev/agent-mcp-github
│       ├── google-workspace/# @tupynambalucas-dev/agent-mcp-gwork
│       ├── infisical/       # @tupynambalucas-dev/agent-mcp-infisical
│       ├── memory/          # @tupynambalucas-dev/agent-mcp-memory
│       └── playwright/      # @tupynambalucas-dev/agent-mcp-playwright
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

*Mechanism*: Antigravity scans `entries` directories **one level deep**. Pointing to `agent-mesh/plugins/packages` automatically discovers all 9 plugins (`appsheet`, `docusaurus`, `github-assistant`, `github-manager`, `google-workspace`, `meta`, `research`, `secrets`, `web`) and loads their modular skills, active rules, and scoped MCP servers.

#### 2. Selectively Load Specific Domain Plugins

To minimize context window token consumption, load only the plugins required by the active task using `include_only`:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages",
      "include_only": ["github-assistant", "secrets", "meta"]
    }
  ]
}
```

Or declare direct paths to individual plugin folders:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/docusaurus" },
    { "path": "agent-mesh/plugins/packages/meta" }
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
pnpm add -D @tupynambalucas-dev/agent-plugin-docusaurus @tupynambalucas-dev/agent-plugin-meta

# Example for a platform service:
pnpm add -D @tupynambalucas-dev/agent-plugin-github-assistant @tupynambalucas-dev/agent-plugin-secrets
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

#### 2. Via Antigravity CLI Plugin Installer (`agy`)

Install plugins directly into your workstation's global configuration (`~/.gemini/config/plugins/`):

```bash
# Install individual domain plugin globally
agy plugin install @tupynambalucas-dev/agent-plugin-github-assistant
agy plugin install @tupynambalucas-dev/agent-plugin-github-manager

# Or install from git URL:
agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/packages/github-assistant
```

#### 3. Via Claude Code Plugin Marketplace

Register the `tupynambalucas-dev` marketplace in Claude Code:

```bash
/plugin marketplace add tupynambalucas-dev/agent-mesh
```

Selectively install only the plugins you need for your active workflow:

```bash
/plugin install agent-plugin-github-assistant@tupynambalucas-dev
/plugin install agent-plugin-github-manager@tupynambalucas-dev
/plugin install agent-plugin-secrets@tupynambalucas-dev
/plugin install agent-plugin-meta@tupynambalucas-dev
```

---

## 3. Subsystem Overview

| Subsystem | Context Router | Documentation | Description |
| :--- | :--- | :--- | :--- |
| **Model Context Protocol** | [mcp/AGENTS.md](./mcp/AGENTS.md) | [mcp/README.md](./mcp/README.md) | 7 dual-transport MCP servers for browser automation, web research, Google Workspace, GitHub RBAC, secrets, and vector memory. |
| **Domain Plugins** | [plugins/AGENTS.md](./plugins/AGENTS.md) | [plugins/README.md](./plugins/README.md) | 9 domain plugins bundling modular skills, authoritative rules, and tool configurations. |
| **Scripts** | [scripts/AGENTS.md](./scripts/AGENTS.md) | [scripts/README.md](./scripts/README.md) | Zero-downtime gateway routing proxy, legacy tool runners, and multi-package publisher. |

---

## 4. Multi-Package Deployment Engine

Package publishing is orchestrated via [.github/workflows/publish.yml](./.github/workflows/publish.yml) and [scripts/publish-packages.js](./scripts/publish-packages.js).

When changes are pushed to `main`, the workflow:
1. Validates all domain plugins using `agy plugin validate . --strict`.
2. Compiles all TypeScript MCP packages (`pnpm mcp:build`).
3. Evaluates workspace packages against `https://npm.pkg.github.com`.
4. Idempotently publishes new versions to the GitHub Packages registry.

---

## 5. Governance Standards

All commits, pull requests, and agent contributions must strictly comply with:
- **Cryptographic SSH Signatures**: `git commit -S -m "..."`.
- **Conventional Commits**: `<type>(<scope>): <description>`.
- **Zero-Emoji Policy**: Emojis are strictly prohibited in code, commits, PRs, documentation, and chat.
- **Secret Hygiene**: Zero plaintext credentials committed to Git.
