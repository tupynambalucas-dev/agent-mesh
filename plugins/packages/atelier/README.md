# AI Agent Atelier Plugin (`@tupynambalucas-dev/plugin-atelier`)

Enterprise Antigravity and Claude Code domain plugin for agent engineering: crafting hierarchical context routers (`AGENTS.md`), modular skills (`SKILL.md`), lifecycle hooks (`hooks.json`), domain rules (`rules/AGENTS.md`), and plugin manifests (`plugin.json`).

---

## 1. Overview

`@tupynambalucas-dev/plugin-atelier` provides the authoritative craftsmanship tools to author, audit, optimize, and validate all AI agent assets across multiple runtimes (Google Antigravity, Claude Code, Cursor, Copilot, ChatGPT).

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Target Files & Standards |
| :--- | :--- | :--- |
| [**`router-architect`**](./skills/router-architect/SKILL.md) | Authors and audits hierarchical `AGENTS.md` context routers, enforcing parent-child XML context inheritance and bounded context rules across monorepos. | `AGENTS.md` across all directories. |
| [**`skill-architect`**](./skills/skill-architect/SKILL.md) | Designs, refines, and validates Agent Skills (`SKILL.md`), authoring frontmatter schemas, single-responsibility instructions, and evaluation test cases. | `skills/*/SKILL.md`. |
| [**`rule-architect`**](./skills/rule-architect/SKILL.md) | Authors and audits Antigravity and Claude Code rule files (`rules/*.md`, `rules/AGENTS.md`), configuring trigger modes (`always_on`, `model_decision`), context budgets, and autonomous domain mandates. | `rules/AGENTS.md`, `rules/*.md`. |
| [**`hook-architect`**](./skills/hook-architect/SKILL.md) | Authors and validates lifecycle hooks (`hooks.json`), event handlers (`SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, `Stop`), matchers, and execution timeouts. | `hooks.json`. |
| [**`plugin-architect`**](./skills/plugin-architect/SKILL.md) | Authors and validates Agent Plugin manifests (`plugin.json`), cross-vendor `agent-plugins.org` v1.0.0 standards, pnpm workspace configuration, and MCP server configuration bindings. | `plugin.json`, `mcp.json`, `mcp_config.json`. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Plugin manifest conforming to `agent-plugins.org` v1.0.0.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, SSH signing requirements, Conventional Commits standard, and Autonomous Domain Mandate.
- [skills/router-architect/SKILL.md](./skills/router-architect/SKILL.md): Context router architecture guidelines.
- [skills/skill-architect/SKILL.md](./skills/skill-architect/SKILL.md): Modular skill design and frontmatter standards.
- [skills/rule-architect/SKILL.md](./skills/rule-architect/SKILL.md): Domain rule authoring and context budgeting.
- [skills/hook-architect/SKILL.md](./skills/hook-architect/SKILL.md): Lifecycle hook definitions.
- [skills/plugin-architect/SKILL.md](./skills/plugin-architect/SKILL.md): Plugin manifest and workspace configuration.
- [references/antigravity-customizations-and-plugins.md](./references/antigravity-customizations-and-plugins.md): Antigravity runtime customization specifications.
- [references/agent-plugins-standard-spec.md](./references/agent-plugins-standard-spec.md): Cross-vendor Agent Plugins 1.0.0 specifications.
- [references/claude-code-plugins-and-marketplace.md](./references/claude-code-plugins-and-marketplace.md): Claude Code plugin and marketplace reference.
- [references/naming-conventions-standard.md](./references/naming-conventions-standard.md): Enterprise naming convention standard.

---

## 4. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/atelier" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-atelier
```

### Claude Code

```bash
/plugin install atelier@tupynambalucas-dev
```

---

## 5. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to design, audit, or update AI agent context routers (`AGENTS.md`), agent skills (`SKILL.md`), rule files (`rules/AGENTS.md`), lifecycle hooks (`hooks.json`), or plugin manifests (`plugin.json`), the agent MUST autonomously engage the Atelier AI skills (`router-architect`, `skill-architect`, `rule-architect`, `hook-architect`, `plugin-architect`) without waiting for explicit skill invocations from the user.
