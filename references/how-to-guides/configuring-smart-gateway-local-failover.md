# How to Configure Smart Gateway Local Failover

This guide explains how `plugins/packages/<plugin>/scripts/launcher.cjs` provides automatic, non-blocking failover between cloud-native Kubernetes AgentGateway microservices and local standalone MCP binaries.

---

## Failover Overview

When an agent invokes an MCP tool, `launcher.cjs` acts as an intelligent proxy:
1. **Health Probe**: Issues a 300ms HTTP healthcheck probe to `CORTEX_GATEWAY_URL/health` (port `8080`).
2. **Mode A (Online)**: If Envoy AgentGateway responds with HTTP `200`, the router proxies the JSON-RPC request to the cluster over Streamable HTTP/SSE.
3. **Mode B (Offline)**: If the cluster gateway is unreachable, timed out, or returning errors, the router automatically spawns the local compiled binary (`mcp/packages/<target>/dist/bin.js`) or executes registry fallbacks via `pnpm dlx`.

---

## Environment Variables & Configuration

The smart router inspects the following environment variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `CORTEX_GATEWAY_URL` | `http://localhost:8080` | Base URL of the Envoy AgentGateway ingress. |
| `CORTEX_PROBE_TIMEOUT_MS` | `300` | Non-blocking socket timeout for the healthcheck probe in milliseconds. |

---

## Cascade `.env` Resolution

The router automatically scans for `.env` files up to two parent directories above the current working directory:
1. `process.cwd()/.env`
2. `process.cwd()/../.env`
3. `agent-mesh/.env`
4. `org-core/.env`

Variables already defined in the active process environment are never overwritten.

---

## Testing Failover Locally

### 1. Test Gateway Inactive State (Local Stdio Binary)

Ensure nothing is running on port 8080, then execute:

```bash
node plugins/packages/<plugin>/scripts/launcher.cjs firecrawl
```

Expected output on `stderr`:
```
[mesh-router] AgentGateway offline. Engaging local compiled binary: node .../mcp/packages/firecrawl/dist/bin.js
```

The process transitions into a standard Stdio JSON-RPC server listening on standard input.

### 2. Test Gateway Active State (HTTP Proxy)

Start the local or port-forwarded AgentGateway pod on `:8080`:

```bash
kubectl port-forward -n cortex svc/agentgateway 8080:8080
```

Re-run the router:

```bash
node plugins/packages/<plugin>/scripts/launcher.cjs firecrawl
```

Expected output on `stderr`:
```
[mesh-router] AgentGateway healthy. Routing 'firecrawl' via http://localhost:8080/mcp
```

---

## Related References

- [Dual-Transport and Zero-Downtime Failover Architecture](../explanation/dual-transport-and-zero-downtime-failover.md)
- [MCP Server Catalog](../reference/mcp-server-catalog.md)
