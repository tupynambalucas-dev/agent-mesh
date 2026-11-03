# Changelog - @tupynambalucas-dev/mcp-infisical

All notable changes to `@tupynambalucas-dev/mcp-infisical` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-03

### Added
- **Initial Enterprise Release**: Dual-mode Model Context Protocol server for Infisical enterprise secrets vault.
- **Dual-Mode Transport**: Kubernetes microservice mode (HTTP on port 8080) with automatic Stdio loopback failover.
- **Available Tools**: `infisical_list_projects`, `infisical_create_project`, `infisical_get_project`, `infisical_delete_project`, `infisical_list_secrets`, `infisical_get_secret`, `infisical_create_secret`, `infisical_update_secret`, `infisical_delete_secret`.
- **Type Safety**: Comprehensive TypeScript build with Project References and strict Zod runtime contract validation.
- **Health Probes**: `/healthz` and `/readyz` endpoints for Kubernetes ingress routing.
