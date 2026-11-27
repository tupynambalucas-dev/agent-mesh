# Cloudflare Plugin Upstream Provenance & Reference (`references/`)

This document records the upstream synchronization state, Apache-2.0 provenance, progressive-disclosure curation, and Cloudflare API Token requirements for `@tupynambalucas-dev/plugin-cloudflare`.

---

## 1. Upstream Synchronization Metadata

- **Upstream Skills Repository**: `https://github.com/cloudflare/skills`
- **Upstream License**: `Apache-2.0`
- **Pinned Upstream Commit SHA**: `ff191de7d903788eceaf516a514ae7d3b56b924a` (2026-11-24)
- **Managed Remote MCP Endpoint**: `https://mcp.cloudflare.com/mcp` (Code Mode Dual-Worker Runtime)
- **Synchronized Skill Count**: 24 skills

To pull newer upstream Cloudflare skill updates deterministically:

```bash
pnpm --filter @tupynambalucas-dev/plugin-cloudflare sync:upstream
```

---

## 2. Progressive-Disclosure 24 KB Curation Log

Antigravity enforces a strict 24,000-byte per-file body ceiling on `SKILL.md` files (and Claude Code truncates re-attached skills at 5,000 tokens during auto-compaction). Oversized upstream tables were extracted into on-demand `references/extended-reference.md` files with zero information loss:

- `cloudflare`: body reduced from 31776 B to 8248 B (extracted: What are you trying to build? -> `skills/cloudflare/references/extended-reference.md`).
- `cloudflare-one`: body reduced from 26157 B to 11512 B (extracted: Guardrails -> `skills/cloudflare-one/references/extended-reference.md`).
- `turnstile-spin`: body reduced from 28695 B to 6962 B (extracted: Conversation flow -> `skills/turnstile-spin/references/extended-reference.md`).

---

## 3. Curated Skills Inventory

| Skill Slug | Body Size (Bytes) | Line Count | Progressive Split |
| :--- | ---: | ---: | :--- |
| `agents-sdk` | 12152 | 207 | No |
| `artifacts` | 7349 | 49 | No |
| `basin` | 2501 | 29 | No |
| `cf-cli` | 6972 | 95 | No |
| `cloudflare` | 8248 | 65 | Yes (`references/extended-reference.md`) |
| `cloudflare-app-bootstrap` | 5769 | 48 | No |
| `cloudflare-email-service` | 6638 | 78 | No |
| `cloudflare-one` | 11512 | 115 | Yes (`references/extended-reference.md`) |
| `cloudflare-one-migrations` | 12489 | 115 | No |
| `durable-objects` | 6121 | 185 | No |
| `flagship` | 8171 | 45 | No |
| `frameworks-on-cloudflare` | 5689 | 37 | No |
| `gateway-workers` | 4456 | 43 | No |
| `k2` | 2382 | 30 | No |
| `nextjs-on-cloudflare` | 2443 | 38 | No |
| `sandbox-migrate-to-next` | 7877 | 190 | No |
| `sandbox-next` | 6737 | 97 | No |
| `sandbox-stable` | 9273 | 115 | No |
| `turnstile-spin` | 6962 | 82 | Yes (`references/extended-reference.md`) |
| `web-perf` | 8284 | 206 | No |
| `workers-best-practices` | 6071 | 69 | No |
| `workers-development` | 2506 | 26 | No |
| `workers-profiling` | 2009 | 49 | No |
| `wrangler` | 11488 | 76 | No |
