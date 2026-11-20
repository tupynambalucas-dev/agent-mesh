# Domain Plugin Catalog

Authoritative technical reference detailing all 11 sovereign domain plugins authored in `plugins/packages/*`, their modular skills, active rules, sovereign launcher bindings, and external umbrella consumption paths.

---

## 1. Plugin Specification Matrix

| Plugin Directory | NPM Package | Skills Included | Active Rules | Sovereign Launcher & MCP Targets |
| :--- | :--- | :--- | :--- | :--- |
| `plugins/packages/appsheet` | `@tupynambalucas-dev/plugin-appsheet` | `appsheet-prompt-architect`<br>`appsheet-data-operator`<br>`appsheet-ui-architect` | Primary key invariants, formula typography (`UPPERCASE()`), and auto-engagement mandate. | `scripts/launcher.cjs` -> `mcp-appsheet`, `mcp-playwright` |
| `plugins/packages/atelier` | `@tupynambalucas-dev/plugin-atelier` | `router-architect`<br>`skill-architect`<br>`rule-architect`<br>`hook-architect`<br>`plugin-architect`<br>`plan-architect` | Context hierarchy syntax, closed role vocabulary, rule budgets, dual-storage plans, and manifest validation. | *(none - pure skill/rule plugin)* |
| `plugins/packages/docusaurus` | `@tupynambalucas-dev/plugin-docusaurus` | `docusaurus-architect`<br>`docusaurus-mdx-architect`<br>`docusaurus-auditor` | Diataxis quadrant mandates, MDX v3 parser compatibility, and Crowdin isolation. | *(none - pure skill/rule plugin)* |
| `plugins/packages/github-actions` | `@tupynambalucas-dev/plugin-github-actions` | `github-actions-operator` | CI/CD automation engine, composite action modularization, runner diagnostics, and workflow triage. | `scripts/launcher.cjs` -> `mcp-github-flow` |
| `plugins/packages/github-flow` | `@tupynambalucas-dev/plugin-github-flow` | `github-flow-operator` | SSH commit signing, Conventional Commits header length `<= 72`, and single-branch flow. | `scripts/launcher.cjs` -> `mcp-github-flow` |
| `plugins/packages/github-org` | `@tupynambalucas-dev/plugin-github-org` | `github-org-operator`<br>`github-ruleset-operator`<br>`github-security-auditor`<br>`github-app-operator` | Organization RBAC, rulesets, security alert triage, and GitHub App manifest provisioning. | `scripts/launcher.cjs` -> `mcp-github-org` |
| `plugins/packages/github-releases` | `@tupynambalucas-dev/plugin-github-releases` | `github-releases-operator` | SemVer 2.0.0, Release Please Manifest Mode, git-cliff single-changelogs, Keep a Changelog curation, and package distribution. | `scripts/launcher.cjs` -> `mcp-github-flow` |
| `plugins/packages/github-repo` | `@tupynambalucas-dev/plugin-github-repo` | `github-repo-architect`<br>`readme-architect`<br>`readme-auditor`<br>`monorepo-architect`<br>`community-health-architect`<br>`license-architect`<br>`github-standards-architect`<br>`mani-operator` | AGENTS-README co-existence invariant, Enterprise README standard, pnpm catalogs, solution tsconfig references, `.github` standards, and SPDX licensing. | `scripts/launcher.cjs` -> `mcp-github-org` |
| `plugins/packages/research` | `@tupynambalucas-dev/plugin-research` | `documentation-researcher`<br>`web-deep-researcher` | Autonomous documentation retrieval, source attribution invariant, and zero speculative APIs. | `scripts/launcher.cjs` -> `mcp-firecrawl` + `@upstash/context7-mcp` |
| `plugins/packages/secrets` | `@tupynambalucas-dev/plugin-secrets` | `infisical-vault-operator`<br>`secret-rotation-operator` | Zero plaintext leakage invariant, Universal Auth machine identity, and environment isolation. | `scripts/launcher.cjs` -> `mcp-infisical` |
| `plugins/packages/web` | `@tupynambalucas-dev/plugin-web` | `browser-operator`<br>`browser-auditor`<br>`web-extractor` | Dual-mode operation (headless vs pairing), ARIA snapshotting, and network settle timeouts. | `scripts/launcher.cjs` -> `mcp-playwright`, `mcp-firecrawl` |
| `plugins/packages/profile` | `@tupynambalucas-dev/plugin-profile` | `developer-profile-architect`<br>`developer-advancement-strategist`<br>`linkedin-profile-architect`<br>`linkedin-job-operator`<br>`linkedin-application-auditor`<br>`linkedin-outreach-operator` | Dual-presence cohesion, GitHub profile README architecture, resume vault isolation, and human-in-the-loop Easy Apply safety gating. | `scripts/launcher.cjs` -> `mcp-linkedin` |

---

## 2. Dual Manifest & Two-Tier Sovereign Launcher Standard

Every MCP-enabled plugin in `plugins/packages/*` declares dual configurations for cross-ecosystem compatibility:
1. **`mcp_config.json`**: Consumed by native Google Antigravity sessions, routing execution to `./scripts/launcher.cjs`.
2. **`mcp.json`**: Consumed by cross-vendor runners adhering to the `agent-plugins.org` v1.0.0 specification with `"type": "stdio"`, also routing to `./scripts/launcher.cjs`.
3. **Three-Layer MCP Resolution (`resolveMcpLauncher()`)**: When invoked inside an external repository (via `node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages`) or inside the monorepo, `scripts/launcher.cjs` resolves the target MCP server across:
   - Layer 1: Standalone installed package (`@tupynambalucas-dev/mcp-<name>`).
   - Layer 2: Umbrella package hierarchy (`node_modules/@tupynambalucas-dev/agent-mesh/mcp/servers/<name>/scripts/launcher.cjs`).
   - Layer 3: Monorepo sibling directory (`mcp/servers/<name>/scripts/launcher.cjs`).

---

## 3.Strict Validation Standard

All domain plugins must pass strict Antigravity validation with zero errors and zero warnings:

```bash
# Validate all 11 domain plugins
pnpm plugins:validate

# Validate a specific plugin
agy plugin validate plugins/packages/<plugin-slug> --strict
```
