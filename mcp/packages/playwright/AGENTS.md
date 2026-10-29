<context-hierarchy>
  <parent src="../../AGENTS.md" type="bounded-context-rules" />
  <parent src="../../../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the @tupynambalucas-dev/agent-mcp-playwright package context. If you have not read the parent mcp/AGENTS.md and root AGENTS.md in this session, read them first.
  </system-instruction>
</context-hierarchy>

# Playwright MCP Server Agent Context (`@tupynambalucas-dev/agent-mcp-playwright`)

This bounded context encapsulates the in-house Model Context Protocol server providing sovereign browser automation, multi-platform desktop pairing via Extension Bridge, and headless containerized execution.

## Directory Layout

- [src/bin.ts](./src/bin.ts): Stdio transport entrypoint executing the MCP server over standard input/output.
- [src/index.ts](./src/index.ts): Fastify Streamable HTTP transport entrypoint serving `/mcp` on port `8080`.
- [src/config.ts](./src/config.ts): Configuration schema via Zod (`PLAYWRIGHT_MODE`, `PLAYWRIGHT_CHANNEL`, `PLAYWRIGHT_MCP_EXTENSION_TOKEN`).
- [src/browser/session-manager.ts](./src/browser/session-manager.ts): Universal session manager supporting Extension Bridge, OS Channel resolution, CDP loopback, and Headless sandbox.
- [src/tools/](./src/tools/): Complete browser tool catalog:
  - `browser_navigate`, `browser_navigate_back`, `browser_tabs`, `browser_close`
  - `browser_snapshot` (ARIA accessibility tree), `browser_take_screenshot`, `browser_find`, `browser_inspect_active_tab`
  - `browser_click`, `browser_type`, `browser_fill_form`, `browser_hover`, `browser_select_option`, `browser_press_key`
  - `browser_evaluate`, `browser_wait_for`, `browser_resize`
- [references/](./references/): Official upstream documentation and architecture specifications:
  - [playwright-mcp-official-overview.md](./references/playwright-mcp-official-overview.md)
  - [playwright-mcp-extension-bridge-and-token-spec.md](./references/playwright-mcp-extension-bridge-and-token-spec.md)
  - [playwright-mcp-cli-flags-and-capabilities.md](./references/playwright-mcp-cli-flags-and-capabilities.md)
- [README.md](./README.md): Architecture, features, and setup documentation.

## Architecture & Conventions

1. **Dual Transport**: Supports Fastify Streamable HTTP on `:8080` and Stdio CLI via `dist/bin.js`.
2. **Four-Tier Session Resolution**:
   - `extension`: Connects directly to the developer's everyday browser window using the official Playwright Browser Extension.
   - `channel`: Dynamically locates and launches the user's installed browser without hardcoded filesystem paths.
   - `cdp`: Attaches to an active remote debugging endpoint (`http://localhost:9222`).
   - `headless`: Launches an isolated Chromium sandbox for background automation and CI/CD pipelines.
3. **Accessibility-First Precision**: Interacts through the browser ARIA tree via `browser_snapshot`, saving >80% tokens compared to vision models.

## Operational Guardrails

- MUST route all logging to `process.stderr`. Never output debug information to `process.stdout`.
- MUST use relative links and zero hardcoded paths across all modules and documentation.
- Pass `PLAYWRIGHT_MCP_EXTENSION_TOKEN` during handshake to bypass the browser approval prompt automatically.

## Required Skills

- **`browser-automator`**: Active when executing automated browser sessions, form fills, and navigation.
- **`browser-desktop-inspector`**: Active when pairing with the developer's open browser session.
