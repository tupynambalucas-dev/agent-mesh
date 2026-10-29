---
name: docusaurus-mdx-architect
description: Authors and refactors Docusaurus technical documents ensuring strict MDX v3 parser compliance, React component syntax, admonitions, and code formatting.
---

# Docusaurus MDX Author

Authors, refactors, and validates technical markdown documents for Docusaurus v3 websites with strict MDX parser compliance.

---

## 1. When to Use

Activate this skill when:
- Writing new technical documentation articles or API documentation.
- Converting standard Markdown files into MDX v3 compliant format.
- Adding interactive React components (`Tabs`, `TabItem`, `DocCardList`).
- Implementing standard admonitions (`:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`).

---

## 2. Operational Workflows

### Workflow A: Authoring Compliant MDX Documents
1. Add YAML frontmatter with `title`, `description`, and optional `sidebar_position`.
2. Ensure all void HTML elements self-close (`<br />`, `<hr />`, `<img />`).
3. Replace HTML comments `<!-- comment -->` with JSX `{/* comment */}`.
4. Escape curly braces outside code fences (use `\{` or enclose in backticks).
5. Specify language identifiers on all fenced code blocks.

### Workflow B: Component Embeds
```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="pnpm" label="pnpm" default>
    ```bash
    pnpm add @tupynambalucas-dev/agent-mesh
    ```
  </TabItem>
</Tabs>
```

---

## 3. Reference Links

- [Docusaurus v3 MDX Specification](../../references/docusaurus-v3-mdx-spec.md)
- [Diátaxis Quadrant Templates](../../references/diataxis-quadrant-templates.md)
- [Docusaurus Domain Rules](../../rules/AGENTS.md)
