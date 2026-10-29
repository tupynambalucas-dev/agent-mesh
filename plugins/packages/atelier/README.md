# AI Agent Atelier Plugin (`@tupynambalucas-dev/plugin-atelier`)

Authoritative AI Agent Atelier for crafting context routers, modular skills, lifecycle hooks, rules, and plugin manifests across multi-agent runtimes (Antigravity, Claude Code, Cursor, Copilot, ChatGPT).

---

## Modular Skills Catalog

1. **`router-architect`**: Authors and audits hierarchical `AGENTS.md` context routers, enforcing parent-child XML context inheritance and bounded context rules across monorepos.
2. **`skill-architect`**: Designs, refines, and validates Agent Skills (`SKILL.md`), authoring frontmatter schemas, single-responsibility instructions, and evaluation test cases.
3. **`rule-architect`**: Authors and audits Antigravity and Claude Code rule files (`rules/*.md`, `rules/AGENTS.md`), configuring trigger modes (`always_on`, `model_decision`), context budgets, and autonomous domain mandates.
4. **`hook-architect`**: Authors and validates lifecycle hooks (`hooks.json`), event handlers (`SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, `Stop`), matchers, and execution timeouts.
5. **`plugin-architect`**: Authors and validates Agent Plugin manifests (`plugin.json`), cross-vendor `agent-plugins.org` v1.0.0 standards, pnpm workspace configuration, and MCP server configuration bindings.

---

## Standards Enforced

- **Cross-Vendor Portability**: Full compliance with the `agent-plugins.org` v1.0.0 standard and native Antigravity runtime.
- **Hierarchical XML Context**: `<context-hierarchy>` tag specification at the root of every bounded context router.
- **Progressive Disclosure**: Modular skills with strict single-responsibility boundaries.
- **Enterprise Governance**: SSH commit signatures, Conventional Commits v1.0.0, Zero-Emoji invariant.
