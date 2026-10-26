---
name: github-actions-manager
description: Orchestrates GitHub Actions workflows, triggers runs, polls job logs, and diagnoses CI/CD failures.
---

# GitHub Actions Manager Skill

Use this skill to inspect, trigger, monitor, and troubleshoot GitHub Actions workflows, matrix builds, and deployment runs.

## Activation Triggers

Activate this skill when:
- Triaging failed CI/CD workflow runs.
- Triggering workflow dispatch events with custom inputs.
- Inspecting step logs to identify compilation or test failures.
- Managing repository workflow secrets and variables.
- Verifying release pipeline deployments.

## Troubleshooting Standard

1. Query workflow run status via `gh run list --repo <repo>`.
2. Inspect failing step output via `gh run view <run-id> --log-failed`.
3. Provide targeted root cause analysis and code patch solutions.
