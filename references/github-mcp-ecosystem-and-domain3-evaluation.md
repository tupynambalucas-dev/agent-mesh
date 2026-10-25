# Comparative Evaluation: GitHub MCP Servers and Domain 3 Administration

This document provides a technical evaluation of available Model Context Protocol (MCP) servers
for GitHub integration across `tupynambalucas-dev`, analyzing whether the current implementation
(`@modelcontextprotocol/server-github`) is optimal, evaluating GitHub's official server
(`github/github-mcp-server`), and justifying why **Domain 3 (Organization Administration)**
relies on the GitHub CLI (`gh`) and REST API scripts.

---

## 1. Executive Summary

AI coding agents and operators in `agent-toolkit` interface with GitHub through a multi-tier
governance architecture:

- **Domain 1 (Developer Operations)**: Pull request creation, conventional commit validation,
  submodule pointer verification, and code browsing.
- **Domain 2 (Security and Auditing)**: Secret scanning alerts, Dependabot triage, CodeQL analysis,
  and commit signature auditing.
- **Domain 3 (Organization Administration)**: Team lifecycle provisioning, repository RBAC binding,
  branch ruleset enforcement, and GitHub Actions secret encryption.

An exhaustive audit of existing MCP implementations reveals that **no single MCP server on the
market covers 100% of Domain 3 administrative capabilities**. Specifically, team provisioning,
team-to-repository RBAC bindings, and Actions secret management are absent from both community and
official GitHub MCP implementations.

Therefore, the **Hybrid Architecture** (MCP for interactive context and repository workflows +
deterministic GitHub CLI scripts for structural administrative mutations) is the industry-recommended,
secure, and stable design pattern.

---

## 2. Technical Feature Matrix: MCP Implementations vs. GitHub CLI

| Capability Domain | `@modelcontextprotocol/server-github` (Current Reference) | `github/github-mcp-server` (Official GitHub Go Server) | GitHub CLI (`gh`) & REST Scripts (Domain 3 Standard) |
| :--- | :--- | :--- | :--- |
| **Runtime Requirements** | **Zero Infrastructure**: Runs via Node.js (`pnpm dlx` / `npx`). Cross-platform. | **Heavy Footprint**: Requires Docker container (`ghcr.io`) or compiled Go v2 binary. | **Native Binary**: Pre-installed or managed via winget/brew/apt. Keyring backed. |
| **Repo, PR & Code Operations** | **Full Support**: Branches, PRs, diffs, files, commits, gists, issues. | **Full Support**: Advanced search, file projections, PR management. | **Full Support**: CLI commands (`gh pr`, `gh repo`, `git`). |
| **Security Alert Triage** | **Full Support**: Secret scanning alerts, Dependabot alerts, Advisories. | **Full Support**: Filtered `code_security`, `secret_protection`, `dependabot`. | **Full Support**: `gh api` queries with jq projections. |
| **Branch Rulesets** | **Partial / Indirect**: Read-only branch protections. | **Native Support**: `create_repository_ruleset`, `repository_ruleset_read`. | **Full Support**: Declarative JSON schemas via `configure-rulesets.sh`. |
| **Team Lifecycle Provisioning** | **Unsupported**: Read-only (`list_teams`, `get_team_members`). No team creation. | **Unsupported**: Read-only (`get_teams`, `get_team_members`). No team creation. | **Native Support**: Idempotent provisioning via `bootstrap-teams.sh`. |
| **Team-to-Repo RBAC Binding** | **Unsupported**: Cannot bind team permissions (`admin`, `maintain`, `push`). | **Unsupported**: Cannot bind repository access to teams. | **Native Support**: Full RBAC automation via `sync-team-permissions.sh`. |
| **Actions Secrets Management** | **Unsupported**: Cannot create or update pipeline secrets. | **Unsupported**: Cannot create or update pipeline secrets. | **Native Support**: Local asymmetric Libsodium encryption (`gh secret set`). |
| **Prompt Injection Resilience** | **Standard**: Read/write tools scoped to developer permissions. | **Configurable**: Supports `--read-only` and `--lockdown-mode`. | **Maximum**: Administrative mutations locked behind deterministic scripts and `lead-architects` RBAC. |

---

## 3. Why Domain 3 Requires GitHub CLI and REST Scripts

There are three architectural and cryptographic constraints why organization-level administration
cannot and should not be delegated entirely to generic MCP tool definitions:

### 3.1 Asymmetric Libsodium Encryption for Actions Secrets

Creating or updating GitHub Actions secrets (`gh secret set --org` or `--repo`) via the REST API
does **not** accept plaintext tokens:

1. The client must first retrieve the target repository or organization public key:
   `GET /orgs/{org}/actions/secrets/public-key`
2. The secret payload must be encrypted on the client machine using **Libsodium / NaCl sealed boxes**
   (`crypto_box_seal`) using Curve25519-XSalsa20-Poly1305.
3. The client submits only the base64-encoded `encrypted_value` and matching `key_id`.

No existing MCP server packages Libsodium cryptographic primitives into its tool definitions.
Exposing raw plaintext secret inputs to an LLM tool introduces severe prompt logging and memory
leakage risks. The GitHub CLI natively handles Libsodium encryption in RAM before transmission.

### 3.2 High-Risk Administrative Surface and Prompt Injection Blast Radius

Operations in Domain 3 (such as deleting an organizational team, downgrading repository permissions,
or wiping a branch protection ruleset) carry severe organizational impact:

- Exposing mutative tools like `delete_team` or `disable_ruleset` directly to LLM tool-calling exposes
  the organization to prompt injection attacks from untrusted repository content (issues, PR bodies,
  or commit messages).
- By decoupling Domain 3 into **deterministic shell/Node.js scripts** executed strictly by
  `lead-architects` through the GitHub CLI, mutations are idempotent, reviewable, and shielded
  from agent hallucination.

### 3.3 Context Window Efficiency

If an MCP server attempted to expose all 300+ GitHub REST administrative endpoints as individual
LLM tools, the JSON schema definitions alone would consume upwards of 30,000 tokens of context on
every prompt turn. Restricting MCP tools to developer workflows (Domain 1) and security auditing
(Domain 2) optimizes model reasoning speed and cost.

---

## 4. Current Setup vs. Official `github/github-mcp-server`

### Current Setup: `@modelcontextprotocol/server-github` via `mcp-runner.js`
- **Strengths**:
  - Pure JavaScript/Node.js: Boots in milliseconds via `pnpm dlx` without container virtualization.
  - Multi-tier fallback: Seamlessly inherits tokens from Infisical Layer 1, local `.env` Layer 2,
    or Antigravity user config Layer 3.
  - Completely sufficient for developer PR authoring, commit verification, and security auditing.
- **Limitations**:
  - Lacks the experimental `create_repository_ruleset` tool introduced in GitHub's Go server.

### Official GitHub Server: `github/github-mcp-server`
- **Strengths**:
  - Developed and maintained directly by GitHub/Microsoft.
  - Offers granular toolsets (`--toolsets repos,pull_requests,actions,governance`).
  - Supports `--lockdown-mode` to mitigate prompt injection from untrusted external contributors.
- **Trade-offs**:
  - Requires Docker daemon running on every developer machine (`docker run ghcr.io/github/github-mcp-server`),
    introducing substantial memory overhead and platform dependency on Windows/macOS.
  - Still **does not solve Domain 3**: It lacks team creation, repository permission binding,
    and secret management.

---

## 5. Architectural Recommendation

1. **Retain Current Node.js MCP for Domains 1 & 2**: Continue using `@modelcontextprotocol/server-github`
   orchestrated by `agent-toolkit/scripts/mcp-runner.js`. It provides lightweight, zero-container
   developer tool execution for all teams.
2. **Standardize Domain 3 on the GitHub CLI & Deterministic Scripts**: Continue executing team
   bootstrapping, RBAC syncing, ruleset configuration, and Actions secrets via:
   - [`agent-toolkit/skills/github-org-manager/scripts/bootstrap-teams.sh`](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-toolkit/skills/github-org-manager/scripts/bootstrap-teams.sh)
   - [`agent-toolkit/skills/github-org-manager/scripts/sync-team-permissions.sh`](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-toolkit/skills/github-org-manager/scripts/sync-team-permissions.sh)
   - [`agent-toolkit/skills/github-org-manager/scripts/configure-rulesets.sh`](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-toolkit/skills/github-org-manager/scripts/configure-rulesets.sh)
3. **Gate All Mutations via Pre-flight Role Check**: Ensure all operator calls invoke
   [`resolve-operator-role.js`](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-toolkit/skills/github-org-manager/scripts/resolve-operator-role.js)
   to enforce domain boundaries before executing administrative commands.
