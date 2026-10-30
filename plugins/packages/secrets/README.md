# Secrets Domain Plugin (`@tupynambalucas-dev/plugin-secrets`)

Enterprise Antigravity and Claude Code domain plugin for secret management, Infisical Cloud vault operations, Universal Auth machine identities, and credential rotation.

---

## 1. Overview

`@tupynambalucas-dev/plugin-secrets` enforces organizational secret hygiene, zero plaintext leakage, strict dev/prod environment isolation, and Kubernetes `InfisicalSecret` Custom Resource synchronization.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus | Tools & Targets |
| :--- | :--- | :--- |
| [**`infisical-vault-operator`**](./skills/infisical-vault-operator/SKILL.md) | Manages secrets across Infisical Cloud projects, folders, and environments, issues Machine Identity credentials, and enforces secret hygiene. | `infisical` MCP server (`infisical_*`). |
| [**`secret-rotation-operator`**](./skills/secret-rotation-operator/SKILL.md) | Orchestrates zero-downtime secret rotation, regenerates GitHub App private keys, rotates database credentials, and synchronizes Kubernetes InfisicalSecret custom resources. | Infisical REST API and rotation runbooks. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [rules/AGENTS.md](./rules/AGENTS.md): Active domain rules, zero plaintext leakage invariant, Machine Identity authentication standards, environment isolation, and Autonomous Domain Mandate.
- [skills/infisical-vault-operator/SKILL.md](./skills/infisical-vault-operator/SKILL.md): Infisical vault management and secret querying.
- [skills/secret-rotation-operator/SKILL.md](./skills/secret-rotation-operator/SKILL.md): Zero-downtime secret rotation and credential regeneration.
- [references/infisical-rest-api-v1-schema.md](./references/infisical-rest-api-v1-schema.md): Infisical REST API v1 endpoint schemas.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio bindings for `@tupynambalucas-dev/mcp-infisical`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP router bindings targeting smart gateway fallback.

---

## 4. Configuration

The underlying MCP servers consumed by this plugin require the following environment variables:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `INFISICAL_CLIENT_ID` | Yes (for Universal Auth) | Infisical Machine Identity Client ID. |
| `INFISICAL_CLIENT_SECRET` | Yes (for Universal Auth) | Infisical Machine Identity Client Secret. |
| `INFISICAL_PROJECT_ID` | Yes | Target Infisical Project ID. |
| `INFISICAL_HOST_URL` | Optional | Infisical instance URL (defaults to `https://app.infisical.com`). |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |
| `CORTEX_PROBE_TIMEOUT_MS` | Optional | Smart gateway probe timeout in milliseconds (defaults to `300`). |

---

## 5. Usage & Activation

### Antigravity (`agy`)

Add to `.agents/plugins.json` in your project root:

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/secrets" }
  ]
}
```

Or install globally via Antigravity CLI:

```bash
agy plugin install @tupynambalucas-dev/plugin-secrets
```

### Claude Code

```bash
/plugin install secrets@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to query, create, update, rotate, or audit secrets, machine credentials, API tokens, or Infisical projects, the agent MUST autonomously engage the Secrets skills (`infisical-vault-operator`, `secret-rotation-operator`) and tools (`infisical_*`) without waiting for explicit skill invocations from the user.
