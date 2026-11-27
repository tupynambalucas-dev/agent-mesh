---
trigger: always_on
---

# Machine Identity & Apps Portal Domain Rules

0. Autonomous Domain Mandate:
   - When requested to design, provision, audit, or update GitHub App manifests (`foundation/identity/apps/github/*/manifest.json`), App Markdown descriptions, the Cloudflare Identity Portal (`apps.tupynambalucas.dev`), or the Go Token Broker (`foundation/identity/broker`), the agent MUST autonomously engage the Identity plugin skills (`app-manifest-architect`, `identity-portal-architect`, `token-broker-operator`).

1. Four-Tier Separation of Duties (SoD) Invariant:
   - Maintain strict isolation across Tier-1 (`tupynambalucas-org-manager`), Tier-2A (`tupynambalucas-automation`), Tier-2B (`tupynambalucas-guardian`), and Tier-3 (`tupynambalucas-developer-tools`). Never grant Tier-1 administrative permissions to webhook-facing or PR-authoring identities.

2. Canonical Markdown App Description Invariant:
   - All GitHub App descriptions MUST follow the standardized GFM Markdown structure (`### <Title>`, Tier intro, `#### Core Responsibilities`, `#### Custody & Security Architecture`, `> [!NOTE]` cryptographic verification block) with zero emojis.

3. Zero-Disk-PEM & Infisical Vault Invariant:
   - Provision GitHub Apps through the Zero Trust serverless Manifest Flow (`https://apps.tupynambalucas.dev/api/github/provision?tier=<tier>`) so RSA private keys are converted to Base64 in memory and stored directly in Infisical Cloud (`/governance`, `/delivery`, `/protection`, `/workstation`). Never commit or echo plaintext keys.
