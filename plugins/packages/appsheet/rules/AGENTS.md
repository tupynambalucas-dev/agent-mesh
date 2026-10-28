---
trigger: always_on
---

# AppSheet Domain Rules

1. Primary Key Invariant:
   - Every AppSheet relational table MUST define a unique primary key column named `<Entity>Id` (or `Id`).
   - The key column MUST be typed as Text with an initial value of `UNIQUEID()`.

2. Foreign Key References:
   - Foreign key reference columns MUST be named after the target entity (e.g., `CustomerId`, `OrderId`) or explicitly suffixed with `Ref`.
   - The column type MUST be set to `Ref` pointing to the referenced parent table name.

3. Formula Expression Typography:
   - All AppSheet expression formulas (e.g., `SELECT()`, `FILTER()`, `LOOKUP()`, `INDEX()`, `ISNOTBLANK()`, `CONCATENATE()`) MUST use strict uppercase syntax.

4. REST API v2 Idempotency:
   - When executing `mutate_records`, always specify deterministic keys to prevent duplicate record insertion during network retries.
   - Use `Find` with specific `Selector` filters before executing batch operations to verify initial state.

5. Headless Browser Automation (Playwright):
   - When automating AppSheet Studio UI via Playwright MCP (`browser_*` tools), always wait for network idle before asserting view updates.
   - Handle and dismiss modal dialogs (consent banners, feature onboarding tours) before interacting with schema regeneration buttons.
