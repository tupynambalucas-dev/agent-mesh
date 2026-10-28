---
name: secret-rotation-operator
description: Orchestrates zero-downtime secret rotation, regenerates GitHub App private keys, rotates database credentials, and synchronizes Kubernetes InfisicalSecret custom resources.
---

# Secret Rotation Operator

Orchestrates zero-downtime credential rotation for database passwords, API tokens, and GitHub App private keys.

---

## 1. When to Use

Activate this skill when:
- Executing credential rotation runbooks for enterprise services.
- Rotating GitHub App private keys without service interruption.
- Updating Kubernetes workloads after secret rotation via `InfisicalSecret` resync triggers.
- Revoking old credentials post-rotation verification.

---

## 2. Operational Workflows

### Workflow A: Zero-Downtime Credential Rotation Procedure
1. **Generate New Credential**: Generate new key/token with the target upstream service (e.g. GitHub App, Database).
2. **Dual-Credential Enrollment**: If the upstream supports dual credentials, keep the old key active while enrolling the new key in Infisical via `infisical_update_secret`.
3. **Trigger Cluster Resync**: Kubernetes InfisicalSecret operator polls every 60s or trigger a rollout restart:
   ```bash
   kubectl rollout restart deployment/cortex-gateway -n hub
   ```
4. **Verify Health**: Test cluster connectivity and gateway health via `/health`.
5. **Revoke Old Credential**: Safely revoke the deprecated key upstream.

---

## 3. Reference Links

- [Infisical REST API v1 Specification](../../references/infisical-rest-api-v1-schema.md)
- [Kubernetes InfisicalSecret CRD](../../references/kubernetes-infisicalsecret-crd.md)
- [Secrets Domain Rules](../../rules/AGENTS.md)
