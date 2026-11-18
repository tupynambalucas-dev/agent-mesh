# Developer Profile & Career Domain Plugin (`@tupynambalucas-dev/plugin-profile`)

Autonomous AI agent domain plugin providing GitHub profile README architecture, dynamic developer statistics layout, professional career advancement strategies, and LinkedIn talent discovery complying with `agent-plugins.org` v1.0.0.

---

## 1. Overview

`@tupynambalucas-dev/plugin-profile` unifies developer positioning and professional visibility across technical and social platforms:

1. **GitHub Profile Architecture**: Analyzes, structures, and refactors developer GitHub profile repositories (`<user>/<user>` or `profile`), translating engineering experience into deep, first-principles systems narratives.
2. **Career Advancement & Public Presence**: Synchronizes technical depth across GitHub repositories and professional platforms, formulating positioning strategies for independent developers and contract engineers.
3. **LinkedIn Profile Intelligence**: Evaluates headlines, About sections, and experience entries against Applicant Tracking System (ATS) parsing models, rewriting descriptions into STAR-formatted achievement bullets.
4. **Multi-Vector Job Triage**: Searches and filters active job listings by technology stack, seniority, and remote status, calculating semantic fit scores (0-100).
5. **Candidate Resume Vault (`$PLUGIN_DATA/resumes/`)**: Indexes candidate CVs (.md, .txt, .pdf) in an isolated directory, matching requirements without cluttering git trees.
6. **Safety-Gated Application Automation**: Enforces explicit human-in-the-loop confirmation before submitting Easy Apply applications or sending recruiter connection messages.

---

## 2. Capabilities / Exports Catalog

### Modular Skills

| Skill Name | Role & Responsibility | Primary MCP Tools |
| :--- | :--- | :--- |
| `developer-profile-architect` | GitHub profile README architecture, dynamic stats cards, systems engineering narrative. | Local Git & Markdown Tools |
| `developer-advancement-strategist` | Career progression, public presence synchronization, contractor positioning. | `get_my_profile`, `list_resumes` |
| `linkedin-profile-architect` | Profile auditing, STAR bullet transformation, ATS keyword alignment. | `get_my_profile`, `list_resumes` |
| `linkedin-job-operator` | Multi-filter job search, semantic fit scoring (0-100), discovery feed triage. | `search_jobs`, `get_job_details`, `dismiss_job` |
| `linkedin-application-auditor` | Easy Apply form inspection, resume selection, gated submission verification. | `get_easy_apply_form`, `submit_easy_apply`, `list_resumes` |
| `linkedin-outreach-operator` | Recruiter identification, connection notes (<= 300 chars), InMail messages. | `get_person_profile`, `connect_with_person`, `send_message`, `reply_to_conversation` |

### Integrated MCP Tools (`linkedin`)

| Tool | Parameters | Description | Safety Level |
| :--- | :--- | :--- | :--- |
| `get_my_profile` | None | Extracts authenticated candidate profile data. | Read-Only |
| `get_person_profile` | `profile_id: string` | Fetches public profile details of a member or recruiter. | Read-Only |
| `search_jobs` | `keywords: string`, `location?: string`, `limit?: number` | Queries LinkedIn jobs by title, tags, location, and filters. | Read-Only |
| `get_job_details` | `job_id: string` | Fetches description, requirements, and Easy Apply availability. | Read-Only |
| `get_easy_apply_form` | `job_id: string` | Inspects multi-step Easy Apply fields and required attachments. | Read-Only |
| `dismiss_job` | `job_id: string` | Dismisses a job from discovery feeds. | Low Impact |
| `list_resumes` | None | Discovers candidate resume files inside `$PLUGIN_DATA/resumes/`. | Read-Only |
| `get_resume_content` | `filename: string` | Reads text or metadata of a candidate resume for job matching. | Read-Only |
| `submit_easy_apply` | `job_id: string`, `confirm_submit: boolean` | Submits an Easy Apply application (gated by confirmation). | Gated Mutation |
| `connect_with_person` | `profile_id: string`, `confirm_send: boolean`, `message?: string` | Dispatches a connection request with optional note. | Gated Mutation |
| `send_message` | `profile_id: string`, `confirm_send: boolean`, `message: string` | Sends a direct message or InMail to a member. | Gated Mutation |
| `reply_to_conversation` | `thread_id: string`, `confirm_send: boolean`, `message: string` | Replies to an existing messaging thread. | Gated Mutation |

---

## 3. Directory Layout

```text
plugins/packages/profile/
├── hooks.json                   # PreToolUse confirmation gate bindings
├── mcp_config.json              # Antigravity native launcher configuration
├── mcp.json                     # agent-plugins.org stdio declaration
├── package.json                 # Scoped npm manifest (@tupynambalucas-dev/plugin-profile)
├── plugin.json                  # Authoritative Agent Plugins manifest
├── README.md                    # Layer 3 package documentation
├── CHANGELOG.md                 # Version history
├── LICENSE                      # Apache License 2.0
├── tsconfig.json                # TypeScript compiler configuration
├── references/                  # Reference specifications and guides
│   ├── ats-keyword-matrix.md
│   ├── easy-apply-modal-flow.md
│   ├── github-profile-architecture-guide.md
│   └── linkedin-anti-bot-safeguards.md
├── rules/
│   └── AGENTS.md                # Domain rules & Autonomous Domain Mandate
├── scripts/
│   ├── hooks/
│   │   └── confirm-application-submission.cjs
│   └── launcher.cjs             # Three-layer MCP resolution & resumes initialization
└── skills/                      # Modular domain skills
    ├── developer-advancement-strategist/
    │   └── SKILL.md
    ├── developer-profile-architect/
    │   └── SKILL.md
    ├── linkedin-application-auditor/
    │   └── SKILL.md
    ├── linkedin-job-operator/
    │   └── SKILL.md
    ├── linkedin-outreach-operator/
    │   └── SKILL.md
    └── linkedin-profile-architect/
        └── SKILL.md
```

---

## 4. Configuration & Usage

### Environment Variables

| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `LINKEDIN_ENGINE` | No | `upstream` | Engine selector: `upstream` (`uvx`) or `native` (in-house bundle). |
| `LINKEDIN_USE_UPSTREAM` | No | `true` | Flag to force upstream `uvx mcp-server-linkedin` runner. |
| `LINKEDIN_BROWSER` | No | `auto` | Browser for session cookie auto-import (`auto`, `chrome`, `edge`, `brave`). |
| `LINKEDIN_HEADLESS` | No | `true` | Runs upstream browser in headless mode (`false` for visible GUI). |
| `LINKEDIN_RESUMES_DIR` | No | `$PLUGIN_DATA/resumes` | Directory storing candidate resumes and cover letters. |
| `LINKEDIN_SESSION_COOKIE` | No | (Auto-import) | Raw `li_at` cookie value for authentication. |

### Safety Gating & PreToolUse Lifecycle Hook

All mutations on the LinkedIn platform (`submit_easy_apply`, `connect_with_person`, `send_message`, `reply_to_conversation`) are intercepted by `confirm-application-submission.cjs`. Tool execution requires explicit positive confirmation (`confirm_submit: true`, `confirm_send: true`).

---

## 5. Development Scripts

| Command | Description |
| :--- | :--- |
| `pnpm typecheck` | Validates TypeScript configuration (`tsc --noEmit`). |

---

## 6. Governance & Context

This package adheres to enterprise governance standards:
- [Root Context Router](../../../AGENTS.md)
- [Plugins Subsystem Context](../../AGENTS.md)
- [Plugins Subsystem README](../../README.md)
- [License](./LICENSE): Apache License 2.0
