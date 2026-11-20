# GitHub Actions Plugin Context Router

This document routes context for AI agents interacting with the GitHub Actions automation plugin.

## Navigation

- [README.md](./README.md): Primary plugin documentation.
- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest.
- [rules/AGENTS.md](./rules/AGENTS.md): Autonomous domain rules and execution policies.
- [skills/github-actions-operator/SKILL.md](./skills/github-actions-operator/SKILL.md): Operational instructions.

## Governance Standards

- Follow the Autonomous Domain Mandate: engage `github-actions-operator` autonomously when interacting with `.github/workflows/` or `.github/actions/`.
- Enforce composite action modularity over monolithic inline scripts.
- Enforce full commit SHA pinning for third-party actions.
