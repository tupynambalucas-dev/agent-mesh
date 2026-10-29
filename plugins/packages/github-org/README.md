# GitHub Organization Domain Plugin (`@tupynambalucas-dev/plugin-github-org`)

Enterprise Antigravity and Claude Code plugin for GitHub organization administration, team RBAC, branch protection rulesets, security scanning, and GitHub App provisioning.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-org` handles the administrative outer loop of GitHub organization governance, repository policy enforcement, and GitHub App credentials.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| **`github-org-operator`** | Team creation, RBAC assignments, repository provisioning, repo transfers. | `gh api`, GitHub GraphQL. |
| **`github-ruleset-operator`** | Branch protection rulesets, required status checks, tag immutability rules. | `gh api /repos/{owner}/{repo}/rulesets`. |
| **`github-security-auditor`** | Dependabot alerts, Secret Scanning alerts, CodeQL status. | GitHub Security REST APIs. |
| **`github-app-operator`** | GitHub App Manifest flow, private key generation, installation provisioning. | GitHub App Manifest API. |
