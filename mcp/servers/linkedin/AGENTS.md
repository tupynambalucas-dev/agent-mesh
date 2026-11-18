<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @vitoria-rodrigues/mcp-linkedin package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# LinkedIn MCP Server Agent Context (`@vitoria-rodrigues/mcp-linkedin`)

This bounded context encapsulates the in-house Model Context Protocol server providing LinkedIn profile analysis, job discovery, Easy Apply application automation, and candidate resume catalog management.

## Directory Layout

- [scripts/launcher.cjs](./scripts/launcher.cjs): Sovereign MCP launcher (`bin: mcp-linkedin`) initializing `$PLUGIN_DATA/resumes/`, loading `.env` in cascade, and spawning `dist/bin.cjs` or falling back to upstream.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio server configuration.
- [tsup.config.ts](./tsup.config.ts): Declarative `tsup` configuration bundling dependencies (`noExternal`) into `dist/bin.cjs` and `dist/index.cjs`.
- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint serving `/mcp` on port `8080`.
- [src/config.ts](./src/config.ts): Configuration schema via Zod (`LINKEDIN_RESUMES_DIR`, `LINKEDIN_SESSION_COOKIE`, `LINKEDIN_ENGINE`, `LINKEDIN_USE_UPSTREAM`).
- [src/resumes/resume-manager.ts](./src/resumes/resume-manager.ts): Candidate resume discovery, indexing, and text parsing engine.
- [src/tools/profile.tools.ts](./src/tools/profile.tools.ts): `get_my_profile`, `get_person_profile` - Profile extraction and ATS keyword alignment.
- [src/tools/job.tools.ts](./src/tools/job.tools.ts): `search_jobs`, `get_job_details`, `dismiss_job` - Job search and semantic triage.
- [src/tools/application.tools.ts](./src/tools/application.tools.ts): `get_easy_apply_form`, `submit_easy_apply` - Multi-step Easy Apply modal automation.
- [src/tools/resumes.tools.ts](./src/tools/resumes.tools.ts): `list_resumes`, `get_resume_content` - Candidate resume catalog operations.
- [src/tools/conversation.tools.ts](./src/tools/conversation.tools.ts): `connect_with_person`, `send_message`, `reply_to_conversation` - Recruiter outreach.
- [README.md](./README.md): Architecture, tools, resumes directory specification, and transport documentation.

## Operational Guardrails

- MUST route all logging to `process.stderr`. Never output debug information to `process.stdout`.
- MUST enforce confirmation gates on `submit_easy_apply`, `connect_with_person`, and `send_message`.
- MUST isolate candidate resume storage strictly within `$PLUGIN_DATA/resumes/`.

## Required Skills

- **`documentation-researcher`**: Active when researching LinkedIn APIs and MCP schemas.
