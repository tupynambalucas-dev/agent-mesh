# AppSheet Studio UI Playwright Selectors & Automation Runbook

This reference provides selectors, navigation targets, and step-by-step procedures for automating AppSheet Studio UI workflows using Playwright MCP.

---

## 1. Core URLs

- **App Initialization URL**:
  `https://www.appsheet.com/start/initialize?docId={spreadsheetId}&appName={appName}`
- **Editor Direct URL**:
  `https://www.appsheet.com/Template/AppDef?appName={appId}`

---

## 2. Key Automation Selectors

### Navigation Sidebar
- **Data Section**: `nav button[data-cy="nav-data"]` or `a[href*="Data"]`
- **Views Section**: `nav button[data-cy="nav-views"]` or `a[href*="Views"]`
- **Actions Section**: `nav button[data-cy="nav-actions"]` or `a[href*="Actions"]`
- **Settings Section**: `nav button[data-cy="nav-settings"]` or `a[href*="Settings"]`

### Schema Regeneration
When new columns are added to the backing Google Sheet:
1. Navigate to Data section.
2. Select target table in left pane: `div[role="treeitem"]:has-text("{tableName}")`
3. Click "Table Settings" or menu trigger: `button[aria-label="Table settings"]`
4. Click "Regenerate Structure": `button:has-text("Regenerate Structure")`
5. Confirm modal dialog: `button:has-text("Are you sure?"):has-text("Regenerate")`
6. Wait for toast notification: `div[role="status"]:has-text("Structure regenerated")`

### Save & Verify
- **Save Button**: `button[data-cy="save-button"]` or `button:has-text("Save")`
- **Save Status Indicator**: `div[data-cy="sync-status"]:has-text("Synced")`

---

## 3. Best Practices for Headless Playwright Sessions

- Use `browser_snapshot` with `boxes: true` to discover current element references before clicking.
- Always check for the cookie banner (`button#onetrust-accept-btn-handler` or similar) and dismiss it via `browser_click`.
- Use `browser_wait_for` after triggering schema regeneration to prevent race conditions during save.
