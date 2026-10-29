---
name: monorepo-architect
description: Designs and maintains enterprise monorepo workspace configurations, pnpm catalogs, Turborepo pipelines, and hierarchical project-referenced TypeScript architectures (tsconfig.base.json, tsconfig.json, tsconfig.node.json, tsconfig.app.json).
---

# Monorepo Architect

This skill defines the authoritative architecture for monorepo workspace orchestration, centralized dependency catalogs via pnpm, and modern TypeScript Project References (`composite: true`, solution-style `tsconfig.json`).

---

## 1. When to Use

Activate this skill when:
- Designing or auditing monorepo structures (`pnpm-workspace.yaml`, `turbo.json`, root `package.json`).
- Auditing dependencies across workspace packages to enforce centralized pnpm catalogs (`catalog:`).
- Eliminating legacy `tsconfig.build.json` files and establishing modern referenced TypeScript configurations.
- Authoring root solution files (`tsconfig.json` with `files: []` and `references: [...]`).
- Authoring base compiler options (`tsconfig.base.json`).
- Configuring dual-target web applications (`tsconfig.app.json` + `tsconfig.node.json`).

---

## 2. Core Monorepo Invariants

### Invariant 1: Zero Raw Dependency Versions
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
    { "path": "./mcp/packages/appsheet" },
    { "path": "./mcp/packages/firecrawl" },
    { "path": "./mcp/packages/github" },
    { "path": "./mcp/packages/gwork" },
    { "path": "./mcp/packages/infisical" },
    { "path": "./mcp/packages/memory" },
    { "path": "./mcp/packages/playwright" }
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
