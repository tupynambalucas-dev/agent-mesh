---
trigger: always_on
---

# GitHub Actions CI/CD Automation Domain Rules

0. Autonomous Domain Mandate:
   - When requested to create, refactor, audit, or diagnose GitHub Actions workflows (`.github/workflows/*.yml`), author composite custom actions (`.github/actions/*`), inspect CI/CD logs, or optimize pipeline caches, the agent MUST autonomously engage the `github-actions-operator` skill and tools without waiting for explicit skill invocations from the user.

1. Composite Action Modularization Invariant:
   - Monolithic inline bash routines inside `.github/workflows/` are strictly prohibited.
   - Repeated operational steps (e.g., setting up toolchains, installing dependencies, configuring container buildx) MUST be encapsulated as composite actions in `.github/actions/<action-name>/action.yml`.

2. Principle of Least Privilege:
   - All workflow files MUST declare minimal top-level `permissions` (defaulting to `permissions: contents: read`).
   - Elevated scopes (`contents: write`, `id-token: write`, `attestations: write`, `packages: write`) MUST only be granted to specific jobs requiring them.

3. Action Version Pinning:
   - All third-party GitHub Actions MUST be pinned to full-length commit SHAs accompanied by inline semver comments (e.g., `uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2`).

4. Concurrency Discipline:
   - Non-release workflows MUST define concurrency cancellation groups to terminate redundant in-progress runs on branch updates (`concurrency.cancel-in-progress: true`).
   - Production release workflows MUST NOT cancel in-progress runs (`concurrency.cancel-in-progress: false`).

5. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across workflow names, step descriptions, and pipeline annotations.
