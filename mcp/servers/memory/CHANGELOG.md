# Changelog - @tupynambalucas-dev/mcp-memory

All notable changes to `@tupynambalucas-dev/mcp-memory` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-03

### Added
- **Initial Enterprise Release**: Dual-mode Model Context Protocol server for Cortex vector memory and RAG.
- **Dual-Mode Transport**: Kubernetes microservice mode (HTTP on port 8080) with automatic Stdio loopback failover.
- **Available Tools**: `search_memory`, `store_memory`, `delete_memory`.
- **Type Safety**: Comprehensive TypeScript build with Project References and strict Zod runtime contract validation.
- **Health Probes**: `/healthz` and `/readyz` endpoints for Kubernetes ingress routing.
