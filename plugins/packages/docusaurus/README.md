# Docusaurus Domain Plugin (`@tupynambalucas-dev/plugin-docusaurus`)

Enterprise Antigravity and Claude Code domain plugin for technical documentation systems, Diataxis documentation taxonomy, MDX v3 authoring compliance, and Crowdin localization isolation.

---

## 1. Overview

`@tupynambalucas-dev/plugin-docusaurus` enforces the Diataxis documentation framework, strict MDX v3 parser compliance, and broken link prevention across enterprise Docusaurus portals.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`docusaurus-architect`**](./skills/docusaurus-architect/SKILL.md) | Designs and maintains technical documentation taxonomies, Diataxis quadrant structuring, and navigation hierarchy (`_category_.json`). | Docs taxonomy and directory structuring. |
| [**`docusaurus-mdx-architect`**](./skills/docusaurus-mdx-architect/SKILL.md) | Authors and refactors technical documents ensuring strict MDX v3 parser compliance, React component syntax, admonitions, and code formatting. | `.mdx` files. |
| [**`docusaurus-auditor`**](./skills/docusaurus-auditor/SKILL.md) | Audits documentation for broken internal links, MDX syntax errors, build failures, and Crowdin localization isolation. | Build diagnostics and link verification. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, Diataxis quadrant mandates, MDX v3 compatibility standards, Crowdin isolation, and Autonomous Domain Mandate.
- [skills/docusaurus-architect/SKILL.md](./skills/docusaurus-architect/SKILL.md): Diataxis quadrant design and category management.
- [skills/docusaurus-mdx-architect/SKILL.md](./skills/docusaurus-mdx-architect/SKILL.md): MDX v3 syntax guidelines and component rules.
- [skills/docusaurus-auditor/SKILL.md](./skills/docusaurus-auditor/SKILL.md): Verification procedures and audit runbooks.

---

## 4. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/docusaurus" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-docusaurus
```

### Claude Code

```bash
/plugin install docusaurus@tupynambalucas-dev
```

---

## 5. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to create, restructure, edit, audit, or validate documentation in a Docusaurus workspace, the agent MUST autonomously engage the Docusaurus skills (`docusaurus-architect`, `docusaurus-mdx-architect`, `docusaurus-auditor`) without waiting for explicit skill invocations from the user.
