# Playwright MCP CLI Flags & Capability Groups Reference

Official reference of command-line flags, environment configurations, and capability extensions for Playwright MCP implementations.

---

## 1. Primary Command-Line Arguments

| Flag | Argument Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `--extension` | Boolean flag | `false` | Connects to the developer's running browser instance via the Playwright Extension bridge rather than spawning a fresh subprocess. |
| `--headless` | Boolean flag | `false` | Runs the browser in headless mode without a visible window. Default is headed so users can observe automation. |
| `--browser` | String | `chrome` | Browser engine to launch: `chrome`, `firefox`, `webkit`, `msedge`. |
| `--channel` | String | *(none)* | Native system channel: `chrome`, `msedge`, `chrome-beta`, `chrome-canary`. Dynamically resolved via OS registry without hardcoded paths. |
| `--port` | Number | `8080` | Port number for Fastify Streamable HTTP transport or standalone daemon server. |
| `--host` | String | `0.0.0.0` | Network interface binding address. |
| `--cdp-endpoint` | String / URL | *(none)* | Pre-configured CDP endpoint URL (e.g. `http://localhost:9222`) or channel identifier (`chrome`). |
| `--device` | String | *(none)* | Emulate specific device descriptor from Playwright registry (e.g. `iPhone 15`, `Pixel 7`). |
| `--viewport-size` | String `WxH` | `1280x720` | Browser window viewport dimensions. |
| `--caps` | Comma-delimited list | `core` | Enables optional tool capability groupings beyond the standard toolset. |

---

## 2. Capability Groups (`--caps`)

Playwright MCP modularizes advanced tools behind capability flags to keep LLM context token consumption minimal:

| Capability Group | Enabled Tools | Primary Use Case |
| :--- | :--- | :--- |
| **`core`** *(Default)* | `browser_navigate`, `browser_click`, `browser_type`, `browser_snapshot`, `browser_tabs` | Standard interactive web browsing and semantic page interaction. |
| **`vision`** | `browser_take_screenshot` (full-page / element) | Multi-modal visual comparisons and UI regression verification. |
| **`devtools`** | `browser_console_messages`, `browser_evaluate` | Inspecting JavaScript errors, console warnings, and running client DOM queries. |
| **`network`** | `browser_network_requests`, `browser_network_request` | Monitoring HTTP/WebSocket traffic, auditing status codes, and inspecting API payloads. |
| **`pdf`** | `browser_generate_pdf` | Server-side document rendering and PDF export. |
| **`storage`** | `browser_save_storage_state`, `browser_load_storage_state` | Exporting and injecting cookies and localStorage across test sessions. |

---

## 3. Environment Variable Mapping

| Environment Variable | Equivalent Flag | Description |
| :--- | :--- | :--- |
| `PLAYWRIGHT_MCP_EXTENSION_TOKEN` | *(Extension auth)* | Secret token provided by the Playwright Extension to bypass the manual connection approval prompt. |
| `PLAYWRIGHT_MODE` | `--extension` / `--headless` | Session mode: `auto`, `extension`, `channel`, `cdp`, `headless`. |
| `PLAYWRIGHT_CHANNEL` | `--channel` | Target browser channel: `chrome`, `msedge`, `chromium`. |
| `PLAYWRIGHT_CDP_URL` | `--cdp-endpoint` | Custom remote debugging URL. Defaults to `http://localhost:9222`. |
| `PORT` | `--port` | Server HTTP port for Streamable HTTP transport. |
