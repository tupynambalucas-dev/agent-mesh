# Universal Agent Mesh (`@tupynambalucas-dev/agent-mesh`)

Universal enterprise AI agent substrate, domain plugin marketplace, modular skills, and self-contained Model Context Protocol (MCP) servers for the `tupynambalucas-dev` organization. Compatible natively with **Google Antigravity (`agy`)**, **Anthropic Claude Code**, **Cursor**, **GitHub Copilot**, and the **Agent Plugins 1.0.0 (`agent-plugins.org`)** specification.

---

## 1. Architecture Overview

`agent-mesh` operates as both an **Enterprise Agent Marketplace & Monorepo Hub** and a **Public Umbrella Package (`@tupynambalucas-dev/agent-mesh`)**. Capabilities are partitioned into sovereign, independently versioned packages that can be consumed either all at once via the umbrella package or selectively per domain:

- **11 Domain Plugins** ([`plugins/`](./plugins/README.md)): Self-contained plugins compliant with `agent-plugins.org` v1.0.0 and native Antigravity with dedicated manifests (`plugin.json`), dual-mode MCP bindings (`mcp.json` + `mcp_config.json`), domain rules (`rules/AGENTS.md`), modular skills, and sovereign launchers (`scripts/launcher.cjs`).
- **9 Sovereign MCP Servers & 1 Core Library** ([`mcp/`](./mcp/README.md)): Domain-scoped dual-transport TypeScript services (`mcp/servers/*`) compiled via `tsup` into self-contained CommonJS bundles (`dist/bin.cjs` for Stdio and `dist/index.cjs` for Fastify HTTP on port `:8080`), backed by shared internal libraries (`mcp/core/*`).
- **4 Declarative Presets** ([`presets/`](./references/reference/umbrella-package-and-presets.md)): Pre-configured domain filter profiles (`all.json`, `backend-api.json`, `frontend-web.json`, `docs-portal.json`).
- **1 Marketplace Registry** ([`.claude-plugin/marketplace.json`](./.claude-plugin/marketplace.json)): Canonical manifest enabling selective plugin discovery and installation in Anthropic Claude Code.
- **Release & Orchestration Scripts** ([`scripts/`](./scripts/README.md)): Two-stage monorepo and root umbrella package release pipeline (`publish-root.cjs`).
- **Documentation Hub** ([`references/`](./references/README.md)): Authoritative technical documentation organized according to the Diátaxis framework (`tutorials/`, `how-to-guides/`, `reference/`, `explanation/`).
- **AI Planning & Verification Hub** ([`.agents/`](./.agents/README.md)): Deep technical analyses, architectural master plans, and verification reports.

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
├── LICENSE                  # Apache License 2.0
├── .claude-plugin/
│   └── marketplace.json     # Claude Code Plugin Marketplace registry
├── .changeset/              # Changesets semantic versioning configuration
├── .github/                 # CI/CD workflows (ci.yml, publish.yml, admin-packages.yml) & composite actions
├── presets/                 # Declarative domain plugin preset profiles (all, backend-api, frontend-web, docs-portal)
├── plugins/                 # 10 Sovereign Domain Plugins & Shared Utilities (Layer 2)
│   └── packages/            # Deployable domain plugin packages (Layer 3)
├── mcp/                     # 8 In-House Dual-Transport MCP Servers & 1 Core Library (Layer 2)
│   ├── core/github/         # @tupynambalucas-dev/mcp-core-github (Layer 3)
│   └── servers/             # Deployable self-contained MCP server packages (Layer 3)
├── scripts/                 # Publishing & orchestration automation (Layer 2)
├── references/              # Diataxis technical documentation hub (Layer 2)
└── .agents/                 # AI agent planning, analyses, blueprints, and reports hub (Layer 2)
```

---

## 2. Subsystems & Navigation

### Layer-2 Bounded Contexts

| Subsystem | Scope / Role | Documentation | Agent Context | Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **`plugins/`** | Domain Plugins Hub | [`plugins/README.md`](./plugins/README.md) | [`plugins/AGENTS.md`](./plugins/AGENTS.md) | Houses all 10 cross-vendor domain plugins (`plugins/packages/*`). |
| **`mcp/`** | MCP Servers & Core | [`mcp/README.md`](./mcp/README.md) | [`mcp/AGENTS.md`](./mcp/AGENTS.md) | Houses 8 dual-transport MCP servers (`mcp/servers/*`) and shared auth (`mcp/core/github`). |
| **`scripts/`** | Release Automation | [`scripts/README.md`](./scripts/README.md) | [`scripts/AGENTS.md`](./scripts/AGENTS.md) | Idempotent GitHub Packages umbrella publisher (`publish-root.cjs`). |
| **`references/`** | Diátaxis Hub | [`references/README.md`](./references/README.md) | [`references/AGENTS.md`](./references/AGENTS.md) | Tutorials, how-to guides, reference catalogs, and architectural explanations. |
| **`.agents/`** | Planning & Audits | [`.agents/README.md`](./.agents/README.md) | [`.agents/AGENTS.md`](./.agents/AGENTS.md) | Master architectural plans, lifecycle analyses, and verification reports. |

### Layer-3 Domain Plugins (`plugins/packages/*`)

| Plugin Package | Directory | Documentation | Domain Rules | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| `@tupynambalucas-dev/plugin-appsheet` | `plugins/packages/appsheet` | [`README.md`](./plugins/packages/appsheet/README.md) | [`rules/AGENTS.md`](./plugins/packages/appsheet/rules/AGENTS.md) | AppSheet relational schema design, REST API v2 operations, and Studio automation. |
| `@tupynambalucas-dev/plugin-atelier` | `plugins/packages/atelier` | [`README.md`](./plugins/packages/atelier/README.md) | [`rules/AGENTS.md`](./plugins/packages/atelier/rules/AGENTS.md) | Agent context routers, skills, rules, lifecycle hooks, plugin manifests, and plans. |
| `@tupynambalucas-dev/plugin-docusaurus` | `plugins/packages/docusaurus` | [`README.md`](./plugins/packages/docusaurus/README.md) | [`rules/AGENTS.md`](./plugins/packages/docusaurus/rules/AGENTS.md) | Diátaxis documentation architecture, MDX v3 compliance, and Crowdin isolation. |
| `@tupynambalucas-dev/plugin-github-flow` | `plugins/packages/github-flow` | [`README.md`](./plugins/packages/github-flow/README.md) | [`rules/AGENTS.md`](./plugins/packages/github-flow/rules/AGENTS.md) | Single-Branch GitHub Flow, SSH commit signing, Conventional Commits, and CI triage. |
| `@tupynambalucas-dev/plugin-github-org` | `plugins/packages/github-org` | [`README.md`](./plugins/packages/github-org/README.md) | [`rules/AGENTS.md`](./plugins/packages/github-org/rules/AGENTS.md) | Organization RBAC, repository rulesets, GitHub App manifest provisioning, and security audits. |
| `@tupynambalucas-dev/plugin-gwork` | `plugins/packages/gwork` | [`README.md`](./plugins/packages/gwork/README.md) | [`rules/AGENTS.md`](./plugins/packages/gwork/rules/AGENTS.md) | Google Drive management, 1NF Sheets synthesis, and Google Docs publishing. |
| `@tupynambalucas-dev/plugin-repo` | `plugins/packages/repo` | [`README.md`](./plugins/packages/repo/README.md) | [`rules/AGENTS.md`](./plugins/packages/repo/rules/AGENTS.md) | Enterprise README architecture & auditing, monorepo catalogs, licensing, community health, and Mani. |
| `@tupynambalucas-dev/plugin-research` | `plugins/packages/research` | [`README.md`](./plugins/packages/research/README.md) | [`rules/AGENTS.md`](./plugins/packages/research/rules/AGENTS.md) | Upstream SDK documentation lookup via Context7 and web extraction via Firecrawl. |
| `@tupynambalucas-dev/plugin-secrets` | `plugins/packages/secrets` | [`README.md`](./plugins/packages/secrets/README.md) | [`rules/AGENTS.md`](./plugins/packages/secrets/rules/AGENTS.md) | Infisical Cloud secret governance, Universal Auth identities, and zero-downtime secret rotation. |
| `@tupynambalucas-dev/plugin-web` | `plugins/packages/web` | [`README.md`](./plugins/packages/web/README.md) | [`rules/AGENTS.md`](./plugins/packages/web/rules/AGENTS.md) | Multi-mode Playwright browser automation (extension pairing + headless) and Firecrawl scraping. |
| `@tupynambalucas-dev/plugin-profile` | `plugins/packages/profile` | [`README.md`](./plugins/packages/profile/README.md) | [`rules/AGENTS.md`](./plugins/packages/profile/rules/AGENTS.md) | Developer GitHub profile README architecture, career positioning, and LinkedIn talent discovery. |

### Layer-3 Sovereign MCP Packages (`mcp/*`)

| MCP Package | Directory | Documentation | Agent Context | Transport & Scope |
| :--- | :--- | :--- | :--- | :--- |
| `@tupynambalucas-dev/mcp-core-github` | `mcp/core/github` | [`README.md`](./mcp/core/github/README.md) | [`AGENTS.md`](./mcp/core/github/AGENTS.md) | Shared 3-Tier GitHub App authentication and Zod tool schemas. |
| `@tupynambalucas-dev/mcp-appsheet` | `mcp/servers/appsheet` | [`README.md`](./mcp/servers/appsheet/README.md) | [`AGENTS.md`](./mcp/servers/appsheet/AGENTS.md) | Dual-transport (`stdio` + HTTP `:8080`) AppSheet API v2 connector. |
| `@tupynambalucas-dev/mcp-firecrawl` | `mcp/servers/firecrawl` | [`README.md`](./mcp/servers/firecrawl/README.md) | [`AGENTS.md`](./mcp/servers/firecrawl/AGENTS.md) | Dual-transport Firecrawl web search, scraping, mapping, and crawling server. |
| `@tupynambalucas-dev/mcp-github-flow` | `mcp/servers/github-flow` | [`README.md`](./mcp/servers/github-flow/README.md) | [`AGENTS.md`](./mcp/servers/github-flow/AGENTS.md) | Tier-3 developer workflow server (branches, PRs, Actions runs). |
| `@tupynambalucas-dev/mcp-github-org` | `mcp/servers/github-org` | [`README.md`](./mcp/servers/github-org/README.md) | [`AGENTS.md`](./mcp/servers/github-org/AGENTS.md) | Tier-1 organization governance, rulesets, Dependabot, and Secret Scanning server. |
| `@tupynambalucas-dev/mcp-gwork` | `mcp/servers/gwork` | [`README.md`](./mcp/servers/gwork/README.md) | [`AGENTS.md`](./mcp/servers/gwork/AGENTS.md) | Google Workspace Drive, Sheets, and Docs automation server. |
| `@tupynambalucas-dev/mcp-infisical` | `mcp/servers/infisical` | [`README.md`](./mcp/servers/infisical/README.md) | [`AGENTS.md`](./mcp/servers/infisical/AGENTS.md) | Infisical Universal Auth secret vault management server. |
| `@tupynambalucas-dev/mcp-linkedin` | `mcp/servers/linkedin` | [`README.md`](./mcp/servers/linkedin/README.md) | [`AGENTS.md`](./mcp/servers/linkedin/AGENTS.md) | Dual-transport (`stdio` + HTTP `:8080`) LinkedIn intelligence, job matching, and Easy Apply server. |
| `@tupynambalucas-dev/mcp-memory` | `mcp/servers/memory` | [`README.md`](./mcp/servers/memory/README.md) | [`AGENTS.md`](./mcp/servers/memory/AGENTS.md) | Persistent agent vector memory and semantic knowledge retrieval server. |
| `@tupynambalucas-dev/mcp-playwright` | `mcp/servers/playwright` | [`README.md`](./mcp/servers/playwright/README.md) | [`AGENTS.md`](./mcp/servers/playwright/AGENTS.md) | Sovereign multi-mode Playwright server with automatic `@playwright/mcp` fallback. |

---

## 3. Environment, Secret & Consumption Governance

### A. Dual Consumption Topologies

1. **Scenario A — Meta-Repository Root Integration (`org-core`)**:
   Configure `org-core/.agents/plugins.json` using direct relative paths:
   ```json
   {
     "entries": [
       { "path": "agent-mesh/plugins/packages" },
       { "path": "platform/.agents/plugins" }
     ]
   }
   ```
2. **Scenario B — External Repositories & Child Monorepos (`omnichannel`, `platform`, `docs`)**:
   Declare `@tupynambalucas-dev/agent-mesh` in `pnpm-workspace.yaml` via the zero-token Git channel (`'github:tupynambalucas-dev/agent-mesh'`) or GitHub Packages (`^1.2.0`), add `"@tupynambalucas-dev/agent-mesh": "catalog:plugins-stack"` to root `devDependencies`, and configure `.agents/plugins.json`:
   ```json
   {
     "entries": [
       {
         "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages",
         "include_only": ["repo", "github-flow", "secrets", "research", "web"]
       }
     ]
   }
   ```
3. **Scenario C — CLI Global Installation & Claude Code Marketplace**:
   ```bash
   # Antigravity CLI
   agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/packages/repo

   # Claude Code Marketplace
   /plugin marketplace add tupynambalucas-dev/agent-mesh
   /plugin install repo@tupynambalucas-dev
   ```

### B. Sovereign MCP Bundling & Two-Tier Launcher Architecture

1. **Inlined Self-Contained CJS Bundles (`mcp/servers/*/dist/bin.cjs`)**: Built with `tsup` (`noExternal`), all 8 MCP servers inline `@modelcontextprotocol/sdk`, `@octokit/*`, `fastify`, `zod`, and `dotenv`, tracked directly in Git (`!mcp/servers/*/dist/`).
2. **Two-Tier Launchers (`scripts/launcher.cjs`)**: Plugin launchers resolve their target MCP server across standalone node modules, the umbrella package, or monorepo siblings, and cascade environment variables from process env, local/parent `.env` (see [`.env.example`](./.env.example)), or Infisical CLI.

For full technical details, consult:
- [How to Consume Plugins in Antigravity and Claude Code](./references/how-to-guides/consuming-plugins-in-antigravity-and-claude.md)
- [Umbrella Package & Presets Specification](./references/reference/umbrella-package-and-presets.md)
- [MCP Server Catalog](./references/reference/mcp-server-catalog.md)

---

## 4. Getting Started

### Prerequisites

- **Node.js**: `>= 22.x`
- **pnpm**: `10.33.2` (via Corepack)
- **Antigravity CLI (`agy`)**: Required for strict plugin schema validation (`pnpm plugins:validate`)

### Installation & Local Build

```bash
# 1. Clone the repository
git clone git@github.com:tupynambalucas-dev/agent-mesh.git
cd agent-mesh

# 2. Configure local environment template (or run via Infisical)
cp .env.example .env

# 3. Install workspace dependencies
pnpm install

# 4. Build all self-contained MCP bundles and validate all 11 plugins
pnpm build
pnpm plugins:validate
```

---

## 5. Development & Pipeline Scripts

| Command | Description |
| :--- | :--- |
| `pnpm build` | Compiles `@tupynambalucas-dev/mcp-core-github` and all 9 MCP server bundles via Turborepo. |
| `pnpm dev` | Starts all MCP servers in watch/development mode via Turborepo. |
| `pnpm typecheck` | Executes solution-wide TypeScript typechecking (`tsc -b`) across all packages. |
| `pnpm clean` | Removes `dist/` and `.turbo/` build caches across all workspaces. |
| `pnpm plugins:validate` | Validates all 11 domain plugins in `plugins/packages/*` using `agy plugin validate . --strict`. |
| `pnpm mcp:build` | Compiles only `@tupynambalucas-dev/mcp-*` packages. |
| `pnpm mcp:typecheck` | Runs TypeScript validation across all `@tupynambalucas-dev/mcp-*` packages. |
| `pnpm changeset` | Creates a new semantic versioning changeset entry. |
| `pnpm version:packages` | Applies pending changesets to package manifests and `CHANGELOG.md` files. |
| `pnpm packages:publish` | Publishes workspace packages and the root umbrella package (`scripts/publish-root.cjs`) to GitHub Packages. |

---

## 6. Governance & Contributing Standards

All contributions, automated agents, and developers operating within `agent-mesh` must adhere strictly to enterprise governance:

1. **Cryptographic Commit Signing**: Every Git commit and annotated tag MUST be signed using SSH (`git commit -S -m "..."`). Unsigned commits are rejected by branch rulesets.
2. **Conventional Commits Standard**: All commit messages must follow `<type>(<scope>): <description>` (v1.0.0).
3. **Single-Branch GitHub Flow**: Short-lived branches (`feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`) branch from and merge into `main` via Pull Request.
4. **Zero-Emoji Policy**: Emojis are strictly forbidden across code, markdown headers, body text, commit messages, and PR descriptions.
5. **Secret Hygiene**: Zero plaintext credentials. All tokens cascade from Infisical or local `.env` files matching [`.env.example`](./.env.example).
6. **AI Agent Context**: Autonomous agents operating in this repository MUST read [AGENTS.md](./AGENTS.md) before modifying files.

---

## 7. License

Licensed under the [Apache License 2.0](./LICENSE). Copyright (c) 2026 tupynambalucas.dev.
