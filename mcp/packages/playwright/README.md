# @tupynambalucas-dev/agent-mcp-playwright

Enterprise Model Context Protocol server for sovereign browser automation, multi-platform desktop pairing, and headless containerized execution.

## Overview

`@tupynambalucas-dev/agent-mcp-playwright` provides a dual-transport MCP interface (Fastify Streamable HTTP on `:8080` and Stdio CLI runner) for AI agents operating within the Tupynamba Lucas agent mesh ecosystem.

## Key Features

- **Universal Multi-Platform Support**: Zero hardcoded filesystem paths or operating-system-specific scripts. Works identically on Windows, macOS, and Linux.
- **Official Extension Bridge**: Connects to the developer's already-opened browser session via the official Playwright Browser Extension without restarting or launching subprocesses with flags.
- **Native Channel Resolution**: Dynamically discovers and launches system-installed browsers via OS registry lookup (`channel: 'chrome'` or `channel: 'msedge'`).
- **Headless Standalone Engine**: Spawns isolated, ephemeral Chromium sandboxes for background tasks, CI/CD pipelines, and Kubernetes workloads.
- **Accessibility-First Inspection**: Exposes page structure via structured accessibility snapshots (`browser_snapshot`), saving over 80% token costs compared to screenshot-based reasoning.

## Running Locally

### Development Mode
```bash
pnpm --filter @tupynambalucas-dev/agent-mcp-playwright dev
```

### Build & Typecheck
```bash
pnpm --filter @tupynambalucas-dev/agent-mcp-playwright build
pnpm --filter @tupynambalucas-dev/agent-mcp-playwright typecheck
```

### Stdio Mode
```bash
node dist/bin.js
```
