---
trigger: always_on
---

# Cloudflare Domain Rules

0. Autonomous Domain Mandate:
   - When requested to architect, scaffold, configure, deploy, debug, secure, or query Cloudflare services (Workers, Static Assets, Pages, D1, R2, KV, Durable Objects, Queues, Workflows, Workers AI, AI Gateway, Vectorize, DNS, WAF, Turnstile, or Cloudflare One Zero Trust), the agent MUST autonomously engage the Cloudflare plugin skills (`cloudflare`, `cf-cli`, `wrangler`, `workers-best-practices`, `durable-objects`, `agents-sdk`, `cloudflare-one`, etc.) and the `cloudflare` Code Mode MCP server (`search`, `execute`, `docs`, `whoami`) without waiting for explicit tool invocations from the user.

1. Live Documentation & Schema Retrieval:
   - Never speculate on Cloudflare API endpoints, binding formats, quotas, or compatibility flags from pre-trained weights.
   - Always verify specifications via the `docs` and `search` MCP tools or explicit Markdown routes (`https://developers.cloudflare.com/<route>/index.md`).

2. Deterministic CLI Selection (`cf` vs. `wrangler`):
   - Use the `cf` CLI (`cf cli search`, `cf schema`, `--dry-run`) for new projects and projects declaring `cloudflare.config.ts`.
   - Preserve `wrangler` for `dev`, `build`, and `deploy` in existing projects declaring `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml` without `cloudflare.config.ts`, and run `wrangler types` whenever bindings change.

3. Production Workers Observability & Compatibility:
   - Set `compatibility_date` to the current date for newly created Workers.
   - Enable both `observability.enabled: true` and `observability.traces.enabled: true` on production Workers.

4. API Token & Secret Hygiene:
   - Resolve `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` strictly via Infisical or `.env` cascade:
     - **Account API Token (`cfat_*` - Recommended)**: Must include `Account -> Account Settings -> Read` on `Entire account` (probed via `GET /accounts?per_page=5`). Covers all products except Turnstile, Registrar, Page Rules, and Super Bot Fight Mode.
     - **User API Token (`cfut_*` - Use when Turnstile API is also required)**: Must include **both** `User -> User Details -> Read` AND `Account -> Account Settings -> Read` (probed in parallel via `GET /user` and `GET /accounts?per_page=20`).
     - **Global API Keys (`cfk_*`) and Client IP Address Filtering**: Strictly unsupported by `mcp.cloudflare.com/mcp` (outbound requests egress from Cloudflare's shared Worker IP pool).
   - Never hardcode plaintext credentials in `mcp_config.json`, `mcp.json`, `wrangler.jsonc`, `cloudflare.config.ts`, or version-controlled files, and never attempt to solve or bypass Cloudflare Turnstile challenges.

5. Destructive Mutation Confirmation Gate:
   - Preview CLI mutations with `--dry-run` and require explicit user confirmation before executing destructive API calls (`DELETE` on zones, DNS records, Workers, D1 databases, R2 buckets, KV namespaces, or WAF rulesets) or paid subscription changes.

6. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all Worker source files, configuration manifests, logs, and documentation.
