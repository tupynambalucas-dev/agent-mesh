# Changelog - @tupynambalucas-dev/mcp-github

All notable changes to `@tupynambalucas-dev/mcp-github` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-03

### Added
- **Initial Enterprise Release**: Dual-mode Model Context Protocol server for GitHub organization governance and security.
- **Dual-Mode Transport**: Kubernetes microservice mode (HTTP on port 8080) with automatic Stdio loopback failover.
- **Available Tools**: `get_repo_info`, `list_org_repos`, `list_rulesets`, `get_ruleset`, `list_dependabot_alerts`, `list_secret_scanning_alerts`.
- **Type Safety**: Comprehensive TypeScript build with Project References and strict Zod runtime contract validation.
- **Health Probes**: `/healthz` and `/readyz` endpoints for Kubernetes ingress routing.
