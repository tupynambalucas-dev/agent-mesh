---
name: web-extractor
description: Scrapes web pages, maps domain hierarchies, and extracts clean markdown using Firecrawl MCP. Trigger when extracting content from web pages, blogs, and public portals.
---

# Web Scraper

Guides the scraping, crawling, and structured extraction of web content into clean Markdown using the **Firecrawl MCP Server** (`cortex-firecrawl`).

---

## 1. When to Use

Activate this skill when:
- Scraping an external web page or article into clean Markdown format.
- Mapping links and sub-routes on a target web domain.
- Performing structured data extraction from public websites.

Do NOT activate this skill when:
- Querying structured library and framework documentation (use `documentation-researcher` with Context7).
- Interacting with forms, buttons, or authenticated UI flows (use `browser-automator`).

---

## 2. Operational Workflows

### Workflow A: Single Page Scraping
```json
{
  "tool": "scrape",
  "arguments": {
    "url": "https://example.com/blog/article",
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

## 3. Reference Links

- [Firecrawl Extraction Patterns](../../references/firecrawl-extraction-patterns.md)
- [Web Domain Rules](../../rules/AGENTS.md)
