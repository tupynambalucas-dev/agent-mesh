---
trigger: always_on
---

# GitHub Repository Infrastructure Domain Rules

0. Autonomous Domain Mandate:
   - When requested to configure, audit, or standardize local repository assets (`.github/CODEOWNERS`, `.github/dependabot.yml`, `.github/release.yml`, repository environments, labels, local templates, or repository branch/tag rulesets), the agent MUST autonomously engage the `github-repo-architect` skill and tools without waiting for explicit skill invocations from the user.

1. Mandatory Local Code Ownership (`CODEOWNERS`):
   - GitHub strictly prohibits inheriting `CODEOWNERS` from parent organizations.
   - Every repository MUST define `.github/CODEOWNERS` mapping `*` to `@tupynambalucas-dev/core-maintainers` (or organization designated owners).

2. Anti-Shadowing Invariant for Issue Templates:
   - Child repositories MUST NOT declare local `.github/ISSUE_TEMPLATE/` directories unless strictly required by bespoke local workflows, as local templates suppress organization-wide inherited issue forms.

3. Repository Ruleset Enforcement:
   - Repositories must define branch protection rulesets on `main` (blocking force-push, requiring PR reviews and passing status checks).
   - Repositories releasing production tags must enforce the `enterprise-release-tags` ruleset (`refs/tags/v*`: deletion, non_fast_forward, update blocked; `v*-rc.*` excluded).

4. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across repository descriptions, labels, CODEOWNERS comments, and templates.
