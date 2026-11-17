<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the .agents planning and reporting bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# AI Agent Planning Subsystem Context (`.agents/`)

This document serves as the bounded context router for architectural planning, AI analyses, and verification reports in `agent-mesh/.agents/`.

## Navigation

- [README.md](./README.md): Primary overview and document index of the agent planning subsystem.
- **Deep Analyses (`plans/`)**: Deep lifecycle and architectural analyses ([Historical Gateway Failover Analysis](./plans/analise-profunda-mcp-gateway-router.md), [Playwright Isolation and Lifecycle Hooks Analysis](./plans/analise-arquitetural-isolamento-playwright-e-lifecycle-hooks.md), [Monolithic vs. Domain-Scoped MCP Servers Analysis](./plans/mcp-architecture-single-vs-modular-github-apps.md)).
- **Architectural Plans (`plans/`)**: Master blueprints and execution runbooks ([Autonomous Agent Mesh Master Implementation Plan](./plans/master-implementation-plan-github-app-and-cortex-mcp.md), [Cortex Gateway Master Plan](./plans/cortex-gateway-and-self-contained-agent-mesh-architecture.md), [Monorepo Restructuring Blueprint](./plans/agent-monorepo-and-github-app-architecture.md), [Plugin Independence and Enforcement Hooks Plan](./plans/plugin-independence-playwright-isolation-and-enforcement-hooks.md), [GitHub App Machine Identity and Token Governance Strategy](./plans/github-app-machine-identity-and-token-governance-strategy.md), [GitHub Packages Visibility and Dynamic Lifecycle Governance](./plans/github-packages-visibility-and-dynamic-lifecycle-governance.md), [Agent Plugins Enterprise Distribution and Presets Architecture](./plans/agent-plugins-distribution-presets-and-external-consumption-architecture.md), [Documentation Alignment and Correction Plan for Package Distribution](./plans/documentation-alignment-and-correction-plan-for-package-distribution.md)).
- **Verification Reports (`plans/`)**: AI-generated audits and benchmarks ([Refactoring Audit Report](./plans/agent-mesh-refactoring-and-governance-report.md), [Execution State Verification](./plans/cortex-mcp-execution-state-and-fallback-verification.md), [GitHub MCP Evaluation](./plans/github-mcp-ecosystem-and-domain3-evaluation.md)).

## Scoped Guardrails

- MUST maintain all architectural plans, deep technical analyses, and analytical reports in `plans/` (`agent-mesh/.agents/plans/`).
- MUST convert completed, verified architectural features into authoritative Diátaxis documentation in [../references/](../references/README.md).
- MUST write all documents in en-US adhering to the Zero-Emoji Invariant.
- MUST use relative markdown links pointing strictly to existing disk files.
