# Enterprise Environment Configuration Template Standard (.env.example)

This reference defines the authoritative enterprise format and styling rules for all `.env.example` configuration templates across repositories, monorepos, and packages.

---

## 1. Core Principles & Safety Invariants

1. **Zero Plaintext Secret Leakage**: Never commit real secrets, private keys, production URLs, or authentication tokens.
2. **Deterministic Placeholders**: Always use standardized uppercase placeholders wrapped in angle brackets: `<YOUR_VARIABLE_NAME>`.
3. **Faithful Structural Replica**: `.env.example` MUST mirror `.env` line-for-line, key-for-key, maintaining identical section groupings and ordering.
4. **Descriptive Comments**: Every environment variable must have an inline or preceding comment explaining its purpose, accepted values, and operational defaults using `# --`.

---

## 2. Canonical Enterprise Template Format

```env
# ==============================================================================
# Enterprise Environment Configuration Template (.env.example)
# Subsystem: <DOMAIN_OR_SUBSYSTEM_NAME>
# Scope:     <PACKAGE_OR_SERVICE_SCOPE>
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. CORE RUNTIME & ENVIRONMENT GOVERNANCE
# ------------------------------------------------------------------------------
# -- Runtime execution environment (dev | staging | prod)
NODE_ENV=dev

# -- Service listening port
PORT=3000

# -- Log verbosity level (trace | debug | info | warn | error | fatal)
LOG_LEVEL=info

# ------------------------------------------------------------------------------
# 2. INFISICAL VAULT & MACHINE IDENTITY (UNIVERSAL AUTH)
# ------------------------------------------------------------------------------
# -- Infisical project workspace identifier
INFISICAL_PROJECT_ID=<YOUR_INFISICAL_PROJECT_ID>

# -- Infisical Machine Identity Client ID
INFISICAL_CLIENT_ID=<YOUR_INFISICAL_CLIENT_ID>

# -- Infisical Machine Identity Client Secret
INFISICAL_CLIENT_SECRET=<YOUR_INFISICAL_CLIENT_SECRET>

# -- Target secret environment (dev | staging | prod)
INFISICAL_ENVIRONMENT=dev

# ------------------------------------------------------------------------------
# 3. DOMAIN SERVICE & DATABASE CONFIGURATION
# ------------------------------------------------------------------------------
# -- Database connection URL
DATABASE_URL=postgresql://<YOUR_DB_USER>:<YOUR_DB_PASSWORD>@localhost:5432/<YOUR_DB_NAME>

# -- Redis caching endpoint
REDIS_URL=redis://localhost:6379/0

# ------------------------------------------------------------------------------
# 4. EXTERNAL API CREDENTIALS & INTEGRATIONS
# ------------------------------------------------------------------------------
# -- Third-party API token
EXTERNAL_API_KEY=<YOUR_EXTERNAL_API_KEY>
```

---

## 3. Audit Checklist

- [ ] Boxed ASCII section headers with sequential numbering (`1. ...`, `2. ...`).
- [ ] Every placeholder adheres to `<YOUR_VARIABLE_NAME>`.
- [ ] No plaintext secrets or real API keys.
- [ ] Comments use `# --` prefix for descriptive documentation.
- [ ] Sibling `.env` matches `.env.example` structure 1:1.
