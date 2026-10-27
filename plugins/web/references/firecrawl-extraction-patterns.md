# Firecrawl Extraction & Web Scraping Patterns

Reference guide for extracting high-fidelity content and mapping domain structures using `cortex-firecrawl`.

---

## 1. Clean Markdown Scraping Pattern
```json
{
  "tool": "scrape",
  "arguments": {
    "url": "https://example.com/blog/article",
    "formats": ["markdown"],
    "onlyMainContent": true,
    "waitFor": 1500
  }
}
```

---

## 2. Multi-Page Documentation Ingestion Pattern
1. **Map Exploration**:
   ```json
   {
     "tool": "map",
     "arguments": {
       "url": "https://docs.example.com",
       "search": "guides",
       "limit": 20
     }
   }
   ```
2. **Selective Batch Scraping**:
   Feed discovered URLs into `scrape` individually or through `batch_scrape`.
