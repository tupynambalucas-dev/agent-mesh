---
trigger: always_on
---

# GitHub Domain Rules

0. Autonomous Domain Mandate:
   - When requested to provision repositories, configure teams, audit branch protection rulesets, inspect Dependabot/Secret Scanning alerts, or configure GitHub Apps, the agent MUST autonomously engage the GitHub Org skills (`github-org-operator`, `github-ruleset-operator`, `github-security-auditor`, `github-app-operator`) and tools without waiting for explicit skill invocations from the user.

1. Cryptographic SSH Commit Signing:
   - All Git commits and annotated tags MUST be signed with SSH keys: `git commit -S -m "..."`.
   - Never push unsigned commits to any organizational repository.

2. Conventional Commits Standard:
   - All commit messages must strictly adhere to Conventional Commits v1.0.0: `<type>(<scope>): <description>`.
   - Permitted types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

3. Branch Protection and Rulesets:
   - Direct pushes to protected branches (`main`, `master`) are strictly blocked; changes must pass pull request reviews and status checks.
   - Tag creation for production releases MUST follow semantic versioning (`vX.Y.Z`).

4. Secret Scanning & Security Hygiene:
   - Never commit or log plaintext API keys, Personal Access Tokens (PAT), or private keys.
   - All security alerts identified by `github-security-auditor` must be addressed or reported immediately.
