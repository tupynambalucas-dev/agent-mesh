<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the scripts bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# Scripts Subsystem Agent Context

This document defines the bounded context router for orchestration and automation scripts in `scripts/`.

## Scripts Layout

- [publish-packages.js](./publish-packages.js): Idempotent multi-package publisher for GitHub Packages (`npm.pkg.github.com`).
- [README.md](./README.md): Developer documentation and operational runbooks for automation scripts.

## Sovereign Plugin Launchers Notice

The legacy root router `mcp-gateway-router.js` has been retired. MCP server launching is now governed autonomously by self-contained launchers located within each plugin package at `plugins/packages/<plugin>/scripts/launcher.cjs`.

## Operational Guardrails

- MUST NOT leak secrets or private keys into terminal output or log files.
- MUST preserve the Zero-Emoji Invariant across all scripts and log messages.
- Developer workstation provisioning and verification scripts belong strictly to `.github/scripts/`.
