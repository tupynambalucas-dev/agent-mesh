<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the plugins bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# Domain Plugins Subsystem Agent Context

This document defines the bounded context router for all Antigravity and Claude Code domain plugins in `plugins/packages/*`.

## Packages Directory Layout

| Plugin Directory | NPM Package Name | Domain Rules & Mandate | Documentation | Manifest |
| :--- | :--- | :--- | :--- | :--- |
| [packages/appsheet/](./packages/appsheet/) | `@tupynambalucas-dev/agent-plugin-appsheet` | [rules/AGENTS.md](./packages/appsheet/rules/AGENTS.md) | [README.md](./packages/appsheet/README.md) | [plugin.json](./packages/appsheet/plugin.json) |
| [packages/docusaurus/](./packages/docusaurus/) | `@tupynambalucas-dev/agent-plugin-docusaurus` | [rules/AGENTS.md](./packages/docusaurus/rules/AGENTS.md) | [README.md](./packages/docusaurus/README.md) | [plugin.json](./packages/docusaurus/plugin.json) |
| [packages/github-assistant/](./packages/github-assistant/) | `@tupynambalucas-dev/agent-plugin-github-assistant` | [rules/AGENTS.md](./packages/github-assistant/rules/AGENTS.md) | [README.md](./packages/github-assistant/README.md) | [plugin.json](./packages/github-assistant/plugin.json) |
| [packages/github-manager/](./packages/github-manager/) | `@tupynambalucas-dev/agent-plugin-github-manager` | [rules/AGENTS.md](./packages/github-manager/rules/AGENTS.md) | [README.md](./packages/github-manager/README.md) | [plugin.json](./packages/github-manager/plugin.json) |
| [packages/google-workspace/](./packages/google-workspace/) | `@tupynambalucas-dev/agent-plugin-google-workspace` | [rules/AGENTS.md](./packages/google-workspace/rules/AGENTS.md) | [README.md](./packages/google-workspace/README.md) | [plugin.json](./packages/google-workspace/plugin.json) |
| [packages/meta/](./packages/meta/) | `@tupynambalucas-dev/agent-plugin-meta` | [rules/AGENTS.md](./packages/meta/rules/AGENTS.md) | [README.md](./packages/meta/README.md) | [plugin.json](./packages/meta/plugin.json) |
| [packages/research/](./packages/research/) | `@tupynambalucas-dev/agent-plugin-research` | [rules/AGENTS.md](./packages/research/rules/AGENTS.md) | [README.md](./packages/research/README.md) | [plugin.json](./packages/research/plugin.json) |
| [packages/secrets/](./packages/secrets/) | `@tupynambalucas-dev/agent-plugin-secrets` | [rules/AGENTS.md](./packages/secrets/rules/AGENTS.md) | [README.md](./packages/secrets/README.md) | [plugin.json](./packages/secrets/plugin.json) |
| [packages/web/](./packages/web/) | `@tupynambalucas-dev/agent-plugin-web` | [rules/AGENTS.md](./packages/web/rules/AGENTS.md) | [README.md](./packages/web/README.md) | [plugin.json](./packages/web/plugin.json) |

## Architecture & Conventions

1. **Self-Contained Plugin Structure**:
   - `plugin.json`: Authoritative Antigravity manifest defining name, version, and optional `mcpServers`.
   - `skills/`: Modular agent skills with `SKILL.md` frontmatter and progressive disclosure.
   - `rules/AGENTS.md`: Mandatory domain rules and Autonomous Domain Mandates loaded unconditionally when the plugin is active.
   - `references/`: Supporting documentation, schemas, and specifications.
2. **MCP Server Integration**:
   - Plugins requiring MCP tools configure `mcp_config.json` targeting `../../../scripts/mcp-gateway-router.js`.
3. **Strict Validation**:
   - Every domain plugin MUST pass `agy plugin validate . --strict` with zero errors and zero warnings.

## Operational Guardrails

- MUST NOT introduce circular references between plugins.
- MUST keep all skills single-responsibility and bounded to their respective domain.
- MUST preserve the Zero-Emoji Invariant across all documentation and rule files.
