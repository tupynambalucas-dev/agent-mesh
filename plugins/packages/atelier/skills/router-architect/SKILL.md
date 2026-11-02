---
name: router-architect
description: Authors and audits hierarchical AGENTS.md context routers, enforcing parent-child XML context inheritance and bounded context rules across monorepos.
---

# Agent Router Architect

This skill defines the authoritative architecture for `AGENTS.md` context router files within multi-repository and monorepo workspaces.

---

## 1. Context Hierarchy & XML Tags

Every local `AGENTS.md` file within a nested bounded context MUST declare its context hierarchy at the very top using XML tags:

```markdown
<context-hierarchy>
  <parent src="../../AGENTS.md" type="global-rules" />
  <parent src="../AGENTS.md" type="bounded-context-rules" />
  <system-instruction>
    AGENT: You are operating in the <context-name> bounded context. If you have not read the parent AGENTS.md files in this session, stop now and read them using your file-reading tools before proceeding.
  </system-instruction>
</context-hierarchy>
```

---

## 2. Structural Requirements for AGENTS.md

1. **Local Context Definition**: Concise description of what this directory subsystem does.
2. **Directory Layout**: Clickable relative links to subfolders and key entrypoints.
3. **Architecture & Pipeline**: Step-by-step description of data flows, mutations, and API handlers.
4. **Operational & Security Guardrails**: Non-negotiable operational boundaries (credential handling, port mappings, error-handling conventions).
5. **Required Skills & Tools**: List of specialized skills active within this context.

---

## 3. Strict Prohibitions & Layer Limits

- **Strict 3-Layer Ceiling**: `AGENTS.md` context routers are strictly limited to 3 architectural layers:
  - Layer 1: Monorepo Root (`/AGENTS.md`).
  - Layer 2: Subsystem Bounded Context (`/<subsystem>/AGENTS.md` - e.g., `mcp/`, `plugins/`, `references/`, `.agents/`).
  - Layer 3: Sovereign Package / Domain Package (`/<subsystem>/packages/<pkg>/AGENTS.md`).
- **Layer 4+ Context Proliferation Prohibited**: NEVER create `AGENTS.md` files below Layer 3. Specifically, leaf content folders, documentation quadrants (`tutorials/`, `how-to-guides/`, `reference/`, `explanation/`), AI artifact containers (`.agents/plans/`, `.agents/reports/`), `src/`, `skills/`, `tests/`, and `docs/` must NEVER contain an `AGENTS.md`.
- **Anti-Context Flooding**: Spawning redundant routers in subdirectories forces Antigravity to recursively load empty or duplicative instructions into the prompt, diluting context budgets and degrading model reasoning.
- **No Duplication**: Never copy global governance rules into local `AGENTS.md` files; inherit them via `<parent>` references.
- **No Stale Pointers**: All relative links must point to existing files on disk.
- **Zero Emojis**: Maintain a strict, professional tone across all routers.

---

## 4. Reference Links

- [Antigravity Customizations & Plugins](../../references/antigravity-customizations-and-plugins.md)
- [Enterprise Naming Conventions Standard](../../references/naming-conventions-standard.md)
- [Agent Plugins Standard Spec (v1.0.0)](../../references/agent-plugins-standard-spec.md)
