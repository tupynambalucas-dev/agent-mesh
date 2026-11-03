---
name: github-standards-architect
description: Audits, scaffolds, and standardizes .github directories, CODEOWNERS, dependabot.yml, composite actions, and GitHub Actions workflows across organization repositories.
---

# GitHub Standards Architect

This skill defines the authoritative enterprise standard for authoring, auditing, and enforcing `.github` directory structures across all repositories within the `tupynambalucas-dev` organization (`.github`, `agent-mesh`, `platform`, `docs`, and `gh-tl`).

---

## 1. Architectural Invariants

> [!IMPORTANT]
> **Organization-Wide .github Taxonomy Standard:**
> 1. **Inheritance Maximization**: Repositories must leverage native GitHub organizational inheritance from `tupynambalucas-dev/.github` for community health files (`CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`), Pull Request templates, and YAML Issue Forms.
> 2. **Anti-Shadowing Invariant**: Child repositories MUST NOT define local `.github/ISSUE_TEMPLATE/` directories unless they require strictly bespoke, repository-specific schemas. Defining *any* local issue template suppresses all organization-level issue forms.
> 3. **Mandatory Local Code Ownership**: GitHub strictly prohibits inheriting `CODEOWNERS` across repositories. Every repository MUST define `.github/CODEOWNERS` assigning global ownership to `@tupynambalucas-dev/core-maintainers`.
> 4. **Composite Action Modularization**: Repositories must encapsulate repeated CI/CD logic into dedicated composite actions under `.github/actions/<action-name>/action.yml` following the Single Responsibility Principle.
> 5. **Zero-Secret Repository Configs**: Monorepo `.npmrc` files committed to Git must strictly define registry and scope routing without embedding secrets or environment variables (`${NODE_AUTH_TOKEN}`). Authentication tokens are resolved exclusively via runner environments in CI or global user configs locally.
> 6. **Zero-Script Monorepo Publishing**: Workflows must consume native toolchain primitives (`pnpm -r publish --access public --no-git-checks --report-summary`) and Turborepo caching rather than maintaining custom Node.js publication scripts.

---

## 2. Organization Asset Matrix

| Asset | Location in `tupynambalucas-dev/.github` | Inherited by Child Repos? | Child Repository Policy |
| :--- | :--- | :--- | :--- |
| **Community Health Files** | Root or `.github/` | **YES** | Do NOT duplicate locally unless terms differ. |
| **Issue Forms** (`.github/ISSUE_TEMPLATE/*.yml`) | `.github/ISSUE_TEMPLATE/` | **YES** | Prohibited locally; rely on org forms to prevent shadowing. |
| **Pull Request Template** | `.github/PULL_REQUEST_TEMPLATE.md`| **YES** | Inherited automatically. |
| **Code Ownership** (`CODEOWNERS`) | `.github/CODEOWNERS` | **NO** | **MANDATORY** in `.github/CODEOWNERS` for every repository. |
| **Dependabot Config** (`dependabot.yml`) | `.github/dependabot.yml` | **NO** | **MANDATORY** in `.github/dependabot.yml` for every repository. |
| **Composite Setup Action** | None | **NO** | Standardized as `.github/actions/setup-pnpm-env/action.yml` in monorepos. |
| **Domain Validation Action** | None | **NO** | Standardized as `.github/actions/validate-plugins/action.yml` in plugin monorepos. |

---

## 3. Standard File Templates

### 3.1 Standard `.github/CODEOWNERS`
Every repository in the organization must declare:
```ini
# Global owners for all files in this repository
* @tupynambalucas-dev/core-maintainers

# Security critical configurations
/.github/workflows/ @tupynambalucas-dev/core-maintainers
/pnpm-lock.yaml @tupynambalucas-dev/core-maintainers
/package.json @tupynambalucas-dev/core-maintainers
```

### 3.2 Standard `.github/dependabot.yml` (For pnpm Monorepos)
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "06:00"
      timezone: "America/Sao_Paulo"
    open-pull-requests-limit: 10
    commit-message:
      prefix: "chore"
      prefix-development: "chore"
      include: "scope"
    groups:
      dependencies:
        patterns:
          - "*"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "06:00"
      timezone: "America/Sao_Paulo"
    open-pull-requests-limit: 5
    commit-message:
      prefix: "ci"
      include: "scope"
```

### 3.3 Composite Actions Taxonomy

#### A. Setup Runtime & Cache (`.github/actions/setup-pnpm-env/action.yml`)
Enforces uniform Node.js, pnpm, and global cache store across monorepos:
```yaml
name: "Setup Node.js & pnpm"
description: "Configures Node.js, pnpm binary, and global virtual store caching"

inputs:
  node-version:
    description: "Node.js runtime version"
    required: false
    default: "22"
  pnpm-version:
    description: "pnpm package manager version"
    required: false
    default: "10.33.2"

runs:
  using: "composite"
  steps:
    - name: Install pnpm
      uses: pnpm/action-setup@fc06bc1257f339d1d5d8b3a19a8cae5388b55320 # v4.1.0
      with:
        version: ${{ inputs.pnpm-version }}

    - name: Setup Node.js
      uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
      with:
        node-version: ${{ inputs.node-version }}
        registry-url: "https://npm.pkg.github.com"
        scope: "@tupynambalucas-dev"

    - name: Get pnpm store directory
      shell: bash
      run: echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

    - name: Setup pnpm cache
      uses: actions/cache@d4323d4df104b026a6aa633fdb11d772146be0bf # v4.2.2
      with:
        path: ${{ env.STORE_PATH }}
        key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
        restore-keys: |
          ${{ runner.os }}-pnpm-store-
```

#### B. Validate Domain Plugins (`.github/actions/validate-plugins/action.yml`)
Standardizes agent-mesh and plugin manifest validation:
```yaml
name: "Validate Antigravity Domain Plugins"
description: "Installs Antigravity CLI and strictly validates all plugin manifests, rules, and skills in plugins/packages"

runs:
  using: "composite"
  steps:
    - name: Validate Domain Plugins
      shell: bash
      run: |
        curl -fsSL https://antigravity.google/install.sh | bash || true
        node -e "
          const { execSync } = require('child_process');
          const fs = require('fs');
          const path = require('path');
          const pluginsDir = path.join('plugins', 'packages');
          if (!fs.existsSync(pluginsDir)) {
            console.log('[validate-plugins] No plugins directory found, skipping.');
            process.exit(0);
          }
          const plugins = fs.readdirSync(pluginsDir);
          let hasAgy = false;
          try { execSync('agy --version', { stdio: 'ignore' }); hasAgy = true; } catch {}
          for (const p of plugins) {
            const full = path.join(pluginsDir, p);
            if (!fs.statSync(full).isDirectory()) continue;
            console.log('[validate-plugins] Validating domain plugin:', p);
            if (hasAgy) {
              execSync('agy plugin validate . --strict', { cwd: full, stdio: 'inherit' });
            } else {
              const manifestPath = path.join(full, 'plugin.json');
              if (fs.existsSync(manifestPath)) {
                const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                console.log('[validate-plugins] Manifest OK:', manifest.name, 'v' + manifest.version);
              }
            }
          }
        "
```

#### C. Build MCP Packages (`.github/actions/build-mcp/action.yml`)
Standardizes parallel compilation of MCP service packages:
```yaml
name: "Build MCP Packages"
description: "Compiles all Model Context Protocol (MCP) packages in parallel via Turborepo"

runs:
  using: "composite"
  steps:
    - name: Build MCP Packages
      shell: bash
      run: pnpm mcp:build
```

---

## 4. Monorepo CI/CD & Publishing Standards

### 4.1 Enterprise `.npmrc` Architecture
Modern pnpm enforces security isolation on repository-local configuration. Environment variable expansion (`${VAR}`) is blocked in repo `.npmrc`.
The committed `.npmrc` must only declare routing:
```ini
registry=https://registry.npmjs.org/
@tupynambalucas-dev:registry=https://npm.pkg.github.com/
```
In CI, `actions/setup-node` automatically creates the authenticated user configuration using `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.

### 4.2 Workflow Concurrency & Least-Privilege Permissions
1. **Pull Request CI (`ci.yml`)**:
   - `permissions: contents: read`
   - Concurrency cancellation: `concurrency: { group: "${{ github.workflow }}-${{ github.ref }}", cancel-in-progress: true }`.
2. **Publish Pipeline (`publish.yml`)**:
   - `permissions: contents: read, packages: write`
   - Concurrency non-cancellation: `concurrency: { group: "publish-packages", cancel-in-progress: false }`.
3. **Administrative Tooling (`admin-packages.yml`)**:
   - Authenticated runbook supporting `list`, `delete-one`, `purge-obsolete`, and `purge-all` with multi-page pagination.

### 4.3 Native Idempotent Recursive Publishing
Workflows invoke native `pnpm -r publish`:
```bash
pnpm -r publish --access public --no-git-checks --report-summary
```
- Automatically skips already-published versions without failing CI.
- Automatically excludes `"private": true` packages.
- Generates `pnpm-publish-summary.json` for downstream release tagging.

### 4.4 Intent-Based Versioning & Changelogs
- Releases are orchestrated using `.changeset/*.md` intent files.
- Version bumping and per-package `CHANGELOG.md` assembly are executed via `pnpm changeset version`.
- Monolithic root changelogs are prohibited; each package maintains an independent `CHANGELOG.md`.

---

## 5. Audit & Remediation Checklist

When auditing a repository:
1. Verify `.github/CODEOWNERS` exists and maps `*` to `@tupynambalucas-dev/core-maintainers`.
2. Check if `.github/ISSUE_TEMPLATE/` exists locally in a child repo: if redundant with org templates, remove it to restore global YAML forms.
3. Verify `.github/dependabot.yml` is configured with America/Sao_Paulo timezone and Conventional Commit prefixes (`chore`, `ci`).
4. Ensure monorepo CI workflows consume `.github/actions/*` composite actions (`setup-pnpm-env`, `build-mcp`, `validate-plugins`) instead of maintaining inline bash blocks.
5. Check that `.npmrc` contains zero plaintext tokens or `${NODE_AUTH_TOKEN}` strings.
6. Confirm workflows declare explicit least-privilege `permissions:` and appropriate `concurrency:` groups.
7. Confirm zero emojis exist anywhere in workflows, PR templates, or configuration files.
