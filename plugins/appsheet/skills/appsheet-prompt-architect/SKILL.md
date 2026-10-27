---
name: appsheet-prompt-architect
description: Translates natural language requirements into relational schemas, deduces Ref parent-child relationships, derives key columns, and constructs deterministic AppSheet initialization URLs.
---

# AppSheet Prompt Architect

Translates natural language specifications and domain descriptions into structured relational schemas, column dictionaries, and deterministic AppSheet onboarding URLs.

---

## 1. When to Use

Activate this skill when:
- Designing a new AppSheet application architecture from user requirements.
- Defining tables, column types, keys, and foreign-key references (`Ref`).
- Formulating Google Sheets schema blueprints prior to spreadsheet provisioning.
- Generating the deterministic AppSheet ingestion URL (`https://www.appsheet.com/start/initialize?docId={docId}`).

---

## 2. Operational Workflow

```
[User Prompt] ──> [Entity Extraction] ──> [Relational Modeling] ──> [Column Dictionary] ──> [Initialization URL]
```

### Step 1: Extract Entities and Relationships
Identify core business entities and determine cardinality (1:N, N:M):
- Parent tables hold primary records (e.g., `Customers`, `Projects`, `Warehouses`).
- Child tables reference parents via `<Parent>Id` (e.g., `Orders` references `Customers`, `Tasks` references `Projects`).

### Step 2: Enforce Primary and Foreign Keys
- Primary Key: Every table MUST include `<Entity>Id` typed as Text, initialized with `UNIQUEID()`.
- Foreign Key: Child tables MUST include `<Parent>Id` typed as `Ref` pointing to `<Parent>`.

### Step 3: Construct Standard Column Dictionary
Map business fields to AppSheet data types following [type-mapping-and-expressions.md](../../references/type-mapping-and-expressions.md):
- Email fields -> `Email` (`USEREMAIL()`).
- Financial amounts -> `Price`.
- Status/State -> `Enum` with explicit allowed values.
- Audit timestamps -> `DateTime` (`NOW()`).

### Step 4: Construct Deterministic Initialization URL
When the spreadsheet ID is known:
```text
https://www.appsheet.com/start/initialize?docId={spreadsheetId}&appName={normalizedAppName}
```

---

## 3. Reference Links

- [AppSheet REST API v2 Specification](../../references/appsheet-rest-api-v2-schema.md)
- [Data Types & Expressions Reference](../../references/type-mapping-and-expressions.md)
- [AppSheet Domain Rules](../../rules/AGENTS.md)
