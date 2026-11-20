# Changelog - @tupynambalucas-dev/plugin-github-flow

All notable changes to `@tupynambalucas-dev/plugin-github-flow` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-11-20

### Added
- **Release Engineering Standard**: `github-flow-operator/references/release-engineering.md` (release from trunk, signed annotated tags, SemVer, rc dry runs, JIT maintenance branches, rollback).
- **Rules 6 and 7**: release policy and repository context discovery; `release/<major>.<minor>` permitted only for maintenance.
- **Workflows**: `github-flow-operator` D (release) and E (hotfix); `github-actions-operator` C (release monitoring) and D (release workflow audit).
- **Hook guards**: `enforce-git-signing.cjs` denies unsigned or unannotated tags and tag deletion, and asks confirmation before version-tag pushes and `gh release create|edit|delete|upload`.

## [1.0.0] - 2026-11-03

### Added
- **Initial Enterprise Release**: GitHub Flow Domain Plugin compliant with `agent-plugins.org` v1.0.0 and Google Antigravity (`agy`).
- **Autonomous Skills**: `github-flow-operator`, `github-actions-operator`.
- **Key Capabilities**:
  - Sovereign launcher routing to @tupynambalucas-dev/mcp-github
  - Branch naming and Conventional Commit prefix enforcement hook
- **Dual MCP Manifests**: Native `mcp.json` for Antigravity and `mcp_config.json` for Claude Code.
