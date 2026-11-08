# Umbrella Package & Presets Specification

This document provides the reference specification for `@tupynambalucas-dev/agent-mesh`, the canonical umbrella distribution package for all AI agent plugins, presets, and MCP servers across the `tupynambalucas-dev` organization.

---

## 1. Package Metadata & Distribution

- **Scope & Name**: `@tupynambalucas-dev/agent-mesh`
- **Registry**: GitHub Packages (`https://npm.pkg.github.com`)
- **Access**: Public (`access: public`)
- **License**: Apache-2.0
- **Upstream Repository**: `tupynambalucas-dev/agent-mesh`

### Package Manifest (`package.json`)
```json
{
  "name": "@tupynambalucas-dev/agent-mesh",
  "version": "1.0.0",
  "private": false,
  "description": "Universal enterprise AI agent mesh: governance, MCP servers, domain plugins, and modular skills.",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "public"
  },
  "files": [
    ".claude-plugin/",
    "scripts/",
    "plugins/packages/",
    "presets/",
    "mcp/",
    "README.md",
    "LICENSE"
  ]
}
```

---

## 2. Directory Layout Inside Published Package

When installed into a consumer workspace (`node_modules/@tupynambalucas-dev/agent-mesh/`), the distribution layout is structured as follows:

```
node_modules/@tupynambalucas-dev/agent-mesh/
├── plugins/
│   └── packages/
│       ├── atelier/         (Context routers, skill, rule & hook architects)
│       ├── repo/            (README, licenses, monorepo & standards architects)
│       ├── github-flow/     (Git flow & GitHub Actions operators)
│       ├── github-org/      (GitHub organization, teams & ruleset operators)
│       ├── secrets/         (Infisical vault & secret rotation operators)
│       ├── research/        (Firecrawl web research & Context7 doc researcher)
│       ├── web/             (Playwright browser operator & auditor)
│       ├── docusaurus/      (Docusaurus v3 documentation architects)
│       ├── appsheet/        (AppSheet schema & REST API data operators)
│       └── gwork/           (Google Workspace, Drive & Sheets architects)
├── presets/
│   ├── all.json             (Mounts all 10 domain plugins)
│   ├── backend-api.json     (repo, github-flow, secrets, research, web)
│   ├── frontend-web.json    (repo, github-flow, secrets, research, web)
│   └── docs-portal.json     (repo, github-flow, docusaurus, research)
├── .claude-plugin/
│   └── marketplace.json     (Claude Code plugin marketplace catalog)
├── README.md
└── LICENSE
```

---

## 3. Declarative Presets Matrix

Presets provide pre-configured domain bundles that consumer services can inherit using `"inherits"` in their `.agents/plugins.json`:

| Preset Identifier | File Path | Included Domain Plugins | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **All Plugins** | `presets/all.json` | All 10 domain plugins | Full-stack services, developer workstations, platform hubs |
| **Backend API** | `presets/backend-api.json` | `repo`, `github-flow`, `secrets`, `research`, `web` | Backend microservices, REST/GraphQL gateways (e.g., `omnichannel`) |
| **Frontend Web** | `presets/frontend-web.json` | `repo`, `github-flow`, `secrets`, `research`, `web` | Web frontends, Next.js / Astro applications |
| **Documentation** | `presets/docs-portal.json` | `repo`, `github-flow`, `docusaurus`, `research` | Docusaurus documentation hubs (e.g., `docs`) |

---

## 4. MCP Runtime Execution Guarantee

Every domain plugin includes `scripts/launcher.cjs`. When consumed from `node_modules`, the launcher:
1. Cascades environment variables from the consumer repository's `.env` via `loadEnvCascade()`.
2. Attempts execution of published standalone MCP packages via `npx -y @tupynambalucas-dev/mcp-<name>`.
3. Delegates to the centralized Kubernetes cluster gateway (`mcp-remote ${CORTEX_GATEWAY_URL}/mcp`) when `MESH_PROFILE=cluster`.
