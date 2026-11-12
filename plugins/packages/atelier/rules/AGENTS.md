---
trigger: always_on
---

# Enterprise AI Agent Governance & Architecture Rules

0. Autonomous Domain Mandate:
   - When requested to design, audit, or update AI agent context routers (AGENTS.md), architectural plans (plans/ or .agents/plans/), agent skills (SKILL.md), rule files (rules/AGENTS.md), lifecycle hooks (hooks.json), or plugin manifests (plugin.json), the agent MUST autonomously engage the Atelier AI skills (`router-architect`, `skill-architect`, `rule-architect`, `hook-architect`, `plugin-architect`, `plan-architect`) without waiting for explicit skill invocations from the user.

1. Cryptographic Signature Requirement:
   - When operating in repositories configured for signed commits or within the `tupynambalucas-dev` organization, all Git commits and annotated tags MUST be cryptographically signed using SSH: `git commit -S -m "..."`.
   - In external environments without SSH signing keys configured, adhere to the host repository's git signing policy.

2. Conventional Commits Standard:
   - All commit messages must follow the Conventional Commits v1.0.0 specification: `<type>(<scope>): <description>`.
   - Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

3. Zero-Emoji Invariant:
   - Do NOT emit emojis anywhere: chat responses, code comments, commit messages, PR descriptions, or documentation.

4. Secret Hygiene:
   - Never output, log, or commit plaintext credentials, access tokens, API keys, or private SSH keys.
   - Use secret vault management (such as Infisical via `infisical run -- ...`) or environment variable expansion `${VAR_NAME}` for all secret resolution.

5. Technical Language Policy:
   - Technical documentation, code, configuration files, and Git commit messages must be written strictly in en-US.
   - Conversational responses to the user must follow the user's prompt language (defaulting to pt-BR when prompted in Portuguese).

6. Bounded Context 3-Layer Ceiling & Anti-Proliferation:
   - `AGENTS.md` context routers are strictly limited to 3 architectural layers: Layer 1 (Root), Layer 2 (Subsystem), and Layer 3 (Package/Domain).
   - Layer 4+ context routers are strictly prohibited.
   - Content folders under documentation hubs (e.g. Diátaxis quadrants `tutorials/`, `how-to-guides/`, `reference/`, `explanation/`) and planning containers (`plans/`, `.agents/plans/`, `.agents/reports/`) MUST NOT declare `AGENTS.md` or boilerplate `README.md` files. The parent bounded context router governs the entire subsystem.

7. Environment Configuration Template Invariant (.env.example):
   - Every subsystem, package, or repository declaring a `.env` file MUST maintain an authoritative `.env.example` template.
   - The `.env.example` file MUST adhere strictly to the enterprise format exemplified by `platform/k8s/.env.example`: boxed ASCII headers, numbered domain sections, inline descriptive comments (`# --`), and standardized `<YOUR_VARIABLE_NAME>` placeholders.
   - Never commit or emit plaintext secrets, passwords, API tokens, or private keys in `.env.example`.

8. Architectural Plan, Analysis & Report Artifact Storage Invariant:
   - All architectural plans, technical analyses, master blueprints, and governance/audit reports must reside strictly within `<workspace-root>/plans/<artifact-slug>/` (or `<workspace-root>/plans/<artifact-slug>.md`), with `<workspace-root>/.agents/plans/<artifact-slug>/` fully recognized for backward compatibility.
   - Dual-Storage Invariant: Whenever an agent generates or updates an architectural plan, technical analysis, or report artifact (even when written to the conversation brain directory `<appDataDir>/brain/<conversation-id>/`), an identical synchronized copy MUST ALWAYS be created in the target workspace's planning container at `plans/<artifact-slug>/` (or `plans/<artifact-slug>.md`).
   - Single-artifact documents must declare a complete specification in `plans/<artifact-slug>.md` (or `plans/<artifact-slug>/README.md`).
   - Multi-artifact plan suites must conform to the gold standard of `.github/.agents/plans/github-app-architecture/`: Master `README.md` declaring Strategic Baseline, Mermaid diagrams, Document Suite Catalog table, and modular numbered domain documents.
   - Anti-Proliferation: Artifact containers (`plans/`, `.agents/plans/`) MUST NOT declare child `AGENTS.md` context routers (strictly governed by Rule 6).
   - Git Ignore & Visibility Invariant: Planning containers (`plans/` and `.agents/plans/`) MUST be ignored by `.gitignore` across all repositories, while explicitly declaring negative un-ignore patterns in `.ignore` and `.rgignore` (`!plans/`, `!plans/**`, `!.agents/plans/`, `!.agents/plans/**`) so files can always be attached via `@`.
