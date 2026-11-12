---
name: github-org-operator
description: Automates organization RBAC, team creation, membership assignments, repository provisioning, and repository transfer runbooks.
---

# GitHub Organization Operator Skill

Use this skill to manage GitHub organization teams, assign repository RBAC permissions, create repositories, and manage collaborator access across GitHub organizations, with default bindings for `tupynambalucas-dev`.

## Activation Triggers

Activate this skill when:
- Creating a new repository under the organization.
- Creating or configuring organization teams.
- Adding or modifying team memberships and repository permissions.
- Changing repository visibility (public/private).
- Executing repository transfer procedures.

## Operational Standards

1. Use GitHub CLI (`gh`) or `@octokit/rest` via the `cortex-github` MCP server.
2. Organization target defaults to `tupynambalucas-dev` within enterprise workspaces, or accepts `<target-org>` for external organizations.
3. Default visibility for new organization projects is `private` unless explicitly directed.
4. Always enforce the Zero-Emoji Policy across repository descriptions and team names.

## Script Helpers & Runbooks

- **Role Verification Pre-flight**:
  ```bash
  node ./scripts/resolve-operator-role.js
  ```
- **Bootstrap Functional Teams**:
  ```bash
  # In enterprise workspaces (defaults to tupynambalucas-dev):
  bash ./scripts/bootstrap-teams.sh "tupynambalucas-dev"
  # In external organizations:
  bash ./scripts/bootstrap-teams.sh "<target_org>"
  ```
- **Synchronize Repository Permissions**:
  ```bash
  bash ./scripts/sync-team-permissions.sh "tupynambalucas-dev"
  ```

For detailed team matrix and Fine-Grained PAT permissions, consult [rbac-matrix.md](./references/rbac-matrix.md). For new developer workstation setup and token vs. GitHub App machine identity governance, consult [developer-onboarding.md](./references/developer-onboarding.md).
