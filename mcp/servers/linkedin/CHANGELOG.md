# Changelog - @vitoria-rodrigues/mcp-linkedin

All notable changes to `@vitoria-rodrigues/mcp-linkedin` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-10

### Added
- **Initial Sovereign Release**: Dedicated Model Context Protocol server for LinkedIn profile analysis, job matching, Easy Apply automation, and candidate resume catalog management.
- **Dual-Mode Transport**: Streamable Fastify HTTP server (:8080) and standalone CommonJS Stdio transport (`dist/bin.cjs`).
- **Resumes Management Engine**: Automatic `$PLUGIN_DATA/resumes/` lifecycle initialization, indexing, and content extraction for candidate tailoring.
- **Sovereign Launcher**: Resilient launcher architecture with browser cookie auto-import, upstream fallback execution, and Kubernetes Cortex Gateway routing.
- **Human-in-the-Loop Confirmation**: Deterministic gating on all high-impact actions (`submit_easy_apply`, `connect_with_person`, `send_message`).
