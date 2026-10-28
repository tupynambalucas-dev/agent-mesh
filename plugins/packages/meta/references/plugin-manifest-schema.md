# Antigravity Plugin and Claude Marketplace Manifest Specification

This reference codifies the exact schemas and structural requirements for Antigravity domain plugins and Claude Code marketplace manifests.

---

## 1. Antigravity `plugin.json` Schema

Located at `<plugin_root>/plugin.json`:

```json
{
  "name": "agent-plugin-example",
  "version": "1.0.0",
  "description": "Short, single-line description of the plugin capabilities.",
  "author": "Team Name <email@example.com>",
  "homepage": "https://docs.example.com",
  "repository": "https://github.com/org/repo",
  "keywords": ["example", "tool"]
}
```

### Critical Rules
- **Do NOT declare `mcpServers` inside `plugin.json`**: MCP servers must be declared exclusively in `<plugin_root>/mcp_config.json`.
- **Do NOT declare explicit `skills` array**: Antigravity automatically discovers all valid `SKILL.md` files located in `./skills/*`. Specifying string names directly triggers validation warnings.
- **Do NOT place `plugin.json` at monorepo root**: Doing so suppresses discovery of child plugins in `plugins/*`.

---

## 2. Antigravity `mcp_config.json` Schema

Located at `<plugin_root>/mcp_config.json`:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["../../scripts/mcp-gateway-router.js", "server-name"],
      "env": {
        "CORTEX_GATEWAY_URL": "http://localhost:8080",
        "CORTEX_PROBE_TIMEOUT_MS": "300"
      }
    }
  }
}
```

---

## 3. Claude Code Marketplace Manifest (`.claude-plugin/marketplace.json`)

Located at `<repo_root>/.claude-plugin/marketplace.json`:

```json
{
  "name": "org-name",
  "owner": {
    "name": "Org Team",
    "email": "team@org.com",
    "url": "https://org.com"
  },
  "metadata": {
    "description": "Catalog description."
  },
  "plugins": [
    {
      "name": "plugin-name",
      "description": "Domain plugin description.",
      "version": "1.0.0",
      "source": "./plugins/plugin-name"
    }
  ]
}
```
