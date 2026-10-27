# Google Drive API v3 Search Query Reference

When using `search_drive_files` via `cortex-gwork`, formulate search query strings using the `q` parameter syntax.

---

## 1. Common Query Patterns

### Find Files by Name
```text
name = 'Production Database' and trashed = false
name contains 'AppSheet' and trashed = false
```

### Find Files by MIME Type
```text
mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false
mimeType = 'application/vnd.google-apps.document' and trashed = false
mimeType = 'application/vnd.google-apps.folder' and trashed = false
```

### Find Files Inside a Specific Folder
```text
'1AbC-xYz_123456789' in parents and trashed = false
```

### Combined Query (Spreadsheets in Folder with Name)
```text
'1AbC-xYz_123456789' in parents and mimeType = 'application/vnd.google-apps.spreadsheet' and name contains 'Inventory' and trashed = false
```
