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
     - **Single-Changelog Repositories** (governance repositories, meta-repositories, and single-artifact binary projects like `.github`, `.github-private`, `org`, `ecosystem`, `workstation`): Standardized on `git-cliff` with declarative root `cliff.toml` and `.github/workflows/release-cliff.yml`.
     - **Multi-Workspace Monorepos** (monorepos with independent packages, services, or plugins like `platform`, `agent-mesh`, `omnichannel`, `elo-organico`, `tessel`, `docs`): Standardized on Google Release Please in Manifest Mode (`release-please-config.json` and `.release-please-manifest.json`) paired with `.github/workflows/release-please.yml`.
   - Hybrid or ad-hoc release scripts in repositories are strictly prohibited.

3. Scoped Header, Author Attribution, Committers & Docusaurus Hierarchy Invariant:
   - **Scoped Title-Only Header Invariant**: Every `CHANGELOG.md` MUST begin strictly with `# Changelog - <scope>` (matching `package.json` `"name"` such as `# Changelog - @tupynambalucas-dev/agent-mesh` or `# Changelog - @tupynambalucas-dev/plugin-github-org`, or `<org>/<repo>` such as `# Changelog - tupynambalucas-dev/org` for non-npm repositories). Boilerplate introductory paragraphs (`All notable changes to ... will be documented in this file. The format is based on Keep a Changelog...`) are strictly prohibited.
   - **Single-Changelog Repositories & Atomic Workspace Changelogs**:
     Entries MUST isolate the hyperlink strictly on the pull request number (or 7-character commit SHA when merged without a PR), keeping the commit message in plain text followed by the author handle:
     `- [#<pr>](https://github.com/<owner>/<repo>/pull/<pr>) <type>(<scope>): <description> ([@<author>](https://github.com/<author>))`
     For commits merged directly or without an associated PR, reference the 7-character commit SHA:
     `- [<sha>](https://github.com/<owner>/<repo>/commit/<sha>) <type>(<scope>): <description> ([@<author>](https://github.com/<author>))`
   - **Multi-Workspace Monorepo Root Changelogs**:
     Root changelogs in multi-workspace monorepos (`agent-mesh`, `platform`, `docs`, `omnichannel`, `elo-organico`, `tessel`) MUST group entries under the category header by workspace or package name (or `- Other` for root/repository-wide changes outside individual packages) above the indented pull request reference and author attribution, conforming to the Docusaurus `lerna-changelog` enterprise hierarchy:
     ```markdown
     ### Features & Capabilities

     - `<workspace-or-package-name>`
       - [#<pr>](https://github.com/<owner>/<repo>/pull/<pr>) <type>(<scope>): <description> ([@<author>](https://github.com/<author>))
     - Other
       - [#<pr>](https://github.com/<owner>/<repo>/pull/<pr>) <type>(<scope>): <description> ([@<author>](https://github.com/<author>))
     ```
   - **Symmetrical Category Headers**:
     - `### Features & Capabilities` (`feat`)
     - `### Bug Fixes & Corrections` (`fix`)
     - `### Performance Optimizations` (`perf`)
     - `### Refactoring & Internal Architecture` (`refactor`)
     - `### Documentation & Specifications` (`docs`)
     - `### Security & Vulnerability Patches` (`security`)
     - `### Dependencies` (`chore(deps)`, `chore(deps-dev)`)
     - `### Maintenance` (`chore(ci)`, `chore(monorepo)`, `build`, `test`)
     - `### Reverts & Rollbacks` (`revert`)
   - **Release Committers Footer (`### Committers: <N>`)**:
     Every released version block MUST conclude with a `### Committers: <N>` section listing all unique human contributors in alphabetical order: `- <Full Name> ([@<username>](https://github.com/<username>))`.
   - Automated release metadata commits (`chore(release)`, `chore: release ...`) and formatting commits (`style`) must be hidden from user release notes.

4. Zero-Emoji Invariant & Standard ASCII Tags:
   - Emojis are strictly forbidden across release titles, release descriptions, and changelogs.
   - Use standard bracketed ASCII tags: `[FEAT]`, `[FIX]`, `[BREAKING]`, `[PERF]`, `[REFACTOR]`, `[DOCS]`, `[SECURITY]`.

5. Mandatory Confirmation Gate:
   - Pushing a production tag (`v*`), creating or deleting a GitHub Release (`gh release create|edit|delete`), or publishing packages requires an explicit summary (version, commit range, changelog entries) and positive user confirmation prior to execution.
