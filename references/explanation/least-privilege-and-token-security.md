# Least Privilege & Token Security Architecture

This document explains the security architecture, authentication boundaries, and credential hygiene mechanisms implemented across the `agent-mesh` capability workspace.

---

## 1. The Perils of Personal Access Tokens (PATs) in Agent Toolchains

Historically, AI agent setups relied on developer Personal Access Tokens (PATs) stored in local `.env` files:
- **Overprivileged Blast Radius**: A developer's PAT typically carries broad read/write access to all repositories across the organization.
- **Unverified Commits**: Automated commits authored by an agent with a personal PAT appear indistinguishable from human developer commits, complicating audit trails.
- **Credential Leakage**: Plaintext tokens stored in local files risk accidental inclusion in Git commits, terminal history, or debug logs.
- **Zero Token Rotation**: Personal tokens are frequently generated with 90-day or indefinite lifespans, leaving stale credentials vulnerable to compromise.

---

## 2. Machine Identity via Centralized GitHub Apps

To enforce least privilege, `agent-mesh` replaces personal developer tokens with dedicated **GitHub App Machine Identities**:

```text
[Developer / Agent Session]
          │
          ▼
[Infisical Vault (Universal Auth)]
          │ (Ephemeral JWT Generation)
          ▼
[GitHub App Authentication Endpoint]
          │
          ▼ (Issues 1-Hour Ephemeral IAT)
[Scoped Execution in MCP Tools]
```

### Architectural Safeguards:

1. **Short-Lived Ephemeral Tokens**:
   - Installation Access Tokens (IAT) expire automatically after **60 minutes** (3600 seconds).
   - Even if an active token were intercepted, the exposure window is mathematically capped.
2. **Deterministic Role Partitioning**:
   - `manager`: Administrative governance, ruleset enforcement, and security auditing.
   - `assistant`: Scoped daily development (`contents: write`, `pull_requests: write`, `issues: write`).
3. **Cryptographically Verified Commits**:
   - GitHub Apps sign commits automatically at the API layer with GitHub's **Verified** badge.
   - Headless background agents do not require developer private SSH keys to author verified commits.

---

## 3. Runtime Secret Isolation with Infisical Universal Auth

All credentials required by MCP tools (`FIRECRAWL_API_KEY`, `CONTEXT7_API_KEY`, GitHub App RSA private keys) are vaulted in Infisical:
- **No Plaintext on Disk**: Secrets are injected directly into child process memory via `infisical run -- ...` or environment variable expansion.
- **Environment Isolation**: Production secrets reside under `tupynambalucas-dev-platform` and are strictly inaccessible to local developer sessions. Local development utilizes `tupynambalucas-dev-agent-mesh` under `env=dev`.
- **Pre-Flight Role Verification**: The `resolve-operator-role.js` script interrogates the active token against organization RBAC before permitting high-privilege operations, rejecting unauthorized actions before any API call is made.
