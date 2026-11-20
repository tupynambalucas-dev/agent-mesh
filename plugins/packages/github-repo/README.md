# GitHub Repository Infrastructure Domain Plugin (`@tupynambalucas-dev/plugin-github-repo`)

Enterprise Antigravity and Claude Code domain plugin for local repository governance, CODEOWNERS, dependabot.yml, release.yml, branch and tag protection rulesets, environments, and labels.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-repo` governs repository infrastructure: declaring code ownership, automating dependency vulnerability remediation, configuring automated release note categories, managing deployment environments, and enforcing local protection rulesets.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`github-repo-architect`**](./skills/github-repo-architect/SKILL.md) | Audits, scaffolds, and standardizes repository infrastructure, CODEOWNERS, dependabot.yml, release.yml, branch and tag protection rulesets, environments, and labels. | `.github/`, `gh api`, GitHub REST/GraphQL APIs. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest.
- [rules/AGENTS.md](./rules/AGENTS.md): Autonomous domain rules, code ownership requirements, and ruleset invariants.
- [skills/github-repo-architect/SKILL.md](./skills/github-repo-architect/SKILL.md): Operational instructions.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting `./scripts/launcher.cjs`.

---

## 4. Governance & Standards

- **Language**: Documentation written strictly in en-US.
- **Zero-Emoji**: Emojis are strictly forbidden across repository descriptions, labels, and templates.
- **License**: Apache-2.0.
