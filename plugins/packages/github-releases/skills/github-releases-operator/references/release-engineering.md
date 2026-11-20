# Release Engineering Standard

Organization-wide release policy consumed by `github-flow-operator`, `github-actions-operator`, and `github-ruleset-operator`. Repository-specific plans under `<repo>/.agents/plans/` extend, but never contradict, this standard.

---

## 1. Decision Summary

| Topic | Standard |
| :--- | :--- |
| Branching model | Single-Branch GitHub Flow on `main`. No long-lived `develop` or `release` branch. |
| Release source | Signed annotated tag `vX.Y.Z` on a commit already merged to `main` (release from trunk). |
| Release branch | Only just-in-time maintenance branch `release/<major>.<minor>`, cut from a shipped tag, receiving `git cherry-pick -x` fixes only. |
| Versioning | SemVer 2.0.0 derived from Conventional Commits: `feat` MINOR, `fix` PATCH, `!` or `BREAKING CHANGE` MAJOR. |
| Dry run | Prerelease tag `vX.Y.Z-rc.N`. Prereleases are excluded from `releases/latest`. |
| Rollback | Roll forward with the next PATCH. If harm is immediate, mark the release as prerelease. Never delete or move a production tag. |

Sources: [Trunk Based Development: Release from trunk](https://trunkbaseddevelopment.com/release-from-trunk/), [Branch for release](https://trunkbaseddevelopment.com/branch-for-release/), [LaunchDarkly: Git Branching Strategies vs. Trunk-Based Development](https://launchdarkly.com/blog/git-branching-strategies-vs-trunk-based-development/), [cli/gh-extension-precompile](https://github.com/cli/gh-extension-precompile).

---

## 2. Release Lifecycle Checklist

1. **Context discovery**: read the repository `AGENTS.md`, then the release section of its plan or roadmap (`.agents/plans/**/roadmap.md`). Identify the last published release (`gh release list --limit 5`).
2. **Pre-flight**: `git fetch origin --tags`, `git switch main && git pull --ff-only`, clean working tree, latest `ci` run on `main` is `success`.
3. **Release PR**: branch `chore/release-vX.Y.Z`, bump version literals and `CHANGELOG.md`, commit `chore(release): vX.Y.Z` signed, merge via PR.
4. **Optional rc**: signed tag `vX.Y.Z-rc.N` to exercise the pipeline without affecting `latest`.
5. **Tag** (human-confirmed): `git tag -s -a vX.Y.Z -m "release: vX.Y.Z"`, `git tag -v vX.Y.Z`, `git push origin vX.Y.Z`.
6. **Monitor**: `gh run watch` on the tag-triggered workflow; diagnose with `gh run view <id> --log-failed`.
7. **Verify**: `gh release view vX.Y.Z --json assets,isPrerelease,isDraft`, `gh attestation verify <asset> --owner <org>`, repository-specific acceptance checks.
8. **Record**: update the repository roadmap audit log with tag, SHA, and results.

---

## 3. Mandatory Confirmation Gate

Pushing a `v*` tag, publishing or editing a release (`gh release create|edit|delete`), and marking a release as prerelease are production-impacting. The agent MUST show a summary (version, commit range, changelog entries, target repository) and receive explicit user confirmation before executing any of them.

---

## 4. Pipeline Requirements

Release workflows MUST satisfy:

- Trigger on `push.tags: ["v*"]` plus optional `workflow_dispatch`.
- Verify the tagged commit is an ancestor of `origin/main` and its `ci` run succeeded.
- Verify the tag equals the in-tree version and the top changelog entry.
- Pin every third-party action to a full-length commit SHA with a semver comment ([GitHub: Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)).
- Declare least-privilege `permissions` per job; grant `contents: write`, `id-token: write`, and `attestations: write` only to publishing jobs.
- Publish atomically: assets that a consumer needs from `releases/latest` must exist before the release becomes `latest` (build first and publish last, or draft then publish). End with a `verify-release` job that fails the run and demotes the release to prerelease if any required asset is missing.
- Attest every published artifact.

---

## 5. Tag Governance

- Ruleset `enterprise-release-tags` (target `tag`, `refs/tags/v*`, rules `deletion`, `non_fast_forward`, `update`) protects production tags. See the [ruleset schemas](../../../../github-org/skills/github-ruleset-operator/references/ruleset-schemas.md).
- Exclude `refs/tags/v*-rc.*` so failed dry runs can be superseded, never reused.
- Audit: `gh api repos/{owner}/{repo}/rulesets --jq '.[] | {name, target, enforcement}'`. An empty result means tags are unprotected and must be reported.

---

## 6. Related References

- [Conventional Commits](./conventional-commits.md)
- [GitHub CLI Cheatsheet](./gh-cli-cheatsheet.md)
