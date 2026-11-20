# Changelog - @tupynambalucas-dev/plugin-github-org

All notable changes to `@tupynambalucas-dev/plugin-github-org` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-11-20

### Added
- Tag governance in rules: signed annotated tags, release from trunk, `enterprise-release-tags` compliance finding when absent.
- `github-ruleset-operator`: tag audit procedure; `enterprise-release-tags` excludes `v*-rc.*` and requires signatures.

### Changed
- `configure-rulesets.sh` now applies the tag ruleset and performs an idempotent create-or-update; failures are no longer swallowed.

## [1.0.0] - 2026-11-03

### Added
- **Initial Enterprise Release**: GitHub Organization Domain Plugin compliant with `agent-plugins.org` v1.0.0 and Google Antigravity (`agy`).
- **Autonomous Skills**: `github-org-operator`, `github-ruleset-operator`, `github-security-auditor`, `github-app-operator`.
- **Key Capabilities**:
  - Sovereign launcher routing to @tupynambalucas-dev/mcp-github
  - Branch ruleset governance
  - Security alert auditing
- **Dual MCP Manifests**: Native `mcp.json` for Antigravity and `mcp_config.json` for Claude Code.
