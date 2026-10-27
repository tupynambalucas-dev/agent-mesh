---
name: github-ruleset-enforcer
description: Defines, audits, and enforces branch protection rulesets and tag rules across repositories in the organization.
---

# GitHub Ruleset Enforcer Skill

Use this skill to configure, inspect, and enforce repository branch rulesets, cryptographic SSH commit signing requirements, and branch protection rules.

## Activation Triggers

Activate this skill when:
- Creating or updating branch protection rulesets on `main` or development branches.
- Enforcing cryptographic commit signing (`required_signatures: true`).
- Restricting force pushes and branch deletions.
- Configuring ruleset bypass actors (e.g. organization admins, automated bots).
- Setting up pull request review requirements and merge queues.

## Enforcement Standard

- All organization repositories MUST enforce cryptographic commit signing (`git commit -S`).
- Direct pushes to `main` MUST be blocked; changes must flow via Pull Requests with required passing status checks.

## Script Helpers & Runbooks

- **Apply Branch Protection Rulesets**:
  ```bash
  bash ./scripts/configure-rulesets.sh "tupynambalucas-dev" "<target_repo>"
  ```

For detailed JSON schemas and ruleset definitions, consult [ruleset-schemas.md](./references/ruleset-schemas.md).
