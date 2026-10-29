---
trigger: always_on
---

# Tupynamba Lucas Enterprise Governance Constraints

0. Autonomous Domain Mandate:
   - When requested to create, audit, or update AGENTS.md context routers, markdown documentation, agent skills (SKILL.md), or plugin manifests (plugin.json), the agent MUST autonomously engage the Meta skills (`agent-router-architect`, `markdown-architect`, `skill-architect`, `plugin-manifest-architect`) without waiting for explicit skill invocations from the user.

1. Cryptographic Signature Requirement:
   - All Git commits and annotated tags MUST be cryptographically signed using SSH: `git commit -S -m "..."`.
   - Never push unsigned commits to any organizational repository.

2. Conventional Commits Standard:
   - All commit messages must follow the Conventional Commits v1.0.0 specification: `<type>(<scope>): <description>`.
   - Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

3. Zero-Emoji Invariant:
   - Do NOT emit emojis anywhere: chat responses, code comments, commit messages, PR descriptions, or documentation.

4. Secret Hygiene:
   - Never output, log, or commit plaintext credentials, access tokens, API keys, or private SSH keys.
   - Use Infisical (`infisical run -- ...`) or environment variable expansion `${VAR_NAME}` for all secret resolution.

5. Technical Language Policy:
   - Technical documentation, code, configuration files, and Git commit messages must be written strictly in en-US.
   - Conversational responses to the user must follow the user's prompt language (defaulting to pt-BR when prompted in Portuguese).
