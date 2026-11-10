# @tupynambalucas-dev/mcp-infisical

Model Context Protocol server for Infisical Vault Universal Auth machine identity and secret lifecycle management.

---

## Overview

`@tupynambalucas-dev/mcp-infisical` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` via `dist/index.cjs` and Stdio via `dist/bin.cjs` / `scripts/launcher.cjs`) enabling AI agents to manage secrets and projects across environments (`dev`, `staging`, `prod`) using Machine Identity authentication.

Built with `tsup` (`noExternal`), `dist/bin.cjs` bundles `@modelcontextprotocol/sdk`, `fastify`, `zod`, and `dotenv` into a standalone CommonJS binary for zero-dependency execution across external consumer repositories.

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
| `INFISICAL_HOST_URL` | Base URL of the Infisical instance (defaults to `https://app.infisical.com`). |
| `INFISICAL_CLIENT_ID` | Universal Auth Client ID. |
| `INFISICAL_CLIENT_SECRET` | Universal Auth Client Secret. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## Building and Running

```bash
# Bundle into dist/bin.cjs and dist/index.cjs via tsup
pnpm build

# Run via Sovereign Launcher (loads .env cascade)
node scripts/launcher.cjs

# Run via Stdio bundle directly
node dist/bin.cjs

# Run HTTP server
node dist/index.cjs
```
