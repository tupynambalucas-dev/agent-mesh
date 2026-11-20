---
name: github-releases-operator
description: Orchestrates SemVer versioning, Keep a Changelog curation, Release Please, Changesets, git-cliff, and package publishing.
---

# GitHub Releases Operator

Governs release engineering, semantic versioning, changelog generation, release note curation, and package publishing.

---

## 1. When to Use

Activate this skill when:
- Cutting a new production or prerelease version (`vX.Y.Z` or `vX.Y.Z-rc.N`).
- Configuring, operating, or debugging Release Please, Changesets, or git-cliff.
- Curating or formatting `CHANGELOG.md` files according to Keep a Changelog.
- Generating release notes and SHA-256 integrity matrices for GitHub Releases.
- Preparing package manifests (`package.json`, `publishConfig`) for npm or GitHub Packages.
- Reviewing or merging version PRs (`chore(release): ...`).

---

## 2. Release Engineering Lifecycle

Follow the standard defined in [Release Engineering Reference](./references/release-engineering.md):

1. **Context Discovery**: Read repository `AGENTS.md` and `.agents/plans/**/roadmap.md`. Identify current version and release engine.
2. **Pre-flight Checks**: Verify working tree is clean and latest `ci` on `main` passed.
3. **Changelog Curation**: Verify all notable changes follow Keep a Changelog and symmetrical category headers with ASCII tags (`[FEAT]`, `[FIX]`, `[PERF]`, `[REFACTOR]`, `[DOCS]`, `[SECURITY]`).
4. **Confirmation Gate**: Present summary to user before tagging or creating releases.
5. **Tag & Publish**: Cut signed annotated tag:
   ```bash
   git tag -s -a vX.Y.Z -m "release: vX.Y.Z"
   git push origin vX.Y.Z
   ```
6. **Package Publication**: When triggered, publish workspace packages:
   ```bash
   pnpm -r publish --access public --no-git-checks --report-summary
   ```
