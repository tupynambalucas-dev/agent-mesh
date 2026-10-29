# GitHub Organization Domain Plugin (`@tupynambalucas-dev/plugin-github-org`)

Enterprise Antigravity and Claude Code domain plugin for GitHub organization administration, team RBAC, branch protection rulesets, security scanning, and GitHub App provisioning.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-org` handles the administrative outer loop of GitHub organization governance, repository provisioning, branch protection ruleset enforcement, and GitHub App credentials.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`github-org-operator`**](./skills/github-org-operator/SKILL.md) | Automates organization RBAC, team creation, membership assignments, repository provisioning, and repository transfer runbooks. | `gh api`, GitHub GraphQL. |
| [**`github-ruleset-operator`**](./skills/github-ruleset-operator/SKILL.md) | Defines, audits, and enforces branch protection rulesets and tag rules across repositories in the organization. | `gh api /repos/{owner}/{repo}/rulesets`. |
| [**`github-security-auditor`**](./skills/github-security-auditor/SKILL.md) | Interrogates GitHub Security APIs (Secret Scanning, Dependabot, Code Scanning) leveraging GitHub App installation credentials. | GitHub Security REST APIs. |
| [**`github-app-operator`**](./skills/github-app-operator/SKILL.md) | Provisions GitHub Apps programmatically using the official GitHub App Manifest flow, capturing App ID, Client ID, and private key (`.pem`) for organizational enrollment. | GitHub App Manifest API and local callback server. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, SSH commit signing standards, branch protection rulesets, secret scanning hygiene, and Autonomous Domain Mandate.
- [skills/github-org-operator/SKILL.md](./skills/github-org-operator/SKILL.md): Organization RBAC, team management, and repository provisioning.
- [skills/github-ruleset-operator/SKILL.md](./skills/github-ruleset-operator/SKILL.md): Branch protection rulesets and tag policies.
- [skills/github-security-auditor/SKILL.md](./skills/github-security-auditor/SKILL.md): Security scanning, Dependabot alerts, and Secret Scanning interrogation.
- [skills/github-app-operator/SKILL.md](./skills/github-app-operator/SKILL.md): GitHub App Manifest flow and credential bootstrapping.
- [references/github-app-mcp-spec.md](./references/github-app-mcp-spec.md): Technical specification for GitHub App authentication within MCP servers.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for `@tupynambalucas-dev/mcp-github`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting smart gateway fallback.

---

## 4. Configuration

The underlying MCP servers consumed by this plugin require the following environment variables:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `GITHUB_APP_ID` | Yes (or `GITHUB_TOKEN`) | GitHub App identifier for organizational authentication. |
| `GITHUB_APP_PRIVATE_KEY` | Yes (or `GITHUB_TOKEN`) | RSA private key in PEM format. |
| `GITHUB_APP_INSTALLATION_ID` | Yes (or `GITHUB_TOKEN`) | Target organization installation ID. |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |
| `CORTEX_PROBE_TIMEOUT_MS` | Optional | Smart gateway probe timeout in milliseconds (defaults to `300`). |

---

## 5. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/github-org" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-github-org
```

### Claude Code

```bash
/plugin install github-org@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to provision repositories, configure teams, audit branch protection rulesets, inspect Dependabot/Secret Scanning alerts, or configure GitHub Apps, the agent MUST autonomously engage the GitHub Org skills (`github-org-operator`, `github-ruleset-operator`, `github-security-auditor`, `github-app-operator`) and tools without waiting for explicit skill invocations from the user.
