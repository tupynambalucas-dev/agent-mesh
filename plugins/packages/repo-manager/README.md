# Repository Manager Domain Plugin (`@tupynambalucas-dev/agent-plugin-repo-manager`)

Enterprise Antigravity and Claude Code plugin for repository governance, root file standards, README architecture, licensing compliance, and community health files.

---

## 1. Overview

`@tupynambalucas-dev/agent-plugin-repo-manager` provides specialized skills and active rules to author, audit, and maintain all standard markdown and metadata files residing at the root of a software repository or subsystem.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Target Files |
| :--- | :--- | :--- |
| **`readme-architect`** | Recursive directory navigation, architecture outlines, and AGENTS-README co-existence invariant. | `README.md` across all directories. |
| **`community-health-architect`** | Standard GitHub community health files, Contributor Covenant, security policies, and changelogs. | `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`. |
| **`license-architect`** | Open-source and proprietary software licensing, SPDX identifiers, and copyright notices. | `LICENSE`, `LICENSE.md`, `package.json` license field. |

---

## 3. The AGENTS-README Co-Existence Invariant

> [!IMPORTANT]
> **Core Architectural Rule:**
> Wherever an `AGENTS.md` context router file exists within a directory, a corresponding `README.md` file **MUST** also exist within that same directory.
>
> The reverse is **NOT** mandatory: a directory containing a `README.md` does not necessarily require an `AGENTS.md`.

---

## 4. Usage

To activate in a workspace, declare in `.agents/plugins.json`:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/repo-manager" }
  ]
}
```
