# How to Pair Desktop Browsers with Playwright MCP

This guide explains how to connect `@tupynambalucas-dev/mcp-playwright` and the `browser-auditor` skill directly to an active developer desktop browser session (Chrome, Edge, Brave, or Vivaldi) without closing user tabs or disrupting work.

---

## Architecture: Dual-Mode Operation

The in-house Playwright MCP server operates in two distinct modes:
1. **Headless Mode (`browser-operator`)**: Launches an isolated headless Chromium process for automated synthetic tests and form submissions.
2. **Desktop Pairing Mode (`browser-auditor`)**: Attaches non-intrusively to the developer's live browser window via Chrome DevTools Protocol (CDP) or the Playwright Extension bridge.

---

## Method A: Chrome DevTools Protocol (CDP Loopback)

### 1. Launch Browser with Remote Debugging

Close all running instances of your browser and launch it with the remote debugging port enabled:

#### Google Chrome (Windows)
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

#### Google Chrome (macOS)
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

#### Brave Browser
```bash
brave --remote-debugging-port=9222
```

### 2. Verify Port Availability

Confirm that the browser CDP endpoint is listening:

```bash
curl http://localhost:9222/json/version
```

### 3. Connect via MCP

In `plugins/packages/web/mcp_config.json`, the Playwright MCP server automatically detects `CDP_PORT=9222` or `http://localhost:9222` and binds to the active tab without launching a secondary browser window.

---

## Method B: Playwright Extension Bridge (Zero Launch Flag)

When launching with `--remote-debugging-port` is restricted by corporate enterprise policies:

1. Install the official Playwright MCP Extension in Chrome Web Store.
2. The extension bridge exposes an ephemeral WebSocket channel on localhost.
3. The server inherits `PLAYWRIGHT_MCP_EXTENSION_TOKEN` from the session environment or `.env`.
4. When `browser_tabs` is invoked, the agent inspects active open tabs and pairs immediately.

---

## Verifying the Active Session

Trigger the `browser-auditor` skill or execute `browser_tabs` via Playwright MCP:

```json
{
  "method": "tools/call",
  "params": {
    "name": "browser_tabs",
    "arguments": {}
  }
}
```

The server returns an array of currently open tabs with `tabId`, `title`, and `url`.

---

## Related References

- [Browser Automation & Extension Bridge Architecture](../explanation/browser-automation-and-extension-bridge.md)
- [MCP Server Catalog](../reference/mcp-server-catalog.md)
