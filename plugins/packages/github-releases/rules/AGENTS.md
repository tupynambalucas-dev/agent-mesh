---
trigger: always_on
---

# GitHub Releases & Package Distribution Domain Rules

0. Autonomous Domain Mandate:
   - When requested to cut releases, configure Release Please, Changesets, or git-cliff, curate CHANGELOG.md files, generate release notes, calculate SemVer increments, or publish packages (npm, GitHub Packages, GHCR), the agent MUST autonomously engage the `github-releases-operator` skill and tools without waiting for explicit skill invocations from the user.

1. Release from Trunk Invariant:
   - Releases are cut strictly from a signed annotated tag `vX.Y.Z` on a commit already merged to `main`.
   - Long-lived `develop` or `release` branches are strictly prohibited.
   - A `release/<major>.<minor>` branch is permitted ONLY just-in-time to backport critical bug fixes (`git cherry-pick -x`) to an already-shipped release line.

2. Keep a Changelog & Symmetrical Taxonomy:
   - All `CHANGELOG.md` files MUST follow the Keep a Changelog specification.
   - Symmetrical category headers MUST be used:
     - `### Features & Capabilities` (`feat`)
     - `### Bug Fixes & Corrections` (`fix`)
     - `### Performance Optimizations` (`perf`)
     - `### Refactoring & Internal Architecture` (`refactor`)
     - `### Documentation & Specifications` (`docs`)
     - `### Security & Vulnerability Patches` (`security`)
     - `### Reverts & Rollbacks` (`revert`)
   - Internal development commits (`chore`, `test`, `ci`, `style`) must be hidden from user release notes.

3. Zero-Emoji Invariant & Standard ASCII Tags:
   - Emojis are strictly forbidden across release titles, release descriptions, and changelogs.
   - Use standard bracketed ASCII tags: `[FEAT]`, `[FIX]`, `[BREAKING]`, `[PERF]`, `[REFACTOR]`, `[DOCS]`, `[SECURITY]`.

4. Mandatory Confirmation Gate:
   - Pushing a production tag (`v*`), creating or deleting a GitHub Release (`gh release create|edit|delete`), or publishing packages requires an explicit summary (version, commit range, changelog entries) and positive user confirmation prior to execution.
