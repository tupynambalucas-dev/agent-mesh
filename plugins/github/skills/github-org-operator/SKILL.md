---
name: github-org-operator
description: Automates organization RBAC, team creation, membership assignments, repository provisioning, and repository transfer runbooks.
---

# GitHub Organization Operator Skill

Use this skill to manage GitHub organization teams, assign repository RBAC permissions, create repositories, and manage collaborator access across the `tupynambalucas-dev` organization.

## Activation Triggers

Activate this skill when:
- Creating a new repository under the organization.
- Creating or configuring organization teams.
- Adding or modifying team memberships and repository permissions.
- Changing repository visibility (public/private).
- Executing repository transfer procedures.

## Operational Standards

1. Use GitHub CLI (`gh`) or `@octokit/rest` via the `cortex-github` MCP server.
2. Organization target is strictly `tupynambalucas-dev`.
3. Default visibility for new organization projects is `private` unless explicitly directed.
4. Always enforce the Zero-Emoji Policy across repository descriptions and team names.
