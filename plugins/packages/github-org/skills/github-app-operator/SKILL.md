---
name: github-app-operator
description: Provisions GitHub Apps programmatically using the official GitHub App Manifest flow, capturing App ID, Client ID, and private key (.pem) for organizational enrollment.
---

# GitHub App Provisioner

Automates the creation and configuration of sovereign GitHub Apps using GitHub App Manifests, with native profiles for `tupynambalucas-dev` and customizable profiles for external GitHub organizations.

---

## 1. When to Use

Activate this skill when:
- Bootstrapping a new organizational GitHub App (`<org>-github-manager` or `<org>-github-assistant`, defaulting to `tupynambalucas-github-manager` / `tupynambalucas-github-assistant` within the organization).
- Rotating or regenerating GitHub App credentials and private keys.
- Enrolling machine identities into Infisical vaults without manual browser form filling.

---

## 2. Supported Profiles

1. **`manager` (`<org>-github-manager`)**:
   - Full organizational administration, member management, branch protection rulesets, and security auditing (Secret Scanning, Dependabot).
2. **`assistant` (`<org>-github-assistant`)**:
   - Scoped developer productivity: `contents: write`, `pull_requests: write`, `issues: write`, `actions: read`.

---

## 3. Execution Workflow

```bash
# Provision the high-privilege organization manager app:
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=manager

# Provision the developer productivity assistant app:
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=assistant
```

Upon execution:
1. Spawns an ephemeral callback server on `http://localhost:3333`.
2. Directs the administrator to GitHub to confirm app creation.
3. Captures the conversion code, exchanges it for App ID and RSA private key (`.pem`).
4. Outputs the configuration parameters for immediate enrollment into Infisical.

---

## 4. Reference Links

- [GitHub Domain Rules](../../rules/AGENTS.md)
- [GitHub App MCP Server Specification](../../references/github-app-mcp-spec.md)
