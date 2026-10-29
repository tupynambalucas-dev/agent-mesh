# AI Agent Engineering & Meta Architecture Plugin (`@tupynambalucas-dev/agent-plugin-meta`)

Enterprise Antigravity and Claude Code plugin for AI agent engineering: context routers, bounded contexts, modular skills, rulesets, lifecycle hooks, and plugin manifests.

---

## Modular Skills Catalog

1. **`agent-router-architect`**: Authors and audits hierarchical `AGENTS.md` context routers, enforcing parent-child XML context inheritance and bounded context rules across monorepos.
2. **`skill-architect`**: Designs, refines, and validates Antigravity Agent Skills (`SKILL.md`), authoring frontmatter schemas, single-responsibility instructions, and evaluation test cases.
3. **`rule-architect`**: Authors and audits Antigravity and Claude Code rule files (`rules/*.md`, `rules/AGENTS.md`), configuring trigger modes (`always_on`, `model_decision`), context budgets, and autonomous domain mandates.
4. **`hook-architect`**: Authors and validates Antigravity lifecycle hooks (`hooks.json`), event handlers (`SessionStart`, `PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, `Stop`), matchers, and execution timeouts.
5. **`plugin-manifest-architect`**: Authors and validates Antigravity plugin manifests (`plugin.json`), pnpm workspace configuration, and MCP server configuration bindings.

---

## Standards Enforced

- **Hierarchical XML Context**: `<context-hierarchy>` tag specification at the root of every bounded context router.
- **Progressive Disclosure**: Modular skills with strict single-responsibility boundaries.
- **Enterprise Governance**: SSH commit signatures, Conventional Commits v1.0.0, Zero-Emoji invariant.
