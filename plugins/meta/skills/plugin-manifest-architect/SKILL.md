---
name: plugin-manifest-architect
description: Authors and validates Antigravity plugin manifests (plugin.json), pnpm workspace configuration, and MCP server configuration bindings.
---

# Plugin Manifest Architect

This skill guides the authoring of `plugin.json` manifests, workspace dependencies, and MCP server configuration bindings.

---

## 1. Antigravity `plugin.json` Schema

Every plugin in `plugins/<domain>` MUST contain a root `plugin.json`:

```json
{
  "name": "plugin-domain-name",
  "version": "1.0.0",
  "description": "Concise summary of the plugin domain and capabilities.",
  "skills": [
    "./skills/skill-a",
    "./skills/skill-b"
  ],
  "rules": [
    "./rules/rule-a.md"
  ]
}
```

---

## 2. Package Workspace Integration

Each plugin is an independent package published under `@tupynambalucas-dev/agent-plugin-<domain>`:

- Declared in `package.json` with `"publishConfig": { "registry": "https://npm.pkg.github.com", "access": "public" }`.
- Tracked in root `pnpm-workspace.yaml` under `plugins/*`.
- Exposes clean npm exports for consumption in parent or external workspaces.

---

## 3. Scoped MCP Configurations

When a plugin bundles an MCP server:
- Bind it in `mcp_config.json` using the Smart Gateway Router (`scripts/mcp-gateway-router.js`) to provide automated cluster/local failover.
- Avoid hardcoding absolute local paths or fixed credentials.
