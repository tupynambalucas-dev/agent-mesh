---
name: appsheet-ui-architect
description: Models and validates UI/UX configurations including deck views, table views, form views, card views, and conditional format rules, and automates AppSheet Studio via Playwright.
---

# AppSheet UI Designer

Guides the configuration, styling, and headless automation of user interfaces in Google AppSheet applications.

---

## 1. When to Use

Activate this skill when:
- Designing view hierarchies (Deck, Table, Gallery, Detail, Form, Card, Calendar, Map).
- Defining conditional Format Rules (text colors, highlight icons, badges).
- Automating AppSheet Studio UI tasks via Playwright MCP (`browser_*` tools), such as Schema Regeneration (`Data > Tables > Regenerate Structure`) or branding customization.

---

## 2. Operational Workflows

### Workflow A: Semantic Schema-Driven UI Conventions
AppSheet automatically constructs rich UI elements when backing columns adhere to standard conventions:
- `Photo`, `Image` -> Displays rich thumbnail and header banners.
- `LatLong` -> Generates interactive Google Maps pins and route navigators.
- `Percent` -> Renders animated progress bars and completion meters.
- `Enum` -> Renders interactive button chips or dropdown pickers.

### Workflow B: Headless Studio Automation via Playwright
When schema structure or view definitions need automated updates in the AppSheet console:

```json
// Step 1: Navigate to AppSheet Studio
{
  "tool": "browser_navigate",
  "arguments": {
    "url": "https://www.appsheet.com/Template/AppDef?appName=YOUR_APP_ID#Data.Tables"
  }
}

// Step 2: Take snapshot to locate table element
{
  "tool": "browser_snapshot",
  "arguments": { "boxes": true }
}

// Step 3: Click Regenerate Structure button
{
  "tool": "browser_click",
  "arguments": {
    "selector": "button:has-text('Regenerate Structure')"
  }
}

// Step 4: Confirm dialog and wait for sync
{
  "tool": "browser_wait_for",
  "arguments": {
    "selector": "div[role='status']:has-text('Structure regenerated')",
    "timeout": 15000
  }
}
```

---

## 3. Reference Links

- [AppSheet Studio UI Playwright Selectors](../../references/studio-ui-playwright-selectors.md)
- [Data Types & Expressions Reference](../../references/type-mapping-and-expressions.md)
