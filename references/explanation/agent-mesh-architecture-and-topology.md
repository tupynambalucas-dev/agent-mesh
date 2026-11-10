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

## 2. The Agent Mesh Topology: Sovereign Capability Packages & Hybrid Umbrella

The **Agent Mesh** architecture resolves these bottlenecks by decomposing capabilities into sovereign packages managed within a unified pnpm monorepo while publishing the root workspace as a single **Hybrid Umbrella Package (`@tupynambalucas-dev/agent-mesh`)**:

```text
agent-mesh/
├── package.json          # Public Umbrella Package (@tupynambalucas-dev/agent-mesh v1.2.0)
├── plugins/packages/     # 10 Sovereign Domain Plugins (Skills, Rules, Manifests, Launchers)
├── plugins/core/         # Reserved for Shared Plugin Governance Libraries
├── mcp/servers/          # 8 Self-Contained Dual-Transport MCP Servers (dist/bin.cjs + scripts/launcher.cjs)
├── mcp/core/             # Shared MCP Core Libraries (@tupynambalucas-dev/mcp-core-github)
├── presets/              # 4 Declarative Domain Filter Profiles (all, backend-api, frontend-web, docs-portal)
├── scripts/              # Root Umbrella Package Release Publisher (publish-root.cjs)
├── references/           # Diataxis Technical Documentation Hub
└── .claude-plugin/       # Claude Code Marketplace Registry
```

### Key Architectural Pillars:

1. **Hybrid Umbrella + Selective Importability**:
   External repositories (`omnichannel`, `platform`, `docs`) declare a single dependency (`@tupynambalucas-dev/agent-mesh`) in `package.json` and mount `node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages` in `.agents/plugins.json`. Consumers can either load all 10 plugins in bulk or restrict active plugins via `include_only` (e.g., loading only `docusaurus`, `repo`, `github-flow`, and `research` for a documentation portal).
2. **Self-Contained Sovereign MCP Execution**:
   All 8 MCP servers in `mcp/servers/*` are bundled via `tsup` (`noExternal`) into standalone CommonJS binaries (`dist/bin.cjs` and `dist/index.cjs`) and tracked in Git (`!mcp/servers/*/dist/`). Each MCP server and each plugin has its own sovereign `scripts/launcher.cjs`. Consuming services never need to install `@modelcontextprotocol/sdk`, `@octokit/*`, or `fastify`, and can install the umbrella package via `github:tupynambalucas-dev/agent-mesh` with zero registry authentication tokens.
3. **Standardization via `agent-plugins.org`**:
   All 10 domain plugins conform to the cross-vendor `agent-plugins.org` v1.0.0 specification (`plugin.json`), ensuring zero vendor lock-in between Google Antigravity, Anthropic Claude Code, and Cursor.
4. **Hierarchical Context Inheritance**:
   Bounded context routers (`AGENTS.md`) define strict XML hierarchies (`<context-hierarchy>`, `<parent>`). Rules cascade downwards predictably across at most 3 architectural layers, preventing cross-domain pollution.
5. **Turborepo & Pnpm Catalogs**:
   All MCP servers and plugins share deterministic, locked dependency versions through pnpm named catalogs (`catalog:`, `catalog:mcp-stack`, `catalog:shared`), eliminating version drift entirely.
