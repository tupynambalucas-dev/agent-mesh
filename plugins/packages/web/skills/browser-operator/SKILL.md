---
name: browser-operator
description: Automates browser sessions, page navigation, form interactions, UI clicking, dialog handling, and screenshot capture using Playwright MCP. Trigger when interacting with web applications, inspecting live interfaces, or running end-to-end visual flows.
---

# Browser Automator

Orchestrates interactive and automated browser workflows, end-to-end testing, and visual inspections using the **Playwright MCP Server** (`playwright`).

---

## 1. When to Use

Activate this skill when:
- Interacting with dynamic web applications or SaaS consoles (AppSheet Studio, Cloud Consoles, Web Portals).
- Clicking buttons, typing into fields, submitting forms, and interacting with select menus.
- Capturing screenshots (`browser_take_screenshot`) or accessibility tree snapshots (`browser_snapshot`).
- Handling alert/confirm dialogs and evaluating client-side JavaScript.

Do NOT activate this skill when:
- Retrieving static or article content where visual rendering is unnecessary (use `web-scraper` or `documentation-researcher`).
- Querying structured REST APIs directly.

---

## 2. Operational Workflows

### Workflow A: Navigation and Accessibility Inspection
```json
// Step 1: Navigate to target URL
{
  "tool": "browser_navigate",
  "arguments": {
    "url": "https://example.com/login"
  }
}

// Step 2: Capture accessibility tree snapshot
{
  "tool": "browser_snapshot",
  "arguments": {
    "boxes": true
  }
}
```

### Workflow B: Form Filling and Interaction
```json
// Step 1: Fill inputs
{
  "tool": "browser_type",
  "arguments": {
    "selector": "input#email",
    "text": "admin@example.com"
  }
}

// Step 2: Click button
{
  "tool": "browser_click",
  "arguments": {
    "selector": "button[type='submit']"
  }
}

// Step 3: Wait for navigation or element
{
  "tool": "browser_wait_for",
  "arguments": {
    "selector": ".dashboard-container",
    "timeout": 10000
  }
}
```

### Workflow C: Visual Snapshot via Full-Page Screenshot
```json
{
  "tool": "browser_take_screenshot",
  "arguments": {
    "fullPage": true
  }
}
```

---

## 3. Reference Links

- [Playwright MCP Tool Catalog Reference](../../references/playwright-mcp-tool-catalog.md)
- [Web Domain Rules](../../rules/AGENTS.md)
