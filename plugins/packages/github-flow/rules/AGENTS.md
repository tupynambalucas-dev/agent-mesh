---
trigger: always_on
---

# GitHub Developer Workflow Rules

0. Autonomous Domain Mandate:
   - When requested to commit changes, create branches, open pull requests, review CI/CD workflows, or diagnose GitHub Actions failures, the agent MUST autonomously engage the GitHub Flow skills (`github-flow-operator`, `github-actions-operator`) without waiting for explicit skill invocations from the user.

1. Cryptographic SSH Commit Signing:
   - All Git commits and annotated tags MUST be signed with SSH keys: `git commit -S -m "..."`.
   - Never push unsigned commits to any organizational repository.

2. Conventional Commits Standard:
   - All commit messages must strictly adhere to Conventional Commits v1.0.0: `<type>(<scope>): <description>`.
   - Permitted types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

3. Branching Strategy & Pull Requests:
   - Feature and bugfix branches must branch off `develop` (or repository base branch) using deterministic naming: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`.
   - Direct pushes to protected branches (`main`, `master`, `develop`) are strictly blocked; changes must pass pull request reviews and status checks.

4. Secret Hygiene:
   - Never commit or log plaintext API keys, Personal Access Tokens (PAT), or private keys.
   - All secrets must be sourced from Infisical or environment variable expansion.

5. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all commit messages, PR titles, PR descriptions, comments, and documentation.
