---
trigger: always_on
---

# Web Domain Rules

0. Autonomous Domain Mandate:
   - When requested to browse web pages, automate browser tasks, fill forms, inspect live web interfaces, test web applications, or pair with the developer's desktop browser, the agent MUST autonomously engage the Web skills (`browser-operator`, `browser-auditor`, `web-extractor`) and tools (`browser_*`, `scrape`) without waiting for explicit skill invocations from the user.

1. Dual-Mode Operation Standard:
   - Automated background jobs, synthetic tests, and CI/CD operations MUST run in headless mode (`headless: true`).
   - Interactive developer pairing via `browser-auditor` MUST attach non-intrusively to the developer's desktop session via Extension bridge or CDP, preserving active tabs and authentication without closing user windows.

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
