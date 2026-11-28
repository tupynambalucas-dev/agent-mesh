---
name: identity-portal-architect
description: Architects, develops, and operates the Cloudflare Workers, Workflows, and Static Assets Identity Portal (apps.tupynambalucas.dev) including Zod v4 SSOT codegen, SSG prerendering, Zero Trust Manifest Flow provisioning, Infisical auto-folder callbacks, and rename-proof 7-Gate PR evaluation.
---

# Identity Portal Architect (`apps.tupynambalucas.dev`)

Governs the serverless Identity Portal (`foundation/identity/portal/`) hosted on Cloudflare Workers (`tupynambalucas-apps-portal`).

---

## 1. When to Use

Activate this skill when:
- Modifying Zod schemas (`core/src/schemas/`), compliance documents (`compliance.schema.ts`), or `generate-registry.ts` in `foundation/identity/portal/core/`.
- Updating `<AppDetailView />`, `RouterProvider`, or `scripts/prerender.ts` in `foundation/identity/portal/web/`.
- Modifying routes, webhooks, `PrGateEvaluatorWorkflow`, `wrangler.jsonc`, or Infisical integration in `foundation/identity/portal/api/`.

---

## 2. Route & Security Architecture

| Route | Protection Layer | Responsibility |
| :--- | :--- | :--- |
| `/`, `/privacy`, `/terms`, `/apps/<slug>`, `/workspace`, `/rclone` | Public Static Assets (`html_handling: "drop-trailing-slash"`) | Pre-rendered SSG HTML (`HTTP 200` zero-redirect, zero Worker CPU) for Google OAuth crawlers and React 19 `hydrateRoot` SPA. |
| `/api/health` | Public Worker JSON | Liveness check confirming `workflowsBound: true`. |
| `/api/apps/status` | Public Worker JSON (60s edge cache) | Live provisioning state discovery via `GET https://api.github.com/apps/{name}` using Guardian IAT for private apps. |
| `/api/github/provision` | Cloudflare Access Zero Trust (`/api/github/*`) | Validates `Cf-Access-Jwt-Assertion`, signs HMAC `state`, renders auto-submit Manifest Flow form from `GITHUB_MANIFESTS_BY_SLUG`. |
| `/api/github/callback` | Cloudflare Access Zero Trust (`/api/github/*`) | Validates Access JWT + HMAC `state`, converts GitHub manifest `code`, ensures Infisical folders, upserts secrets (`dev`/`prod`), redirects to installation. |
| `/webhooks/github` | Open edge + Constant-time HMAC-SHA256 | Validates payloads via Zod schemas, extracts immutable `authorId`/`authorType`, dispatches `PrGateEvaluatorWorkflow`. |

---

## 3. Critical Engineering Invariants

1. **Zod v4 SSOT (`core/src/schemas/`)**: All contracts (`manifest.schema.ts`, `app.schema.ts`, `compliance.schema.ts`, `webhook.schema.ts`) reside in `core` and are shared across `core`, `web`, and `api`.
2. **Rename-Proof PR Governance**: `gates.ts` and `pr-gate-evaluator.ts` MUST validate bot actors via immutable `Bot User ID` arrays (`AUTHORIZED_BOT_USER_IDS`, `GUARDIAN_BOT_USER_IDS`) and SSOT-derived logins — never hardcode bot login strings.
3. **SSG Zero-Redirect for OAuth Crawlers**: Keep `"html_handling": "drop-trailing-slash"` in `wrangler.jsonc` and run `scripts/prerender.ts` after `vite build` so every public route serves full semantic HTML with `<a href="https://apps.tupynambalucas.dev/privacy">` without JS execution.
4. **Infisical Auto-Folder & Cloudflare Workflows Limits**: Call `POST /api/v1/folders` idempotently before upserting secrets; sanitize Workflow Instance IDs to `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` (max 100 chars), never return secrets from `step.do()`, and validate `Cf-Access-Jwt-Assertion` in Worker code.
