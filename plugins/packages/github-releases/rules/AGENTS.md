---
trigger: always_on
---

# GitHub Releases & Package Distribution Domain Rules

0. Autonomous Domain Mandate:
   - When requested to cut releases, configure Release Please or git-cliff, curate CHANGELOG.md files, generate release notes, calculate SemVer increments, or publish packages (npm, GitHub Packages, GHCR), the agent MUST autonomously engage the `github-releases-operator` skill and tools without waiting for explicit skill invocations from the user.

1. Release from Trunk Invariant:
   - Releases are cut strictly from a signed annotated tag `vX.Y.Z` on a commit already merged to `main`.
   - Long-lived `develop` or `release` branches are strictly prohibited.
   - A `release/<major>.<minor>` branch is permitted ONLY just-in-time to backport critical bug fixes (`git cherry-pick -x`) to an already-shipped release line.

2. Dual Release Engine Invariant:
   - Repositories across the organization MUST strictly follow one of two standardized release archetypes:
     - **Single-Changelog Repositories** (governance repositories, meta-repositories, and single-artifact binary projects like `.github`, `.github-private`, `org-core`, `org-ecosystem`, `workstation`): Standardized on `git-cliff` with declarative root `cliff.toml` and `.github/workflows/release-cliff.yml`.
     - **Multi-Workspace Monorepos** (monorepos with independent packages, services, or plugins like `platform`, `agent-mesh`, `omnichannel`, `elo-organico`, `tessel`, `docs`): Standardized on Google Release Please in Manifest Mode (`release-please-config.json` and `.release-please-manifest.json`) paired with `.github/workflows/release-please.yml`.
   - Hybrid or ad-hoc release scripts in repositories are strictly prohibited.

3. Keep a Changelog & Docusaurus Link Invariant:
   - All `CHANGELOG.md` files MUST follow the Keep a Changelog specification and Docusaurus pull request linking format:
     `- [<type>(<scope>): <description> #<pr>](https://github.com/<owner>/<repo>/pull/<pr>)`
   - Symmetrical category headers MUST be used:
     - `### Features & Capabilities` (`feat`)
     - `### Bug Fixes & Corrections` (`fix`)
     - `### Performance Optimizations` (`perf`)
     - `### Refactoring & Internal Architecture` (`refactor`)
     - `### Documentation & Specifications` (`docs`)
     - `### Security & Vulnerability Patches` (`security`)
     - `### Reverts & Rollbacks` (`revert`)
   - Internal development commits (`chore`, `test`, `ci`, `style`) must be hidden from user release notes.

4. Zero-Emoji Invariant & Standard ASCII Tags:
   - Emojis are strictly forbidden across release titles, release descriptions, and changelogs.
   - Use standard bracketed ASCII tags: `[FEAT]`, `[FIX]`, `[BREAKING]`, `[PERF]`, `[REFACTOR]`, `[DOCS]`, `[SECURITY]`.

5. Mandatory Confirmation Gate:
   - Pushing a production tag (`v*`), creating or deleting a GitHub Release (`gh release create|edit|delete`), or publishing packages requires an explicit summary (version, commit range, changelog entries) and positive user confirmation prior to execution.
