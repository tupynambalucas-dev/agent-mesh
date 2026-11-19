# Google Sheets to AppSheet Relational Type Mappings

This reference defines the enterprise mapping standard between Google Sheets cell formats, column header suffixes, and AppSheet relational column types.

---

## 1. Column Naming & Type Mapping Table

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

## 2. Invariants for Sheets AppSheet Backing Tables

1. **Row 1 Headers**: Row 1 MUST contain exact column names. Never merge cells in data tables.
2. **Key Column Position**: Column 1 (`A`) must always be `<Entity>Id` typed as Text.
3. **Reference Columns**: Foreign key references must be named `<TargetEntity>Id` or suffixed with `Ref`.
