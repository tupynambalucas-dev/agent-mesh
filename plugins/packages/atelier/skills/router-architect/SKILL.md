---
name: router-architect
description: Authors and audits hierarchical AGENTS.md context routers, enforcing parent-child XML context inheritance, AAIF instruction budgeting (<150 lines), progressive disclosure, and bounded context rules across monorepos.
---

# Agent Router Architect

This skill defines the authoritative architecture for `AGENTS.md` context router files within multi-repository and monorepo workspaces, incorporating the open standards stewarded by the Agentic AI Foundation (AAIF under the Linux Foundation).

---

## 1. Context Hierarchy & XML Tags

Every local `AGENTS.md` file within a nested bounded context (Layer 2 and Layer 3) MUST declare its context hierarchy at the very top using XML tags:

```markdown
<context-hierarchy>
  <parent src="../../AGENTS.md" type="global-rules" />
  <parent src="../AGENTS.md" type="bounded-context-rules" />
  <system-instruction>
    AGENT: You are operating in the <context-name> bounded context. If you have not read the parent AGENTS.md files in this session, stop now and read them using your file-reading tools before proceeding. Global and subsystem constraints are mandatory.
  </system-instruction>
</context-hierarchy>
```

---

## 2. Structural Requirements for AGENTS.md

Every `AGENTS.md` file MUST follow a deterministic section layout:

1. **Title & Operational Scope**: Canonical H1 title `# <Bounded Context or Package Name> Agent Context Router` and concise 1–2 sentence summary defining the exact operational boundary.
2. **Architectural Boundaries & Ubiquitous Language**: Bullet list of domain-specific terms, entities, and non-negotiable architectural invariants (e.g., clean root, socket activation, sparse VHD).
3. **Navigation Table (Subsystems or Packages)**: Structured table linking child packages or domain components with their documentation and agent routers:
   ```markdown
   | Layer | Structural Unit | Context Router | Documentation | Responsibility |
   | :-: | :--- | :--- | :--- | :--- |
   ```
4. **Operational & Security Guardrails**: Non-negotiable operational boundaries (credential handling, port mappings, error-handling conventions, execution timeouts).
5. **Architectural Plans & Dual-Storage Matrix**: Pointer to authoritative plan suites residing in `.agents/plans/` and reminders of the Dual-Storage Invariant.
6. **Required Skills & Tools**: Curated list of autonomous domain skills and MCP tools active within this context.

---

## 3. AAIF Open Standard & Instruction Budgeting

### The 150-Line Instruction Budget
Frontier LLMs reliably track ~150-200 instructions before attention degrades. To ensure high rule compliance and prevent context bloat:
- Every `AGENTS.md` file at Layer 1, Layer 2, and Layer 3 MUST target `< 150 lines` of concise, actionable directives.
- Bloated routers that exceed 200 lines waste prompt tokens on every turn and dilute model reasoning.

### The Progressive Disclosure Pattern (Routing vs. Inlining)
An `AGENTS.md` file is a **router**, not an encyclopedia:
- **Do**: Point the agent to domain skills, schema files, test suites, or Diátaxis documentation hubs (`references/`) via clickable relative links.
- **Do**: State non-negotiable operational invariants.
- **Don't**: Paste thousands of lines of API types, database schemas, or full tutorial texts directly into `AGENTS.md`.
- **Don't**: Re-summarize package-level internal details in the root router.

### Anti-Context Poisoning Safeguards
- Hardcoding rapidly changing transient files, temporary scratch notes, or speculative function signatures poisons the agent's mental model.
- Keep instructions focused on permanent invariants, entrypoints, and architectural rules.

---

## 4. Strict Prohibitions & Layer Limits

- **Strict 3-Layer Ceiling**: `AGENTS.md` context routers are strictly limited to 3 architectural layers:
  - Layer 1: Monorepo Root (`/AGENTS.md`).
  - Layer 2: Subsystem Bounded Context (`/<subsystem>/AGENTS.md` - e.g., `mcp/`, `plugins/`, `references/`, `.agents/`).
  - Layer 3: Sovereign Package / Domain Package (`/<subsystem>/servers/<pkg>/AGENTS.md`, `/<subsystem>/core/<pkg>/AGENTS.md`, or `/<subsystem>/packages/<pkg>/AGENTS.md`). Intermediate grouping directories (`servers/`, `core/`, `packages/`) MUST NOT contain `AGENTS.md` or `README.md` files.
- **Layer 4+ Context Proliferation Prohibited**: NEVER create `AGENTS.md` files below Layer 3. Specifically, leaf content folders, documentation quadrants (`tutorials/`, `how-to-guides/`, `reference/`, `explanation/`), AI artifact containers (`.agents/plans/`, `.agents/reports/`), `src/`, `skills/`, `tests/`, and `docs/` must NEVER contain an `AGENTS.md`.
- **Anti-Context Flooding**: Spawning redundant routers in subdirectories forces the AI agent to recursively load duplicate instructions, diluting context budgets.
- **No Duplication**: Never copy global governance rules into local `AGENTS.md` files; inherit them via `<parent>` references.
- **No Stale Pointers**: All relative links must point to existing files on disk.
- **Zero Emojis**: Maintain a strict, professional tone across all routers.

---

## 5. Reference Links

- [Antigravity Customizations & Plugins](../../references/antigravity-customizations-and-plugins.md)
- [Enterprise Naming Conventions Standard](../../references/naming-conventions-standard.md)
- [Agent Plugins Standard Spec (v1.0.0)](../../references/agent-plugins-standard-spec.md)
