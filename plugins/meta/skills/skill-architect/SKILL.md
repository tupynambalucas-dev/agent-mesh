---
name: skill-architect
description: Designs, refines, and validates Antigravity Agent Skills (SKILL.md), authoring frontmatter schemas, single-responsibility instructions, and evaluation test cases.
---

# Agent Skill Architect

This skill guides the design, authoring, and evaluation of modular Antigravity Agent Skills.

---

## 1. Skill Folder Anatomy

Each skill must be housed in its own isolated directory:

```plaintext
skills/<skill-name>/
├── SKILL.md                 # Mandatory: Frontmatter + core operational instructions
├── references/              # Optional: In-depth technical specifications and cheat-sheets
└── scripts/                 # Optional: Executable automation and verification helpers
```

---

## 2. Frontmatter Standard

The `SKILL.md` file MUST begin with a clean YAML frontmatter block:

```yaml
---
name: skill-name
description: Clear, action-oriented summary explaining when the agent should activate this skill. Include specific triggers, file types, and domain keywords.
---
```

### Description Rules:
- State what the skill does in the first sentence.
- Include precise trigger keywords and operational contexts.
- Avoid vague statements like "helps with coding".

---

## 3. Instruction Authoring Principles

- **Single Responsibility**: Each skill should focus on one well-defined capability. Break large skills into smaller, specialized sub-skills.
- **Actionable Steps**: Provide explicit workflows, code templates, and commands rather than abstract guidelines.
- **Zero Emojis**: Maintain a clean, professional, senior engineering tone.
