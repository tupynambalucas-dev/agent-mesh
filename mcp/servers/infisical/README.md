# Infisical Model Context Protocol Server (`@tupynambalucas-dev/mcp-infisical`)

Dual-transport Model Context Protocol (MCP) server for Infisical Vault Universal Auth machine identity and secret lifecycle management. Exposes tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## 1. Overview

`@tupynambalucas-dev/mcp-infisical` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` via `dist/index.cjs` and Stdio via `dist/bin.cjs` / `scripts/launcher.cjs`) enabling AI agents to manage secrets and projects across environments (`dev`, `staging`, `prod`) using Machine Identity authentication.

Built with `tsup` (`noExternal`), `dist/bin.cjs` bundles `@modelcontextprotocol/sdk`, `fastify`, `zod`, and `dotenv` into a standalone CommonJS binary for zero-dependency execution across external consumer repositories.

---

## 2. Capabilities / Exports Catalog

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

## 3. Directory Layout

```text
mcp/servers/infisical/
├── scripts/
│   └── launcher.cjs             # Sovereign MCP launcher with .env cascade
├── src/
│   ├── client/
│   │   └── infisical-auth.client.ts # Infisical Universal Auth token client
│   ├── tools/
│   │   ├── index.ts             # Tool registry and registration
│   │   ├── projects.tool.ts     # Project CRUD tools
│   │   └── secrets.tool.ts      # Secret CRUD tools
│   ├── bin.ts                   # Stdio transport entrypoint
│   ├── config.ts                # Zod environment schema
│   ├── index.ts                 # Fastify Streamable HTTP transport entrypoint (:8080)
│   └── types.ts                 # Infisical types
├── AGENTS.md                    # Layer 3 context router
├── mcp.json                     # Agent Plugins stdio declaration
├── package.json                 # Package manifest (@tupynambalucas-dev/mcp-infisical)
├── README.md                    # Layer 3 package documentation
├── tsconfig.json                # TypeScript compiler configuration
└── tsup.config.ts               # Inlined CommonJS bundle configuration
```

---

## 4. Configuration & Usage

| Environment Variable | Description |
| :--- | :--- |
| `INFISICAL_HOST_URL` | Base URL of the Infisical instance (defaults to `https://app.infisical.com`). |
| `INFISICAL_CLIENT_ID` | Universal Auth Client ID. |
| `INFISICAL_CLIENT_SECRET` | Universal Auth Client Secret. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## 5. Development Scripts

```bash
# Bundle into dist/bin.cjs and dist/index.cjs via tsup
pnpm build

# Run via Sovereign Launcher (loads .env cascade)
node scripts/launcher.cjs

# Run via Stdio bundle directly
node dist/bin.cjs

# Run HTTP server
node dist/index.cjs

# Typecheck package
pnpm typecheck
```

---

## 6. Governance & Context

This package adheres to enterprise governance standards:
- [Root Context Router](../../../AGENTS.md)
- [MCP Subsystem Context](../../AGENTS.md)
- [MCP Subsystem README](../../README.md)
- [License](./LICENSE): Apache License 2.0
