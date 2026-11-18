---
name: docusaurus-auditor
description: Audits Docusaurus documentation for broken internal links, MDX syntax errors, build failures, and Crowdin localization isolation.
---

# Docusaurus Validator

Audits, tests, and validates Docusaurus workspaces for link integrity, MDX parser errors, and build health.

---

## 1. When to Use

Activate this skill when:
- Validating documentation prior to committing or creating pull requests.
- Troubleshooting build errors (e.g. `MDX compile failed`, `Broken links found`).
- Verifying that no edits have touched localized directories (`i18n/`).
- Enforcing Zero-Emoji compliance across documentation files.

---

## 2. Operational Workflows

### Workflow A: Build & Link Verification
1. Run local build check:
   ```bash
   pnpm run build
   ```
2. Inspect output for broken link warnings:
   - Relative links must point to existing `.md` files or resolved URL paths.
   - Anchor links (`#heading-id`) must match generated GitHub slugs.

### Workflow B: Crowdin Boundary Enforcement
Verify git diff to confirm no edits were made in `i18n/`:
```bash
git diff --name-only | grep -E '^i18n/'
```
If localized files are detected, revert them and apply changes exclusively to `docs/`.

---

## 3. Reference Links

- [Docusaurus Domain Rules](../../rules/AGENTS.md)
- [Docusaurus v3 MDX Specification](../../references/docusaurus-v3-mdx-spec.md)
