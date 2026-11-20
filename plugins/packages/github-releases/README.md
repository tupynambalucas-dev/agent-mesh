# GitHub Releases Domain Plugin (`@tupynambalucas-dev/plugin-github-releases`)

Enterprise Antigravity and Claude Code domain plugin for SemVer 2.0.0 release engineering, Release Please, Changesets, git-cliff, Keep a Changelog curation, and package distribution.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-releases` governs release engineering across the organization: defining SemVer versions, curating Keep a Changelog files, configuring automated release tools (Release Please, Changesets, git-cliff), generating cryptographic release notes, and publishing packages to npm and GitHub Packages.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`github-releases-operator`**](./skills/github-releases-operator/SKILL.md) | Orchestrates SemVer versioning, Keep a Changelog curation, Release Please, Changesets, git-cliff, and package publishing. | `git`, `gh release`, `pnpm publish`, `release-please`. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest.
- [rules/AGENTS.md](./rules/AGENTS.md): Autonomous domain rules, Release-from-Trunk invariants, and confirmation gates.
- [skills/github-releases-operator/SKILL.md](./skills/github-releases-operator/SKILL.md): Operational instructions.
- [skills/github-releases-operator/references/release-engineering.md](./skills/github-releases-operator/references/release-engineering.md): Organization release standard.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting `./scripts/launcher.cjs`.

---

## 4. Governance & Standards

- **Language**: Documentation written strictly in en-US.
- **Zero-Emoji**: Emojis are strictly forbidden across release titles, release descriptions, and changelogs.
- **License**: Apache-2.0.
