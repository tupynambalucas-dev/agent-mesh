---
name: github-actions-operator
description: Orchestrates GitHub Actions workflows, triggers runs, polls job logs, and diagnoses CI/CD failures.
---

# GitHub Actions Manager

Monitors, diagnoses, and manages GitHub Actions continuous integration and deployment workflows.

---

## 1. When to Use

Activate this skill when:
- Triaging failed GitHub Actions workflow runs or pull request checks.
- Inspecting step logs and error traces from CI/CD pipelines.
- Triggering repository dispatch events or workflow dispatches via GitHub CLI (`gh`).
- Auditing workflow configurations (`.github/workflows/*.yml`) for security and best practices.

---

## 2. Operational Workflows

### Workflow A: Workflow Run Inspection via GitHub CLI
```bash
# List recent runs for the current repository
gh run list --limit 5

# View details of a specific failed run
gh run view <run-id> --log-failed
```

### Workflow B: Rerunning Failed Jobs
```bash
# Rerun only failed jobs in a workflow
gh run rerun <run-id> --failed
```

---

## 3. Best Practices

- Always check secret availability in Infisical before triggering production deployments.
- Ensure all actions use pinned SHAs or trusted release tags.
- Refer to [GitHub Developer Workflow Rules](../../rules/AGENTS.md) for commit and PR requirements.
