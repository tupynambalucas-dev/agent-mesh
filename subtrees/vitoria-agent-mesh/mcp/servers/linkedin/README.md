# LinkedIn MCP Server (`@vitoria-rodrigues/mcp-linkedin`)

Dual-transport Model Context Protocol server for LinkedIn profile analysis, job matching, Easy Apply modal navigation, and candidate resume catalog management. Exposes tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## Technology Stack

| Layer             | Technology                                               |
| :---------------- | :------------------------------------------------------- |
| Runtime           | Node.js 20+ (Node.js 22 LTS recommended)                 |
| Bundler           | `tsup` (`noExternal` self-contained CommonJS bundles)    |
| HTTP server       | Fastify 5                                                |
| MCP transport     | `@modelcontextprotocol/sdk` (Stdio & Streamable HTTP)    |
| Schema validation | Zod                                                      |
| Language          | TypeScript 6                                             |

---

## Available Tools

| Tool                     | Description                                                            | Required Params                | Safety Level |
| :----------------------- | :--------------------------------------------------------------------- | :----------------------------- | :----------- |
| `get_my_profile`         | Extracts authenticated candidate profile data.                         | None                           | Read-Only    |
| `get_person_profile`     | Fetches public profile details of a member or recruiter.               | `profile_id`                   | Read-Only    |
| `search_jobs`            | Queries LinkedIn jobs by title, tags, location, and filters.           | `keywords`                     | Read-Only    |
| `get_job_details`        | Fetches description, requirements, and Easy Apply availability.        | `job_id`                       | Read-Only    |
| `get_easy_apply_form`    | Inspects multi-step Easy Apply fields and required attachments.        | `job_id`                       | Read-Only    |
| `dismiss_job`            | Dismisses a job from discovery feeds.                                  | `job_id`                       | Low Impact   |
| `list_resumes`           | Discovers candidate resume files inside `$PLUGIN_DATA/resumes/`.       | None                           | Read-Only    |
| `get_resume_content`     | Reads text or metadata of a candidate resume for job matching.         | `filename`                     | Read-Only    |
| `submit_easy_apply`      | Submits an Easy Apply application (gated by confirmation).             | `job_id`, `confirm_submit`     | Gated        |
| `connect_with_person`    | Dispatches a connection request with optional note.                    | `profile_id`, `confirm_send`   | Gated        |
| `send_message`           | Sends a direct message or InMail to a member.                          | `profile_id`, `confirm_send`   | Gated        |
| `reply_to_conversation`  | Replies to an existing messaging thread.                               | `thread_id`, `confirm_send`    | Gated        |

---

## Resume Management Architecture (`$PLUGIN_DATA/resumes/`)

Candidate resumes are isolated from the repository code in a dedicated persistent directory resolved at runtime:

1. **Resolution Priority**:
   - `LINKEDIN_RESUMES_DIR` environment variable if explicitly specified.
   - `$PLUGIN_DATA/resumes` provided by the Antigravity or Claude Code plugin runtime.
   - User profile fallback: `~/.antigravity/data/linkedin/resumes`.
2. **Supported Formats**:
   - Markdown resumes (`.md`) - parsed directly for ATS keyword alignment and semantic scoring.
   - Text resumes (`.txt`) - parsed for prompt context injection.
   - PDF documents (`.pdf`) - referenced for attachment during Easy Apply flows.

---

## Transport & Sovereign Execution

1. **Stdio Transport (`dist/bin.cjs` / `scripts/launcher.cjs`)**:
   - Self-contained CJS bundle inlining all dependencies.
   - Runs in standalone consumer workspaces without requiring local installation of `@modelcontextprotocol/sdk`.
2. **Streamable HTTP Transport (`dist/index.cjs`)**:
   - **Path**: `/mcp` on port `8080`.
   - **Session model**: Stateless. Each POST to `/mcp` creates a server instance responding to client requests.
3. **Upstream Delegation & Native Fallback**:
   - By default (`LINKEDIN_ENGINE=upstream` or `LINKEDIN_USE_UPSTREAM=true`), `scripts/launcher.cjs` delegates directly to `uvx mcp-server-linkedin@latest` with automated session flags (`--import-from-browser auto`, `--headless`).
   - When explicitly configured (`LINKEDIN_ENGINE=native`), the launcher executes the self-contained native bundle (`dist/bin.cjs`).

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
