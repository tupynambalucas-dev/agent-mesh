# tupynambalucas.dev Agents Context

This document serves as the root context router for AI agents operating in the
tupynambalucas.dev monorepo.

## Navigation

- [README.md](./README.md): Serves as the dynamic GitHub Profile view (updated by the `@profile/renderer` workspace) and contains the official developer entry point and technical architecture within a toggleable details block.
- [.agents](./.agents/AGENTS.md): Authoritative domain for agentic AI configurations, skills, plugins, and repository manipulation scripts.
- [renderer](./renderer/AGENTS.md): Dynamic asset generator and document compilation engine producing GitHub profile SVG cards and templated Markdown.
- [assets](./assets/README.md): Design tokens, brand icons, and visual assets for profile cards and documentation.

## Architecture

The repository is a lightweight pnpm monorepo with automated document compilation and dynamic GitHub profile stats generation:

- `renderer`: Document generator compiling profile statistics, licenses, and conduct files from SVG templates and GitHub GraphQL API metrics.
- `assets`: Design tokens, logos, and vector cards consumed by the renderer pipeline.
- `scripts`: Root automation and Git hook scripts executed via Husky.

## Scoped Guardrails

- MUST maintain a strict senior, objective, and technical tone in all communications, logs, and documentation.
- MUST avoid preambles, introductory chatter, conversational filler, or conclusion summaries in all responses.
- MUST keep sentences concise, clear, and direct.
- MUST conduct all conversational chat responses in Brazilian Portuguese (pt-BR).
- MUST write all code, configuration, technical documentation, commit messages, and Markdown files in English (en-US).
- MUST NOT use emojis in any conversational response, chat message, technical document, README, or skill file.
- MUST NOT use placeholders (e.g., TODO, TBD).
- MUST use relative paths for all Markdown links. Absolute filesystem paths are strictly
  forbidden.
- MUST format all files according to Prettier standards (2-space indent, max 100-character
  line width).
- MUST hardcode the project name and domain in all `AGENTS.md` and `README.md` files (e.g., `Tupynambalucas`, `tupynambalucas.dev`).
- MUST NOT use template placeholder tokens like `%PROJECT_DOMAIN%` or `%PROJECT_NAME%` outside of templated assets.
- **Routing**: When working within a specific bounded context, agents MUST read the local `AGENTS.md` file within that directory before proceeding.

## Required Skills

When performing documentation tasks in this monorepo, agents MUST activate the appropriate skill
by name before beginning:

- **`agent-router-expert`**: MUST be active when creating, updating, or reviewing any `AGENTS.md`
  file anywhere in the monorepo. This skill defines the 3-layer context hierarchy standard,
  `<context-hierarchy>` directive syntax, line budgets, and validation workflow.
- **`markdown-expert`**: MUST be active when creating, updating, or reviewing any `README.md`,
  `.md` skill file, or general Markdown document outside the `knowledge-base/` workspace.

These skills are referenced by name only and are resolved by the active agent runtime. Do not
reference skill files by filesystem path, as agents running in isolated container environments
resolve skills exclusively by their registered name.
