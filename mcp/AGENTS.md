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
| [servers/firecrawl/](./servers/firecrawl/) | `@vitoria-rodrigues/mcp-firecrawl` | [AGENTS.md](./servers/firecrawl/AGENTS.md) | [README.md](./servers/firecrawl/README.md) | Active: Deep web scraping, crawling, site mapping, and markdown extraction (`dist/bin.cjs` + `scripts/launcher.cjs`). |
| [servers/github-flow/](./servers/github-flow/) | `@vitoria-rodrigues/mcp-github-flow` | [AGENTS.md](./servers/github-flow/AGENTS.md) | [README.md](./servers/github-flow/README.md) | Active: Tier 3 developer Git workflows, branches, PRs, and Actions diagnostics (`dist/bin.cjs` + `scripts/launcher.cjs`). |
| [servers/playwright/](./servers/playwright/) | `@vitoria-rodrigues/mcp-playwright` | [AGENTS.md](./servers/playwright/AGENTS.md) | [README.md](./servers/playwright/README.md) | Active Sovereign Engine: Executes bundled `dist/bin.cjs` when local `playwright` is resolvable, with resilient fallback to `@playwright/mcp@0.0.84` in unbundled consumers. |
| [servers/linkedin/](./servers/linkedin/) | `@vitoria-rodrigues/mcp-linkedin` | [AGENTS.md](./servers/linkedin/AGENTS.md) | [README.md](./servers/linkedin/README.md) | Active: LinkedIn profile optimization, job matching, Easy Apply automation, and candidate resume catalog management (`dist/bin.cjs` + `scripts/launcher.cjs`). |

## 2. Shared Core Libraries (`core/*`)

| Core Directory | NPM Package | AGENTS Router | Documentation | Lifecycle Role & Status |
| :--- | :--- | :--- | :--- | :--- |
| [core/github/](./core/github/) | `@vitoria-rodrigues/mcp-core-github` | [AGENTS.md](./core/github/AGENTS.md) | [README.md](./core/github/README.md) | Active Library: Shared Three-Tier GitHub App authentication, Octokit client factory, and Zod schemas (`dist/index.js`, inlined into server bundles). |

## Architecture & Conventions

1. **Subsystem-Internal Partitioning & Self-Contained Bundling**:
   - `mcp/servers/*`: Executable server daemons bundled via `tsup` (`tsup.config.ts` with `noExternal`) into standalone CommonJS binaries `dist/bin.cjs` (Stdio) and `dist/index.cjs` (Fastify Streamable HTTP on `:8080`), accompanied by a sovereign `scripts/launcher.cjs` and `mcp.json`.
   - `mcp/core/*`: Non-executable shared libraries consumed via `workspace:*`, compiled with `tsc` (`dist/index.js`), and inlined into downstream server bundles during `tsup` builds.
   - Intermediate grouping directories (`servers/`, `core/`) MUST NOT contain `AGENTS.md` or `README.md` files to preserve the 3-Layer Bounded Context Ceiling.
2. **Catalog Consumption**:
   - Packages MUST use `catalog:mcp-stack` for `@modelcontextprotocol/sdk`, `fastify`, `@octokit/*`, `googleapis`, `firecrawl`, `playwright`, and `ws`.
   - Packages MUST use `catalog:shared` for `zod` and `dotenv`.
   - Packages MUST use `catalog:` for build and dev tooling (`@types/node`, `typescript`, `tsup`, `tsx`, `rimraf`).
3. **Build Pipeline & Committed Bundles**:
   - Build all MCP servers and core libraries via Turborepo: `pnpm mcp:build`.
   - Build individual MCP target: `pnpm mcp:<target>:build` (e.g. `pnpm mcp:github-flow:build`, `pnpm mcp:firecrawl:build`, `pnpm mcp:core-github:build`).
   - All `mcp/servers/*/dist/` directories are tracked in Git (`!mcp/servers/*/dist/`) so external consumers using `github:Vitoria-Rodrigues/agent-mesh` can run MCP servers without building or installing SDK dependencies.

## Operational Guardrails

- MUST NOT print debug logs to `stdout` in stdio mode; use `stderr` for all diagnostic logging.
- MUST run `pnpm mcp:build` and commit updated `dist/*.cjs` files whenever modifying source code in `mcp/servers/*` or `mcp/core/*`.
- MUST handle missing credentials gracefully with descriptive errors instead of process crashes.
- MUST enforce strict input validation via Zod schemas on all tool arguments.
- MUST maintain zero-hardcoded-path discipline across all tools and transports.
