# How to Configure GitHub Apps and Credentials

This guide provides operational procedures for registering, configuring, and vaulting GitHub App identities used by `agent-mesh` operators to automate repository governance, rulesets, and pull request workflows.

---

## App Profiles Overview

The organization operates two distinct GitHub App profiles:
1. **`manager` (`tupynambalucas-github-manager`)**: High-privilege administrative bot managing teams, repository permissions, branch protection rulesets, and security alerts.
2. **`assistant` (`tupynambalucas-github-assistant`)**: Developer productivity bot performing PR authoring, issue tracking, and CI/CD status inspection.

---

## Method A: Automated Manifest Provisioning (Recommended)

The `github-app-operator` skill includes a Node.js manifest automation script:

```bash
# Provision the organization manager app
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=manager

# Provision the developer assistant app
node plugins/packages/github-org/skills/github-app-operator/scripts/provision-app.js --profile=assistant
```

### Execution Flow:
1. Spawns an ephemeral callback server on `http://localhost:3333`.
2. Generates a pre-configured GitHub App Manifest payload with exact permissions.
3. Opens the browser to GitHub organization settings to confirm registration.
4. Exchanges the authorization code for App ID, Client ID, and RSA private key (`.pem`).
5. Prints the formatted configuration for immediate vaulting into Infisical.

---

## Method B: Manual Configuration Runbook

If programmatic creation is restricted by organization policy:

### 1. Register GitHub App in Organization Settings

1. Navigate to `https://github.com/organizations/tupynambalucas-dev/settings/apps`.
2. Click **New GitHub App**.
3. Configure App Metadata:
   - **GitHub App name**: `tupynambalucas-github-manager` (or `tupynambalucas-github-assistant`).
   - **Homepage URL**: `https://github.com/tupynambalucas-dev`.
   - **Webhook**: Uncheck **Active** (polling and on-demand token minting used instead of webhooks).
4. Set Permissions per Profile:
   - Refer to [GitHub App Permissions Matrix](../reference/github-app-permissions-matrix.md).
5. Where can this GitHub App be installed: Select **Only on this account**.
6. Click **Create GitHub App**.
7. Under **Private keys**, click **Generate a private key** and download the `.pem` file.
8. In the left navigation, click **Install App** and select `tupynambalucas-dev` (All repositories).

---

## Step 2: Vault Credentials into Infisical

Encode the private key in Base64:

```bash
# Linux / macOS
base64 -w 0 path/to/private-key.pem

# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\private-key.pem"))
```

Vault the credentials into Infisical under project `tupynambalucas-dev-platform` (or developer fallback project `tupynambalucas-dev-agent-mesh`):

```bash
infisical secrets set GITHUB_APP_ID="123456" --env=dev
infisical secrets set GITHUB_APP_INSTALLATION_ID="78901234" --env=dev
infisical secrets set GITHUB_APP_PRIVATE_KEY_BASE64="LS0tLS1CRUdJTi..." --env=dev
```

---

## Step 3: Verify Token Minting and Operator Role

Run the pre-flight verification script to confirm that the active token resolves correct permissions:

```bash
# Verify current operator role
node plugins/packages/github-org/skills/github-org-operator/scripts/resolve-operator-role.js

# Output JSON for programmatic consumption
node plugins/packages/github-org/skills/github-org-operator/scripts/resolve-operator-role.js --json
```

---

## Related References

- [GitHub App Permissions Matrix](../reference/github-app-permissions-matrix.md)
- [Least Privilege and Token Security](../explanation/least-privilege-and-token-security.md)
