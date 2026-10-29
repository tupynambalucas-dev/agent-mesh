---
name: community-health-architect
description: Authors and audits standard GitHub community health and governance files, including CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md, SUPPORT.md, CHANGELOG.md, and GOVERNANCE.md.
---

# Community Health Architect

This skill defines the authoritative specifications for authoring, auditing, and maintaining standard repository community health and governance files across `tupynambalucas-dev` repositories.

---

## 1. Supported Community Health Files

| File | Canonical Location | Standard / Foundation | Purpose |
| :--- | :--- | :--- | :--- |
| `CODE_OF_CONDUCT.md` | Root or `.github/` | Contributor Covenant v2.1 | Defines standards for acceptable behavior, harassment policies, and enforcement contacts. |
| `CONTRIBUTING.md` | Root or `.github/` | GitHub Open Source Guide | Communicates guidelines for submitting PRs, branch conventions, commit signing, and local setups. |
| `SECURITY.md` | Root or `.github/` | GitHub Security Advisory standard | Defines vulnerability reporting procedures, supported versions table, and response SLAs. |
| `SUPPORT.md` | Root or `.github/` | GitHub Support standard | Directs users to discussion forums, documentation hubs, and issue trackers. |
| `CHANGELOG.md` | Root | Keep a Changelog v1.1.0 & SemVer | Documents user-facing changes grouped by version and category. |
| `GOVERNANCE.md` | Root or `.github/` | Open Source Governance Model | Describes decision-making models, maintainer roles, and project leadership. |

---

## 2. File Specifications & Templates

### A. `CODE_OF_CONDUCT.md`
- MUST adopt Contributor Covenant v2.1.
- MUST designate a valid security/governance contact email (`security@tupynambalucas.dev` or `conduct@tupynambalucas.dev`).
- MUST maintain zero emojis in headings or body text.

### B. `CONTRIBUTING.md`
- **Prerequisites**: Node.js/pnpm/Docker/k3d versions.
- **Branch Conventions**: `feat/<slug>`, `fix/<slug>`, `chore/<slug>` branching off `main`.
- **Commit Standards**: Mandatory cryptographic SSH commit signing (`git commit -S -m "..."`) and Conventional Commits v1.0.0.
- **Pull Request Process**: PR template compliance, passing CI checks, and review requirements.

### C. `SECURITY.md`
- **Supported Versions Matrix**:
  ```markdown
  ## Supported Versions
  | Version | Supported |
  | :--- | :--- |
  | 1.x.x | Yes |
  | < 1.0.0 | No |
  ```
- **Reporting Vulnerabilities**: Instructions to report via GitHub Security Advisories or encrypted email.
- **Commitment**: Response time acknowledgment window (typically 48 hours).

### D. `CHANGELOG.md`
- Conforms to Keep a Changelog v1.1.0:
  - Sections: `## [Unreleased]`, `## [X.Y.Z] - YYYY-MM-DD`.
  - Allowed subsections: `### Added`, `### Changed`, `### Deprecated`, `### Removed`, `### Fixed`, `### Security`.

---

## 3. Order of Precedence & Multi-Repo Fallback

GitHub evaluates community health files in the following order:
1. `.github/` directory within the target repository.
2. Root directory of the target repository.
3. Centralized organization repository named `.github` (which provides fallback defaults for any repo lacking a local file).

When auditing a repository:
- Check whether the repository overrides the organization default or inherits it from `org-core/.github`.
- If an override is required (e.g., custom `SECURITY.md` for platform infrastructure), author it locally using these templates.
