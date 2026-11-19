---
name: monorepo-architect
description: Designs and maintains enterprise monorepo workspace configurations, pnpm catalogs, package manifest naming taxonomies (@<scope>/*), Turborepo pipelines, Bounded Context boundaries, and hierarchical project-referenced TypeScript architectures (tsconfig.base.json, tsconfig.json, tsconfig.node.json, tsconfig.app.json).
---

# Monorepo Architect

This skill defines the authoritative, generic architecture for monorepo workspace orchestration, dynamic package scope discovery, universal naming formulas, Bounded Context boundary enforcement, centralized dependency catalogs via pnpm, Turborepo task pipelines, and modern TypeScript Project References (`composite: true`, solution-style `tsconfig.json`).

---

## 1. When to Use

Activate this skill when:
- Designing, scaffolding, or auditing monorepo structures (`pnpm-workspace.yaml`, `turbo.json`, root `package.json`).
- Authoring or auditing the `name` field in `package.json` manifests across any repository (current, newly initialized, or third-party).
- Structuring directories into autonomous Layer-2 Bounded Contexts and Layer-3 Packages.
- Auditing dependencies across workspace packages to enforce centralized pnpm catalogs (`catalog:`).
- Eliminating legacy `tsconfig.build.json` files and establishing modern referenced TypeScript configurations.
- Authoring root solution files (`tsconfig.json` with `files: []` and `references: [...]`).
- Authoring base compiler options (`tsconfig.base.json`).
- Configuring dual-target web applications (`tsconfig.app.json` + `tsconfig.node.json`).

---

## 2. Dynamic Discovery Heuristics

The agent MUST discover workspace properties dynamically rather than relying on hardcoded repository whitelists:

### Heuristic 1: Dynamic Scope Inference
The agent resolves the package scope `@<scope>` through a 4-tier fallback:
1. **Root `package.json`**: Inspect `"name"`. If matches `@([a-z0-9-_]+)/.*`, extract `@$1`.
2. **`.npmrc` Configuration**: Parse `.npmrc` for scoped registry mappings (e.g., `@my-org:registry=...`).
3. **Git Remote Origin URL**: Execute `git remote get-url origin`. Parse `github.com[:/]([^/]+)/.*` and normalize the organization handle into `@<owner>`.
4. **Third-Party / Unscoped Fallback**: If no scope is declared and the repository does not use scoped packages, respect the host workspace's conventions without imposing foreign scopes.

### Heuristic 2: Monorepo Orchestrator Discovery
- Check for `pnpm-workspace.yaml` (pnpm Workspaces).
- Check for `package.json` with a `"workspaces"` field (npm/yarn/bun Workspaces).
- Check for `lerna.json`, `turbo.json`, or `nx.json`.
- Extract declared workspace glob patterns (e.g., `packages/*`, `services/*`, `apps/*`, `plugins/packages/*`, `tools/*`).

---

## 3. Core Monorepo Invariants

### Invariant 1: Universal Convention-over-Configuration Naming Formula
Every package created or audited derives its package name deterministically from its directory pattern and inferred scope, with zero repository hardcoding:

$$\text{Package Name} = \text{@<scope>} \,/\, \text{[<discriminator>-]} \, \text{[<context>-]} \, \text{<slug>}$$

| Package Category | Directory Pattern | Formula | Deterministic Examples |
| :--- | :--- | :--- | :--- |
| **Root Monorepo** | `/` | `@<scope>/<repo-slug>` | `@tupynambalucas-dev/platform`<br />`@tupynambalucas-dev/agent-mesh`<br />`@tupynambalucas-dev/workstation`<br />`@acme/core-system` |
| **Domain Plugin** | `**/plugins/packages/<slug>` | `@<scope>/plugin-<slug>` | `@tupynambalucas-dev/plugin-repo`<br />`@tupynambalucas-dev/plugin-atelier`<br />`@acme/plugin-billing` |
| **MCP Server** | `**/mcp/servers/<slug>` | `@<scope>/mcp-<slug>` | `@tupynambalucas-dev/mcp-playwright`<br />`@tupynambalucas-dev/mcp-github-flow`<br />`@acme/mcp-database` |
| **Bounded Context Service** | `<context>/services/<slug>` | `@<scope>/<context>-<slug>` | `@tupynambalucas-dev/corporate-api`<br />`@tupynambalucas-dev/cortex-memory-api`<br />`@acme/auth-service` |
| **Bounded Context Library** | `<context>/packages/<slug>` | `@<scope>/<context>-<slug>` | `@tupynambalucas-dev/corporate-core`<br />`@tupynambalucas-dev/cortex-memory-core`<br />`@acme/auth-client` |
| **Bounded Context Package** | `<context>/<slug>` | `@<scope>/<context>-<slug>` | `@tupynambalucas-dev/workstation-distributions`<br />`@tupynambalucas-dev/workstation-gh-tl`<br />`@acme/shipping-calculator` |
| **Direct Subsystem Package** | `<slug>/` (single package context) | `@<scope>/<slug>` | `@tupynambalucas-dev/k8s`<br />`@tupynambalucas-dev/renderer`<br />`@acme/gateway` |

> [!IMPORTANT]
> The discriminator prefixes are strictly `plugin-` and `mcp-`. Never prepend `agent-` or `agent-plugin-` or `agent-mcp-`. The `@<scope>/` and directory boundary already establish the artifact context.

---

### Invariant 2: The 3-Layer Bounded Context Topology
Every enterprise monorepo implements a strict 3-Layer topology:
- **Layer 1 (Monorepo Root)**: Orchestrates the workspace graph (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `tsconfig.json`, `AGENTS.md`, `README.md`). Never contains domain business code or standalone binaries.
- **Layer 2 (Bounded Context Subsystem)**: Top-level domain directory representing an autonomous business or infrastructure capability (`/<context>/`). Contains its own ubiquitous language, domain rules, `AGENTS.md`, and `README.md`. Sibling Bounded Contexts must not have tight circular runtime dependencies.
- **Layer 3 (Sovereign Package or Service)**: Leaf package matching workspace globs (`/<context>/<pkg>/` or `/<context>/<group>/<pkg>/`). Declares its own `package.json`, `tsconfig.json`, `AGENTS.md`, `README.md`, and `src/`. Polyglot toolchains (`go.mod`, `Cargo.toml`) live here.
- **Layer 4+ Proliferation Prohibition**: Creating child `AGENTS.md` or boilerplate `README.md` files below Layer 3 (e.g., inside `src/`, `tests/`, `skills/`, or Diataxis quadrants `tutorials/`, `reference/`) is strictly prohibited.

---

### Invariant 3: Zero Raw Dependency Versions (pnpm Catalogs)
All shared dependencies in workspace `package.json` files MUST reference pnpm catalogs rather than explicit semantic version numbers:

```json
{
  "dependencies": {
    "fastify": "catalog:mcp-stack",
    "zod": "catalog:shared"
  },
  "devDependencies": {
    "@types/node": "catalog:",
    "typescript": "catalog:"
  }
}
```

- **Default Catalog (`catalog:`)**: Reserved for universal dev tooling (`typescript`, `@types/node`, `tsx`, `turbo`, `rimraf`).
- **Domain Catalogs (`catalog:<name>`)**: Scoped to specific operational stacks (`catalog:mcp-stack`, `catalog:web-stack`, `catalog:api-stack`, `catalog:shared`).
- **Zero Redundancy**: A package dependency MUST NOT be duplicated across multiple catalogs.

---

### Invariant 4: Turborepo Task Pipeline Standards (`turbo.json`)
Turborepo orchestrates cross-package dependency execution, ensuring cached builds, deterministic topological sorting, and build boundaries across Bounded Contexts:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "bin/**"]
    },
    "lint": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

---

### Invariant 5: Solution-Style TypeScript Project References
The legacy pattern of using separate `tsconfig.build.json` files is strictly prohibited. Modern enterprise monorepos use native TypeScript Solution Builder (`tsc -b`):

1. **Root `tsconfig.base.json`**:
   - Shared compiler options (`target: "ES2022"`, `module: "NodeNext"`, `moduleResolution: "NodeNext"`, `strict: true`, `declaration: true`, `declarationMap: true`, `sourceMap: true`, `composite: true`).
2. **Root `tsconfig.json` (Solution Coordinator)**:
   - Declares `"files": []` and top-level `"references"` pointing to every package or subsystem in the monorepo graph.
3. **Backend / Node Services & Libraries**:
   - `tsconfig.json` extends `tsconfig.base.json` and sets `"composite": true`, `"rootDir": "./src"`, `"outDir": "./dist"`.
   - Packages depending on other workspace packages declare `{ "path": "<relative-path>" }` in `"references"`.
4. **Frontend / Web Applications**:
   - `tsconfig.json`: Solution coordinator referencing `./tsconfig.app.json` and `./tsconfig.node.json`.
   - `tsconfig.app.json`: Client application source (`jsx`, `include: ["src"]`, `"noEmit": true`, references to core libraries).
   - `tsconfig.node.json`: Bundler and tool configuration (`vite.config.ts`, `"composite": true`).

---

### Invariant 6: Clean Root & Polyglot Encapsulation
The monorepo root must remain hermetic and uncluttered:
- Never place runtime scripts (`.sh`, `.ps1`, `.bat`, `.py`) in the root.
- Never place polyglot manifests (`go.mod`, `go.sum`, `Cargo.toml`, `requirements.txt`) in the root. Polyglot binaries encapsulate their build toolchains inside their respective Layer-3 package directories.

---

## 4. Reference Architectures

### Root Solution File (`tsconfig.json`)
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/shared" },
    { "path": "./services/api" }
  ]
}
```

### Shared Base Options (`tsconfig.base.json`)
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "incremental": true
  }
}
```

### Package Config (`packages/<target>/tsconfig.json`)
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"],
  "references": [
    { "path": "../core" }
  ]
}
```

---

## 5. Operational Commands

- Build entire graph via TypeScript solution builder: `tsc -b`
- Clean all build outputs and build info: `tsc -b --clean`
- Typecheck solution: `tsc -b --noEmit`
- Rebuild via Turborepo: `turbo run build`
