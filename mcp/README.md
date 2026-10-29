# In-House Model Context Protocol Servers (`mcp/`)

This directory houses the sovereign in-house Model Context Protocol (MCP) servers authored for the `tupynambalucas-dev` organization.

---

## 1. Overview

Each MCP server is an independent, versioned TypeScript package within the pnpm workspace (`mcp/packages/*`). Every package implements a **Dual-Transport Architecture**:
1. **Streamable HTTP Transport (`src/index.ts`)**: Fastify HTTP server listening on `:8080` (or `PORT` environment variable) serving `/mcp` endpoints for Kubernetes cluster deployments.
2. **Stdio Transport (`src/bin.ts`)**: Lightweight CLI runner connecting via standard input/output with diagnostic logging routed to `stderr` for local developer CLI workflows and failover.

---

## 2. Server Matrix

| Package Directory | NPM Package Name | Stdio Binary | Default HTTP Port | Primary Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| [packages/appsheet/](./packages/appsheet/README.md) | `@tupynambalucas-dev/agent-mcp-appsheet` | `dist/bin.js` | `:8080` | Relational schema modeling and REST API v2 CRUD automation. |
| [packages/firecrawl/](./packages/firecrawl/README.md) | `@tupynambalucas-dev/agent-mcp-firecrawl` | `dist/bin.js` | `:8080` | Deep web scraping, crawling, site mapping, and markdown extraction. |
| [packages/github/](./packages/github/README.md) | `@tupynambalucas-dev/agent-mcp-github` | `dist/bin.js` | `:8080` | GitHub App authenticated organization RBAC and security auditing. |
| [packages/google-workspace/](./packages/google-workspace/README.md) | `@tupynambalucas-dev/agent-mcp-gwork` | `dist/bin.js` | `:8080` | Drive folder taxonomy, Sheets synthesis, and Docs publishing. |
| [packages/infisical/](./packages/infisical/README.md) | `@tupynambalucas-dev/agent-mcp-infisical` | `dist/bin.js` | `:8080` | Universal Auth machine tokens, secret CRUD, and vault management. |
| [packages/memory/](./packages/memory/README.md) | `@tupynambalucas-dev/agent-mcp-memory` | `dist/bin.js` | `:8080` | Semantic RAG vector store, episodic memory, and chat history. |
| [packages/playwright/](./packages/playwright/README.md) | `@tupynambalucas-dev/agent-mcp-playwright` | `dist/bin.js` | `:8080` | Headless browser automation, extension bridge, and ARIA snapshots. |

---

## 3. Build & Development Pipeline

Pipelines are orchestrated through Turborepo using pnpm catalogs:

```bash
# Build all MCP packages concurrently
pnpm mcp:build

# Typecheck all MCP packages
pnpm mcp:typecheck

# Clean all build outputs
pnpm mcp:clean
```

### Individual Target Builds

```bash
pnpm mcp:appsheet:build
pnpm mcp:firecrawl:build
pnpm mcp:github:build
pnpm mcp:gwork:build
pnpm mcp:infisical:build
pnpm mcp:memory:build
pnpm mcp:playwright:build
```

---

## 4. Operational Guardrails

> [!IMPORTANT]
> - Never emit logs or debug output to `stdout` in stdio mode; MCP JSON-RPC protocol requires clean stdout framing. Route all logs to `stderr`.
> - Always validate inputs using Zod schemas.
> - Never hardcode filesystem paths or credentials.
