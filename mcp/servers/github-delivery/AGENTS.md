<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-github-delivery package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# GitHub Delivery MCP Server Agent Context (`@tupynambalucas-dev/mcp-github-delivery`)

This bounded context encapsulates the domain-scoped Model Context Protocol server providing developer Git workflow inspection, branch status, Pull Request querying, quality gates evaluation, GitHub Actions workflow diagnostics, and release auditing.

## Directory Layout

- [scripts/launcher.cjs](./scripts/launcher.cjs): Sovereign MCP launcher (`bin: mcp-github-delivery`) loading `.env` in cascade and executing `dist/bin.cjs` or routing to the Cortex Gateway.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio server configuration targeting `./scripts/launcher.cjs`.
- [tsup.config.ts](./tsup.config.ts): Declarative `tsup` configuration bundling all dependencies (`noExternal`) into `dist/bin.cjs` and `dist/index.cjs`.
- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint listening on `:8080`.
- [src/tools/index.ts](./src/tools/index.ts): Tool registration and request dispatcher.
- [src/tools/repos.tool.ts](./src/tools/repos.tool.ts): `get_repo_info`, `list_branches` - Repository and branch inspection tools.
- [src/tools/pulls.tool.ts](./src/tools/pulls.tool.ts): `list_pull_requests`, `get_pull_request` - Pull Request inspection tools.
- [src/tools/actions.tool.ts](./src/tools/actions.tool.ts): `list_workflow_runs`, `get_workflow_run` - GitHub Actions CI/CD diagnostic tools.
- [src/tools/gates.tool.ts](./src/tools/gates.tool.ts): `evaluate_pull_request_gates` - Pull Request quality gates and checks evaluation.
- [src/tools/releases.tool.ts](./src/tools/releases.tool.ts): `list_releases` - GitHub Releases inspection tools.
- [README.md](./README.md): Developer architecture, credentials, and tool reference.

## Architecture & Conventions

1. **Inlined Core Dependency**: Consumes [`@tupynambalucas-dev/mcp-core-github`](../../core/github/README.md) (`getOctokitClient('developer-tools' | 'guardian' | 'automation')`) for Tier 2/3 authentication and bundles it directly into `dist/bin.cjs` and `dist/index.cjs`.
2. **Self-Contained Dual Transport**: Supports Fastify Streamable HTTP (`dist/index.cjs`) for cluster deployments and Stdio CLI (`dist/bin.cjs`) for workstation pairing with zero external runtime dependencies.

## Operational Guardrails

- MUST NOT print debug logs or tokens to `stdout`; route all diagnostic messages to `stderr`.
- MUST never log or commit plaintext tokens or private keys.
- MUST validate all incoming parameters with strict Zod schemas.

## Required Skills

- **`github-flow-operator`**: Active when managing branches, commits, and pull requests.
- **`github-actions-operator`**: Active when diagnosing GitHub Actions workflow runs.
- **`github-releases-operator`**: Active when inspecting releases, release notes, and assets.
