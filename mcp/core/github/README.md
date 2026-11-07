# @tupynambalucas-dev/mcp-core-github

Shared TypeScript core library providing Three-Tier GitHub App authentication, Octokit client factories, and common Zod validation schemas for `agent-mesh` GitHub Model Context Protocol servers.

---

## 1. Overview

`@tupynambalucas-dev/mcp-core-github` centralizes authentication and schema primitives across domain-scoped GitHub MCP servers:
- [`@tupynambalucas-dev/mcp-github-org`](../../servers/github-org/README.md): Consumes `getOctokitClient('org-manager')` for Tier 1 administrative governance, rulesets, and security auditing.
- [`@tupynambalucas-dev/mcp-github-flow`](../../servers/github-flow/README.md): Consumes `getOctokitClient('developer-tools')` for Tier 3 developer workflows, branches, pull requests, and GitHub Actions diagnostics.

---

## 2. Exported API Surface

| Export | Kind | Description |
| :--- | :--- | :--- |
| `config` | Constant (`GitHubConfig`) | Parsed environment configuration supporting Tier 1 (`ORG_MANAGER_APP_*`), Tier 2 (`CI_BOT_APP_*`), Tier 3 (`DEVELOPER_TOOLS_APP_*`), and token fallbacks. |
| `resolvePrivateKey` | Function | Resolves RSA PEM private keys deterministically from file path (`_PATH`), Base64 (`_BASE64`), or raw/escaped PEM strings. |
| `getOctokitClient` | Async Function | Instantiates an authenticated `Octokit` client scoped to `'org-manager'`, `'developer-tools'`, or `'auto'`. |
| `ownerRepoSchema` | Zod Schema | Validates `{ owner, repo }` tool inputs defaulting `owner` to `config.GITHUB_ORG`. |
| `formatMcpResponse` | Function | Formats JSON payloads into standard MCP text content responses. |
| `formatMcpError` | Function | Formats runtime exceptions into structured MCP `isError: true` responses. |

---

## 3. Configuration Variables

| Environment Variable | Tier | Description |
| :--- | :--- | :--- |
| `ORG_MANAGER_APP_ID` | Tier 1 (`org-manager`) | Numeric GitHub App ID for organization governance. |
| `ORG_MANAGER_APP_INSTALLATION_ID` | Tier 1 (`org-manager`) | Organization installation ID for `tupynambalucas-org-manager`. |
| `ORG_MANAGER_APP_PRIVATE_KEY_BASE64` | Tier 1 (`org-manager`) | Base64-encoded RSA private key (recommended for `.env` and cloud secrets). |
| `ORG_MANAGER_APP_PRIVATE_KEY` | Tier 1 (`org-manager`) | Raw or `\n`-escaped PEM private key string. |
| `ORG_MANAGER_APP_PRIVATE_KEY_PATH` | Tier 1 (`org-manager`) | Filesystem path to mounted `.pem` key file. |
| `DEVELOPER_TOOLS_APP_CLIENT_ID` | Tier 3 (`developer-tools`) | OAuth Client ID for `tupynambalucas-developer-tools` Device Flow. |
| `GITHUB_TOKEN` | Tier 3 / Fallback | Personal Access Token or OAuth User Access Token. |
| `GITHUB_ORG` | Global | Default target organization slug (defaults to `tupynambalucas-dev`). |

---

## 4. Building & Typechecking

```bash
# Build via root script
pnpm mcp:core-github:build

# Typecheck package
pnpm --filter @tupynambalucas-dev/mcp-core-github typecheck
```
