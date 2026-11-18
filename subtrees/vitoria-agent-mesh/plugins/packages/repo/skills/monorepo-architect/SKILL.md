---
name: monorepo-architect
description: Designs and maintains enterprise monorepo workspace configurations, pnpm catalogs, package manifest naming taxonomies (@vitoria-rodrigues/*), Turborepo pipelines, and hierarchical project-referenced TypeScript architectures (tsconfig.base.json, tsconfig.json, tsconfig.node.json, tsconfig.app.json).
---

# Monorepo Architect

This skill defines the authoritative architecture for monorepo workspace orchestration, centralized dependency catalogs via pnpm, package manifest (`package.json`) naming and scoping taxonomies, and modern TypeScript Project References (`composite: true`, solution-style `tsconfig.json`).

---

## 1. When to Use

Activate this skill when:
- Designing, scaffolding, or auditing monorepo structures (`pnpm-workspace.yaml`, `turbo.json`, root `package.json`).
- Authoring or auditing the `name` field in `package.json` manifests across monorepos (`platform`, `agent-mesh`, or standalone projects).
- Auditing dependencies across workspace packages to enforce centralized pnpm catalogs (`catalog:`).
- Eliminating legacy `tsconfig.build.json` files and establishing modern referenced TypeScript configurations.
- Authoring root solution files (`tsconfig.json` with `files: []` and `references: [...]`).
- Authoring base compiler options (`tsconfig.base.json`).
- Configuring dual-target web applications (`tsconfig.app.json` + `tsconfig.node.json`).

---

## 2. Core Monorepo Invariants

### Invariant 1: Enterprise Scoped Package Naming Taxonomy
Every `package.json` created or audited within the enterprise organization MUST belong to the `@vitoria-rodrigues/` npm scope. Unscoped package names (e.g., `web`, `api`, `mcp-server`) are strictly forbidden.

Package names must be derived deterministically according to the monorepo boundary and domain layer:

#### 1. `agent-mesh` Workspace Taxonomy
| Workspace Layer | Directory Pattern | Package Name Formula | Canonical Examples |
| :--- | :--- | :--- | :--- |
| **Root Monorepo** | `/` | `@vitoria-rodrigues/agent-mesh` | `@vitoria-rodrigues/agent-mesh` |
| **Agent Plugins** | `plugins/packages/<domain>` | `@vitoria-rodrigues/plugin-<domain>` | `@vitoria-rodrigues/plugin-atelier`<br />`@vitoria-rodrigues/plugin-docusaurus`<br />`@vitoria-rodrigues/plugin-github-flow`<br />`@vitoria-rodrigues/plugin-repo`<br />`@vitoria-rodrigues/plugin-research`<br />`@vitoria-rodrigues/plugin-web` |
| **Plugin Core Libraries** | `plugins/core/<domain>` | `@vitoria-rodrigues/plugin-core-<domain>` | `@vitoria-rodrigues/plugin-core-governance` |
| **MCP Servers** | `mcp/servers/<service>` | `@vitoria-rodrigues/mcp-<service>` | `@vitoria-rodrigues/mcp-firecrawl`<br />`@vitoria-rodrigues/mcp-github-flow`<br />`@vitoria-rodrigues/mcp-linkedin`<br />`@vitoria-rodrigues/mcp-playwright` |
| **MCP Core Libraries** | `mcp/core/<domain>` | `@vitoria-rodrigues/mcp-core-<domain>` | `@vitoria-rodrigues/mcp-core-github` |

> [!IMPORTANT]
> In `agent-mesh`, the discriminator prefixes are strictly `plugin-` and `mcp-`. Never prepend `agent-` or `agent-plugin-` or `agent-mcp-`. The `@vitoria-rodrigues/` scope and the repository boundary already establish that these are AI agent artifacts.

#### 2. `platform` Workspace Taxonomy
| Subsystem / Domain | Directory Pattern | Package Name Formula | Canonical Examples |
| :--- | :--- | :--- | :--- |
| **Root Monorepo** | `/` | `@vitoria-rodrigues/platform` | `@vitoria-rodrigues/platform` |
| **Corporate Domain** | `corporate/packages/<name>`<br />`corporate/services/<name>` | `@vitoria-rodrigues/corporate-<name>` | `@vitoria-rodrigues/corporate-core`<br />`@vitoria-rodrigues/corporate-api`<br />`@vitoria-rodrigues/corporate-web` |
| **Hub Cortex Domain** | `hub/cortex/mcp/<name>`<br />`hub/cortex/memory/packages/<name>`<br />`hub/cortex/memory/services/<name>` | `@vitoria-rodrigues/cortex-<subsystem>-<name>` | `@vitoria-rodrigues/cortex-mcp-guardrails`<br />`@vitoria-rodrigues/cortex-memory-core`<br />`@vitoria-rodrigues/cortex-memory-api`<br />`@vitoria-rodrigues/cortex-memory-web` |
| **Hub Studio Domain** | `hub/studio/<name>` | `@vitoria-rodrigues/studio-<name>` | `@vitoria-rodrigues/studio-assets`<br />`@vitoria-rodrigues/studio-bucket` |
| **Shared Domain** | `shared/<name>` | `@vitoria-rodrigues/shared-<name>` | `@vitoria-rodrigues/shared-config`<br />`@vitoria-rodrigues/shared-git` |
| **Tools Domain** | `tools/<name>` | `@vitoria-rodrigues/tools-<name>` | `@vitoria-rodrigues/tools-github`<br />`@vitoria-rodrigues/tools-provisioner` |
| **Platform Infrastructure** | `k8s`<br />`renderer` | `@vitoria-rodrigues/<name>` | `@vitoria-rodrigues/k8s`<br />`@vitoria-rodrigues/renderer` |

#### 3. New / Standalone Project Taxonomy (e.g., `omnichannel`)
When creating a package in a project outside `org-core`:
- Root package: `@vitoria-rodrigues/<repo-name>`
- Local agent plugins (`.agents/plugins/<domain>`): `@vitoria-rodrigues/plugin-<domain>`
- Internal domain services (`services/<service>`): `@vitoria-rodrigues/<repo>-<service>`
- Shared packages (`packages/<name>`): `@vitoria-rodrigues/<repo>-<name>`

---

### Invariant 2: Zero Raw Dependency Versions
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
- **Zero Redundancy**: A package dependency MUST NOT be duplicated across multiple catalogs (e.g., `@types/node` belongs strictly to `catalog:`, never mirrored in sub-catalogs).

### Invariant 2: Solution-Style TypeScript Project References
The legacy pattern of using separate `tsconfig.build.json` files is strictly prohibited. Modern enterprise monorepos use native TypeScript Solution Builder (`tsc -b`):

1. **Root `tsconfig.base.json`**:
   - Houses shared compiler options (`target: "ES2022"`, `module: "NodeNext"`, `moduleResolution: "NodeNext"`, `strict: true`, `declaration: true`, `declarationMap: true`, `sourceMap: true`, `composite: true`).
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

## 3. Reference Architectures

### Root Solution File (`tsconfig.json`)
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "files": [],
  "references": [
    { "path": "./mcp/core/github" },
    { "path": "./mcp/servers/firecrawl" },
    { "path": "./mcp/servers/github-flow" },
    { "path": "./mcp/servers/memory" },
    { "path": "./mcp/servers/playwright" }
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

## 4. Operational Commands

- Build entire graph via TypeScript solution builder: `tsc -b`
- Clean all build outputs and build info: `tsc -b --clean`
- Typecheck solution: `tsc -b --noEmit`
- Rebuild via Turborepo: `turbo run build`
