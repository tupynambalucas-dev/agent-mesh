# Google Docs API v1 Styling Schema Reference

When generating formatted documents via `create_document` or formatting technical plans, use standard Docs batchUpdate requests.

---

## 1. Insert Text Request
```json
{
  "insertText": {
    "location": { "index": 1 },
    "text": "Executive Summary\n\nThis document details the architectural specifications."
  }
}
```

---

## 2. Heading Style Request
```json
{
  "updateParagraphStyle": {
    "range": { "startIndex": 1, "endIndex": 18 },
    "paragraphStyle": {
      "namedStyleType": "HEADING_1"
    },
    "fields": "namedStyleType"
  }
}
```
