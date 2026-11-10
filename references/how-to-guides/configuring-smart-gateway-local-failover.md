# How to Configure Sovereign Launcher & Cluster Gateway Routing

This guide explains how the two-tier launcher architecture (`plugins/packages/<plugin>/scripts/launcher.cjs` and `mcp/servers/<server>/scripts/launcher.cjs`) routes Model Context Protocol (MCP) tool execution between local self-contained CommonJS bundles (`dist/bin.cjs`) and the cloud-native Kubernetes Cortex Gateway.

---

## 1. Routing Modes Overview

When an AI agent invokes an MCP tool, the launcher inspects the active runtime profile:

1. **Local Sovereign Mode (`MESH_PROFILE=local` - Default)**:
   - The plugin launcher executes `resolveMcpLauncher(pkgName, monorepoDir)`, locating the target MCP server across:
     1. Standalone installed package (`@tupynambalucas-dev/mcp-<service>`).
     2. Umbrella package hierarchy (`node_modules/@tupynambalucas-dev/agent-mesh/mcp/servers/<service>/scripts/launcher.cjs`).
     3. Monorepo sibling directory (`mcp/servers/<service>/scripts/launcher.cjs`).
   - The target MCP server launcher spawns its co-located, self-contained bundle `dist/bin.cjs` over Stdio.
   - For `mcp-playwright`, if `playwright` is not installed in the consumer workspace, it automatically falls back to `npx -y @playwright/mcp@0.0.84` with configured mode flags.
2. **Cluster Gateway Mode (`MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`)**:
   - The launcher routes JSON-RPC requests over Streamable HTTP/SSE to the Kubernetes Cortex Gateway via `npx -y mcp-remote ${CORTEX_GATEWAY_URL}/mcp`.

---

## 2. Environment Variables & Configuration

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `MESH_PROFILE` | `local` | Execution profile selector (`local` for sovereign Stdio bundles; `cluster` for Cortex Gateway proxy). |
| `CORTEX_GATEWAY_ENABLED` | `false` | When set to `true`, forces cluster gateway routing even if `MESH_PROFILE` is unset. |
| `CORTEX_GATEWAY_URL` | `http://localhost:8080` | Base URL of the Envoy AgentGateway ingress. |

---

## 3. Cascade `.env` Resolution

Both plugin launchers and MCP server launchers automatically scan for `.env` files across the workspace hierarchy via `loadEnvCascade()`:
1. `process.cwd()/.env` (consumer repository root, e.g., `omnichannel/.env`)
2. `process.cwd()/../.env`
3. Package-local and parent monorepo `.env` files (`agent-mesh/.env`, `org-core/.env`)

Variables already defined in `process.env` are never overwritten.

---

## 4. Verifying Execution Locally and in Consumer Repositories

### 4.1 Verify Sovereign Local Execution (Default `local` Profile)

From `agent-mesh` or an external consumer repository (such as `omnichannel`):

```bash
node plugins/packages/research/scripts/launcher.cjs firecrawl --help
```

Expected output on `stderr`:
```text
[launcher:research] Engaging sovereign MCP executable for 'firecrawl': node .../mcp/servers/firecrawl/scripts/launcher.cjs
Firecrawl MCP server running on stdio
```

### 4.2 Verify Cluster Gateway Routing (`cluster` Profile)

Port-forward the Cortex Gateway service on `:8080` and set `MESH_PROFILE=cluster`:

```bash
kubectl port-forward -n cortex svc/agentgateway 8080:8080
MESH_PROFILE=cluster node plugins/packages/research/scripts/launcher.cjs firecrawl
```

Expected output on `stderr`:
```text
[launcher:research] Engaging cluster gateway for 'firecrawl' via http://localhost:8080/mcp
```

---

## Related References

- [Dual-Transport and Sovereign Failover Architecture](../explanation/dual-transport-and-zero-downtime-failover.md)
- [MCP Server Catalog](../reference/mcp-server-catalog.md)
- [Umbrella Package & Presets Specification](../reference/umbrella-package-and-presets.md)
