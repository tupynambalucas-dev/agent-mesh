# GitHub App MCP Server Specification (`cortex-github`)

The in-house `@tupynambalucas-dev/agent-mcp-github` server operates via an organizational **GitHub App installation** using `@octokit/auth-app`.

---

## 1. Available Tools

### `get_repo_info`
Fetches repository metadata, visibility, default branch, topics, and permissions.
```json
{
  "owner": "tupynambalucas-dev",
  "repo": "org-core"
}
```

### `list_org_repos`
Lists repositories under an organization with visibility and pagination.
```json
{
  "org": "tupynambalucas-dev",
  "type": "all",
  "per_page": 30
}
```

### `list_rulesets`
Retrieves repository or organization branch and tag protection rulesets.
```json
{
  "owner": "tupynambalucas-dev",
  "repo": "agent-mesh"
}
```

### `get_ruleset`
Retrieves full configuration rules, bypass actors, and conditions for a specific ruleset.
```json
{
  "owner": "tupynambalucas-dev",
  "repo": "agent-mesh",
  "ruleset_id": 12345
}
```

### `list_dependabot_alerts`
Queries Dependabot vulnerability alerts for a repository.
```json
{
  "owner": "tupynambalucas-dev",
  "repo": "agent-mesh",
  "state": "open"
}
```

### `list_secret_scanning_alerts`
Queries detected secret scanning alerts (requires GitHub App secret scanning permissions).
```json
{
  "owner": "tupynambalucas-dev",
  "repo": "agent-mesh",
  "state": "open"
}
```
