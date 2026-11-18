# @vitoria-rodrigues/mcp-core-github

Shared TypeScript core library providing Three-Tier GitHub App authentication, Octokit client factories, and common Zod validation schemas for `agent-mesh` GitHub Model Context Protocol servers.

---

## 1. Overview

`@vitoria-rodrigues/mcp-core-github` centralizes authentication and schema primitives across domain-scoped GitHub MCP servers:
- [`@vitoria-rodrigues/mcp-github-flow`](../../servers/github-flow/README.md): Consumes `getOctokitClient('developer-tools')` for Tier 3 developer workflows, branches, pull requests, and GitHub Actions diagnostics.

---

## 2. Exported API Surface

| Export | Kind | Description |
| :--- | :--- | :--- |
| `config` | Constant (`GitHubConfig`) | Parsed environment configuration supporting Tier 1 (`ORG_MANAGER_APP_*`), Tier 2 (`CI_BOT_APP_*`), Tier 3 (`DEVELOPER_TOOLS_APP_*`), and token fallbacks. |
| `resolvePrivateKey` | Function | Resolves RSA PEM private keys deterministically from file path (`_PATH`), Base64 (`_BASE64`), or raw/escaped PEM strings. |
| `getOctokitClient` | Async Function | Instantiates an authenticated `Octokit` client scoped to `'org-manager'`, `'ci-bot'`, `'developer-tools'`, or `'auto'` with strict Tier 1 isolation (no privilege escalation fallback). |
| `ownerRepoSchema` | Zod Schema | Validates `{ owner, repo }` tool inputs defaulting `owner` to `config.GITHUB_ORG`. |
| `formatMcpResponse` | Function | Formats JSON payloads into standard MCP text content responses. |
| `formatMcpError` | Function | Formats runtime exceptions into structured MCP `isError: true` responses. |

---

## 3. Configuration Variables

| Environment Variable | Tier | Description |
| :--- | :--- | :--- |
| `ORG_MANAGER_APP_ID` | Tier 1 (`org-manager`) | Numeric GitHub App ID for organization governance. |
| `ORG_MANAGER_APP_INSTALLATION_ID` | Tier 1 (`org-manager`) | Organization installation ID for `vitoria-rodrigues-org-manager`. |
| `ORG_MANAGER_APP_PRIVATE_KEY_BASE64` | Tier 1 (`org-manager`) | Base64-encoded RSA private key (recommended for `.env` and cloud secrets). |
| `ORG_MANAGER_APP_PRIVATE_KEY` | Tier 1 (`org-manager`) | Raw or `\n`-escaped PEM private key string. |
| `ORG_MANAGER_APP_PRIVATE_KEY_PATH` | Tier 1 (`org-manager`) | Filesystem path to mounted `.pem` key file. |
| `CI_BOT_APP_ID` | Tier 2 (`ci-bot`) | Numeric GitHub App ID for `vitoria-rodrigues-ci-bot` CI/CD & repository automation. |
| `CI_BOT_APP_INSTALLATION_ID` | Tier 2 (`ci-bot`) | Organization installation ID for `vitoria-rodrigues-ci-bot`. |
| `CI_BOT_APP_PRIVATE_KEY_BASE64` | Tier 2 (`ci-bot`) | Base64-encoded RSA private key for `vitoria-rodrigues-ci-bot`. |
| `CI_BOT_APP_PRIVATE_KEY` | Tier 2 (`ci-bot`) | Raw or `\n`-escaped PEM private key string for `vitoria-rodrigues-ci-bot`. |
| `CI_BOT_APP_PRIVATE_KEY_PATH` | Tier 2 (`ci-bot`) | Filesystem path to mounted `.pem` key file for `vitoria-rodrigues-ci-bot`. |
| `DEVELOPER_TOOLS_APP_CLIENT_ID` | Tier 3 (`developer-tools`) | OAuth Client ID for `vitoria-rodrigues-developer-tools` Device Flow. |
| `GITHUB_TOKEN` | Tier 3 / Fallback | Personal Access Token or OAuth User Access Token. |
| `GITHUB_ORG` | Global | Default target organization slug (defaults to `Vitoria-Rodrigues`). |

---

## 4. Building & Typechecking

```bash
# Build via root script
pnpm mcp:core-github:build

# Typecheck package
pnpm --filter @vitoria-rodrigues/mcp-core-github typecheck
```
