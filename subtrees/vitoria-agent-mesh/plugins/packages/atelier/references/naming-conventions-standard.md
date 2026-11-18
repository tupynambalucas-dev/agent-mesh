# Enterprise Naming Conventions Standard

Authoritative reference and design manual for repositories, npm packages, plugins, MCP servers, and skills within `Vitoria-Rodrigues`.

---

## 1. Governing Principles

1. **Domain Noun Primacy**: Name by domain noun, never by role or generic container. A plugin is `repo`, not `repo-manager`.
2. **Context Deduplication**: Never repeat context that a parent hierarchy already provides (scope, repository name, marketplace, plugin name).
3. **Canonical Slugs**: One single canonical slug across directory, package suffix, manifest `name`, and MCP router identifier.
4. **Closed Skill Vocabulary**: Role suffixes on skills must strictly belong to the approved closed vocabulary.
5. **Exact Match Invariant**: Directory name === manifest `name` === skill frontmatter `name`.

---

## 2. Identifier Hierarchy

| Layer | Syntax Standard | Example |
| :--- | :--- | :--- |
| **Monorepo Root** | `<capability-noun>` | `agent-mesh` |
| **Plugin Package** | `@vitoria-rodrigues/plugin-<slug>` | `@vitoria-rodrigues/plugin-atelier` |
| **Plugin Core Library** | `@vitoria-rodrigues/plugin-core-<slug>` | `@vitoria-rodrigues/plugin-core-governance` |
| **MCP Server Package** | `@vitoria-rodrigues/mcp-<slug>` | `@vitoria-rodrigues/mcp-github-flow` |
| **MCP Core Library** | `@vitoria-rodrigues/mcp-core-<slug>` | `@vitoria-rodrigues/mcp-core-github` |
| **Plugin Manifest** | `<slug>` (bare kebab-case) | `atelier`, `repo`, `github-flow` |
| **Skill Name** | `<subject>-<role>` (closed vocabulary) | `router-architect`, `github-flow-operator` |

---

## 3. Approved Skill Role Vocabulary (Closed Set)

| Role | Operational Scope | Mutates State | Replaces Obsolete Terms |
| :--- | :--- | :--- | :--- |
| **`architect`** | Designs, models, or authors specifications and files | Yes (Disk) | `designer`, `builder`, `author`, `publisher`, `coach` |
| **`operator`** | Executes remote workflows, git commands, API mutations | Yes (Remote/Runtime) | `manager`, `enforcer`, `provisioner`, `automator` |
| **`auditor`** | Inspects, verifies, and reports without mutating | No (Read-Only) | `validator`, `inspector` |
| **`researcher`** | Retrieves and synthesizes live documentation or web data | No (Read-Only) | *(canonical)* |
| **`extractor`** | Parses and extracts structured markdown or JSON | No (Read-Only) | `scraper` |

---

## 4. Current Domain Plugins & Skills Map

| Plugin Slug | npm Package | Skills Catalog | MCP Servers |
| :--- | :--- | :--- | :--- |
| **`atelier`** | `@vitoria-rodrigues/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect` | *(none)* |
| **`repo`** | `@vitoria-rodrigues/plugin-repo` | `readme-architect`<br>`community-health-architect`<br>`license-architect` | *(none)* |
| **`github-flow`** | `@vitoria-rodrigues/plugin-github-flow` | `github-flow-operator`<br>`github-actions-operator` | `github-flow` |
| **`docusaurus`** | `@vitoria-rodrigues/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | *(none)* |
| **`web`** | `@vitoria-rodrigues/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | `playwright`<br>`firecrawl` |
| **`research`** | `@vitoria-rodrigues/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | `context7`<br>`firecrawl` |
