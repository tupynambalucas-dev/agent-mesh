# Changelog

All notable changes to the tupynambalucas-dev Agent Mesh monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-03

### Added
- **10 Domain Plugins**: Sovereign agent plugins compliant with `agent-plugins.org` v1.0.0 and Google Antigravity (`agy`).
- **7 MCP Servers**: Dual-transport Model Context Protocol services with Kubernetes HTTP ingress (port 8080) and local Stdio failover.
- **Sovereign Plugin Launchers**: Per-plugin `scripts/launcher.cjs` eliminating monolithic gateway dependencies.
- **Lifecycle Guardrails**: Pre-tool and post-tool execution hooks enforcing Playwright isolation, cryptographic commit signatures, and branch taxonomy.
- **Repository Governance**: `github-standards-architect` skill in `@tupynambalucas-dev/plugin-repo` enforcing CODEOWNERS, Dependabot, and composite action modularity.
- **Zero-Script Publishing**: Native monorepo release architecture via `pnpm -r publish --access public --no-git-checks --report-summary` with Turborepo caching.
- **Modular Composite Actions**: `.github/actions/setup-pnpm-env`, `.github/actions/build-mcp`, and `.github/actions/validate-plugins`.
- **Administrative Package Management**: Authenticated `.github/workflows/admin-packages.yml` runbook with multi-page pagination for registry governance.
