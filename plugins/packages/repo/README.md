# Repository Governance Plugin (`@tupynambalucas-dev/plugin-repo`)

Enterprise Antigravity and Claude Code domain plugin for repository governance, root file standards, README architecture, licensing compliance, and community health files.

---

## 1. Overview

`@tupynambalucas-dev/plugin-repo` provides specialized skills and active rules to author, audit, and maintain all standard markdown and metadata files residing at the root of a software repository or subsystem.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Target Files |
| :--- | :--- | :--- |
| [**`readme-architect`**](./skills/readme-architect/SKILL.md) | Authors and audits `README.md` files across monorepos and packages, enforcing recursive directory navigation, GitHub Flavored Markdown standards, and the AGENTS-README co-existence invariant. | `README.md` across all directories. |
| [**`community-health-architect`**](./skills/community-health-architect/SKILL.md) | Authors and audits standard GitHub community health and governance files, including Contributor Covenant, security policies, and changelogs. | `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`. |
| [**`license-architect`**](./skills/license-architect/SKILL.md) | Authors and audits LICENSE files, SPDX identifiers, copyright notices, and open-source compliance across monorepos and package manifests. | `LICENSE`, `LICENSE.md`, `package.json` license fields. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, AGENTS-README co-existence invariant, recursive navigation standards, and Autonomous Domain Mandate.
- [skills/readme-architect/SKILL.md](./skills/readme-architect/SKILL.md): README hierarchy guidelines and recursive directory navigation rules.
- [skills/community-health-architect/SKILL.md](./skills/community-health-architect/SKILL.md): GitHub community health file templates and standards.
- [skills/license-architect/SKILL.md](./skills/license-architect/SKILL.md): License architecture, SPDX identifiers, and manifest alignment.

---

## 4. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/repo" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-repo
```

### Claude Code

```bash
/plugin install repo@tupynambalucas-dev
```

---

## 5. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **The AGENTS-README Co-existence Invariant (Rule 1):**
> Wherever an `AGENTS.md` bounded context router file exists in a directory, a corresponding `README.md` developer documentation file **MUST** also exist within that same directory.
>
> The reverse is **NOT** mandatory: a directory containing a `README.md` does **NOT** necessarily require an `AGENTS.md` (e.g., pure documentation directories, package sub-modules, or asset repositories without agent boundaries). Internal plugin configuration directories (`rules/`) containing `rules/AGENTS.md` are exempt from this requirement.

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to create, audit, align, or format repository root files (`README.md`, `LICENSE.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`), the agent MUST autonomously engage the `repo` skills (`readme-architect`, `community-health-architect`, `license-architect`) without waiting for explicit skill invocations from the user.
