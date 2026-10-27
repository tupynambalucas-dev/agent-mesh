# Research Domain Plugin (`@tupynambalucas-dev/agent-plugin-research`)

Enterprise Antigravity and Claude Code plugin for live technical documentation retrieval, API schema validation, and deep web research powered by **Upstash Context7** and **Firecrawl**.

---

## 1. Capabilities

- **Real-Time Documentation Lookup**: Queries official documentation, types, and SDK signatures for thousands of libraries and frameworks via Upstash Context7.
- **Deep Web Scraping & Crawling**: Converts web pages and documentation sites into clean, LLM-ready markdown using Firecrawl.
- **Sitemap & URL Mapping**: Discovers site structure and relevant sub-paths using Firecrawl mapping.
- **Zero-Downtime Fallback**: Operates via cluster Envoy AgentGateway or falls back locally via `mcp-gateway-router.js`.

---

## 2. Included Skills

- **`documentation-researcher`**: Specializes in resolving library IDs and retrieving contextual framework documentation via Context7.
- **`web-deep-researcher`**: Specializes in scraping, crawling, and extracting web content via Firecrawl.

---

## 3. Included MCP Servers

- **`cortex-firecrawl`**: High-performance web scraping and markdown extraction (`mcp/firecrawl`).
- **`context7`**: Real-time framework and package documentation search (`@upstash/context7-mcp`).
