---
trigger: always_on
---

# Repository Management Domain Rules

0. Autonomous Domain Mandate:
   - When requested to create, audit, align, or format repository root files (`README.md`, `LICENSE.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`), monorepo configurations (`pnpm-workspace.yaml`, `turbo.json`), package manifests (`package.json`), or TypeScript configurations (`tsconfig*.json`), the agent MUST autonomously engage the `repo` skills (`readme-architect`, `community-health-architect`, `license-architect`, `monorepo-architect`) without waiting for explicit skill invocations from the user.

1. The AGENTS-README Co-existence Invariant:
   - Wherever an `AGENTS.md` bounded context router file exists in a directory, a corresponding `README.md` file MUST also exist within that same directory.
   - The reverse is NOT mandatory: a directory containing a `README.md` does NOT necessarily require an `AGENTS.md` (e.g., pure documentation folders, asset folders, or subtrees that do not declare autonomous agent boundaries).
   - Internal plugin configuration directories (`rules/`) containing `rules/AGENTS.md` are exempt from this requirement as they are engine rule assets.

2. Recursive Navigation Standard:
   - Every `README.md` at a root or subsystem layer MUST provide structured, recursive navigation tables or lists linking to all child subsystem and package `README.md` files.
   - Stale pointers are strictly forbidden: all relative markdown links must point to existing files on disk.

3. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all repository documentation files, headings, callouts, tables, and body text.

4. Language & Formatting Standards:
   - All repository documentation must be written strictly in en-US.
   - Files must follow GitHub Flavored Markdown (GFM) standards: explicit code block language tags, standard alert syntax (`> [!NOTE]`, `> [!IMPORTANT]`), and aligned table delimiters.

5. Monorepo Catalogs & TSConfig Architecture:
   - Workspace packages MUST consume shared dependencies strictly via pnpm catalogs (`catalog:` or `catalog:<name>`). Hardcoding raw version strings in package dependencies is prohibited.
   - Monorepos MUST implement modern TypeScript Project References (`tsconfig.base.json`, solution-style `tsconfig.json` with `files: []`, and package-level `tsconfig.json`). Legacy `tsconfig.build.json` files are strictly prohibited.

6. Enterprise Package Name & Scope Invariant:
   - All `package.json` manifests across repositories in the organization MUST use the `@tupynambalucas-dev/` npm scope.
   - Package names MUST adhere strictly to the deterministic domain taxonomy:
     - `agent-mesh` plugins: `@tupynambalucas-dev/plugin-<slug>`
     - `agent-mesh` MCP servers: `@tupynambalucas-dev/mcp-<slug>`
     - `platform` packages/services: `@tupynambalucas-dev/<domain>-<subsystem>` (e.g., `corporate-api`, `corporate-web`, `corporate-core`, `cortex-memory-api`, `studio-assets`, `tools-github`, `shared-config`, `k8s`, `renderer`).
     - Standalone repositories: `@tupynambalucas-dev/<repo>-<service>` and `@tupynambalucas-dev/plugin-<slug>`.
