# In-House Model Context Protocol Subsystem (`mcp/`)

This directory houses the sovereign in-house Model Context Protocol (MCP) servers (`mcp/servers/*`) and shared protocol libraries (`mcp/core/*`) authored for the `tupynambalucas-dev` organization.

---

## 1. Overview

The `mcp/` subsystem enforces **Subsystem-Internal Partitioning**:
- **Deployable MCP Servers (`mcp/servers/*`)**: Independent, versioned TypeScript packages implementing a **Dual-Transport Architecture**:
  1. **Streamable HTTP Transport (`src/index.ts`)**: Fastify HTTP server listening on `:8080` (or `PORT` environment variable) serving `/mcp` endpoints for Kubernetes cluster deployments.
  2. **Stdio Transport (`src/bin.ts`)**: Lightweight CLI runner connecting via standard input/output with diagnostic logging routed to `stderr` for local developer CLI workflows and failover.
- **Shared Core Libraries (`mcp/core/*`)**: Non-executable TypeScript libraries shared across multiple domain-scoped MCP servers via `workspace:*` and TypeScript Project References.

---

## 2. Deployable Server Matrix (`mcp/servers/*`)

| Server Directory | NPM Package Name | Stdio Binary | Default HTTP Port | Status & Role | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [servers/appsheet/](./servers/appsheet/README.md) | `@tupynambalucas-dev/mcp-appsheet` | `dist/bin.js` | `:8080` | Production Active | Relational schema modeling and REST API v2 CRUD automation. |
| [servers/firecrawl/](./servers/firecrawl/README.md) | `@tupynambalucas-dev/mcp-firecrawl` | `dist/bin.js` | `:8080` | Production Active | Deep web scraping, crawling, site mapping, and markdown extraction. |
| [servers/github-flow/](./servers/github-flow/README.md) | `@tupynambalucas-dev/mcp-github-flow` | `dist/bin.js` | `:8080` | Production Active | Tier 3 developer Git workflows, branches, pull requests, and Actions diagnostics. |
| [servers/github-org/](./servers/github-org/README.md) | `@tupynambalucas-dev/mcp-github-org` | `dist/bin.js` | `:8080` | Production Active | Tier 1 GitHub App authenticated organization RBAC, teams, rulesets, and security auditing. |
| [servers/gwork/](./servers/gwork/README.md) | `@tupynambalucas-dev/mcp-gwork` | `dist/bin.js` | `:8080` | Production Active | Drive folder taxonomy, Sheets synthesis, and Docs publishing. |
| [servers/infisical/](./servers/infisical/README.md) | `@tupynambalucas-dev/mcp-infisical` | `dist/bin.js` | `:8080` | Production Active | Universal Auth machine tokens, secret CRUD, and vault management. |
| [servers/memory/](./servers/memory/README.md) | `@tupynambalucas-dev/mcp-memory` | `dist/bin.js` | `:8080` | Production Active | Semantic RAG vector store, episodic memory, and chat history. |
| [servers/playwright/](./servers/playwright/README.md) | `@tupynambalucas-dev/mcp-playwright` | `dist/bin.js` | `:8080` | Staged Reference Package | Sovereign engine staged for future Kubernetes Cortex hosting. Current local plugin workflows delegate via `launcher.cjs` to upstream `@playwright/mcp@0.0.84`. |

---

## 3. Shared Core Libraries Matrix (`mcp/core/*`)

| Core Directory | NPM Package Name | Entrypoint | Consumed By | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| [core/github/](./core/github/README.md) | `@tupynambalucas-dev/mcp-core-github` | `dist/index.js` | `mcp-github-org`, `mcp-github-flow` | Three-Tier GitHub App authentication, Octokit client factory, and shared Zod schemas. |

---

## 4. Build & Development Pipeline

Pipelines are orchestrated through Turborepo using pnpm catalogs:

```bash
# Build all MCP packages (core + servers) topologically
pnpm mcp:build

# Typecheck all MCP packages
pnpm mcp:typecheck

# Clean all build outputs
pnpm mcp:clean
```

### Individual Target Builds

```bash
pnpm mcp:core-github:build
pnpm mcp:appsheet:build
pnpm mcp:firecrawl:build
pnpm mcp:github-flow:build
pnpm mcp:github-org:build
pnpm mcp:gwork:build
pnpm mcp:infisical:build
pnpm mcp:memory:build
pnpm mcp:playwright:build
```
