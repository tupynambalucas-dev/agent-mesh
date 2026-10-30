# AppSheet REST API v2 Specification Reference

## Endpoint Architecture

```text
POST https://api.appsheet.com/api/v2/apps/{appId}/tables/{tableName}/Action
```

### Standard Headers
```http
ApplicationAccessKey: {APPSHEET_APPLICATION_ACCESS_KEY}
Content-Type: application/json
```

---

## 1. Action: `Find` (Query Records)

Used to retrieve existing records filtered by conditions.

### Request Payload
```json
{
  "Action": "Find",
  "Properties": {
    "Locale": "en-US",
    "Timezone": "UTC",
    "Selector": "FILTER(Orders, [Status] = 'Pending')"
  },
  "Rows": []
}
```

### Response Payload
```json
[
  {
    "OrderId": "ord-001",
    "CustomerId": "cust-100",
    "TotalAmount": 250.00,
    "Status": "Pending",
    "CreatedAt": "2026-10-27T08:00:00Z"
  }
]
```

---

## 2. Action: `Add` (Insert Records)

### Request Payload
```json
{
  "Action": "Add",
  "Properties": {
    "Locale": "en-US",
    "Timezone": "UTC"
  },
  "Rows": [
    {
      "OrderId": "ord-002",
      "CustomerId": "cust-101",
      "TotalAmount": 120.50,
      "Status": "Pending"
    }
  ]
}
```

---

## 3. Action: `Edit` (Update Existing Records)

### Request Payload
```json
{
  "Action": "Edit",
  "Properties": {
    "Locale": "en-US",
    "Timezone": "UTC"
  },
  "Rows": [
    {
      "OrderId": "ord-002",
      "Status": "Completed"
    }
  ]
}
```

---

## 4. Action: `Delete` (Remove Records)

### Request Payload
```json
{
  "Action": "Delete",
  "Properties": {
    "Locale": "en-US",
    "Timezone": "UTC"
  },
  "Rows": [
    {
      "OrderId": "ord-002"
    }
  ]
}
```

---

## 5. Action: Invoke Named Custom Action

### Request Payload
```json
{
  "Action": "SendInvoiceEmail",
  "Properties": {
    "Locale": "en-US",
    "Timezone": "UTC"
  },
  "Rows": [
    {
      "OrderId": "ord-001"
    }
  ]
}
```
