# Naming Convention Proposal: Agent Mesh

Status: Proposed (pending approval, no renames executed)
Scope: repository, npm packages, plugins, MCP servers, skills
Audience: maintainers of `tupynambalucas-dev/agent-mesh`

## 1. Executive Summary

The current names carry three kinds of redundancy and two kinds of inconsistency:

| Problem | Example | Cause |
| :--- | :--- | :--- |
| Context repeated in the name | `agent-plugin-agent-atelier` would result from `agent-atelier` | `agent-` is already carried by the repo (`agent-mesh`) |
| Namespace repeated in the name | `agent-plugin-meta` inside marketplace `tupynambalucas-dev` | Host tools already namespace components as `<plugin>:<skill>` |
| Role suffix repeated in the container | `agent-architect` containing `*-architect` skills | Container named after the role of its children |
| Drift between sibling identifiers | directory `google-workspace`, package `agent-mcp-gwork`, skills `gwork-*` | Three different short forms of one domain |
| Mixed role vocabulary | `validator`, `enforcer`, `coach`, `manager`, `provisioner`, `designer` | Roles coined per skill instead of from a closed set |

Recommendation: one rule per identifier layer, a closed role vocabulary for skills, and `atelier` (not `agent-atelier`) for the AI engineering plugin.

## 2. Evidence and Sources

| Fact | Source |
| :--- | :--- |
| Plugin `name` is the only required manifest field; kebab-case, unique, no spaces | Claude Code plugins reference, via Context7 `/pjbrito/claude-code-docs` (`plugins-reference.md`) |
| Plugin name is used to namespace components, for example `plugin-dev:agent-creator` | Same source |
| Marketplace validator warns on non kebab-case plugin names; Claude.ai marketplace sync rejects them | Context7 `/pjbrito/claude-code-docs` (`plugin-marketplaces.md`) |
| Duplicate plugin names in one marketplace are an error | Same source |
| Skill `name`: max 64 chars, lowercase letters, digits, hyphens; reserved words `anthropic`, `claude` | Context7 `/pjbrito/claude-code-docs` (`agent-skills/best-practices.md`) |
| Skill `name` must not start or end with a hyphen, no `--`, must equal the parent directory name | Agent Skills specification, agentskills.io (web search) |
| npm scoped name: `@scope/name`, lowercase, URL-safe, no leading `.` or `_`, scope shared across a monorepo, sub-name describes role or domain | npm documentation and validate-npm-package-name (web search) |

> [!NOTE]
> The Firecrawl `search` and `scrape` tools returned `401 Unauthorized: Invalid token` during this research (gateway credential not provisioned locally). Context7 and the built-in web search were used instead. Re-verify the two web-search-derived rows against agentskills.io and docs.npmjs.com once Firecrawl access is restored.

## 3. Governing Principles

1. Name by domain noun, never by role or by container. A plugin is `research`, not `research-manager`.
2. Never repeat context that a parent already provides: scope, repo, marketplace, plugin.
3. One canonical slug per domain. The same slug appears in the directory, manifest, package, and MCP name.
4. Role suffixes come from a closed vocabulary (section 6).
5. Every identifier is kebab-case, lowercase, at most 40 characters (hard limit 64 for skills).
6. Names describe the artifact acted on, not an implementation (`infisical-vault-operator` is acceptable because Infisical is the contract, not an incidental detail).

## 4. Layered Rules

### 4.1 Repository

| Item | Rule | Decision |
| :--- | :--- | :--- |
| Repo name | `<capability-noun>`, no `agent-` repetition inside it | Keep `agent-mesh`: it is the top-level capability name, not a child |
| Org scope | `@tupynambalucas-dev` | Keep |
| Submodule siblings | `org-core`, `platform`, `docs`, `.github` | Keep |

`agent-mesh` stays because it is the root of the hierarchy. The `agent-` redundancy only appears when the prefix is propagated downward.

### 4.2 Directories

| Path | Rule |
| :--- | :--- |
| `plugins/packages/<slug>` | `<slug>` equals the plugin manifest `name` |
| `mcp/packages/<slug>` | `<slug>` equals the MCP package suffix |
| `plugins/packages/<slug>/skills/<skill>` | `<skill>` equals frontmatter `name` (spec requirement) |

### 4.3 npm packages

| Kind | Current | Proposed |
| :--- | :--- | :--- |
| Root | `@tupynambalucas-dev/agent-mesh` | unchanged |
| Plugin | `@tupynambalucas-dev/agent-plugin-<slug>` | `@tupynambalucas-dev/plugin-<slug>` |
| MCP | `@tupynambalucas-dev/agent-mcp-<slug>` | `@tupynambalucas-dev/mcp-<slug>` |

The kind prefix (`plugin-`, `mcp-`) is the only discriminator needed. `agent-` adds nothing because the scope plus kind already identifies the artifact; the repository homepage disambiguates the mesh.

### 4.4 Plugin manifests

| Field | Rule | Example |
| :--- | :--- | :--- |
| `plugin.json` `name` | bare slug, no `agent-plugin-` prefix | `atelier` |
| `marketplace.json` entry `name` | same bare slug | `atelier` |
| Install handle | `<slug>@tupynambalucas-dev` | `atelier@tupynambalucas-dev` |
| Runtime namespace | `<slug>:<skill>` | `atelier:skill-architect` |

Because the host namespaces components as `<plugin>:<skill>`, prefixing the plugin name with `agent-plugin-` makes every skill handle longer without adding information.

### 4.5 MCP servers

| Rule | Example |
| :--- | :--- |
| Directory, package suffix, and server key share one slug | `gwork` in all three |
| Server key equals domain, not vendor product category | `github`, `infisical`, `firecrawl` |

### 4.6 Skills

Format: `<subject>-<role>` where `<subject>` is the artifact or system acted on and `<role>` is from the closed vocabulary.

- Must be unique across the whole mesh (hosts surface skills in a flat list).
- Must not embed the word `agent` unless the subject is literally agents.
- Must match its directory name.

## 5. Plugin Rename Map

| Current | Proposed | Rationale |
| :--- | :--- | :--- |
| `meta` | `atelier` | Container for authoring tools; avoids Meta Platforms collision, avoids `-architect` echo, avoids `agent-` echo |
| `repo-manager` | `repo` | Domain noun; `manager` is a role, not a domain |
| `github-assistant` | `github-flow` | Developer workflow: commits, branches, PRs, Actions |
| `github-manager` | `github-org` | Organization administration: teams, rulesets, security, apps |
| `google-workspace` | `gwork` | Matches existing MCP slug and `gwork-*` skills (removes three-way drift) |
| `appsheet`, `docusaurus`, `research`, `secrets`, `web` | unchanged | Already single domain nouns |

`github-assistant` and `github-manager` are the weakest current names: both are role words, and a user cannot tell which one handles a pull request. The `-flow` and `-org` suffixes name the scope (inner loop versus organization).

## 6. Skill Role Vocabulary (closed set)

| Role | Meaning | Mutates state | Replaces |
| :--- | :--- | :--- | :--- |
| `architect` | Designs or authors structure and artifacts | Files | `designer`, `author`, `builder`, `publisher`, `coach` |
| `operator` | Executes runtime or remote operations | Remote or runtime | `manager`, `provisioner`, `enforcer`, `automator` |
| `auditor` | Read-only verification and reporting | No | `validator` |
| `researcher` | Retrieves and synthesizes external information | No | none |
| `extractor` | Pulls structured content from a source | No | `scraper` |

## 7. Skill Rename Map

| Plugin (proposed) | Current skill | Proposed skill |
| :--- | :--- | :--- |
| `atelier` | `agent-router-architect` | `router-architect` |
| `atelier` | `plugin-manifest-architect` | `plugin-architect` |
| `atelier` | `skill-architect`, `rule-architect`, `hook-architect` | unchanged |
| `repo` | `readme-architect`, `community-health-architect`, `license-architect` | unchanged |
| `github-flow` | `github-flow-coach` | `github-flow-operator` |
| `github-flow` | `github-actions-manager` | `github-actions-operator` |
| `github-org` | `github-org-operator`, `github-security-auditor` | unchanged |
| `github-org` | `github-ruleset-enforcer` | `github-ruleset-operator` |
| `github-org` | `github-app-provisioner` | `github-app-operator` |
| `gwork` | `gwork-drive-manager` | `gwork-drive-operator` |
| `gwork` | `gwork-sheets-builder` | `gwork-sheets-architect` |
| `gwork` | `gwork-docs-publisher` | `gwork-docs-architect` |
| `appsheet` | `appsheet-ui-designer` | `appsheet-ui-architect` |
| `appsheet` | `appsheet-prompt-architect`, `appsheet-data-operator` | unchanged |
| `docusaurus` | `docusaurus-mdx-author` | `docusaurus-mdx-architect` |
| `docusaurus` | `docusaurus-validator` | `docusaurus-auditor` |
| `docusaurus` | `docusaurus-architect` | unchanged |
| `secrets` | `infisical-vault-manager` | `infisical-vault-operator` |
| `secrets` | `secret-rotation-operator` | unchanged |
| `web` | `browser-automator` | `browser-operator` |
| `web` | `browser-desktop-inspector` | `browser-auditor` |
| `web` | `web-scraper` | `web-extractor` |
| `research` | `documentation-researcher`, `web-deep-researcher` | unchanged |

## 8. MCP Rename Map

| Current directory | Current package | Proposed directory | Proposed package |
| :--- | :--- | :--- | :--- |
| `appsheet` | `agent-mcp-appsheet` | `appsheet` | `mcp-appsheet` |
| `firecrawl` | `agent-mcp-firecrawl` | `firecrawl` | `mcp-firecrawl` |
| `github` | `agent-mcp-github` | `github` | `mcp-github` |
| `google-workspace` | `agent-mcp-gwork` | `gwork` | `mcp-gwork` |
| `infisical` | `agent-mcp-infisical` | `infisical` | `mcp-infisical` |
| `memory` | `agent-mcp-memory` | `memory` | `mcp-memory` |
| `playwright` | `agent-mcp-playwright` | `playwright` | `mcp-playwright` |

## 9. Alternatives Considered

| Option | Verdict | Reason |
| :--- | :--- | :--- |
| Keep `agent-plugin-*` / `agent-mcp-*` packages | Rejected | Prefix repeated in every package and every import |
| `agent-atelier` | Rejected | Redundant `agent-` (this document, section 1) |
| `agent-architect` | Rejected | Echoes `-architect` skills |
| `atelier` | Accepted | Single noun, no echo, no brand collision |
| `studio`, `forge`, `factory` | Rejected | `studio` implies GUI tooling; `forge`/`factory` imply bulk templating |
| Namespaced skill names without subject (`architect` alone) | Rejected | Hosts list skills flat; collisions would occur |
| Rename the repo to `mesh` | Rejected | Loses the capability qualifier at the root, where it is not redundant |

## 10. Migration Plan

Execute in one atomic branch (`chore/naming-convention`), signed commits, Conventional Commits.

1. Rename plugin directories and update `plugin.json` `name`, `package.json` `name`, and `.claude-plugin/marketplace.json`.
2. Rename skill directories and frontmatter `name` in lockstep (spec requires equality).
3. Rename MCP directories and packages; update `.mcp.json` server keys and `pnpm-workspace` filters, Turbo pipelines, and `mcp:build` scripts.
4. Update rule text in each `rules/AGENTS.md` (skill names in Rule 0, domain titles).
5. Update `AGENTS.md` and `README.md` routers, including the recursive navigation tables.
6. Search for stale identifiers: `git grep -E "agent-plugin-|agent-mcp-|agent-router-architect|plugin-manifest-architect"`.
7. Run `pnpm --dir agent-mesh install`, `pnpm --dir agent-mesh mcp:build`, and `agy plugin validate <dir> --strict` for every plugin.
8. Bump `org-core` submodule pointer.

> [!WARNING]
> Renames are breaking for any developer who installed plugins by old name or pinned old npm package names. Ship as a major version with a changeset noting the full old-to-new map above.

## 11. Enforcement

Add a `name-lint` check (CI and pre-commit) asserting:

- directory name equals manifest `name` equals frontmatter `name`
- regex `^[a-z0-9]+(-[a-z0-9]+)*$`, length at most 64
- skill suffix is in `{architect, operator, auditor, researcher, extractor}`
- no identifier contains `agent-plugin-`, `agent-mcp-`, `anthropic`, or `claude`

Codify the rules in `atelier` `skill-architect` and `plugin-architect` so new artifacts are named correctly by construction.

## 12. Open Decisions

1. Approve dropping `agent-` from npm package names (`plugin-*`, `mcp-*`).
2. Approve `github-flow` and `github-org` replacing the assistant and manager names.
3. Approve the role vocabulary collapse (section 6), which causes the largest skill rename count (13 renames).
4. Approve `gwork` as the canonical Google Workspace slug.
