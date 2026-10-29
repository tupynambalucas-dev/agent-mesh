# Web Automation & Browsing Plugin (`@tupynambalucas-dev/plugin-web`)

Enterprise Antigravity and Claude Code domain plugin for headless web automation, developer desktop browser pairing, and structured extraction.

---

## 1. Overview

`@tupynambalucas-dev/plugin-web` provides a comprehensive web interaction layer: headless end-to-end automation with Playwright, non-intrusive desktop pairing with the developer's active browser via Chrome Extension bridge or CDP loopback, and token-optimized scraping via Firecrawl.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`browser-operator`**](./skills/browser-operator/SKILL.md) | Automates headless browser sessions, page navigation, form interactions, UI clicking, dialog handling, and screenshot capture using Playwright MCP. | `playwright` MCP server (`browser_*`). |
| [**`browser-auditor`**](./skills/browser-auditor/SKILL.md) | Inspects and pairs with the developer's active desktop browser session (via Extension bridge or CDP loopback) to troubleshoot live errors without restarting processes. | `playwright` MCP server (`browser_*`). |
| [**`web-extractor`**](./skills/web-extractor/SKILL.md) | Scrapes web pages, maps domain hierarchies, and extracts clean markdown using Firecrawl MCP. | `firecrawl` MCP server (`scrape`, `crawl`, `map`). |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, dual-mode standards (headless vs desktop pairing), snapshot navigation, settle timeouts, and Autonomous Domain Mandate.
- [skills/browser-operator/SKILL.md](./skills/browser-operator/SKILL.md): Headless Playwright browser automation procedures.
- [skills/browser-auditor/SKILL.md](./skills/browser-auditor/SKILL.md): Non-intrusive desktop pairing procedures.
- [skills/web-extractor/SKILL.md](./skills/web-extractor/SKILL.md): Web scraping and markdown extraction runbook.
- [references/playwright-mcp-tool-catalog.md](./references/playwright-mcp-tool-catalog.md): Complete Playwright MCP tool parameter and return type catalog.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for `@tupynambalucas-dev/mcp-playwright` and `@tupynambalucas-dev/mcp-firecrawl`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting smart gateway fallback.

---

## 4. Configuration

The underlying MCP servers consumed by this plugin require the following environment variables:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `PLAYWRIGHT_MCP_TOKEN` | Optional | Ephemeral bearer token for local browser pairing extension bridge. |
| `FIRECRAWL_API_KEY` | Optional | Cloud API key if upstream Firecrawl service is required. |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |
| `CORTEX_PROBE_TIMEOUT_MS` | Optional | Smart gateway probe timeout in milliseconds (defaults to `300`). |

---

## 5. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/web" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-web
```

### Claude Code

```bash
/plugin install web@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to browse web pages, automate browser tasks, fill forms, inspect live web interfaces, test web applications, or pair with the developer's desktop browser, the agent MUST autonomously engage the Web skills (`browser-operator`, `browser-auditor`, `web-extractor`) and tools (`browser_*`, `scrape`) without waiting for explicit skill invocations from the user.
