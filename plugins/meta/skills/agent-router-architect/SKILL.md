---
name: agent-router-architect
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

## 3. Strict Prohibitions

- **No Duplication**: Never copy global governance rules into local `AGENTS.md` files; inherit them via `<parent>` references.
- **No Stale Pointers**: All relative links must point to existing files on disk.
- **Zero Emojis**: Maintain a strict, professional tone.
