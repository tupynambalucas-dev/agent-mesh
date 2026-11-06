---
trigger: always_on
---

# Repository Management Domain Rules

0. Autonomous Domain Mandate:
   - When requested to create, audit, align, or format repository root files (`README.md`, `LICENSE.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`), monorepo configurations (`pnpm-workspace.yaml`, `turbo.json`), package manifests (`package.json`), TypeScript configurations (`tsconfig*.json`), or repository `.github` directory structures (`CODEOWNERS`, `dependabot.yml`, composite actions), the agent MUST autonomously engage the `repo` skills (`readme-architect`, `community-health-architect`, `license-architect`, `monorepo-architect`, `github-standards-architect`) without waiting for explicit skill invocations from the user.

1. The AGENTS-README Co-existence & Layer Invariant:
   - Wherever an `AGENTS.md` bounded context router file exists in a directory, a corresponding `README.md` file MUST also exist within that same directory.
   - The co-existence invariant applies strictly to Layer 1 (Root), Layer 2 (Subsystem), and Layer 3 (Package) bounded contexts.
   - **Layer 4+ Proliferation Prohibition**: Creating `AGENTS.md` or boilerplate `README.md` files below Layer 3 (e.g., inside content subdirectories, Diátaxis quadrant folders `tutorials/`, `how-to-guides/`, `reference/`, `explanation/`, or artifact containers `.agents/plans/`, `.agents/reports/`) is STRICTLY PROHIBITED.
   - Pure documentation directories and subtrees that do not declare autonomous agent boundaries MUST NOT spawn child `AGENTS.md` files. The parent subsystem `README.md` and `AGENTS.md` provide all requisite navigation and context.
   - Internal plugin configuration directories (`rules/`) containing `rules/AGENTS.md` are exempt from the `README.md` requirement as they are engine rule assets.

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

7. Organization-Wide .github Directory & Workflow Taxonomy Invariant:
   - All repositories across the organization MUST declare local `.github/CODEOWNERS` mapping `*` to `@tupynambalucas-dev/core-maintainers`.
   - Child repositories MUST NOT define local `.github/ISSUE_TEMPLATE/` directories unless strictly required, preserving native organizational inheritance from `tupynambalucas-dev/.github` without shadowing.
   - Monorepos must standardize `.github/actions/` composite action primitives (`setup-pnpm-env`, domain validations) for unified runtime setup and step modularity.
   - Workflows must declare least-privilege token permissions, strict concurrency cancellation groups (`concurrency.cancel-in-progress: true` for CI), and third-party action SHA pinning with semver comments.
   - Monorepo publishing must execute natively via `pnpm -r publish --access public --no-git-checks --report-summary` with Zero-Script overhead.
   - Monorepo `.npmrc` files committed to Git must declare registry and scope routing without embedding secrets or environment variables (`${NODE_AUTH_TOKEN}`).

8. Environment Configuration Template Invariant (.env.example):
   - Every repository, package, or service that defines a local `.env` configuration MUST maintain an authoritative `.env.example` file that is a faithful, complete structural replica of `.env`.
   - The `.env.example` file MUST adhere strictly to the enterprise format exemplified by `platform/k8s/.env.example`: boxed ASCII headers, numbered domain sections, inline operational comments (`# --`), and standardized `<YOUR_VARIABLE_NAME>` placeholders.
   - Committing real secrets, tokens, passwords, or private keys into `.env.example` is strictly prohibited.
