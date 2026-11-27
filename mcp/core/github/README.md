# GitHub Model Context Protocol Core Library (`@tupynambalucas-dev/mcp-core-github`)

Shared TypeScript core library providing Three-Tier GitHub App authentication, Octokit client factories, and common Zod validation schemas for `agent-mesh` GitHub Model Context Protocol servers.

---

## 1. Overview

`@tupynambalucas-dev/mcp-core-github` centralizes authentication and schema primitives across domain-scoped GitHub MCP servers:
- [`@tupynambalucas-dev/mcp-github-governance`](../../servers/github-governance/README.md): Consumes `getOctokitClient('org-manager')` for Tier 1 administrative governance, rulesets, and security auditing.
- [`@tupynambalucas-dev/mcp-github-delivery`](../../servers/github-delivery/README.md): Consumes `getOctokitClient('developer-tools' | 'guardian' | 'automation')` for Tier 2/3 developer workflows, branches, pull requests, quality gates, and GitHub Actions diagnostics.

---

## 2. Exported API Surface

| Export | Kind | Description |
| :--- | :--- | :--- |
| `config` | Constant (`GitHubConfig`) | Parsed environment configuration supporting Tier 1 (`ORG_MANAGER_APP_*`), Tier 2A (`AUTOMATION_APP_*`), Tier 2B (`GUARDIAN_APP_*`), Tier 3 (`DEVELOPER_TOOLS_APP_*`), and legacy token fallbacks. |
| `resolvePrivateKey` | Function | Resolves RSA PEM private keys deterministically from file path (`_PATH`), Base64 (`_BASE64`), or raw/escaped PEM strings. |
| `getOctokitClient` | Async Function | Instantiates an authenticated `Octokit` client scoped to `'org-manager'`, `'automation'`, `'guardian'`, `'developer-tools'`, or `'auto'` with strict Tier 1 isolation (no privilege escalation fallback). |
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
| `AUTOMATION_APP_ID` | Tier 2A (`automation`) | Numeric GitHub App ID for `tupynambalucas-automation` CI/CD & release delivery. |
| `AUTOMATION_APP_INSTALLATION_ID` | Tier 2A (`automation`) | Organization installation ID for `tupynambalucas-automation`. |
| `AUTOMATION_APP_PRIVATE_KEY_BASE64` | Tier 2A (`automation`) | Base64-encoded RSA private key for `tupynambalucas-automation`. |
| `AUTOMATION_APP_PRIVATE_KEY` | Tier 2A (`automation`) | Raw or `\n`-escaped PEM private key string for `tupynambalucas-automation`. |
| `AUTOMATION_APP_PRIVATE_KEY_PATH` | Tier 2A (`automation`) | Filesystem path to mounted `.pem` key file for `tupynambalucas-automation`. |
| `GUARDIAN_APP_ID` | Tier 2B (`guardian`) | Numeric GitHub App ID for `tupynambalucas-guardian` PR verification & security auditing. |
| `GUARDIAN_APP_INSTALLATION_ID` | Tier 2B (`guardian`) | Organization installation ID for `tupynambalucas-guardian`. |
| `GUARDIAN_APP_PRIVATE_KEY_BASE64` | Tier 2B (`guardian`) | Base64-encoded RSA private key for `tupynambalucas-guardian`. |
| `GUARDIAN_APP_PRIVATE_KEY` | Tier 2B (`guardian`) | Raw or `\n`-escaped PEM private key string for `tupynambalucas-guardian`. |
| `GUARDIAN_APP_PRIVATE_KEY_PATH` | Tier 2B (`guardian`) | Filesystem path to mounted `.pem` key file for `tupynambalucas-guardian`. |
| `DEVELOPER_TOOLS_APP_CLIENT_ID` | Tier 3 (`developer-tools`) | OAuth Client ID for `tupynambalucas-developer-tools` Device Flow. |
| `GITHUB_TOKEN` | Tier 3 / Fallback | Personal Access Token or OAuth User Access Token. |
| `GITHUB_ORG` | Global | Default target organization slug (defaults to `tupynambalucas-dev`). |

---

## 4. Development Scripts

```bash
# Build via root script
pnpm mcp:core-github:build

# Typecheck package
pnpm --filter @tupynambalucas-dev/mcp-core-github typecheck
```

---

## 5. Governance & Context

This core library adheres to enterprise governance standards:
- [Root Context Router](../../../AGENTS.md)
- [MCP Subsystem Context](../../AGENTS.md)
- [MCP Subsystem README](../../README.md)
- [License](./LICENSE): Apache License 2.0
