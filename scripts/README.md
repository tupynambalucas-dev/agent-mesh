# Orchestration & Release Scripts (`scripts/`)

This directory houses the root umbrella package release script for `@tupynambalucas-dev/agent-mesh` and documents the two-tier sovereign launcher architecture across domain plugins and Model Context Protocol (MCP) servers.

> [!NOTE]
> Workstation onboarding and readiness gate verification scripts (`bootstrap-workstation.ps1`, `verify-workstation.ps1`) are maintained in the organization governance repository at [`.github/scripts/`](../../.github/scripts/README.md).

---

## 1. Directory Contents

| File | Purpose | Invoked By |
| :--- | :--- | :--- |
| [`publish-root.cjs`](./publish-root.cjs) | Idempotently publishes the root umbrella package `@tupynambalucas-dev/agent-mesh` to GitHub Packages (`npm.pkg.github.com`), gracefully treating `409 Conflict` (`E409`) as a successful no-op when the version already exists. | `pnpm run packages:publish` in [`package.json`](../package.json) and [`.github/workflows/publish.yml`](../.github/workflows/publish.yml) |

---

## 2. Two-Stage Release Pipeline (`packages:publish`)

Package publication across the `agent-mesh` monorepo executes in two deterministic stages orchestrated by [`.github/workflows/publish.yml`](../.github/workflows/publish.yml):

1. **Workspace Packages Publication**:
   ```bash
   pnpm -r publish --access public --no-git-checks --report-summary
   ```
   Publishes all workspace packages (`plugins/packages/*`, `mcp/servers/*`, `mcp/core/*`) to `https://npm.pkg.github.com` using the registries configured in [`pnpm-workspace.yaml`](../pnpm-workspace.yaml).
2. **Root Umbrella Package Publication**:
   ```bash
   node ./scripts/publish-root.cjs
   ```
   Because `pnpm -r publish` skips the root workspace manifest when publishing sub-packages, `publish-root.cjs` executes `pnpm publish --access public --no-git-checks --report-summary` at the repository root so `@tupynambalucas-dev/agent-mesh` (bundling `plugins/packages/`, `mcp/`, `presets/`, and `.claude-plugin/`) is published alongside the sub-packages.

---

## 3. Two-Tier Sovereign Launchers Architecture

MCP server execution is governed by self-contained launchers co-located inside each plugin and MCP server package:

### Tier 1: Domain Plugin Launchers (`plugins/packages/<plugin>/scripts/launcher.cjs`)
1. Cascades `.env` file discovery deterministically from `process.cwd()` and parent directories (`loadEnvCascade()`).
2. If `MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`, routes requests to the Kubernetes Cortex Gateway via `npx -y mcp-remote ${CORTEX_GATEWAY_URL}/mcp`.
3. In `local` profile (default), resolves the target MCP server via `resolveMcpLauncher(pkgName, monorepoDir)` across three layers:
   - **Layer 1**: Standalone installed package (`@tupynambalucas-dev/mcp-<service>`).
   - **Layer 2**: Umbrella package hierarchy (`node_modules/@tupynambalucas-dev/agent-mesh/mcp/servers/<service>/scripts/launcher.cjs`).
   - **Layer 3**: Monorepo sibling (`mcp/servers/<service>/scripts/launcher.cjs`).

### Tier 2: Sovereign MCP Server Launchers (`mcp/servers/<server>/scripts/launcher.cjs`)
1. Packaged inside each MCP server directory and exposed as the package `bin` (`mcp-<server>`).
2. Loads environment variables via `loadEnvCascade()`.
3. Spawns the co-located, `tsup`-bundled CommonJS binary `dist/bin.cjs` via `node` with zero external runtime dependencies.
4. For `mcp-playwright`, checks if `playwright` is resolvable locally; if absent in external consumer repositories, falls back transparently to `npx -y @playwright/mcp@0.0.84` with configured mode flags.
