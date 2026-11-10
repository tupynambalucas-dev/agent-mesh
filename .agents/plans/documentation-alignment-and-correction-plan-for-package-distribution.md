# Documentation Alignment and Correction Plan: Package Distribution, Sovereign Launchers and Cross-Repository Consumption

**Organization**: `tupynambalucas-dev`
**Scope**: `org-core/AGENTS.md` and `README.md` (Layer 1), `agent-mesh/**` (all `README.md`, `AGENTS.md`, `references/`, `.agents/`, `CHANGELOG.md`), and the consumer repositories (`omnichannel`, `platform`, `docs`) where they describe how agent-mesh is imported.
**Document Standard**: en-US technical specification, Zero-Emoji Policy.
**Purpose**: Authoritative punch list of every documentation change required so that all docs match the implemented architecture. This plan does not change code; each item is an edit to be executed and then verified against the checklist in section 7.

---

## 1. Ground Truth: Implemented State (Source of Truth for All Edits)

Every corrected document MUST agree with the following facts. Each was verified against the repository on 2026-11-10.

### 1.1 Distribution

| Fact | Verified value | Evidence |
| :--- | :--- | :--- |
| Umbrella package | `@tupynambalucas-dev/agent-mesh`, version `1.2.0`, `publishConfig` GitHub Packages, `access: public` | `agent-mesh/package.json` |
| Umbrella `files` | `.claude-plugin/`, `scripts/`, `plugins/packages/`, `presets/`, `mcp/`, `README.md`, `LICENSE` | `agent-mesh/package.json` |
| Publish pipeline | `publish.yml` runs typecheck, MCP build, plugin validation, `manage-packages.js` reconcile, then `pnpm run packages:publish` = `pnpm -r publish --access public --no-git-checks --report-summary && node ./scripts/publish-root.cjs` | `agent-mesh/package.json`, `.github/workflows/publish.yml` |
| Root publisher | `scripts/publish-root.cjs` exists and is part of the pipeline (idempotent on E409) | `agent-mesh/scripts/publish-root.cjs` |
| Registry auth reality | `npm.pkg.github.com` requires a token with `read:packages` even for public packages; anonymous installs return 401 | Observed during PR #52 and omnichannel validation |
| Token-free consumption path | `github:tupynambalucas-dev/agent-mesh` git dependency; works because MCP bundles are committed | `.gitignore` rule `!mcp/servers/*/dist/` (PR #53) |
| Active consumer specs | omnichannel: catalog `plugins-stack` -> `github:` spec; platform and docs: literal `"github:tupynambalucas-dev/agent-mesh"` in `package.json`; org-core: relative paths | `omnichannel/pnpm-workspace.yaml`, `platform/package.json`, `docs/package.json`, `org-core/.agents/plugins.json` |

### 1.2 Runtime

| Fact | Verified value |
| :--- | :--- |
| MCP server build | `tsup` (declarative `tsup.config.ts`), CommonJS, `noExternal` inlines SDK, Octokit, Fastify, Zod; outputs `dist/bin.cjs` (Stdio) and `dist/index.cjs` (Fastify HTTP on `:8080`) |
| MCP server entry points | `package.json` `main: dist/index.cjs`, `bin: { mcp-<name>: ./scripts/launcher.cjs }` |
| Per-server files | `scripts/launcher.cjs`, `mcp.json`, `tsup.config.ts`, committed `dist/` |
| Playwright exception | `playwright` and `playwright-core` stay external. `mcp/servers/playwright/scripts/launcher.cjs` runs the sovereign bundle only when `playwright` is resolvable; otherwise it spawns `npx -y @playwright/mcp@0.0.84` with flags derived from `PLAYWRIGHT_MODE` |
| Plugin launcher resolution order | cluster gateway via `mcp-remote` when `MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`; otherwise `resolveMcpLauncher()`: (1) installed `@tupynambalucas-dev/mcp-<name>` package, (2) umbrella layout `mcp/servers/<name>`, (3) monorepo sibling `mcp/servers/<name>` |
| `npx -y @tupynambalucas-dev/mcp-<name>` | No longer part of the plugin launcher resolution order |
| Verified in omnichannel | All 8 MCP launchers and 7 plugin launchers start over Stdio from `node_modules` with no extra dependency installed |

### 1.3 Repository structure (items docs currently omit)

- `presets/` (4 files), `.claude-plugin/marketplace.json`, `.github/` (workflows, composite actions, `manage-packages.js`), `.changeset/`, `CHANGELOG.md`, `scripts/publish-root.cjs`.
- `.agents/analyses/` (3 files) exists in addition to `plans/` and `reports/`.
- `plugins/core/` contains only `.gitkeep`.
- Root `package.json` has no `plugins:validate` script.
- Workspace pins: pnpm `10.33.2`, TypeScript catalog `^6.0.3`, `tsup ^9.0.0` in the default catalog.

---

## 2. Severity Legend

| Level | Meaning |
| :--- | :--- |
| P0 | Factually wrong and will cause a consumer failure or wrong decision (install steps, broken auth, nonexistent commands) |
| P1 | Stale architecture description that contradicts the implementation |
| P2 | Missing coverage, counts, indexes, or cross-links |
| P3 | Cosmetic or consistency |

---

## 3. P0 Corrections

### P0-1. `references/reference/umbrella-package-and-presets.md`

- Section 1: `"version": "1.0.0"` -> `1.2.0`. Replace the static manifest excerpt with a pointer to `package.json` plus the `files` list.
- Section 2: directory layout omits `mcp/servers/*` (with committed `dist/`, `scripts/launcher.cjs`, `mcp.json`) and `scripts/publish-root.cjs`. Add them.
- Section 4 (MCP Runtime Execution Guarantee), step 2 states plugins execute `npx -y @tupynambalucas-dev/mcp-<name>`. This is wrong. Replace with the three-layer `resolveMcpLauncher()` order from section 1.2 and the cluster gateway branch.
- Add a new section "Installation Channels" with two rows: (a) GitHub Packages registry (requires `NODE_AUTH_TOKEN` with `read:packages`, spec `^1.2.0`), (b) git dependency (`github:tupynambalucas-dev/agent-mesh`, no token, depends on committed `dist/`). State which one each repository uses today.
- Add a "Preset Resolution" note: preset files use `"path": "../plugins/packages"` relative to the preset file location, and mark the `inherits` consumption pattern as unverified until validated in `agy` (see open decision D2).

### P0-2. `references/how-to-guides/consuming-plugins-in-antigravity-and-claude.md`

- Scenario B step 1 and 2 present registry routing with `^1.0.0` as the primary path. A consumer without a token gets 401. Rewrite as two sub-options: B1 token-free git dependency (recommended default for isolated repos and CI without package scope), B2 registry install with `.npmrc` `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}` and the required token scope. Never embed the token itself.
- Add the catalog form actually used by `omnichannel` (`plugins-stack` -> `github:` spec) and the direct form used by `platform` and `docs`; flag the `platform` and `docs` literal spec as a catalog-rule deviation (see P1-9).
- Scenario D, item 1 ("Standalone Process Fallback ... `npx -y @tupynambalucas-dev/mcp-<name>`") is stale. Replace with the resolution order from section 1.2.
- Scenario C (global `pnpm add -g`) also hits the 401 problem. Add the token requirement or switch to the git spec.
- Add a "Playwright in consumer repositories" subsection: sovereign bundle if `playwright` resolvable, otherwise upstream `@playwright/mcp@0.0.84`; browsers are never bundled.
- Add a troubleshooting table: 401/403 on install, `Cannot find package '@modelcontextprotocol/sdk'` (means an old unbundled build was installed), `Cannot find module 'playwright'` (fixed by launcher fallback; document expected message `Engaging upstream Playwright MCP in '<mode>' mode`).

### P0-3. `references/tutorials/getting-started-with-agent-mesh.md`

- Step 3 instructs `pnpm plugins:validate`. The script does not exist. Replace with the real validation entry point (`.github/actions/validate-plugins/action.yml` runs `agy plugin validate --strict` per plugin) or add the script (decision D4).
- Step 2: `dist/bin.js` and `dist/index.js` -> `dist/bin.cjs` and `dist/index.cjs`; add that the build is `tsup` and that `dist/` is committed.
- Step 1 prerequisites: pnpm "version 9 or higher" -> `10.x` (`packageManager: pnpm@10.33.2`); catalog description "TypeScript 5.8+" -> `^6.0.3`; verify Node minimum against `tsup` target `node20` and state it.
- Step 4 covers only the relative-path scenario. Add a short "consume from another repository" step linking to the how-to guide.

### P0-4. `scripts/README.md` and `scripts/AGENTS.md`

- `scripts/README.md` section 1 says "custom scripts retired ... `publish-packages.js` deprecated" and claims zero-script publishing. Reality: `scripts/publish-root.cjs` is a live part of `packages:publish`. Rewrite section 1 to describe the two-step pipeline (recursive workspace publish, then idempotent root publish) and the file inventory (`publish-root.cjs`).
- Section 2 step 3 ("executes local precompiled binary `mcp/servers/<service>/dist/bin.js`") and step 4 ("`npx -y @tupynambalucas-dev/mcp-<service>`") are stale. Replace with the resolution order from section 1.2 and `dist/bin.cjs`.
- `scripts/AGENTS.md`: replace the "Zero-Script Publishing" bullet and add `publish-root.cjs` to the navigation list. Note that `plugins/packages/<plugin>/scripts/launcher.cjs` and `mcp/servers/<server>/scripts/launcher.cjs` are the two launcher tiers.

### P0-5. `README.md` (agent-mesh root)

- Directory tree lists `scripts/publish-packages.js`; the file is `publish-root.cjs`. The `scripts/` subtree also has broken indentation that places `references/` and `.agents/` visually under `scripts/`. Rebuild the tree.
- Tree omits `presets/`, `.github/`, `.changeset/`, `CHANGELOG.md`, `.npmrc`. Add them.
- Section 2 "Granular Consumption Guide" has no coverage of the umbrella package, presets, git dependency, or the 401 behavior. Scenario B currently tells readers to `pnpm add -D @tupynambalucas-dev/plugin-*` per plugin and to point `plugins.json` at `node_modules/@tupynambalucas-dev/plugin-*`. Add Scenario B0 (umbrella package, bulk and `include_only`) as the primary pattern and demote per-plugin installs to "advanced".
- Add a "Distribution Channels" section linking to the umbrella reference.
- `.agents/` subtree lists `plans/` and `reports/` but not `analyses/`.

---

## 4. P1 Corrections

### P1-1. `AGENTS.md` (agent-mesh root)

- Architecture bullet "Dual-Transport MCP Servers": `dist/bin.js` -> `dist/bin.cjs`; mention tsup self-contained bundles committed to Git.
- Bullet "Dependency Catalogs": `(catalog:, catalog:shared, catalog:mcp-stack, catalog:)` repeats `catalog:`; correct list is `catalog:` (default), `catalog:shared`, `catalog:mcp-stack`.
- Bullet "Sovereign MCP Engine": claims the Playwright engine is "staged for future Kubernetes Cortex hosting while developer sessions delegate to upstream `@playwright/mcp`". Reality: the web plugin launcher resolves the sovereign MCP launcher first, which uses the bundled engine when `playwright` is resolvable and falls back to upstream otherwise. Rewrite.
- Navigation list: add `presets/`, `.claude-plugin/`, and `.github/` with one-line purposes; the `scripts` description ("Smart MCP gateway router, fallback runners") refers to the retired router and must be replaced by "release publisher and launcher notes".
- Add a "Distribution and Consumption" section (umbrella package, git vs registry, sovereign launchers) with links into `references/`.
- Add a guardrail: MCP server `dist/` directories are committed build artifacts; any change under `mcp/servers/*/src` MUST be accompanied by a rebuilt `dist/`.

### P1-2. `mcp/AGENTS.md` and `mcp/README.md`

- `dist/bin.js` / `dist/index.js` -> `.cjs` in the architecture bullet and in all 8 matrix rows of `mcp/README.md`; `mcp-core-github` row keeps `dist/index.js` only if that package is still built with `tsc` (verify; if so, annotate that core libraries are not bundled and are inlined into server bundles).
- Playwright row: replace "Current local plugin workflows delegate via `launcher.cjs` to upstream `@playwright/mcp@0.0.84`" with the behavior in section 1.2.
- Add a column or subsection "Launcher and bundle" referencing `scripts/launcher.cjs`, `mcp.json`, `tsup.config.ts`.
- Build section: add `pnpm mcp:build` produces committed bundles and the rule to commit `dist/`.
- `mcp/AGENTS.md` "Catalog Consumption": add `catalog:` for `tsup`.

### P1-3. `mcp/servers/*/README.md` (8 files) and `mcp/servers/*/AGENTS.md` (8 files)

- All READMEs: "Run via Stdio: `node dist/bin.js`" and "HTTP: `node dist/index.js`" -> `.cjs`; add `npx`-free invocation `node scripts/launcher.cjs` as the supported entry and the `bin` name `mcp-<name>`.
- Add a "Standalone consumption" paragraph: no peer or runtime dependency is required in the consumer because the SDK and libraries are bundled.
- `mcp/servers/playwright/README.md` and `AGENTS.md`: replace the "Staged Reference Package" note and the sentence that active workflows invoke upstream `@playwright/mcp`; document the resolve-or-fallback logic, `browsers.json` is not shipped, and the two env-driven mode mappings (`extension`, `cdp`, `channel`, `headless`). AGENTS "Dual Transport ... `dist/bin.js`" -> `.cjs`.
- Each server AGENTS "Directory Layout" must list `scripts/launcher.cjs`, `mcp.json`, `tsup.config.ts`, `dist/`.
- `mcp/servers/playwright/references/playwright-mcp-extension-bridge-and-token-spec.md` line 83 uses a sequence diagram participant `mcp-gateway-router.js`; rename to the plugin `launcher.cjs`.

### P1-4. `plugins/README.md`, `plugins/AGENTS.md`, and the 10 plugin READMEs

- `plugins/AGENTS.md` architecture item 2: add the sovereign resolution chain and that plugins have no dependency on files outside their package or the umbrella layout.
- Each plugin README "Usage and Activation" shows only `{ "path": "agent-mesh/plugins/packages/<name>" }`, which works only inside `org-core`. Add a second snippet for external consumers: `{ "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages", "include_only": ["<name>"] }`. Applies to: appsheet, atelier, docusaurus, github-flow, github-org, gwork, repo, research, secrets, web.
- Plugin READMEs that describe a launcher (`web`, `appsheet`, `research`, `secrets`, `gwork`, `github-*`) must state the target MCP server and the three-layer resolution; `web` must also document the Playwright fallback.
- Plugin `package.json` `files` for plugins do not list `scripts` consistently; verify each plugin ships `scripts/launcher.cjs`, `mcp.json`, `mcp_config.json` and add to `files` where missing (the `web` plugin does).

### P1-5. `references/explanation/dual-transport-and-zero-downtime-failover.md`

- `dist/index.js` / `dist/bin.js` -> `.cjs` (diagram lines 29, 39, 60).
- The failover narrative describes a central router that spawns `node mcp/servers/<target>/dist/bin.js`. Rewrite so the "router" is the per-plugin launcher and the local branch is the sovereign MCP launcher resolved via section 1.2.
- Add the bundling rationale (why `noExternal` and committed `dist/`).

### P1-6. `references/how-to-guides/configuring-smart-gateway-local-failover.md`

- Same router-versus-launcher correction; sample log line at line 51 (`[mesh-router] AgentGateway offline. Engaging local compiled binary: node .../dist/bin.js`) must use the real `[launcher:<plugin>]` prefix and `.cjs`. Verify against actual launcher stderr strings (`[launcher:<plugin>] Engaging sovereign MCP executable for '<service>': node <path>`).

### P1-7. `references/explanation/agent-mesh-architecture-and-topology.md`

- Topology tree: `scripts/ # Smart Gateway Router & Publishing Pipelines` -> release publisher; add `presets/`.
- Pillar 1 "Granular Importability": extend with umbrella package, presets, and the independence invariant (sovereign launchers plus self-contained bundles).
- Add a new pillar "Self-Contained Distribution" summarizing bundling, committed `dist/`, git vs registry channels.

### P1-8. `references/reference/domain-plugin-catalog.md` and `mcp-server-catalog.md`

- `domain-plugin-catalog.md`: add a launcher column (target MCP server, fallback behavior) and the umbrella consumption path per plugin.
- `mcp-server-catalog.md`: already updated for sovereign launchers; verify that the "Server & Core Matrix" entrypoint column and the Dual Transport section use `.cjs`, and add the Playwright resolve-or-fallback rule if absent.
- `naming-conventions-and-scoping-standard.md`: add the umbrella name `@tupynambalucas-dev/agent-mesh` (root package) to the taxonomy; today it documents only `plugin-*` and `mcp-*`.

### P1-9. Consumer repositories: how they describe agent-mesh

- `omnichannel/.agents/README.md` and `AGENTS.md`: both list eight `@tupynambalucas-dev/plugin-*` packages with `node_modules/@tupynambalucas-dev/plugin-<name>` paths. Actual `plugins.json` points at `node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages` (all 10 plugins). Rewrite the table around the umbrella package, correct the plugin list (appsheet and gwork are loaded too), and document the `github:` spec and why (no token).
- `omnichannel/README.md` line 62 ("Install workspace dependencies and Agent Mesh plugins from pnpm catalogs") is acceptable but should link to the corrected `.agents/README.md`.
- `platform/package.json` and `docs/package.json` use a literal `"@tupynambalucas-dev/agent-mesh": "github:tupynambalucas-dev/agent-mesh"`. The repo rule requires `catalog:` consumption. Either move the spec into each `pnpm-workspace.yaml` catalog (recommended, consistent with omnichannel) or document the exception. Corresponding `AGENTS.md`/`README.md` for `platform/.agents` and `docs/.agents` do not mention agent-mesh at all; add a one-paragraph "Agent Mesh consumption" note in each.

---

## 5. P2 and P3 Corrections

### P2-1. Counts and inventories

- `CHANGELOG.md` stops at `1.0.0` and says "7 MCP Servers" (now 8). Add entries for 1.1.0 and 1.2.0 via changesets (sovereign launchers, tsup bundling, committed `dist/`, Playwright fallback, umbrella package). Do not hand-edit generated sections if changesets owns them; add changesets first.
- All per-package `CHANGELOG.md` for `mcp-*` should receive a minor entry for bundling.
- `.claude-plugin/marketplace.json` lists plugin versions `1.0.0`; confirm they equal each `plugin.json` and update together with plugin releases.

### P2-2. Indexes and cross-links

- `.agents/README.md` and `.agents/AGENTS.md`: add this plan to the Plans index.
- `agent-plugins-distribution-presets-and-external-consumption-architecture.md` (plan) was authored before the git-distribution and sovereign launcher decisions. Add a status banner at the top: "Superseded in part: see References umbrella spec, sections Installation Channels and Preset Resolution", and mark which sections remain valid.
- `github-packages-visibility-and-dynamic-lifecycle-governance.md` (plan): add a banner that public visibility does not remove the token requirement for reads; link to the umbrella spec.
- `references/README.md` and `references/AGENTS.md`: add the new troubleshooting and installation-channel anchors under the Consuming Plugins entry, and update the entry description ("Local `.agents/plugins.json` integration, CLI installation, and Claude marketplace usage") to include external consumption via umbrella package and git dependency.
- `references/AGENTS.md` and `README.md`: no new files needed; per the 3-layer ceiling do not add `AGENTS.md` or `README.md` inside quadrant folders.

### P2-3. `org-core` root (`AGENTS.md`, `README.md`)

- Both describe "five core repositories" and the Mani manifest lists `.github`, `agent-mesh`, `platform`, `docs`, `gh-tl`. `omnichannel` is a sibling consumer repository on disk but is neither in `mani.yaml` nor in either root doc. Decision D3: add `omnichannel` to `mani.yaml`, the workspace file, the README table and `AGENTS.md` navigation, or document it explicitly as an external consumer.
- `AGENTS.md` "Required Skills" and navigation: add a short "Agent Mesh consumption modes" bullet: inside org-core use relative paths in `.agents/plugins.json`; everywhere else use the umbrella package.
- `org-core/README.md`: add a short section linking to `agent-mesh/references/how-to-guides/consuming-plugins-in-antigravity-and-claude.md`.

### P2-4. `.github` repository references (requested earlier to be documented there)

- `references/reference/github-packages-and-token-boundary-governance.md` covers visibility and reconciliation but has zero coverage of: the read-token requirement for public packages, the git-dependency distribution channel, committed `dist/` bundles, or the actor attribution of publish runs for the umbrella package. Add sections 3.3 "Read Access Reality for Public Packages" and 3.4 "Token-Free Git Distribution Channel" (include the decision table from P0-1).
- `references/reference/actions-workflows-and-ci-governance.md`: add the `publish.yml` pipeline order and the `publish-root.cjs` step.
- `references/explanation/ai-agents-and-enterprise-governance.md` line 119 still describes `org-core` as pinning `160000` Git submodule pointers. This contradicts the root rule that submodules are deprecated and removed; correct to Mani orchestration. Also scan `.agents/plans/meta-repository-architecture/*` (history, add superseded banner rather than rewrite) which repeatedly say "Git Submodule".
- `.github/references/README.md`: add index entries if a new reference is created.

### P3. Cosmetic

- `references/how-to-guides/consuming-plugins-in-antigravity-and-claude.md` and `README.md` section numbering and heading style should match across docs (use `##` numbered sections consistently).
- Replace "Smart Gateway" terminology with "launcher" wherever the retired router is meant, keep "Cortex Gateway" for the cluster endpoint.
- Remove duplicate `catalog:` listings in prose; standardize on the three catalog names.

---

## 6. Execution Plan

| Phase | Content | Files | Branch and commit scope |
| :--- | :--- | :--- | :--- |
| 1 | P0 corrections in agent-mesh | umbrella reference, consuming guide, getting-started tutorial, `scripts/*`, root `README.md` | `docs/align-distribution-p0` / `docs(references): align distribution docs with umbrella and sovereign launchers` |
| 2 | P1 in agent-mesh | root `AGENTS.md`, `mcp/**`, `plugins/**`, explanation and reference docs | `docs/align-distribution-p1` |
| 3 | Consumer repositories | `omnichannel/.agents/*`, `platform`, `docs` catalog and notes | one PR per repository, `docs/` or `chore/` prefix |
| 4 | P2 and `.github` | CHANGELOG via changesets, indexes, plan banners, `.github/references/*` | `docs/align-distribution-p2` per repository |
| 5 | `org-core` root | `AGENTS.md`, `README.md`, optional `mani.yaml` | `docs/org-core-agent-mesh-consumption` |

Rules for every phase: SSH-signed Conventional Commits, no emojis, relative links only, no `AGENTS.md` or `README.md` inside Diataxis quadrant folders or `.agents/plans`, `.agents/reports`, English only, do not edit `i18n/` (docs repo).

---

## 7. Verification Checklist (Run After Each Phase)

1. Stale-token scan returns zero hits in non-historical docs:
   `git grep -nE "dist/bin\.js|dist/index\.js|publish-packages\.js|mcp-gateway-router|npx -y @tupynambalucas-dev/mcp-" -- '*.md' ':!.agents/plans' ':!.agents/reports' ':!.agents/analyses' ':!**/CHANGELOG.md'` (the `mcp-core-github` entry may remain if it is still `tsc`-built).
2. Link integrity: every relative Markdown link resolves on disk (run the `docusaurus-auditor` or a link-check script over `agent-mesh/**/*.md`).
3. Count integrity: "10 plugins", "8 MCP servers", "1 core library" consistent across README, AGENTS, references.
4. Every `AGENTS.md` has a sibling `README.md` for Layers 1 to 3 (plugin `rules/AGENTS.md` exempt); no Layer 4 files.
5. Behavioral cross-check from a clean clone of `omnichannel`: `pnpm install` then run each documented command from the guides verbatim; they must succeed without extra setup.
6. `agy plugin validate --strict` passes for all plugins after any manifest or `files` change.
7. Zero-emoji scan over changed files.

---

## 8. Open Decisions

| ID | Question | Recommendation |
| :--- | :--- | :--- |
| D1 | Primary external channel: git dependency or authenticated registry? | Keep git dependency as default (no token), document registry as the pinned-release option for CI with `read:packages`. Revisit if committed `dist/` churn becomes a problem; the alternative is a release branch or tag that carries bundles. |
| D2 | Is `"inherits"` in `.agents/plugins.json` supported by `agy`? No consumer uses presets today. | Validate empirically; if unsupported, rewrite presets as documented `include_only` snippets and delete the `inherits` pattern from docs. |
| D3 | Is `omnichannel` part of the org-core workspace (mani, README, AGENTS)? | Add it; it is the reference external consumer and is already a core repository on disk. |
| D4 | Add a root `plugins:validate` script or reference the CI composite action in docs? | Add the script (wrap `agy plugin validate --strict` over `plugins/packages/*`) so the tutorial command is real. |
| D5 | Should `platform` and `docs` move the git spec into a pnpm catalog? | Yes, to satisfy the monorepo catalog rule and match omnichannel. |

---

## 9. Items Verified as Already Correct (No Action)

- `references/reference/mcp-server-catalog.md` sections "Sovereign Launcher and Self-Contained Bundling Architecture".
- Plugin and MCP counts in `README.md` and `references/README.md` (10 plugins, 8 servers, 1 core).
- `plugins/AGENTS.md` and `plugins/README.md` package tables, manifests links, and rules links.
- `org-core/.agents/plugins.json` (relative paths) and `omnichannel/.agents/plugins.json` (umbrella path), consistent with the intended model.
- Apparent character corruption (`DiÃ¡taxis`) seen when listing files through a legacy-encoded console is a display artifact; the files are valid UTF-8 and need no edit.
