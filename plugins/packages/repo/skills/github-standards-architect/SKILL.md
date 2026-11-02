---
name: github-standards-architect
description: Audits, scaffolds, and standardizes .github directories, CODEOWNERS, dependabot.yml, composite actions, and GitHub Actions workflows across organization repositories.
---

# GitHub Standards Architect

This skill defines the authoritative architectural standard for authoring, auditing, and enforcing `.github` directory structures across all repositories within the `tupynambalucas-dev` organization (`.github`, `agent-mesh`, `platform`, `docs`, and `gh-tl`).

---

## 1. The Core Architectural Invariant

> [!IMPORTANT]
> **Organization-Wide .github Taxonomy Standard:**
> 1. **Inheritance Maximization**: Repositories must leverage native GitHub organizational inheritance from `tupynambalucas-dev/.github` for community health files (`CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`), Pull Request templates, and YAML Issue Forms.
> 2. **Anti-Shadowing Invariant**: Child repositories MUST NOT define local `.github/ISSUE_TEMPLATE/` directories unless they require strictly bespoke, repository-specific schemas. Defining *any* local issue template suppresses all organization-level issue forms.
> 3. **Mandatory Local Code Ownership**: GitHub strictly prohibits inheriting `CODEOWNERS` across repositories. Every repository MUST define `.github/CODEOWNERS` assigning global ownership to `@tupynambalucas-dev/core-maintainers`.
> 4. **Zero-Script Monorepo Publishing**: Workflows must consume native toolchain primitives (`pnpm -r publish --access public --no-git-checks --report-summary`) and Turborepo caching rather than maintaining custom Node.js publication scripts.

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

### 3.3 Standard Reusable Composite Action (`.github/actions/setup-pnpm-env/action.yml`)
Enforces uniform Node.js, pnpm, and global cache store across all monorepos:
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
      uses: pnpm/action-setup@v4
      with:
        version: ${{ inputs.pnpm-version }}

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: "pnpm"

    - name: Get pnpm store directory
      shell: bash
      run: echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

    - name: Setup pnpm cache
      uses: actions/cache@v4
      with:
        path: ${{ env.STORE_PATH }}
        key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
        restore-keys: |
          ${{ runner.os }}-pnpm-store-
```

---

## 4. Monorepo CI/CD & Publishing Standards

1. **Native Idempotent Recursive Publishing**:
   Monorepo publish workflows MUST invoke native `pnpm -r publish`:
   ```bash
   pnpm -r publish --access public --no-git-checks --report-summary
   ```
   - Automatically skips already-published versions.
   - Automatically excludes `"private": true` packages.
   - Generates `pnpm-publish-summary.json` for downstream GitHub Release tagging.
2. **Intent-Based Versioning**:
   Releases are orchestrated using `.changeset/*.md` intent files generated via `pnpm changeset` or `pnpm change`.
3. **Per-Package Changelogs**:
   Each package must maintain an isolated `CHANGELOG.md` adhering to Keep a Changelog. Monolithic root changelogs are prohibited.
4. **Administrative Package Purging**:
   Obsolete or renamed packages in GitHub Packages must NEVER be purged in continuous publish workflows. Purging is restricted to dedicated manual workflows (`admin-packages.yml`) authenticated with organization administrative credentials.

---

## 5. Audit & Remediation Checklist

When auditing a repository:
1. Verify `.github/CODEOWNERS` exists and maps `*` to `@tupynambalucas-dev/core-maintainers`.
2. Check if `.github/ISSUE_TEMPLATE/` exists locally in a child repo: if redundant with org templates, remove it to restore global YAML forms.
3. Verify `.github/dependabot.yml` is configured with America/Sao_Paulo timezone and Conventional Commit prefixes (`chore`, `ci`).
4. Ensure monorepo CI workflows consume `.github/actions/setup-pnpm-env` for deterministic dependency caching.
5. Confirm no emojis exist anywhere in workflows, PR templates, or configuration files.
