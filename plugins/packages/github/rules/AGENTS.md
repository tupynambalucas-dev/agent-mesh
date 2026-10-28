---
trigger: always_on
---

# GitHub Domain Rules

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
