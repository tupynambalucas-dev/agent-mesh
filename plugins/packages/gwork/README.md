# Google Workspace Domain Plugin (`@tupynambalucas-dev/plugin-gwork`)

Enterprise Antigravity and Claude Code domain plugin for Google Workspace automation: Drive lifecycle management, 1NF normalized Sheets workbooks for AppSheet backends, and richly formatted Docs publishing.

---

## 1. Overview

`@tupynambalucas-dev/plugin-gwork` provides specialized skills to manipulate Google Drive folders, synthesize 1NF relational workbooks suitable for AppSheet databases, and publish specifications with standard enterprise typography.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`gwork-drive-operator`**](./skills/gwork-drive-operator/SKILL.md) | Provides deep search and lifecycle management over Google Drive folders, permissions, file sharing, and cross-format exports. | Google Drive API v3. |
| [**`gwork-sheets-architect`**](./skills/gwork-sheets-architect/SKILL.md) | Programmatically synthesizes enterprise-grade multi-table workbooks formatted specifically to serve as backing databases for Google AppSheet or analytics. | Google Sheets API v4. |
| [**`gwork-docs-architect`**](./skills/gwork-docs-architect/SKILL.md) | Converts markdown technical plans and specifications into richly formatted Google Docs conforming to organizational typographic standards. | Google Docs API v1. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, service account credential hygiene, 1NF Sheets modeling standards, Drive hierarchies, Docs typography, and Autonomous Domain Mandate.
- [skills/gwork-drive-operator/SKILL.md](./skills/gwork-drive-operator/SKILL.md): Google Drive folder taxonomy and lifecycle operations.
- [skills/gwork-sheets-architect/SKILL.md](./skills/gwork-sheets-architect/SKILL.md): Google Sheets relational database synthesis for AppSheet.
- [skills/gwork-docs-architect/SKILL.md](./skills/gwork-docs-architect/SKILL.md): Google Docs typographic hierarchy and publishing runbook.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for `@tupynambalucas-dev/mcp-gwork`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting smart gateway fallback.

---

## 4. Configuration

The underlying MCP servers consumed by this plugin require the following environment variables:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Yes | Service Account JSON credentials for Google Cloud APIs. |
| `GOOGLE_DRIVE_ROOT_FOLDER_ID` | Optional | Default Google Drive root folder identifier for scoped writes. |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |
| `CORTEX_PROBE_TIMEOUT_MS` | Optional | Smart gateway probe timeout in milliseconds (defaults to `300`). |

---

## 5. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/gwork" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-gwork
```

### Claude Code

```bash
/plugin install gwork@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to search or organize Google Drive, synthesize Google Sheets workbooks for AppSheet, or publish formatted Google Docs, the agent MUST autonomously engage the Google Workspace skills (`gwork-drive-operator`, `gwork-sheets-architect`, `gwork-docs-architect`) and tools without waiting for explicit skill invocations from the user.
