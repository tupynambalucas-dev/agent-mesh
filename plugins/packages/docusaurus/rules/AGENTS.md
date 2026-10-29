---
trigger: always_on
---

# Docusaurus Domain Rules

0. Autonomous Domain Mandate:
   - When requested to create, restructure, edit, audit, or validate documentation in a Docusaurus workspace, the agent MUST autonomously engage the Docusaurus skills (`docusaurus-architect`, `docusaurus-mdx-author`, `docusaurus-validator`) without waiting for explicit skill invocations from the user.

1. Diátaxis Framework Mandate:
   - Every documentation document MUST belong to exactly one of the four Diátaxis quadrants:
     - `tutorials/`: Learning-oriented, step-by-step guidance for beginners.
     - `how-to-guides/`: Problem-oriented, task-focused steps for accomplishing specific goals.
     - `reference/`: Information-oriented, technical descriptions, schemas, APIs, and configurations.
     - `explanation/`: Understanding-oriented, architectural rationale, background context, and design decisions.

2. MDX v3 Compatibility:
   - Self-closing HTML tags MUST include a trailing slash (`<br />`, `<hr />`, `<img ... />`).
   - JSX comments MUST use `{/* comment */}` syntax; never use `<!-- comment -->` inside MDX content.
   - Code blocks MUST declare an explicit language identifier (````markdown`, ````typescript`, ````json`).

3. Crowdin Localization Barrier:
   - NEVER edit files inside `i18n/` directly.
   - All source documentation edits MUST occur strictly in the root English source directory (`docs/`).
   - Localization is synchronized automatically via Crowdin actions.

4. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all markdown headers, admonitions, body text, and sidebar labels.
