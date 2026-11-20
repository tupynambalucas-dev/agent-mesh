# GitHub Actions Domain Plugin (`@tupynambalucas-dev/plugin-github-actions`)

Enterprise Antigravity and Claude Code domain plugin for GitHub Actions CI/CD automation, workflow authoring, composite custom actions, runner diagnostics, and security hardening.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-actions` governs the CI/CD automation layer: authoring `.github/workflows/*.yml`, scaffolding composite actions under `.github/actions/*`, diagnosing failed job runs, and enforcing least-privilege security.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`github-actions-operator`**](./skills/github-actions-operator/SKILL.md) | Orchestrates GitHub Actions workflows, triggers runs, polls job logs, authors composite actions, and diagnoses CI/CD failures. | `gh workflow`, `gh run`, Actions API. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, composite action requirements, and security policies.
- [skills/github-actions-operator/SKILL.md](./skills/github-actions-operator/SKILL.md): Operational instructions for workflow orchestration and diagnostics.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting `./scripts/launcher.cjs`.

---

## 4. Governance & Standards

- **Language**: Documentation and code written strictly in en-US.
- **Zero-Emoji**: Emojis are strictly forbidden across all workflow names, step descriptions, and logs.
- **License**: Apache-2.0.
