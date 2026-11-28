---
name: identity-portal-architect
description: Architects, develops, and operates the Cloudflare Workers, Workflows, and Static Assets Identity Portal (apps.tupynambalucas.dev) including Zero Trust Manifest Flow provisioning, Infisical auto-folder callbacks, and 7-Gate PR evaluation.
---

# Identity Portal Architect (`apps.tupynambalucas.dev`)

Governs the serverless Identity Portal (`foundation/identity/portal/`) hosted on Cloudflare Workers (`tupynambalucas-apps-portal`).

---

## 1. When to Use

Activate this skill when:
- Modifying routes, webhooks, Cloudflare Workflows, or Infisical integration in `foundation/identity/portal/`.
- Configuring Cloudflare Access Zero Trust rules protecting `/api/github/*`.
- Refactoring the portal into isolated `core/`, `web/` (React + FSD), and `api/` (Cloudflare Worker) workspaces.
- Debugging Cloudflare Worker exceptions (`Error 1101`) using Cloudflare Observability Telemetry.

---

## 2. Route & Security Architecture

| Route | Protection Layer | Responsibility |
| :--- | :--- | :--- |
| `/`, `/privacy`, `/terms`, `/rclone`, `/workspace` | Public Static Assets (`public/_headers`) | Institutional catalog and OAuth compliance pages required by GitHub and Google auditors. |
| `/api/health` | Public Worker JSON | Liveness check confirming `workflowsBound: true`. |
| `/api/apps/status` | Public Worker JSON (60s edge cache) | Live provisioning state discovery via `GET https://api.github.com/apps/{slug}`. |
| `/api/github/provision` | Cloudflare Access Zero Trust (`/api/github/*`) | Validates `Cf-Access-Jwt-Assertion`, signs HMAC `state`, renders auto-submit Manifest Flow form. |
| `/api/github/callback` | Cloudflare Access Zero Trust (`/api/github/*`) | Validates Access JWT + HMAC `state`, converts GitHub manifest `code`, ensures Infisical folders, upserts secrets (`dev`/`prod`), redirects to GitHub App installation. |
| `/webhooks/github` | Open edge + Constant-time HMAC-SHA256 | Verifies `X-Hub-Signature-256`, sanitizes dotfile repo names for Workflow IDs, dispatches `PrGateEvaluatorWorkflow`. |

---

## 3. Critical Engineering Invariants

1. **Modular Separation (`core/` + `web/` + `api/`)**: Keep React FSD frontend (`web/`) strictly decoupled from Cloudflare Worker/Workflow runtime (`api/`), sharing contracts via `core/` and serving `../web/dist` through `wrangler.jsonc` Static Assets.
2. **Infisical Auto-Folder Provisioning**: Always call `POST /api/v1/folders` idempotently before `POST/PATCH /api/v3/secrets/raw/{key}` so new paths (`/protection`, `/governance`, `/delivery`, `/workstation`) never fail with `404 SecretPathNotFound`.
3. **Cloudflare Workflows Limits**: Sanitize Workflow Instance IDs to `^[a-zA-Z0-9_][a-zA-Z0-9-_]*$` (max 100 chars) to support dotfile repositories (`.github`, `.github-private`), never return secrets from `step.do()`, and keep per-step CPU under 10ms using Web Crypto `crypto.subtle` + native `fetch()`.
4. **Cloudflare Access with Static Assets**: Always validate `Cf-Access-Jwt-Assertion` against team JWKS (`CF_ACCESS_TEAM_DOMAIN` + `CF_ACCESS_AUD`) in Worker code because Static Assets Workers do not populate `ctx.access`.
