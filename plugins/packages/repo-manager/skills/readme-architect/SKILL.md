---
name: readme-architect
description: Authors and audits README.md files across monorepos and packages, enforcing recursive directory navigation, GitHub Flavored Markdown standards, and the AGENTS-README co-existence invariant.
---

# README Architect

This skill defines the authoritative architectural standard for authoring and auditing `README.md` files across all workspaces, monorepos, subsystems, and packages.

---

## 1. The Core Invariant

> [!IMPORTANT]
> **The AGENTS-README Co-existence Invariant:**
> Wherever an `AGENTS.md` bounded context router file exists in a directory, a corresponding `README.md` developer documentation file **MUST** also exist within that same directory.
>
> The reverse is **NOT** mandatory: a directory containing a `README.md` does **NOT** necessarily require an `AGENTS.md` (e.g., pure documentation directories, package sub-modules, or asset repositories without agent boundaries).
>
> Internal plugin configuration directories (`rules/`) containing `rules/AGENTS.md` are exempt from this requirement.

---

## 2. Standard Structural Outline for README.md

Every `README.md` must follow a clear, professional hierarchy:

### Layer-1 (Monorepo Root) Layout
1. **H1 (`#`)**: Monorepo name, package scope, and concise summary.
2. **Architecture Overview (`## 1. Architecture Overview`)**: Subsystem partitioning and ASCII folder tree.
3. **Subsystem Navigation Table (`## 2. Subsystems / Navigation`)**: Clickable relative links to all child subsystem `README.md` files.
4. **Getting Started / Setup (`## 3. Getting Started`)**: Prerequisites, environment variables, install commands.
5. **Development & Build Pipelines (`## 4. Pipeline Scripts`)**: Turborepo / pnpm commands (`dev`, `build`, `test`, `typecheck`).
6. **Governance Standards (`## 5. Governance Standards`)**: SSH commit signing, Conventional Commits, Zero-Emoji invariant.

### Layer-2 / Layer-3 (Subsystem & Package) Layout
1. **H1 (`#`)**: Package name (e.g. `@tupynambalucas-dev/agent-mcp-playwright`).
2. **Overview (`## Overview`)**: Concise description of capabilities and runtime requirements.
3. **Features / Tools Catalog (`## Features` or `## Tools Exposed`)**: Structured table detailing exposed tools, parameters, or exports.
4. **Configuration (`## Configuration`)**: Environment variables table (`Variable`, `Required`, `Description`).
5. **Building & Running (`## Building and Running`)**: Commands to compile and run locally.
6. **Child Navigation (`## Directory Layout` or `## Navigation`)**: Recursive relative links to child package `README.md` files if applicable.

---

## 3. Recursive Directory Navigation Rules

- **Strict Relative Linking**: All links must use relative paths (e.g., `[packages/appsheet/](./packages/appsheet/README.md)`). Absolute paths (`C:/...`, `/Users/...`) and external URLs for internal code navigation are strictly forbidden.
- **Bi-Directional Context**: Every child `README.md` should link to its parent or sibling subsystems where helpful.
- **Zero Broken Links**: Verify every linked target exists on disk before concluding any task.

---

## 4. Markdown Formatting & Typography

- **Strict Zero-Emoji Invariant**: Emojis are strictly forbidden across all headings, badges, tables, and callouts.
- **English-US Language Exclusivity**: Technical documentation must be written strictly in en-US.
- **GitHub Flavored Markdown Alerts**: Use standard alerts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`).
- **Table Alignment**: All tables must include header delimiters (`| :--- | :--- |`) and aligned vertical bars.
- **Code Fences**: Every code block must declare an explicit language identifier (````bash`, ````json`, ````typescript`, ````text`).
