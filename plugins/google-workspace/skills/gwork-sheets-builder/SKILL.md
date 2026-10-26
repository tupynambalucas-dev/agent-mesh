---
name: gwork-sheets-builder
description: Programmatically synthesizes enterprise-grade multi-table workbooks formatted specifically to serve as backing databases for Google AppSheet or analytics.
---

# Google Sheets Builder Skill

Use this skill to design, generate, and format relational Google Sheets workbooks that act as clean databases for AppSheet applications.

## Activation Triggers

Activate this skill when:
- Creating a new Google Sheet to serve as the database for a Greenfield AppSheet app.
- Adding relational tables (sheets/tabs) to an existing workbook.
- Formatting header rows (bold text, frozen top row, contrasting background fill).
- Setting up data validation dropdown rules (e.g. for Enum columns like Status, Priority).
- Inserting relational seed rows.

## Formatting Standard for AppSheet Ingestion

1. Row 1 MUST contain only column headers (no blank headers or multi-line titles).
2. Key columns MUST use suffix `_ID` (e.g. `Customer_ID`, `Order_ID`) so AppSheet automatically infers them as table keys.
3. Foreign key columns MUST reference the parent entity (e.g. `Customer_ID` inside the `Orders` sheet) to trigger automatic `Ref` relationship deduction.
4. Freeze row 1 on all created sheets.
