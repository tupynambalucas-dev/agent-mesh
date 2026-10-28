# AppSheet Data Types & Expression Reference

## 1. Google Sheets to AppSheet Type Mapping

| Field Name Suffix / Intent | Google Sheet Format | AppSheet Column Type | AppSheet Formula / Default |
| :--- | :--- | :--- | :--- |
| `Id`, `*Id` | Text / String | `Text` (Key) | `UNIQUEID()` |
| `*Ref`, `ParentId` | Text / String | `Ref` | Points to referenced Table |
| `Name`, `Title`, `Label` | Text / String | `Text` (Label) | N/A |
| `Description`, `Notes` | Plain Text | `LongText` | N/A |
| `Email`, `*Email` | Text | `Email` | `USEREMAIL()` |
| `Phone`, `*Phone` | Text | `Phone` | N/A |
| `Amount`, `Price`, `Total` | Currency | `Price` | Currency symbol configured in App |
| `Quantity`, `Count` | Number | `Number` | `0` |
| `Ratio`, `Percentage` | Percent | `Percent` | `0.00%` |
| `Status`, `Category` | Text | `Enum` | Values: `["Pending", "Approved", "Rejected"]` |
| `Tags`, `Features` | Comma-delimited Text | `EnumList` | Multi-select configured in App |
| `Date`, `*Date` | Date | `Date` | `TODAY()` |
| `Time`, `*Time` | Time | `Time` | `TIMENOW()` |
| `Timestamp`, `CreatedAt` | DateTime | `DateTime` | `NOW()` |
| `Photo`, `Image`, `Avatar` | Text (URL / Drive path) | `Image` | Cloud image storage |
| `Attachment`, `File` | Text (Drive path) | `File` | Cloud document storage |
| `Location`, `Coordinates` | Text (`lat, long`) | `LatLong` | `HERE()` |
| `IsActive`, `Completed` | Boolean (`TRUE`/`FALSE`) | `Yes/No` | `TRUE` |

---

## 2. Core Expression Syntax Standards

All expressions must be authored strictly in UPPERCASE:

### Filter & Selection
```text
FILTER("Orders", ([Status] = "Pending"))
SELECT(Customers[Email], ([CustomerId] = [_THISROW].[CustomerId]))
LOOKUP([_THISROW].[CustomerId], "Customers", "CustomerId", "CompanyName")
```

### Logical & Conditional
```text
IF(ISBLANK([CompletedAt]), "In Progress", "Resolved")
AND(([TotalAmount] > 100), ([Status] = "Approved"))
OR(([Role] = "Admin"), ([Role] = "Manager"))
```

### String Manipulation
```text
CONCATENATE([FirstName], " ", [LastName])
UPPER([CountryCode])
TRIM([Address])
```

### Date & Time Operations
```text
HOUR(TIMENOW() - "08:00:00")
DATEDIF([StartDate], TODAY(), "D")
EOMONTH(TODAY(), 0)
```
