---
trigger: always_on
---

# Google Workspace Domain Rules

0. Autonomous Domain Mandate:
   - When requested to search or organize Google Drive, synthesize Google Sheets workbooks for AppSheet, or publish formatted Google Docs, the agent MUST autonomously engage the Google Workspace skills (`gwork-drive-operator`, `gwork-sheets-architect`, `gwork-docs-architect`) and tools without waiting for explicit skill invocations from the user.

1. Service Account Credential Hygiene:
   - Service account JSON keys (`GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS`) must be managed via Infisical and never written to disk in plain text.

2. Sheets Relational Modeling Standards:
   - Row 1 of every generated sheet MUST contain column headers.
   - Header row MUST be frozen (`frozenRowCount: 1`) to enable clean AppSheet ingestion.
   - Never merge cells in data tables; tabular data must be strictly 1NF normalized.

3. Drive Organizational Hierarchy:
   - Files created by agents must be created in designated team folders (`folderId` specified) rather than the root `My Drive`.
   - File names must follow deterministic patterns: `[Environment] - [Domain] - [Entity]`.

4. Docs Typographic Hierarchy:
   - Documents must use standard typography: Title (24pt), Heading 1 (18pt Bold), Heading 2 (14pt Bold), Body Text (11pt Normal).
   - Code blocks must use monospace fonts (Consolas, Roboto Mono).
