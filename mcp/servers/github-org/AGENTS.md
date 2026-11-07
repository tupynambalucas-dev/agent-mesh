<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-github-org package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# GitHub Organization MCP Server Agent Context (`@tupynambalucas-dev/mcp-github-org`)

This bounded context encapsulates the domain-scoped Model Context Protocol server providing Tier 1 (`tupynambalucas-org-manager`) GitHub App authenticated organization RBAC, team discovery, ruleset auditing, and security alert interrogation.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint listening on `:8080`.
- [src/tools/index.ts](./src/tools/index.ts): Tool registration and request dispatcher.
- [src/tools/repos.tool.ts](./src/tools/repos.tool.ts): `get_repo_info`, `list_org_repos` - Organization repository inspection tools.
- [src/tools/teams.tool.ts](./src/tools/teams.tool.ts): `list_org_teams` - Organization team RBAC discovery tool.
- [src/tools/rulesets.tool.ts](./src/tools/rulesets.tool.ts): `list_rulesets`, `get_ruleset` - Branch and tag protection ruleset interrogation.
- [src/tools/security.tool.ts](./src/tools/security.tool.ts): `list_dependabot_alerts`, `list_secret_scanning_alerts` - Security audit tools.
- [README.md](./README.md): Developer architecture, credentials, and tool reference.

## Architecture & Conventions

1. **Shared Core Dependency**: Consumes [`@tupynambalucas-dev/mcp-core-github`](../../core/github/README.md) (`getOctokitClient('org-manager')`) for RS256 GitHub App authentication and Zod schema validation.
2. **Dual Transport**: Supports Fastify Streamable HTTP for cluster deployments and Stdio CLI for workstation pairing.

## Operational Guardrails

- MUST NOT print debug logs or tokens to `stdout`; route all diagnostic messages to `stderr`.
- MUST never log or commit plaintext private keys or installation tokens.
- MUST validate all incoming parameters with strict Zod schemas.

## Required Skills

- **`github-security-auditor`**: Active when querying Dependabot and Secret Scanning alerts.
- **`github-ruleset-operator`**: Active when auditing branch protection rulesets.
- **`github-org-operator`**: Active when managing organization teams and repositories.
