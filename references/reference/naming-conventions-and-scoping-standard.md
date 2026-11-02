# Enterprise Naming Conventions & Scoping Standard

This document defines the authoritative, mandatory naming taxonomies, directory structures, and package scoping conventions across the `tupynambalucas-dev/agent-mesh` repository.

---

## 1. Package Naming & NPM Scope Standard

All packages published from or developed within `agent-mesh` MUST use the organizational scope `@tupynambalucas-dev/`.

### 1.1 Taxonomy Table

| Domain Layer | Directory Location | Package Name Pattern | Example |
| :--- | :--- | :--- | :--- |
| **Root Monorepo** | `./` | `@tupynambalucas-dev/agent-mesh` | `@tupynambalucas-dev/agent-mesh` |
| **Domain Plugins** | `plugins/packages/<slug>` | `@tupynambalucas-dev/plugin-<slug>` | `@tupynambalucas-dev/plugin-github-flow` |
| **In-House MCPs** | `mcp/packages/<slug>` | `@tupynambalucas-dev/mcp-<slug>` | `@tupynambalucas-dev/mcp-playwright` |

---

## 2. Directory Alignment Invariants

1. **Plugin Directory Hierarchy**:
   - Plugins MUST be located within `plugins/packages/<slug>/`.
   - Never place plugin packages directly in the root of `plugins/`.
2. **MCP Directory Hierarchy**:
   - In-house MCP servers MUST be located within `mcp/packages/<slug>/`.
   - Never place MCP packages directly in the root of `mcp/`.
3. **Internal Structure of a Domain Plugin**:
   ```text
   plugins/packages/<slug>/
   ├── plugin.json         # Agent Plugins 1.0.0 manifest ($schema)
   ├── package.json        # NPM package metadata (@tupynambalucas-dev/plugin-<slug>)
   ├── README.md           # Subsystem documentation
   ├── rules/
   │   └── AGENTS.md       # Mandatory domain rules & Rule 0 Autonomous Domain Mandate
   ├── skills/
   │   └── <skill-name>/
   │       ├── SKILL.md    # Frontmatter 'name' must strictly equal <skill-name>
   │       ├── scripts/    # Optional deterministic scripts
   │       └── references/ # Optional supporting documentation
   └── references/         # Supporting domain specifications
   ```

---

## 3. Modular Skill Taxonomy & Closed Role Vocabulary

Skill directory names and frontmatter `name` values MUST match identically.

### 3.1 Closed Role Suffixes

Skill names MUST strictly adhere to the enterprise role vocabulary:
- **`-operator`**: Executes deterministic runtime commands, queries APIs, runs bash/node scripts, and triggers operations (e.g., `github-flow-operator`, `browser-operator`).
- **`-architect`**: Designs, scaffolds, refactors, and authors structural specifications, configurations, schemas, and markdown architectures (e.g., `router-architect`, `monorepo-architect`, `appsheet-prompt-architect`).
- **`-auditor`**: Analyzes existing files, linters, security alerts, and schemas to identify regressions, link errors, and compliance violations without mutating state directly (e.g., `github-security-auditor`, `docusaurus-auditor`, `browser-auditor`).

---

## 4. AGENTS-README Co-existence Invariant

- Wherever an `AGENTS.md` context router file exists in a directory, a corresponding `README.md` file MUST also exist within that same directory.
- The reverse is NOT mandatory: directories containing only `README.md` without autonomous agent boundaries do not require `AGENTS.md`.
- Plugin rules located in `rules/AGENTS.md` are exempt from this requirement as they are engine rule assets.
