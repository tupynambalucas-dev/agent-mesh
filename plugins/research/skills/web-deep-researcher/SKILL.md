---
name: web-deep-researcher
description: Executes deep web scraping, crawling, site mapping, and structured markdown extraction using Firecrawl. Trigger when researching public documentation sites, articles, technical specifications, or competitive benchmarks on the web.
---

# Web Deep Researcher

This skill guides the automated discovery, mapping, scraping, and content extraction of external websites using the **Firecrawl MCP Server** (`cortex-firecrawl`).

---

## 1. When to Use

Activate this skill when:
- Scraping a single web page or documentation article into clean, semantic Markdown.
- Discovering all URLs and structure within a target domain using site mapping.
- Crawling a documentation subtree to gather comprehensive reference material.
- Performing targeted web searches when searching for specific technical solutions or documentation pages.

Do NOT activate this skill when:
- Querying structured library and framework documentation (use `documentation-researcher` with Context7).
- Accessing local project files or internal Git repositories.

---

## 2. Operational Workflows

### Workflow A: Single Page Scraping (`scrape`)
Use when you have a specific URL and need the clean markdown representation:

```json
{
  "url": "https://example.com/docs/getting-started",
  "formats": ["markdown"],
  "onlyMainContent": true
}
```

### Workflow B: Domain Exploration (`map`)
Use to explore the navigation tree and discover relevant endpoint paths before deep scraping:

```json
{
  "url": "https://example.com/docs",
  "search": "authentication",
  "limit": 20
}
```

### Workflow C: Subtree Crawling (`crawl`)
Use when an entire section or multi-page documentation tree needs to be ingested:

```json
{
  "url": "https://example.com/docs/api",
  "limit": 10,
  "maxDepth": 2
}
```

### Workflow D: Web Search (`search`)
Use when target URLs are unknown and live search results are needed:

```json
{
  "query": "fastify streamable http mcp transport configuration",
  "limit": 5
}
```

---

## 3. Best Practices

- Prefer `onlyMainContent: true` when scraping to strip headers, footers, and advertisement navigation bars.
- Use `map` prior to initiating large `crawl` jobs to prevent unnecessary page consumption.
- Synthesize scraped output into concise markdown reports adhering to the Zero-Emoji standard.
