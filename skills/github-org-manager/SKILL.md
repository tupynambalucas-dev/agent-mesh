---
name: github-org-manager
description: Use this skill to manage GitHub organization teams, assign repository RBAC permissions, configure branch protection rulesets, and manage GitHub Actions secrets using the GitHub CLI (gh) and the GitHub MCP server.
---

# GitHub Organization Manager Skill

This skill defines the operational runbooks and protocols for managing the GitHub organization,
functional teams, repository rulesets, and GitHub Actions pipeline secrets for `tupynambalucas-dev`.

---

## 1. Tool Selection Protocol

Select the appropriate interface based on the operational context:

| Context / Operation                  | Preferred Interface | Mechanism                                                |
| :----------------------------------- | :------------------ | :------------------------------------------------------- |
| **Autonomous Repository Operations** | `github-mcp`        | MCP stdio tool calling (`get_file_contents`, PR tools)   |
| **Team Lifecycle & Memberships**     | GitHub CLI (`gh`)   | `gh api /orgs/{org}/teams` REST mutations                |
| **Team Repository RBAC Binding**     | GitHub CLI (`gh`)   | `gh api /orgs/{org}/teams/{slug}/repos/{owner}/{repo}`   |
| **Branch Ruleset Enforcement**       | GitHub CLI (`gh`)   | `gh api /repos/{owner}/{repo}/rulesets` REST mutations   |
| **Pipeline Secrets Management**      | GitHub CLI (`gh`)   | `gh secret set --org` / `gh secret set --env`            |
| **Local Code Transport**             | Git over HTTPS/SSH  | Windows GCM / WSL2 SSH commit signing (`commit.gpgsign`) |

---

## 2. Organization & Repository Scope

- **Organization Name**: `tupynambalucas-dev`
- **Managed Repositories**:
  - `org-core`: Meta-repository, architecture, root orchestration, and submodules.
  - `agent-mesh`: Universal AI agent governance plugin, shared MCPs, and skills.
  - `platform`: Infrastructure manifests, Kubernetes configurations, and runtime services.
  - `docs`: Docusaurus technical documentation portal and public knowledge base.
  - `.github`: Organization profile, default community health files, and CI workflows.
  - `tessel`: Core application product repository.
- **Functional Teams**:
  - `lead-architects`: Technical leads, system architects, and global code owners (`admin`/`maintain`).
  - `security-managers`: Security operations, compliance, vulnerability auditing, and policy enforcement (audit/`read`).
  - `infra-ops`: Platform and DevOps engineers managing infrastructure and CI/CD (`maintain`).
  - `core-engineers`: Core software engineers authoring applications and packages (`write`).
  - `technical-writers`: Technical writers and documentation curators managing Docusaurus (`maintain`/`read`).
  - `creative-team`: Designers managing studio assets, brand vectors, and UI media (`write`/`read`).
  - `contractors`: External contractors, consultants, and scoped partners (scoped `write` per engagement).

For detailed team matrix and Fine-Grained PAT permissions, consult [rbac-matrix.md](./references/rbac-matrix.md). For new developer workstation setup and token vs. GitHub App machine identity governance, consult [developer-onboarding.md](./references/developer-onboarding.md).

---

## 3. Caller Identity & Governance Domain Pre-flight Resolution

Before executing privileged operations, the operator runs [resolve-operator-role.js](./scripts/resolve-operator-role.js) to resolve the authenticated caller's identity, active organization teams, and permitted governance domain:

```bash
node agent-mesh/skills/github-org-manager/scripts/resolve-operator-role.js
```

| Evaluated Domain | Primary Teams | Allowed Operations |
| :--- | :--- | :--- |
| **Domain 1: Developer Operations** | `core-engineers`, `technical-writers`, `creative-team` | Commit authoring, signed PR creation, submodule pointer checks, CI status monitoring. |
| **Domain 2: Security & Auditing** | `security-managers`, `infra-ops` | Secret scanning alerts, Dependabot triage, CodeQL analysis, commit signature auditing. |
| **Domain 3: Organization Admin** | `lead-architects` | Team lifecycle (`bootstrap-teams.sh`), repository RBAC binding (`sync-team-permissions.sh`), branch rulesets (`configure-rulesets.sh`), organization secrets. |

---

## 4. Team Lifecycle Management Runbook

Execute [bootstrap-teams.sh](./scripts/bootstrap-teams.sh) to provision or update functional teams:

```bash
bash agent-mesh/skills/github-org-manager/scripts/bootstrap-teams.sh "tupynambalucas-dev"
```

The script idempotently creates or updates the closed teams `@lead-architects`, `@security-managers`,
`@infra-ops`, `@core-engineers`, `@technical-writers`, `@creative-team`, and `@contractors`.

---

## 5. Repository RBAC Binding Runbook

To bind organization repositories to functional teams, execute [sync-team-permissions.sh](./scripts/sync-team-permissions.sh):

```bash
# Sync all repositories
bash agent-mesh/skills/github-org-manager/scripts/sync-team-permissions.sh "tupynambalucas-dev"

# Or sync a specific repository
bash agent-mesh/skills/github-org-manager/scripts/sync-team-permissions.sh "tupynambalucas-dev" "agent-mesh"
```

---

## 6. Branch Ruleset Enforcement Runbook

Branch protection rulesets guarantee linear history and verified commit signatures. For detailed JSON
schemas, consult [ruleset-schemas.md](./references/ruleset-schemas.md).

Execute [configure-rulesets.sh](./scripts/configure-rulesets.sh) to apply rulesets:

```bash
bash agent-mesh/skills/github-org-manager/scripts/configure-rulesets.sh "tupynambalucas-dev" "org-core"
```

Enforced policies:

- **`main` Ruleset**: Requires PR with >= 1 approval, passing CI status checks, linear history, and
  mandatory SSH commit signatures. Blocks deletion and force pushes.
- **`develop` Ruleset**: Requires passing CI status checks. Blocks deletion and direct force pushes.

---

## 7. GitHub Actions Secrets Management

Manage pipeline secrets natively within GitHub Actions without bridging cluster runtime keys:

```bash
# Organization-level secrets (shared container registries)
gh secret set CONTAINER_REGISTRY_TOKEN --org "tupynambalucas-dev" --visibility selected --repos "org-core,platform,agent-mesh"

# Environment-level secrets (bound to dev, staging, prod)
gh secret set CLOUDFLARE_PAGES_TOKEN --env "prod" --repo "tupynambalucas-dev/docs"
gh secret set CODECOV_TOKEN --env "dev" --repo "tupynambalucas-dev/platform"
```

---

## 8. Gotchas & Edge Cases

1. **Fine-Grained PAT Organization Policy**: Fine-grained tokens fail with HTTP 403 unless the
   organization owner enables access under `Organization Settings -> Personal access tokens -> Settings`.
2. **Team Member Invitations**: Adding users to teams via `gh api` requires the token to have the
   `Members: write` organization permission.
3. **Linear History**: Rebase and Squash are permitted on `main`. Merge commits without squash are
   rejected by ruleset policy.
