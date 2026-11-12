---
trigger: always_on
---

# GitHub Developer Workflow Rules

0. Autonomous Domain Mandate:
   - When requested to commit changes, create branches, open pull requests, review CI/CD workflows, or diagnose GitHub Actions failures, the agent MUST autonomously engage the GitHub Flow skills (`github-flow-operator`, `github-actions-operator`) without waiting for explicit skill invocations from the user.

1. Cryptographic Commit Signing:
   - When operating within the `tupynambalucas-dev` organization or in repositories with commit signing policies enabled, all Git commits and annotated tags MUST be cryptographically signed using SSH: `git commit -S -m "..."`.
   - In external environments without SSH signing keys configured, adhere to the host repository's git signing policy.

2. Conventional Commits Standard:
   - All commit messages must strictly adhere to Conventional Commits v1.0.0: `<type>[optional (<scope>)][!]: <description>`.
   - Permitted types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
   - Commit headers must target `<= 72` characters and must never exceed `100` characters.

3. Single-Branch GitHub Flow:
   - Feature and bugfix branches must branch off `main` using deterministic prefixes: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`, `refactor/<slug>`, `ci/<slug>`, `perf/<slug>`, `test/<slug>`, `build/<slug>`, `style/<slug>`, `revert/<slug>`, `hotfix/<slug>`.
   - Direct pushes to protected branches (`main`, `master`) are strictly blocked; changes must pass pull request reviews and status checks.

4. Secret Hygiene:
   - Never commit or log plaintext API keys, Personal Access Tokens (PAT), or private keys.
   - All secrets must be sourced from Infisical or environment variable expansion.

5. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all commit messages, PR titles, PR descriptions, comments, and documentation.
