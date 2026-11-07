<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-firecrawl package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# Firecrawl MCP Server Agent Context (`@tupynambalucas-dev/mcp-firecrawl`)

This bounded context encapsulates the in-house Model Context Protocol server providing deep web scraping, domain mapping, and crawl automation via Firecrawl.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint serving `/mcp` on port `8080`.
- [src/config.ts](./src/config.ts): Configuration and environment validation via Zod (`FIRECRAWL_API_KEY`).
- [src/tools/scrape.tool.ts](./src/tools/scrape.tool.ts): `scrape` - Single URL markdown and HTML extractor.
- [src/tools/crawl.tool.ts](./src/tools/crawl.tool.ts): `crawl` - Recursive subpage crawler.
- [src/tools/search.tool.ts](./src/tools/search.tool.ts): `search` - Live web search with markdown page synthesis.
- [src/tools/map.tool.ts](./src/tools/map.tool.ts): `map` - Domain sitemap and URL exploration.
- [src/tools/extract.tool.ts](./src/tools/extract.tool.ts): `extract` - Structured schema-driven data extractor.
- [src/tools/batch-scrape.tool.ts](./src/tools/batch-scrape.tool.ts): `batch_scrape` - Multi-URL parallel scraping.
- [README.md](./README.md): Developer architecture, transport, and tools reference.

## Operational Guardrails

- MUST route all logging to `process.stderr`. Never output debug information to `process.stdout`.
- MUST enable `onlyMainContent: true` by default in scraping tools to strip headers and reduce token footprint.
- MUST validate all incoming parameters with strict Zod schemas before issuing API calls.

## Required Skills

- **`web-deep-researcher`**: Active when performing deep web crawling, site mapping, and research.
- **`web-extractor`**: Active when scraping individual URLs into markdown format.
