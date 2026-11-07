# Dual-Transport & Zero-Downtime Failover Architecture

This document explains the runtime mechanics and architectural rationale behind the dual-transport design of `agent-mesh` Model Context Protocol (MCP) servers and the smart gateway fallback router.

---

## 1. Cloud-Native Microservices vs. Local Standalone Binaries

In an enterprise environment, AI agent workloads run in two distinct environments:
1. **Developer Workstations**: Fast, interactive feedback during pair-programming, with intermittent cluster network connectivity and varying local container engines.
2. **Kubernetes Production Clusters**: Centralized background pipelines, scheduled audit jobs, and multi-agent meshes running behind an Envoy ingress gateway (`AgentGateway`).

Attempting to force local workstations to run heavy Docker containers for every MCP tool introduces significant startup latency (5–15 seconds per turn), Docker Desktop memory overhead, and volume-mount friction. Conversely, relying strictly on local Node.js binaries makes observability, centralized rate limiting, and audit logging impossible in production.

---

## 2. The Dual-Transport Solution

To achieve the best of both worlds, every in-house MCP server in `mcp/servers/*` compiles two distinct transport entrypoints:

```
                      ┌────────────────────────────────────────┐
                      │    TypeScript Source Code (src/)       │
                      └──────────────────┬─────────────────────┘
                                         │ Turborepo Build
                         ┌───────────────┴───────────────┐
                         ▼                               ▼
            ┌─────────────────────────┐     ┌─────────────────────────┐
            │       dist/index.js     │     │        dist/bin.js      │
            │   Streamable HTTP :8080 │     │      Stdio Transport    │
            │   (Fastify + Envoy)     │     │   (Local Sub-Second CLI)│
            └─────────────────────────┘     └─────────────────────────┘
```

1. **Streamable HTTP (`dist/index.js`)**:
   - Built on Fastify listening on `:8080`.
   - Plugs directly into Envoy `AgentGateway` in Kubernetes via Streamable HTTP/SSE.
   - Provides distributed caching, central Prometheus metrics, and gRPC guardrail checks.
2. **Stdio Transport (`dist/bin.js`)**:
   - Zero-overhead Node.js process spawned via standard input/output.
   - Diagnostic logging is strictly isolated to `stderr`, preserving JSON-RPC 2.0 integrity on `stdout`.
   - Boots in under 150 milliseconds.

---

## 3. Smart Gateway Failover Flow

The smart router script [`plugins/packages/<plugin>/scripts/launcher.cjs`](../../plugins/packages/<plugin>/scripts/launcher.cjs) binds both modes into a single, highly available interface:

```
[Agent Invokes MCP Tool]
          │
          ▼
[launcher.cjs]
          │
          ├── [300ms Non-Blocking Probe: http://localhost:8080/health]
          │         │
          │         ├── (Healthy: 200 OK) ────► Proxies over HTTP to Envoy Gateway
          │         │
          │         └── (Offline / Timeout) ──► Spawns node mcp/servers/<target>/dist/bin.js
```

### Why a 300ms Healthcheck Probe?
A 300ms socket timeout is imperceptible to human developers and AI models alike. If the cluster gateway is running (e.g., via `kubectl port-forward`), requests route automatically to the cluster. If the developer is working offline on a plane or without Kubernetes running, the router fails over instantly to the local compiled binary without throwing connection errors.
