# @tupynambalucas-dev/mcp-playwright

Enterprise Model Context Protocol server for sovereign browser automation, multi-platform desktop pairing, and headless containerized execution.

---

> [!NOTE]
> **Operational Status: Active Sovereign Engine with Resilient Upstream Fallback**
>
> `@tupynambalucas-dev/mcp-playwright` compiles into `dist/bin.cjs` (Stdio) and `dist/index.cjs` (Fastify Streamable HTTP on `:8080`) using `tsup` (`noExternal` for `@modelcontextprotocol/sdk`, `fastify`, `zod`, `dotenv`, `ws`, while keeping `playwright` and `playwright-core` external due to OS-native browser binaries).
>
> When invoked via its sovereign launcher [`scripts/launcher.cjs`](./scripts/launcher.cjs) (either directly or from [`@tupynambalucas-dev/plugin-web`](../../../plugins/packages/web/README.md) and [`@tupynambalucas-dev/plugin-appsheet`](../../../plugins/packages/appsheet/README.md)):
> 1. **Local Playwright Available**: If `playwright` is resolvable in the active workspace, `launcher.cjs` executes the local bundled `dist/bin.cjs` directly.
> 2. **External Consumer Fallback**: If `playwright` is not installed in the consumer repository (such as lightweight backend APIs like `omnichannel`), `launcher.cjs` transparently falls back to `npx -y @playwright/mcp@0.0.84`, forwarding all mode flags (`--extension`, `--cdp-endpoint`, `--browser`, `--user-data-dir`, `--headless`).

---

## 1. Overview

`@tupynambalucas-dev/mcp-playwright` provides a dual-transport MCP interface (Fastify Streamable HTTP on `:8080` and Stdio CLI runner) for AI agents operating within the Tupynamba Lucas agent mesh ecosystem.

---

## 2. Key Features

- **Universal Multi-Platform Support**: Zero hardcoded filesystem paths or operating-system-specific scripts. Works identically on Windows, macOS, and Linux.
- **Official Extension Bridge**: Connects to the developer's already-opened browser session via the official Playwright Browser Extension without restarting or launching subprocesses with flags.
- **Native Channel Resolution**: Dynamically discovers and launches system-installed browsers via OS registry lookup (`channel: 'chrome'` or `channel: 'msedge'`).
- **Headless Standalone Engine**: Spawns isolated, ephemeral Chromium sandboxes (`${PLUGIN_DATA}/browser-profile`) for background tasks, CI/CD pipelines, and Kubernetes workloads.
- **Accessibility-First Inspection**: Exposes page structure via structured accessibility snapshots (`browser_snapshot`), saving over 80% token costs compared to screenshot-based reasoning.

---

## 3. Running Locally

### Sovereign Launcher (Recommended)
```bash
node scripts/launcher.cjs
```

### Build & Typecheck
```bash
pnpm --filter @tupynambalucas-dev/mcp-playwright build
pnpm --filter @tupynambalucas-dev/mcp-playwright typecheck
```

### Direct Bundle Execution (Requires Local `playwright`)
```bash
# Stdio Mode
node dist/bin.cjs

# HTTP Server Mode (:8080)
node dist/index.cjs
```

---

## 4. References

- [Playwright MCP Official Architecture and Overview](./references/playwright-mcp-official-overview.md)
- [Extension Bridge and Token Architecture Specification](./references/playwright-mcp-extension-bridge-and-token-spec.md)
- [CLI Flags and Capability Groups Reference](./references/playwright-mcp-cli-flags-and-capabilities.md)
