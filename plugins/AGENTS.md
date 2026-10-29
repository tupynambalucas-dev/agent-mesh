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
| [packages/appsheet/](./packages/appsheet/) | `@tupynambalucas-dev/plugin-appsheet` | [rules/AGENTS.md](./packages/appsheet/rules/AGENTS.md) | [README.md](./packages/appsheet/README.md) | [plugin.json](./packages/appsheet/plugin.json) |
| [packages/atelier/](./packages/atelier/) | `@tupynambalucas-dev/plugin-atelier` | [rules/AGENTS.md](./packages/atelier/rules/AGENTS.md) | [README.md](./packages/atelier/README.md) | [plugin.json](./packages/atelier/plugin.json) |
| [packages/docusaurus/](./packages/docusaurus/) | `@tupynambalucas-dev/plugin-docusaurus` | [rules/AGENTS.md](./packages/docusaurus/rules/AGENTS.md) | [README.md](./packages/docusaurus/README.md) | [plugin.json](./packages/docusaurus/plugin.json) |
| [packages/github-flow/](./packages/github-flow/) | `@tupynambalucas-dev/plugin-github-flow` | [rules/AGENTS.md](./packages/github-flow/rules/AGENTS.md) | [README.md](./packages/github-flow/README.md) | [plugin.json](./packages/github-flow/plugin.json) |
| [packages/github-org/](./packages/github-org/) | `@tupynambalucas-dev/plugin-github-org` | [rules/AGENTS.md](./packages/github-org/rules/AGENTS.md) | [README.md](./packages/github-org/README.md) | [plugin.json](./packages/github-org/plugin.json) |
| [packages/gwork/](./packages/gwork/) | `@tupynambalucas-dev/plugin-gwork` | [rules/AGENTS.md](./packages/gwork/rules/AGENTS.md) | [README.md](./packages/gwork/README.md) | [plugin.json](./packages/gwork/plugin.json) |
| [packages/repo/](./packages/repo/) | `@tupynambalucas-dev/plugin-repo` | [rules/AGENTS.md](./packages/repo/rules/AGENTS.md) | [README.md](./packages/repo/README.md) | [plugin.json](./packages/repo/plugin.json) |
| [packages/research/](./packages/research/) | `@tupynambalucas-dev/plugin-research` | [rules/AGENTS.md](./packages/research/rules/AGENTS.md) | [README.md](./packages/research/README.md) | [plugin.json](./packages/research/plugin.json) |
| [packages/secrets/](./packages/secrets/) | `@tupynambalucas-dev/plugin-secrets` | [rules/AGENTS.md](./packages/secrets/rules/AGENTS.md) | [README.md](./packages/secrets/README.md) | [plugin.json](./packages/secrets/plugin.json) |
| [packages/web/](./packages/web/) | `@tupynambalucas-dev/plugin-web` | [rules/AGENTS.md](./packages/web/rules/AGENTS.md) | [README.md](./packages/web/README.md) | [plugin.json](./packages/web/plugin.json) |

## Architecture & Conventions

1. **Self-Contained Plugin Structure**:
   - `plugin.json`: Authoritative manifest declaring `$schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json"`.
   - `skills/`: Modular agent skills with `SKILL.md` frontmatter and progressive disclosure matching directory names.
   - `rules/AGENTS.md`: Mandatory domain rules and Autonomous Domain Mandates loaded unconditionally when the plugin is active.
   - `references/`: Supporting documentation, schemas, and specifications.
2. **Dual-Mode MCP Integration**:
   - Native Antigravity: `mcp_config.json` targeting `../../../scripts/mcp-gateway-router.js`.
   - Cross-vendor Agent Plugins 1.0.0: `mcp.json` with explicit `"type": "stdio"`.
3. **Strict Validation**:
   - Every domain plugin MUST pass `agy plugin validate <dir> --strict` with zero errors and zero warnings.

## Operational Guardrails

- MUST NOT introduce circular references between plugins.
- MUST keep all skills single-responsibility and bounded to their respective domain.
- MUST preserve the Zero-Emoji Invariant across all documentation and rule files.
