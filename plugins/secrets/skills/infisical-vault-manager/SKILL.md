---
name: infisical-vault-manager
description: Manages secrets across Infisical Cloud projects, folders, and environments, issues Machine Identity credentials, and enforces secret hygiene.
---

# Infisical Vault Manager Skill

Use this skill to create, update, delete, and inspect secrets managed inside Infisical Cloud projects and environments.

## Activation Triggers

Activate this skill when:
- Retrieving environment variables for local development or CI/CD pipelines.
- Injecting secrets dynamically via the Infisical CLI (`infisical run -- ...`).
- Configuring Machine Identities and Universal Auth client credentials.
- Auditing secret version history or folder structures.

## Secret Hygiene Invariant

1. Plaintext secrets MUST NEVER be printed to terminal output, logs, or chat responses.
2. Reference secret values using environment variable syntax (`${SECRET_KEY}`).
3. Always store secrets in their respective project folder path (`/services/...`, `/platform/...`).
