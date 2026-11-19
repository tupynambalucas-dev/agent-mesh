---
trigger: always_on
---

# Repository Management Domain Rules

0. Autonomous Domain Mandate:
   - When requested to create, audit, align, or format repository root files (`README.md`, `LICENSE.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`), monorepo configurations (`pnpm-workspace.yaml`, `turbo.json`), multi-repository manifests (`mani.yaml`), package manifests (`package.json`), TypeScript configurations (`tsconfig*.json`), or repository `.github` directory structures (`CODEOWNERS`, `dependabot.yml`, composite actions), the agent MUST autonomously engage the `repo` skills (`readme-architect`, `readme-auditor`, `community-health-architect`, `license-architect`, `monorepo-architect`, `github-standards-architect`, `mani-operator`) without waiting for explicit skill invocations from the user.

1. The AGENTS-README Co-existence & Layer Invariant:
   - Wherever an `AGENTS.md` bounded context router file exists in a directory, a corresponding `README.md` file MUST also exist within that same directory.
   - The co-existence invariant applies strictly to Layer 1 (Root), Layer 2 (Subsystem), and Layer 3 (Package) bounded contexts.
   - **Layer 4+ Proliferation Prohibition**: Creating `AGENTS.md` or boilerplate `README.md` files below Layer 3 (e.g., inside content subdirectories, Diátaxis quadrant folders `tutorials/`, `how-to-guides/`, `reference/`, `explanation/`, or artifact containers `.agents/plans/`, `.agents/reports/`) is STRICTLY PROHIBITED.
   - Pure documentation directories and subtrees that do not declare autonomous agent boundaries MUST NOT spawn child `AGENTS.md` files. The parent subsystem `README.md` and `AGENTS.md` provide all requisite navigation and context.
   - Internal plugin configuration directories (`rules/`) containing `rules/AGENTS.md` are exempt from the `README.md` requirement as they are engine rule assets.

2. Enterprise README Architecture & Recursive Navigation Standard:
   - Every `README.md` MUST begin with a canonical H1 heading `# <Title> (\`<identifier>\`)` matching `package.json` `"name"` or `<org>/<repo>`, followed by a concise 1–2 sentence executive summary.
   - All top-level sections (`##`) in root and subsystem `README.md` files MUST be sequentially numbered (`## 1. Architecture Overview`, `## 2. Subsystems & Navigation` / `## 2. Managed Repositories & Navigation`, `## 3. Environment & Secret Governance`, `## 4. Getting Started`, `## 5. Development & Pipeline Scripts` / `## 5. Multi-Repository Operations`, `## 6. Governance & Contributing Standards`, `## 7. License`) and separated by horizontal dividers (`---`) per `references/enterprise-readme-standard.md`.
   - Every `README.md` at a root or subsystem layer MUST provide structured, recursive navigation tables or lists linking to all child subsystem and package `README.md` and `AGENTS.md` files.
   - Stale pointers are strictly forbidden: all relative markdown links (`./` or `../`) must point to existing files on disk, and all documented scripts must match `package.json` or `mani.yaml`.

3. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all repository documentation files, headings, callouts, tables, and body text.

4. Language & Formatting Standards:
   - All repository documentation must be written strictly in en-US.
   - Files must follow GitHub Flavored Markdown (GFM) standards: explicit code block language tags, standard alert syntax (`> [!NOTE]`, `> [!IMPORTANT]`), and aligned table delimiters.

5. Monorepo Catalogs & TSConfig Architecture:
   - Workspace packages MUST consume shared dependencies strictly via pnpm catalogs (`catalog:` or `catalog:<name>`). Hardcoding raw version strings in package dependencies is prohibited.
   - Monorepos MUST implement modern TypeScript Project References (`tsconfig.base.json`, solution-style `tsconfig.json` with `files: []`, and package-level `tsconfig.json`). Legacy `tsconfig.build.json` files are strictly prohibited.

6. Enterprise Package Name & Scope Standard:
   - All `package.json` manifests MUST derive package names deterministically from inferred scope and directory patterns via convention over configuration:
     $$\text{Package Name} = \text{@<scope>} / [\text{<discriminator>-}] \, [\text{<context>-}] \, \text{<slug>}$$
     - Root Monorepo: `@<scope>/<repo-slug>`
     - Domain Plugins: `@<scope>/plugin-<slug>`
     - MCP Servers: `@<scope>/mcp-<slug>`
     - Bounded Context Services & Packages: `@<scope>/<context>-<slug>`
     - Direct Subsystem Packages: `@<scope>/<slug>`
   - When operating in the `tupynambalucas-dev` organization, `@<scope>` defaults to `@tupynambalucas-dev/`. In external workspaces, adapt dynamically to the host workspace's existing npm scope without imposing organizational scopes.

7. Organization-Wide .github Directory & Workflow Taxonomy Standard:
   - In the `tupynambalucas-dev` organization, all repositories MUST declare local `.github/CODEOWNERS` mapping `*` to `@tupynambalucas-dev/core-maintainers`. Child repositories preserve native organizational inheritance from `tupynambalucas-dev/.github` without local issue template shadowing.
   - In external repositories, inspect existing CODEOWNERS, root maintainers, or repository configuration to set appropriate ownership and issue templates without hardcoding organizational team handles.
   - Monorepos must standardize `.github/actions/` composite action primitives (`setup-pnpm-env`, domain validations) for unified runtime setup and step modularity.
   - Workflows must declare least-privilege token permissions, strict concurrency cancellation groups (`concurrency.cancel-in-progress: true` for CI), and third-party action SHA pinning with semver comments.
   - Monorepo publishing must execute natively via `pnpm -r publish --access public --no-git-checks --report-summary` with Zero-Script overhead.
   - Monorepo `.npmrc` files committed to Git must declare registry and scope routing without embedding secrets or environment variables (`${NODE_AUTH_TOKEN}`).

8. Environment Configuration Template Invariant (.env.example):
   - Every repository, package, or service that defines a local `.env` configuration MUST maintain an authoritative `.env.example` file that is a faithful, complete structural replica of `.env`.
   - The `.env.example` file MUST adhere strictly to the enterprise format: boxed ASCII headers, numbered domain sections, inline operational comments (`# --`), and standardized `<YOUR_VARIABLE_NAME>` placeholders.
   - Committing real secrets, tokens, passwords, or private keys into `.env.example` is strictly prohibited.

9. Mani Multi-Repository Orchestration Invariant:
   - Meta-repositories managing multiple sovereign repositories MUST declare an authoritative `mani.yaml` manifest.
   - The top-level `sync_gitignore` configuration in `mani.yaml` MUST always be explicitly set to `false` (`sync_gitignore: false`).
   - Meta-repositories MUST pair `mani.yaml` with `.ignore` and `.rgignore` negation rules (`!managed-repo/` and `!managed-repo/**`) to preserve search and `@` mention indexing while keeping meta-repo Git status clean.

10. The Workspace Plans, Analyses & Reports Artifact Invariant:
   - Every repository across the organization MUST maintain its planning container at `<target-repo>/.agents/plans/` and ignore `.agents/plans/` in `.gitignore` to prevent working blueprints, analyses, and reports from cluttering Git history. Creating a `plans/` directory at the root of any repository (`<target-repo>/plans/`) is strictly prohibited.
   - To guarantee that developers and AI agents can still attach and search files from `.agents/plans/` via `@`, every repository MUST declare negative negation rules in `.ignore` and `.rgignore` (`!.agents/plans/`, `!.agents/plans/**`).
   - Dual-Storage Invariant: Whenever an agent creates an architectural plan, technical analysis, or report artifact in the Antigravity conversation directory, an identical synchronized copy MUST ALWAYS be mirrored directly in `<target-repo>/.agents/plans/<artifact-slug>/` (or `<target-repo>/.agents/plans/<artifact-slug>.md`) within the respective target repository (creating `.agents/plans/` automatically if it does not exist).
   - Bounded Context Rule: Artifact containers (`.agents/plans/`) MUST NOT declare child `AGENTS.md` context routers (strictly governed by Rule 1).
