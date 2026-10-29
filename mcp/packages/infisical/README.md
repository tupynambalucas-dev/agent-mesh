# @tupynambalucas-dev/mcp-infisical

Model Context Protocol server for Infisical Vault Universal Auth machine identity and secret lifecycle management.

---

## Overview

`@tupynambalucas-dev/mcp-infisical` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` and Stdio via `dist/bin.js`) enabling AI agents to manage secrets and projects across environments (`dev`, `staging`, `prod`) using Machine Identity authentication.

---

## Tools Exposed

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `infisical_list_projects` | None | Lists accessible Infisical projects. |
| `infisical_create_project` | `projectName` | Creates a new project in the organization. |
| `infisical_get_project` | `projectId` | Retrieves project details and configuration. |
| `infisical_delete_project` | `projectId` | Deletes an Infisical project. |
| `infisical_list_secrets` | `projectId`, `environment`, `path` | Lists secrets in a specified folder and environment. |
| `infisical_get_secret` | `secretName`, `projectId`, `environment`, `path` | Retrieves a specific secret value and metadata. |
| `infisical_create_secret` | `secretName`, `secretValue`, `projectId`, `environment`, `path` | Creates a new secret. |
| `infisical_update_secret` | `secretName`, `secretValue`, `projectId`, `environment`, `path` | Updates an existing secret. |
| `infisical_delete_secret` | `secretName`, `projectId`, `environment`, `path` | Deletes a secret. |

---

## Configuration

| Environment Variable | Description |
| :--- | :--- |
| `INFISICAL_SITE_URL` | Base URL of the Infisical instance (defaults to `https://app.infisical.com`). |
| `INFISICAL_CLIENT_ID` | Universal Auth Client ID. |
| `INFISICAL_CLIENT_SECRET` | Universal Auth Client Secret. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## Building and Running

```bash
# Build the TypeScript package
pnpm build

# Run via Stdio
node dist/bin.js

# Run HTTP server
node dist/index.js
```
