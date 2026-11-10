# Domain Plugins Subsystem (`plugins/`)

This directory houses the sovereign, modular domain plugins authored for the `tupynambalucas-dev` agent mesh.

---

## 1. Overview

Each domain plugin in `plugins/packages/*` is a self-contained unit bundling:
1. **Plugin Manifest (`plugin.json`)**: Declares the plugin identity, author, version, and keywords compliant with `agent-plugins.org` v1.0.0.
2. **Modular Skills (`skills/<skill_name>/SKILL.md`)**: Progressive-disclosure workflows and procedures adhering to the closed role vocabulary (`-operator`, `-architect`, `-auditor`).
3. **Domain Rules (`rules/AGENTS.md`)**: Always-on guidelines and Autonomous Domain Mandates (Rule 0) that instruct the agent to engage appropriate skills and tools automatically.
4. **Sovereign Tool Integrations (`mcp_config.json`, `mcp.json`, and `scripts/launcher.cjs`)**: Dual-mode bindings connecting the plugin to self-contained in-house MCP servers (`mcp/servers/*/dist/bin.cjs`) across both standalone umbrella installations (`node_modules/@tupynambalucas-dev/agent-mesh`) and local monorepo workspaces.

---

## 2. Plugin Matrix

| Plugin Directory | NPM Package Name | Skills Included | MCP Servers | Active Rules |
| :--- | :--- | :--- | :--- | :--- |
| [packages/appsheet/](./packages/appsheet/README.md) | `@tupynambalucas-dev/plugin-appsheet` | `appsheet-prompt-architect`<br>`appsheet-data-operator`<br>`appsheet-ui-architect` | `appsheet` (`mcp-appsheet`)<br>`playwright` (`mcp-playwright`) | AppSheet schema standards, primary keys, and auto-engagement. |
| [packages/atelier/](./packages/atelier/README.md) | `@tupynambalucas-dev/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect` | *(none)* | AI Agent Mesh engineering, context routing, and governance. |
| [packages/docusaurus/](./packages/docusaurus/README.md) | `@tupynambalucas-dev/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | *(none)* | Diataxis quadrants, MDX v3 parser compliance, Crowdin isolation. |
| [packages/github-flow/](./packages/github-flow/README.md) | `@tupynambalucas-dev/plugin-github-flow` | `github-flow-operator`<br>`github-actions-operator` | `github-flow` (`mcp-github-flow`) | Developer Git workflows, Conventional Commits, SSH signing. |
| [packages/github-org/](./packages/github-org/README.md) | `@tupynambalucas-dev/plugin-github-org` | `github-org-operator`<br>`github-ruleset-operator`<br>`github-security-auditor`<br>`github-app-operator` | `github-org` (`mcp-github-org`) | Organization RBAC, rulesets, and Dependabot auditing. |
| [packages/gwork/](./packages/gwork/README.md) | `@tupynambalucas-dev/plugin-gwork` | `gwork-drive-operator`<br>`gwork-sheets-architect`<br>`gwork-docs-architect` | `gwork` (`mcp-gwork`) | Drive hierarchies, 1NF sheets modeling, typography rules. |
| [packages/repo/](./packages/repo/README.md) | `@tupynambalucas-dev/plugin-repo` | `readme-architect`<br>`monorepo-architect`<br>`community-health-architect`<br>`license-architect`<br>`github-standards-architect` | *(none)* | Repository root files, AGENTS-README invariant, catalogs, `.github` standards, and licensing. |
| [packages/research/](./packages/research/README.md) | `@tupynambalucas-dev/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | `context7` (Upstream APIs)<br>`firecrawl` (`mcp-firecrawl`) | Autonomous documentation retrieval, source attribution. |
| [packages/secrets/](./packages/secrets/README.md) | `@tupynambalucas-dev/plugin-secrets` | `infisical-vault-operator`<br>`secret-rotation-operator` | `infisical` (`mcp-infisical`) | Universal Auth identity, zero plaintext leakage, env isolation. |
| [packages/web/](./packages/web/README.md) | `@tupynambalucas-dev/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | `playwright` (`mcp-playwright`)<br>`firecrawl` (`mcp-firecrawl`) | Dynamic browser modes (extension vs headless), ARIA snapshotting. |

---

## 3. Consumption Patterns

1. **External Repositories & Child Monorepos (`omnichannel`, `platform`, `docs`)**:
   Install `@tupynambalucas-dev/agent-mesh` via `pnpm-workspace.yaml` (`'github:tupynambalucas-dev/agent-mesh'`) and reference `"node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages"` in `.agents/plugins.json` (with optional `"include_only"` filtering).
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
# Validate all 10 plugins
pnpm plugins:validate

# Validate a single plugin
agy plugin validate plugins/packages/<plugin-name> --strict
```
