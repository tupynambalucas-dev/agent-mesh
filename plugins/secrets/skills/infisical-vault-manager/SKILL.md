---
name: infisical-vault-manager
description: Manages secrets across Infisical Cloud projects, folders, and environments, issues Machine Identity credentials, and enforces secret hygiene.
---

# Infisical Vault Manager

Manages, audits, and provisions organization secrets across Infisical projects and environments using `cortex-infisical` MCP tools.

---

## 1. When to Use

Activate this skill when:
- Discovering all accessible projects and environments (`infisical_list_projects`).
- Listing registered secrets in an environment (`infisical_list_secrets`).
- Fetching specific credentials for local execution (`infisical_get_secret`).
- Provisioning new API keys or tokens into Infisical (`infisical_create_secret`).
- Updating rotated credentials (`infisical_update_secret`).
- Revoking expired credentials (`infisical_delete_secret`).

---

## 2. Operational Workflows

### Workflow A: Discovering Projects and Environments
```json
{
  "tool": "infisical_list_projects",
  "arguments": {}
}
```

### Workflow B: Listing Environment Secrets
```json
{
  "tool": "infisical_list_secrets",
  "arguments": {
    "projectId": "134783dd-8a83-4dfc-9fd5-979b52bed86d",
    "environment": "dev",
    "secretPath": "/"
  }
}
```

### Workflow C: Provisioning a New Secret
```json
{
  "tool": "infisical_create_secret",
  "arguments": {
    "secretName": "NEW_SERVICE_API_KEY",
    "secretValue": "token-value",
    "environment": "dev",
    "secretPath": "/"
  }
}
```

### Workflow D: Updating Rotated Credentials
```json
{
  "tool": "infisical_update_secret",
  "arguments": {
    "secretName": "FIRECRAWL_API_KEY",
    "secretValue": "new-firecrawl-key",
    "environment": "dev",
    "secretPath": "/"
  }
}
```

---

## 3. Reference Links

- [Infisical REST API v1 Specification](../../references/infisical-rest-api-v1-schema.md)
- [Kubernetes InfisicalSecret CRD](../../references/kubernetes-infisicalsecret-crd.md)
- [Secrets Domain Rules](../../rules/AGENTS.md)
