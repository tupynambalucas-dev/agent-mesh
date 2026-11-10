# Universal Agent Mesh (`@tupynambalucas-dev/agent-mesh`)

Universal enterprise AI agent substrate, domain plugin marketplace, modular skills, and self-contained Model Context Protocol (MCP) servers for the `tupynambalucas-dev` organization.

Compatible natively with **Google Antigravity (`agy`)**, **Anthropic Claude Code**, **Cursor**, **GitHub Copilot**, and the **Agent Plugins 1.0.0 (`agent-plugins.org`)** specification.

---

## 1. Architecture Overview

`agent-mesh` operates as both an **Enterprise Agent Marketplace & Monorepo Hub** and a **Public Umbrella Package (`@tupynambalucas-dev/agent-mesh`)**. Capabilities are partitioned into sovereign, independently versioned packages that can be consumed either all at once via the umbrella package or selectively per domain:

- **10 Domain Plugins** ([plugins/](./plugins/README.md)): Self-contained plugins compliant with `agent-plugins.org` v1.0.0 and native Antigravity with dedicated manifests (`plugin.json`), dual-mode MCP bindings (`mcp.json` + `mcp_config.json`), domain rules (`rules/AGENTS.md`), modular skills, and sovereign launchers (`scripts/launcher.cjs`).
- **8 Sovereign MCP Servers & 1 Core Library** ([mcp/](./mcp/README.md)): Domain-scoped dual-transport TypeScript services (`mcp/servers/*`) compiled via `tsup` into self-contained CommonJS bundles (`dist/bin.cjs` for Stdio and `dist/index.cjs` for Fastify HTTP on port `:8080`), backed by shared internal libraries (`mcp/core/*`).
- **4 Declarative Presets** ([presets/](./references/reference/umbrella-package-and-presets.md)): Pre-configured domain filter profiles (`all.json`, `backend-api.json`, `frontend-web.json`, `docs-portal.json`).
- **1 Marketplace Registry** ([.claude-plugin/marketplace.json](./.claude-plugin/marketplace.json)): Canonical manifest enabling selective plugin discovery and installation in Anthropic Claude Code.
- **Release & Orchestration Scripts** ([scripts/](./scripts/README.md)): Two-stage monorepo and root umbrella package release pipeline (`publish-root.cjs`).
- **Documentation Hub** ([references/](./references/README.md)): Authoritative technical documentation organized according to the Diátaxis framework (tutorials, how-to guides, reference, explanation).
- **AI Planning & Verification Hub** ([.agents/](./.agents/README.md)): Deep technical analyses, architectural master plans, and verification reports.

```text
agent-mesh/
├── package.json             # Root monorepo & public umbrella package (@tupynambalucas-dev/agent-mesh)
├── turbo.json               # Turborepo task pipeline configuration
├── pnpm-workspace.yaml      # Monorepo packages mapping with pnpm catalogs (catalog:, shared, mcp-stack)
├── tsconfig.base.json       # Base TypeScript compiler configuration
├── tsconfig.json            # Solution-style TypeScript project references
├── .npmrc                   # Registry routing (@tupynambalucas-dev -> npm.pkg.github.com)
├── CHANGELOG.md             # Release history and version changelog
├── AGENTS.md                # Sovereign root context router (Layer 1)
├── README.md                # Primary developer documentation
├── .claude-plugin/
│   └── marketplace.json     # Claude Code Plugin Marketplace registry
├── .changeset/              # Changesets semantic versioning configuration
├── .github/                 # CI/CD workflows (ci.yml, publish.yml, admin-packages.yml) & composite actions
├── presets/                 # Declarative domain plugin preset profiles
│   ├── all.json             # All 10 domain plugins
│   ├── backend-api.json     # repo, github-flow, secrets, research, web
│   ├── frontend-web.json    # repo, github-flow, secrets, research, web
│   └── docs-portal.json     # repo, github-flow, docusaurus, research
├── plugins/                 # 10 Sovereign Domain Plugins & Shared Utilities
│   ├── AGENTS.md            # Plugins subsystem context router (Layer 2)
│   ├── README.md            # Plugins subsystem documentation
│   ├── core/                # Reserved for shared internal plugin libraries
│   └── packages/            # Deployable domain plugin packages (Layer 3)
│       ├── appsheet/        # @tupynambalucas-dev/plugin-appsheet
│       ├── atelier/         # @tupynambalucas-dev/plugin-atelier (AI Agent Atelier)
│       ├── docusaurus/      # @tupynambalucas-dev/plugin-docusaurus
│       ├── github-flow/     # @tupynambalucas-dev/plugin-github-flow
│       ├── github-org/      # @tupynambalucas-dev/plugin-github-org
│       ├── gwork/           # @tupynambalucas-dev/plugin-gwork
│       ├── repo/            # @tupynambalucas-dev/plugin-repo (Repository Standards & Health)
│       ├── research/        # @tupynambalucas-dev/plugin-research (Context7 + Firecrawl)
│       ├── secrets/         # @tupynambalucas-dev/plugin-secrets
│       └── web/             # @tupynambalucas-dev/plugin-web (Multi-mode Playwright + Firecrawl)
├── mcp/                     # 8 In-House Dual-Transport MCP Servers & 1 Core Library
│   ├── AGENTS.md            # MCP subsystem context router (Layer 2)
│   ├── README.md            # MCP subsystem documentation
│   ├── core/                # Shared MCP libraries (Layer 3)
│   │   └── github/          # @tupynambalucas-dev/mcp-core-github (Three-Tier App Auth & Schemas)
│   └── servers/             # Deployable self-contained MCP server packages (Layer 3)
│       ├── appsheet/        # @tupynambalucas-dev/mcp-appsheet (dist/bin.cjs + scripts/launcher.cjs)
│       ├── firecrawl/       # @tupynambalucas-dev/mcp-firecrawl (dist/bin.cjs + scripts/launcher.cjs)
│       ├── github-flow/     # @tupynambalucas-dev/mcp-github-flow (Tier 3 Developer Workflows)
│       ├── github-org/      # @tupynambalucas-dev/mcp-github-org (Tier 1 Org Governance & Security)
│       ├── gwork/           # @tupynambalucas-dev/mcp-gwork (dist/bin.cjs + scripts/launcher.cjs)
│       ├── infisical/       # @tupynambalucas-dev/mcp-infisical (dist/bin.cjs + scripts/launcher.cjs)
│       ├── memory/          # @tupynambalucas-dev/mcp-memory (dist/bin.cjs + scripts/launcher.cjs)
│       └── playwright/      # @tupynambalucas-dev/mcp-playwright (Sovereign engine + upstream fallback)
├── scripts/
│   ├── AGENTS.md            # Scripts subsystem context router (Layer 2)
│   ├── README.md            # Scripts subsystem documentation
│   └── publish-root.cjs     # Idempotent GitHub Packages root umbrella publisher
├── references/              # Diátaxis technical documentation hub
│   ├── AGENTS.md            # References subsystem context router (Layer 2)
│   ├── README.md            # Master quadrant index
│   ├── tutorials/           # Learning-oriented step-by-step guides
│   ├── how-to-guides/       # Problem-oriented operational recipes
│   ├── reference/           # Information-oriented technical schemas & catalogs
│   └── explanation/         # Understanding-oriented architecture & rationale
└── .agents/                 # AI agent planning, analyses, blueprints, and reports hub
    ├── AGENTS.md            # Agent planning context router (Layer 2)
    ├── README.md            # Planning hub overview
    ├── analyses/            # Deep technical and architectural lifecycle analyses
    ├── plans/               # Architectural master plans and migration runbooks
    └── reports/             # Verification analyses, refactoring audits, and benchmarks
```

---

## 2. Consumption & Integration Guide

`agent-mesh` supports two primary consumption topologies: direct relative-path discovery at the `org-core` meta-repository root, and package-based consumption via the `@tupynambalucas-dev/agent-mesh` umbrella package across all standalone repositories (`omnichannel`) and child monorepos (`platform`, `docs`).

### Scenario A: Meta-Repository Root Integration (`org-core`)

When operating directly at the `org-core` root where `agent-mesh` is present locally via Mani, configure `org-core/.agents/plugins.json` using relative paths:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages"
    },
    {
      "path": "platform/.agents/plugins"
    }
  ]
}
```

*Mechanism*: Antigravity scans `entries` directories **one level deep**, discovering all 10 domain plugins (`appsheet`, `atelier`, `docusaurus`, `github-flow`, `github-org`, `gwork`, `repo`, `research`, `secrets`, `web`) and mounting their skills, rules, and MCP servers.

---

### Scenario B: External Repositories & Child Monorepos (Hybrid Umbrella Standard)

For standalone repositories (such as `omnichannel`) and child monorepos (`platform`, `docs`), consume the single public umbrella package `@tupynambalucas-dev/agent-mesh`.

#### 1. Install via Pnpm Catalogs

- **Channel 1 — Zero-Token Git Dependency (Recommended Default)**:
  Because GitHub Packages (`npm.pkg.github.com`) requires a `NODE_AUTH_TOKEN` with `read:packages` even for public packages, `agent-mesh` tracks its pre-bundled MCP server binaries (`!mcp/servers/*/dist/`) directly in Git. Declare the Git specifier in `pnpm-workspace.yaml` for zero-token installation:
  ```yaml
  catalogs:
    plugins-stack:
      '@tupynambalucas-dev/agent-mesh': 'github:tupynambalucas-dev/agent-mesh'
  ```
- **Channel 2 — Authenticated GitHub Packages Registry**:
  When `NODE_AUTH_TOKEN` (`read:packages`) is configured in the environment alongside `.npmrc` (`@tupynambalucas-dev:registry=https://npm.pkg.github.com`):
  ```yaml
  catalogs:
    plugins-stack:
      '@tupynambalucas-dev/agent-mesh': ^1.2.0
  ```

Reference the catalog in the consumer repository's root `package.json` and run `pnpm install`:

```json
{
  "devDependencies": {
    "@tupynambalucas-dev/agent-mesh": "catalog:plugins-stack"
  }
}
```

#### 2. Configure `.agents/plugins.json` (Bulk or Selective `include_only`)

To load **all 10 domain plugins** simultaneously:

```json
{
  "entries": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages"
    }
  ]
}
```

To **selectively load specific domain plugins** (conserving LLM context tokens while keeping a single package dependency):

```json
{
  "entries": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages",
      "include_only": [
        "repo",
        "github-flow",
        "secrets",
        "research",
        "web"
      ]
    }
  ]
}
```

#### 3. Advanced: Individual Standalone Plugin Packages

If a consumer requires only a single standalone plugin package from GitHub Packages:

```bash
pnpm add -D @tupynambalucas-dev/plugin-docusaurus @tupynambalucas-dev/plugin-atelier
```

---

### Scenario C: CLI Global Installation & Claude Code Marketplace

#### 1. Via Antigravity CLI (`agy`)

```bash
# Install individual domain plugin globally from GitHub
agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/packages/github-flow
```

#### 2. Via Claude Code Plugin Marketplace

```bash
# Register the tupynambalucas-dev marketplace
/plugin marketplace add tupynambalucas-dev/agent-mesh

# Install plugins selectively
/plugin install github-flow@tupynambalucas-dev
/plugin install github-org@tupynambalucas-dev
/plugin install secrets@tupynambalucas-dev
/plugin install atelier@tupynambalucas-dev
```

---

## 3. Sovereign MCP Bundling & Two-Tier Launcher Architecture

Every MCP server and domain plugin operates with complete runtime independence:

1. **Inlined Self-Contained CJS Bundles (`mcp/servers/*/dist/bin.cjs`)**:
   Built with `tsup` (`noExternal`), all 8 MCP servers inline `@modelcontextprotocol/sdk`, `@octokit/*`, `fastify`, `zod`, and `dotenv`. Consumer repositories do not need to install MCP SDK dependencies.
2. **Sovereign MCP Launchers (`mcp/servers/*/scripts/launcher.cjs`)**:
   Each MCP server ships its own `scripts/launcher.cjs`, `mcp.json`, and `bin` entry (`mcp-<name>`), loading `.env` variables in cascade and spawning its co-located `dist/bin.cjs`.
3. **Decoupled Plugin Launchers (`plugins/packages/*/scripts/launcher.cjs`)**:
   Each plugin launcher dynamically locates its target MCP server via `resolveMcpLauncher()` (checking standalone `@tupynambalucas-dev/mcp-<name>` -> umbrella `node_modules/@tupynambalucas-dev/agent-mesh/mcp/servers/<name>` -> monorepo sibling) or routes to the Kubernetes Cortex Gateway (`MESH_PROFILE=cluster`).
4. **Playwright Resilient Fallback**:
   When `mcp-playwright` is invoked inside a consumer repository that does not install `playwright` locally, `mcp/servers/playwright/scripts/launcher.cjs` automatically falls back to `npx -y @playwright/mcp@0.0.84` with all configured mode flags (`headless`, `extension`, `channel`, `cdp`).

For full technical details, consult:
- [How to Consume Plugins in Antigravity and Claude Code](./references/how-to-guides/consuming-plugins-in-antigravity-and-claude.md)
- [Umbrella Package & Presets Specification](./references/reference/umbrella-package-and-presets.md)
- [MCP Server Catalog](./references/reference/mcp-server-catalog.md)

---

## 4. Sovereign Governance Rules

All contributions, automated agents, and developers operating within `agent-mesh` must adhere strictly to the enterprise constraints:

1. **Cryptographic SSH Signatures**: Every commit must be signed using SSH (`git commit -S -m "..."`). Unsigned commits are rejected by branch rulesets.
2. **Conventional Commits Standard**: All commit messages must follow `<type>(<scope>): <description>` (v1.0.0).
3. **Zero-Emoji Policy**: Emojis are strictly forbidden across code, markdown headers, body text, commit messages, and PR descriptions.
4. **Secret Hygiene**: Zero plaintext credentials. All tokens cascade from Infisical or local `.env` files.
5. **Language Standards**: Technical specifications, configuration files, and git messages are authored strictly in English (en-US). Conversational developer pairing is conducted in Brazilian Portuguese (pt-BR).
