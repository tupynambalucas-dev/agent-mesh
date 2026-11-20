# GitHub Releases Plugin Context Router

This document routes context for AI agents interacting with the GitHub Releases and package distribution plugin.

## Navigation

- [README.md](./README.md): Primary plugin documentation.
- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest.
- [rules/AGENTS.md](./rules/AGENTS.md): Autonomous domain rules and execution policies.
- [skills/github-releases-operator/SKILL.md](./skills/github-releases-operator/SKILL.md): Operational instructions.
- [references/release-engineering.md](./skills/github-releases-operator/references/release-engineering.md): Authoritative release standard.

## Governance Standards

- Follow the Autonomous Domain Mandate: engage `github-releases-operator` autonomously when cutting versions or curating changelogs.
- Strictly adhere to Release from Trunk (`vX.Y.Z`).
- Enforce the mandatory user confirmation gate prior to any tag push or release creation.
