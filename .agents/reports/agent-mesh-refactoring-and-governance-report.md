# Universal Agent Mesh Refactoring, Audit & Enterprise Governance Report

This document records the exhaustive audit, structural refactoring, and standards alignment executed across the `agent-mesh` capability workspace, covering all 10 domain plugins, 7 in-house Model Context Protocol (MCP) servers, orchestration scripts, and architectural reference specifications.

---

## 1. Executive Summary & Audit Scope

A comprehensive audit was performed across the entire `tupynambalucas-dev/agent-mesh` monorepo to resolve historical drift resulting from the evolutionary migration from the monolithic prototype (`agent-toolkit`) to the decentralized, sovereign **Agent Mesh** topology.

### 1.1 Scope of Inspection
- **Domain Plugins (`plugins/packages/*`)**: 10 sovereign plugins (`appsheet`, `atelier`, `docusaurus`, `github-flow`, `github-org`, `gwork`, `repo`, `research`, `secrets`, `web`).
- **In-House MCP Servers (`mcp/packages/*`)**: 7 dual-transport TypeScript packages (`appsheet`, `firecrawl`, `github`, `gwork`, `infisical`, `memory`, `playwright`).
- **Orchestration Scripts (`scripts/`)**: `mcp-gateway-router.js`, `publish-packages.js`, `AGENTS.md`, `README.md`.
- **Architectural Specifications (`references/`)**: 11 master blueprints, consumption specifications, and execution verification artifacts.
- **Root Configurations**: `AGENTS.md`, `README.md`, `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.claude-plugin/marketplace.json`.

---

## 2. Legacy Deprecation & Nomenclature Eradication

### 2.1 Eradication of "agent-toolkit"
The legacy moniker `agent-toolkit` was audited across all files:
- **Active Code & Manifests**: Completely clean. Zero references to `agent-toolkit` existed in active TypeScript code, package manifests (`package.json`), or plugin declarations (`plugin.json`).
- **Skill References & Documentation**: Outdated commands and script invocations referencing `node agent-toolkit/...` in `references/github-app-architecture-and-governance.md`, `references/github-mcp-ecosystem-and-domain3-evaluation.md`, and `references/cortex-gateway-and-self-contained-agent-mesh-architecture.md` were updated to their canonical `agent-mesh` locations.
- **Historical Migration Records**: References in historical architectural documents (such as `references/cortex-mcp-execution-state-and-fallback-verification.md` and `references/agent-mesh-marketplace-and-granular-consumption.md`) were standardized to explicitly designate `agent-toolkit` as a historical, deprecated milestone ("formerly `agent-toolkit`"), preventing ambiguity during agent context ingestion.

### 2.2 Complete Deprecation of `GEMINI.md` in Favor of `AGENTS.md`
In line with modern enterprise AI agent standards, all legacy mentions of `GEMINI.md` were eliminated:
- **`plugins/packages/atelier/skills/rule-architect/SKILL.md`**: Section 1 previously referenced `Directory-Based Rules (AGENTS.md / GEMINI.md)`. This was refactored to `Directory-Based Context Routers and Rules (AGENTS.md)`.
- **`plugins/packages/atelier/references/antigravity-customizations-and-plugins.md`**: Section 2 previously stated that directory walking loaded `all AGENTS.md (or GEMINI.md) files`. This was refactored to strictly load `AGENTS.md` context router files.

---

## 3. Directory Layout & Path Resolution Alignment

### 3.1 Plugin Hierarchy (`plugins/packages/*`)
In earlier specifications, rules and plugins were frequently documented as `plugins/<name>/rules/AGENTS.md` or `plugins/<name>`, failing to reflect the physical monorepo structure where plugins reside within `plugins/packages/*`.

The following alignments were executed:
- **`plugins/packages/atelier/skills/rule-architect/SKILL.md`**: Fixed Rule 1 definition from `plugins/<name>/rules/AGENTS.md` to `plugins/packages/<name>/rules/AGENTS.md`.
- **`plugins/packages/atelier/references/plugin-manifest-schema.md`**: Updated marketplace sample source from `"./plugins/plugin-name"` to `"./plugins/packages/plugin-name"`.
- **`plugins/packages/atelier/references/antigravity-customizations-and-plugins.md`**: Updated plugin rule discovery documentation to reference `plugins/packages/<plugin>/rules/AGENTS.md`.
- **`references/agent-mesh-marketplace-and-granular-consumption.md`**: Fixed all paths in Section 2, Option 3 (`agent-mesh/plugins/packages/*`) and validation matrices.
- **`references/cortex-mcp-infrastructure-vs-local-fallback-runtime.md`**: Fixed example configuration blocks from `plugins/web/mcp_config.json` to `plugins/packages/web/mcp_config.json` and `../../../scripts/mcp-gateway-router.js`.

### 3.2 MCP Server Hierarchy (`mcp/packages/*`)
- **`scripts/README.md`**: Corrected failover flow diagram to specify `Spawns node mcp/packages/<target>/dist/bin.js or pnpm dlx` instead of `mcp/<target>`.
- **`scripts/mcp-gateway-router.js`**: Verified that line 149 searches `mcp/packages/<target>` as primary and falls back to `mcp/<target>` for backwards compatibility.

---

## 4. Stale Pointers & Dead File Elimination

### 4.1 Retirement of `mcp-runner.js`
The script `mcp-runner.js` was historically superseded by the non-blocking healthcheck proxy `mcp-gateway-router.js`, but lingered in several documents:
- **`agent-mesh/README.md`**: Removed line 55 (`mcp-runner.js`) from the scripts architecture diagram.
- **`plugins/packages/github-org/skills/github-org-operator/references/developer-onboarding.md`**: Updated line 135 to cite `mcp-gateway-router.js`.
- **`references/github-app-architecture-and-governance.md`**: Replaced all mentions and diagrams referencing `mcp-runner.js` with `mcp-gateway-router.js`.
- **`references/github-mcp-ecosystem-and-domain3-evaluation.md`**: Updated orchestration references to `mcp-gateway-router.js`.
- **`references/agent-mesh-marketplace-and-granular-consumption.md`**: Removed `mcp-runner.js` from the repository file tree.

### 4.2 Dead Tool Reference in `@tupynambalucas-dev/mcp-memory`
- **`mcp/packages/memory/AGENTS.md`**: Line 20 previously pointed to non-existent `./src/tools/episodic.tool.ts`. Corrected to [src/tools/chat.tool.ts](../../mcp/packages/memory/src/tools/chat.tool.ts), which implements the `store_episodic` tool.

### 4.3 Elimination of Forbidden `file:///` Links
Strict enterprise governance prohibits absolute local filesystem links (`file:///C:/Users/...`) in markdown files:
- All occurrences in `references/playwright-in-house-mcp-architecture-and-dual-mode-spec.md`, `references/cortex-mcp-infrastructure-vs-local-fallback-runtime.md`, `references/github-app-architecture-and-governance.md`, `references/github-mcp-ecosystem-and-domain3-evaluation.md`, `references/cortex-gateway-and-self-contained-agent-mesh-architecture.md`, `references/cortex-mcp-execution-state-and-fallback-verification.md`, and `references/agent-monorepo-and-github-app-architecture.md` were replaced with normalized relative markdown links.
- The repository now achieves 100% compliance with `validate-skill.ts` rules regarding absolute links.

---

## 5. Bounded Context Alignment & The AGENTS-README Invariant

Per Domain Rule 1 (`plugin-repo`), wherever an `AGENTS.md` bounded context router exists, a corresponding `README.md` must also exist within that same directory.

### 5.1 Restructuring of `references/`
Prior to this audit, `agent-mesh/references/` contained 10 markdown documents but lacked both an `AGENTS.md` and a `README.md`.
- **Created `agent-mesh/references/README.md`**: Structured navigation table indexing all architectural specifications, blueprints, and reports.
- **Created `agent-mesh/references/AGENTS.md`**: Context router establishing `<context-hierarchy>`, scoped guardrails, and relative navigation.
- **Updated `agent-mesh/AGENTS.md`**: Direct navigation link updated from a specific proposal to `./references/AGENTS.md`.
- **Updated `agent-mesh/README.md`**: Integrated `references/` into the primary architecture overview and ASCII directory tree.

---

## 6. Operational Validation of Plugins & MCP Servers

### 6.1 Antigravity Plugin Validation Suite
All 10 domain plugins were validated using `agy plugin validate <dir> --strict`:

| Plugin Directory | Package Name | Skills | Rules | MCP Bindings | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `plugins/packages/appsheet` | `@tupynambalucas-dev/plugin-appsheet` | 3 | 1 | `appsheet`, `playwright` | 100% PASS (0 errors) |
| `plugins/packages/atelier` | `@tupynambalucas-dev/plugin-atelier` | 5 | 1 | *(none)* | 100% PASS (0 errors) |
| `plugins/packages/docusaurus` | `@tupynambalucas-dev/plugin-docusaurus` | 3 | 1 | *(none)* | 100% PASS (0 errors) |
| `plugins/packages/github-flow`| `@tupynambalucas-dev/plugin-github-flow` | 2 | 1 | `github` | 100% PASS (0 errors) |
| `plugins/packages/github-org` | `@tupynambalucas-dev/plugin-github-org` | 4 | 1 | `github` | 100% PASS (0 errors) |
| `plugins/packages/gwork` | `@tupynambalucas-dev/plugin-gwork` | 3 | 1 | `gwork` | 100% PASS (0 errors) |
| `plugins/packages/repo` | `@tupynambalucas-dev/plugin-repo` | 4 | 1 | *(none)* | 100% PASS (0 errors) |
| `plugins/packages/research` | `@tupynambalucas-dev/plugin-research` | 2 | 1 | `context7`, `firecrawl` | 100% PASS (0 errors) |
| `plugins/packages/secrets` | `@tupynambalucas-dev/plugin-secrets` | 2 | 1 | `infisical` | 100% PASS (0 errors) |
| `plugins/packages/web` | `@tupynambalucas-dev/plugin-web` | 3 | 1 | `playwright`, `firecrawl` | 100% PASS (0 errors) |

### 6.2 MCP Dual-Transport Integrity
All 7 MCP packages adhere strictly to:
1. **Pnpm Catalogs**: Zero raw version hardcoding; dependencies resolve via `catalog:mcp-stack` (`@modelcontextprotocol/sdk`, `fastify`), `catalog:shared` (`zod`, `dotenv`), and default `catalog:` (`typescript`, `tsx`).
2. **Dual-Transport Architecture**:
   - `src/index.ts`: Fastify HTTP server listening on `:8080` (or `PORT` environment variable) for Kubernetes AgentGateway.
   - `src/bin.ts`: Stdio JSON-RPC 2.0 executable communicating via stdin/stdout with diagnostic logging directed to `stderr`.
3. **Smart Failover**: Validated compatibility with `scripts/mcp-gateway-router.js`.

---

## 7. Enterprise Recommendations for Antigravity & Claude Code

To maintain institutional consistency and maximize agent capabilities across both Google Antigravity and Anthropic Claude Code:

1. **Dual Manifest Synchronization**:
   - Every domain plugin MUST maintain both `plugin.json` (complying with `agent-plugins.org` v1.0.0) and Claude Code marketplace bindings in `.claude-plugin/marketplace.json`.
   - Native Antigravity tools MUST be mirrored between `mcp_config.json` (for native Antigravity) and `mcp.json` (for cross-vendor runners).
2. **Autonomous Domain Mandates**:
   - Rule 0 in every `rules/AGENTS.md` MUST explicitly declare tool and skill auto-activation to avoid prompt friction.
3. **Token Conservation via Progressive Disclosure**:
   - Bounded context files (`AGENTS.md`) should remain high-level routers under 100 lines.
   - In-depth procedures, schemas, and API documentation must be partitioned into skill subdirectories (`references/`) loaded on-demand.
4. **Secret Hygiene in Dual-Transport MCPs**:
   - Never pass secrets as command-line arguments in `mcp_config.json` or `mcp.json`.
   - Child processes spawned by `mcp-gateway-router.js` inherit environment variables securely from the parent shell or Infisical CLI expansion (`infisical run -- ...`).
