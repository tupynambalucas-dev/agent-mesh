---
name: gwork-docs-architect
description: Converts markdown technical plans and specifications into richly formatted Google Docs conforming to organizational typographic standards.
---

# Google Workspace Docs Publisher

Converts Markdown technical plans, architectural designs, and Diátaxis documentation into formatted Google Docs using `cortex-gwork`.

---

## 1. When to Use

Activate this skill when:
- Publishing a project plan or specification as a shared Google Doc (`create_document`).
- Exporting architectural proposals to Google Workspace for stakeholder review.
- Formatting document typographic structure (Headings, Tables, Lists).

---

## 2. Operational Workflows

### Workflow A: Publishing a Technical Specification
```json
{
  "tool": "create_document",
  "arguments": {
    "title": "[Plan] Enterprise Architecture Specification",
    "content": "# Enterprise Architecture Specification\n\n## 1. Executive Summary\n...",
    "folderId": "OPTIONAL_TARGET_FOLDER_ID"
  }
}
```

---

## 3. Reference Links

- [Google Docs v1 Styling Schema](../../references/docs-v1-styling-schema.md)
- [Google Workspace Domain Rules](../../rules/AGENTS.md)
