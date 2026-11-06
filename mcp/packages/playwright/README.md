# @tupynambalucas-dev/mcp-playwright

Enterprise Model Context Protocol server for sovereign browser automation, multi-platform desktop pairing, and headless containerized execution.

---

> [!NOTE]
> **Operational Status: Sovereign Reference Package (Staged for Future Cluster Hosting)**
>
> `@tupynambalucas-dev/mcp-playwright` is a fully compiled, in-house TypeScript MCP package featuring the `UniversalSessionManager` (supporting Fastify HTTP on port `:8080`, stdio transport, and custom session resolution).
>
> In the current daily developer runtime, the agent mesh plugins (`@tupynambalucas-dev/plugin-web` and `@tupynambalucas-dev/plugin-appsheet`) delegate browser operations via `launcher.cjs` directly to upstream `@playwright/mcp@0.0.84` to utilize official Chrome Web Store extension relay binaries.
>
> This package serves as our sovereign foundation for upcoming Kubernetes Cortex cluster microservices and future unified browser runtime consolidation.

---

## 1. Overview

`@tupynambalucas-dev/mcp-playwright` provides a dual-transport MCP interface (Fastify Streamable HTTP on `:8080` and Stdio CLI runner) for AI agents operating within the Tupynamba Lucas agent mesh ecosystem.

---

## 2. Key Features

- **Universal Multi-Platform Support**: Zero hardcoded filesystem paths or operating-system-specific scripts. Works identically on Windows, macOS, and Linux.
- **Official Extension Bridge**: Connects to the developer's already-opened browser session via the official Playwright Browser Extension without restarting or launching subprocesses with flags.
- **Native Channel Resolution**: Dynamically discovers and launches system-installed browsers via OS registry lookup (`channel: 'chrome'` or `channel: 'msedge'`).
- **Headless Standalone Engine**: Spawns isolated, ephemeral Chromium sandboxes for background tasks, CI/CD pipelines, and Kubernetes workloads.
- **Accessibility-First Inspection**: Exposes page structure via structured accessibility snapshots (`browser_snapshot`), saving over 80% token costs compared to screenshot-based reasoning.

---

## 3. Running Locally

### Development Mode
```bash
pnpm --filter @tupynambalucas-dev/mcp-playwright dev
```

### Build & Typecheck
```bash
pnpm --filter @tupynambalucas-dev/mcp-playwright build
pnpm --filter @tupynambalucas-dev/mcp-playwright typecheck
```

### Stdio Mode
```bash
node dist/bin.js
```

---

## 4. References

- [Playwright MCP Official Architecture and Overview](./references/playwright-mcp-official-overview.md)
- [Extension Bridge and Token Architecture Specification](./references/playwright-mcp-extension-bridge-and-token-spec.md)
- [CLI Flags and Capability Groups Reference](./references/playwright-mcp-cli-flags-and-capabilities.md)
