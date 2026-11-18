# How to Configure GitHub Apps and Credentials

This guide provides operational procedures for registering, configuring, and vaulting GitHub App identities used by `agent-mesh` operators to automate repository workflows, pull requests, and CI/CD operations.

---

## App Profiles Overview

The organization operates two distinct GitHub App profiles:
1. **`manager` (`vitoria-rodrigues-github-manager`)**: High-privilege administrative bot managing teams, repository permissions, and security settings.
2. **`assistant` (`vitoria-rodrigues-github-assistant`)**: Developer productivity bot performing PR authoring, issue tracking, and CI/CD status inspection.

---

## Configuration Runbook

### 1. Register GitHub App in Organization Settings

1. Navigate to `https://github.com/organizations/Vitoria-Rodrigues/settings/apps`.
2. Click **New GitHub App**.
3. Configure App Metadata:
   - **GitHub App name**: `vitoria-rodrigues-github-manager` (or `vitoria-rodrigues-github-assistant`).
   - **Homepage URL**: `https://github.com/Vitoria-Rodrigues`.
   - **Webhook**: Uncheck **Active** (polling and on-demand token minting used instead of webhooks).
4. Set Permissions per Profile:
   - Refer to [GitHub App Permissions Matrix](../reference/github-app-permissions-matrix.md).
5. Where can this GitHub App be installed: Select **Only on this account**.
6. Click **Create GitHub App**.
7. Under **Private keys**, click **Generate a private key** and download the `.pem` file.
8. In the left navigation, click **Install App** and select `Vitoria-Rodrigues` (All repositories).

---

## 2. Vault Credentials into Infisical

Encode the private key in Base64:

```bash
# Linux / macOS
base64 -w 0 path/to/private-key.pem

# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\private-key.pem"))
```

Vault the credentials into Infisical under project `Vitoria-Rodrigues-platform` (or developer fallback project `Vitoria-Rodrigues-agent-mesh`):

```bash
infisical secrets set GITHUB_APP_ID="123456" --env=dev
infisical secrets set GITHUB_APP_INSTALLATION_ID="78901234" --env=dev
infisical secrets set GITHUB_APP_PRIVATE_KEY_BASE64="LS0tLS1CRUdJTi..." --env=dev
```

---

## Related References

- [GitHub App Permissions Matrix](../reference/github-app-permissions-matrix.md)
- [Least Privilege and Token Security](../explanation/least-privilege-and-token-security.md)
