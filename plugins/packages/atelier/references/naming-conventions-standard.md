# Enterprise Naming Conventions Standard

Authoritative reference and design manual for repositories, npm packages, plugins, MCP servers, and skills within `tupynambalucas-dev`.

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
| **Plugin Package** | `@tupynambalucas-dev/plugin-<slug>` | `@tupynambalucas-dev/plugin-atelier` |
| **Plugin Core Library** | `@tupynambalucas-dev/plugin-core-<slug>` | `@tupynambalucas-dev/plugin-core-governance` |
| **MCP Server Package** | `@tupynambalucas-dev/mcp-<slug>` | `@tupynambalucas-dev/mcp-github-org`, `@tupynambalucas-dev/mcp-github-flow` |
| **MCP Core Library** | `@tupynambalucas-dev/mcp-core-<slug>` | `@tupynambalucas-dev/mcp-core-github` |
| **Plugin Manifest** | `<slug>` (bare kebab-case) | `atelier`, `github-repo`, `github-flow` |
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
| **`atelier`** | `@tupynambalucas-dev/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect`<br>`plan-architect` | *(none)* |
| **`github-actions`** | `@tupynambalucas-dev/plugin-github-actions` | `github-actions-operator` | `github-flow` |
| **`github-flow`** | `@tupynambalucas-dev/plugin-github-flow` | `github-flow-operator` | `github-flow` |
| **`github-org`** | `@tupynambalucas-dev/plugin-github-org` | `github-org-operator`<br>`github-ruleset-operator`<br>`github-security-auditor`<br>`github-app-operator` | `github-org` |
| **`github-releases`** | `@tupynambalucas-dev/plugin-github-releases` | `github-releases-operator` | `github-flow` |
| **`github-repo`** | `@tupynambalucas-dev/plugin-github-repo` | `github-repo-architect`<br>`readme-architect`<br>`readme-auditor`<br>`monorepo-architect`<br>`community-health-architect`<br>`license-architect`<br>`github-standards-architect`<br>`mani-operator` | `github-org` |
| **`gwork`** | `@tupynambalucas-dev/plugin-gwork` | `gwork-drive-operator`<br>`gwork-sheets-architect`<br>`gwork-docs-architect` | `gwork` |
| **`profile`** | `@tupynambalucas-dev/plugin-profile` | `developer-profile-architect`<br>`developer-advancement-strategist`<br>`linkedin-profile-architect`<br>`linkedin-job-operator`<br>`linkedin-application-auditor`<br>`linkedin-outreach-operator` | `linkedin` |
| **`appsheet`** | `@tupynambalucas-dev/plugin-appsheet` | `appsheet-prompt-architect`<br>`appsheet-data-operator`<br>`appsheet-ui-architect` | `appsheet`<br>`playwright` |
| **`docusaurus`** | `@tupynambalucas-dev/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | *(none)* |
| **`secrets`** | `@tupynambalucas-dev/plugin-secrets` | `infisical-vault-operator`<br>`secret-rotation-operator` | `infisical` |
| **`web`** | `@tupynambalucas-dev/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | `playwright`<br>`firecrawl` |
| **`research`** | `@tupynambalucas-dev/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | `context7`<br>`firecrawl` |
