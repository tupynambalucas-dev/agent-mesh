---
name: web-scraper
description: Scrapes web pages, maps domain hierarchies, and extracts clean markdown using Firecrawl MCP. Trigger when extracting content from web pages, blogs, and public portals.
---

# Web Scraper

This skill guides the scraping and structured extraction of web pages into clean Markdown using the **Firecrawl MCP Server** (`cortex-firecrawl`).

---

## 1. When to Use

Activate this skill when:
- Scraping an external web page or article into clean Markdown format.
- Mapping links and sub-routes on a target web domain.
- Performing structured data extraction from public websites.

---

## 2. Operational Workflows

### Workflow A: Single Page Scraping
```json
{
  "tool": "scrape",
  "arguments": {
    "url": "https://example.com/blog/article-name",
    "formats": ["markdown"],
    "onlyMainContent": true
  }
}
```

### Workflow B: Domain Exploration
```json
{
  "tool": "map",
  "arguments": {
    "url": "https://example.com",
    "search": "pricing"
  }
}
```

---

## 3. Best Practices

- Use `onlyMainContent: true` to eliminate unwanted boilerplate and navigation bars.
- Use `map` to inspect target structure before triggering multi-page extractions.
