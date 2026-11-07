# @tupynambalucas-dev/mcp-github-flow

Domain-scoped Model Context Protocol server for developer Git workflows, branches, pull requests, and GitHub Actions CI/CD diagnostics.

---

## 1. Overview

`@tupynambalucas-dev/mcp-github-flow` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` and Stdio via `dist/bin.js`) bound exclusively to [`@tupynambalucas-dev/plugin-github-flow`](../../../plugins/packages/github-flow/README.md). Authentication and shared schemas are delegated to [`@tupynambalucas-dev/mcp-core-github`](../../core/github/README.md).

---

## 2. Tools Exposed

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `get_repo_info` | `owner`, `repo` | Fetches repository details, default branch, visibility, and metadata. |
| `list_branches` | `owner`, `repo`, `protected`, `per_page` | Lists branches for a repository with protection status and head SHA. |
| `list_pull_requests` | `owner`, `repo`, `state`, `base`, `per_page` | Lists pull requests in a repository filtered by state or base branch. |
| `get_pull_request` | `owner`, `repo`, `pull_number` | Retrieves detailed status, mergeability, and branch metadata for a pull request. |
| `list_workflow_runs` | `owner`, `repo`, `branch`, `status`, `per_page` | Lists GitHub Actions workflow runs for a repository. |
| `get_workflow_run` | `owner`, `repo`, `run_id` | Retrieves execution status, conclusion, and timing for a specific workflow run. |

---

## 3. Configuration

| Environment Variable | Description |
| :--- | :--- |
| `GITHUB_TOKEN` | Developer session token (User Access Token or Personal Access Token). |
| `DEVELOPER_TOOLS_APP_CLIENT_ID` | OAuth Client ID for `tupynambalucas-developer-tools` (`Iv23li59lbd1aDC24pN8`). |
| `GITHUB_ORG` | Default organization slug (defaults to `tupynambalucas-dev`). |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## 4. Building and Running

```bash
# Build the TypeScript package
pnpm mcp:github-flow:build

# Run via Stdio
node dist/bin.js

# Run HTTP server
node dist/index.js
```
