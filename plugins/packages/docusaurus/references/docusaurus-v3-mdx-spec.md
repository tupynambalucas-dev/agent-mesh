# Docusaurus v3 MDX Specification Reference

## 1. Admonition Syntax

Docusaurus v3 uses GitHub-style alerts and remark-admonitions:

```markdown
:::note
Informative note or background context.
:::

:::tip
Helpful tip or optimization suggestion.
:::

:::info
General informational notice.
:::

:::warning
Warning regarding breaking changes or deprecated features.
:::

:::danger
Critical security warning or risk of data loss.
:::
```

---

## 2. Tabs and TabItem Components

Tabs must be imported explicitly in MDX v3:

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>
    ```bash
    npm install @tupynambalucas-dev/agent-plugin-github
    ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ```bash
    pnpm add @tupynambalucas-dev/agent-plugin-github
    ```
  </TabItem>
</Tabs>
```

---

## 3. Strict MDX v3 Parser Rules

1. **Tag Self-Closing**: All void HTML elements (`<br>`, `<img>`, `<hr>`, `<input>`) must self-close:
   - `<br />` instead of `<br>`
   - `<hr />` instead of `<hr>`
2. **JSX Comments**: Use `{/* comment */}` instead of `<!-- comment -->`.
3. **Escaping Curly Braces**: Plain text curly braces `{` and `}` in prose must be escaped as `\{` and `\}` or enclosed in backticks `` `{foo}` `` to prevent JSX expression parsing errors.
4. **Code Block Line Highlights**:
   ````markdown
   ```typescript {1,3-4}
   const a = 1;
   const b = 2;
   const c = 3;
   const d = 4;
   ```
   ````
