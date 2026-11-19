---
name: plugin-architect
description: Authors and validates Agent Plugin manifests (plugin.json), cross-vendor agent-plugins.org v1.0.0 standards, pnpm workspace configuration, and MCP server configuration bindings.
---

# Agent Plugin Architect

This skill defines the authoritative architecture for authoring, configuring, and packaging Agent Plugins adhering to the **[agent-plugins.org v1.0.0](https://agent-plugins.org/specification)** cross-vendor specification (supported by Antigravity, Claude Code, Cursor, and Codex).

---

## 1. When to Use

Activate this skill when:
- Creating or scaffolding a new domain plugin in an upstream mesh monorepo or a consumer application repository.
- Authoring or auditing `plugin.json` manifests.
- Configuring MCP servers (`mcp.json` and `mcp_config.json`) within a plugin.
- Authoring plugin lifecycle hooks (`hooks.json`).
- Validating plugin packages for strict conformance before publishing or distribution.
- Managing workspace dependencies and `.agents/plugins.json` consumption.

---

## 2. Workspace Context Detection & Scaffolding Targets

When scaffolding a new plugin, the agent MUST first inspect the active workspace environment dynamically to determine the appropriate target directory:

```
[Agent Task: Create Plugin]
            │
            ├─► Workspace is Plugin Mesh Monorepo (declares plugins/packages/*) ──► plugins/packages/<slug>/
            │
            └─► Workspace is Consumer Application or Standalone Repo ────────────► .agents/plugins/<slug>/
```

### Dynamic Detection Heuristics
1. **Upstream Plugin Mesh Monorepo**: If `pnpm-workspace.yaml` or root `package.json` declares a workspace glob matching `plugins/packages/*`, the repository is an upstream authoring mesh. Target: `plugins/packages/<slug>/`.
2. **Consumer Application / Standalone Workspace**: If the repository does not declare a `plugins/packages/*` workspace glob (e.g., standard product repositories, CLI monorepos, or application codebases), local custom plugins MUST be scaffolded directly inside `.agents/plugins/<slug>/`.

> [!IMPORTANT]
> **Zero Hallucination Invariant:**
> When executing inside a consumer workspace, NEVER assume the existence of an upstream mesh or attempt to create a root-level `plugins/packages/` folder. Local project plugins MUST be scaffolded inside `.agents/plugins/<slug>/`, which Antigravity automatically discovers out of the box.

---

## 3. Operational Workflows

### Workflow A: Upstream Monorepo Plugin (`plugins/packages/<slug>`)
1. Create directory `plugins/packages/<slug>` adhering to [naming-conventions-standard.md](../../references/naming-conventions-standard.md).
2. Author `plugin.json` declaring `$schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"`.
3. If the plugin provides tools, author both `mcp_config.json` (native Antigravity) and `mcp.json` (agent-plugins.org v1.0.0 with explicit `"type": "stdio"`).
4. Author domain rules in `rules/AGENTS.md` with `trigger: always_on` and Rule 0 (Autonomous Domain Mandate).
5. Create `skills/` directory and place domain skills adhering to the closed role vocabulary.
6. Create `package.json` for npm package publishing as `@<scope>/plugin-<slug>` (dynamically inferring `@<scope>` from the root manifest).
7. If operating in a Claude marketplace workspace, register the bare plugin slug in `.claude-plugin/marketplace.json`.
8. Validate using `agy plugin validate plugins/packages/<slug> --strict`.

### Workflow B: Downstream Consumer Workspace Plugin (`.agents/plugins/<slug>`)
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
  # Enterprise or generic scoped package installation:
  pnpm add -D @<scope>/plugin-<slug>
  ```
- **Prohibition**: NEVER create a `package.json` inside the `.agents/` directory. The `.agents/` folder is reserved strictly for customization configuration files (`plugins.json`, `skills.json`, local `rules/`, local `skills/`, and local `plugins/`).

### Rule 2: Registration via `.agents/plugins.json`
- Point `.agents/plugins.json` to the installed node module path:
  ```json
  {
    "entries": [
      { "path": "node_modules/@<scope>/plugin-<slug>" }
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
