# Dual-Transport & Sovereign Failover Architecture

This document explains the runtime mechanics and architectural rationale behind the dual-transport design, self-contained CommonJS bundling, and two-tier sovereign launcher routing of `agent-mesh` Model Context Protocol (MCP) servers.

---

## 1. Cloud-Native Microservices vs. Local Standalone Binaries

In an enterprise environment, AI agent workloads run in two distinct environments:
1. **Developer Workstations & External Consumer Repositories**: Fast, interactive feedback during pair-programming inside standalone services (e.g., `omnichannel`) or monorepos (`platform`, `docs`), without requiring local Kubernetes clusters or MCP SDK installations.
2. **Kubernetes Production Clusters**: Centralized background pipelines, scheduled audit jobs, and multi-agent meshes running behind an Envoy ingress gateway (`AgentGateway`).

Forcing local workstations to run Docker containers for every MCP tool introduces startup latency (5-15 seconds per turn), memory overhead, and volume-mount friction. Conversely, relying strictly on unbundled TypeScript files fails in external consumer repositories that do not hoist `@modelcontextprotocol/sdk` or `@octokit/*`.

---

## 2. The Self-Contained Dual-Transport Solution

Every in-house MCP server in `mcp/servers/*` uses `tsup` (`noExternal`) to compile two self-contained CommonJS entrypoints with all runtime dependencies (`@modelcontextprotocol/sdk`, `@octokit/*`, `fastify`, `zod`, `dotenv`) inlined:

```text
                      ┌────────────────────────────────────────┐
                      │    TypeScript Source Code (src/)       │
                      └──────────────────┬─────────────────────┘
                                         │ Turborepo + tsup (noExternal)
                         ┌───────────────┴───────────────┐
                         ▼                               ▼
            ┌─────────────────────────┐     ┌─────────────────────────┐
            │      dist/index.cjs     │     │       dist/bin.cjs      │
            │   Streamable HTTP :8080 │     │      Stdio Transport    │
            │   (Fastify + Envoy)     │     │  (Self-Contained Bundle)│
            └─────────────────────────┘     └─────────────────────────┘
```

1. **Streamable HTTP (`dist/index.cjs`)**:
   - Built on Fastify listening on `:8080`.
   - Plugs directly into Envoy `AgentGateway` in Kubernetes via Streamable HTTP/SSE.
   - Provides centralized observability, rate limiting, and health checks (`/health`).
2. **Stdio Transport (`dist/bin.cjs`)**:
   - Zero-dependency Node.js bundle spawned via standard input/output by `mcp/servers/<server>/scripts/launcher.cjs`.
   - Diagnostic logging is strictly isolated to `stderr`, preserving JSON-RPC 2.0 integrity on `stdout`.
   - Persisted directly in Git (`!mcp/servers/*/dist/` in `.gitignore`) so external repositories consuming `github:tupynambalucas-dev/agent-mesh` execute immediately without running a build step.

---

## 3. Two-Tier Sovereign Launcher Routing

Each MCP-enabled domain plugin (`plugins/packages/<plugin>/scripts/launcher.cjs`) and each MCP server (`mcp/servers/<server>/scripts/launcher.cjs`) cooperate through a deterministic two-tier routing flow:

```text
[Agent Invokes MCP Tool]
          │
          ▼
[Plugin Launcher: plugins/packages/<plugin>/scripts/launcher.cjs]
          │
          ├── (MESH_PROFILE=cluster or CORTEX_GATEWAY_ENABLED=true)
          │         └──► Spawns npx -y mcp-remote ${CORTEX_GATEWAY_URL}/mcp
          │
          └── (MESH_PROFILE=local [default]: resolveMcpLauncher())
                    ├── 1. Standalone Package (@tupynambalucas-dev/mcp-<target>)
                    ├── 2. Umbrella Package (node_modules/@tupynambalucas-dev/agent-mesh/mcp/servers/<target>)
                    └── 3. Monorepo Sibling (mcp/servers/<target>)
                              │
                              ▼
                    [Sovereign MCP Launcher: mcp/servers/<target>/scripts/launcher.cjs]
                              │
                              └──► Spawns node dist/bin.cjs (or @playwright/mcp@0.0.84 fallback)
```

### Why Persist `dist/*.cjs` and Separate Launchers?
- **Zero External Dependency Coupling**: Consumer repositories like `omnichannel` only declare `@tupynambalucas-dev/agent-mesh` in `devDependencies`. They never install `@modelcontextprotocol/sdk`, `fastify`, or `@octokit/*`.
- **Standalone & Umbrella Portability**: Whether a server is invoked through a domain plugin or directly via its own `mcp.json` (`node ./scripts/launcher.cjs`), it resolves `.env` variables in cascade and executes within its own directory structure.
