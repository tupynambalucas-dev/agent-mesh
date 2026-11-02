# Getting Started with Agent Mesh

This tutorial provides step-by-step instructions for setting up the `tupynambalucas-dev/agent-mesh` capability workspace, building the dual-transport Model Context Protocol (MCP) servers, validating domain plugins, and integrating capabilities into consumer workspaces.

---

## Prerequisites

Before starting, ensure your workstation satisfies the following requirements:
- **Node.js**: Version 22 LTS or higher (`node -v`).
- **pnpm**: Version 9 or higher (`pnpm -v`).
- **Google Antigravity CLI**: `agy` command installed and available in PATH.
- **Git**: Configured with SSH commit signing (`git config user.signingkey`).

---

## Step 1: Workspace Installation

Navigate to the `agent-mesh` directory and install dependencies across all workspace packages:

```bash
cd agent-mesh
pnpm install
```

Pnpm resolves dependencies strictly using the shared catalogs defined in `pnpm-workspace.yaml`:
- `catalog:mcp-stack`: Unified versions for `@modelcontextprotocol/sdk` and `fastify`.
- `catalog:shared`: Shared runtimes including `zod` and `dotenv`.
- `catalog:`: TypeScript 5.8+, tsx, and Node.js types.

---

## Step 2: Build All MCP Servers

Compile all 7 in-house MCP packages using Turborepo:

```bash
pnpm mcp:build
```

Turborepo coordinates concurrent builds across:
- `mcp/packages/appsheet`
- `mcp/packages/firecrawl`
- `mcp/packages/github`
- `mcp/packages/gwork`
- `mcp/packages/infisical`
- `mcp/packages/memory`
- `mcp/packages/playwright`

Each package compiles two entrypoints:
- `dist/bin.js`: Stdio transport executable for local developer workflows.
- `dist/index.js`: Fastify Streamable HTTP server on port 8080.

---

## Step 3: Validate Domain Plugins

Validate the 10 domain plugins using the strict Antigravity plugin validator:

```bash
# Validate a specific plugin
agy plugin validate plugins/packages/atelier --strict

# Or validate all plugins
pnpm plugins:validate
```

All 10 plugins must report `Validation passed` with zero errors.

---

## Step 4: Local Workspace Integration

To consume `agent-mesh` plugins inside another repository within the `org-core` umbrella (e.g., `platform` or `docs`), create or update `.agents/plugins.json` in the consumer repository root:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages"
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

- Consult [How to Consume Plugins in Antigravity and Claude](../how-to-guides/consuming-plugins-in-antigravity-and-claude.md) for selective loading and marketplace registration.
- Explore [Authoring Your First Plugin](./authoring-your-first-plugin.md) to extend the mesh with new capabilities.
