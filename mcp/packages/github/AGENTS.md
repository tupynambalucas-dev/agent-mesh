<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-github package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# GitHub MCP Server Agent Context (`@tupynambalucas-dev/mcp-github`)

This bounded context encapsulates the in-house Model Context Protocol server providing GitHub App authenticated organization RBAC, ruleset enforcement, and security auditing.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint listening on `:8080`.
- [src/config.ts](./src/config.ts): Configuration schema via Zod (`GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_INSTALLATION_ID`).
- [src/auth/github-app.auth.ts](./src/auth/github-app.auth.ts): App installation token generator and Octokit authentication provider.
- [src/tools/repos.tool.ts](./src/tools/repos.tool.ts): `get_repo_info`, `list_org_repos` - Repository query tools.
- [src/tools/rulesets.tool.ts](./src/tools/rulesets.tool.ts): `list_rulesets`, `get_ruleset` - Branch protection and ruleset interrogation.
- [src/tools/security.tool.ts](./src/tools/security.tool.ts): `list_dependabot_alerts`, `list_secret_scanning_alerts` - Security audit tools.
- [README.md](./README.md): Developer architecture, credentials, and tool reference.

## Architecture & Conventions

1. **GitHub App Authentication**: Uses GitHub App Private Key JWT issuance and Installation Access Token caching to interact with the GitHub REST API v3 without personal PATs.
2. **Dual Transport**: Supports Fastify Streamable HTTP for cluster deployments and Stdio CLI for workstation pairing.

## Operational Guardrails

- MUST NOT print debug logs or tokens to `stdout`; route all diagnostic messages to `stderr`.
- MUST never log or commit plaintext private keys or installation tokens.
- MUST validate all incoming parameters with strict Zod schemas.

## Required Skills

- **`github-security-auditor`**: Active when querying Dependabot and Secret Scanning alerts.
- **`github-ruleset-enforcer`**: Active when auditing branch protection rulesets.
- **`github-org-operator`**: Active when managing organization teams and repositories.
