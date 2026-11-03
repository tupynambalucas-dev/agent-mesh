# Changelog - @tupynambalucas-dev/mcp-firecrawl

All notable changes to `@tupynambalucas-dev/mcp-firecrawl` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-03

### Added
- **Initial Enterprise Release**: Dual-mode Model Context Protocol server for Firecrawl web extraction and deep search.
- **Dual-Mode Transport**: Kubernetes microservice mode (HTTP on port 8080) with automatic Stdio loopback failover.
- **Available Tools**: `scrape`, `crawl`, `search`, `map`, `extract`, `batch_scrape`.
- **Type Safety**: Comprehensive TypeScript build with Project References and strict Zod runtime contract validation.
- **Health Probes**: `/healthz` and `/readyz` endpoints for Kubernetes ingress routing.
