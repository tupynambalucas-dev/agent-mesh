---
name: github-actions-operator
description: Orchestrates GitHub Actions workflows, triggers runs, polls job logs, authors composite actions, and diagnoses CI/CD failures.
---

# GitHub Actions Operator

Monitors, authors, diagnoses, and manages GitHub Actions continuous integration, continuous delivery, and automated release workflows.

---

## 1. When to Use

Activate this skill when:
- Writing, refactoring, or optimizing `.github/workflows/*.yml` files.
- Authoring reusable composite custom actions under `.github/actions/<name>/action.yml`.
- Triaging failed GitHub Actions workflow runs or pull request checks.
- Inspecting step logs and error traces from CI/CD pipelines.
- Triggering repository dispatch events or workflow dispatches via GitHub CLI (`gh`).
- Configuring automated release pipelines (`release-cliff.yml` or `release-please.yml`).
- Auditing workflow configurations for security, least-privilege permissions, and SHA version pinning.

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

### Workflow C: Monitoring and Verifying Pipelines
```bash
# Find and follow workflow run
gh run list --workflow ci.yml --limit 3
gh run watch <run-id> --exit-status

# Diagnose failures
gh run view <run-id> --log-failed
```

### Workflow D: Scaffolding Composite Actions
```yaml
name: "Setup Custom Environment"
description: "Encapsulates reusable setup steps"
inputs:
  tool-version:
    description: "Version of tool to install"
    required: false
    default: "latest"
runs:
  using: "composite"
  steps:
    - name: "Run step"
      shell: bash
      run: echo "Configuring tool ${{ inputs.tool-version }}"
```

### Workflow E: Automated Release Pipelines

#### 1. Single-Changelog Workflow (`release-cliff.yml`)
```yaml
name: "Release Cliff"
on:
  push:
    tags:
      - "v*"
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
        with:
          fetch-depth: 0
      - uses: orhun/git-cliff-action@7da99859f518e3c322b7d21ca5270921bc692ff8 # v4.4.2
        with:
          config: cliff.toml
          args: --verbose --latest
        env:
          OUTPUT: CHANGELOG.md
```

#### 2. Multi-Workspace Monorepo Workflow (`release-please.yml`)
```yaml
name: "Release Please"
on:
  push:
    branches:
      - main
jobs:
  release-please:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: googleapis/release-please-action@7987652d64b4581673a760f30d649932182403ca # v4.1.3
        id: release
        with:
          config-file: release-please-config.json
          manifest-file: .release-please-manifest.json
```
