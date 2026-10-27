---
name: plugin-manifest-architect
description: Authors and validates Antigravity plugin manifests (plugin.json), pnpm workspace configuration, and MCP server configuration bindings.
---

# Plugin Manifest Architect

Designs, validates, and refactors Antigravity plugin manifests, MCP configurations, and Claude Code marketplace manifests.

---

## 1. When to Use

Activate this skill when:
- Creating a new domain plugin in `plugins/<name>/`.
- Authoring `plugin.json` or `mcp_config.json`.
- Registering domain plugins into Claude Code marketplace (`.claude-plugin/marketplace.json`).
- Validating plugins via `agy plugin validate . --strict`.

---

## 2. Operational Workflows

### Workflow A: New Domain Plugin Scaffolding
1. Create directory `plugins/<name>`.
2. Author `plugin.json` adhering to [plugin-manifest-schema.md](../../references/plugin-manifest-schema.md).
3. If the plugin provides tools, author `mcp_config.json` routing through `mcp-gateway-router.js`.
4. Create `skills/` directory and place domain skills.
5. Create `package.json` for npm package publishing.
6. Validate using `agy plugin validate . --strict`.

---

## 3. Reference Links

- [Plugin Manifest Schema Reference](../../references/plugin-manifest-schema.md)
- [Enterprise Meta Governance Rules](../../rules/AGENTS.md)
