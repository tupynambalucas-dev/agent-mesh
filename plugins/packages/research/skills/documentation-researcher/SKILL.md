---
name: documentation-researcher
description: Queries live, official framework and library documentation, APIs, types, and release changes using Context7. Trigger when researching library methods, framework APIs, SDK usage, or version upgrades.
---

# Documentation Researcher

Retrieves official, live, version-accurate documentation for open-source libraries, packages, and frameworks using the **Context7 MCP Server**.

---

## 1. When to Use

Activate this skill when:
- Researching API syntax, signatures, types, or methods for external libraries (React, Express, Docusaurus, Fastify, Playwright, Octokit).
- Validating version-specific features or breaking changes during upgrades.
- Seeking official documentation examples when internal codebase context is insufficient.

Do NOT activate this skill when:
- Searching local codebase files (use local file reading tools or subagents).
- Searching general non-library web content, news, or blogs (use `web-deep-researcher`).

---

## 2. Operational Workflows

```
[Target Library] ──> resolve-library-id ──> [Library ID] ──> query-docs ──> [Structured Synthesis]
```

### Step 1: Identify Library Identifier
Call `resolve-library-id` with the package or framework name to resolve the authoritative Context7 library identifier:

```json
{
  "tool": "resolve-library-id",
  "arguments": {
    "libraryName": "docusaurus",
    "query": "sidebar configuration auto-generated category"
  }
}
```

### Step 2: Retrieve Targeted Documentation
Call `query-docs` using the resolved identifier and query topic:

```json
{
  "tool": "query-docs",
  "arguments": {
    "libraryId": "/websites/docusaurus_io/3.9.2",
    "query": "category json sidebar configuration label position"
  }
}
```

### Step 3: Verify and Synthesize
- Validate that the retrieved version aligns with the project package version.
- Extract concrete code snippets, configuration options, and typing details.
- Provide direct citations and clean Markdown examples without redundant commentary.

---

## 3. Reference Links

- [Context7 Query Catalog](../../references/context7-query-catalog.md)
- [Research Domain Rules](../../rules/AGENTS.md)
