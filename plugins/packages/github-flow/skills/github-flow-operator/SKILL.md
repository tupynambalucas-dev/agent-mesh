---
name: github-flow-operator
description: Guides and assists developers with Git workflows, branch conventions, Conventional Commits, Pull Request creation, and GitHub CLI operations.
---

# GitHub Flow Operator

Assists engineering, writing, and creative teams with standard Git branching, Conventional Commits formatting, SSH commit signing, Pull Request workflows, and GitHub CLI operations.

---

## 1. When to Use

Activate this skill when:
- Authoring or validating commit messages against the Conventional Commits v1.0.0 specification.
- Preparing, creating, and reviewing Pull Requests via GitHub CLI (`gh`).
- Resolving Git branch divergences, orchestrating multi-repository operations via `mani`, or staging changes.
- Verifying SSH cryptographic signature configurations.
- Preparing, tagging, or auditing a release, version bump, changelog, or hotfix (see [Release Engineering Standard](./references/release-engineering.md)).

---

## 2. Operational Workflows

### Workflow A: Preparing and Creating a Conventional Commit
1. Verify working directory status:
   ```bash
   git status
   ```
2. Validate commit message against [Conventional Commits](./references/conventional-commits.md):
   - Format: `<type>(<scope>): <description>`
   - Constraint: Zero emojis, imperative verb, under 72 chars.
3. Commit with cryptographic SSH signing:
   ```bash
   git commit -S -m "<type>(<scope>): <description>"
   ```

### Workflow B: Opening a Pull Request via GitHub CLI
1. Push branch to remote:
   ```bash
   git push -u origin <branch-name>
   ```
2. Create PR targeting `main`:
   ```bash
   gh pr create --base main --title "<type>(<scope>): <description>"
   ```
3. Monitor PR status:
   ```bash
   gh pr status
   gh pr checks
   ```

### Workflow C: Multi-Repository Orchestration with Mani (`org-core`)
When operating across repositories in the `org-core` workspace:
1. Verify status across all sovereign repositories:
   ```bash
   mani run status
   ```
2. Fetch or pull latest updates without submodule lockups:
   ```bash
   mani run fetch
   mani run pull
   ```
3. Work directly on sovereign feature branches (`feat/<slug>`, `fix/<slug>`) within each repository without needing parent gitlink bump PRs.

### Workflow D: Preparing and Cutting a Release
Follow the [Release Engineering Standard](./references/release-engineering.md). Release from a signed tag on `main`; do not create a release branch unless maintaining an already-shipped line.
1. Discover context and audit state:
   ```bash
   git fetch origin --tags && git switch main && git pull --ff-only
   git status --short
   gh run list --branch main --limit 3
   gh release list --limit 5
   git log "$(git describe --tags --abbrev=0)..HEAD" --oneline
   ```
2. Open the release PR (`chore/release-vX.Y.Z`, commit `chore(release): vX.Y.Z`) bumping version literals and `CHANGELOG.md`; merge it.
3. Present the release summary and obtain explicit user confirmation, then tag and push:
   ```bash
   git tag -s -a vX.Y.Z -m "release: vX.Y.Z"
   git tag -v vX.Y.Z
   git push origin vX.Y.Z
   ```
4. Hand off to `github-actions-operator` Workflow C to monitor and verify the release pipeline.

### Workflow E: Hotfix on a Shipped Line
1. Fix on `main` first (`fix/<slug>` PR) and release the next PATCH when `main` is releasable.
2. Only when an older line must be patched: `git switch -c release/<major>.<minor> vX.Y.Z`, `git cherry-pick -x <sha>`, tag the PATCH on that branch.
---

## 3. Best Practices

- Always ensure SSH signing is configured: `git config user.signingkey` and `git config commit.gpgsign true`.
- Never bypass branch rulesets; all code reviews and automated checks must pass before merging.
- Never push a `v*` tag or edit a release without explicit user confirmation; production tags are immutable.
- Read the repository `AGENTS.md` and roadmap before acting; verify live state with `git` and `gh`.
- Consult [GitHub Developer Workflow Rules](../../rules/AGENTS.md) for organization policies.
