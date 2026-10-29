# Domain Plugins Subsystem (`plugins/`)

This directory houses the sovereign, modular domain plugins authored for the `tupynambalucas-dev` agent mesh.

---

## 1. Overview

Each domain plugin in `plugins/packages/*` is an independent unit bundling:
1. **Plugin Manifest (`plugin.json`)**: Declares the plugin identity, author, version, and dependencies.
2. **Modular Skills (`skills/<skill_name>/SKILL.md`)**: Progressive-disclosure workflows and procedures with single-responsibility scopes.
3. **Domain Rules (`rules/AGENTS.md`)**: Always-on guidelines and Autonomous Domain Mandates that instruct the agent to engage appropriate tools automatically.
4. **Tool Integrations (`mcp_config.json`)**: Bindings connecting the plugin to underlying MCP servers via the smart gateway router.

---

## 2. Plugin Matrix

| Plugin Directory | NPM Package Name | Skills Included | MCP Servers | Active Rules |
| :--- | :--- | :--- | :--- | :--- |
| [packages/appsheet/](./packages/appsheet/README.md) | `@tupynambalucas-dev/agent-plugin-appsheet` | `appsheet-prompt-architect`<br>`appsheet-data-operator`<br>`appsheet-ui-designer` | `cortex-appsheet`<br>`playwright` | AppSheet schema standards, primary keys, and auto-engagement. |
| [packages/docusaurus/](./packages/docusaurus/README.md) | `@tupynambalucas-dev/agent-plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-author`<br>`docusaurus-validator` | *(none)* | Diátaxis quadrants, MDX v3 parser compliance, Crowdin isolation. |
| [packages/github-assistant/](./packages/github-assistant/README.md) | `@tupynambalucas-dev/agent-plugin-github-assistant` | `github-flow-coach`<br>`github-actions-manager` | `cortex-github` | Developer Git workflows, Conventional Commits, SSH signing. |
| [packages/github-manager/](./packages/github-manager/README.md) | `@tupynambalucas-dev/agent-plugin-github-manager` | `github-org-operator`<br>`github-ruleset-enforcer`<br>`github-security-auditor`<br>`github-app-provisioner` | `cortex-github` | Organization RBAC, rulesets, and Dependabot auditing. |
| [packages/google-workspace/](./packages/google-workspace/README.md) | `@tupynambalucas-dev/agent-plugin-google-workspace` | `gwork-drive-manager`<br>`gwork-sheets-builder`<br>`gwork-docs-publisher` | `cortex-gwork` | Drive hierarchies, 1NF sheets modeling, typography rules. |
| [packages/meta/](./packages/meta/README.md) | `@tupynambalucas-dev/agent-plugin-meta` | `agent-router-architect`<br>`markdown-architect`<br>`skill-architect`<br>`plugin-manifest-architect` | *(none)* | Enterprise governance, commit signing, zero-emoji invariant. |
| [packages/research/](./packages/research/README.md) | `@tupynambalucas-dev/agent-plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | `context7`<br>`cortex-firecrawl` | Autonomous documentation retrieval, source attribution. |
| [packages/secrets/](./packages/secrets/README.md) | `@tupynambalucas-dev/agent-plugin-secrets` | `infisical-vault-manager`<br>`secret-rotation-operator` | `cortex-infisical` | Universal Auth identity, zero plaintext leakage, env isolation. |
| [packages/web/](./packages/web/README.md) | `@tupynambalucas-dev/agent-plugin-web` | `browser-automator`<br>`browser-desktop-inspector`<br>`web-scraper` | `playwright`<br>`cortex-firecrawl` | Dual-mode execution (desktop pairing vs headless), ARIA snapshotting. |

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
