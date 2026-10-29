---
name: rule-architect
description: Authors and audits Antigravity and Claude Code rule files (rules/AGENTS.md, rules/*.md), configuring trigger modes, context budgets, and autonomous domain mandates.
---

# Rule Architect

This skill defines the authoritative specifications for authoring, auditing, and maintaining AI agent rule files within Antigravity plugins and workspace roots.

---

## 1. Rule Locations and Architecture

Antigravity discovers and ingests rules from two primary locations:

1. **Plugin Rules (`plugins/<name>/rules/AGENTS.md`)**:
   - Merged automatically into the active agent context whenever the plugin is discovered or enabled.
   - Recommended format: a consolidated `rules/AGENTS.md` file per plugin.
2. **Directory-Based Rules (`AGENTS.md` / `GEMINI.md`)**:
   - Reside directly in workspace folders. Loaded as the agent navigates or opens files within that directory.

---

## 2. Trigger Modes & Frontmatter Schema

Rules files support YAML frontmatter to control injection behavior:

```markdown
---
trigger: always_on
---
```

### Supported Trigger Types
- **`always_on`**: Unconditionally injected into the system prompt `<user_rules>` block at session initialization. Use for essential non-negotiable policies and Autonomous Domain Mandates.
- **`model_decision`**: Subject to progressive disclosure; the agent evaluates rule titles and decides dynamically when to load the full rule content into context.
- **Conditional / Glob-based**: Triggered when modifying files matching specific globs (e.g., `globs: ["**/*.k8s.yaml"]`).

---

## 3. The Autonomous Domain Mandate Pattern (Rule 0)

Every domain plugin MUST include an **Autonomous Domain Mandate** as Rule 0 in its `rules/AGENTS.md`:

```markdown
0. Autonomous Domain Mandate:
   - When requested to [domain actions], the agent MUST autonomously engage the [domain] skills ([skill-a], [skill-b]) and tools ([tool-1], [tool-2]) without waiting for explicit skill or tool invocations from the user.
```

*Purpose*: Eliminates prompt friction. When a user asks a high-level question (e.g. "search documentation on X"), the agent autonomously triggers the appropriate plugin tools without the user needing to specify low-level tool names.

---

## 4. Size Limits and Context Budget

- **Per-File Size Limit**: Capped at `24 KB` (`24,000` bytes). Exceeding this limit results in truncation on line boundaries.
- **Aggregate Rules Budget**: Always-on rules share a `20,000`-token rules budget (`defaultRulesBudget`). Over-budget rules are demoted to on-demand file path pointers. Keep rules concise, imperative, and focused.
- **Deduplication**: Rules are deduplicated by canonical file path. A rule file is never injected twice in the same turn.
