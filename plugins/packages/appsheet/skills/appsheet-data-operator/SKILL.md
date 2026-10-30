---
name: appsheet-data-operator
description: Interacts directly with existing AppSheet applications via the AppSheet REST API v2 to execute Find queries, Add/Edit/Delete mutations, and Invoke Action workflow triggers.
---

# AppSheet Data Operator

Executes programmatic data operations against deployed Google AppSheet applications using the `cortex-appsheet` MCP server tools.

---

## 1. When to Use

Activate this skill when:
- Querying live records from AppSheet application tables (`find_records`).
- Performing batch insertions, updates, or deletions (`mutate_records`).
- Triggering pre-configured AppSheet webhook actions, PDF generation, or email triggers (`invoke_action`).
- Verifying data integrity between backing Google Sheets and AppSheet client caches.

---

## 2. Operational Workflows

### Workflow A: Querying Records (`find_records`)
```json
{
  "tool": "find_records",
  "arguments": {
    "appId": "YOUR_APPSHEET_APP_ID",
    "tableName": "Orders",
    "selector": "FILTER(Orders, [Status] = 'Pending')",
    "properties": {
      "Locale": "en-US",
      "Timezone": "UTC"
    }
  }
}
```

### Workflow B: Mutating Records (`mutate_records`)
Supported actions: `Add`, `Edit`, `Delete`.

```json
{
  "tool": "mutate_records",
  "arguments": {
    "appId": "YOUR_APPSHEET_APP_ID",
    "tableName": "Orders",
    "action": "Edit",
    "rows": [
      {
        "OrderId": "ord-001",
        "Status": "Approved",
        "ApprovedBy": "admin@example.com"
      }
    ]
  }
}
```

### Workflow C: Triggering Custom Actions (`invoke_action`)
```json
{
  "tool": "invoke_action",
  "arguments": {
    "appId": "YOUR_APPSHEET_APP_ID",
    "tableName": "Orders",
    "action": "GenerateInvoicePDF",
    "rows": [
      {
        "OrderId": "ord-001"
      }
    ]
  }
}
```

---

## 3. Best Practices & Error Handling

- Always confirm that `APPSHEET_APP_ID` and `APPSHEET_APPLICATION_ACCESS_KEY` are provisioned in Infisical or environment variables.
- When performing bulk mutations, chunk requests to a maximum of 100 rows per batch to avoid API gateway timeouts.
- Consult [appsheet-rest-api-v2-schema.md](../../references/appsheet-rest-api-v2-schema.md) for full payload structures.
