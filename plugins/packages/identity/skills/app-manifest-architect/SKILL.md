---
name: app-manifest-architect
description: Authors, standardizes, and audits 4-Tier GitHub App declarative manifests (manifest.json), Canonical Markdown App Descriptions, and cross-cloud identity catalogs in foundation/identity/apps/.
---

# App Manifest Architect

Governs declarative application manifests across `foundation/identity/apps/github/` (`org-manager`, `automation`, `guardian`, `developer-tools`) and `foundation/identity/apps/gcloud/`.

---

## 1. When to Use

Activate this skill when:
- Creating or updating any `foundation/identity/apps/github/*/manifest.json`.
- Authoring or standardizing a GitHub App Markdown description.
- Debugging GitHub App Manifest Flow validation errors or `audit-apps.js` drift reports.
- Registering new Google Cloud or Google Workspace identity records.

---

## 2. Canonical Markdown Description Template (Mandatory)

Every organizational GitHub App MUST use the exact 5-part GFM Markdown anatomy (en-US, zero emojis):

```markdown
### <Functional Role Title>

`<app-slug>` is the Tier-<1|2A|2B|3> <role summary> identity for `tupynambalucas-dev`, <primary value proposition>.

#### Core Responsibilities
- **<Capability 1>**: <Concrete scope and tools>.
- **<Capability 2>**: <Concrete scope and tools>.
- **<Capability 3>**: <Concrete scope and tools>.

#### Custody & Security Architecture
- **Authentication**: <RS256 Server-to-Server IAT via Go Token Broker / Cloudflare Workflows | Public OAuth Device-Flow>.
- **Custody**: <Owning teams and isolation boundaries>.
- **Vaulting**: <Infisical Cloud path (`/governance`, `/delivery`, `/protection`) or zero-key for Tier-3>.
- **Webhooks**: <Active (`https://apps.tupynambalucas.dev/webhooks/github`) with constant-time HMAC-SHA256 | Disabled (`Active: false`)>.

> [!NOTE]
> <Cryptographic Verified badge attribution under `@<app-slug>[bot]` or `programmatic_access_type: GitHub App user-to-server token` for Tier-3>.
```

---

## 3. GitHub App Manifest Invariants

1. **Standard URLs**:
   - `url`: `"https://apps.tupynambalucas.dev"`
   - `redirect_url`: `"https://apps.tupynambalucas.dev/api/github/callback"`
   - `hook_attributes.url`: `"https://apps.tupynambalucas.dev/webhooks/github"` (`active: true` ONLY for `guardian`; `active: false` for `org-manager`, `automation`, `developer-tools`).
2. **Forbidden `default_events` Entries**:
   - NEVER include `"installation"` or `"installation_repositories"` in `default_events`. GitHub delivers installation lifecycle events automatically whenever webhooks are active and rejects manifests that declare them explicitly.
3. **Removed / Deprecated Permissions**:
   - NEVER include `"team_discussions"` in `default_permissions` (sunset and removed by GitHub).
4. **No OAuth Web Callback URL on Headless/Device-Flow Apps**:
   - `redirect_url` is strictly for Manifest Flow creation. Do not configure an OAuth Web Flow Callback URL on Tier-1, Tier-2A, Tier-2B, or Tier-3 (Device Flow) Apps.

---

## 4. Drift Verification

```bash
node plugins/packages/github-org/skills/github-app-operator/scripts/audit-apps.js
node plugins/packages/github-org/skills/github-app-operator/scripts/audit-apps.js --reconcile-webhooks
```
