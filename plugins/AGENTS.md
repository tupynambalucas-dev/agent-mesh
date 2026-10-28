<context-hierarchy>
  <parent src="../AGENTS.md" type="bounded-context-rules" />
  <system-instruction>
    AGENT: You are operating in the Domain Plugins bounded context of agent-mesh. If you have not read the root AGENTS.md in this session, read it first.
  </system-instruction>
</context-hierarchy>

# Domain Plugins Subsystem Agent Context

This document defines the bounded context for all Antigravity and Claude Code domain plugins in `plugins/packages/*`.

## Packages Directory Layout

- [appsheet](./packages/appsheet/plugin.json): `@tupynambalucas-dev/agent-plugin-appsheet` - Greenfield prompt-to-app architect and Brownfield REST operator.
- [docusaurus](./packages/docusaurus/plugin.json): `@tupynambalucas-dev/agent-plugin-docusaurus` - Diátaxis taxonomy design, MDX v3 authoring, and link audits.
- [github](./packages/github/plugin.json): `@tupynambalucas-dev/agent-plugin-github` - Organization RBAC, ruleset enforcement, and security auditing.
- [google-workspace](./packages/google-workspace/plugin.json): `@tupynambalucas-dev/agent-plugin-google-workspace` - Drive folder taxonomy, Sheets builder, Docs publisher.
- [meta](./packages/meta/plugin.json): `@tupynambalucas-dev/agent-plugin-meta` - AGENTS.md routing, modular skills, and plugin manifest architecture.
- [research](./packages/research/plugin.json): `@tupynambalucas-dev/agent-plugin-research` - Upstream documentation researcher via Context7 and Firecrawl.
- [secrets](./packages/secrets/plugin.json): `@tupynambalucas-dev/agent-plugin-secrets` - Infisical secret vault management and zero-downtime rotation.
- [web](./packages/web/plugin.json): `@tupynambalucas-dev/agent-plugin-web` - Headless browser automation via Playwright and Firecrawl.

## Architecture & Conventions

1. **Self-Contained Plugin Structure**:
   - `plugin.json`: Authoritative Antigravity manifest defining name, version, and optional `mcpServers`.
   - `skills/`: Modular agent skills with `SKILL.md` frontmatter.
   - `rules/AGENTS.md`: Mandatory domain rules active within the plugin context.
   - `references/`: Supporting documentation, JSON schemas, API specs, and prompt templates.
2. **MCP Server Integration**:
   - Plugins requiring MCP tools configure `mcp_config.json` targeting `../../../scripts/mcp-gateway-router.js`.
3. **Strict Validation**:
   - Every domain plugin MUST pass `agy plugin validate . --strict` with zero errors and zero warnings.

## Operational Guardrails

- MUST NOT introduce circular references between plugins.
- MUST keep all skills single-responsibility and bounded to their respective domain.
- MUST preserve the Zero-Emoji Invariant across all documentation and rule files.
