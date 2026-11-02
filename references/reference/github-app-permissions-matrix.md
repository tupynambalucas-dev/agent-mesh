# GitHub App Permissions Matrix

Authoritative technical reference specifying permission scopes, Infisical vault mappings, and token lifecycles for organizational GitHub Apps.

---

## Permission Matrix by Profile

| GitHub API Scope | Scope Category | `manager` Profile | `assistant` Profile | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `administration` | Repository | **Read & Write** | None | Managing branch protections, rulesets, and repo settings. |
| `contents` | Repository | **Read & Write** | **Read & Write** | Reading files, creating branches, committing changes. |
| `pull_requests` | Repository | **Read & Write** | **Read & Write** | Creating PRs, reviewing code, merging approved changes. |
| `issues` | Repository | **Read & Write** | **Read & Write** | Triage and issue commenting. |
| `actions` | Repository | **Read & Write** | Read | Dispatching workflows and inspecting job run logs. |
| `security_events` | Repository | **Read & Write** | None | Inspecting CodeQL, Secret Scanning, and Dependabot alerts. |
| `members` | Organization | **Read & Write** | None | Team member provisioning and RBAC team assignment. |
| `metadata` | Repository | **Read-only** | **Read-only** | Mandatory base permission for all GitHub Apps. |

---

## Token Lifecycle Specifications

- **Installation Access Token (IAT)**: Valid for exactly **1 hour** (3600 seconds) from time of minting.
- **Refresh Mechanism**: Automated via `mcp-gateway-router.js` or `resolve-operator-role.js` before expiration.
- **Cryptographic Signing**: Commits authored by the App display GitHub's **Verified** badge automatically, requiring zero developer SSH keys on headless CI/CD nodes.

---

## Infisical Secret Key Vaulting

Credentials for the Apps are vaulted across dedicated Infisical projects:

| Environment Variable | Description | Vault Project (`prod`) | Vault Project (`dev`) |
| :--- | :--- | :--- | :--- |
| `GITHUB_APP_ID` | Numeric App ID | `tupynambalucas-dev-platform` | `tupynambalucas-dev-agent-mesh` |
| `GITHUB_APP_INSTALLATION_ID` | Target organization installation ID | `tupynambalucas-dev-platform` | `tupynambalucas-dev-agent-mesh` |
| `GITHUB_APP_PRIVATE_KEY_BASE64` | Base64-encoded RSA private key (`.pem`) | `tupynambalucas-dev-platform` | `tupynambalucas-dev-agent-mesh` |
