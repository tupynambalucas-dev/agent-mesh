---
name: browser-automator
description: Automates browser sessions, page navigation, form interactions, UI clicking, dialog handling, and screenshot capture using Playwright MCP. Trigger when interacting with web applications, inspecting live interfaces, or running end-to-end visual flows.
---

# Browser Automator

This skill guides interactive and automated browser workflows using the **Playwright MCP Server** (`playwright`).

---

## 1. When to Use

Activate this skill when:
- Interacting with dynamic web applications or SaaS portals (e.g. AppSheet Studio, Google Cloud Console, GitHub Web UI).
- Clicking buttons, selecting dropdown options, filling input fields, and submitting forms.
- Capturing screenshots (`browser_take_screenshot`) or DOM accessibility trees (`browser_snapshot`) for visual verification.
- Evaluating JavaScript expressions inside the browser context (`browser_evaluate`).

Do NOT activate this skill when:
- Retrieving static or article content where visual rendering is unnecessary (use `web-scraper` or `documentation-researcher`).
- Querying structured APIs directly (use HTTP client tools or dedicated domain MCPs).

---

## 2. Operational Workflows

### Workflow A: Navigation and Snapshot
```json
// Step 1: Navigate to target URL
{
  "tool": "browser_navigate",
  "arguments": {
    "url": "https://www.appsheet.com/Template/AppDef?appName=MyEnterpriseApp"
  }
}

// Step 2: Capture page state snapshot
{
  "tool": "browser_snapshot",
  "arguments": {}
}
```

### Workflow B: Form Filling and Interaction
```json
// Step 1: Fill form field
{
  "tool": "browser_type",
  "arguments": {
    "selector": "input#search-box",
    "text": "Production Orders"
  }
}

// Step 2: Click submit or confirmation button
{
  "tool": "browser_click",
  "arguments": {
    "selector": "button[type='submit']"
  }
}

// Step 3: Wait for network to settle
{
  "tool": "browser_wait_for",
  "arguments": {
    "selector": ".results-table",
    "timeout": 5000
  }
}
```

### Workflow C: Visual Verification via Screenshot
```json
{
  "tool": "browser_take_screenshot",
  "arguments": {
    "fullPage": true
  }
}
```

---

## 3. Best Practices

- Always capture a `browser_snapshot` after navigation to identify stable selectors and element bounds.
- Use `browser_wait_for` after actions that trigger asynchronous frontend transitions.
- Handle modal dialogs proactively via `browser_handle_dialog` before clicking trigger elements.
