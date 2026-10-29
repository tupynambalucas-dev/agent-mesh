---
trigger: always_on
---

# Research Domain Rules

0. Autonomous Domain Mandate:
   - When requested to research, look up, search, find documentation, check APIs, verify types, explore upstream libraries, or examine web pages, the agent MUST autonomously engage the Research skills (`documentation-researcher`, `web-deep-researcher`) and tools (`context7` via `resolve-library-id` / `query-docs`, and `cortex-firecrawl` via `search` / `scrape` / `crawl` / `map`).
   - The agent MUST NOT wait for the user to explicitly state "Use Context7" or "Use Firecrawl". Having this plugin loaded constitutes an explicit mandate to autonomously resolve upstream technical documentation and web resources proactively.

1. Source Attribution Invariant:
   - Every fact, API method, and syntax specification retrieved via Context7 or Firecrawl MUST cite its canonical source (URL or library identifier).

2. Token-Conservation Scraping:
   - When scraping with Firecrawl, always enable `onlyMainContent: true` to strip navigation bars, headers, and advertisements.
   - Run `map` exploration before executing multi-page `crawl` jobs to avoid fetching unneeded subtrees.

3. Zero Speculative APIs:
   - Never speculate on library function parameters or type definitions when Context7 can provide the exact upstream signature.
   - If a library is not found in Context7, state this explicitly before resorting to general web search.

4. Zero-Emoji Invariant:
   - Emojis are strictly prohibited in research reports, documentation summaries, and comparative benchmarks.
