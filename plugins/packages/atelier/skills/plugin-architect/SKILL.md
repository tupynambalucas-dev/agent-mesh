---
name: plugin-architect
description: Authors and validates Agent Plugin manifests (plugin.json), cross-vendor agent-plugins.org v1.0.0 standards, pnpm workspace configuration, and MCP server configuration bindings.
---

# Plugin Manifest Architect

Designs, validates, and refactors Agent Plugin manifests, dual-mode MCP configurations, and Claude Code marketplace manifests.

---

## 1. When to Use

Activate this skill when:
- Creating a new domain plugin in `plugins/packages/<name>/`.
- Authoring `plugin.json`, `mcp.json`, and `mcp_config.json`.
- Registering domain plugins into Claude Code marketplace (`.claude-plugin/marketplace.json`).
- Validating plugins via `agy plugin validate <path> --strict`.

---

## 2. Operational Workflows

### Workflow A: New Domain Plugin Scaffolding
1. Create directory `plugins/packages/<slug>` adhering to [naming-conventions-standard.md](../../references/naming-conventions-standard.md).
2. Author `plugin.json` declaring `$schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"`.
3. If the plugin provides tools, author both `mcp_config.json` (native Antigravity) and `mcp.json` (agent-plugins.org v1.0.0 with explicit `"type": "stdio"`).
4. Create `skills/` directory and place domain skills adhering to the closed role vocabulary.
5. Create `package.json` for npm package publishing as `@tupynambalucas-dev/plugin-<slug>`.
6. Validate using `agy plugin validate <dir> --strict`.

---

## 3. Reference Links

- [Agent Plugins Standard Spec (v1.0.0)](../../references/agent-plugins-standard-spec.md)
- [Antigravity Customizations & Plugins](../../references/antigravity-customizations-and-plugins.md)
- [Claude Code Plugins & Marketplace](../../references/claude-code-plugins-and-marketplace.md)
- [Enterprise Naming Conventions Standard](../../references/naming-conventions-standard.md)
- [Enterprise Atelier Governance Rules](../../rules/AGENTS.md)
