# tupynambalucas.dev Agent Mesh Monorepo Context

This document serves as the sovereign root context router (Layer 1) for AI agents operating in the
`tupynambalucas-dev/agent-mesh` monorepo.

## Navigation

- [README.md](./README.md): Primary developer documentation, umbrella package distribution, and setup guide.
- [mcp](./mcp/AGENTS.md): In-house Model Context Protocol (MCP) packages, self-contained dual-transport servers, and core libraries.
- [plugins](./plugins/AGENTS.md): Antigravity and Claude Code domain plugins, modular skills, rules, and sovereign launchers.
- [presets](./presets/all.json): Declarative domain plugin preset profiles (`all`, `backend-api`, `frontend-web`, `docs-portal`).
- [scripts](./scripts/AGENTS.md): Root umbrella package release publisher (`publish-root.cjs`) and two-tier launcher architecture documentation.
- [references](./references/AGENTS.md): Sovereign documentation hub organized according to the Diátaxis framework (tutorials, how-to guides, reference, explanation).
- [.agents](./.agents/AGENTS.md): AI agent planning hub, deep analyses, architectural master plans, and verification reports.
- [.claude-plugin/marketplace.json](./.claude-plugin/marketplace.json): Anthropic Claude Code plugin marketplace registry.
- [.github/workflows/publish.yml](./.github/workflows/publish.yml): Automated CI/CD validation, dynamic package reconciliation, and release pipeline.

## Architecture

The `agent-mesh` repository is structured as a pnpm monorepo managed with Turborepo (`turbo.json`) and pnpm named catalogs:

- **Umbrella Distribution Package (`@tupynambalucas-dev/agent-mesh`)**: The root `package.json` (`v1.2.0`) bundles `plugins/packages/`, `mcp/`, `presets/`, `scripts/`, and `.claude-plugin/` into a single public package consumable via Git (`github:tupynambalucas-dev/agent-mesh` — zero token required) or GitHub Packages (`https://npm.pkg.github.com` — requires `NODE_AUTH_TOKEN` with `read:packages`).
- **Build Pipeline**: Turborepo coordinates `build`, `dev`, `clean`, and `typecheck` tasks with workspace caching (`turbo run build --filter="@tupynambalucas-dev/mcp-*"`).
- **Dependency Catalogs**: Pnpm catalogs (`catalog:`, `catalog:shared`, `catalog:mcp-stack`) eliminate version drift across all workspace packages.
- **Self-Contained Dual-Transport MCP Servers**: Packages in `mcp/servers/*` compile via `tsup` (`noExternal`) into standalone CommonJS executables for both Stdio (`dist/bin.cjs`) and Streamable HTTP (`dist/index.cjs` on Fastify `:8080`). All runtime dependencies (`@modelcontextprotocol/sdk`, `@octokit/*`, `fastify`, `zod`, `dotenv`) are inlined, and `mcp/servers/*/dist/` is tracked in Git (`!mcp/servers/*/dist/`) so external consumers require zero MCP dependencies or build steps.
- **Shared MCP Core Libraries**: Packages in `mcp/core/*` (such as `@tupynambalucas-dev/mcp-core-github`) encapsulate non-executable shared authentication engines, client factories, and Zod schemas compiled via `tsc` (`dist/index.js`) and bundled into downstream MCP servers at build time.
- **Domain Plugins & Two-Tier Sovereign Launchers**: Packages in `plugins/packages/*` implement bounded skills, references, and domain rules complying with `agent-plugins.org` v1.0.0. Each MCP-enabled plugin ships `scripts/launcher.cjs`, which resolves its corresponding MCP server launcher across three layers (1. standalone package `@tupynambalucas-dev/mcp-<name>`, 2. umbrella package `mcp/servers/<name>/scripts/launcher.cjs`, 3. monorepo sibling) or routes to the Kubernetes Cortex Gateway when `MESH_PROFILE=cluster`.
- **Sovereign Playwright Engine with Resilient Fallback**: `mcp/servers/playwright/scripts/launcher.cjs` executes the bundled `dist/bin.cjs` when `playwright` driver packages are resolvable in the local workspace, and transparently falls back to `npx -y @playwright/mcp@0.0.84` (preserving `headless`, `extension`, `channel`, and `cdp` mode flags) when consumed in lightweight repositories without local Playwright installations.

## Scoped Guardrails

- MUST maintain a strict senior, objective, and technical tone across all communications, documentation, and code.
- MUST conduct all conversational chat responses in Brazilian Portuguese (pt-BR).
- MUST write all code, configuration files, commit messages, and technical documentation in English (en-US).
- MUST NOT use emojis anywhere in code, markdown headers, body text, commit messages, or chat responses (Zero-Emoji Invariant).
- MUST sign all Git commits and annotated tags with SSH: `git commit -S -m "..."`.
- MUST use Conventional Commits v1.0.0 (`<type>(<scope>): <description>`).
- MUST use relative paths for all Markdown links inside repository files. Absolute `file:///` filesystem paths are strictly forbidden in repository documentation.
- **Committed MCP Bundle Invariant**: Whenever source files under `mcp/servers/*/src` or `mcp/core/*/src` are modified, agents MUST run `pnpm mcp:build` and commit the updated `mcp/servers/*/dist/*.cjs` bundles so Git package consumers remain synchronized.
- **Secret Hygiene**: Secrets are resolved via Infisical Universal Auth or local `.env` cascade. Plaintext secrets must never be logged or committed.
- **Context Routing**: When working within a sub-package or directory, agents MUST read the corresponding local `AGENTS.md` before executing modifications.

## Umbrella Meta-Repository Alignment

When opened as part of the `tupynambalucas-dev/org-core` multi-root workspace orchestrated via Mani, this repository operates as an autonomous sovereign repository while adhering to the cross-repository context defined in `org-core/AGENTS.md`.

## Architectural Plans & Artifact Dual-Storage Standard

Architectural blueprints, technical analyses, and master plans follow strict enterprise storage standards:
- **Storage Location**: Blueprints, analyses, and reports reside in `plans/<artifact-slug>/` (or `plans/<artifact-slug>.md`), with `.agents/plans/<artifact-slug>/` fully recognized for backward compatibility.
- **Topologies**: Topology 1 (Single-File Artifact) for atomic refactors, analyses, and reports; Topology 2 (Multi-Artifact Suite) for multi-domain frameworks with master `README.md` and numbered domain documents.
- **Dual-Storage Invariant**: Whenever an agent creates an architectural plan, analysis, or report artifact in the Antigravity conversation directory (`<appDataDir>/brain/<conversation-id>/`), an identical synchronized copy MUST ALWAYS be mirrored in `plans/<artifact-slug>/` (or `plans/<artifact-slug>.md`).
- **Ignore & Index Triad**: All repositories ignore `plans/` and `.agents/plans/` in `.gitignore`, while explicitly un-ignoring them in `.ignore` and `.rgignore` (`!plans/`, `!plans/**`, `!.agents/plans/`, `!.agents/plans/**`) and setting `"search.useIgnoreFiles": false` in `.vscode/settings.json` so files can always be attached with `@`.

## Required Skills

When authoring or modifying documents and configurations in this monorepo, agents MUST activate the relevant skill:

- **`plan-architect`**: Active when designing, structuring, authoring, or auditing architectural plans, technical analyses, and governance reports following the dual-storage standard.
- **`router-architect`**: Active when authoring or reviewing any `AGENTS.md` context router file.
- **`readme-architect`, `monorepo-architect`, `github-standards-architect`**: Active when creating or modifying any `README.md`, workspace configuration, or `.github` asset.
- **`mani-operator`**: Active when auditing or maintaining multi-repo manifests and synchronization rules.
- **`plugin-architect`**: Active when managing `plugin.json` manifests, pnpm workspaces, and catalogs.
- **`skill-architect`**: Active when authoring, auditing, or optimizing modular `SKILL.md` files.
- **`rule-architect`**: Active when authoring or auditing domain rules and Autonomous Domain Mandates.
- **`hook-architect`**: Active when configuring Antigravity lifecycle hooks.
