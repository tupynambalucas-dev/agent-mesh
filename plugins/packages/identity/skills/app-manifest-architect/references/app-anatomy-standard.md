# App Anatomy & Taxonomy Standard (`foundation/identity/apps/`)

Authoritative specification for the **3-File App Anatomy** (`manifest.json` + `description.md` + `README.md`), the **Scope Prefix & Environment Suffix Taxonomy**, and the **Zod v4 Unified Manifest Schema** (`@tupynambalucas-dev/identity-portal-core`).

---

## 1. Scope Prefix & Environment Suffix Taxonomy

Every identity under `foundation/identity/apps/{github,gcloud}/<slug>/` follows the orthogonal grammar:

```text
Slug:       <scope-prefix>-<name>[-<env-suffix>]
Portal URL: https://apps.tupynambalucas.dev/apps/<slug>
```

| Level | Scope Prefix | Ownership | Branding / App Name | GCP Project (`<= 30 chars`) | Example |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1 — Organizational** | `org-` | `foundation/`, `agent-mesh/` | `tupynambalucas-org-<domain>` | `tupynambalucas-dev-core` (single central project) | `org-manager`, `org-automation`, `org-guardian`, `org-workspace` |
| **2 — SaaS Product** | `saas-` | `ecosystem/commercial/` | Product brand (`Omnichannel`, `Tessel`) | `tupynambalucas-<product>` | `saas-omnichannel` |
| **3 — B2B Client** | `client-` | `ecosystem/clients/` | `<Client> Integration` | `client-<client>-prod` | `client-acme` |
| **4 — Open Source** | `oss-` | `ecosystem/oss/` | `tupynambalucas-oss-<project>` | `tupynambalucas-oss-<project>` | `oss-cli-kit` |

- Optional environment suffixes (omitted in production): `-stg` (staging) and `-dev` (sandbox).
- Workstation exception: `developer-tools` (`scope: "dev"`, `tupynambalucas-developer-tools`, Tier 3 OAuth Device-Flow).

---

## 2. Mandatory 3-File App Anatomy

Every app directory MUST contain **exactly 3 files** (legacy `portal.json`, `app-config.json`, `scopes.json`, and `permissions.*` files are prohibited):

1. **`manifest.json`**: Single declarative JSON validated at build-time by `UnifiedAppManifestSchema` (`z.discriminatedUnion('provider', ...)`). Separates provider configuration (`github` or `gcloud`) from portal presentation and immutable identity metadata (`portal`).
2. **`description.md`**: Canonical 5-part GFM Markdown description (en-US, zero emojis) starting with `<!-- portal-summary: <pt-BR summary> -->` (invisible on GitHub; extracted for portal cards and `<meta name="description">`).
3. **`README.md`**: Technical identity specification (en-US, zero emojis) conforming to **Archetype D** of `readme-architect` (`## 1. Overview`, `## 2. Identity & Vault Specification`, `## 3. Directory Layout`, `## 4. Governance & Context`).

---

## 3. Canonical `description.md` Template

```markdown
<!-- portal-summary: Resumo conciso em pt-BR exibido no card do portal e na meta description SSG. -->
### <Functional Role Title>

`<app-name>` is the <Tier / Cloud Platform> identity for `tupynambalucas-dev`, <primary value proposition>.

#### Core Responsibilities
- **<Capability 1>**: <Concrete scope and tools>.
- **<Capability 2>**: <Concrete scope and tools>.

#### Custody & Security Architecture
- **Authentication**: <RS256 Server-to-Server IAT | Public OAuth Device-Flow | Installed Desktop OAuth + Service Account>.
- **Custody**: <Owning teams and isolation boundaries>.
- **Vaulting**: <Infisical Cloud path or local workstation storage>.

> [!NOTE]
> <Cryptographic attribution or compliance note>.
```

---

## 4. Unified `manifest.json` Skeletons

### 4.1. GitHub App (`provider: "github"`)

```json
{
  "provider": "github",
  "scope": "org",
  "github": {
    "name": "tupynambalucas-org-<role>",
    "url": "https://apps.tupynambalucas.dev/apps/org-<role>",
    "hook_attributes": {
      "url": "https://apps.tupynambalucas.dev/webhooks/github",
      "active": false
    },
    "redirect_url": "https://apps.tupynambalucas.dev/api/github/callback",
    "public": false,
    "default_permissions": {
      "metadata": "read"
    },
    "default_events": []
  },
  "portal": {
    "order": 10,
    "tier": "Tier 2",
    "secretPrefix": "ORG_ROLE",
    "infisicalPath": "/apps/org-role",
    "botUserId": 123456789
  }
}
```

### 4.2. Google Cloud App (`provider: "gcloud"`)

```json
{
  "provider": "gcloud",
  "scope": "org",
  "gcloud": {
    "app_name": "tupynambalucas-org-<domain>",
    "client_type": "hybrid",
    "project_id": "tupynambalucas-dev-core",
    "support_email": "tupynambalucas@gmail.com",
    "enabled_apis": ["drive.googleapis.com"],
    "branding": {
      "homepage_url": "https://apps.tupynambalucas.dev/apps/org-<domain>",
      "privacy_policy_url": "https://apps.tupynambalucas.dev/privacy",
      "terms_of_service_url": "https://apps.tupynambalucas.dev/terms",
      "authorized_domains": ["tupynambalucas.dev"]
    },
    "scopes": [
      {
        "scope": "https://www.googleapis.com/auth/drive.file",
        "description": "Access to files created or opened by the application.",
        "required": true
      }
    ]
  },
  "portal": {
    "order": 20,
    "displayProvider": "workspace",
    "tier": "Service Account",
    "landingUrl": "/apps/org-<domain>"
  }
}
```
