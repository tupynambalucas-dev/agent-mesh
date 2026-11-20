# GitHub Repository Infrastructure & Governance Domain Plugin (`@tupynambalucas-dev/plugin-github-repo`)

Unified enterprise Antigravity and Claude Code domain plugin for local repository governance, CODEOWNERS, rulesets, monorepo orchestration, pnpm catalogs, licensing compliance, community health standards, and recursive README navigation architecture.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-repo` unifies repository infrastructure and workspace governance across the organization. It governs code ownership (`CODEOWNERS`), dependency vulnerability management (`dependabot.yml`), automated release note categories (`release.yml`), branch/tag protection rulesets, monorepo task pipelines, Mani multi-repository manifests, and the authoritative Enterprise README Standard.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`github-repo-architect`**](./skills/github-repo-architect/SKILL.md) | Audits, scaffolds, and standardizes repository infrastructure, CODEOWNERS, dependabot.yml, release.yml, branch and tag protection rulesets, environments, and labels. | `.github/`, `gh api`, GitHub REST/GraphQL APIs. |
| [**`readme-architect`**](./skills/readme-architect/SKILL.md) | Authors, scaffolds, and refactors enterprise-grade README.md files enforcing numbered sections, recursive navigation, and the AGENTS-README co-existence invariant. | `README.md`, Markdown linters. |
| [**`readme-auditor`**](./skills/readme-auditor/SKILL.md) | Audits and validates README.md files against the Enterprise README Standard, verifying link integrity, script truthfulness, and zero-emoji compliance. | `README.md`, link verifiers. |
| [**`monorepo-architect`**](./skills/monorepo-architect/SKILL.md) | Designs and maintains enterprise monorepo configurations, pnpm catalogs, package manifest scoping (`@<scope>/*`), Turborepo pipelines, and solution TypeScript references. | `pnpm-workspace.yaml`, `turbo.json`, `tsconfig*.json`. |
| [**`github-standards-architect`**](./skills/github-standards-architect/SKILL.md) | Audits, scaffolds, and standardizes `.github` directories, CODEOWNERS, dependabot.yml, and composite custom actions. | `.github/`, `.github/actions/*`. |
| [**`community-health-architect`**](./skills/community-health-architect/SKILL.md) | Authors and audits standard GitHub community health and governance files (`CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`). | Repository root and `.github/`. |
| [**`license-architect`**](./skills/license-architect/SKILL.md) | Authors and audits LICENSE files, SPDX identifiers, copyright notices, and license compliance across monorepo packages. | `LICENSE`, `LICENSE.md`, `package.json`. |
| [**`mani-operator`**](./skills/mani-operator/SKILL.md) | Orchestrates multi-repository workspaces, executes batch tasks across managed projects, maintains declarative `mani.yaml` manifests, and enforces multi-repo hygiene (`sync_gitignore: false`). | `mani.yaml`, `mani run`. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest.
- [rules/AGENTS.md](./rules/AGENTS.md): Autonomous domain rules, code ownership requirements, monorepo standards, and ruleset invariants.
- [skills/](./skills/): Operational instructions for all 8 modular repository skills.
- [references/](./references/): Architectural references including [enterprise-readme-standard.md](./references/enterprise-readme-standard.md).
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting `./scripts/launcher.cjs`.

---

## 4. Governance & Standards

- **Language**: Documentation written strictly in en-US.
- **Zero-Emoji**: Emojis are strictly forbidden across repository descriptions, labels, templates, and documentation.
- **License**: Apache-2.0.
