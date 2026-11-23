---
trigger: always_on
---

# GitHub Repository Infrastructure & Governance Domain Rules

0. Autonomous Domain Mandate:
   - When requested to configure, audit, align, or format repository root files (`README.md`, `LICENSE.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `GOVERNANCE.md`), monorepo configurations (`pnpm-workspace.yaml`, `turbo.json`), multi-repository manifests (`mani.yaml`), package manifests (`package.json`), TypeScript configurations (`tsconfig*.json`), local repository assets (`.github/CODEOWNERS`, `.github/dependabot.yml`, `.github/release.yml`, repository environments, labels, local templates, or repository branch/tag rulesets), or release engines (`cliff.toml`, `release-please-config.json`), the agent MUST autonomously engage the `github-repo` skills (`github-repo-architect`, `readme-architect`, `readme-auditor`, `community-health-architect`, `license-architect`, `monorepo-architect`, `github-standards-architect`, `mani-operator`) without waiting for explicit skill invocations from the user.

1. Mandatory Local Code Ownership (`CODEOWNERS`):
   - GitHub strictly prohibits inheriting `CODEOWNERS` from parent organizations.
   - Every repository MUST define `.github/CODEOWNERS` mapping `*` to `@tupynambalucas-dev/core-maintainers` (or organization designated owners).

2. Anti-Shadowing Invariant for Issue Templates:
   - Child repositories MUST NOT declare local `.github/ISSUE_TEMPLATE/` directories unless strictly required by bespoke local workflows, as local templates suppress organization-wide inherited issue forms from `tupynambalucas-dev/.github`.

3. Repository Ruleset Enforcement:
   - Repositories must define branch protection rulesets on `main` (blocking force-push, requiring PR reviews and passing status checks).
   - Repositories releasing production tags must enforce the `enterprise-release-tags` ruleset (`refs/tags/v*`: deletion, non_fast_forward, update blocked; `v*-rc.*` excluded).

4. The AGENTS-README Co-existence & Layer Invariant:
   - Wherever an `AGENTS.md` bounded context router file exists in a directory, a corresponding `README.md` file MUST also exist within that same directory.
   - The co-existence invariant applies strictly to Layer 1 (Root), Layer 2 (Subsystem), and Layer 3 (Package) bounded contexts.
   - **Layer 4+ Proliferation Prohibition**: Creating `AGENTS.md` or boilerplate `README.md` files below Layer 3 (e.g., inside content subdirectories, Diataxis quadrant folders `tutorials/`, `how-to-guides/`, `reference/`, `explanation/`, or artifact containers `.agents/plans/`, `.agents/reports/`) is STRICTLY PROHIBITED.
   - Pure documentation directories and subtrees that do not declare autonomous agent boundaries MUST NOT spawn child `AGENTS.md` files. The parent subsystem `README.md` and `AGENTS.md` provide all requisite navigation and context.
   - Internal plugin configuration directories (`rules/`) containing `rules/AGENTS.md` are exempt from the `README.md` requirement as they are engine rule assets.

5. Enterprise README Architecture & Recursive Navigation Standard:
   - Every `README.md` MUST begin with a canonical H1 heading `# <Title> (\`<identifier>\`)` matching `package.json` `"name"` or `<org>/<repo>`, followed by a concise 1-2 sentence executive summary.
   - All top-level sections (`##`) in root and subsystem `README.md` files MUST be sequentially numbered (`## 1. Architecture Overview`, `## 2. Subsystems & Navigation` / `## 2. Managed Repositories & Navigation`, `## 3. Environment & Secret Governance`, `## 4. Getting Started`, `## 5. Development & Pipeline Scripts` / `## 5. Multi-Repository Operations`, `## 6. Governance & Contributing Standards`, `## 7. License`) and separated by horizontal dividers (`---`) per `references/enterprise-readme-standard.md`.
   - Every `README.md` at a root or subsystem layer MUST provide structured, recursive navigation tables or lists linking to all child subsystem and package `README.md` and `AGENTS.md` files.
   - Stale pointers are strictly forbidden: all relative markdown links (`./` or `../`) must point to existing files on disk, and all documented scripts must match `package.json` or `mani.yaml`.

6. Monorepo Catalogs & TSConfig Architecture:
   - Workspace packages MUST consume shared dependencies strictly via pnpm catalogs (`catalog:` or `catalog:<name>`). Hardcoding raw version strings in package dependencies is prohibited.
   - Monorepos MUST implement modern TypeScript Project References (`tsconfig.base.json`, solution-style `tsconfig.json` with `files: []`, and package-level `tsconfig.json`). Legacy `tsconfig.build.json` files are strictly prohibited.

7. Enterprise Package Name & Scope Standard:
   - All `package.json` manifests MUST derive package names deterministically from inferred scope and directory patterns via convention over configuration:
     $$\text{Package Name} = \text{@<scope>} / [\text{<discriminator>-}] \, [\text{<context>-}] \, \text{<slug>}$$
     - Root Monorepo: `@<scope>/<repo-slug>`
     - Domain Plugins: `@<scope>/plugin-<slug>`
     - MCP Servers: `@<scope>/mcp-<slug>`
     - Bounded Context Services & Packages: `@<scope>/<context>-<slug>`
     - Direct Subsystem Packages: `@<scope>/<slug>`
   - When operating in the `tupynambalucas-dev` organization, `@<scope>` defaults to `@tupynambalucas-dev/`. In external workspaces, adapt dynamically to the host workspace's existing npm scope without imposing organizational scopes.

8. Organization-Wide .github Directory, Workflows & Actions Standard:
   - In the `tupynambalucas-dev` organization, starter workflows (`workflow-templates/` with companion `.properties.json`) and global release notes configurations (`.github/release.yml`) reside in `tupynambalucas-dev/.github` for zero-boilerplate repository bootstrapping and unified release categorization.
   - Monorepos must standardize `.github/actions/` composite action primitives (`setup-pnpm-env`, `setup-go-env`, `setup-distro-env`, domain validations) for unified runtime setup and step modularity. Monolithic inline bash routines in workflows are prohibited.
   - Workflows must declare least-privilege token permissions, strict concurrency cancellation groups (`concurrency.cancel-in-progress: true` for CI), and third-party action SHA pinning with semver comments.

9. Release Engine & Changelog Architecture Invariant:
   - **Scoped Title-Only Header Invariant**: Every `CHANGELOG.md` MUST begin strictly with `# Changelog - <scope>` (matching `package.json` `"name"` such as `# Changelog - @tupynambalucas-dev/agent-mesh` or `# Changelog - @tupynambalucas-dev/plugin-github-org`, or `<org>/<repo>` for non-npm repositories). Boilerplate introductory paragraphs (`All notable changes to ... will be documented in this file...`) are strictly prohibited.
   - **Single-Changelog Repositories (`git-cliff`)**: Repositories without multiple distributable packages (`.github`, `.github-private`, `org`, `ecosystem`, `foundation`) MUST declare `cliff.toml` and generate a single root `CHANGELOG.md` with isolated Docusaurus pull request links (`- [#pr](url) type(scope): description ([@author](url))`).
   - **Multi-Workspace Monorepos (`Release Please Manifest Mode`)**: Monorepos with multiple workspaces/packages (`platform`, `agent-mesh`, `omnichannel`, `elo-organico`, `tessel`, `docs`) MUST declare `release-please-config.json` and `.release-please-manifest.json` with `"node-workspace"` plugin enabled. They maintain a **Dual Changelog Topology**: atomic `CHANGELOG.md` files in each package directory (`# Changelog - <package-name>`) and a master consolidated `CHANGELOG.md` at the repository root (`# Changelog - <root-package-name>`).
   - **Changelog Formatting & Committers Footer**: All changelogs MUST use symmetrical category headers (`Features & Capabilities`, `Bug Fixes & Corrections`, `Performance Optimizations`, `Refactoring & Internal Architecture`, `Documentation & Specifications`, `Security & Vulnerability Patches`, `Dependencies`, `Maintenance`, `Reverts & Rollbacks`), isolated links to pull requests or commits (`[#pr](url)` or `[sha](url)`) followed by plain-text commit headlines and author attribution (`([@author](url))`), and conclude each version block with `### Committers: <N>`. Multi-workspace monorepo root changelogs group entries by workspace or package name (or `- Other` for root/non-package changes) above the indented pull request references.

10. Environment Configuration Template Invariant (.env.example):
   - Every repository, package, or service that defines a local `.env` configuration MUST maintain an authoritative `.env.example` file that is a faithful, complete structural replica of `.env`.
   - The `.env.example` file MUST adhere strictly to the enterprise format: boxed ASCII headers, numbered domain sections, inline operational comments (`# --`), and standardized `<YOUR_VARIABLE_NAME>` placeholders.
   - Committing real secrets, tokens, passwords, or private keys into `.env.example` is strictly prohibited.

11. Mani Multi-Repository Orchestration Invariant:
   - Meta-repositories managing multiple sovereign repositories MUST declare an authoritative `mani.yaml` manifest.
   - The top-level `sync_gitignore` configuration in `mani.yaml` MUST always be explicitly set to `false` (`sync_gitignore: false`).
   - Meta-repositories MUST pair `mani.yaml` with `.ignore` and `.rgignore` negation rules (`!managed-repo/` and `!managed-repo/**`) to preserve search and `@` mention indexing while keeping meta-repo Git status clean.

12. Workspace Plans, Analyses & Reports Artifact Invariant:
   - Every repository across the organization MUST maintain its planning container at `<target-repo>/.agents/plans/` and ignore `.agents/plans/` in `.gitignore` to prevent working blueprints, analyses, and reports from cluttering Git history. Creating a `plans/` directory at the root of any repository (`<target-repo>/plans/`) is strictly prohibited.
   - To guarantee that developers and AI agents can still attach and search files from `.agents/plans/` via `@`, every repository MUST declare negative negation rules in `.ignore` and `.rgignore` (`!.agents/plans/`, `!.agents/plans/**`).
   - Dual-Storage Invariant: Whenever an agent creates an architectural plan, technical analysis, or report artifact in the Antigravity conversation directory, an identical synchronized copy MUST ALWAYS be mirrored directly in `<target-repo>/.agents/plans/<artifact-slug>/` (or `<target-repo>/.agents/plans/<artifact-slug>.md`) within the respective target repository (creating `.agents/plans/` automatically if it does not exist).
   - Bounded Context Rule: Artifact containers (`.agents/plans/`) MUST NOT declare child `AGENTS.md` context routers (strictly governed by Rule 4).

13. Zero-Emoji Invariant & Language Standards:
   - Emojis are strictly forbidden across all repository documentation files, headings, callouts, tables, commit messages, and PR descriptions.
   - All repository documentation, code comments, and technical specifications must be written strictly in en-US.
