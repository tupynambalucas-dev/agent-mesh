# AppSheet Domain Plugin (`@tupynambalucas-dev/plugin-appsheet`)

Enterprise Antigravity and Claude Code domain plugin for Google AppSheet application development: relational schema modeling, REST API v2 operations, UI architecture, and isolated Playwright Studio automation.

---

## 1. Overview

`@tupynambalucas-dev/plugin-appsheet` delivers an end-to-end toolchain for constructing, maintaining, and automating AppSheet enterprise applications:
- **Relational Schema Modeling**: Derives 1NF tabular models and parent-child Ref references from natural language.
- **REST API v2 Operations**: Idempotent Find/Add/Edit/Delete records and workflow trigger execution.
- **Isolated Studio UI Automation**: Browser automation of AppSheet Studio views and schema regeneration via Playwright with dedicated profile isolation.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`appsheet-prompt-architect`**](./skills/appsheet-prompt-architect/SKILL.md) | Translates natural language requirements into normalized relational schemas and Ref references. | Relational schema modeling. |
| [**`appsheet-data-operator`**](./skills/appsheet-data-operator/SKILL.md) | REST API v2 mutations, idempotent Find/Add/Edit/Delete queries, and workflow triggers. | `appsheet` MCP server (`find_records`, `mutate_records`, `invoke_action`). |
| [**`appsheet-ui-architect`**](./skills/appsheet-ui-architect/SKILL.md) | View modeling (decks, cards, tables, forms), format rules, and Playwright Studio automation. | `playwright` MCP server (`browser_*`). |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, primary key invariants, formula typography, and Autonomous Domain Mandate.
- [scripts/launcher.cjs](./scripts/launcher.cjs): Sovereign plugin MCP launcher for AppSheet data and browser automation.
- [skills/appsheet-prompt-architect/SKILL.md](./skills/appsheet-prompt-architect/SKILL.md): Relational schema derivation and AppSheet initialization URLs.
- [skills/appsheet-data-operator/SKILL.md](./skills/appsheet-data-operator/SKILL.md): AppSheet REST API v2 operations.
- [skills/appsheet-ui-architect/SKILL.md](./skills/appsheet-ui-architect/SKILL.md): UI/UX view modeling and browser automation.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for AppSheet and Playwright.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings with tool filtering.

---

## 4. Configuration & Playwright Execution

The plugin consumes the following environment variables:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `APPSHEET_APP_ID` | Yes (for data ops) | AppSheet Application ID located in Manage > Integrations. |
| `APPSHEET_APP_KEY` | Yes (for data ops) | Application access token for REST API v2 requests. |
| `PLAYWRIGHT_MODE` | Optional | Execution mode for AppSheet Studio UI automation (defaults to `headless` with isolated `${PLUGIN_DATA}/appsheet-profile`). |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |
| `CORTEX_PROBE_TIMEOUT_MS` | Optional | Smart gateway probe timeout in milliseconds (defaults to `300`). |

---

## 5. Usage & Activation

### Antigravity (`agy`)

Add the plugin to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/appsheet" }
  ]
}
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to design, model, inspect, query, mutate, or automate Google AppSheet applications, schemas, or records, the agent MUST autonomously engage the AppSheet skills (`appsheet-prompt-architect`, `appsheet-data-operator`, `appsheet-ui-architect`) and tools (`find_records`, `mutate_records`, `invoke_action`, `browser_*`) without waiting for explicit skill invocations from the user.
