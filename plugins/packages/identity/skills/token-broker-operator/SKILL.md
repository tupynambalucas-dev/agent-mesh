---
name: token-broker-operator
description: Operates, configures, and audits the Go Security Token Service (foundation/identity/broker) for ephemeral down-scoped GitHub App Installation Access Tokens, OIDC JWKS validation, and policy-as-code governance.
---

# Token Broker Operator (`foundation/identity/broker`)

Governs the Go Security Token Service (STS) that mints short-lived (60-minute, 55-minute cached) down-scoped GitHub App Installation Access Tokens (IATs) for CI/CD runners and local Agent Mesh MCP servers.

---

## 1. When to Use

Activate this skill when:
- Updating `foundation/identity/broker/config/policies.yaml` to authorize new subjects, repositories, or permission scopes.
- Auditing `No-Privilege-Escalation` boundaries across `org-manager`, `automation`, and `guardian` tiers.
- Starting or diagnosing the local broker daemon (`scripts/start-broker.sh` on `127.0.0.1:8080`).

---

## 2. Security & Logging Invariants

1. **Zero Plaintext Secret Leakage (CodeQL `go/clear-text-logging`)**:
   - Never log raw `Authorization` headers, OIDC tokens, raw caller-supplied subjects, or RSA private keys. Log only server-side resolved `policy.Subject`, target `tier`, and repository count.
2. **Strict Tier Isolation (`No-Privilege-Escalation`)**:
   - A caller requesting `org-manager` MUST never silently fall back to `automation` or `guardian`, and vice versa.
3. **Constant-Time Key Verification**:
   - Local MCP callers authenticate via constant-time `TOKEN_BROKER_API_KEY` + `X-Caller-ID`; GitHub Actions callers authenticate via RS256 OIDC JWT verified against GitHub's live JWKS.
4. **Canonical Environment Variables**:
   - Use `ORG_MANAGER_APP_*`, `AUTOMATION_APP_*`, and `GUARDIAN_APP_*` (retaining `CI_BOT_APP_*` solely as a deprecated runtime fallback).
