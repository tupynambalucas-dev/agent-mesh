---
name: plugin-architect
description: Authors and validates Agent Plugin manifests (plugin.json), cross-vendor agent-plugins.org v1.0.0 standards, pnpm workspace configuration, and MCP server configuration bindings.
---

# Plugin Manifest Architect

Designs, validates, and refactors Agent Plugin manifests, dual-mode MCP configurations, and Claude Code marketplace manifests across upstream monorepos and downstream consumer workspaces.

---

## 1. When to Use

Activate this skill when:
- Creating or scaffolding a new domain plugin in an upstream mesh monorepo (`agent-mesh`) or inside a downstream consumer workspace (`.agents/plugins/<name>/`).
- Authoring `plugin.json`, `mcp.json`, and `mcp_config.json`.
- Configuring npm/pnpm package consumption for plugins in external projects.
- Registering domain plugins into Claude Code marketplace (`.claude-plugin/marketplace.json`).
- Validating plugins via `agy plugin validate <path> --strict`.

---

## 2. Workspace Context Detection & Scaffolding Targets

When scaffolding a new plugin, the agent MUST first inspect the active repository environment to determine the appropriate target directory:

```
[Agent Task: Create Plugin]
            │
            ├─► Active Repo is "agent-mesh" (Monorepo Mesh) ──► plugins/packages/<slug>/
            │
            └─► Active Repo is Consumer App (e.g. "omnichannel") ──► .agents/plugins/<slug>/
```

> [!IMPORTANT]
> **Zero Hallucination Invariant:**
> When executing inside a consumer workspace (e.g., `omnichannel`, `platform`, or any external project), NEVER search for `agent-mesh` or attempt to create a top-level `plugins/packages/` folder. Local project plugins MUST be scaffolded directly inside `.agents/plugins/<slug>/`, which Antigravity automatically discovers out of the box.

---

## 3. Operational Workflows

### Workflow A: Upstream Monorepo Plugin (`agent-mesh`)
1. Create directory `plugins/packages/<slug>` adhering to [naming-conventions-standard.md](../../references/naming-conventions-standard.md).
2. Author `plugin.json` declaring `$schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"`.
3. If the plugin provides tools, author both `mcp_config.json` (native Antigravity) and `mcp.json` (agent-plugins.org v1.0.0 with explicit `"type": "stdio"`).
4. Author domain rules in `rules/AGENTS.md` with `trigger: always_on` and Rule 0 (Autonomous Domain Mandate).
5. Create `skills/` directory and place domain skills adhering to the closed role vocabulary.
6. Create `package.json` for npm package publishing as `@tupynambalucas-dev/plugin-<slug>`.
7. Register bare plugin slug in `.claude-plugin/marketplace.json`.
8. Validate using `agy plugin validate plugins/packages/<slug> --strict`.

### Workflow B: Downstream Consumer Workspace Plugin (`omnichannel`, etc.)
1. Create directory `.agents/plugins/<slug>/` in the repository root.
2. Author `plugin.json` declaring `$schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"`.
3. Author domain rules in `.agents/plugins/<slug>/rules/AGENTS.md` with `trigger: always_on`.
4. Scaffold modular skills in `.agents/plugins/<slug>/skills/<skill-name>/SKILL.md`.
5. If local MCP tools are required, configure `mcp.json` / `mcp_config.json`.
6. Validate using `agy plugin validate .agents/plugins/<slug> --strict`.

---

## 4. Package Management & Installation Standards

When consuming published organizational plugins via npm/pnpm in a downstream repository:

### Rule 1: Root `package.json` Exclusivity
- All plugin packages MUST be installed in the **root `package.json`** of the project as `devDependencies`:
  ```bash
  pnpm add -D @tupynambalucas-dev/plugin-atelier
  ```
- **Prohibition**: NEVER create a `package.json` inside the `.agents/` directory. The `.agents/` folder is reserved strictly for customization configuration files (`plugins.json`, `skills.json`, local `rules/`, local `skills/`, and local `plugins/`).

### Rule 2: Registration via `.agents/plugins.json`
- Point `.agents/plugins.json` to the installed node module path:
  ```json
  {
    "entries": [
      { "path": "node_modules/@tupynambalucas-dev/plugin-atelier" }
    ]
  }
  ```
- Relative paths in `.agents/plugins.json` automatically resolve against the project root containing `.git`.

---

## 5. Reference Links

- [Agent Plugins Standard Spec (v1.0.0)](../../references/agent-plugins-standard-spec.md)
- [Antigravity Customizations & Plugins](../../references/antigravity-customizations-and-plugins.md)
- [Claude Code Plugins & Marketplace](../../references/claude-code-plugins-and-marketplace.md)
- [Enterprise Naming Conventions Standard](../../references/naming-conventions-standard.md)
- [Enterprise Atelier Governance Rules](../../rules/AGENTS.md)
