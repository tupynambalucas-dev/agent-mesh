---
name: markdown-architect
description: Authors and validates GitHub Flavored Markdown (GFM) documents enforcing strict zero-emoji standards, table alignment, and GFM alert callouts.
---

# Markdown Architect

This skill defines the authoritative standards for authoring Markdown files (.md) across all organizational repositories.

---

## 1. Governance Constraints

- **Strict Zero-Emoji Invariant**: Never emit emojis anywhere: headings, tables, callouts, or text.
- **English-US Exclusivity**: All documentation must be written in en-US.
- **Clickable Links**: Link to code symbols and file ranges using markdown links (`[Label](file:///...)` or relative paths).

---

## 2. GitHub Flavored Markdown Standards

### A. Headings & Hierarchy
- Use a single `#` H1 heading at the top of the file.
- Maintain consistent incrementing heading levels (`##`, `###`). Do not skip levels.

### B. Tables
- Always format tables with consistent column delimiters (`|`) and clean alignment.
- Always include header separators (`| :--- | :--- |`).

### C. Alerts & Callouts
Use standard GitHub-style alerts:

```markdown
> [!NOTE]
> Explanations, technical background, and architectural context.

> [!TIP]
> Best practices, optimization suggestions, and efficiency enhancements.

> [!IMPORTANT]
> Critical prerequisites and mandatory operational steps.

> [!WARNING]
> Deprecations, architectural breaking changes, and compatibility cautions.

> [!CAUTION]
> High-risk operations that could cause data loss or security exposure.
```
