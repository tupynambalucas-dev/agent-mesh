---
name: appsheet-prompt-architect
description: Translates natural language requirements into relational schemas, deduces Ref parent-child relationships, derives key columns, and constructs deterministic AppSheet initialization URLs.
---

# AppSheet Prompt Architect Skill

Use this skill to model entity relationships, deduce column types, generate database schemas, and output initialization links for Google AppSheet applications.

## Activation Triggers

Activate this skill when:
- Designing a new AppSheet application from a user's natural language concept.
- Generating relational tables and column dictionaries for spreadsheet provisioning.
- Deriving key identifiers (`UUID`) and parent-child foreign keys (`Ref`).
- Formulating the deterministic AppSheet initialization URL (`https://www.appsheet.com/start/initialize?docId={docId}`).

## Deterministic URL Construction Standard

Once the Google Sheet is created and its `docId` (Spreadsheet ID) is acquired, generate the ingestion URL:
```text
https://www.appsheet.com/start/initialize?docId={docId}&appName={appName}
```
Directing the user to this URL initializes the AppSheet application editor with all tables and columns pre-connected.
