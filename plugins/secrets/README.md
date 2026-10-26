# Secrets Domain Plugin (`@tupynambalucas-dev/agent-plugin-secrets`)

Enterprise Antigravity plugin for Infisical secret management, vault synchronization, and zero-downtime rotation.

## Modular Skills Catalog

1. **`infisical-vault-manager`**: Manages secrets across Infisical Cloud projects, folders, and environments (`dev`, `staging`, `prod`), issues Machine Identity credentials, and enforces secret hygiene.
2. **`secret-rotation-operator`**: Orchestrates zero-downtime secret rotation, regenerates GitHub App private keys, rotates database credentials, and synchronizes Kubernetes `InfisicalSecret` custom resources.
