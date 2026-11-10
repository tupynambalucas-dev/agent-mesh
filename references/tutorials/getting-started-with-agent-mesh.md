# Getting Started with Agent Mesh

This tutorial provides step-by-step instructions for setting up the `tupynambalucas-dev/agent-mesh` capability workspace, building the self-contained dual-transport Model Context Protocol (MCP) servers, validating domain plugins, and integrating capabilities into both `org-core` and external consumer workspaces.

---

## Prerequisites

Before starting, ensure your workstation satisfies the following requirements:
- **Node.js**: Version 20 LTS or higher (Node.js 22 LTS recommended; `tsup` bundles target `node20`).
- **pnpm**: Version 10.x (`packageManager: pnpm@10.33.2`).
- **Google Antigravity CLI**: `agy` command installed and available in `PATH`.
- **Git**: Configured with cryptographic SSH commit signing (`git config user.signingkey`).

---

## Step 1: Workspace Installation

Navigate to the `agent-mesh` directory and install dependencies across all workspace packages:

```bash
cd agent-mesh
pnpm install
```

Pnpm resolves dependencies strictly using the shared catalogs defined in [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml):
- `catalog:`: Shared build and dev tooling (`typescript: ^6.0.3`, `tsup: ^9.0.0`, `tsx`, `turbo`, `rimraf`, `@types/node`).
- `catalog:mcp-stack`: Unified versions for `@modelcontextprotocol/sdk`, `fastify`, `@octokit/*`, `googleapis`, `firecrawl`, `playwright`, and `ws`.
- `catalog:shared`: Shared validation and environment runtimes (`zod`, `dotenv`).

---

## Step 2: Build All MCP Servers & Core Libraries

Compile the shared core library and bundle all 8 in-house MCP servers using Turborepo:

```bash
pnpm mcp:build
```

Turborepo coordinates topological builds across:
- `mcp/core/github` (`tsc` build producing `dist/index.js` and `.d.ts` declarations)
- `mcp/servers/appsheet`
- `mcp/servers/firecrawl`
- `mcp/servers/github-flow`
- `mcp/servers/github-org`
- `mcp/servers/gwork`
- `mcp/servers/infisical`
- `mcp/servers/memory`
- `mcp/servers/playwright`

Each server in `mcp/servers/*` uses a declarative `tsup.config.ts` (`noExternal`) to produce two self-contained CommonJS entrypoints:
- `dist/bin.cjs`: Standalone Stdio transport executable inlining `@modelcontextprotocol/sdk` and runtime dependencies, invoked by `scripts/launcher.cjs`.
- `dist/index.cjs`: Fastify Streamable HTTP server listening on port `8080`.

> [!NOTE]
> **Committed Server Bundles**: The `mcp/servers/*/dist/` directories are explicitly tracked in Git (`!mcp/servers/*/dist/` in `.gitignore`) so external repositories consuming `github:tupynambalucas-dev/agent-mesh` can execute MCP servers immediately without running a build step or installing MCP SDK dependencies.

---

## Step 3: Validate Domain Plugins

Validate the 10 domain plugins using the strict Antigravity plugin validator:

```bash
# Validate a specific plugin
agy plugin validate plugins/packages/atelier --strict

# Or validate all 10 plugins across the workspace
pnpm plugins:validate
```

All 10 plugins must report `Validation passed` with zero errors.

---

## Step 4: Integrate Plugins into Consumer Workspaces

### 4.1 Inside `org-core` (Local Relative Path)

At the root of the `org-core` meta-repository (`org-core/.agents/plugins.json`), reference the local `plugins/packages` directory directly:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages"
    }
  ]
}
```

### 4.2 In External Repositories (`omnichannel`, `platform`, `docs`)

In standalone repositories or child monorepos, declare `@tupynambalucas-dev/agent-mesh` in `pnpm-workspace.yaml` (`catalogs.plugins-stack`: `'github:tupynambalucas-dev/agent-mesh'`), add it to `devDependencies` in `package.json`, and configure `.agents/plugins.json`:

```json
{
  "entries": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages"
    }
  ]
}
```

Antigravity traverses directories declared in `entries` one level deep, automatically discovering all 10 domain plugins:
- `appsheet`: Prompt-to-app generator and REST API v2 operator.
- `atelier`: Context router, skill, rule, hook, and plugin authoring.
- `docusaurus`: Diataxis taxonomy and MDX v3 authoring.
- `github-flow`: Developer Git assistant and Conventional Commits.
- `github-org`: Organization RBAC and security auditing.
- `gwork`: Google Drive, Sheets, and Docs automation.
- `repo`: Repository health, README architecture, and licensing.
- `research`: Context7 official docs and Firecrawl deep web search.
- `secrets`: Infisical secret vault management and rotation.
- `web`: Universal Playwright browser pairing and automation.

---

## Next Steps

- Consult [How to Consume Plugins in Antigravity and Claude](../how-to-guides/consuming-plugins-in-antigravity-and-claude.md) for selective `include_only` filtering, registry vs. Git channels, and troubleshooting.
- Explore [Authoring Your First Domain Plugin](./authoring-your-first-plugin.md) to extend the mesh with new capabilities.
