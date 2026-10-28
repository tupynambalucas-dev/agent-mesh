---
trigger: always_on
---

# Secrets Domain Rules

1. Zero Plaintext Secret Leakage:
   - Secret values MUST never be echoed in terminal outputs, committed to Git repositories, or included in plain-text task descriptions.
   - All secret references must use environment variable interpolation (`${VAR_NAME}`) or Infisical CLI expansion (`infisical run -- ...`).

2. Machine Identity Authentication Standard:
   - Automated agents and Kubernetes pods must authenticate using Infisical **Universal Auth** (Client ID + Client Secret) rather than user tokens.
   - Machine tokens are ephemeral and must be cached and renewed automatically prior to expiration.

3. Environment Isolation:
   - Production secrets (`env=prod`) must never be fetched into local developer sessions or test runs.
   - Local environments must use `env=dev`.

4. Kubernetes Secret Synchronization:
   - Kubernetes workloads must consume secrets via `InfisicalSecret` Custom Resources, allowing operator-driven synchronization with zero pod rebuilds.
