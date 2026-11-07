<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-core-github shared library context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# GitHub Core MCP Library Agent Context (`@tupynambalucas-dev/mcp-core-github`)

This bounded context encapsulates the shared authentication, Octokit client factory, and Zod schema primitives consumed by the domain-scoped GitHub MCP servers (`@tupynambalucas-dev/mcp-github-org` and `@tupynambalucas-dev/mcp-github-flow`).

## Directory Layout

- [src/index.ts](./src/index.ts): Public library barrel exporting configuration, authentication resolvers, Octokit client factories, and common Zod schemas.
- [src/config.ts](./src/config.ts): Unified Zod configuration parser supporting Tier 1 (`ORG_MANAGER_APP_*`), Tier 2 (`CI_BOT_APP_*`), Tier 3 (`DEVELOPER_TOOLS_APP_*`), and legacy fallback environment variables.
- [src/auth/github-app.auth.ts](./src/auth/github-app.auth.ts): Multi-tier Octokit client factory (`getOctokitClient`) and PEM/Base64/File private key resolver (`resolvePrivateKey`).
- [src/schemas/common.schema.ts](./src/schemas/common.schema.ts): Shared repository parameter schemas (`ownerRepoSchema`) and standardized MCP response/error formatters.
- [README.md](./README.md): Package overview, exported APIs, authentication priority cascade, and build instructions.

## Architecture & Conventions

1. **Non-Executable Shared Library**:
   - Located under `mcp/core/github` to segregate passive library code from executable MCP server daemons in `mcp/servers/*`.
   - Declares `"composite": true` for TypeScript Solution Builder (`tsc -b`) project references.
2. **Identity Tier Separation**:
   - `getOctokitClient('org-manager')` prioritizes Tier 1 GitHub App installation tokens (`@octokit/auth-app`) for administrative governance.
   - `getOctokitClient('developer-tools')` prioritizes developer session tokens (`GITHUB_PERSONAL_ACCESS_TOKEN` / `GITHUB_TOKEN`) for contributor workflows.

## Operational Guardrails

- MUST NOT log or expose plaintext private keys, JWTs, or installation access tokens.
- MUST NOT declare executable server transports (`bin` or Fastify listeners) inside `mcp/core/*`.
- MUST validate all configuration inputs deterministically via Zod.
