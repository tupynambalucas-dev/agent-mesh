<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the plugins bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# Domain Plugins Subsystem Agent Context

This document defines the bounded context router for all Antigravity and Claude Code domain plugins in `plugins/packages/*` and shared plugin libraries in `plugins/core/*`.

## Packages Directory Layout

| Plugin Directory | NPM Package Name | Domain Rules & Mandate | Documentation | Manifest |
| :--- | :--- | :--- | :--- | :--- |
| [packages/atelier/](./packages/atelier/) | `@vitoria-rodrigues/plugin-atelier` | [rules/AGENTS.md](./packages/atelier/rules/AGENTS.md) | [README.md](./packages/atelier/README.md) | [plugin.json](./packages/atelier/plugin.json) |
| [packages/docusaurus/](./packages/docusaurus/) | `@vitoria-rodrigues/plugin-docusaurus` | [rules/AGENTS.md](./packages/docusaurus/rules/AGENTS.md) | [README.md](./packages/docusaurus/README.md) | [plugin.json](./packages/docusaurus/plugin.json) |
| [packages/github-flow/](./packages/github-flow/) | `@vitoria-rodrigues/plugin-github-flow` | [rules/AGENTS.md](./packages/github-flow/rules/AGENTS.md) | [README.md](./packages/github-flow/README.md) | [plugin.json](./packages/github-flow/plugin.json) |
| [packages/repo/](./packages/repo/) | `@vitoria-rodrigues/plugin-repo` | [rules/AGENTS.md](./packages/repo/rules/AGENTS.md) | [README.md](./packages/repo/README.md) | [plugin.json](./packages/repo/plugin.json) |
| [packages/research/](./packages/research/) | `@vitoria-rodrigues/plugin-research` | [rules/AGENTS.md](./packages/research/rules/AGENTS.md) | [README.md](./packages/research/README.md) | [plugin.json](./packages/research/plugin.json) |
| [packages/web/](./packages/web/) | `@vitoria-rodrigues/plugin-web` | [rules/AGENTS.md](./packages/web/rules/AGENTS.md) | [README.md](./packages/web/README.md) | [plugin.json](./packages/web/plugin.json) |
| [packages/linkedin/](./packages/linkedin/) | `@vitoria-rodrigues/plugin-linkedin` | [rules/AGENTS.md](./packages/linkedin/rules/AGENTS.md) | [README.md](./packages/linkedin/README.md) | [plugin.json](./packages/linkedin/plugin.json) |

## Architecture & Conventions

1. **Self-Contained Plugin Structure**:
   - `plugin.json`: Authoritative manifest declaring `$schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"`.
   - `skills/`: Modular agent skills with `SKILL.md` frontmatter and progressive disclosure matching directory names.
   - `rules/AGENTS.md`: Mandatory domain rules and Autonomous Domain Mandates loaded unconditionally when the plugin is active.
   - `references/`: Supporting documentation, schemas, and specifications.
2. **Sovereign Two-Tier Launcher MCP Integration**:
   - Native Antigravity: `mcp_config.json` targeting `./scripts/launcher.cjs`.
   - Cross-vendor Agent Plugins 1.0.0: `mcp.json` with explicit `"type": "stdio"` targeting `./scripts/launcher.cjs`.
   - **Three-Layer Resolution (`resolveMcpLauncher()`)**: Plugin launchers resolve their target MCP server without external path assumptions: (1) standalone `@vitoria-rodrigues/mcp-<name>` package, (2) umbrella package `mcp/servers/<name>/scripts/launcher.cjs` (spawning self-contained `dist/bin.cjs`), or (3) monorepo sibling directory, with automatic delegation to upstream runners when configured.
   - **Dynamic Browser Execution**: `web` delegates Playwright operations to `@vitoria-rodrigues/mcp-playwright/scripts/launcher.cjs`, which runs the local bundle when `playwright` is installed or falls back resiliently to `@playwright/mcp@0.0.84` in unbundled consumers.
3. **Strict Validation**:
   - Every domain plugin MUST pass `agy plugin validate <dir> --strict` (or `pnpm plugins:validate` from the monorepo root) with zero errors and zero warnings.

## Operational Guardrails

- MUST NOT introduce circular references between plugins or rely on relative paths outside the plugin or umbrella package hierarchy.
- MUST keep all skills single-responsibility and bounded to their respective domain.
- MUST preserve the Zero-Emoji Invariant across all documentation and rule files.
