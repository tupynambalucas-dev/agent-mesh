# GitHub Flow Domain Plugin (`@tupynambalucas-dev/plugin-github-flow`)

Enterprise Antigravity and Claude Code domain plugin for single-branch Git developer workflows, Conventional Commits v1.0.0, cryptographic SSH commit signing, and Pull Request lifecycle automation.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-flow` automates the day-to-day inner loop of software development: short-lived semantic branching off `main`, atomic Conventional Commits, cryptographic SSH commit signing, Pull Request authoring, review thread coordination, and safe merge execution.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`github-flow-operator`**](./skills/github-flow-operator/SKILL.md) | Guides and assists developers with Git workflows, branch conventions, Conventional Commits, Pull Request creation, and safe merges. | `git`, `gh pr`, GitHub REST/GraphQL APIs. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, SSH signing requirements, Conventional Commits standards, branching strategies, and Autonomous Domain Mandate.
- [scripts/launcher.cjs](./scripts/launcher.cjs): Sovereign plugin MCP launcher resolving `@tupynambalucas-dev/mcp-github-flow`.
- [skills/github-flow-operator/SKILL.md](./skills/github-flow-operator/SKILL.md): Git workflow execution, Conventional Commits, SSH signing, and pull requests.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for `@tupynambalucas-dev/mcp-github-flow`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting `./scripts/launcher.cjs`.

---

## 4. Governance & Standards

- **Language**: Documentation and code written strictly in en-US.
- **Zero-Emoji**: Emojis are strictly forbidden across all commit messages, PR descriptions, and comments.
- **License**: Apache-2.0.
