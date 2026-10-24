# Universal Agent Toolkit (`@tupynambalucas-dev/agent-toolkit`)

Universal enterprise AI agent governance, security guardrails, shared MCP connectors, and domain routing skills for the `tupynambalucas-dev` organization.

Compatible natively with **Google Antigravity (`agy`)**, **Anthropic Claude Code**, **Cursor**, and **GitHub Copilot**.

---

## 1. Directory Structure

```text
agent-toolkit/
├── package.json             # NPM package manifest for GitHub Packages
├── plugin.json              # Antigravity & Agent Plugins 1.0 manifest
├── .claude-plugin/
│   └── plugin.json          # Claude Code manifest
├── mcp_config.json          # Secure MCP configurations
├── rules/
│   └── AGENTS.md            # Consolidated enterprise governance rules
├── skills/
│   ├── agent-router-expert/ # Domain query orchestrator
│   ├── markdown-expert/     # Syntax & table formatting
│   ├── plugin-expert/       # Plugin authoring standards
│   ├── skill-expert/        # Skill validation & progressive disclosure
│   ├── secrets-expert/      # Infisical & secret hygiene
│   └── github-org-manager/  # GitHub RBAC and organization governance
└── scripts/
    └── mcp-gateway-router.js# 300ms probe proxy for zero-downtime fallback
```

---

## 2. Installation & Usage

### A. Global Workstation Installation (Antigravity CLI)
```bash
agy plugin install https://github.com/tupynambalucas-dev/agent-toolkit
```

### B. Global Workstation Installation (Claude Code)
```bash
/plugin marketplace add tupynambalucas-dev/agent-toolkit
/plugin install agent-toolkit
```

### C. Repository DevDependency (GitHub Packages)
```bash
pnpm add -D @tupynambalucas-dev/agent-toolkit
```
In `.agents/plugins.json`:
```json
{
  "entries": [
    { "path": "node_modules/@tupynambalucas-dev/agent-toolkit" }
  ]
}
```

---

## 3. Governance Policies

1. **Cryptographic Signing**: All Git commits must be signed using SSH (`git commit -S`).
2. **Conventional Commits**: Strict adhere to Conventional Commits v1.0.0.
3. **Zero Emojis**: Emojis are strictly forbidden across all code, PRs, comments, and agent interactions.
4. **Zero Plaintext Secrets**: Secrets are managed exclusively via Infisical and runtime environment expansion.
