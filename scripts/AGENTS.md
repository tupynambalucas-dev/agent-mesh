<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the scripts bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# Scripts Subsystem Agent Context

This document defines the bounded context router for all orchestration and automation scripts in `scripts/`.

## Scripts Layout

- [mcp-gateway-router.js](./mcp-gateway-router.js): Zero-downtime Envoy AgentGateway health check probe (300ms) and local compiled binary fallback router.
- [mcp-runner.js](./mcp-runner.js): Three-tier environment fallback runner for legacy tools.
- [publish-packages.js](./publish-packages.js): Idempotent multi-package publisher for GitHub Packages (`npm.pkg.github.com`).
- [README.md](./README.md): Developer documentation and operational runbooks for automation scripts.

## Operational Guardrails

- MUST NOT leak secrets or private keys into terminal output or log files.
- MUST maintain zero-downtime fallback capability: if the cluster gateway is unreachable, developer sessions must transparently fall back to local execution.
- MUST preserve the Zero-Emoji Invariant across all scripts and log messages.
