---
name: gwork-sheets-builder
description: Programmatically synthesizes enterprise-grade multi-table workbooks formatted specifically to serve as backing databases for Google AppSheet or analytics.
---

# Google Workspace Sheets Builder

Provisions and formats multi-tab Google Sheets workbooks designed to serve as relational backing databases for Google AppSheet applications.

---

## 1. When to Use

Activate this skill when:
- Creating new Google Sheets workbooks with pre-formatted relational tables (`create_spreadsheet`).
- Generating multi-entity database schemas for prompt-to-app AppSheet initialization.
- Enforcing frozen header rows and standard column formatting.

---

## 2. Operational Workflows

### Workflow A: Multi-Table Spreadsheet Provisioning
```json
{
  "tool": "create_spreadsheet",
  "arguments": {
    "title": "Enterprise Asset Management DB",
    "sheets": [
      {
        "title": "Assets",
        "headers": ["AssetId", "Name", "Category", "LocationId", "PurchasePrice", "Status", "CreatedAt"]
      },
      {
        "title": "Locations",
        "headers": ["LocationId", "Name", "Address", "Coordinates", "ManagerEmail"]
      },
      {
        "title": "MaintenanceLogs",
        "headers": ["LogId", "AssetId", "TechnicianEmail", "MaintenanceDate", "Cost", "Notes"]
      }
    ],
    "folderId": "OPTIONAL_FOLDER_ID"
  }
}
```

---

## 3. Best Practices

- Always ensure row 1 contains exact column headers with no merged cells.
- Primary key column (`AssetId`, `LocationId`) must always be column 1 (`A`).
- Refer to [AppSheet Type Mappings](../../appsheet/references/type-mapping-and-expressions.md) for field naming conventions.

---

## 4. Reference Links

- [Google Sheets v4 Batch Schema](../../references/sheets-v4-batch-schema.md)
- [Google Workspace Domain Rules](../../rules/AGENTS.md)
