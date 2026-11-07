<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the mcp bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# MCP Subsystem Agent Context

This document defines the bounded context router for all in-house Model Context Protocol servers in `mcp/servers/*` and shared core libraries in `mcp/core/*`.

## 1. Deployable MCP Servers (`servers/*`)

| Server Directory | NPM Package | AGENTS Router | Documentation | Lifecycle Role & Status |
| :--- | :--- | :--- | :--- | :--- |
| [servers/appsheet/](./servers/appsheet/) | `@tupynambalucas-dev/mcp-appsheet` | [AGENTS.md](./servers/appsheet/AGENTS.md) | [README.md](./servers/appsheet/README.md) | Active: Relational schema modeling and REST API v2 CRUD automation. |
| [servers/firecrawl/](./servers/firecrawl/) | `@tupynambalucas-dev/mcp-firecrawl` | [AGENTS.md](./servers/firecrawl/AGENTS.md) | [README.md](./servers/firecrawl/README.md) | Active: Deep web scraping, crawling, site mapping, and markdown extraction. |
| [servers/github-flow/](./servers/github-flow/) | `@tupynambalucas-dev/mcp-github-flow` | [AGENTS.md](./servers/github-flow/AGENTS.md) | [README.md](./servers/github-flow/README.md) | Active: Tier 3 developer Git workflows, branches, PRs, and Actions diagnostics. |
| [servers/github-org/](./servers/github-org/) | `@tupynambalucas-dev/mcp-github-org` | [AGENTS.md](./servers/github-org/AGENTS.md) | [README.md](./servers/github-org/README.md) | Active: Tier 1 GitHub App authenticated organization RBAC, teams, rulesets, and security auditing. |
| [servers/gwork/](./servers/gwork/) | `@tupynambalucas-dev/mcp-gwork` | [AGENTS.md](./servers/gwork/AGENTS.md) | [README.md](./servers/gwork/README.md) | Active: Drive folder taxonomy, Sheets synthesis, and Docs publishing. |
| [servers/infisical/](./servers/infisical/) | `@tupynambalucas-dev/mcp-infisical` | [AGENTS.md](./servers/infisical/AGENTS.md) | [README.md](./servers/infisical/README.md) | Active: Universal Auth machine tokens, secret CRUD, and vault management. |
| [servers/memory/](./servers/memory/) | `@tupynambalucas-dev/mcp-memory` | [AGENTS.md](./servers/memory/AGENTS.md) | [README.md](./servers/memory/README.md) | Active: Semantic RAG vector store, episodic memory, and chat history. |
| [servers/playwright/](./servers/playwright/) | `@tupynambalucas-dev/mcp-playwright` | [AGENTS.md](./servers/playwright/AGENTS.md) | [README.md](./servers/playwright/README.md) | Staged Reference: Sovereign engine built for future Cortex cluster hosting. Local plugins invoke upstream `@playwright/mcp` via `launcher.cjs`. |

## 2. Shared Core Libraries (`core/*`)

| Core Directory | NPM Package | AGENTS Router | Documentation | Lifecycle Role & Status |
| :--- | :--- | :--- | :--- | :--- |
| [core/github/](./core/github/) | `@tupynambalucas-dev/mcp-core-github` | [AGENTS.md](./core/github/AGENTS.md) | [README.md](./core/github/README.md) | Active Library: Shared Three-Tier GitHub App authentication, Octokit client factory, and Zod schemas. |

## Architecture & Conventions

1. **Subsystem-Internal Partitioning**:
   - `mcp/servers/*`: Executable server daemons compiling `dist/bin.js` (Stdio) and `dist/index.js` (Fastify Streamable HTTP on `:8080`).
   - `mcp/core/*`: Non-executable shared libraries consumed via `workspace:*` and TypeScript Project References (`tsc -b`).
   - Intermediate grouping directories (`servers/`, `core/`) MUST NOT contain `AGENTS.md` or `README.md` files to preserve the 3-Layer Bounded Context Ceiling.
2. **Catalog Consumption**:
   - Packages MUST use `catalog:mcp-stack` for `@modelcontextprotocol/sdk`, `fastify`, and `@octokit/*`.
   - Packages MUST use `catalog:shared` for `zod` and `dotenv`.
   - Packages MUST use `catalog:` for dev tooling (`@types/node`, `typescript`, `tsx`, `rimraf`).
3. **Build Pipeline**:
   - Build all MCP servers and core libraries via Turborepo: `pnpm mcp:build`.
   - Build individual MCP target: `pnpm mcp:<target>:build` (e.g. `pnpm mcp:github-org:build`, `pnpm mcp:github-flow:build`, `pnpm mcp:core-github:build`).

## Operational Guardrails

- MUST NOT print debug logs to `stdout` in stdio mode; use `stderr` for all diagnostic logging.
- MUST handle missing credentials gracefully with descriptive errors instead of process crashes.
- MUST enforce strict input validation via Zod schemas on all tool arguments.
- MUST maintain zero-hardcoded-path discipline across all tools and transports.
