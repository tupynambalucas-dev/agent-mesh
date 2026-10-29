---
name: gwork-drive-operator
description: Provides deep search and lifecycle management over Google Drive folders, permissions, file sharing, and cross-format exports.
---

# Google Workspace Drive Manager

Manages files, folders, and access permissions in Google Drive using `cortex-gwork`.

---

## 1. When to Use

Activate this skill when:
- Searching for existing spreadsheets, docs, or folders (`search_drive_files`).
- Locating AppSheet backing databases or documentation folders by name or MIME type.
- Retrieving folder identifiers for targeted file creation.

---

## 2. Operational Workflows

### Workflow A: Searching for AppSheet Backing Databases
```json
{
  "tool": "search_drive_files",
  "arguments": {
    "query": "name contains 'AppSheet' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false",
    "pageSize": 10
  }
}
```

### Workflow B: Locating a Target Folder
```json
{
  "tool": "search_drive_files",
  "arguments": {
    "query": "name = 'Architecture Proposals' and mimeType = 'application/vnd.google-apps.folder' and trashed = false"
  }
}
```

---

## 3. Reference Links

- [Google Drive v3 Search Queries Reference](../../references/drive-v3-search-queries.md)
- [Google Workspace Domain Rules](../../rules/AGENTS.md)
