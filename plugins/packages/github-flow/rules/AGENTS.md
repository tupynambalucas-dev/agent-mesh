---
trigger: always_on
---

# GitHub Developer Workflow Rules

0. Autonomous Domain Mandate:
   - When requested to create feature or bugfix branches, craft semantic commits, sign Git commits via SSH, open Pull Requests, review code changes, resolve merge conflicts, or merge PRs to `main`, the agent MUST autonomously engage the `github-flow-operator` skill and tools without waiting for explicit skill invocations from the user.

1. Cryptographic Commit Signing:
   - When operating within the `tupynambalucas-dev` organization or in repositories with commit signing policies enabled, all Git commits and annotated tags MUST be cryptographically signed using SSH: `git commit -S -m "..."`.
   - In external environments without SSH signing keys configured, adhere to the host repository's git signing policy.

2. Conventional Commits Standard:
   - All commit messages must strictly adhere to Conventional Commits v1.0.0: `<type>[optional (<scope>)][!]: <description>`.
   - Permitted types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
   - Commit headers must target `<= 72` characters and must never exceed `100` characters.

3. Single-Branch GitHub Flow:
   - Feature and bugfix branches must branch off `main` using deterministic prefixes: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`, `refactor/<slug>`, `ci/<slug>`, `perf/<slug>`, `test/<slug>`, `build/<slug>`, `style/<slug>`, `revert/<slug>`, `hotfix/<slug>`, plus `release/<major>.<minor>` exclusively for just-in-time maintenance of a shipped line.
   - Direct pushes to protected branches (`main`, `master`) are strictly blocked; changes must pass pull request reviews and status checks.

4. Secret Hygiene:
   - Never commit or log plaintext API keys, Personal Access Tokens (PAT), or private keys.
   - All secrets must be sourced from Infisical or environment variable expansion.

5. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all commit messages, PR titles, PR descriptions, and comments.

6. Repository Context Discovery:
   - Before branching or committing in a repository, read its `AGENTS.md` and, when present, the roadmap in `.agents/plans/**/roadmap.md` to learn its current phase, branch conventions, and active work. Verify live state with `git` and `gh` rather than trusting documentation alone.
