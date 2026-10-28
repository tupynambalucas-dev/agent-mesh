---
trigger: always_on
---

# Web Domain Rules

1. Headless Automation Standard:
   - All browser operations via Playwright MCP MUST run in headless mode without requiring active screen display.

2. Snapshot-Driven Navigation:
   - Prefer `browser_snapshot` with accessibility tree and bounding boxes (`boxes: true`) over blind coordinate clicks.
   - Use stable attributes (`data-testid`, `role`, accessible label) when selecting interactive elements.

3. Settle and Timeout Discipline:
   - After invoking actions that trigger DOM mutations or page reloads (`browser_click`, `browser_fill_form`), always wait for network settle via `browser_wait_for`.
   - Never use static sleep timers; use selector-based wait conditions.

4. Dialog and Banner Dismissal:
   - Automatically handle and dismiss alert dialogs, modal popups, and cookie consent notices (`browser_handle_dialog`, `browser_click`) to prevent blocking subsequent actions.

5. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across scraped summaries and test reports.
