---
name: secret-rotation-operator
description: Orchestrates zero-downtime secret rotation, regenerates GitHub App private keys, rotates database credentials, and synchronizes Kubernetes InfisicalSecret custom resources.
---

# Secret Rotation Operator Skill

Use this skill to orchestrate safe, zero-downtime secret rotation and verify synchronization between Infisical Cloud and Kubernetes runtime environments.

## Activation Triggers

Activate this skill when:
- Rotating expired access tokens or database passwords.
- Generating new GitHub App private keys and uploading them to Infisical.
- Triggering an immediate reconcile of Kubernetes `InfisicalSecret` resources.
- Verifying that pods restart cleanly with updated secret values.

## Zero-Downtime Rotation Standard

1. Issue new credential alongside old credential (grace period).
2. Update Infisical secret value in the target environment.
3. Trigger Kubernetes rollout restart or let the Infisical Operator perform automatic reloading.
4. Verify application health probe before revoking the deprecated credential.
