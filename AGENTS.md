# tupynambalucas.dev Agent Mesh Monorepo Context

This document serves as the sovereign root context router (Layer 1) for AI agents operating in the
`tupynambalucas-dev/agent-mesh` monorepo.

## Navigation

- [README.md](./README.md): Primary developer documentation, package architecture, and setup guide.
- [mcp](./mcp/AGENTS.md): In-house Model Context Protocol (MCP) packages, dual-transport servers, and protocol definitions.
- [plugins](./plugins/AGENTS.md): Antigravity and Claude Code domain plugins, modular skills, and rule sets.
- [scripts](./scripts/AGENTS.md): Smart MCP gateway router, fallback runners, package publisher, and setup automation.
- [references](./references/naming-convention-proposal.md): Enterprise naming convention proposal and architecture blueprints.

## Architecture

The `agent-mesh` repository is structured as a pnpm monorepo managed with Turborepo (`turbo.json`) and pnpm named catalogs:

- **Build Pipeline**: Turborepo coordinates build, dev, clean, and typecheck tasks with intelligent workspace caching (`turbo run build --filter="@tupynambalucas-dev/mcp-*"`).
- **Dependency Catalogs**: Pnpm catalogs (`catalog:`, `catalog:shared`, `catalog:mcp-stack`, `catalog:`) eliminate version drift across all packages.
- **Dual-Transport MCP Servers**: Packages in `mcp/packages/*` provide both Streamable HTTP (Fastify on `:8080`) and Stdio (`dist/bin.js`) transports for zero-friction local or cluster operation.
- **Domain Plugins**: Packages in `plugins/packages/*` implement bounded skills, references, and domain-specific validation rules for AI agents complying with `agent-plugins.org` v1.0.0.

## Scoped Guardrails

- MUST maintain a strict senior, objective, and technical tone across all communications, documentation, and code.
- MUST conduct all conversational chat responses in Brazilian Portuguese (pt-BR).
- MUST write all code, configuration files, commit messages, and technical documentation in English (en-US).
- MUST NOT use emojis anywhere in code, markdown headers, body text, commit messages, or chat responses (Zero-Emoji Invariant).
- MUST sign all Git commits and annotated tags with SSH: `git commit -S -m "..."`.
- MUST use Conventional Commits v1.0.0 (`<type>(<scope>): <description>`).
- MUST use relative paths for all Markdown links. Absolute filesystem paths are strictly forbidden.
- **Secret Hygiene**: Secrets are resolved via Infisical Universal Auth or local `.env` cascade. Plaintext secrets must never be logged or committed.
- **Context Routing**: When working within a sub-package or directory, agents MUST read the corresponding local `AGENTS.md` before executing modifications.

## Umbrella Meta-Repository Alignment

When mounted as a Git submodule inside the `tupynambalucas-dev/org-core` umbrella meta-repository, this repository adheres to the parent organization governance defined in `org-core`. When cloned independently as a standalone repository, this document serves as the self-sovereign root context.

## Required Skills

When authoring or modifying documents and configurations in this monorepo, agents MUST activate the relevant skill:

- **`router-architect`**: Active when authoring or reviewing any `AGENTS.md` context router file.
- **`readme-architect`, `monorepo-architect`**: Active when creating or modifying any `README.md` or markdown documentation.
- **`plugin-architect`**: Active when managing `plugin.json` manifests, pnpm workspaces, and catalogs.
- **`skill-architect`**: Active when authoring, auditing, or optimizing modular `SKILL.md` files.
- **`rule-architect`**: Active when authoring or auditing domain rules and Autonomous Domain Mandates.
- **`hook-architect`**: Active when configuring Antigravity lifecycle hooks.
