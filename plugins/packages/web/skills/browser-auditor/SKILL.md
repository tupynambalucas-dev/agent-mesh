---
name: browser-auditor
description: Inspects and pairs with the developer's active desktop browser session (via Playwright Extension or CDP loopback) to troubleshoot live errors, verify open tabs, evaluate forms, and assist visually without restarting browser processes.
---

# Browser Desktop Inspector

Pairs interactively with the developer's active daily-driver browser session (Vivaldi, Google Chrome, Microsoft Edge, Brave) using **`@tupynambalucas-dev/mcp-playwright`**.

---

## 1. When to Use

Activate this skill when:
- The developer asks to inspect what is currently on their screen or in their open browser tabs.
- Diagnosing errors on live authenticated pages (GitHub App configurations, AWS/GCP cloud consoles, internal portals).
- Answering questions about forms, visual layouts, or DOM state without requiring the developer to take manual screenshots.
- Verifying the active tab structure, title, or accessibility hierarchy.

Do NOT activate this skill when:
- Running background batch jobs, automated regression suites, or CI/CD pipelines (use `browser-automator`).
- Performing headless AppSheet Studio schema generation (use `appsheet-ui-designer`).

---

## 2. Operational Workflows

### Workflow A: Active Tab Inspection
```json
// Step 1: Capture state and structure of the currently active tab
{
  "tool": "browser_inspect_active_tab",
  "arguments": {}
}

// Step 2: Inquire about specific elements or inspect accessibility tree
{
  "tool": "browser_snapshot",
  "arguments": {
    "boxes": true
  }
}
```

### Workflow B: Multi-Tab Coordination
```json
// Step 1: List all open tabs in the developer's session
{
  "tool": "browser_tabs",
  "arguments": {
    "action": "list"
  }
}

// Step 2: Switch context to the target tab
{
  "tool": "browser_tabs",
  "arguments": {
    "action": "select",
    "index": 1
  }
}
```

### Workflow C: Live Diagnostic Evaluation
```json
// Evaluate JavaScript expression in active page
{
  "tool": "browser_evaluate",
  "arguments": {
    "expression": "document.title"
  }
}
```

---

## 3. Governance Constraints

1. **Non-Intrusive Invariant**: Never close or navigate away from the developer's active tabs unless explicitly instructed by the user.
2. **Safe Detachment**: Always use `browser_close` to disconnect the MCP session; this drops the connection without terminating the developer's browser process.
3. **Accessibility First**: Prioritize structured ARIA/accessibility snapshots (`browser_snapshot`) over heavy full-page screenshot payloads.
