# Domain Plugins Subsystem (`plugins/`)

This directory houses the sovereign, modular domain plugins authored for the `Vitoria-Rodrigues` agent mesh.

---

## 1. Overview

Each domain plugin in `plugins/packages/*` is a self-contained unit bundling:
1. **Plugin Manifest (`plugin.json`)**: Declares the plugin identity, author, version, and keywords compliant with `agent-plugins.org` v1.0.0.
2. **Modular Skills (`skills/<skill_name>/SKILL.md`)**: Progressive-disclosure workflows and procedures adhering to the closed role vocabulary (`-operator`, `-architect`, `-auditor`).
3. **Domain Rules (`rules/AGENTS.md`)**: Always-on guidelines and Autonomous Domain Mandates (Rule 0) that instruct the agent to engage appropriate skills and tools automatically.
4. **Sovereign Tool Integrations (`mcp_config.json`, `mcp.json`, and `scripts/launcher.cjs`)**: Dual-mode bindings connecting the plugin to self-contained in-house MCP servers (`mcp/servers/*/dist/bin.cjs`) across both standalone umbrella installations (`node_modules/@vitoria-rodrigues/agent-mesh`) and local monorepo workspaces.

---

## 2. Plugin Matrix

| Plugin Directory | NPM Package Name | Skills Included | MCP Servers | Active Rules |
| :--- | :--- | :--- | :--- | :--- |
| [packages/atelier/](./packages/atelier/README.md) | `@vitoria-rodrigues/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect` | *(none)* | AI Agent Mesh engineering, context routing, and governance. |
| [packages/docusaurus/](./packages/docusaurus/README.md) | `@vitoria-rodrigues/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | *(none)* | Diataxis quadrants, MDX v3 parser compliance, Crowdin isolation. |
| [packages/github-flow/](./packages/github-flow/README.md) | `@vitoria-rodrigues/plugin-github-flow` | `github-flow-operator`<br>`github-actions-operator` | `github-flow` (`mcp-github-flow`) | Developer Git workflows, Conventional Commits, SSH signing. |
| [packages/repo/](./packages/repo/README.md) | `@vitoria-rodrigues/plugin-repo` | `readme-architect`<br>`monorepo-architect`<br>`community-health-architect`<br>`license-architect`<br>`github-standards-architect` | *(none)* | Repository root files, AGENTS-README invariant, catalogs, `.github` standards, and licensing. |
| [packages/research/](./packages/research/README.md) | `@vitoria-rodrigues/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | `context7` (Upstream APIs)<br>`firecrawl` (`mcp-firecrawl`) | Autonomous documentation retrieval, source attribution. |
| [packages/web/](./packages/web/README.md) | `@vitoria-rodrigues/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | `playwright` (`mcp-playwright`)<br>`firecrawl` (`mcp-firecrawl`) | Dynamic browser modes (extension vs headless), ARIA snapshotting. |
| [packages/linkedin/](./packages/linkedin/README.md) | `@vitoria-rodrigues/plugin-linkedin` | `linkedin-profile-architect`<br>`linkedin-job-operator`<br>`linkedin-application-auditor`<br>`linkedin-outreach-operator` | `linkedin` (`mcp-linkedin`) | LinkedIn profile optimization, job matching, Easy Apply automation, candidate resume management. |

---

## 3. Consumption Patterns

1. **External Repositories & Child Monorepos (`omnichannel`, `platform`, `docs`)**:
   Install `@vitoria-rodrigues/agent-mesh` via `pnpm-workspace.yaml` (`'github:Vitoria-Rodrigues/agent-mesh'`) and reference `"node_modules/@vitoria-rodrigues/agent-mesh/plugins/packages"` in `.agents/plugins.json` (with optional `"include_only"` filtering).
2. **Meta-Repository Root (`org-core`)**:
   Reference `"agent-mesh/plugins/packages"` directly in `org-core/.agents/plugins.json`.

---

## 4. Autonomous Plugin Activation

> [!TIP]
> Antigravity automatically ingests rules from `rules/AGENTS.md` when a plugin is enabled. Each plugin defines an **Autonomous Domain Mandate (Rule 0)** that instructs the agent to automatically activate its skills and MCP tools whenever a relevant prompt is received, without requiring the user to explicitly invoke specific tool names.

---

## 5. Validation

Every plugin must strictly pass Antigravity validation:

```bash
# Validate all 6 plugins
pnpm plugins:validate

# Validate a single plugin
agy plugin validate plugins/packages/<plugin-name> --strict
```
