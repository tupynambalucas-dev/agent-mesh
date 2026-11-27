---
trigger: always_on
---

# Enterprise AI Agent Governance & Architecture Rules

0. Autonomous Domain Mandate:
   - When requested to design, audit, execute, update roadmaps, finalize reports, archive, or update AI agent context routers (AGENTS.md), architectural plans (.agents/plans/), agent skills (SKILL.md), rule files (rules/AGENTS.md), lifecycle hooks (hooks.json), or plugin manifests (plugin.json), the agent MUST autonomously engage the Atelier AI skills (`router-architect`, `skill-architect`, `rule-architect`, `hook-architect`, `plugin-architect`, `plan-architect`) without waiting for explicit skill invocations from the user.

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
   - Code, configuration files, Git commit messages, and committed repository documentation (`README.md`, `AGENTS.md`, `CHANGELOG.md`, `docs/`, `references/`) MUST be written strictly in en-US.
   - Conversational responses to the user MUST follow the user's prompt language (defaulting to pt-BR when prompted in Portuguese).
   - Architectural plan suites, technical analyses, roadmaps, manual-action runbooks, and post-execution reports stored inside `.agents/plans/` (and mirrored in the conversation brain directory) MUST ALWAYS be written strictly in Brazilian Portuguese (`pt-BR`).

6. Bounded Context 3-Layer Ceiling & Anti-Proliferation:
   - `AGENTS.md` context routers are strictly limited to 3 architectural layers: Layer 1 (Root), Layer 2 (Subsystem), and Layer 3 (Package/Domain).
   - Layer 4+ context routers are strictly prohibited.
   - Content folders under documentation hubs (e.g. Diátaxis quadrants `tutorials/`, `how-to-guides/`, `reference/`, `explanation/`) and planning containers (`.agents/plans/`, `.agents/reports/`) MUST NOT declare `AGENTS.md` or boilerplate `README.md` files. The parent bounded context router governs the entire subsystem.

7. Environment Configuration Template Invariant (.env.example):
   - Every subsystem, package, or repository declaring a `.env` file MUST maintain an authoritative `.env.example` template.
   - The `.env.example` file MUST adhere strictly to the enterprise format: boxed ASCII headers, numbered domain sections, inline descriptive comments (`# --`), and standardized `<YOUR_VARIABLE_NAME>` placeholders.
   - Never commit or emit plaintext secrets, passwords, API tokens, or private keys in `.env.example`.

8. Architectural Plan Lifecycle & Artifact Storage Invariant (Always-On):
   - **Mandatory 3-Folder Lifecycle Taxonomy**: All architectural plans, technical analyses, and execution reports MUST reside inside `<target-repo>/.agents/plans/` partitioned into three lifecycle folders:
     - `pending/<plan-slug>/`: Every newly created or actively executing plan MUST be authored strictly inside `pending/<plan-slug>/`.
     - `completed/<plan-slug>/`: Immediately after completing all steps of a plan and generating its post-execution `report.md`, the entire `<plan-slug>/` folder MUST be moved from `pending/` to `completed/`.
     - `superseded/<plan-slug>/`: Obsolete, abandoned, or consolidated plans replaced by newer suites MUST be moved to `superseded/`.
     - Creating a root `<target-repo>/plans/` folder or loose files directly under `<target-repo>/.agents/plans/` is strictly prohibited.
   - **Mandatory Folder-Suite Format (`pt-BR`)**: Every plan MUST be structured as a modular folder suite in Brazilian Portuguese (`pt-BR`) containing:
     - `README.md`: Master overview, strategic baseline, Mermaid diagrams, and Document Suite Catalog table.
     - `01-*.md`, `02-*.md`, ...: Ordered technical specifications following execution sequence.
     - `manual-actions.md`: Dedicated step-by-step runbook for every manual user action (UI, OAuth, 2FA, vaults), or an explicit statement if zero manual actions exist.
     - `roadmap.md`: Living phased checklist (`- [ ]` / `- [x]`) that MUST be updated after every single executed step or phase across turns/sessions.
     - `report.md`: Post-execution forensic verification report generated upon plan completion right before moving the folder to `completed/`.
   - **Target Repository Resolution**: When operating in a multi-root meta-repository (`org` or `ecosystem`), always resolve the specific child repository (`<target-repo>`) that owns the domain (e.g. `foundation/.agents/plans/pending/<slug>/`, `agent-mesh/.agents/plans/pending/<slug>/`) and create `.agents/plans/pending/` automatically if absent. Use `org/.agents/plans/` only for cross-repository meta-orchestration.
   - **Dual-Storage Invariant**: Every plan suite authored or updated in `<target-repo>/.agents/plans/{pending,completed}/<plan-slug>/` MUST be mirrored identically (SHA-256 parity) in `<appDataDir>/brain/<conversation-id>/<plan-slug>/`.
   - **Anti-Proliferation & Ignore Triad**: `.agents/plans/` MUST NEVER declare child `AGENTS.md` routers (Rule 6), MUST be ignored in `.gitignore`, and MUST be un-ignored in `.ignore` and `.rgignore` (`!.agents/plans/`, `!.agents/plans/**`) for `@` indexing.
