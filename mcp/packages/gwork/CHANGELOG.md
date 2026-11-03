# Changelog - @tupynambalucas-dev/mcp-gwork

All notable changes to `@tupynambalucas-dev/mcp-gwork` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-03

### Added
- **Initial Enterprise Release**: Dual-mode Model Context Protocol server for Google Drive, Sheets, and Docs.
- **Dual-Mode Transport**: Kubernetes microservice mode (HTTP on port 8080) with automatic Stdio loopback failover.
- **Available Tools**: `search_drive_files`, `create_spreadsheet`, `create_document`.
- **Type Safety**: Comprehensive TypeScript build with Project References and strict Zod runtime contract validation.
- **Health Probes**: `/healthz` and `/readyz` endpoints for Kubernetes ingress routing.
