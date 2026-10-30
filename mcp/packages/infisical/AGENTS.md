<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-infisical package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# Infisical MCP Server Agent Context (`@tupynambalucas-dev/mcp-infisical`)

This bounded context encapsulates the in-house Model Context Protocol server providing Universal Auth secret management and project lifecycle automation for Infisical Vault.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint listening on `:8080`.
- [src/config.ts](./src/config.ts): Configuration schema via Zod (`INFISICAL_HOST_URL`, `INFISICAL_CLIENT_ID`, `INFISICAL_CLIENT_SECRET`).
- [src/auth/infisical-auth.ts](./src/auth/infisical-auth.ts): Machine Identity Universal Auth client and token caching provider.
- [src/tools/secrets.tool.ts](./src/tools/secrets.tool.ts): Complete project and secret lifecycle tools (`infisical_list_secrets`, `infisical_get_secret`, `infisical_create_secret`, etc.).
- [README.md](./README.md): Developer architecture, credentials, and tool reference.

## Operational Guardrails

- MUST route all logging to `process.stderr`. Never output debug information to `process.stdout`.
- MUST NEVER print or log secret values in plain text in terminal output or error messages.
- Production secrets (`env=prod`) must never be retrieved into developer sessions.

## Required Skills

- **`infisical-vault-manager`**: Active when managing Infisical Cloud projects, folders, and environments.
- **`secret-rotation-operator`**: Active when executing secret rotation workflows.
