# Release Engineering Standard

Organization-wide release policy consumed by `github-flow-operator`, `github-actions-operator`, `github-releases-operator`, and `github-ruleset-operator`. Repository-specific plans under `<repo>/.agents/plans/` extend, but never contradict, this standard.

---

## 1. Decision Summary

| Topic | Standard |
| :--- | :--- |
| Branching model | Single-Branch GitHub Flow on `main`. No long-lived `develop` or `release` branch. |
| Release source | Signed annotated tag `vX.Y.Z` on a commit already merged to `main` (release from trunk). |
| Release branch | Only just-in-time maintenance branch `release/<major>.<minor>`, cut from a shipped tag, receiving `git cherry-pick -x` fixes only. |
| Versioning | SemVer 2.0.0 derived from Conventional Commits: `feat` MINOR, `fix` PATCH, `!` or `BREAKING CHANGE` MAJOR. |
| Release Engines | **Dual Release Standard**: `git-cliff` for single-changelog repos; Google Release Please Manifest Mode for multi-workspace monorepos. |
| Changelog Format | Docusaurus-style pull request links with author attribution: `- [type(scope): description #PR](url) ([@author](url))` following Keep a Changelog taxonomy. Multi-workspace monorepo root changelogs group by workspace above indented PR links. |
| Dry run | Prerelease tag `vX.Y.Z-rc.N`. Prereleases are excluded from `releases/latest`. |
| Rollback | Roll forward with the next PATCH. If harm is immediate, mark the release as prerelease. Never delete or move a production tag. |

Sources: [Trunk Based Development: Release from trunk](https://trunkbaseddevelopment.com/release-from-trunk/), [Branch for release](https://trunkbaseddevelopment.com/branch-for-release/), [LaunchDarkly: Git Branching Strategies vs. Trunk-Based Development](https://launchdarkly.com/blog/git-branching-strategies-vs-trunk-based-development/), [cli/gh-extension-precompile](https://github.com/cli/gh-extension-precompile).

---

## 2. Dual Release Architecture Archetypes

Every repository across the organization belongs to one of two archetypes:

### Archetype 1: Single-Changelog Repositories (`git-cliff`)

Targeted at governance repositories, meta-repositories, and standalone binary systems:
- Repositories: `.github`, `.github-private`, `org-core`, `org-ecosystem`, `workstation`.
- Engine: `git-cliff` with declarative root `cliff.toml`.
- Workflow: `.github/workflows/release-cliff.yml` executing `orhun/git-cliff-action@v4`.
- Changelog: Unified root `CHANGELOG.md` with Docusaurus-style PR links.

```toml
[remote.github]
owner = "tupynambalucas-dev"
repo = "<repo-name>"

[changelog]
header = """
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
"""
body = """
{% if version %}\
    ## [{{ version | trim_start_matches(pat="v") }}] - {{ timestamp | date(format="%Y-%m-%d") }}
{% else %}\
    ## [unreleased]
{% endif %}\
{% for group, commits in commits | group_by(attribute="group") %}
    ### {{ group }}
    {% for commit in commits %}
        {% if commit.remote.pr_number %}\
        - [{{ commit.message | split(pat="\n") | first | trim }} #{{ commit.remote.pr_number }}](https://github.com/tupynambalucas-dev/{{ remote.github.repo }}/pull/{{ commit.remote.pr_number }}){% if commit.remote.username %} ([@{{ commit.remote.username }}](https://github.com/{{ commit.remote.username }})){% endif %}
        {% else %}\
        - [{{ commit.message | split(pat="\n") | first | trim }} ({{ commit.id | truncate(length=7, end="") }})](https://github.com/tupynambalucas-dev/{{ remote.github.repo }}/commit/{{ commit.id }}){% if commit.remote.username %} ([@{{ commit.remote.username }}](https://github.com/{{ commit.remote.username }})){% endif %}
        {% endif %}\
    {% endfor %}
{% endfor %}\n
"""
```

### Archetype 2: Multi-Workspace Monorepos (Release Please Manifest Mode)

Targeted at multi-package monorepos with independent packages, services, or plugins:
- Repositories: `platform`, `agent-mesh`, `omnichannel`, `elo-organico`, `tessel`, `docs`.
- Engine: Google Release Please in Manifest Mode (`release-please-config.json` and `.release-please-manifest.json`).
- Workflow: `.github/workflows/release-please.yml` executing `google-github-actions/release-please-action@v4`.
- Changelog: Dual topology with atomic per-package `CHANGELOG.md` and consolidated root `CHANGELOG.md`.

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "release-type": "node",
  "bump-minor-pre-major": false,
  "bump-patch-for-minor-pre-major": false,
  "changelog-path": "CHANGELOG.md",
  "packages": {
    ".": {
      "release-type": "node",
      "package-name": "@tupynambalucas-dev/platform"
    },
    "corporate/packages/core": {
      "release-type": "node",
      "package-name": "@tupynambalucas-dev/platform-core"
    }
  }
}
```

---

## 3. Release Lifecycle Checklist

1. **Context discovery**: read the repository `AGENTS.md`, then the release section of its plan or roadmap (`.agents/plans/**/roadmap.md`). Identify the last published release (`gh release list --limit 5`).
2. **Pre-flight**: `git fetch origin --tags`, `git switch main && git pull --ff-only`, clean working tree, latest `ci` run on `main` is `success`.
3. **Release PR**:
   - For `git-cliff` repositories: branch `chore/release-vX.Y.Z`, generate `CHANGELOG.md` with `git cliff --bump -o CHANGELOG.md`, commit signed `chore(release): vX.Y.Z`, merge via PR.
   - For Release Please repositories: review and merge the automated `chore(release): ...` PR created by Release Please bot.
4. **Optional rc**: signed tag `vX.Y.Z-rc.N` to exercise the pipeline without affecting `latest`.
5. **Tag** (human-confirmed): `git tag -s -a vX.Y.Z -m "release: vX.Y.Z"`, `git tag -v vX.Y.Z`, `git push origin vX.Y.Z`.
6. **Monitor**: `gh run watch` on the tag-triggered workflow; diagnose with `gh run view <id> --log-failed`.
7. **Verify**: `gh release view vX.Y.Z --json assets,isPrerelease,isDraft`, `gh attestation verify <asset> --owner <org>`, repository-specific acceptance checks.
8. **Record**: update the repository roadmap audit log with tag, SHA, and results.

---

## 4. Mandatory Confirmation Gate

Pushing a `v*` tag, publishing or editing a release (`gh release create|edit|delete`), and marking a release as prerelease are production-impacting. The agent MUST show a summary (version, commit range, changelog entries, target repository) and receive explicit user confirmation before executing any of them.

---

## 5. Pipeline Requirements

Release workflows MUST satisfy:

- Trigger on `push.tags: ["v*"]` plus optional `workflow_dispatch`.
- Verify the tagged commit is an ancestor of `origin/main` and its `ci` run succeeded.
- Verify the tag equals the in-tree version and the top changelog entry.
- Pin every third-party action to a full-length commit SHA with a semver comment ([GitHub: Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)).
- Declare least-privilege `permissions` per job; grant `contents: write`, `id-token: write`, and `attestations: write` only to publishing jobs.
- Publish atomically: assets that a consumer needs from `releases/latest` must exist before the release becomes `latest` (build first and publish last, or draft then publish). End with a `verify-release` job that fails the run and demotes the release to prerelease if any required asset is missing.
- Attest every published artifact.

---

## 6. Tag Governance

- Ruleset `enterprise-release-tags` (target `tag`, `refs/tags/v*`, rules `deletion`, `non_fast_forward`, `update`) protects production tags.
- Exclude `refs/tags/v*-rc.*` so failed dry runs can be superseded, never reused.
- Audit: `gh api repos/{owner}/{repo}/rulesets --jq '.[] | {name, target, enforcement}'`. An empty result means tags are unprotected and must be reported.

---

## 7. Related References

- [Conventional Commits](./conventional-commits.md)
- [GitHub CLI Cheatsheet](./gh-cli-cheatsheet.md)
