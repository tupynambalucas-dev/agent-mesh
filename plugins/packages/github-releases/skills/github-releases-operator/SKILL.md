---
name: github-releases-operator
description: Orchestrates SemVer versioning, Keep a Changelog curation, Release Please Manifest Mode, git-cliff with Docusaurus PR links, and package publishing.
---

# GitHub Releases Operator

Governs enterprise release engineering, semantic versioning, changelog generation, release note curation, and package publishing across single-changelog repositories and multi-workspace monorepos.

---

## 1. When to Use

Activate this skill when:
- Cutting a new production or prerelease version (`vX.Y.Z` or `vX.Y.Z-rc.N`).
- Configuring, operating, or debugging `git-cliff` (`cliff.toml`) or Google Release Please (`release-please-config.json` and `.release-please-manifest.json`).
- Curating or formatting `CHANGELOG.md` files according to Keep a Changelog with Docusaurus-style pull request links.
- Generating release notes and SHA-256 integrity matrices for GitHub Releases.
- Preparing package manifests (`package.json`, `publishConfig`) for npm or GitHub Packages.
- Reviewing or merging version PRs (`chore(release): ...`).

---

## 2. Release Archetype Selection

Repositories across the organization strictly map to one of two release archetypes:

| Archetype | Release Engine | Configuration Files | Target Repositories | Changelog Topology |
| :--- | :--- | :--- | :--- | :--- |
| **Single-Changelog Repositories** | `git-cliff` | `cliff.toml`, `.github/workflows/release-cliff.yml` | `.github`, `.github-private`, `org-core`, `org-ecosystem`, `foundation` | Single root `CHANGELOG.md` |
| **Multi-Workspace Monorepos** | Release Please (Manifest Mode) | `release-please-config.json`, `.release-please-manifest.json`, `.github/workflows/release-please.yml` | `platform`, `agent-mesh`, `omnichannel`, `elo-organico`, `tessel`, `docs` | Atomic per-package + Root `CHANGELOG.md` |

---

## 3. Operational Workflows

### Workflow A: Single-Changelog Repositories (`git-cliff`)

1. **Preview Changes**:
   ```bash
   npx -y git-cliff --unreleased
   ```
2. **Generate / Bump Changelog**:
   ```bash
   npx -y git-cliff --bump -o CHANGELOG.md
   ```
3. **Commit & Pull Request**:
   - Create branch `chore/release-vX.Y.Z`.
   - Stage and commit with SSH signature: `git commit -S -m "chore(release): vX.Y.Z"`.
   - Open PR and squash-merge to `main`.
4. **Tag & Push** (Human-Confirmed):
   ```bash
   git tag -s -a vX.Y.Z -m "release: vX.Y.Z"
   git push origin vX.Y.Z
   ```
5. **Create GitHub Release via CLI**:
   ```bash
   gh release create vX.Y.Z --title "vX.Y.Z" --notes-from-tag
   ```

### Workflow B: Multi-Workspace Monorepos (Release Please)

1. **Manifest Configuration**:
   - Ensure `release-please-config.json` declares `"release-type": "node"` (or per-package language), `"changelog-path": "CHANGELOG.md"`, and `"packages"` dictionary for every workspace package.
   - Ensure `.release-please-manifest.json` tracks exact current version for every path (`".": "X.Y.Z"`, `"packages/...": "X.Y.Z"`).
2. **Review Automated Release PR**:
   - Inspect the Release PR created by `release-please` (`chore(release): ...`).
   - Verify that atomic changelogs and root changelog contain Docusaurus pull request links (`- [type(scope): description #PR](url)`).
3. **Approve and Merge**:
   - Squash-merge the release PR into `main`.
   - Release Please tag action automatically creates tags `vX.Y.Z` or `<pkg>-vX.Y.Z` and triggers package publication workflows.

### Workflow C: Package Distribution

For library monorepos (e.g. `agent-mesh`):
```bash
# Publish all packages across workspaces
pnpm -r publish --access public --no-git-checks --report-summary
```

---

## 4. Changelog Formatting Standard

All `CHANGELOG.md` files MUST strictly adhere to the Scoped Header, Isolated Docusaurus PR Link, and Committers Footer standard:

### A. Scoped Header Invariant (No Boilerplate Paragraphs):
Every `CHANGELOG.md` (both root and atomic workspace changelogs) MUST start strictly with `# Changelog - <scope>` where `<scope>` is the `package.json` `"name"` (or `<org>/<repo>` if no `package.json` exists). Do NOT include the Keep a Changelog introductory text (`All notable changes to...`).

```markdown
# Changelog - @tupynambalucas-dev/agent-mesh

<!-- changelog-start -->
```

For atomic workspace packages (e.g. `plugins/packages/github-org/CHANGELOG.md`):
```markdown
# Changelog - @tupynambalucas-dev/plugin-github-org

<!-- changelog-start -->
```

### B. Single-Changelog Repositories & Atomic Workspace Changelogs:
Only `[#<pr>]` (or `[<sha>]`) is hyperlinked; the commit headline remains plain text:
```markdown
### Features & Capabilities

- [#6](https://github.com/tupynambalucas-dev/foundation/pull/6) feat(distro): introduce socket-activated Docker engine ([@tupynambalucas](https://github.com/tupynambalucas))

### Bug Fixes & Corrections

- [#12](https://github.com/tupynambalucas-dev/platform/pull/12) fix(core): bump detect-port to v2.1 ([@tupynambalucas](https://github.com/tupynambalucas))

### Dependencies

- [#19](https://github.com/tupynambalucas-dev/platform/pull/19) chore(deps): bump actions/checkout from 6.0.1 to 6.0.2 ([@dependabot[bot]](https://github.com/apps/dependabot))

### Maintenance

- [#21](https://github.com/tupynambalucas-dev/platform/pull/21) chore(ci): enforce concurrency groups across workflows ([@tupynambalucas](https://github.com/tupynambalucas))

### Committers: 1

- Tupynamba Lucas ([@tupynambalucas](https://github.com/tupynambalucas))
```

### C. Multi-Workspace Monorepo Root Changelogs:
Root changelogs in multi-workspace monorepos group entries by workspace or package name (and `- Other` for root/non-package changes) above the indented pull request reference and author attribution:
```markdown
### Features & Capabilities

- `@tupynambalucas-dev/plugin-github-flow`
  - [#69](https://github.com/tupynambalucas-dev/agent-mesh/pull/69) feat(github-flow): codify release engineering standard ([@tupynambalucas](https://github.com/tupynambalucas))
- Other
  - [#72](https://github.com/tupynambalucas-dev/agent-mesh/pull/72) feat(ci): configure ci-bot token minting for release pipeline ([@tupynambalucas](https://github.com/tupynambalucas))

### Committers: 1

- Tupynamba Lucas ([@tupynambalucas](https://github.com/tupynambalucas))
```

Release metadata commits (`chore(release)`, `chore: release ...`) and formatting commits (`style`) must be hidden from user release notes. Emojis are strictly forbidden.
