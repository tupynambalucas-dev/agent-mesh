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
| **Single-Changelog Repositories** | `git-cliff` | `cliff.toml`, `.github/workflows/release-cliff.yml` | `.github`, `.github-private`, `org-core`, `org-ecosystem`, `workstation` | Single root `CHANGELOG.md` |
| **Multi-Workspace Monorepos** | Release Please (Manifest Mode) | `release-please-config.json`, `.release-please-manifest.json`, `.github/workflows/release-please.yml` | `platform`, `agent-mesh`, `omnichannel`, `elo-organico`, `tessel`, `docs` | Atomic per-package + Root `CHANGELOG.md` |

---

## 3. Operational Workflows

### Workflow A: Single-Changelog Repositories (`git-cliff`)

1. **Preview Changes**:
   ```bash
   git cliff --unreleased
   ```
2. **Generate / Bump Changelog**:
   ```bash
   git cliff --bump -o CHANGELOG.md
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

All changelog entries MUST adhere to the Keep a Changelog v1.1.0 and Docusaurus PR link syntax with author attribution:

### Single-Changelog Repositories & Atomic Workspace Changelogs:
```markdown
### Features & Capabilities

- [feat(distro): introduce socket-activated Docker engine #6](https://github.com/tupynambalucas-dev/workstation/pull/6) ([@tupynambalucas](https://github.com/tupynambalucas))

### Bug Fixes & Corrections

- [fix(core): bump detect-port to v2.1 #12](https://github.com/tupynambalucas-dev/platform/pull/12) ([@tupynambalucas](https://github.com/tupynambalucas))
```

### Multi-Workspace Monorepo Root Changelogs:
Root changelogs in multi-workspace monorepos group entries by workspace or package name above the indented pull request reference and author attribution:
```markdown
### Features & Capabilities

- `@tupynambalucas-dev/plugin-github-flow`
  - [feat(github-flow): codify release engineering standard #69](https://github.com/tupynambalucas-dev/agent-mesh/pull/69) ([@tupynambalucas](https://github.com/tupynambalucas))

### Bug Fixes & Corrections

- `@tupynambalucas-dev/corporate-api`
  - [fix(auth): enforce strict session token rotation #34](https://github.com/tupynambalucas-dev/platform/pull/34) ([@tupynambalucas](https://github.com/tupynambalucas))
```

Internal development commits (`chore`, `test`, `ci`, `style`) must be hidden from user release notes. Emojis are strictly forbidden.
