# Browser Automation & Extension Bridge Architecture

This document explains the technical architecture, security considerations, and design rationale behind the Universal Browser Engine implemented in `@tupynambalucas-dev/mcp-playwright`.

---

## 1. The Limitations of Legacy Browser Automation

Standard browser automation tools in AI agent toolchains (such as vanilla `@playwright/mcp` or Puppeteer scripts) treat web interaction as an isolated, disposable batch job:
- **Blind Headless Instances**: The agent launches a temporary browser window, performs an action, takes a screenshot, and kills the process.
- **Authentication Walls**: The agent cannot access websites requiring multi-factor authentication (MFA), SSO, CAPTCHA solving, or internal corporate VPN credentials without complex cookie-injecting infrastructure.
- **Destructive Session Restarts**: If the tool attempts to attach to a local browser, it frequently forces the user's existing Chrome window to quit, losing open tabs and unsaved work.
- **Operating-System Specific Launchers**: Hardcoded executable paths (e.g., `C:\Program Files\Google\Chrome\...`) break cross-platform portability across Windows, macOS, and Linux.

---

## 2. Universal Browser Engine Architecture

To overcome these constraints, `@tupynambalucas-dev/mcp-playwright` implements a dual-mode operational paradigm:

```
                                  ┌─────────────────────────────┐
                                  │   AI Agent (Web Plugin)     │
                                  └──────────────┬──────────────┘
                                                 │
                               ┌─────────────────┴─────────────────┐
                               ▼                                   ▼
                   ┌───────────────────────┐           ┌───────────────────────┐
                   │    browser-operator   │           │    browser-auditor    │
                   │    (Headless Mode)    │           │ (Desktop Pairing Mode)│
                   └───────────┬───────────┘           └───────────┬───────────┘
                               │                                   │
                               ▼                                   ▼
                   ┌───────────────────────┐           ┌───────────────────────┐
                   │  Isolated Chromium    │           │ Live Chrome / Brave   │
                   │  - Synthetic E2E      │           │  - Active Tabs & Auth │
                   │  - Form Testing       │           │  - CDP Port 9222      │
                   │  - Headless Scraping  │           │  - Extension Bridge   │
                   └───────────────────────┘           └───────────────────────┘
```

### 2.1 Desktop Pairing Mode (`browser-auditor`)
Instead of launching a separate browser, `browser-auditor` pairs directly with the developer's active desktop browser:
1. **CDP Loopback**: Attaches to `localhost:9222` when Chrome or Brave is launched with `--remote-debugging-port=9222`.
2. **Playwright Extension Bridge**: Communicates over an ephemeral local WebSocket channel with zero flags required on the browser executable.
3. **Preserved Authentication**: The agent leverages the developer's pre-authenticated session (GitHub, Google Workspace, AWS Console, AppSheet Studio) without touching or storing developer credentials.

### 2.2 Headless Automation Mode (`browser-operator`)
When tasks require synthetic testing, reproducible regression runs, or CI/CD execution without a display server, `browser-operator` spawns headless Chromium processes that run in complete isolation.

---

## 3. Snapshot-Driven Navigation vs. Coordinate Clicking

Rather than relying on brittle pixel coordinates or volatile CSS class selectors (which break on responsive re-renders), the engine enforces **ARIA Accessibility Tree Snapshotting** via `browser_snapshot`:
- Extracts semantic roles (`button`, `link`, `textbox`, `combobox`).
- Emits bounding box coordinates alongside accessible labels.
- Enables the agent to reason about the page structure semantically rather than guessing blindly.
