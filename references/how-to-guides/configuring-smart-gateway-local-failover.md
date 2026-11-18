# How to Configure Sovereign Launchers & Upstream Execution

This guide explains how the two-tier launcher architecture (`plugins/packages/<plugin>/scripts/launcher.cjs` and `mcp/servers/<server>/scripts/launcher.cjs`) routes Model Context Protocol (MCP) tool execution between local self-contained CommonJS bundles (`dist/bin.cjs`) and verified upstream packages (`@playwright/mcp`, `mcp-server-linkedin`, `@upstash/context7-mcp`).

---

## 1. Routing Model Overview

When an AI agent invokes an MCP tool, the launcher inspects the active runtime configuration:

1. **Local Sovereign Resolution (Default)**:
   - The plugin launcher executes `resolveMcpLauncher(pkgName, monorepoDir)`, locating the target MCP server across:
     1. Standalone installed package (`@vitoria-rodrigues/mcp-<service>`).
     2. Umbrella package hierarchy (`node_modules/@vitoria-rodrigues/agent-mesh/mcp/servers/<service>/scripts/launcher.cjs`).
     3. Monorepo sibling directory (`mcp/servers/<service>/scripts/launcher.cjs`).
   - The target MCP server launcher spawns its co-located, self-contained bundle `dist/bin.cjs` over Stdio.

2. **Upstream Engine Delegation**:
   - For tools with verified ecosystem distributions (such as Playwright and LinkedIn):
     - **Playwright**: Defaults to `npx -y @playwright/mcp@0.0.84` preserving all mode flags (`headless`, `extension`, `channel`, `cdp`), with native bundle fallback.
     - **LinkedIn**: When `LINKEDIN_ENGINE=upstream` (default), delegates directly to `uvx mcp-server-linkedin@latest` with auto-imported browser sessions (`--import-from-browser auto`) and candidate resume indexing.

---

## 2. Environment Variables & Configuration

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `LINKEDIN_ENGINE` | `upstream` | Engine selector: `upstream` (`uvx`) or `native` (in-house bundle). |
| `LINKEDIN_USE_UPSTREAM` | `true` | Boolean flag enforcing upstream `uvx mcp-server-linkedin` delegation. |
| `LINKEDIN_BROWSER` | `auto` | Browser target for local session cookie auto-import. |
| `LINKEDIN_HEADLESS` | `true` | Run upstream browser in headless mode (`false` for visible GUI). |
| `PLAYWRIGHT_MODE` | `auto` | Browser automation mode (`auto`, `extension`, `headless`, `channel`, `cdp`). |
| `PLAYWRIGHT_HEADLESS` | `true` | Headless execution for background Chromium jobs. |

---

## 3. Cascade `.env` Resolution

Both plugin launchers and MCP server launchers automatically scan for `.env` files across the workspace hierarchy via `loadEnvCascade()`:
1. `process.cwd()/.env` (consumer repository root, e.g., `omnichannel/.env`)
2. `process.cwd()/../.env`
3. Package-local and parent monorepo `.env` files (`agent-mesh/.env`, `org-core/.env`)

Variables already defined in `process.env` are never overwritten. Template placeholders (`<YOUR_*>`) are automatically filtered and ignored.

---

## 4. Verifying Execution Locally and in Consumer Repositories

### 4.1 Verify Sovereign Local Execution

From `agent-mesh` or an external consumer repository (such as `omnichannel`):

```bash
node plugins/packages/research/scripts/launcher.cjs firecrawl --help
```

Expected output on `stderr`:
```text
[launcher:research] Engaging sovereign MCP executable for 'firecrawl': node .../mcp/servers/firecrawl/scripts/launcher.cjs
```

### 4.2 Verify Upstream Delegation

Test LinkedIn launcher delegating to upstream runner:

```bash
node plugins/packages/linkedin/scripts/launcher.cjs
```

Expected output on `stderr`:
```text
[launcher:mcp-linkedin] Engaging upstream runner: uvx mcp-server-linkedin@latest ...
```

---

## Related References

- [Dual-Transport and Sovereign Failover Architecture](../explanation/dual-transport-and-zero-downtime-failover.md)
- [MCP Server Catalog](../reference/mcp-server-catalog.md)
- [Umbrella Package & Presets Specification](../reference/umbrella-package-and-presets.md)
