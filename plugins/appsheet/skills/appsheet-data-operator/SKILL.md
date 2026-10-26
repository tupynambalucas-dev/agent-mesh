---
name: appsheet-data-operator
description: Interacts directly with existing AppSheet applications via the AppSheet REST API v2 to execute Find queries, Add/Edit/Delete mutations, and Invoke Action workflow triggers.
---

# AppSheet Data Operator Skill

Use this skill to execute database queries, record mutations, and custom action workflows directly against running AppSheet applications via the AppSheet REST API v2.

## Activation Triggers

Activate this skill when:
- Querying records from an existing AppSheet application using the `Find` action.
- Inserting new rows into AppSheet tables using `Add`.
- Updating existing records by key column using `Edit`.
- Deleting records from an AppSheet table using `Delete`.
- Triggering custom action workflows or notifications via `Invoke Action`.

## Request Contract Standard

The AppSheet REST API endpoint format:
`POST https://api.appsheet.com/api/v2/apps/{appId}/tables/{tableName}/Action`

Headers:
- `ApplicationAccessKey`: Secret token configured in the AppSheet application settings.
- `Content-Type`: `application/json`

Payload:
```json
{
  "Action": "Find",
  "Properties": {
    "Locale": "en-US",
    "Timezone": "UTC",
    "Selector": "Filter([TableName], [Status] = 'Active')"
  },
  "Rows": []
}
```
