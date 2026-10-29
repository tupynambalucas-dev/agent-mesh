# GitHub Flow Domain Plugin (`@tupynambalucas-dev/plugin-github-flow`)

Enterprise Antigravity and Claude Code domain plugin for Git developer workflows, Conventional Commits v1.0.0, cryptographic SSH commit signing, and GitHub Actions orchestration.

---

## 1. Overview

`@tupynambalucas-dev/plugin-github-flow` automates the day-to-day inner loop of software development: feature branching, commit signing, Pull Request creation, and CI/CD diagnosis.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`github-flow-operator`**](./skills/github-flow-operator/SKILL.md) | Guides and assists developers with Git workflows, branch conventions, Conventional Commits, Pull Request creation, and GitHub CLI operations. | `git`, `gh`, GitHub REST/GraphQL APIs. |
| [**`github-actions-operator`**](./skills/github-actions-operator/SKILL.md) | Orchestrates GitHub Actions workflows, triggers runs, polls job logs, and diagnoses CI/CD failures. | `gh workflow`, `gh run`, Actions API. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, SSH signing requirements, Conventional Commits standards, branching strategies, and Autonomous Domain Mandate.
- [skills/github-flow-operator/SKILL.md](./skills/github-flow-operator/SKILL.md): Git workflow execution, Conventional Commits, SSH signing, and pull requests.
- [skills/github-actions-operator/SKILL.md](./skills/github-actions-operator/SKILL.md): GitHub Actions workflow orchestration, log polling, and diagnostics.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for `@tupynambalucas-dev/mcp-github`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting smart gateway fallback.

---

## 4. Configuration

The underlying MCP servers consumed by this plugin require the following environment variables:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `GITHUB_TOKEN` | Yes (or `GITHUB_APP_*`) | Personal Access Token or GitHub App token with repo scopes. |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |
| `CORTEX_PROBE_TIMEOUT_MS` | Optional | Smart gateway probe timeout in milliseconds (defaults to `300`). |

---

## 5. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/github-flow" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-github-flow
```

### Claude Code

```bash
/plugin install github-flow@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to commit changes, create branches, open pull requests, review CI/CD workflows, or diagnose GitHub Actions failures, the agent MUST autonomously engage the GitHub Flow skills (`github-flow-operator`, `github-actions-operator`) without waiting for explicit skill invocations from the user.
