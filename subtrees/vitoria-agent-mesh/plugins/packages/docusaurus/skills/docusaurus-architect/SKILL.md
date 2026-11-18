---
name: docusaurus-architect
description: Designs and maintains technical documentation taxonomies, Diátaxis quadrant structuring, and navigation hierarchy (_category_.json) for Docusaurus workspaces.
---

# Docusaurus Architect

Structures and maintains enterprise documentation taxonomies adhering to the Diátaxis documentation framework and Docusaurus v3 standards.

---

## 1. When to Use

Activate this skill when:
- Designing new documentation collections, sections, or directory structures.
- Auditing document categorization across the 4 Diátaxis quadrants (Tutorials, How-To Guides, Reference, Explanation).
- Authoring or editing `_category_.json` navigation manifests and `sidebars.js`.
- Managing sidebar ordering, generated category landing pages, and category links.

---

## 2. Operational Workflows

### Workflow A: New Documentation Section Scaffolding
1. Identify target quadrant:
   - `tutorials/`: Onboarding workflows.
   - `how-to-guides/`: Goal-oriented runbooks.
   - `reference/`: Specifications, schemas, APIs.
   - `explanation/`: Architectural decisions and context.
2. Create directory and author `_category_.json` conforming to [category-and-sidebar-schema.md](../../references/category-and-sidebar-schema.md).
3. Place initial landing page or generated index configuration.

### Workflow B: Navigation Rebalancing
1. Inspect existing sidebar positions across siblings.
2. Assign floating positions (`position: 1.5`) when inserting items between existing integer positions to avoid cascading renames.
3. Verify that `slug` paths conform to kebab-case URL naming.

---

## 3. Reference Links

- [Diátaxis Quadrant Templates](../../references/diataxis-quadrant-templates.md)
- [Category and Sidebar Schema](../../references/category-and-sidebar-schema.md)
- [Docusaurus Domain Rules](../../rules/AGENTS.md)
