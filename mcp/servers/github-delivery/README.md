# GitHub Delivery Model Context Protocol Server (`@tupynambalucas-dev/mcp-github-delivery`)

Dual-transport Model Context Protocol (MCP) server for developer Git workflows, branch lifecycle management, pull request reviews, quality gates evaluation, GitHub Actions CI/CD diagnostics, and releases. Exposes tools over both Stdio (`dist/bin.cjs` via `scripts/launcher.cjs`) and Streamable HTTP at `/mcp` on port `8080` (`dist/index.cjs`).

---

## 1. Overview

`@tupynambalucas-dev/mcp-github-delivery` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` via `dist/index.cjs` and Stdio via `dist/bin.cjs` / `scripts/launcher.cjs`) bound to [`@tupynambalucas-dev/plugin-github-flow`](../../../plugins/packages/github-flow/README.md), [`@tupynambalucas-dev/plugin-github-actions`](../../../plugins/packages/github-actions/README.md), and [`@tupynambalucas-dev/plugin-github-releases`](../../../plugins/packages/github-releases/README.md).

Authentication and shared schemas from [`@tupynambalucas-dev/mcp-core-github`](../../core/github/README.md) alongside `@modelcontextprotocol/sdk` and `@octokit/*` are bundled directly into `dist/bin.cjs` via `tsup` (`noExternal`), allowing zero-dependency execution inside external consumer repositories.

---

## 2. Capabilities / Exports Catalog

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `get_repo_info` | `owner`, `repo` | Fetches repository details, default branch, visibility, and metadata. |
| `list_branches` | `owner`, `repo`, `protected`, `per_page` | Lists branches for a repository with protection status and head SHA. |
| `list_pull_requests` | `owner`, `repo`, `state`, `base`, `per_page` | Lists pull requests in a repository filtered by state or base branch. |
| `get_pull_request` | `owner`, `repo`, `pull_number` | Retrieves detailed status, mergeability, and branch metadata for a pull request. |
| `list_workflow_runs` | `owner`, `repo`, `branch`, `status`, `per_page` | Lists GitHub Actions workflow runs for a repository. |
| `get_workflow_run` | `owner`, `repo`, `run_id` | Retrieves execution status, conclusion, and timing for a specific workflow run. |
| `evaluate_pull_request_gates` | `owner`, `repo`, `pull_number` | Evaluates quality gates, check runs, reviews, and branch rulesets compliance for a pull request. |
| `list_releases` | `owner`, `repo`, `per_page` | Lists GitHub releases published for a repository with tag names, release notes, and assets. |

---

## 3. Configuration & Usage

| Environment Variable | Description |
| :--- | :--- |
| `AUTOMATION_APP_ID` | Numeric GitHub App ID for `tupynambalucas-automation` (`5650100`). |
| `AUTOMATION_APP_INSTALLATION_ID` | Installation ID for automation identity. |
| `AUTOMATION_APP_PRIVATE_KEY_BASE64` | Base64-encoded private key for automation identity. |
| `GUARDIAN_APP_ID` | Numeric GitHub App ID for `tupynambalucas-guardian` (Tier 2B). |
| `GUARDIAN_APP_INSTALLATION_ID` | Installation ID for guardian identity. |
| `GUARDIAN_APP_PRIVATE_KEY_BASE64` | Base64-encoded private key for guardian identity. |
| `DEVELOPER_TOOLS_APP_CLIENT_ID` | OAuth Client ID for `tupynambalucas-developer-tools` (`Iv23li59lbd1aDC24pN8`). |
| `GITHUB_TOKEN` | Developer session token (User Access Token or Personal Access Token). |
| `TOKEN_BROKER_URL` | Optional Token Broker URL for zero-secret credential issuance. |
| `GITHUB_ORG` | Default organization slug (defaults to `tupynambalucas-dev`). |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## 4. Development Scripts

```bash
# Bundle the package into dist/bin.cjs and dist/index.cjs
pnpm mcp:github-delivery:build

# Run via Sovereign Launcher (loads .env cascade)
node scripts/launcher.cjs

# Run via Stdio bundle directly
node dist/bin.cjs

# Run HTTP server
node dist/index.cjs

# Typecheck package
pnpm --filter @tupynambalucas-dev/mcp-github-delivery typecheck
```

---

## 5. Governance & Context

This package adheres to enterprise governance standards:
- [Root Context Router](../../../AGENTS.md)
- [MCP Subsystem Context](../../AGENTS.md)
- [MCP Subsystem README](../../README.md)
- [License](./LICENSE): Apache License 2.0
