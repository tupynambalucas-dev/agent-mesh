# GitHub Manager Domain Plugin (`@tupynambalucas-dev/agent-plugin-github-manager`)

The authoritative Antigravity plugin for organizational GitHub governance, team RBAC, branch protection rulesets, security audit, and sovereign GitHub App provisioning.

## Modular Skills Catalog

1. **`github-org-operator`**: Automates organization RBAC, team creation, membership assignments, repository provisioning, and repository transfer runbooks.
2. **`github-ruleset-enforcer`**: Defines, audits, and enforces branch protection rulesets and tag rules across repositories in the organization.
3. **`github-security-auditor`**: Interrogates GitHub Security APIs (Secret Scanning, Dependabot, Code Scanning) leveraging GitHub App installation credentials.
4. **`github-app-provisioner`**: Provisions sovereign GitHub Apps programmatically using the official GitHub App Manifest flow, capturing App ID and private keys for Infisical enrollment.

## Connection Mode

- Mode A: Cluster Envoy AgentGateway (`http://localhost:8080/mcp`)
- Mode B: Automatic fallback via `pnpm dlx @tupynambalucas-dev/agent-mcp-github`
