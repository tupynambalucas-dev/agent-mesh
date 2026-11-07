<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-github-flow package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# GitHub Flow MCP Server Agent Context (`@tupynambalucas-dev/mcp-github-flow`)

This bounded context encapsulates the domain-scoped Model Context Protocol server providing developer Git workflow inspection, branch status, Pull Request querying, and GitHub Actions workflow diagnostics.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint listening on `:8080`.
- [src/tools/index.ts](./src/tools/index.ts): Tool registration and request dispatcher.
- [src/tools/repos.tool.ts](./src/tools/repos.tool.ts): `get_repo_info`, `list_branches` - Repository and branch inspection tools.
- [src/tools/pulls.tool.ts](./src/tools/pulls.tool.ts): `list_pull_requests`, `get_pull_request` - Pull Request inspection tools.
- [src/tools/actions.tool.ts](./src/tools/actions.tool.ts): `list_workflow_runs`, `get_workflow_run` - GitHub Actions CI/CD diagnostic tools.
- [README.md](./README.md): Developer architecture, credentials, and tool reference.

## Architecture & Conventions

1. **Shared Core Dependency**: Consumes [`@tupynambalucas-dev/mcp-core-github`](../../core/github/README.md) (`getOctokitClient('developer-tools')`) for Tier 3 User Access Token / PAT authentication with fallback to App credentials.
2. **Dual Transport**: Supports Fastify Streamable HTTP for cluster deployments and Stdio CLI for workstation pairing.

## Operational Guardrails

- MUST NOT print debug logs or tokens to `stdout`; route all diagnostic messages to `stderr`.
- MUST never log or commit plaintext tokens or private keys.
- MUST validate all incoming parameters with strict Zod schemas.

## Required Skills

- **`github-flow-operator`**: Active when managing branches, commits, and pull requests.
- **`github-actions-operator`**: Active when diagnosing GitHub Actions workflow runs.
