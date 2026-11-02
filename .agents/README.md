# AI Agent Substrate & Planning Hub (`.agents/`)

This directory houses cross-repository architectural plans, AI-generated reports, migration runbooks, and verification records for the `tupynambalucas-dev/agent-mesh` repository.

---

## 1. Directory Structure

```text
.agents/
├── AGENTS.md    # Agent planning context router
├── README.md    # Subsystem overview and document index
├── analyses/    # Deep technical and architectural lifecycle analyses
├── plans/       # Master architectural specifications, migration blueprints, and roadmap plans
└── reports/     # AI-generated audit reports, verification analyses, and benchmarks
```

---

## 2. Document Index

### 2.1 Deep Architectural Analyses (`analyses/`)
- [MCP Gateway Router Deep Analysis](./analyses/analise-profunda-mcp-gateway-router.md): Exhaustive analysis of the dual-mode failover logic, 300ms probe, and Stdio fallback architecture.

### 2.2 Architectural Plans (`plans/`)
- [Autonomous Agent Mesh Master Implementation Plan](./plans/master-implementation-plan-github-app-and-cortex-mcp.md): Comprehensive actionable plan detailing GitHub App configuration, Infisical secrets, K8s manifests, and package publishing.
- [Cortex Gateway & Agent Mesh Master Plan](./plans/cortex-gateway-and-self-contained-agent-mesh-architecture.md): 7-phase execution master plan establishing zero-Dockerfile Kubernetes manifests and capability workspace.
- [Monorepo & GitHub App Architecture](./plans/agent-monorepo-and-github-app-architecture.md): Blueprint for decomposing the monolithic repository into an enterprise capability monorepo.
- [Plugin Independence & Enforcement Hooks Plan](./plans/plugin-independence-playwright-isolation-and-enforcement-hooks.md): Self-contained plugins, isolated per-plugin Playwright, per-plugin launchers, and lifecycle hooks enforcing plugin mandates.

### 2.3 Verification & Analytical Reports (`reports/`)
- [Refactoring Audit Report](./reports/agent-mesh-refactoring-and-governance-report.md): Exhaustive audit and refactoring of legacy nomenclature, paths, and standards.
- [Cortex MCP Execution State Verification](./reports/cortex-mcp-execution-state-and-fallback-verification.md): Post-execution verification report documenting the completed transition from monolithic tooling to Agent Mesh.
- [GitHub MCP Ecosystem Evaluation](./reports/github-mcp-ecosystem-and-domain3-evaluation.md): Comparative evaluation matrix of GitHub MCP servers across developer operations, security auditing, and org administration.

---

## 3. Governance Standards

- Documents in `.agents/` capture architectural planning, evolution history, and analytical audits.
- Implemented and active technical documentation must reside under [../references/](../references/README.md) structured according to the Diátaxis framework.
- Intra-repository links must remain relative and portable across operating systems. Absolute filesystem paths (`file:///`) are strictly forbidden.
- Zero-Emoji Invariant strictly applies across all planning and reporting assets.
