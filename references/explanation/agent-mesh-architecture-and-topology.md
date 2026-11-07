# Agent Mesh Architecture & Topology

This document explains the architectural rationale, design decisions, and system topology underlying the `tupynambalucas-dev/agent-mesh` capability workspace.

---

## 1. The Monolith Problem: Why We Decoupled `agent-toolkit`

In early architectural iterations, AI agent capabilities were bundled into a monolithic repository (`agent-toolkit`). A single, undivided runtime declared all skills, MCP configurations, and behavioral instructions.

While convenient initially, this monolithic topology suffered from four fundamental bottlenecks:
1. **Unbounded Context Window Saturation**: Every agent session inherited all instructions, skills, and tools regardless of the active task, consuming up to 40% of the available LLM context budget before developer input was processed.
2. **Brittle Dependency Coupling**: A version conflict or runtime failure in a single tool (e.g., Playwright browser dependencies) broke the entire agent environment for unrelated domains like documentation or secret management.
3. **Lack of Domain Boundaries**: Code reviews, commit authoring, Kubernetes manifests, and database queries operated under a single undifferentiated rule set, preventing domain-specific invariants from being enforced deterministically.
4. **Suboptimal Tool Identity**: AI models were presented with a flat tool namespace, resulting in tool confusion and speculative hallucinations.

---

## 2. The Agent Mesh Topology: Sovereign Capability Packages

The decentralized **Agent Mesh** architecture solves these bottlenecks by decomposing capabilities into sovereign, independently versioned packages managed within a unified pnpm monorepo:

```text
agent-mesh/
├── plugins/packages/     # 10 Sovereign Domain Plugins (Skills, Rules, Manifests)
├── plugins/core/         # Shared Plugin Governance & Hook Libraries
├── mcp/servers/          # 8 In-House Dual-Transport MCP Servers
├── mcp/core/             # Shared MCP Core Libraries (@tupynambalucas-dev/mcp-core-github)
├── scripts/              # Smart Gateway Router & Publishing Pipelines
├── references/           # Diataxis Technical Documentation Hub
└── .claude-plugin/       # Claude Code Marketplace Registry
```

### Key Architectural Pillars:

1. **Granular Importability**:
   Consumers select exactly what they need via `.agents/plugins.json` using `include_only`. An agent working on Docusaurus documentation loads only the `docusaurus` plugin, preserving 90% of its token budget.
2. **Standardization via `agent-plugins.org`**:
   All 10 domain plugins conform to the cross-vendor `agent-plugins.org` v1.0.0 specification (`plugin.json`), ensuring zero vendor lock-in between Google Antigravity, Anthropic Claude Code, and Cursor.
3. **Hierarchical Context Inheritance**:
   Bounded context routers (`AGENTS.md`) define strict XML hierarchies (`<context-hierarchy>`, `<parent>`). Rules cascade downwards predictably, preventing cross-domain pollution.
4. **Turborepo & Pnpm Catalogs**:
   All MCP servers and plugins share deterministic, locked dependency versions through pnpm named catalogs (`catalog:mcp-stack`, `catalog:shared`), eliminating version drift entirely.
