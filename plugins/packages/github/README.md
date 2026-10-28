# GitHub Domain Plugin (`@tupynambalucas-dev/agent-plugin-github`)

The authoritative Antigravity plugin for GitHub organization operations, branch rulesets, security triage, and CI/CD workflow orchestration.

## Modular Skills Catalog

1. **`github-org-operator`**: Automates organization RBAC, team creation, membership assignments, repository provisioning, and repository transfer runbooks.
2. **`github-ruleset-enforcer`**: Defines, audits, and enforces branch protection rulesets and tag rules across repositories in the organization.
3. **`github-security-auditor`**: Interrogates GitHub Security APIs (Secret Scanning, Dependabot, Code Scanning) leveraging GitHub App installation credentials.
4. **`github-actions-manager`**: Orchestrates GitHub Actions workflows, triggers runs, polls job logs, and diagnoses failures.

## Connection Mode

- Mode A: Cluster Envoy AgentGateway (`http://localhost:8080/mcp`)
- Mode B: Automatic fallback via `pnpm dlx @tupynambalucas-dev/agent-mcp-github`
