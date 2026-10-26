---
name: github-security-auditor
description: Interrogates GitHub Security APIs (Secret Scanning, Dependabot, Code Scanning) leveraging GitHub App installation credentials.
---

# GitHub Security Auditor Skill

Use this skill to audit, triage, and remediate security alerts across organization repositories. Operates using GitHub App machine identities to bypass Personal Access Token HTTP 403 restrictions on security endpoints.

## Activation Triggers

Activate this skill when:
- Triaging Dependabot vulnerability alerts.
- Inspecting secret scanning alerts and leaked token incidents.
- Reviewing CodeQL and static analysis code scanning alerts.
- Conducting an organization-wide security posture audit.

## Operational Guidelines

1. Never log or output secret alert values in plaintext.
2. Cross-reference CVE and GHSA identifiers against official security advisories.
3. Prioritize Critical and High severity vulnerabilities.
4. Report remediation steps: bump dependency, revoke exposed credentials, and trigger fresh CI scans.
