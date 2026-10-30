# Domain Plugins Subsystem (`plugins/`)

This directory houses the sovereign, modular domain plugins authored for the `tupynambalucas-dev` agent mesh.

---

## 1. Overview

Each domain plugin in `plugins/packages/*` is an independent unit bundling:
1. **Plugin Manifest (`plugin.json`)**: Declares the plugin identity, author, version, and dependencies compliant with `agent-plugins.org` v1.0.0.
2. **Modular Skills (`skills/<skill_name>/SKILL.md`)**: Progressive-disclosure workflows and procedures adhering to the closed role vocabulary.
3. **Domain Rules (`rules/AGENTS.md`)**: Always-on guidelines and Autonomous Domain Mandates that instruct the agent to engage appropriate tools automatically.
4. **Tool Integrations (`mcp_config.json` and `mcp.json`)**: Dual-mode bindings connecting the plugin to underlying MCP servers.

---

## 2. Plugin Matrix

| Plugin Directory | NPM Package Name | Skills Included | MCP Servers | Active Rules |
| :--- | :--- | :--- | :--- | :--- |
| [packages/appsheet/](./packages/appsheet/README.md) | `@tupynambalucas-dev/plugin-appsheet` | `appsheet-prompt-architect`<br>`appsheet-data-operator`<br>`appsheet-ui-architect` | `appsheet`<br>`playwright` | AppSheet schema standards, primary keys, and auto-engagement. |
| [packages/atelier/](./packages/atelier/README.md) | `@tupynambalucas-dev/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect` | *(none)* | AI Agent Mesh engineering, context routing, and governance. |
| [packages/docusaurus/](./packages/docusaurus/README.md) | `@tupynambalucas-dev/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | *(none)* | Diataxis quadrants, MDX v3 parser compliance, Crowdin isolation. |
| [packages/github-flow/](./packages/github-flow/README.md) | `@tupynambalucas-dev/plugin-github-flow` | `github-flow-operator`<br>`github-actions-operator` | `github` | Developer Git workflows, Conventional Commits, SSH signing. |
| [packages/github-org/](./packages/github-org/README.md) | `@tupynambalucas-dev/plugin-github-org` | `github-org-operator`<br>`github-ruleset-operator`<br>`github-security-auditor`<br>`github-app-operator` | `github` | Organization RBAC, rulesets, and Dependabot auditing. |
| [packages/gwork/](./packages/gwork/README.md) | `@tupynambalucas-dev/plugin-gwork` | `gwork-drive-operator`<br>`gwork-sheets-architect`<br>`gwork-docs-architect` | `gwork` | Drive hierarchies, 1NF sheets modeling, typography rules. |
| [packages/repo/](./packages/repo/README.md) | `@tupynambalucas-dev/plugin-repo` | `readme-architect`, `monorepo-architect`<br>`community-health-architect`<br>`license-architect` | *(none)* | Repository root files, AGENTS-README invariant, and licensing. |
| [packages/research/](./packages/research/README.md) | `@tupynambalucas-dev/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | `context7`<br>`firecrawl` | Autonomous documentation retrieval, source attribution. |
| [packages/secrets/](./packages/secrets/README.md) | `@tupynambalucas-dev/plugin-secrets` | `infisical-vault-operator`<br>`secret-rotation-operator` | `infisical` | Universal Auth identity, zero plaintext leakage, env isolation. |
| [packages/web/](./packages/web/README.md) | `@tupynambalucas-dev/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | `playwright`<br>`firecrawl` | Dual-mode execution (desktop pairing vs headless), ARIA snapshotting. |

---

## 3. Autonomous Plugin Activation

> [!TIP]
> Antigravity automatically ingests rules from `rules/AGENTS.md` when a plugin is enabled. Each plugin defines an **Autonomous Domain Mandate** that instructs the agent to automatically activate its skills and MCP tools whenever a relevant prompt is received, without requiring the user to explicitly invoke specific tool names.

---

## 4. Validation

Every plugin must strictly pass Antigravity validation:

```bash
agy plugin validate plugins/packages/<plugin-name> --strict
```
