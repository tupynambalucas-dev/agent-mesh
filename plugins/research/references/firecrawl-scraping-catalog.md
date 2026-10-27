# Firecrawl Scraping & Crawling Parameter Reference

The `cortex-firecrawl` MCP server provides tools to scrape, crawl, search, and map websites.

---

## 1. Tool Primitives

### `scrape`
Scrapes a single URL and converts HTML into clean Markdown:

```json
{
  "url": "https://example.com/docs/api",
  "formats": ["markdown"],
  "onlyMainContent": true,
  "waitFor": 1000
}
```

### `map`
Discovers all available URLs under a target domain or subtree:

```json
{
  "url": "https://example.com/docs",
  "search": "authentication",
  "limit": 25
}
```

### `crawl`
Initiates a multi-page crawler starting from a root URL:

```json
{
  "url": "https://example.com/docs",
  "maxDepth": 2,
  "limit": 10
}
```

### `search`
Searches the web via Firecrawl Search API:

```json
{
  "query": "Kubernetes Envoy Gateway ext_authz configuration",
  "limit": 5
}
```
