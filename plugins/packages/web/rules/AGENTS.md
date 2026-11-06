---
trigger: always_on
---

# Web Domain Rules

0. Autonomous Domain Mandate:
   - When requested to browse web pages, automate browser tasks, fill forms, inspect live web interfaces, test web applications, or pair with the developer's desktop browser, the agent MUST autonomously engage the Web skills (`browser-operator`, `browser-auditor`, `web-extractor`) and tools (`browser_*`, `scrape`) without waiting for explicit skill invocations from the user.

1. Multi-Mode Playwright Operation Standard:
   - **Interactive Developer Pairing (`browser-auditor`)**: When `PLAYWRIGHT_MODE=extension` (or `auto` with active token), the agent attaches non-intrusively to the developer's open browser session via the Playwright Extension bridge, preserving active tabs, logins, and cookies without closing user windows.
   - **Automated Background Jobs & CI/CD (`browser-operator`)**: When `PLAYWRIGHT_MODE=headless`, operations MUST execute in isolated sandboxes (`--user-data-dir ${PLUGIN_DATA}/browser-profile --headless`) with zero impact on developer screens.
   - **Dynamic Mode Switching**: Agents must recognize that `launcher.cjs` dynamically adapts based on `PLAYWRIGHT_MODE` in `.env` without modifying JSON configuration files.

2. Snapshot-Driven Navigation:
   - Prefer `browser_snapshot` with accessibility tree and bounding boxes (`boxes: true`) over blind coordinate clicks.
   - Use stable attributes (`data-testid`, `role`, accessible label) when selecting interactive elements.

3. Settle and Timeout Discipline:
   - After invoking actions that trigger DOM mutations or page reloads (`browser_click`, `browser_fill_form`), always wait for network settle via `browser_wait_for`.
   - Never use static sleep timers; use selector-based wait conditions.

4. Dialog and Banner Dismissal:
   - Automatically handle and dismiss alert dialogs, modal popups, and cookie consent notices (`browser_handle_dialog`, `browser_click`) to prevent blocking subsequent actions.

5. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across scraped summaries, browser evaluations, and test reports.
