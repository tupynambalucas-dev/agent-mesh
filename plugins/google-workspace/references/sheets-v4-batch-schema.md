# Google Sheets API v4 BatchUpdate Schema Reference

When generating structured workbooks via `create_spreadsheet` or post-creation styling, leverage standard `batchUpdate` requests.

---

## 1. Freeze Header Row Request
```json
{
  "updateSheetProperties": {
    "properties": {
      "sheetId": 0,
      "gridProperties": {
        "frozenRowCount": 1
      }
    },
    "fields": "gridProperties.frozenRowCount"
  }
}
```

---

## 2. Header Style Request (Bold + Dark Background + White Text)
```json
{
  "repeatCell": {
    "range": {
      "sheetId": 0,
      "startRowIndex": 0,
      "endRowIndex": 1
    },
    "cell": {
      "userEnteredFormat": {
        "backgroundColor": { "red": 0.15, "green": 0.20, "blue": 0.30 },
        "textFormat": {
          "bold": true,
          "foregroundColor": { "red": 1.0, "green": 1.0, "blue": 1.0 }
        }
      }
    },
    "fields": "userEnteredFormat(backgroundColor,textFormat)"
  }
}
```
