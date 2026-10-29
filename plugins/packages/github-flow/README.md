# GitHub Flow Domain Plugin (`@tupynambalucas-dev/plugin-github-flow`)

Enterprise Antigravity and Claude Code plugin for Git developer workflows, Conventional Commits, cryptographic SSH commit signing, and GitHub Actions orchestration.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-flow` automates the day-to-day inner loop of software development: branching, commit signing, PR creation, and CI/CD diagnosis.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| **`github-flow-operator`** | Git workflow execution, Conventional Commits, SSH signing, pull requests. | `git`, `gh`, GitHub REST/GraphQL. |
| **`github-actions-operator`** | CI/CD workflow orchestration, run triggers, log inspection, failure diagnosis. | `gh workflow`, `gh run`. |

---

## 3. Active Rules Enforced

- **SSH Signing**: Every commit signed cryptographically via SSH (`git commit -S`).
- **Conventional Commits**: Strict v1.0.0 syntax.
- **Zero-Emoji Policy**: No emojis in commits, PRs, comments, or summaries.
