# Umbrella Package & Presets Specification

This document provides the reference specification for `@tupynambalucas-dev/agent-mesh`, the canonical umbrella distribution package for all AI agent plugins, presets, and sovereign Model Context Protocol (MCP) servers across the `tupynambalucas-dev` organization.

---

## 1. Package Metadata & Distribution

- **Scope & Name**: `@tupynambalucas-dev/agent-mesh`
- **Current Version**: `1.2.0`
- **Registry**: GitHub Packages (`https://npm.pkg.github.com`) and Git Package Distribution (`github:tupynambalucas-dev/agent-mesh`)
- **Access**: Public (`access: public`)
- **License**: Apache-2.0
- **Upstream Repository**: `tupynambalucas-dev/agent-mesh`

### Package Manifest ([`package.json`](../../package.json))
```json
{
  "name": "@tupynambalucas-dev/agent-mesh",
  "version": "1.2.0",
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

## 2. Installation Channels

`@tupynambalucas-dev/agent-mesh` supports two deterministic installation channels for external repositories and child monorepos:

| Channel | Catalog Specifier | Authentication Requirement | Primary Use Case | Active Consumers |
| :--- | :--- | :--- | :--- | :--- |
| **Channel A: Git Package Distribution (Recommended Default)** | `github:tupynambalucas-dev/agent-mesh` | **Zero Token Required** (Public Git HTTPS tarball) | Standalone repositories, developer workstations, and CI/CD pipelines without `read:packages` PATs. Works out of the box because pre-bundled `mcp/servers/*/dist/*.cjs` binaries are tracked in Git (`!mcp/servers/*/dist/`). | `omnichannel`, `platform`, `docs` |
| **Channel B: GitHub Packages Registry** | `^1.2.0` | **Requires `NODE_AUTH_TOKEN`** (`read:packages` scope) | Immutable semver-pinned enterprise environments where `.npmrc` provides `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}`. GitHub Packages enforces authentication on all registry reads, even for public packages. | Authenticated CI/CD release runners |

---

## 3. Directory Layout Inside Installed Package

When installed into a consumer workspace (`node_modules/@tupynambalucas-dev/agent-mesh/`), the distribution layout is structured as follows:

```text
node_modules/@tupynambalucas-dev/agent-mesh/
├── plugins/
│   └── packages/
│       ├── appsheet/        (AppSheet schema, UI & REST API v2 operators + scripts/launcher.cjs)
│       ├── atelier/         (Context routers, skill, rule, hook & plugin architects)
│       ├── docusaurus/      (Docusaurus v3 documentation & MDX v3 architects)
│       ├── github-flow/     (Git flow & GitHub Actions operators + scripts/launcher.cjs)
│       ├── github-org/      (GitHub organization, teams & ruleset operators + scripts/launcher.cjs)
│       ├── gwork/           (Google Workspace, Drive & Sheets architects + scripts/launcher.cjs)
│       ├── repo/            (README, licenses, monorepo & .github standards architects)
│       ├── research/        (Firecrawl web research & Context7 doc researcher + scripts/launcher.cjs)
│       ├── secrets/         (Infisical vault & secret rotation operators + scripts/launcher.cjs)
│       └── web/             (Multi-mode Playwright & Firecrawl operators + scripts/launcher.cjs)
├── mcp/
│   ├── core/
│   │   └── github/          (Three-tier GitHub App authentication & shared Zod schemas)
│   └── servers/
│       ├── appsheet/        (Sovereign launcher scripts/launcher.cjs + self-contained dist/bin.cjs)
│       ├── firecrawl/       (Sovereign launcher scripts/launcher.cjs + self-contained dist/bin.cjs)
│       ├── github-flow/     (Sovereign launcher scripts/launcher.cjs + self-contained dist/bin.cjs)
│       ├── github-org/      (Sovereign launcher scripts/launcher.cjs + self-contained dist/bin.cjs)
│       ├── gwork/           (Sovereign launcher scripts/launcher.cjs + self-contained dist/bin.cjs)
│       ├── infisical/       (Sovereign launcher scripts/launcher.cjs + self-contained dist/bin.cjs)
│       ├── memory/          (Sovereign launcher scripts/launcher.cjs + self-contained dist/bin.cjs)
│       └── playwright/      (Sovereign launcher scripts/launcher.cjs + dist/bin.cjs + upstream fallback)
├── presets/
│   ├── all.json             (References all 10 domain plugins)
│   ├── backend-api.json     (repo, github-flow, secrets, research, web)
│   ├── frontend-web.json    (repo, github-flow, secrets, research, web)
│   └── docs-portal.json     (repo, github-flow, docusaurus, research)
├── scripts/
│   └── publish-root.cjs     (Idempotent root umbrella publisher for GitHub Packages)
├── .claude-plugin/
│   └── marketplace.json     (Claude Code plugin marketplace catalog)
├── README.md
└── LICENSE
```

---

## 4. Declarative Presets & Selective Filtering Matrix

Consumer repositories configure `.agents/plugins.json` using `entries` pointing to `node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages`. They can either mount all 10 plugins at once or filter active plugins via `include_only` corresponding to our canonical preset definitions in `presets/*.json`:

| Preset Profile | Reference File | Included Domain Plugins (`include_only`) | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **All Plugins** | [`presets/all.json`](../../presets/all.json) | All 10 domain plugins (omit `include_only`) | Full-stack services, developer workstations, platform hubs (`omnichannel`, `platform`, `docs`) |
| **Backend API** | [`presets/backend-api.json`](../../presets/backend-api.json) | `repo`, `github-flow`, `secrets`, `research`, `web` | Backend microservices and REST/GraphQL gateways |
| **Frontend Web** | [`presets/frontend-web.json`](../../presets/frontend-web.json) | `repo`, `github-flow`, `secrets`, `research`, `web` | Web frontends, Next.js, and Astro applications |
| **Documentation** | [`presets/docs-portal.json`](../../presets/docs-portal.json) | `repo`, `github-flow`, `docusaurus`, `research` | Docusaurus documentation portals |

> [!NOTE]
> **Preset Path Resolution**: Each file in `presets/*.json` declares `"path": "../plugins/packages"` relative to the `presets/` directory inside the umbrella package. In Antigravity (`agy`), the standard and empirically verified configuration in `.agents/plugins.json` is declaring `"entries": [{ "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages" }]` with an optional `"include_only"` array matching the preset profile above.

---

## 5. Sovereign MCP Runtime Execution Guarantee

Every domain plugin (`plugins/packages/<plugin>/scripts/launcher.cjs`) and every MCP server (`mcp/servers/<server>/scripts/launcher.cjs`) is engineered to operate independently without requiring files or dependencies outside its package hierarchy:

1. **Environment Cascade (`loadEnvCascade()`)**:
   Automatically loads environment variables from the consumer repository's `.env` (`process.cwd()/.env`) and parent directories without overwriting variables already set in the process environment.
2. **Cluster Gateway Routing (`MESH_PROFILE=cluster`)**:
   When `MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`, the launcher delegates tool execution to the centralized Kubernetes Cortex Gateway (`npx -y mcp-remote ${CORTEX_GATEWAY_URL}/mcp`).
3. **Three-Layer Sovereign Local Resolution (`resolveMcpLauncher()`)**:
   When running in `local` profile (default), plugin launchers resolve the target MCP server deterministically across three layers:
   - **Layer 1 (Standalone Package)**: Resolves `@tupynambalucas-dev/mcp-<name>/package.json` if installed individually in the consumer repository.
   - **Layer 2 (Umbrella Package Hierarchy)**: Resolves `mcp/servers/<name>/scripts/launcher.cjs` (and co-located `dist/bin.cjs`) directly inside `node_modules/@tupynambalucas-dev/agent-mesh`.
   - **Layer 3 (Monorepo Sibling)**: Resolves `mcp/servers/<name>/scripts/launcher.cjs` when developing inside the `agent-mesh` repository.
4. **Inlined Self-Contained CJS Bundles (`dist/bin.cjs`)**:
   All MCP servers are bundled with `tsup` (`noExternal`), inlining `@modelcontextprotocol/sdk`, `@octokit/*`, `fastify`, `zod`, and `dotenv` into a single CommonJS executable. Consumer repositories never need to install MCP SDK dependencies.
5. **Playwright Resilient Fallback**:
   Because browser binaries cannot be bundled into JS files, `mcp/servers/playwright/scripts/launcher.cjs` inspects whether `playwright` is resolvable in the local workspace. If present, it executes the sovereign `dist/bin.cjs`; if absent (such as in lightweight backend consumers like `omnichannel`), it transparently invokes `@playwright/mcp@0.0.84` over `npx`, preserving all configured modes (`headless`, `extension`, `channel`, `cdp`) and isolated profile flags.
