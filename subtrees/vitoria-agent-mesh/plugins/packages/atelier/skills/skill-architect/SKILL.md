---
name: skill-architect
description: Designs, refines, and validates Agent Skills (SKILL.md), authoring frontmatter schemas, closed role vocabulary, single-responsibility instructions, and evaluation test cases.
---

# Agent Skill Architect

This skill guides the design, authoring, and evaluation of modular Agent Skills across Antigravity and cross-vendor runtimes.

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

## 2. Frontmatter & Naming Standard

The `SKILL.md` file MUST begin with a clean YAML frontmatter block:

```yaml
---
name: skill-name
description: Clear, action-oriented summary explaining when the agent should activate this skill. Include specific triggers, file types, and domain keywords.
---
```

### Naming & Validation Rules:
- **Exact Directory Match**: Directory name MUST equal the `name` field in YAML frontmatter.
- **Closed Role Vocabulary**: Suffix MUST belong to `{architect, operator, auditor, researcher, extractor}`.
- **Constraints**: 1 to 64 characters, lowercase alphanumeric and hyphens, no leading/trailing hyphens, no consecutive `--`.
- **Reserved Words**: Cannot contain `anthropic` or `claude`.

---

## 3. Instruction Authoring Principles

- **Single Responsibility**: Each skill focuses on one capability. Break large skills into specialized sub-skills.
- **Actionable Steps**: Provide explicit workflows, code templates, and commands rather than abstract guidelines.
- **Zero Emojis**: Maintain a clean, professional, senior engineering tone across all headings and content.

---

## 4. Reference Links

- [Enterprise Naming Conventions Standard](../../references/naming-conventions-standard.md)
- [Agent Plugins Standard Spec (v1.0.0)](../../references/agent-plugins-standard-spec.md)
- [Antigravity Customizations & Plugins](../../references/antigravity-customizations-and-plugins.md)
