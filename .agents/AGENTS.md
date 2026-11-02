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
- **Deep Analyses (`analyses/`)**: Deep lifecycle and architectural analyses ([MCP Gateway Router Deep Analysis](./analyses/analise-profunda-mcp-gateway-router.md)).
- **Architectural Plans (`plans/`)**: Master blueprints and execution runbooks ([Autonomous Agent Mesh Master Implementation Plan](./plans/master-implementation-plan-github-app-and-cortex-mcp.md), [Cortex Gateway Master Plan](./plans/cortex-gateway-and-self-contained-agent-mesh-architecture.md), [Monorepo Restructuring Blueprint](./plans/agent-monorepo-and-github-app-architecture.md)).
- **Verification Reports (`reports/`)**: AI-generated audits and benchmarks ([Refactoring Audit Report](./reports/agent-mesh-refactoring-and-governance-report.md), [Execution State Verification](./reports/cortex-mcp-execution-state-and-fallback-verification.md), [GitHub MCP Evaluation](./reports/github-mcp-ecosystem-and-domain3-evaluation.md)).

## Scoped Guardrails

- MUST maintain architectural plans in `plans/`, deep technical analyses in `analyses/`, and analytical reports in `reports/`.
- MUST convert completed, verified architectural features into authoritative Diátaxis documentation in [../references/](../references/README.md).
- MUST write all documents in en-US adhering to the Zero-Emoji Invariant.
- MUST use relative markdown links pointing strictly to existing disk files.
