# How to Consume Plugins in Antigravity and Claude Code

This guide provides step-by-step instructions for integrating and consuming `agent-mesh` domain plugins and sovereign Model Context Protocol (MCP) servers across all organizational environments: the `org-core` meta-repository, external standalone repositories (`omnichannel`), child monorepos (`platform`, `docs`), machine-wide global configurations, and Anthropic Claude Code sessions.

---

## 1. Scenario A: Meta-Repository Root Integration (`org-core`)

When operating at the umbrella `org-core` layer, all core repositories (`agent-mesh`, `platform`, `docs`, `gh-tl`, `.github`) are orchestrated locally on disk via Mani.

In `org-core/.agents/plugins.json`, plugins are referenced directly via relative filesystem paths with zero network overhead:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages"
    },
    {
      "path": "platform/.agents/plugins"
    }
  ]
}
```

*Mechanism*: Antigravity scans `entries` paths **one level deep**. Referencing `agent-mesh/plugins/packages` discovers all 10 domain plugins and mounts their modular skills, domain rules (`rules/AGENTS.md`), and sovereign MCP configurations.

---

## 2. Scenario B: External Repositories and Child Monorepos (Hybrid Umbrella Standard)

For standalone repositories outside `org-core` (such as the `omnichannel` messaging gateway) or child monorepos (`platform`, `docs`) that must operate independently in isolated clones, Docker builds, or CI/CD runners, all plugins and MCP servers are consumed through the single public umbrella package `@tupynambalucas-dev/agent-mesh`.

### 2.1 Choose Installation Channel

#### Option B1: Zero-Token Git Package Channel (Recommended Default)

GitHub Packages (`npm.pkg.github.com`) enforces authentication (`NODE_AUTH_TOKEN` with `read:packages` scope) even when downloading public packages, returning `401 Unauthorized` in unauthenticated environments.

Because `agent-mesh` commits pre-bundled, self-contained CJS binaries (`mcp/servers/*/dist/bin.cjs`) directly into Git (`!mcp/servers/*/dist/`), consumers can install the umbrella package directly from GitHub via pnpm catalogs with **zero token configuration**:

1. In `pnpm-workspace.yaml`, declare the `plugins-stack` catalog:
   ```yaml
   catalogs:
     plugins-stack:
       '@tupynambalucas-dev/agent-mesh': 'github:tupynambalucas-dev/agent-mesh'
   ```
2. In the root `package.json`, reference the catalog entry:
   ```json
   {
     "devDependencies": {
       "@tupynambalucas-dev/agent-mesh": "catalog:plugins-stack"
     }
   }
   ```
3. Run `pnpm install` (or `pnpm update @tupynambalucas-dev/agent-mesh` to pull the latest commit from `main`).

#### Option B2: Authenticated GitHub Packages Registry Channel

For environments that provision a `NODE_AUTH_TOKEN` (Classic PAT or Fine-Grained Token with `read:packages`) in the developer shell or CI runner:

1. Configure `.npmrc` in the repository root (never hardcode secrets in `.npmrc`):
   ```ini
   @tupynambalucas-dev:registry=https://npm.pkg.github.com
   ```
2. Declare the semver range in `pnpm-workspace.yaml`:
   ```yaml
   catalogs:
     plugins-stack:
       '@tupynambalucas-dev/agent-mesh': ^1.2.0
   ```
3. Reference `"@tupynambalucas-dev/agent-mesh": "catalog:plugins-stack"` in `package.json` and run `pnpm install`.

### 2.2 Configure `.agents/plugins.json` in Consumer Repository

Once `@tupynambalucas-dev/agent-mesh` is installed in `node_modules`, configure `.agents/plugins.json` using one of two patterns:

#### Pattern 1: Bulk Import (All 10 Plugins Simultaneously)
Mounts all 10 domain plugins with a single declaration (used in `omnichannel`, `platform`, and `docs`):

```json
{
  "entries": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages"
    }
  ]
}
```

#### Pattern 2: Selective Domain Filtering (`include_only`)
Restricts active plugins to conserve LLM context window tokens while still maintaining a single dependency in `package.json`:

```json
{
  "entries": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages",
      "include_only": [
        "repo",
        "github-flow",
        "secrets",
        "research",
        "web"
      ]
    }
  ]
}
```

Standard domain filter profiles (matching [`presets/*.json`](../reference/umbrella-package-and-presets.md)):
- **Full Stack (`presets/all.json`)**: Omit `include_only` to load all 10 plugins (`appsheet`, `atelier`, `docusaurus`, `github-flow`, `github-org`, `gwork`, `repo`, `research`, `secrets`, `web`).
- **Backend API (`presets/backend-api.json`)**: `["repo", "github-flow", "secrets", "research", "web"]`.
- **Frontend Web (`presets/frontend-web.json`)**: `["repo", "github-flow", "secrets", "research", "web"]`.
- **Documentation Portal (`presets/docs-portal.json`)**: `["repo", "github-flow", "docusaurus", "research"]`.

---

## 3. Scenario C: Sovereign Cross-Repository MCP Execution

When plugins are loaded from `node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages` in an external project like `omnichannel`, every MCP tool call is orchestrated by a two-tier sovereign launcher architecture:

1. **Plugin Launcher (`plugins/packages/<plugin>/scripts/launcher.cjs`)**:
   - Loads environment variables in cascade (`process.cwd()/.env`, parent `.env`) via `loadEnvCascade()`.
   - When `MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`, routes requests to the Kubernetes Cortex Gateway (`npx -y mcp-remote ${CORTEX_GATEWAY_URL}/mcp`).
   - Otherwise, executes `resolveMcpLauncher(pkgName, monorepoDir)` to locate the target MCP server across three deterministic layers:
     1. **Standalone Package**: `@tupynambalucas-dev/mcp-<name>` if installed directly in `node_modules`.
     2. **Umbrella Package Hierarchy**: `node_modules/@tupynambalucas-dev/agent-mesh/mcp/servers/<name>/scripts/launcher.cjs`.
     3. **Monorepo Sibling**: `mcp/servers/<name>/scripts/launcher.cjs` during local `agent-mesh` development.
2. **Sovereign MCP Server Launcher (`mcp/servers/<name>/scripts/launcher.cjs`) & Bundle (`dist/bin.cjs`)**:
   - Each of the 8 MCP servers (`appsheet`, `firecrawl`, `github-flow`, `github-org`, `gwork`, `infisical`, `memory`, `playwright`) contains its own `scripts/launcher.cjs` and pre-built CommonJS bundle `dist/bin.cjs`.
   - Built with `tsup` (`noExternal`), `dist/bin.cjs` inlines `@modelcontextprotocol/sdk`, `@octokit/*`, `fastify`, `zod`, and `dotenv`. Consumer repositories never need to install MCP SDK packages in their own `package.json`.
3. **Playwright Sovereign-or-Upstream Resolution**:
   - In `mcp/servers/playwright/scripts/launcher.cjs`, the launcher checks whether `playwright` driver packages are resolvable in the consumer workspace.
   - If resolvable, it spawns the local bundled `dist/bin.cjs`.
   - If absent (such as in backend API repositories like `omnichannel` that do not depend on Playwright), it automatically falls back to `npx -y @playwright/mcp@0.0.84` with all configured mode flags (`--headless`, `--user-data-dir`, `--extension`, `--cdp-endpoint`).

---

## 4. Scenario D: Machine-Wide Global Plugin Discovery (Zero `node_modules`)

To enable `agent-mesh` plugins globally across all workspaces on a developer workstation:

1. Install the umbrella package globally from GitHub (zero token required):
   ```bash
   pnpm add -g github:tupynambalucas-dev/agent-mesh
   ```
   Or via the Antigravity CLI per plugin:
   ```bash
   agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/packages/atelier
   ```
2. Antigravity scans `~/.gemini/config/plugins/` (or `%USERPROFILE%\.gemini\config\plugins\` on Windows) on startup and activates installed plugins across all sessions.

---

## 5. Scenario E: Anthropic Claude Code Integration

The `agent-mesh` repository includes an enterprise marketplace manifest at [`.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json).

```bash
# 1. Register the tupynambalucas-dev marketplace
/plugin marketplace add tupynambalucas-dev/agent-mesh

# 2. Install domain plugins selectively
/plugin install github-flow@tupynambalucas-dev
/plugin install github-org@tupynambalucas-dev
/plugin install secrets@tupynambalucas-dev
/plugin install atelier@tupynambalucas-dev
```

---

## 6. Troubleshooting Matrix

| Symptom / Error Message | Root Cause | Resolution |
| :--- | :--- | :--- |
| `ERR_PNPM_FETCH_401` / `403` on `https://npm.pkg.github.com/@tupynambalucas-dev%2fagent-mesh` | GitHub Packages requires a Personal Access Token with `read:packages` even for public packages. | Use the zero-token Git specifier `'@tupynambalucas-dev/agent-mesh': 'github:tupynambalucas-dev/agent-mesh'` in `pnpm-workspace.yaml`, or export `NODE_AUTH_TOKEN` with `read:packages`. |
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@modelcontextprotocol/sdk'` | Consumer repository is pinned to an older commit/version (`< 1.2.0`) prior to self-contained `tsup` CJS bundling. | Run `pnpm update @tupynambalucas-dev/agent-mesh` in the consumer repository to pull commit `9a97d53`+ (`v1.2.0`+) containing inlined `dist/bin.cjs` bundles. |
| `Error: Cannot find module 'playwright'` when invoking browser tools in an external repo | Consumer workspace does not install `playwright` locally and used an unpatched launcher. | Update `@tupynambalucas-dev/agent-mesh` to the latest `main` commit. `mcp/servers/playwright/scripts/launcher.cjs` automatically detects missing local `playwright` and engages `@playwright/mcp@0.0.84` (`[launcher:mcp-playwright] Engaging upstream Playwright MCP in 'headless' mode`). |

---

## Related References

- [Domain Plugin Catalog](../reference/domain-plugin-catalog.md)
- [MCP Server Catalog](../reference/mcp-server-catalog.md)
- [Umbrella Package & Presets Specification](../reference/umbrella-package-and-presets.md)
