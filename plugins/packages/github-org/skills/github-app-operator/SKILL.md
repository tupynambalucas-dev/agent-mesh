---
name: github-app-operator
description: Provisions GitHub Apps programmatically using the official GitHub App Manifest flow, capturing App ID, Client ID, and private key (.pem) for organizational enrollment.
---

# GitHub App Provisioner

Automates the creation and configuration of sovereign GitHub Apps using GitHub App Manifests, supporting the 4-App Machine Identity Architecture for `tupynambalucas-dev` and customizable profiles for external GitHub organizations.

---

## 1. When to Use

Activate this skill when:
- Bootstrapping a new organizational GitHub App across the 4-Tier Machine Identity Matrix (`manager`, `automation`, `guardian`, `developer-tools`).
- Rotating or regenerating GitHub App credentials and private keys.
- Enrolling machine identities into Infisical vaults without manual browser form filling.

---

## 2. Supported Profiles

1. **`manager` (`tupynambalucas-org-manager` - Tier 1 Control Plane)**:
   - Full organizational administration, member management, branch protection rulesets, and security auditing (Secret Scanning, Dependabot).
2. **`automation` (`tupynambalucas-automation` - Tier 2A Execution & Delivery Plane)**:
   - CI/CD workflows, package publishing, container builds, and automated release PR generation (`contents: write`, `pull_requests: write`, `packages: write`, `actions: write`).
3. **`guardian` (`tupynambalucas-guardian` - Tier 2B Protection, Policy & Approval Plane)**:
   - Separation of Duties (SoD) policy enforcement, 7 Quality Gates verification, and formal PR review submission (`contents: read`, `pull_requests: write`, `checks: read`, `statuses: read`, `security_events: read`).
4. **`developer-tools` (`tupynambalucas-developer-tools` - Tier 3 Workstation & CLI Plane)**:
   - Scoped developer workstation and CLI (`gh-tl`) operations (`contents: write`, `pull_requests: write`, `issues: write`, `actions: read`).

---

## 3. Execution Workflow

```bash
# Provision Tier 1 (Organization Control Plane):
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=manager

# Provision Tier 2A (CI/CD Execution & Delivery Plane):
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=automation

# Provision Tier 2B (Policy Enforcement & PR Approval Guardian Plane):
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=guardian

# Provision Tier 3 (Workstation & CLI Plane):
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=developer-tools
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
