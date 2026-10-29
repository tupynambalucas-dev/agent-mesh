# Research Domain Plugin (`@tupynambalucas-dev/plugin-research`)

Enterprise Antigravity and Claude Code domain plugin for autonomous technical research, official SDK/API documentation retrieval via Context7, and deep web exploration via Firecrawl.

---

## 1. Overview

`@tupynambalucas-dev/plugin-research` eliminates speculative coding by providing direct, automated access to official framework documentation, live library API signatures, and deep web extraction.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`documentation-researcher`**](./skills/documentation-researcher/SKILL.md) | Queries live, official framework and library documentation, APIs, types, and release changes using Context7. | `context7` MCP server (`resolve-library-id`, `query-docs`). |
| [**`web-deep-researcher`**](./skills/web-deep-researcher/SKILL.md) | Executes deep web scraping, crawling, site mapping, and structured markdown extraction using Firecrawl. | `firecrawl` MCP server (`search`, `scrape`, `crawl`, `map`). |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, source attribution invariant, token-conservation scraping, zero speculative APIs, and Autonomous Domain Mandate.
- [skills/documentation-researcher/SKILL.md](./skills/documentation-researcher/SKILL.md): Live documentation lookup workflow and Context7 procedures.
- [skills/web-deep-researcher/SKILL.md](./skills/web-deep-researcher/SKILL.md): Deep web crawling, mapping, and markdown extraction workflows.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for `@upstash/context7-mcp` and `@tupynambalucas-dev/mcp-firecrawl`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting smart gateway fallback.

---

## 4. Configuration

The underlying MCP servers consumed by this plugin require the following environment variables:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `FIRECRAWL_API_KEY` | Optional (if local Firecrawl offline) | Firecrawl Cloud API key for web search and scraping. |
| `FIRECRAWL_API_URL` | Optional | Custom Firecrawl instance URL (defaults to cloud API). |
| `CONTEXT7_API_KEY` | Optional | Upstash Context7 API key if querying beyond public rate limits. |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |
| `CORTEX_PROBE_TIMEOUT_MS` | Optional | Smart gateway probe timeout in milliseconds (defaults to `300`). |

---

## 5. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/research" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-research
```

### Claude Code

```bash
/plugin install research@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to research, look up, search, find documentation, check APIs, verify types, explore upstream libraries, or examine web pages, the agent MUST autonomously engage the Research skills (`documentation-researcher`, `web-deep-researcher`) and tools (`context7` via `resolve-library-id` / `query-docs`, and `firecrawl` via `search` / `scrape` / `crawl` / `map`) without waiting for explicit tool invocations from the user.
