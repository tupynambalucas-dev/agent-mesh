---
name: docusaurus-mdx-author
description: Authors and refactors Docusaurus technical documents ensuring strict MDX v3 parser compliance, React component syntax, admonitions, and code formatting.
---

# Docusaurus MDX Author

This skill guides the authoring of rich, error-free MDX v3 documentation adhering to strict JSX syntax standards.

---

## 1. Syntax & Parser Rules for MDX v3

- **All-MDX Policy**: Technical content files must strictly use the `.mdx` extension.
- **JavaScript Comments Only**: Standard HTML comments (`<!-- comment -->`) break MDX compilation. Always use `{/* comment */}`.
- **Escape Special Characters**: Raw `{`, `}`, and `<` must be escaped when intended as literal text: `\{`, `\}`, and `\<`.
- **Self-Closing Tags**: All JSX and HTML void elements MUST be explicitly self-closed: `<br />`, `<hr />`, `<img src="..." />`.
- **Markdown inside HTML/JSX**: Isolate markdown formatting inside raw HTML/JSX tags with empty lines above and below.

---

## 2. Admonitions & Callouts

Use native Docusaurus colon admonitions with titles rather than GitHub quote alerts:

```mdx
:::note[Context]
Background technical information or architecture notes.
:::

:::tip[Performance Optimization]
Recommendations to improve build speeds or query throughput.
:::

:::caution[Breaking Changes]
Deprecation notices and breaking API shifts.
:::

:::danger[Security Risk]
Actions that could leak secrets or compromise cluster boundaries.
:::
```

---

## 3. Formatting & Code Blocks

- Indent strictly with 2 spaces.
- Use hyphens (`-`) for unordered lists; asterisks (`*`) or pluses (`+`) are forbidden.
- Always declare the code fence language explicitly (` ```yaml `, ` ```typescript `, ` ```bash `).
- Use ` ```mermaid ` fences for flowcharts, sequence diagrams, and state diagrams.
