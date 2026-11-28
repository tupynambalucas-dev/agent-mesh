---
trigger: always_on
---

# Machine Identity & Apps Portal Domain Rules

0. Autonomous Domain Mandate:
   - When requested to design, provision, audit, or update app manifests (`foundation/identity/apps/{github,gcloud}/*/manifest.json`), App Markdown descriptions (`description.md`), the Cloudflare Identity Portal (`apps.tupynambalucas.dev`), or the Go Token Broker (`foundation/identity/broker`), the agent MUST autonomously engage the Identity plugin skills (`app-manifest-architect`, `identity-portal-architect`, `token-broker-operator`).

1. Four-Tier Separation of Duties (SoD) & Rename-Proof Identity Invariant:
   - Maintain strict isolation across Tier-1 (`tupynambalucas-org-manager`), Tier-2A (`tupynambalucas-org-automation`, Bot User ID `353557933`), Tier-2B (`tupynambalucas-org-guardian`, Bot User ID `362146655`), Tier-3 (`tupynambalucas-developer-tools`, Bot User ID `353560338`), and Google Cloud (`tupynambalucas-org-workspace` in `tupynambalucas-dev-core`).
   - PR quality gates MUST authenticate/authorize bots via immutable `Bot User ID` + SSOT-derived logins from `@tupynambalucas-dev/identity-portal-core`, never hardcoded login strings.

2. Three-File App Anatomy & Canonical Description Invariant:
   - Every app directory under `foundation/identity/apps/{github,gcloud}/<slug>/` MUST contain exactly `manifest.json` (Zod `UnifiedAppManifestSchema`), `description.md` (`<!-- portal-summary: ... -->` + 5-part GFM structure), and `README.md` (Archetype D technical spec) with zero emojis.

3. Zero-Disk-PEM & Infisical Vault Invariant:
   - Provision GitHub Apps through the Zero Trust serverless Manifest Flow (`https://apps.tupynambalucas.dev/api/github/provision?tier=<tier>`) so RSA private keys are converted to Base64 in memory and stored directly in Infisical Cloud (`/governance`, `/delivery`, `/protection`, `/workstation`). Never commit or echo plaintext keys.
