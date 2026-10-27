---
name: documentation-researcher
description: Queries live, official framework and library documentation, APIs, types, and release changes using Context7. Trigger when researching library methods, framework APIs, SDK usage, or version upgrades.
---

# Documentation Researcher

This skill guides the retrieval and synthesis of real-time technical documentation, API specifications, and code examples for open-source libraries and frameworks using the **Context7 MCP Server**.

---

## 1. When to Use

Activate this skill when:
- Researching API syntax, signatures, types, or methods for external libraries (e.g., React, Express, Docusaurus, Fastify, Octokit).
- Validating version-specific features or breaking changes during upgrades.
- Seeking official documentation examples when internal codebase context is insufficient.

Do NOT activate this skill when:
- Searching local codebase files (use local file reading tools or subagents).
- Searching general non-library web content, news, or blogs (use `web-deep-researcher`).

---

## 2. Operational Workflow

Follow this procedure sequentially:

```
[Target Library] ──> resolve-library-id ──> [Library ID] ──> get-library-docs ──> [Structured Synthesis]
```

### Step 1: Identify Library Identifier
Call `resolve-library-id` with the package or framework name to resolve the authoritative Context7 library identifier.

```json
{
  "libraryName": "docusaurus"
}
```

### Step 2: Retrieve Targeted Documentation
Call `get-library-docs` using the resolved identifier and an optional query topic to pinpoint relevant documentation chunks.

```json
{
  "libraryId": "/facebook/docusaurus",
  "query": "sidebar configuration auto-generated category"
}
```

### Step 3: Verify and Synthesize
- Validate that the retrieved version aligns with the consumer project's package version.
- Extract concrete code snippets, configuration options, and typing details.
- Provide direct citations and clean Markdown examples without redundant commentary.

---

## 3. Best Practices

- Always resolve the canonical library ID before querying documentation chunks.
- Refine the `query` argument with specific method names or features to keep retrieved context compact.
- Never output speculative API signatures if Context7 returns definitive specifications.
