# LinkedIn Model Context Protocol Server (`@tupynambalucas-dev/mcp-linkedin`)

Dual-transport Model Context Protocol (MCP) server providing LinkedIn profile analysis, job discovery, Easy Apply application automation, and candidate resume catalog management. Exposes tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## 1. Overview

`@tupynambalucas-dev/mcp-linkedin` centralizes professional intelligence and recruitment automation for developer agent systems. Operating as a sovereign service in the `agent-mesh` substrate, it provides:

1. **Profile Intelligence**: Extracts candidate profile structures, enables ATS keyword matching, and evaluates headline and experience formatting.
2. **Job Discovery & Semantic Triage**: Queries LinkedIn job postings by keyword, location, and seniority, computing semantic fit scores (0-100).
3. **Candidate Resume Vault (`$PLUGIN_DATA/resumes/`)**: Discovers and indexes candidate resumes (.md, .txt, .pdf) in an isolated, persistent directory without polluting git source control.
4. **Safety-Gated Application Automation**: Inspects multi-step Easy Apply fields and enforces explicit human-in-the-loop confirmation before submitting applications or dispatching recruiter messages.

---

## 2. Capabilities / Exports Catalog

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
mcp/servers/linkedin/
├── scripts/
│   └── launcher.cjs             # Sovereign MCP launcher with browser detection & fallback
├── src/
│   ├── resumes/
│   │   └── resume-manager.ts    # Resume indexing and file parsing engine
│   ├── tools/
│   │   ├── application.tools.ts # Easy Apply form inspection & submission
│   │   ├── conversation.tools.ts# Connection requests & direct messaging
│   │   ├── index.ts             # Tool registry and JSON-RPC dispatch
│   │   ├── job.tools.ts         # Job search, details, and triage
│   │   ├── profile.tools.ts     # Profile retrieval and keyword extraction
│   │   └── resumes.tools.ts     # Resume vault file operations
│   ├── bin.ts                   # Stdio transport entrypoint
│   ├── config.ts                # Zod environment schema
│   ├── index.ts                 # Fastify Streamable HTTP transport entrypoint (:8080)
│   └── types.ts                 # Data transfer object types
├── AGENTS.md                    # Layer 3 context router
├── CHANGELOG.md                 # Version history
├── LICENSE                      # Apache License 2.0
├── mcp.json                     # Agent Plugins stdio declaration
├── package.json                 # Package manifest (@tupynambalucas-dev/mcp-linkedin)
├── README.md                    # Layer 3 package documentation
├── tsconfig.json                # TypeScript compiler configuration
└── tsup.config.ts               # Inlined CommonJS bundle configuration
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

### Resume Management Architecture (`$PLUGIN_DATA/resumes/`)

Candidate resumes are isolated from the repository code in a dedicated persistent directory resolved at runtime:
1. `LINKEDIN_RESUMES_DIR` environment variable if explicitly specified.
2. `$PLUGIN_DATA/resumes` provided by the Antigravity or Claude Code plugin runtime.
3. User profile fallback: `~/.antigravity/data/linkedin/resumes`.

Supported formats include Markdown (`.md`), Plain Text (`.txt`), and PDF (`.pdf`).

---

## 5. Development Scripts

| Command | Description |
| :--- | :--- |
| `pnpm build` | Compiles self-contained CommonJS bundles via `tsup` into `dist/bin.cjs` and `dist/index.cjs`. |
| `pnpm dev` | Starts the Fastify HTTP transport in development watch mode. |
| `pnpm typecheck` | Validates TypeScript types across all source files (`tsc --noEmit`). |
| `pnpm clean` | Removes `dist/` and build cache files. |

---

## 6. Governance & Context

This package adheres to enterprise governance standards:
- [Root Context Router](../../../AGENTS.md)
- [MCP Subsystem Context](../../AGENTS.md)
- [MCP Subsystem README](../../README.md)
- [License](./LICENSE): Apache License 2.0
