# LinkedIn Anti-Bot Safeguards & Automation Pacing

This technical specification documents rate limits, jitter standards, and account safety discipline for LinkedIn automation.

---

## 1. Detection Vectors on LinkedIn

LinkedIn uses aggressive client-side behavioral fingerprinting:
1. **Request Velocity**: Unnaturally fast requests (< 1.5s between page loads) trigger temporary account challenges or session invalidation.
2. **Bulk Volume Limits**: Visiting more than 40-50 profiles or querying more than 30 jobs in tight succession triggers CAPTCHAs.
3. **Session Consistency**: Sudden changes in IP address, user agent, or cookie values invalidate the `li_at` authentication session.

---

## 2. Agent Operational Safeguards

The LinkedIn plugin enforces the following constraints:

1. **Local Authenticated Browser Session Reuse**:
   - Instead of asking for raw username/password credentials, the launcher reuses the pre-authenticated session cookie (`li_at`) or attaches to open local browser profiles.
2. **Adaptive Jitter & Throttling**:
   - Random sleep delay (between 2500ms and 6500ms) injected between consecutive profile or job lookups.
3. **Daily Application Ceiling**:
   - Target maximum: 10 high-fit Easy Apply submissions per calendar day.
   - Target maximum: 15 connection requests per calendar day.
4. **Zero Headless Detection Leaks**:
   - When Playwright or Patchright operates in headless mode, anti-automation flags (`navigator.webdriver`, WebGL vendor signatures) must remain patched.
