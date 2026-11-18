<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the renderer bounded context. If you have not read "../AGENTS.md" in this session, stop now and read it using your file-reading tools before proceeding.
  </system-instruction>
</context-hierarchy>

# Bounded Context: renderer

This workspace (`@profile/renderer`) manages dynamic asset generation and document compilation, generating SVG statistics cards and compiling markdown templates into production documents.

---

## 1. Ubiquitous Language

| Term       | Definition                                                             | Forbidden Synonyms   |
| :--------- | :--------------------------------------------------------------------- | :------------------- |
| `Pipeline` | A registered module executing a single document compilation workflow   | task, job, process   |
| `Renderer` | An engine compiling metadata and templates into SVG or Markdown output | generator, compiler  |
| `Template` | A `.template.*` source file containing interpolation placeholders      | source, layout       |
| `Card`     | A generated SVG file representing a visual GitHub stats visualization  | image, badge, widget |

---

## 2. Local Architecture

- **[src/clients/](./src/clients/)**: GitHub API client integrations ([github.ts](./src/clients/github.ts)).
- **[src/config/](./src/config/)**: Environment variable loader and runtime configuration in [env.config.ts](./src/config/env.config.ts).
- **[src/pipelines/](./src/pipelines/)**: Pipeline modules executing compilation targets:
  - [readme.pipeline.ts](./src/pipelines/readme/readme.pipeline.ts): Compiles root [README.md](../README.md) and SVG stats cards.
  - [conduct.pipeline.ts](./src/pipelines/conduct/conduct.pipeline.ts): Compiles root [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).
  - [license.pipeline.ts](./src/pipelines/license/license.pipeline.ts): Compiles root [LICENSE.md](../LICENSE.md).
- **[src/renderers/](./src/renderers/)**: SVG template compilers ([stats-card.ts](./src/renderers/stats-card.ts)).
- **[src/schemas/](./src/schemas/)**: Zod validation schemas ([env.schema.ts](./src/schemas/env.schema.ts), [githubstats.schema.ts](./src/schemas/githubstats.schema.ts), [pipeline.schema.ts](./src/schemas/pipeline.schema.ts)).
- **[src/utils/](./src/utils/)**: String interpolator ([template-fill.ts](./src/utils/template-fill.ts)) and case-insensitive wildcard glob matcher ([glob.ts](./src/utils/glob.ts)).
- **[src/index.ts](./src/index.ts)**: Orchestration entrypoint.

---

## 3. Configuration and Exclusions

- **Fine-Grained PAT (`RENDERER_GH_PAT`)**: Mandatory secret with `Contents: read/write`, `Metadata: read-only`, and `Email: read-only` permissions.
- **Exclusion Filters**: Filter out repositories and languages from statistics cards via case-insensitive wildcard patterns (`*`):
  - `EXCLUDE_REPOS`: Comma-separated list or JSON array of repository globs (e.g., `*test*, temp-*, sandbox`).
  - `EXCLUDE_LANGS`: Comma-separated list or JSON array of language globs (e.g., `HTML, CSS, Shell`).
  - `EXCLUDE_PRIVATE`: Boolean flag (`true` / `false`) to omit private repositories.

---

## 4. Workspace Guardrails

1. **TypeScript Implementation**: The rendering engine MUST be implemented in TypeScript with zero compiler errors.
2. **Modular Pipelines**: All compilation targets MUST be implemented as independent modules adhering to [references/pipeline.md](./references/pipeline.md).
3. **Template Suffix**: Source templates MUST use the `*.template.*` naming convention.
4. **Design Token Binding**: Text styles, layout dimensions, and palette colors MUST resolve directly from `@profile/assets`.
5. **Base64 Font Inlining**: The Nunito font MUST be base64-encoded and inlined inside generated SVGs to bypass GitHub image sandboxing.
6. **API Resilience**: The client MUST connect to the GitHub GraphQL API with automated retries and backoff handling.
7. **Generated Branch Prerequisite**: An orphan branch named `generated` MUST exist in the remote repository to host SVG cards under `cards/` for raw GitHub URL serving.

---

## 5. Scoped Operations

- `pnpm clean`: Removes all compiled files and incremental build caches.
- `pnpm generate`: Executes all document and card compilation pipelines locally.
- `pnpm typecheck`: Executes TypeScript compiler verification with zero emit.
- `pnpm lint`: Runs ESLint analysis across workspace files.
