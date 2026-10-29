<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/mcp-memory package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# Memory MCP Server Agent Context (`@tupynambalucas-dev/mcp-memory`)

This bounded context encapsulates the in-house Model Context Protocol server providing semantic RAG vector search, episodic chat history, knowledge graph traversal, and document ingestion.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint serving `/mcp` on port `8080`.
- [src/config.ts](./src/config.ts): Configuration schema via Zod (`MEMORY_API_URL`, `CORTEX_GATEWAY_URL`).
- [src/client/memory-api.client.ts](./src/client/memory-api.client.ts): HTTP client delegating requests to the downstream `memory-api` service.
- [src/tools/search.tool.ts](./src/tools/search.tool.ts): `search_knowledge` - RAG vector similarity search over indexed documentation.
- [src/tools/episodic.tool.ts](./src/tools/episodic.tool.ts): `store_episodic` - Conversation turn persistence.
- [src/tools/graph.tool.ts](./src/tools/graph.tool.ts): `query_graph` - Knowledge graph entity traversal.
- [src/tools/ingest.tool.ts](./src/tools/ingest.tool.ts): `ingest_document` - Document ingestion and re-indexing pipeline trigger.
- [README.md](./README.md): Architecture, tools, and transport documentation.

## Operational Guardrails

- MUST route all logging to `process.stderr`. Never output debug information to `process.stdout`.
- MUST validate all incoming parameters with strict Zod schemas before issuing API calls.

## Required Skills

- **`documentation-researcher`**: Active when querying semantic knowledge and cross-repository references.
