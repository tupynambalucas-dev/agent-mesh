---
name: app-manifest-architect
description: Authors, standardizes, and audits 4-Tier GitHub App and Google Cloud declarative manifests (manifest.json), Canonical Markdown App Descriptions (description.md), and Archetype D README.md files in foundation/identity/apps/.
---

# App Manifest Architect

Governs declarative application specifications across `foundation/identity/apps/github/` (`org-manager`, `org-automation`, `org-guardian`, `developer-tools`) and `foundation/identity/apps/gcloud/` (`org-workspace`).

---

## 1. When to Use

Activate this skill when:
- Creating, renaming, or updating any app under `foundation/identity/apps/{github,gcloud}/<slug>/`.
- Authoring `manifest.json` (Zod `UnifiedAppManifestSchema`), `description.md`, or Archetype D `README.md` files.
- Debugging Zod schema validation errors, `generate-registry.ts` build failures, or `audit-apps.js` drift reports.

---

## 2. Core Invariants (3-File App Anatomy)

Every app directory MUST follow [references/app-anatomy-standard.md](./references/app-anatomy-standard.md):

1. **`manifest.json` (Unified Zod v4 Contract)**:
   - Discriminated by `"provider": "github" | "gcloud"` and `"scope": "org" | "saas" | "client" | "oss" | "dev"`.
   - `generate-registry.ts` validates against `UnifiedAppManifestSchema` and projects pure GitHub Manifest Flow payloads (`GITHUB_MANIFESTS_BY_SLUG`) without leaking `portal` metadata.
2. **`description.md` (Canonical GFM + Portal Summary)**:
   - Starts with `<!-- portal-summary: <pt-BR summary> -->` followed by the 5-part GFM Markdown anatomy (en-US, zero emojis).
   - Never embed `description` inline inside `manifest.json`.
3. **`README.md` (Archetype D Technical Spec)**:
   - Enforces `readme-architect` Archetype D (`en-US`, zero emojis, no duplication of `description.md` prose).
4. **Immutable Bot Identity (`botUserId`)**:
   - Record the GitHub numeric `Bot User ID` (`GET /users/<slug>[bot]`) in `portal.botUserId` and set `canOpenAutomatedPrs: true` or `isPrApprover: true` so PR gates remain 100% rename-proof.

---

## 3. GitHub App Manifest Guardrails

1. **Standard URLs**:
   - `url`: `"https://apps.tupynambalucas.dev/apps/<slug>"`
   - `redirect_url`: `"https://apps.tupynambalucas.dev/api/github/callback"`
   - `hook_attributes.url`: `"https://apps.tupynambalucas.dev/webhooks/github"` (`active: true` ONLY for `org-guardian`).
2. **Forbidden Fields & Values**:
   - NEVER include `"installation"` or `"installation_repositories"` in `default_events`.
   - NEVER include `"team_discussions"` in `default_permissions`.
   - NEVER end `github.name` with `-bot` or exceed 34 characters.

---

## 4. Verification Commands

```bash
pnpm --filter @tupynambalucas-dev/identity-portal-core build
pnpm --filter @tupynambalucas-dev/identity-portal-core typecheck
node plugins/packages/github-org/skills/github-app-operator/scripts/audit-apps.js
```
