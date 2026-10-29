# Web Domain Plugin (`@tupynambalucas-dev/agent-plugin-web`)

Enterprise Antigravity and Claude Code plugin for headless browser automation, UI testing, form interaction, visual auditing, and web scraping powered by **Playwright** and **Firecrawl**.

---

## 1. Capabilities

- **Interactive Browser Automation**: Navigates URLs, fills forms, clicks buttons, handles modal dialogs, and takes full-page screenshots via Playwright MCP.
- **Deep Web Scraping**: Extracts clean, LLM-ready markdown from web pages and crawls document trees via Firecrawl MCP.
- **Zero-Downtime Smart Routing**: Dispatches requests through cluster Envoy AgentGateway or falls back to local execution.

---

## 2. Included Skills

- **`browser-desktop-inspector`**: Pairs interactively with the developer's live desktop browser session (Vivaldi, Chrome, Edge) to troubleshoot active tabs, inspect live errors, and evaluate forms.
- **`browser-automator`**: Orchestrates autonomous headless browser workflows, screen snapshots, form interactions, and visual UI audits.
- **`web-scraper`**: Extracts web content, converts HTML to clean markdown, and maps site structures using Firecrawl.

---

## 3. Included MCP Servers

- **`playwright`**: Sovereign universal browser automation and desktop pairing engine (`@tupynambalucas-dev/agent-mcp-playwright`).
- **`cortex-firecrawl`**: Web scraping and crawl extraction (`@tupynambalucas-dev/agent-mcp-firecrawl`).
