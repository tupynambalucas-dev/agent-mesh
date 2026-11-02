# Domain Plugin Catalog

Authoritative technical reference detailing all 10 sovereign domain plugins authored in `plugins/packages/*`, their modular skills, active rules, and scoped MCP bindings.

---

## Plugin Specification Matrix

| Plugin Directory | NPM Package | Skills Included | Active Rules | MCP Bindings |
| :--- | :--- | :--- | :--- | :--- |
| `plugins/packages/appsheet` | `@tupynambalucas-dev/plugin-appsheet` | `appsheet-prompt-architect`<br>`appsheet-data-operator`<br>`appsheet-ui-architect` | Primary key invariants, formula typography (`UPPERCASE()`), and auto-engagement mandate. | `appsheet`<br>`playwright` |
| `plugins/packages/atelier` | `@tupynambalucas-dev/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect` | Context hierarchy syntax, closed role vocabulary, rule budgets, and manifest validation. | *(none)* |
| `plugins/packages/docusaurus` | `@tupynambalucas-dev/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | Diataxis quadrant mandates, MDX v3 parser compatibility, and Crowdin isolation. | *(none)* |
| `plugins/packages/github-flow` | `@tupynambalucas-dev/plugin-github-flow` | `github-flow-operator`<br>`github-actions-operator` | SSH commit signing, Conventional Commits header length `<= 72`, and single-branch flow. | `github` |
| `plugins/packages/github-org` | `@tupynambalucas-dev/plugin-github-org` | `github-org-operator`<br>`github-ruleset-operator`<br>`github-security-auditor`<br>`github-app-operator` | Organization RBAC, rulesets, security alert triage, and GitHub App manifest provisioning. | `github` |
| `plugins/packages/gwork` | `@tupynambalucas-dev/plugin-gwork` | `gwork-drive-operator`<br>`gwork-sheets-architect`<br>`gwork-docs-architect` | Service account hygiene, 1NF Sheets modeling, frozen header rows, and Docs typography. | `gwork` |
| `plugins/packages/repo` | `@tupynambalucas-dev/plugin-repo` | `readme-architect`<br>`monorepo-architect`<br>`community-health-architect`<br>`license-architect` | AGENTS-README co-existence invariant, pnpm catalogs, solution tsconfig references, and SPDX licensing. | *(none)* |
| `plugins/packages/research` | `@tupynambalucas-dev/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | Autonomous documentation retrieval, source attribution invariant, and zero speculative APIs. | `context7`<br>`firecrawl` |
| `plugins/packages/secrets` | `@tupynambalucas-dev/plugin-secrets` | `infisical-vault-operator`<br>`secret-rotation-operator` | Zero plaintext leakage invariant, Universal Auth machine identity, and environment isolation. | `infisical` |
| `plugins/packages/web` | `@tupynambalucas-dev/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | Dual-mode operation (headless vs pairing), ARIA snapshotting, and network settle timeouts. | `playwright`<br>`firecrawl` |

---

## Dual Manifest Standards

Every plugin in `plugins/packages/*` declares dual configurations for cross-ecosystem compatibility:
1. **`mcp_config.json`**: Consumed by native Google Antigravity sessions. Points command execution to `../../../scripts/mcp-gateway-router.js`.
2. **`mcp.json`**: Consumed by cross-vendor runners adhering to the `agent-plugins.org` v1.0.0 specification with `"type": "stdio"`.

---

## Strict Validation Standard

All domain plugins must pass strict Antigravity validation with zero errors and zero warnings:

```bash
agy plugin validate plugins/packages/<plugin-slug> --strict
```
