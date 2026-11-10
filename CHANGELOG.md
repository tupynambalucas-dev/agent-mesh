# Changelog

All notable changes to the tupynambalucas-dev Agent Mesh monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-11-10

### Added
- **Sovereign MCP Server Launchers & Self-Contained CJS Bundling**: All 8 MCP servers (`appsheet`, `firecrawl`, `github-flow`, `github-org`, `gwork`, `infisical`, `memory`, `playwright`) now bundle `@modelcontextprotocol/sdk`, `@octokit/*`, `fastify`, `zod`, and `dotenv` into standalone CommonJS binaries (`dist/bin.cjs` and `dist/index.cjs`) via `tsup` (`noExternal`) and ship co-located `scripts/launcher.cjs` and `mcp.json` files.
- **Git-Tracked MCP Bundles (`!mcp/servers/*/dist/`)**: Committed minified server bundles to Git so external repositories consuming `github:tupynambalucas-dev/agent-mesh` execute all MCP servers out of the box without running a build step or requiring `NODE_AUTH_TOKEN`.
- **Two-Tier Sovereign Launcher Resolution (`resolveMcpLauncher()`)**: Decoupled all domain plugin launchers (`plugins/packages/*/scripts/launcher.cjs`) to resolve MCP servers across standalone packages, the umbrella package hierarchy, and monorepo sibling directories.
- **Playwright Resilient Fallback**: Added automatic detection in `mcp/servers/playwright/scripts/launcher.cjs` to run `dist/bin.cjs` when local `playwright` is installed or fall back transparently to `@playwright/mcp@0.0.84` in unbundled consumer repositories.

## [1.1.0] - 2026-11-08

### Added
- **Public Umbrella Package (`@tupynambalucas-dev/agent-mesh`)**: Configured root workspace manifest (`private: false`, `publishConfig.access: public`) and idempotent root publisher (`scripts/publish-root.cjs`) to distribute all 10 domain plugins, 8 MCP servers, and 4 presets in a single package.
- **Declarative Domain Presets (`presets/*.json`)**: Added `all.json`, `backend-api.json`, `frontend-web.json`, and `docs-portal.json` domain filter profiles.
- **Dynamic Registry Reconciliation**: Added `.github/scripts/manage-packages.js` to reconcile and purge obsolete GitHub Packages automatically during CI/CD releases.

## [1.0.0] - 2026-11-03

### Added
- **10 Domain Plugins**: Sovereign agent plugins compliant with `agent-plugins.org` v1.0.0 and Google Antigravity (`agy`).
- **8 MCP Servers & 1 Core Library**: Dual-transport Model Context Protocol services (`mcp/servers/*` and `mcp/core/github`) with Kubernetes HTTP ingress (port 8080) and local Stdio failover.
- **Sovereign Plugin Launchers**: Per-plugin `scripts/launcher.cjs` eliminating monolithic gateway dependencies.
- **Lifecycle Guardrails**: Pre-tool and post-tool execution hooks enforcing Playwright isolation, cryptographic commit signatures, and branch taxonomy.
- **Repository Governance**: `github-standards-architect` skill in `@tupynambalucas-dev/plugin-repo` enforcing CODEOWNERS, Dependabot, and composite action modularity.
- **Monorepo Release Pipeline**: Automated release architecture via `pnpm -r publish --access public --no-git-checks --report-summary` with Turborepo caching.
- **Modular Composite Actions**: `.github/actions/setup-pnpm-env`, `.github/actions/build-mcp`, and `.github/actions/validate-plugins`.
- **Administrative Package Management**: Authenticated `.github/workflows/admin-packages.yml` runbook with multi-page pagination for registry governance.
