# @profile/renderer

Dynamic asset generation engine and document compilation workspace for GitHub profile
statistics, SVG visualization cards, and template compilation.

---

## Directory Layout

- **[src/clients/](./src/clients/)**: GitHub GraphQL and REST API clients ([github.ts](./src/clients/github.ts)) querying user statistics, commit velocity, and repository metadata.
- **[src/config/](./src/config/)**: Environment configuration loader and runtime parameters in [env.config.ts](./src/config/env.config.ts).
- **[src/pipelines/](./src/pipelines/)**: Modular document and asset generation pipelines:
  - **[readme/](./src/pipelines/readme/)**: Compiles root `README.md` and SVG statistics cards.
  - **[conduct/](./src/pipelines/conduct/)**: Compiles `CODE_OF_CONDUCT.md` from project metadata.
  - **[license/](./src/pipelines/license/)**: Compiles `LICENSE.md` using configured author details.
- **[src/renderers/](./src/renderers/)**: SVG visualization renderers ([stats-card.ts](./src/renderers/stats-card.ts)).
- **[src/schemas/](./src/schemas/)**: Zod validation schemas enforcing configuration and data contracts.
- **[src/utils/](./src/utils/)**: String interpolation ([template-fill.ts](./src/utils/template-fill.ts)) and case-insensitive wildcard glob matcher ([glob.ts](./src/utils/glob.ts)).
- **[src/index.ts](./src/index.ts)**: Orchestration entrypoint discovering and executing all pipelines.

---

## GitHub Personal Access Token (PAT) Configuration

The renderer requires a GitHub Personal Access Token to query the GraphQL API, retrieve commit statistics across contribution years, and push compiled assets in CI/CD.

### 1. Token Creation (Fine-Grained PAT)

Create a **Fine-Grained Personal Access Token** at [GitHub Settings > Personal Access Tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta):

1. **Token Name**: `PROFILE_RENDERER_PAT` (or any descriptive identifier).
2. **Expiration**: Choose your desired validity period.
3. **Resource Owner**: Select your personal user account.
4. **Repository Access**:
   - Select **All repositories** (recommended to allow the engine to collect stats from all personal repositories), or
   - Select **Only select repositories** and include the profile repository (e.g., `tupynambalucas/tupynambalucas`) plus any repositories whose contribution metrics should be analyzed.
5. **Permissions**:
   - **Repository Permissions**:
     - `Contents`: **Read and Write** (required to upload generated cards to the `generated` branch and write updated markdown documents to `main`).
     - `Metadata`: **Read-Only** (mandatory for all fine-grained tokens).
   - **Account Permissions**:
     - `Email addresses`: **Read-Only** (`user:email`, required to fetch verified emails and correlate commit author signatures with your profile stats).

> Note: If using a **Classic Token**, select the `repo`, `read:user`, and `user:email` scopes.

### 2. GitHub Actions Secret Setup

To enable automated runs via [.github/workflows/renderer-generate.yml](../.github/workflows/renderer-generate.yml):

1. Open your repository on GitHub.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Under **Repository secrets**, click **New repository secret**.
4. Set **Name** to `RENDERER_GH_PAT`.
5. Set **Secret** to your generated token.
6. Click **Add secret**.

For local development, copy [.env.example](./.env.example) to `.env` and set `RENDERER_GH_PAT`.

---

## Generated Branch Setup

The compiled statistics cards (`overview.svg`, `languages.svg`, and static brand logos) are served directly from the `generated` branch via GitHub raw content URLs (`https://raw.githubusercontent.com/<OWNER>/<REPO>/generated/cards/...`).

An orphan branch named `generated` must exist in the repository to store and host these assets:

```bash
git checkout --orphan generated
git rm -rf .
git commit --allow-empty -m "chore: initialize generated branch"
git push origin generated
git checkout main
```

The CI workflow [.github/workflows/renderer-generate.yml](../.github/workflows/renderer-generate.yml) automatically commits and updates SVG cards on this branch on every execution.

---

## Repository and Language Exclusions

The renderer allows excluding specific repositories or programming languages from the generated statistics cards using case-insensitive glob patterns.

### Configuration Methods

#### 1. Via Environment Variables (`.env` or CI Secrets)

Define exclusions in `.env` or in CI workflows as comma-separated values or JSON arrays:

```bash
# Comma-separated format
EXCLUDE_REPOS="*test*, temp-*, legacy-project"
EXCLUDE_LANGS="HTML, CSS, Shell, Makefile"

# Or JSON array format
EXCLUDE_REPOS='["*test*", "temp-*", "legacy-project"]'
EXCLUDE_LANGS='["HTML", "CSS", "Shell"]'

# Exclude all private repositories
EXCLUDE_PRIVATE=true
```

#### 2. Via Code Configuration

Directly configure patterns in [src/config/env.config.ts](./src/config/env.config.ts):

```typescript
export const config = {
  // ...
  excludeRepos: parseList(process.env.EXCLUDE_REPOS),
  excludeLangs: parseList(process.env.EXCLUDE_LANGS),
  excludePrivate: process.env.EXCLUDE_PRIVATE === 'true',
  // ...
};
```

### Glob Matching Rules

The glob matcher ([src/utils/glob.ts](./src/utils/glob.ts)) evaluates repository names (`repo.name`) and language names (`lang.name`) with the following semantics:

- **Case-Insensitive**: `html` matches `HTML`, and `test` matches `Test`.
- **Exact Match**: `"my-repo"` matches only `my-repo`.
- **Prefix Wildcard**: `"*temp"` matches `any-name-temp`.
- **Suffix Wildcard**: `"archived-*"` matches `archived-frontend` and `archived-backend`.
- **Substring Wildcard**: `"*sandbox*"` matches `my-sandbox-api`.

---

## Active Pipelines

- **[readme.pipeline.ts](./src/pipelines/readme/readme.pipeline.ts)**: Fetches repository stats, generates SVG overview and language breakdown cards, and compiles the root [README.md](../README.md).
- **[conduct.pipeline.ts](./src/pipelines/conduct/conduct.pipeline.ts)**: Compiles the root [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) from central project metadata.
- **[license.pipeline.ts](./src/pipelines/license/license.pipeline.ts)**: Compiles the root [LICENSE.md](../LICENSE.md) dynamically with author details.

---

## Scripts

Execute from the workspace directory or from root with pnpm filters:

- `pnpm clean`: Cleans generated build artifacts and TypeScript incremental build caches.
- `pnpm generate`: Executes all document pipelines locally, saving generated SVG cards to `../generated/cards/` and compiling markdown documents to the repository root.
- `pnpm typecheck`: Runs strict TypeScript type validation (`tsc --noEmit`).
- `pnpm lint`: Runs ESLint analysis across all renderer source files.
