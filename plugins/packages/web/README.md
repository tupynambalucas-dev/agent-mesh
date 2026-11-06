# Web Automation & Browsing Plugin (`@tupynambalucas-dev/plugin-web`)

Enterprise Antigravity and Claude Code domain plugin for dynamic multi-mode Playwright automation, developer desktop browser pairing, and structured web extraction.

---

## 1. Overview

`@tupynambalucas-dev/plugin-web` provides a comprehensive web interaction layer for AI agents operating within the Tupynamba Lucas agent mesh ecosystem:
- **Dynamic Multi-Mode Playwright Automation**: Managed through a sovereign launcher (`scripts/launcher.cjs`) supporting automatic browser extension pairing, headless sandboxes, native browser channels, and CDP endpoints.
- **Desktop Browser Pairing**: Connects non-intrusively to the developer's everyday browser session (Vivaldi, Google Chrome, Microsoft Edge, Brave) via the official Playwright Browser Extension bridge, preserving active logins, session cookies, and open workspaces.
- **Token-Optimized Extraction**: Semantic web scraping and markdown conversion via Firecrawl MCP, minimizing LLM context token consumption.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`browser-operator`**](./skills/browser-operator/SKILL.md) | Automates browser sessions, page navigation, form interactions, UI clicking, dialog handling, and screenshot capture using Playwright MCP. | `playwright` MCP server (`browser_*`). |
| [**`browser-auditor`**](./skills/browser-auditor/SKILL.md) | Inspects and pairs with the developer's active desktop browser session (via Extension bridge or CDP loopback) to troubleshoot live errors without restarting processes. | `playwright` MCP server (`browser_*`). |
| [**`web-extractor`**](./skills/web-extractor/SKILL.md) | Scrapes web pages, maps domain hierarchies, and extracts clean markdown using Firecrawl MCP. | `firecrawl` MCP server (`scrape`, `crawl`, `map`). |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, multi-mode standards (extension pairing vs headless), snapshot navigation, settle timeouts, and Autonomous Domain Mandate.
- [scripts/launcher.cjs](./scripts/launcher.cjs): Sovereign plugin MCP launcher managing dynamic Playwright modes and Firecrawl execution.
- [skills/browser-operator/SKILL.md](./skills/browser-operator/SKILL.md): Playwright browser automation procedures.
- [skills/browser-auditor/SKILL.md](./skills/browser-auditor/SKILL.md): Non-intrusive desktop pairing procedures.
- [skills/web-extractor/SKILL.md](./skills/web-extractor/SKILL.md): Web scraping and markdown extraction runbook.
- [references/playwright-mcp-tool-catalog.md](./references/playwright-mcp-tool-catalog.md): Complete Playwright MCP tool parameter and return type catalog.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings routing `playwright` and `firecrawl` through `launcher.cjs`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting `launcher.cjs` with cluster gateway failover.

---

## 4. Configuration & Playwright Modes

The plugin dynamically configures Playwright based on environment variables loaded in cascade from `.env`:

| Variable | Default | Allowed Values | Description |
| :--- | :--- | :--- | :--- |
| `PLAYWRIGHT_MODE` | `auto` | `auto`, `extension`, `headless`, `channel`, `cdp` | Execution mode selector. `auto` engages `extension` when a token exists, otherwise falling back to `headless`. |
| `PLAYWRIGHT_MCP_EXTENSION_TOKEN` | *(none)* | String (43 chars) | Security token displayed in the Playwright Browser Extension to bypass manual connection prompts. |
| `PLAYWRIGHT_MCP_EXECUTABLE_PATH` | *(auto)* | Filesystem path | Explicit browser executable path (e.g. `C:\Users\...\Vivaldi\Application\vivaldi.exe`). |
| `PLAYWRIGHT_CHANNEL` | `chrome` | `chrome`, `msedge`, `vivaldi`, `chromium` | Target browser engine channel for channel mode. |
| `PLAYWRIGHT_HEADLESS` | `false` | `true`, `false` | Headless flag for channel and standalone runs. |
| `PLAYWRIGHT_CDP_URL` | `http://localhost:9222` | URL | Remote debugging endpoint for CDP mode. |
| `FIRECRAWL_API_KEY` | *(none)* | String | API key for Firecrawl web scraping. |
| `MESH_PROFILE` | `local` | `local`, `cluster` | `local` spawns stdio processes; `cluster` routes through Cortex Gateway. |

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

### Claude Code

```bash
/plugin install web@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to browse web pages, automate browser tasks, fill forms, inspect live web interfaces, test web applications, or pair with the developer's desktop browser, the agent MUST autonomously engage the Web skills (`browser-operator`, `browser-auditor`, `web-extractor`) and tools (`browser_*`, `scrape`) without waiting for explicit skill invocations from the user.
