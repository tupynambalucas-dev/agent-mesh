# @tupynambalucas-dev/agent-mcp-github

Model Context Protocol server for GitHub App authenticated organization RBAC, rulesets, and security auditing.

---

## Overview

`@tupynambalucas-dev/agent-mcp-github` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` and Stdio via `dist/bin.js`) enabling AI agents to interact securely with the GitHub API using machine-level GitHub App credentials.

---

## Tools Exposed

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `get_repo_info` | `owner`, `repo` | Fetches repository details, default branch, visibility, and metadata. |
| `list_org_repos` | `org`, `type` (optional) | Lists repositories owned by an organization. |
| `list_rulesets` | `owner`, `repo` | Lists all branch and tag protection rulesets for a repository. |
| `get_ruleset` | `owner`, `repo`, `rulesetId` | Retrieves complete ruleset configuration and enforcement status. |
| `list_dependabot_alerts` | `owner`, `repo`, `state` (optional) | Queries open Dependabot vulnerability alerts. |
| `list_secret_scanning_alerts` | `owner`, `repo`, `state` (optional) | Queries exposed secrets identified by GitHub Secret Scanning. |

---

## Configuration

| Environment Variable | Description |
| :--- | :--- |
| `GITHUB_APP_ID` | Numeric GitHub App ID. |
| `GITHUB_APP_PRIVATE_KEY` | Private key (.pem) contents formatted as a string or base64. |
| `GITHUB_APP_INSTALLATION_ID` | Organization-level App installation ID. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## Building and Running

```bash
# Build the TypeScript package
pnpm build

# Run via Stdio
node dist/bin.js

# Run HTTP server
node dist/index.js
```
