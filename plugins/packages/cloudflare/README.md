# Cloudflare Domain Plugin (`@tupynambalucas-dev/plugin-cloudflare`)

Enterprise Antigravity and Claude Code domain plugin for Cloudflare platform architecture, Workers, storage bindings (D1, R2, KV, Durable Objects, Queues, Workflows), AI Gateway, and Cloudflare One Zero Trust, backed by Cloudflare's managed Code Mode API MCP server.

---

## 1. Overview

`@tupynambalucas-dev/plugin-cloudflare` combines 24 curated upstream Cloudflare engineering skills (adapted from `cloudflare/skills` under `Apache-2.0` to pass strict 24 KB / 500-line progressive-disclosure validation) with a sovereign zero-leak authentication bridge (`scripts/launcher.cjs`) to Cloudflare's Code Mode MCP server (`https://mcp.cloudflare.com/mcp`), exposing over 2,500 Cloudflare API endpoints in ~1,000 context tokens.

---

## 2. Modular Skills Catalog

| Skill | Primary Focus |
| :--- | :--- |
| [**`cloudflare`**](./skills/cloudflare/SKILL.md) | Architecture discovery router mapping application requirements to Cloudflare products, CLIs, and HTTP error diagnostics. |
| [**`cf-cli`**](./skills/cf-cli/SKILL.md) | Official `cf` CLI operations (`cf cli search`, `cf schema`, `--dry-run`, `cloudflare.config.ts`) and `cf` vs. Wrangler selection. |
| [**`wrangler`**](./skills/wrangler/SKILL.md) | Deploying and managing Workers, KV, R2, D1, Vectorize, Queues, Secrets, and Workflows in Wrangler projects. |
| [**`cloudflare-app-bootstrap`**](./skills/cloudflare-app-bootstrap/SKILL.md) | Bootstrapping local bindings, secrets, resource provisioning, type generation, and local verification. |
| [**`workers-best-practices`**](./skills/workers-best-practices/SKILL.md) | Production Worker authoring, runtime API patterns, observability, compatibility dates, and code review. |
| [**`workers-development`**](./skills/workers-development/SKILL.md) | Local Explorer debugging, binding inspection, execution traces, and structured logs. |
| [**`workers-profiling`**](./skills/workers-profiling/SKILL.md) | Profiling CPU execution time and memory allocation hotspots in deployed Workers and Durable Objects. |
| [**`durable-objects`**](./skills/durable-objects/SKILL.md) | Stateful coordination, RPC, SQLite storage transactions, alarms, and WebSockets. |
| [**`agents-sdk`**](./skills/agents-sdk/SKILL.md) | Stateful AI agents with SQLite state, scheduling, RPC, remote MCP servers, and container harnesses. |
| [**`artifacts`**](./skills/artifacts/SKILL.md) | Versioned file trees, Git-compatible repositories, and agent workspace checkpoints on Cloudflare Artifacts. |
| [**`flagship`**](./skills/flagship/SKILL.md) | Feature flags, progressive percentage rollouts, and targeted release evaluation with Cloudflare Flagship. |
| [**`frameworks-on-cloudflare`**](./skills/frameworks-on-cloudflare/SKILL.md) | Deploying Astro, SvelteKit, React Router, TanStack Start, Nuxt, Hono, and SPAs on Workers. |
| [**`nextjs-on-cloudflare`**](./skills/nextjs-on-cloudflare/SKILL.md) | Deploying Next.js applications on Workers using `vinext`. |
| [**`sandbox-next`**](./skills/sandbox-next/SKILL.md) | Isolated Linux code execution environments on `@cloudflare/sandbox@next`. |
| [**`sandbox-stable`**](./skills/sandbox-stable/SKILL.md) | Maintaining applications on the stable `@cloudflare/sandbox` package. |
| [**`sandbox-migrate-to-next`**](./skills/sandbox-migrate-to-next/SKILL.md) | Migrating existing Sandbox applications from stable to `@cloudflare/sandbox@next`. |
| [**`basin`**](./skills/basin/SKILL.md) | Analytics pipelines, Iceberg catalogs, and SQL queries with Basin Pipelines, Basin Catalog, and Basin SQL. |
| [**`k2`**](./skills/k2/SKILL.md) | Durable K2 event streams with HTTP/Worker producers and subscription consumers. |
| [**`cloudflare-email-service`**](./skills/cloudflare-email-service/SKILL.md) | Transactional Email Sending, Email Routing, and inbound Email Workers. |
| [**`turnstile-spin`**](./skills/turnstile-spin/SKILL.md) | Implementing and validating Cloudflare Turnstile widgets and server-side Siteverify integration. |
| [**`web-perf`**](./skills/web-perf/SKILL.md) | Auditing Core Web Vitals (FCP, LCP, TBT, CLS), render-blocking chains, and edge caching. |
| [**`cloudflare-one`**](./skills/cloudflare-one/SKILL.md) | Zero Trust Access, Gateway, WARP, Cloudflare Tunnel, Magic WAN, DLP, CASB, and service tokens. |
| [**`cloudflare-one-migrations`**](./skills/cloudflare-one-migrations/SKILL.md) | Migrating Zscaler, Palo Alto, and legacy VPN/SWG policies to Cloudflare One. |
| [**`gateway-workers`**](./skills/gateway-workers/SKILL.md) | Authoring Workers invoked by Gateway HTTP Forward policies. |

---

## 3. Directory Layout

- [plugin.json](./plugin.json): Agent Plugins 1.0.0 manifest declaring identity, version, author, and keywords.
- [package.json](./package.json): Workspace package manifest (`@tupynambalucas-dev/plugin-cloudflare`) and `sync:upstream` script.
- [rules/AGENTS.md](./rules/AGENTS.md): Active Cloudflare domain rules, `cf` vs. `wrangler` CLI invariants, secret hygiene, and Autonomous Domain Mandate.
- [scripts/launcher.cjs](./scripts/launcher.cjs): Sovereign MCP launcher bridging local Stdio to `https://mcp.cloudflare.com/mcp` with zero-leak Bearer token injection and Cortex Gateway cluster failover.
- [scripts/sync-upstream.cjs](./scripts/sync-upstream.cjs): Deterministic synchronizer fetching `cloudflare/skills`, enforcing the 24 KB body ceiling, and sanitizing markdown links.
- [references/README.md](./references/README.md): Upstream commit provenance and progressive-disclosure curation matrix.
- [mcp.json](./mcp.json): Agent Plugins 1.0.0 stdio MCP binding targeting `./scripts/launcher.cjs`.
- [mcp_config.json](./mcp_config.json): Native Antigravity MCP binding targeting `./scripts/launcher.cjs`.
- [CHANGELOG.md](./CHANGELOG.md): Symmetrical release history for `@tupynambalucas-dev/plugin-cloudflare`.
- [LICENSE](./LICENSE): Apache License 2.0 governing package and upstream skill assets.

---

## 4. Configuration & Token Provisioning

| Variable | Required | Description |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | Recommended (unattended auth) | Cloudflare **Account API Token (`cfat_*`)** (requires `Account -> Account Settings -> Read`) or **User API Token (`cfut_*`)** (requires **both** `User -> User Details -> Read` and `Account -> Account Settings -> Read`). Global API Keys (`cfk_*`) and **Client IP Address Filtering** are unsupported. |
| `CLOUDFLARE_ACCOUNT_ID` | Optional | Default Cloudflare Account ID for `cf` CLI, Wrangler, and multi-account `execute()` calls. |
| `CLOUDFLARE_MCP_URL` | Optional | Remote MCP endpoint override (defaults to `https://mcp.cloudflare.com/mcp`). |
| `CLOUDFLARE_CODE_MODE` | Optional | Set to `false` to disable Code Mode and expose ~3,000 direct forge tools (`?codemode=false`). Defaults to `true`. |
| `MESH_PROFILE` | Optional | Set to `cluster` (or `CORTEX_GATEWAY_ENABLED=true`) to route via Cortex Gateway; defaults to `local` native Streamable HTTP bridge. |
| `CORTEX_GATEWAY_URL` | Optional | Envoy AgentGateway cluster URL (defaults to `http://localhost:8080`). |

---

## 5. Usage & Activation

### Antigravity (`agy`) — External Repositories (Umbrella Package)

```json
{
  "entries": [
    {
      "path": "node_modules/@tupynambalucas-dev/agent-mesh/plugins/packages",
      "include_only": ["cloudflare"]
    }
  ]
}
```

### Antigravity (`agy`) — Meta-Repository Root (`org`)

```json
{
  "entries": [
    { "path": "agent-mesh/plugins/packages/cloudflare" }
  ]
}
```

### Claude Code

```bash
/plugin install cloudflare@tupynambalucas-dev
```

---

## 6. Domain Rules & Autonomous Mandate

> [!IMPORTANT]
> **Autonomous Domain Mandate (Rule 0):**
> When requested to architect, scaffold, configure, deploy, debug, secure, or query Cloudflare services (Workers, Pages, D1, R2, KV, Durable Objects, Queues, Workflows, Workers AI, DNS, WAF, Turnstile, or Cloudflare One), the agent MUST autonomously engage the Cloudflare skills and Code Mode MCP server (`search`, `execute`, `docs`, `whoami`) without waiting for explicit tool invocations from the user.

---

## 7. License

Licensed under the [Apache License 2.0](./LICENSE). Upstream skills adapted from [`cloudflare/skills`](https://github.com/cloudflare/skills) (Copyright Cloudflare, Inc., Apache-2.0); monorepo integration and sovereign launcher Copyright (c) 2026 tupynambalucas.dev.
