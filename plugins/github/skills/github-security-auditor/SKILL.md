---
name: github-security-auditor
description: Interrogates GitHub Security APIs (Secret Scanning, Dependabot, Code Scanning) leveraging GitHub App installation credentials.
---

# GitHub Security Auditor

Interrogates and triages GitHub Security advisories, Dependabot alerts, and secret scanning detections using `cortex-github` MCP tools.

---

## 1. When to Use

Activate this skill when:
- Performing security hygiene audits across organization repositories.
- Listing open Dependabot vulnerabilities (`list_dependabot_alerts`).
- Triaging exposed credential alerts (`list_secret_scanning_alerts`).
- Validating branch and tag ruleset enforcement (`list_rulesets`, `get_ruleset`).

---

## 2. Operational Workflows

### Workflow A: Querying Dependabot Alerts
```json
{
  "tool": "list_dependabot_alerts",
  "arguments": {
    "owner": "tupynambalucas-dev",
    "repo": "agent-mesh",
    "state": "open"
  }
}
```

### Workflow B: Querying Secret Scanning Detections
```json
{
  "tool": "list_secret_scanning_alerts",
  "arguments": {
    "owner": "tupynambalucas-dev",
    "repo": "agent-mesh",
    "state": "open"
  }
}
```

### Workflow C: Auditing Repository Protection Rulesets
```json
{
  "tool": "list_rulesets",
  "arguments": {
    "owner": "tupynambalucas-dev",
    "repo": "agent-mesh"
  }
}
```

---

## 3. Reference Links

- [GitHub App MCP Server Specification](../../references/github-app-mcp-spec.md)
- [GitHub Domain Rules](../../rules/AGENTS.md)
