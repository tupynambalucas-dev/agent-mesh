---
name: docusaurus-architect
description: Designs and maintains technical documentation taxonomies, Diátaxis quadrant structuring, and navigation hierarchy (_category_.json) for Docusaurus workspaces.
---

# Docusaurus Documentation Architect

This skill establishes the taxonomy, directory layouts, and information architecture for sovereign Docusaurus documentation.

---

## 1. The Diátaxis Framework

All documentation in the knowledge base MUST be structured around user needs into four distinct quadrants:

```
                      PRACTICAL                THEORETICAL
              +------------------------+------------------------+
              |                        |                        |
   LEARNING   |       TUTORIALS        |      EXPLANATION       |
              |   (Learning-oriented)  | (Understanding-oriented)|
              |                        |                        |
              +------------------------+------------------------+
              |                        |                        |
   WORKING    |      HOW-TO GUIDES     |       REFERENCE        |
              |    (Goal-oriented)     | (Information-oriented) |
              |                        |                        |
              +------------------------+------------------------+
```

### Classification Rules:
- `tutorials/`: Lessons for newcomers to achieve a practical outcome from scratch.
- `guides/`: Concrete steps solving a specific real-world problem or workflow.
- `reference/`: Technical machinery, APIs, configuration schemas, parameters, and flags.
- `explanation/`: Deep-dive architectural background, trade-offs, and rationale.

---

## 2. Category Structuring & Navigation

When documenting complex features spanning multiple files:

- Place documents inside a category subfolder within the appropriate quadrant (e.g., `reference/gateway/`).
- Every subfolder MUST contain a `_category_.json` declaring its sidebar label, position, and generated index link:
  ```json
  {
    "label": "Gateway Architecture",
    "position": 1,
    "link": {
      "type": "generated-index",
      "description": "Comprehensive reference specifications for the Cortex MCP Envoy Gateway."
    }
  }
  ```
- Standalone single-document topics should sit directly at the root of the quadrant without a folder.

---

## 3. Upstream Vendor Documentation Adaptation

When mirroring official third-party documentation (e.g., Traefik, Kubernetes, Envoy):
1. Place the docs inside an isolated subfolder: `reference/<vendor-name>/`.
2. Consolidate scrapers' `about/` and `index.md` files into a top-level `intro.mdx` with an upstream attribution banner.
3. Conclude `intro.mdx` with a `<DocCardList />` component rendering child cards.
4. Strip web UI noise: floating menus, cookie notices, feedback widgets, and promotional banners.
