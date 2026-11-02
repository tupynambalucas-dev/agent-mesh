# How to Consume Plugins in Antigravity and Claude Code

This guide provides practical instructions for integrating and consuming `agent-mesh` domain plugins across different environments: local monorepos orchestrated via Mani, global workstation installations, and Anthropic Claude Code sessions.

---

## Scenario A: Local Monorepo Integration (Inside `org-core`)

When operating within the `org-core` multi-repository workspace, plugins are discovered directly from local disk with zero network latency.

### 1. Load All Domain Plugins Simultaneously

In the root of the consumer repository (e.g., `platform` or `docs`), create or update `.agents/plugins.json`:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages"
    }
  ]
}
```

*Mechanism*: Antigravity inspects `entries` paths **one level deep**. Referencing `agent-mesh/plugins/packages` discovers all 10 domain plugins and loads their skills, rules, and scoped MCP configurations.

### 2. Selectively Load Specific Domain Plugins

To minimize context window token consumption during targeted tasks, specify plugins using `include_only`:

```json
{
  "entries": [
    {
      "path": "agent-mesh/plugins/packages",
      "include_only": ["github-flow", "secrets", "atelier"]
    }
  ]
}
```

### 3. Direct Plugin Path Declarations

Alternatively, point directly to individual plugin packages:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/docusaurus" },
    { "path": "agent-mesh/plugins/packages/atelier" }
  ]
}
```

---

## Scenario B: Standalone Workstation Installation (Outside `org-core`)

When working in an isolated project without a local clone of `agent-mesh`:

### 1. Global Installation via Antigravity CLI

Install domain plugins directly into the developer's user configuration directory:

```bash
# Install individual domain plugin globally
agy plugin install @tupynambalucas-dev/plugin-github-org

# Or install directly from the remote GitHub repository:
agy plugin install https://github.com/tupynambalucas-dev/agent-mesh --path plugins/packages/github-flow
```

---

## Scenario C: Anthropic Claude Code Integration

The `agent-mesh` repository includes a canonical marketplace manifest at `.claude-plugin/marketplace.json`.

### 1. Register the Enterprise Marketplace

Register the marketplace in your Claude Code CLI:

```bash
/plugin marketplace add tupynambalucas-dev/agent-mesh
```

### 2. Install Individual Domain Plugins

Selectively install domain plugins into your Claude Code session:

```bash
/plugin install github-org@tupynambalucas-dev
/plugin install secrets@tupynambalucas-dev
/plugin install atelier@tupynambalucas-dev
```

---

## Scenario D: Direct CLI Execution of MCP Servers

MCP servers can be spawned on-demand in any terminal or script using `pnpm dlx` or `npx`:

```bash
# Execute Infisical MCP server over stdio
pnpm dlx @tupynambalucas-dev/mcp-infisical

# Execute Firecrawl MCP server over stdio
pnpm dlx @tupynambalucas-dev/mcp-firecrawl

# Execute Google Workspace MCP server over stdio
pnpm dlx @tupynambalucas-dev/mcp-gwork
```

---

## Related References

- [Domain Plugin Catalog](../reference/domain-plugin-catalog.md)
- [MCP Server Catalog](../reference/mcp-server-catalog.md)
