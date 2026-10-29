# Orchestration & Automation Scripts (`scripts/`)

This directory contains developer tooling, zero-downtime gateway routing proxies, and multi-package release automation for `agent-mesh`.

---

## 1. Scripts Catalog

| Script | Purpose | Execution Mode |
| :--- | :--- | :--- |
| `mcp-gateway-router.js` | Probes the cluster Envoy AgentGateway (`:8080`) with a 300ms non-blocking health check. If offline, engages local compiled binaries (`dist/bin.js`) or fallback runners. | Node.js stdio spawned by `mcp_config.json`. |
| `mcp-runner.js` | Legacy environment loader supporting three-tier fallback resolution. | Node.js wrapper. |
| `publish-packages.js` | Idempotently checks package versions against GitHub Packages (`npm.pkg.github.com`) and publishes changed packages. | Invoked during CI release pipeline. |

---

## 2. Smart Gateway Failover Flow

```
[Agent Tool Request]
        │
        ▼
[mcp-gateway-router.js]
        │
        ├─► [300ms Probe: http://localhost:8080/mcp]
        │         │
        │         ├─► (Healthy) ────► Streamable HTTP to Envoy Gateway
        │         │
        │         └─► (Offline) ────► Spawns node mcp/<target>/dist/bin.js
```
