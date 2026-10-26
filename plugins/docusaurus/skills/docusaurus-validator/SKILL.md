---
name: docusaurus-validator
description: Audits Docusaurus documentation for broken internal links, MDX syntax errors, build failures, and Crowdin localization isolation.
---

# Docusaurus Documentation Validator

This skill establishes the verification pipeline and localization boundaries for documentation repositories.

---

## 1. Single-Pass Deferred Validation

- **No Intermediate Tests**: Do NOT run verification commands after each individual edit. Batch all changes first.
- **Verification Execution**: Execute build validation once at the conclusion of the documentation task:
  ```bash
  pnpm --filter @tupynambalucas-dev/docs build
  ```
- **Strictly No Dev Servers**: Never spawn dev servers (`pnpm start`, `pnpm dev`) or preview daemons in automated agent sessions.

---

## 2. Link Integrity Rules

- **Absolute Docusaurus Paths**: Use site-absolute paths (e.g., `(/reference/cortex/gateway)`) rather than fragile relative paths (`../../`).
- **Strip Extensions from Link Targets**: Omit `.md` and `.mdx` extensions in internal links; Docusaurus resolves routes automatically.
- **Remote Links**: Preserve external URLs (`https://...`) without altering query parameters.

---

## 3. Localization (L10n) Isolation

- **Source Language Exclusivity**: All documentation must be authored strictly in en-US.
- **Never Edit Target Locales**: Never manually modify files in `locales/` or `i18n/`. All translations are managed asynchronously via Crowdin automation.
- Commit clean English source files to trigger automated Crowdin sync pull requests.
