---
name: github-repo-architect
description: Audits, scaffolds, and standardizes repository infrastructure, CODEOWNERS, dependabot.yml, release.yml, branch and tag protection rulesets, environments, and labels.
---

# GitHub Repository Architect

Governs local repository infrastructure, code ownership policies, dependency update configurations, automated release note categories, environments, and repository-level protection rulesets.

---

## 1. When to Use

Activate this skill when:
- Creating, auditing, or standardizing `.github/CODEOWNERS` in a repository.
- Configuring `.github/dependabot.yml` for automated dependency updates.
- Configuring `.github/release.yml` for automatic GitHub Release note categorization.
- Establishing repository environments (`production`, `staging`, `development`) and reviewer policies.
- Defining or auditing branch and tag protection rulesets (`enterprise-release-tags`).
- Standardizing repository issue/PR labels and topics.

---

## 2. Operational Workflows

### Workflow A: CODEOWNERS Scaffolding
Every repository must declare code ownership:
```ini
# Global owners for all files in this repository
* @tupynambalucas-dev/core-maintainers

# Security critical configurations
/.github/workflows/ @tupynambalucas-dev/core-maintainers
```

### Workflow B: dependabot.yml Scaffolding
```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      github-actions:
        patterns:
          - "*"

  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      dependencies:
        patterns:
          - "*"
```

### Workflow C: release.yml Category Configuration
```yaml
changelog:
  categories:
    - title: "Features & Capabilities"
      labels:
        - "feature"
        - "enhancement"
    - title: "Bug Fixes & Corrections"
      labels:
        - "fix"
        - "bug"
    - title: "Security & Vulnerability Patches"
      labels:
        - "security"
    - title: "Performance Optimizations"
      labels:
        - "performance"
    - title: "Documentation & Specifications"
      labels:
        - "documentation"
```
