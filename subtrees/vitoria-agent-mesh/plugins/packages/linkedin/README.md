# LinkedIn Agent Plugin (`@vitoria-rodrigues/plugin-linkedin`)

Sovereign domain plugin providing autonomous LinkedIn profile optimization, multi-vector job discovery, candidate resume matching, and safety-governed Easy Apply automation complying with `agent-plugins.org` v1.0.0.

---

## Architectural Overview

The LinkedIn plugin integrates professional talent discovery directly into Antigravity and Claude Code developer workspaces:

1. **Profile Intelligence**: Analyzes candidate profiles against target job descriptions, recommending headline rewrites, STAR-formatted experience bullets, and ATS keyword enhancements.
2. **Multi-Vector Job Triage**: Searches and filters active job listings by technology stack, seniority, and remote status, computing a semantic Fit Score (0-100).
3. **Resume Management (`$PLUGIN_DATA/resumes/`)**: Discovers and indexes candidate resumes (.md, .txt, .pdf) in an isolated persistent directory without polluting git source control.
4. **Safety-Gated Easy Apply**: Parses multi-step application forms and enforces explicit human-in-the-loop confirmation before any submission occurs.

---

## Directory Layout

```text
plugins/packages/linkedin/
├── hooks.json                   # Antigravity PreToolUse confirmation gates
├── mcp_config.json              # Antigravity native launcher configuration
├── mcp.json                     # agent-plugins.org stdio declaration
├── package.json                 # Scoped npm manifest (@vitoria-rodrigues/plugin-linkedin)
├── plugin.json                  # Authoritative Agent Plugins manifest
├── README.md                    # Layer 3 package documentation
├── references/                  # ATS matrices, Easy Apply flow, anti-bot specs
│   ├── ats-keyword-matrix.md
│   ├── easy-apply-modal-flow.md
│   └── linkedin-anti-bot-safeguards.md
├── rules/
│   └── AGENTS.md                # Domain rules & Autonomous Domain Mandate
├── scripts/
│   ├── hooks/
│   │   └── confirm-application-submission.cjs
│   └── launcher.cjs             # Three-layer MCP resolution & resumes initialization
└── skills/                      # Modular domain skills
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

## Skills Matrix

| Skill Name | Role & Responsibility | Primary MCP Tools |
| :--- | :--- | :--- |
| `linkedin-profile-architect` | Profile auditing, STAR bullet transformation, ATS keyword alignment. | `get_my_profile`, `list_resumes` |
| `linkedin-job-operator` | Multi-filter job search, semantic fit scoring (0-100), job triage. | `search_jobs`, `get_job_details`, `dismiss_job` |
| `linkedin-application-auditor` | Easy Apply form inspection, resume selection, gated submission. | `get_easy_apply_form`, `submit_easy_apply`, `list_resumes` |
| `linkedin-outreach-operator` | Recruiter identification, connection notes (<= 300 chars), InMail. | `get_person_profile`, `connect_with_person`, `send_message`, `reply_to_conversation` |

---

## Configuration & Environment

| Variable               | Required | Default               | Description                                           |
| :--------------------- | :------: | :-------------------- | :---------------------------------------------------- |
| `LINKEDIN_ENGINE`      |    No    | `upstream`            | Engine selector: `upstream` (`uvx`) or `native` (in-house). |
| `LINKEDIN_USE_UPSTREAM`|    No    | `true`                | Flag to force upstream `uvx mcp-server-linkedin` runner.|
| `LINKEDIN_BROWSER`     |    No    | `auto`                | Browser for session cookie auto-import (`auto`, `chrome`, `edge`, `brave`). |
| `LINKEDIN_HEADLESS`    |    No    | `true`                | Runs upstream browser in headless mode (`false` for visible GUI). |
| `LINKEDIN_RESUMES_DIR` |    No    | `$PLUGIN_DATA/resumes`| Directory storing candidate resumes and cover letters.|
| `LINKEDIN_SESSION_COOKIE` | No    | (Auto-import)         | Raw `li_at` cookie value for authentication.          |
