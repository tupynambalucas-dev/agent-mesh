# AI Agent Substrate & Planning Hub (`.agents/`)

This directory houses cross-repository architectural plans, AI-generated reports, migration runbooks, and verification records for the `tupynambalucas-dev/agent-mesh` repository.

---

## 1. Directory Structure

```text
.agents/
├── AGENTS.md      # Agent planning context router
├── README.md      # Subsystem overview and document index
├── plugins.json   # Local plugin discovery manifest
└── plans/         # Master architectural plans, technical analyses, and audit reports
```

---

## 2. Document Index

### 2.1 Deep Architectural Analyses (`plans/`)
- [Historical Gateway Failover Deep Analysis](./plans/analise-profunda-mcp-gateway-router.md): Historical analysis of the initial dual-mode failover router, now superseded by the two-tier sovereign launcher architecture (`plugins/packages/*/scripts/launcher.cjs` and `mcp/servers/*/scripts/launcher.cjs`).
- [Playwright Isolation & Lifecycle Hooks Analysis](./plans/analise-arquitetural-isolamento-playwright-e-lifecycle-hooks.md): Architectural analysis of isolated Playwright runtimes, deterministic lifecycle hooks, and supply chain CI hardening.
- [Monolithic vs. Domain-Scoped MCP Servers Analysis](./plans/mcp-architecture-single-vs-modular-github-apps.md): Enterprise analysis of domain-scoped GitHub MCP servers (`mcp-github-org` and `mcp-github-flow`), subsystem-internal core package partitioning (`mcp/servers/*`, `mcp/core/*`), and recursive `AGENTS.md` and `README.md` governance.

### 2.2 Architectural Plans (`plans/`)
- [Autonomous Agent Mesh Master Implementation Plan](./plans/master-implementation-plan-github-app-and-cortex-mcp.md): Comprehensive actionable plan detailing GitHub App configuration, Infisical secrets, K8s manifests, and package publishing.
- [Cortex Gateway & Agent Mesh Master Plan](./plans/cortex-gateway-and-self-contained-agent-mesh-architecture.md): 7-phase execution master plan establishing zero-Dockerfile Kubernetes manifests and capability workspace.
- [Monorepo & GitHub App Architecture](./plans/agent-monorepo-and-github-app-architecture.md): Blueprint for decomposing the monolithic repository into an enterprise capability monorepo.
- [Plugin Independence & Enforcement Hooks Plan](./plans/plugin-independence-playwright-isolation-and-enforcement-hooks.md): Self-contained plugins, isolated per-plugin Playwright, per-plugin launchers, and lifecycle hooks enforcing plugin mandates.
- [GitHub App Machine Identity & Token Governance Strategy](./plans/github-app-machine-identity-and-token-governance-strategy.md): Enterprise token governance boundaries between the 3-tier GitHub Apps (`org-manager`, `ci-bot`, `developer-tools`) and granular GitHub Packages `GITHUB_TOKEN` administration.
- [GitHub Packages Visibility & Dynamic Lifecycle Governance](./plans/github-packages-visibility-and-dynamic-lifecycle-governance.md): Canonical specification for GitHub Packages (`npm.pkg.github.com`) visibility control (`private` vs. `public`) and zero-declaration dynamic obsolete package reconciliation via Git history discovery.
- [Agent Plugins Enterprise Distribution & Presets Architecture](./plans/agent-plugins-distribution-presets-and-external-consumption-architecture.md): Blueprint for publishing `@tupynambalucas-dev/agent-mesh` as an umbrella meta-package with declarative presets and tag filtering across external services (`omnichannel`, `platform`, `docs`).
- [Documentation Alignment & Correction Plan for Package Distribution](./plans/documentation-alignment-and-correction-plan-for-package-distribution.md): Comprehensive audit and alignment runbook synchronizing all documentation, `README.md`, and `AGENTS.md` files with the v1.2.0 umbrella package, self-contained `tsup` MCP bundles, and two-tier sovereign launchers.
- [Developer Profile & Career Advancement Architecture](./plans/developer-profile-and-career-advancement-plugin-architecture.md): Architectural specification establishing the `@tupynambalucas-dev/plugin-profile` domain plugin and `@tupynambalucas-dev/mcp-linkedin` MCP server, synchronizing GitHub profile READMEs and LinkedIn recruitment intelligence with safety gates.

### 2.3 Verification & Analytical Reports (`plans/`)
- [Refactoring Audit Report](./plans/agent-mesh-refactoring-and-governance-report.md): Exhaustive audit and refactoring of legacy nomenclature, paths, and standards.
- [Cortex MCP Execution State Verification](./plans/cortex-mcp-execution-state-and-fallback-verification.md): Post-execution verification report documenting the completed transition from monolithic tooling to Agent Mesh.
- [GitHub MCP Ecosystem Evaluation](./plans/github-mcp-ecosystem-and-domain3-evaluation.md): Comparative evaluation matrix of GitHub MCP servers across developer operations, security auditing, and org administration.

---

## 3. Governance Standards

- Documents in `.agents/` capture architectural planning, evolution history, and analytical audits.
- Implemented and active technical documentation must reside under [../references/](../references/README.md) structured according to the Diátaxis framework.
- Intra-repository links must remain relative and portable across operating systems. Absolute filesystem paths (`file:///`) are strictly forbidden.
- Zero-Emoji Invariant strictly applies across all planning and reporting assets.
