# @tupynambalucas-dev/mcp-github-org

Domain-scoped Model Context Protocol server for GitHub organization governance, teams, rulesets, and security auditing powered by Tier 1 (`tupynambalucas-org-manager`) GitHub App authentication.

---

## 1. Overview

`@tupynambalucas-dev/mcp-github-org` provides a dual-transport interface (Fastify Streamable HTTP on `:8080` via `dist/index.cjs` and Stdio via `dist/bin.cjs` / `scripts/launcher.cjs`) bound to [`@tupynambalucas-dev/plugin-github-org`](../../../plugins/packages/github-org/README.md).

Authentication and shared schemas from [`@tupynambalucas-dev/mcp-core-github`](../../core/github/README.md) alongside `@modelcontextprotocol/sdk` and `@octokit/*` are bundled directly into `dist/bin.cjs` via `tsup` (`noExternal`), enabling zero-dependency execution across external consumer repositories.

---

## 2. Tools Exposed

| Tool Name | Parameters | Description |
| :--- | :--- | :--- |
| `get_repo_info` | `owner`, `repo` | Fetches repository details, default branch, visibility, and metadata. |
| `list_org_repos` | `org`, `type`, `per_page` | Lists repositories owned by an organization. |
| `list_org_teams` | `org`, `per_page` | Lists teams in the organization with slugs, privacy levels, and descriptions. |
| `list_rulesets` | `owner`, `repo`, `includes_parents` | Lists all branch and tag protection rulesets for a repository. |
| `get_ruleset` | `owner`, `repo`, `ruleset_id` | Retrieves complete ruleset configuration and enforcement status. |
| `list_dependabot_alerts` | `owner`, `repo`, `state`, `severity` | Queries Dependabot vulnerability alerts. |
| `list_secret_scanning_alerts` | `owner`, `repo`, `state` | Queries exposed secrets identified by GitHub Secret Scanning. |

---

## 3. Configuration

| Environment Variable | Description |
| :--- | :--- |
| `ORG_MANAGER_APP_ID` | Numeric GitHub App ID for `tupynambalucas-org-manager` (`5648756`). |
| `ORG_MANAGER_APP_INSTALLATION_ID` | Organization-level App installation ID (`124653780`). |
| `ORG_MANAGER_APP_PRIVATE_KEY_BASE64` | Base64-encoded RSA private key (`.pem`). |
| `ORG_MANAGER_APP_PRIVATE_KEY` | Raw or `\n`-escaped PEM private key string. |
| `ORG_MANAGER_APP_PRIVATE_KEY_PATH` | Filesystem path to mounted `.pem` key file. |
| `PORT` | HTTP port for Streamable HTTP transport (defaults to `8080`). |

---

## 4. Building and Running

```bash
# Bundle the package into dist/bin.cjs and dist/index.cjs
pnpm mcp:github-org:build

# Run via Sovereign Launcher (loads .env cascade)
node scripts/launcher.cjs

# Run via Stdio bundle directly
node dist/bin.cjs

# Run HTTP server
node dist/index.cjs
```
