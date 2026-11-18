# Domain Plugin Catalog

Authoritative technical reference detailing all 6 sovereign domain plugins authored in `plugins/packages/*`, their modular skills, active rules, sovereign launcher bindings, and external umbrella consumption paths.

---

## 1. Plugin Specification Matrix

| Plugin Directory | NPM Package | Skills Included | Active Rules | Sovereign Launcher & MCP Targets |
| :--- | :--- | :--- | :--- | :--- |
| `plugins/packages/atelier` | `@vitoria-rodrigues/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect` | Context hierarchy syntax, closed role vocabulary, rule budgets, and manifest validation. | *(none - pure skill/rule plugin)* |
| `plugins/packages/docusaurus` | `@vitoria-rodrigues/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | Diataxis quadrant mandates, MDX v3 parser compatibility, and Crowdin isolation. | *(none - pure skill/rule plugin)* |
| `plugins/packages/github-flow` | `@vitoria-rodrigues/plugin-github-flow` | `github-flow-operator`<br>`github-actions-operator` | SSH commit signing, Conventional Commits header length `<= 72`, and single-branch flow. | `scripts/launcher.cjs` -> `mcp-github-flow` |
| `plugins/packages/repo` | `@vitoria-rodrigues/plugin-repo` | `readme-architect`<br>`monorepo-architect`<br>`community-health-architect`<br>`license-architect`<br>`github-standards-architect` | AGENTS-README co-existence invariant, pnpm catalogs, solution tsconfig references, `.github` standards, and SPDX licensing. | *(none - pure skill/rule plugin)* |
| `plugins/packages/research` | `@vitoria-rodrigues/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | Autonomous documentation retrieval, source attribution invariant, and zero speculative APIs. | `scripts/launcher.cjs` -> `mcp-firecrawl` + `@upstash/context7-mcp` |
| `plugins/packages/web` | `@vitoria-rodrigues/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | Dual-mode operation (headless vs pairing), ARIA snapshotting, and network settle timeouts. | `scripts/launcher.cjs` -> `mcp-playwright`, `mcp-firecrawl` |

---

## 2. Dual Manifest & Two-Tier Sovereign Launcher Standard

Every MCP-enabled plugin in `plugins/packages/*` declares dual configurations for cross-ecosystem compatibility:
1. **`mcp_config.json`**: Consumed by native Google Antigravity sessions, routing execution to `./scripts/launcher.cjs`.
2. **`mcp.json`**: Consumed by cross-vendor runners adhering to the `agent-plugins.org` v1.0.0 specification with `"type": "stdio"`, also routing to `./scripts/launcher.cjs`.
3. **Three-Layer MCP Resolution (`resolveMcpLauncher()`)**: When invoked inside an external repository (via `node_modules/@vitoria-rodrigues/agent-mesh/plugins/packages`) or inside the monorepo, `scripts/launcher.cjs` resolves the target MCP server across:
   - Layer 1: Standalone installed package (`@vitoria-rodrigues/mcp-<name>`).
   - Layer 2: Umbrella package hierarchy (`node_modules/@vitoria-rodrigues/agent-mesh/mcp/servers/<name>/scripts/launcher.cjs`).
   - Layer 3: Monorepo sibling directory (`mcp/servers/<name>/scripts/launcher.cjs`).

---

## 3.Strict Validation Standard

All domain plugins must pass strict Antigravity validation with zero errors and zero warnings:

```bash
# Validate all 6 domain plugins
pnpm plugins:validate

# Validate a specific plugin
agy plugin validate plugins/packages/<plugin-slug> --strict
```
