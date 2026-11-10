# How to Consume Plugins in Antigravity and Claude Code

This guide provides practical instructions for integrating and consuming `agent-mesh` domain plugins across different environments: the `org-core` meta-repository, external standalone repositories (e.g., `omnichannel`), child monorepos (`platform`, `docs`), machine-wide global configurations, and Anthropic Claude Code sessions.

---

## Scenario A: Meta-Repository Root Integration (`org-core`)

When operating at the umbrella `org-core` layer, all repositories (`agent-mesh`, `platform`, `docs`, `gh-tl`, `.github`) are orchestrated locally on disk via Mani.

In `org-core/.agents/plugins.json`, plugins are referenced directly via relative filesystem paths without network overhead or duplicate package installations:

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

*Mechanism*: Antigravity scans `entries` paths **one level deep**. Referencing `agent-mesh/plugins/packages` discovers all domain plugins and mounts their skills, rules, and scoped MCP configurations.

---

## Scenario B: External Repositories and Child Monorepos (Hybrid Umbrella Standard)

For standalone repositories outside `org-core` (such as the `omnichannel` messaging gateway) or child monorepos (`platform`, `docs`) operating in isolated environments (CI/CD runners, Docker containers, independent clones), plugins are consumed via the authoritative public umbrella package `@tupynambalucas-dev/agent-mesh`.

### 1. Configure Registry Routing (`.npmrc`)

Ensure the consumer repository routes the `@tupynambalucas-dev` scope to GitHub Packages:

```ini
@tupynambalucas-dev:registry=https://npm.pkg.github.com
```

### 2. Declare Catalog and Package Dependency

In `pnpm-workspace.yaml`:

```yaml
catalogs:
  plugins-stack:
    '@tupynambalucas-dev/agent-mesh': ^1.0.0
```

In `package.json`:

```json
{
  "devDependencies": {
    "@tupynambalucas-dev/agent-mesh": "catalog:plugins-stack"
  }
}
```

Run `pnpm install` to download the cached tarball.

### 3. Configure `.agents/plugins.json` in Consumer Repository

Choose one of three ergonomic consumption patterns:

#### Pattern 1: Bulk Import (All Plugins at Once - Single Line)
Mounts all 10 domain plugins simultaneously:

```json
{
  "entries": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages"
    }
  ]
}
```

#### Pattern 2: Filtered / Tagged Selection (`include_only`)
Restricts active plugins to save LLM context window tokens without installing separate packages:

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

#### Pattern 3: Declarative Preset Inheritance (`inherits`)
Inherits an authoritative domain preset provided by the umbrella package:

```json
{
  "inherits": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/presets/backend-api.json"
    }
  ]
}
```

Available presets:
- `presets/all.json`: All domain plugins.
- `presets/backend-api.json`: `repo`, `github-flow`, `secrets`, `research`, `web`.
- `presets/frontend-web.json`: `repo`, `github-flow`, `secrets`, `research`, `web`.
- `presets/docs-portal.json`: `repo`, `github-flow`, `docusaurus`, `research`.

### 4. Zero-Dependency Sovereign MCP Execution

When consumed in external projects like `omnichannel`, plugins execute their associated MCP servers through sovereign, bundled binaries:

- **No Root Path Dependencies**: Plugin launchers (`scripts/launcher.cjs`) dynamically resolve MCP launchers either from standalone installed packages (`@tupynambalucas-dev/mcp-*`) or from the umbrella package layout (`@tupynambalucas-dev/agent-mesh/mcp/servers/*`).
- **Inlined Runtime Stack**: All MCP server dependencies (such as `@modelcontextprotocol/sdk`, `@octokit/*`, Fastify, and Zod) are bundled directly into `dist/bin.cjs`. The consuming application does not need to install `@modelcontextprotocol/sdk` or any other MCP dependencies into its own `node_modules`.
- **Environment Isolation**: The launcher loads configuration variables from the consumer repository's `.env` automatically via cascade resolution.

---

## Scenario C: Machine-Wide Global Plugin Discovery (Zero `node_modules`)

To provide agent capabilities across all workspaces on a developer machine with zero changes to project-level `package.json` or `node_modules`:

1. Install the umbrella package globally:
   ```bash
   pnpm add -g @tupynambalucas-dev/agent-mesh
   ```
2. Link or copy the plugins into the Antigravity global configuration directory:
   - On Windows: `%USERPROFILE%\.gemini\config\plugins\agent-mesh`
   - On Linux/macOS: `~/.gemini/config/plugins/agent-mesh`

Antigravity scans `~/.gemini/config/plugins/` on launch and loads the plugins across all open workspaces.

---

## Scenario D: Cross-Repository MCP Execution and Secret Resolution

When plugins are executed from an external repository (e.g., `omnichannel`), MCP servers operate seamlessly via the built-in `launcher.cjs`:

1. **Standalone Process Fallback**: If local monorepo source files are absent, the launcher invokes `npx -y @tupynambalucas-dev/mcp-<name>`, pulling the compiled server on demand.
2. **Cluster Gateway Fallback**: If `MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`, the launcher routes tool calls over Streamable HTTP/SSE to the Kubernetes Cortex Gateway (`http://gateway.cortex.svc.cluster.local:8080/mcp`).
3. **Environment & Secret Cascade**: The launcher's `loadEnvCascade()` reads `path.resolve(process.cwd(), '.env')`. Tokens configured in the consumer repository (`GITHUB_TOKEN`, `INFISICAL_*`, `APPSHEET_*`) are inherited automatically by the MCP process.

---

## Scenario E: Anthropic Claude Code Integration

The `agent-mesh` repository includes an enterprise marketplace manifest at `.claude-plugin/marketplace.json`.

### 1. Register the Enterprise Marketplace

```bash
/plugin marketplace add tupynambalucas-dev/agent-mesh
```

### 2. Install Domain Plugins

```bash
/plugin install github-org@tupynambalucas-dev
/plugin install secrets@tupynambalucas-dev
/plugin install atelier@tupynambalucas-dev
```

---

## Related References

- [Domain Plugin Catalog](../reference/domain-plugin-catalog.md)
- [MCP Server Catalog](../reference/mcp-server-catalog.md)
- [Umbrella Package & Presets Specification](../reference/umbrella-package-and-presets.md)
