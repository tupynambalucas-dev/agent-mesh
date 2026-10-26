---
name: secrets-expert
description: Use this skill to manage, inspect, sync, and rotate secrets using Infisical Cloud, Universal Auth, the Infisical MCP server, and Kubernetes InfisicalSecret manifests.
---

# Secrets Manager Skill

This skill defines the operational runbook and protocols for managing enterprise secrets across
`dev`, `staging`, and `prod` environments within the `tupynambalucas-dev` organization.

---

## 1. Tool Selection Protocol

Select the appropriate secrets interface based on the operational context:

| Context / Operation               | Preferred Interface | Mechanism                                                         |
| :-------------------------------- | :------------------ | :---------------------------------------------------------------- |
| **Agent Autonomous Manipulation** | `@infisical/mcp`    | MCP stdio tool calling (`list-secrets`, `get-secret`, `create-secret`, `update-secret`, `delete-secret`, `list-projects`) |
| **Local Process Execution**       | Layered MCP Runner  | `node scripts/mcp-runner.js infisical` (resolves Layer 1 Infisical CLI, Layer 2 `.env`, Layer 3 config) |
| **Cluster Runtime Sync**          | Kubernetes Operator | `InfisicalSecret` CRD referencing `infisical-auth-credentials`    |
| **CI/CD Build Pipelines**         | GitHub Actions Sync | Infisical GitHub Actions Integration pushing secrets from `/ci-cd` |

---

## 2. Monorepo Project Scope

- **Platform Project ID**: `134783dd-8a83-4dfc-9fd5-979b52bed86d`
- **Platform Project Slug**: `tupynambalucas-dev-platform` (formerly `tupynambalucas-core-ez7a`)
- **Agent Mesh Project Slug**: `tupynambalucas-dev-agent-mesh`
- **Environments**: `dev`, `staging`, `prod`

---

## 3. Standard Context Paths (`tupynambalucas-dev-platform`)

Secrets are partitioned into three canonical folder paths:

1. `/cluster`: Infrastructure and cluster services (`CLOUDFLARE_TUNNEL_TOKEN_HUB`, `GRAFANA_ADMIN_PASSWORD`, `MONGO_INITDB_ROOT_PASSWORD`, `REDIS_PASSWORD`, in-cluster `FIRECRAWL_API_KEY`, `CORTEX_MCP_TOKEN`).
2. `/corporate`: In-cluster corporate applications and APIs (`FASTIFY_JWT_SECRET`, `RESEND_API_KEY`, `CORPORATE_DB_URL`).
3. `/ci-cd`: GitHub Actions pipeline deployment tokens (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`).

---

## 4. Kubernetes Secret Generation Workflow

To provision or update the cluster authentication credentials secret:

```bash
kubectl create secret generic infisical-auth-credentials \
  --namespace=<TARGET_NAMESPACE> \
  --from-literal=clientId="<OPERATOR_CLIENT_ID>" \
  --from-literal=clientSecret="<OPERATOR_CLIENT_SECRET>" \
  --dry-run=client -o yaml > k8s/overlays/<ENV>/<CONTEXT>/patches/infisical-credentials.yaml
```

Always verify that the resulting manifest is added to the overlay `kustomization.yaml`.
