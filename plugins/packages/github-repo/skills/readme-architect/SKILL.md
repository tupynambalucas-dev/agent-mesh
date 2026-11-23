---
name: readme-architect
description: Authors, scaffolds, and refactors enterprise-grade README.md files across meta-repositories (org, ecosystem), monorepos, governance repositories, subsystems, and packages, enforcing deterministic archetype templates, recursive directory navigation, GitHub Flavored Markdown standards, and the AGENTS-README co-existence invariant.
---

# Enterprise README Architect

This skill defines the authoritative architectural standard and deterministic templates for authoring and refactoring `README.md` files across all meta-repositories (`org`, `ecosystem`), monorepos, subsystems, and packages.

---

## 1. When to Use

Activate this skill when:
- Creating, scaffolding, or refactoring a root `README.md` file in any meta-repository, monorepo, service, or governance repository.
- Authoring or updating Layer-2 subsystem or Layer-3 package `README.md` files.
- Standardizing `README.md` headings, architecture diagrams, subsystem navigation tables, or pipeline script tables across `org` and `ecosystem`.
- Synchronizing `README.md` navigation tables after adding, renaming, or removing workspaces, packages, or `AGENTS.md` routers.

---

## 2. Core Architectural Invariants

> [!IMPORTANT]
> **Invariant 1 — The AGENTS-README Co-existence & 3-Layer Ceiling Invariant:**
> - Wherever an `AGENTS.md` bounded context router exists at Layer 1 (Root), Layer 2 (Subsystem), or Layer 3 (Package/Domain), a corresponding `README.md` developer documentation file **MUST** also exist in that same directory.
> - The reverse is **NOT** mandatory: pure documentation directories, package sub-modules, or asset directories may contain a `README.md` without an `AGENTS.md`.
> - **Layer 4+ Proliferation Prohibition**: Subdirectories inside documentation hubs (Diátaxis quadrants `tutorials/`, `how-to-guides/`, `reference/`, `explanation/`) or planning containers (`.agents/plans/`, `.agents/reports/`) MUST NOT declare child `AGENTS.md` or boilerplate `README.md` files.
> - Internal plugin rule folders (`rules/AGENTS.md`) are exempt from requiring a sibling `README.md`.

> [!IMPORTANT]
> **Invariant 2 — Canonical H1 Title & Executive Summary:**
> - Every `README.md` MUST begin with `# <Human-Readable Title> (\`<canonical-identifier>\`)`, where `<canonical-identifier>` matches the `"name"` in `package.json` (e.g., `@tupynambalucas-dev/platform`, `@tupynambalucas-dev/agent-mesh`) or `<org>/<repo>` when no root `package.json` exists (e.g., `tupynambalucas-dev/org`, `tupynambalucas-dev/workstation`).
> - Immediately following the H1 title, provide a concise 1–2 sentence executive summary explaining **what** the project is, **what problem** it solves, and **what core stack** powers it.

> [!IMPORTANT]
> **Invariant 3 — Deterministic Numbered H2 Section Sequence:**
> - Every root and subsystem `README.md` MUST use sequential numbered H2 headings (`## 1. ...`, `## 2. ...`) separated by horizontal rules (`---`) according to its repository archetype (see Section 3 below).

> [!IMPORTANT]
> **Invariant 4 — Manifest & Filesystem Truthfulness:**
> - Every relative link (`[label](./path)`) MUST resolve to an existing file or directory on disk. Hardcoded absolute filesystem paths (`C:/...`, `/Users/...`, `file:///...`) are strictly forbidden.
> - Every script documented in `Development & Pipeline Scripts` MUST match an actual script in `package.json`, `mani.yaml`, or `go.mod`.
> - The `License` section MUST link to the exact license file filename present on disk (`./LICENSE` vs `./LICENSE.md`).

---

## 3. Deterministic Archetype Section Layouts

Select the matching archetype for the target directory before authoring or refactoring a `README.md`:

### Archetype A: Meta-Repository / Mani Orchestrator Root (`org`, `ecosystem`)
1. `# <Meta-Repository Title> (\`<org>/<repo>\`)` + Executive Summary
2. `## 1. Architecture Overview` — Ecosystem topology explanation + Mermaid `flowchart TD` diagram.
3. `## 2. Managed Repositories & Navigation` — Table with columns: `Repository`, `Path / Namespace`, `Branch`, `Documentation`, `Agent Context`, `Purpose` + Multi-Root IDE `.code-workspace` instructions.
4. `## 3. Environment, Secret & Plugin Governance` — 3-tier secret fallback architecture (Process Env -> `.env` -> Infisical CLI) and AI Agent Mesh Dual Consumption Model.
5. `## 4. Getting Started` — Prerequisites (`git`, `mani`, `infisical`) and `git clone` + `mani sync` commands.
6. `## 5. Multi-Repository Operations` — Structured table and code block of `mani sync`, `mani run status|fetch|pull|branch`, and `mani exec` workflows.
7. `## 6. Governance & Contributing Standards` — SSH Commit Signing, Conventional Commits v1.0.0, Single-Branch GitHub Flow, Zero-Emoji Invariant, Secret Hygiene, and link to `[AGENTS.md](./AGENTS.md)`.
8. `## 7. License` — SPDX license identifier, relative link to `[Apache License 2.0](./LICENSE)`, and copyright notice.

### Archetype B: Monorepo, Product, or Service Root
1. `# <Project Title> (\`<@scope/package-or-repo>\`)` + Executive Summary + optional `> [!NOTE]` callout.
2. `## 1. Architecture Overview` — Architectural narrative + Mermaid topology diagram and/or annotated ASCII directory tree.
3. `## 2. Subsystems & Navigation` — Mandatory statement: *"Subsystems are organized into autonomous enterprise Bounded Contexts conforming to the Domain-Driven Monorepo standard. Each Bounded Context maintains explicit architectural boundaries, ubiquitous language, and dedicated AI agent routers:"* followed by a structured table linking all Layer-2 Bounded Contexts and Layer-3 Packages (`Layer`, `Bounded Context / Workspace`, `Scope / Package`, `Documentation`, `Agent Context`, `Responsibilities`).
4. `## 3. Environment & Secret Governance` — Infisical CLI injection (`infisical run`), `.env.example` template replication, and key environment variables or consumption modes.
5. `## 4. Getting Started` — Explicit runtime prerequisites (`Node.js`, `pnpm`, `Go`, `Docker`, `k3d`, `WSL2`) and step-by-step installation & local startup commands.
6. `## 5. Development & Pipeline Scripts` — Structured table or categorized command reference synchronized with root `package.json` / toolchain commands.
7. `## 6. Governance & Contributing Standards` — SSH Commit Signing (`git commit -S`), Conventional Commits v1.0.0, Single-Branch GitHub Flow on `main`, Zero-Emoji Invariant, Secret Hygiene, and link to `[AGENTS.md](./AGENTS.md)`.
8. `## 7. License` — SPDX identifier, relative link to `./LICENSE` or `./LICENSE.md`, and copyright notice.

### Archetype C: Governance & Administrative Repository Root (`.github`, `.github-private`)
1. `# <Governance Title> (\`<org>/<repo>\`)` + Executive Summary.
2. `## 1. Architecture Overview` — GitHub native administrative behavior + annotated ASCII directory tree.
3. `## 2. Subsystems & Navigation` — Structured table (`Subsystem / File`, `Agent Context`, `Documentation / Entrypoint`, `Purpose`).
4. `## 3. Core Capabilities & Governance Model` — Profile rendering, Community Health fallback inheritance, or `.github` vs `.github-private` comparison matrix.
5. `## 4. Connected Ecosystem` — Table linking organization repositories and portals.
6. `## 5. Governance & Contributing Standards` — SSH Commit Signing, Conventional Commits v1.0.0, Single-Branch GitHub Flow, Zero-Emoji Invariant, Secret Hygiene, and link to `[AGENTS.md](./AGENTS.md)`.
7. `## 6. License` — SPDX identifier, relative link to `./LICENSE`, and copyright notice.

### Archetype D: Layer-2 Subsystem & Layer-3 Package (`plugins/packages/*`, `mcp/servers/*`, `apps/*`, `packages/*`)
1. `# <Package or Subsystem Title> (\`<@scope/package-name>\`)` + Concise summary.
2. `## 1. Overview` — Architectural role and domain boundaries within the parent monorepo.
3. `## 2. Capabilities / Exports Catalog` — Structured table of skills, MCP tools, exported modules, or domain features.
4. `## 3. Directory Layout` — Annotated ASCII tree or relative file list.
5. `## 4. Configuration & Usage` — Environment variables, consumption snippets, or CLI invocation examples.
6. `## 5. Development Scripts` — Package-level `dev`, `build`, `lint`, `typecheck`, or `test` commands.
7. `## 6. Governance & Context` — Relative links to parent `README.md` and local/parent `AGENTS.md`.

---

## 4. Authoring Workflow

1. **Inspect Context**: Read the target directory's `package.json` (or `mani.yaml` / `go.mod`), `AGENTS.md`, and existing `README.md`, and list actual child directories and license filenames (`LICENSE` vs `LICENSE.md`).
2. **Select Archetype**: Map the target to Archetype A, B, C, or D using [enterprise-readme-standard.md](../../references/enterprise-readme-standard.md).
3. **Draft / Refactor Content**: Populate all required numbered H2 sections with accurate, copy-paste-ready commands and verified relative links.
4. **Audit Before Saving**: Run the 7-gate verification defined in [`readme-auditor`](../readme-auditor/SKILL.md) to confirm zero emojis, zero broken links, and exact manifest alignment.

---

## 5. Reference Links

- [Enterprise README.md Architecture & Template Standard](../../references/enterprise-readme-standard.md)
- [Enterprise README Auditor Skill](../readme-auditor/SKILL.md)
- [Repository Management Domain Rules](../../rules/AGENTS.md)
