# Identity Plugin (`@tupynambalucas-dev/plugin-identity`)

Enterprise AI Agent plugin governing the sovereign Machine Identity plane across `tupynambalucas-dev`: 4-Tier GitHub Apps declarative manifests, canonical Markdown App descriptions, the Cloudflare Zero Trust Identity Portal (`apps.tupynambalucas.dev`), and the Go Token Broker (`foundation/identity/broker`).

---

## 1. Included Skills

| Skill | Responsibility |
| :--- | :--- |
| [app-manifest-architect](./skills/app-manifest-architect/SKILL.md) | Authors and audits 4-Tier GitHub App manifests, enforces the Canonical Markdown App Description Standard, and eliminates deprecated/unsupported GitHub manifest scopes. |
| [identity-portal-architect](./skills/identity-portal-architect/SKILL.md) | Architects and maintains `apps.tupynambalucas.dev` (`core/`, `web/`, `api/`), Zero Trust `/api/github/*` Manifest Flow, Infisical auto-folder callback, `PrGateEvaluatorWorkflow`, and dynamic `/api/apps/status`. |
| [token-broker-operator](./skills/token-broker-operator/SKILL.md) | Configures and audits the Go Security Token Service (`foundation/identity/broker`), `policies.yaml` down-scoping, OIDC JWKS validation, and `No-Privilege-Escalation` boundaries. |

---

## 2. Governance & Validation

- **Domain Rules**: [rules/AGENTS.md](./rules/AGENTS.md)
- **Plugin Manifest**: [plugin.json](./plugin.json)
- **Validation**: `pnpm plugins:validate` (or `agy plugin validate plugins/packages/identity --strict`)
- **License**: Apache License 2.0
