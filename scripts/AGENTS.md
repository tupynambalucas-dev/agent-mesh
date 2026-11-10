<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the scripts bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# Scripts Subsystem Agent Context

This document defines the bounded context router for release orchestration scripts in `scripts/`.

## Navigation & Directory Layout

- [README.md](./README.md): Developer documentation and operational runbooks for release automation and launcher architecture.
- [publish-root.cjs](./publish-root.cjs): Idempotent root umbrella package publisher for `@tupynambalucas-dev/agent-mesh`, invoked as the second stage of `pnpm run packages:publish`.

## Architecture Overview

1. **Two-Stage Monorepo Publishing (`packages:publish`)**:
   - Stage 1: Native recursive workspace publication via `pnpm -r publish --access public --no-git-checks --report-summary` (publishes all 10 domain plugins, 8 MCP servers, and 1 core library).
   - Stage 2: Root umbrella package publication via `node ./scripts/publish-root.cjs` (publishes `@tupynambalucas-dev/agent-mesh` and treats `409 Conflict` / `E409` as an idempotent no-op).
2. **Two-Tier Sovereign Launchers Architecture**:
   - The legacy root router script has been retired.
   - **Tier 1 - Plugin Launchers (`plugins/packages/<plugin>/scripts/launcher.cjs`)**: Resolve target MCP servers deterministically via `resolveMcpLauncher()` (standalone package -> umbrella hierarchy -> monorepo sibling) or route to the cluster gateway (`MESH_PROFILE=cluster`).
   - **Tier 2 - MCP Server Launchers (`mcp/servers/<server>/scripts/launcher.cjs`)**: Load `.env` in cascade and spawn the co-located self-contained CommonJS bundle `dist/bin.cjs` (with resilient upstream `@playwright/mcp@0.0.84` fallback in `mcp-playwright` when local `playwright` packages are absent).

## Operational Guardrails

- MUST NOT leak secrets or private keys into terminal output or log files.
- MUST preserve the Zero-Emoji Invariant across all scripts and log messages.
- Developer workstation provisioning and verification scripts belong strictly to [`.github/scripts/`](../../.github/scripts/README.md).
