---
trigger: always_on
---

# Tupynamba Lucas Enterprise Governance Constraints

0. Autonomous Domain Mandate:
   - When requested to design, audit, or update AI agent context routers (AGENTS.md), architectural plans (.agents/plans/), agent skills (SKILL.md), rule files (rules/AGENTS.md), lifecycle hooks (hooks.json), or plugin manifests (plugin.json), the agent MUST autonomously engage the Atelier AI skills (`router-architect`, `skill-architect`, `rule-architect`, `hook-architect`, `plugin-architect`, `plan-architect`) without waiting for explicit skill invocations from the user.

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

6. Bounded Context 3-Layer Ceiling & Anti-Proliferation:
   - `AGENTS.md` context routers are strictly limited to 3 architectural layers: Layer 1 (Root), Layer 2 (Subsystem), and Layer 3 (Package/Domain).
   - Layer 4+ context routers are strictly prohibited.
   - Content folders under documentation hubs (e.g. Diátaxis quadrants `tutorials/`, `how-to-guides/`, `reference/`, `explanation/`) and planning containers (`.agents/plans/`, `.agents/reports/`) MUST NOT declare `AGENTS.md` or boilerplate `README.md` files. The parent bounded context router governs the entire subsystem.

7. Environment Configuration Template Invariant (.env.example):
   - Every subsystem, package, or repository declaring a `.env` file MUST maintain an authoritative `.env.example` template.
   - The `.env.example` file MUST adhere strictly to the enterprise format exemplified by `platform/k8s/.env.example`: boxed ASCII headers, numbered domain sections, inline descriptive comments (`# --`), and standardized `<YOUR_VARIABLE_NAME>` placeholders.
   - Never commit or emit plaintext secrets, passwords, API tokens, or private keys in `.env.example`.

8. Architectural Plan Taxonomy and Storage Invariant:
   - All architectural plans, master plans, and implementation blueprints must reside strictly within `.agents/plans/<plan-slug>/`.
   - Single-artifact plans must declare a complete specification in `.agents/plans/<plan-slug>/README.md` (or `.agents/plans/<plan-slug>.md`).
   - Multi-artifact plan suites must conform to the gold standard of `.github/.agents/plans/github-app-architecture/`: Master `README.md` declaring Strategic Baseline, Mermaid diagrams, Document Suite Catalog table, and modular numbered domain documents.
   - Anti-Proliferation: Plan folders MUST NOT declare child `AGENTS.md` context routers (strictly governed by Rule 6).
   - Git Ignore & Visibility Invariant: Planning containers (`.agents/plans/` and `plans/`) MUST be ignored by `.gitignore` across all repositories, while explicitly declaring negative un-ignore patterns in `.ignore` and `.rgignore` (`!.agents/plans/`, `!.agents/plans/**`, `!plans/`, `!plans/**`) so files can always be attached via `@`.
