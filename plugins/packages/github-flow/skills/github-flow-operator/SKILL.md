---
name: github-flow-operator
description: Guides and assists developers with Git workflows, branch conventions, Conventional Commits, Pull Request creation, and GitHub CLI operations.
---

# GitHub Flow Coach

Assists engineering, writing, and creative teams with standard Git branching, Conventional Commits formatting, SSH commit signing, Pull Request workflows, and GitHub CLI operations.

---

## 1. When to Use

Activate this skill when:
- Authoring or validating commit messages against the Conventional Commits v1.0.0 specification.
- Preparing, creating, and reviewing Pull Requests via GitHub CLI (`gh`).
- Resolving Git branch divergences, managing submodule pointer bumps in `org-core`, or staging changes.
- Verifying SSH cryptographic signature configurations.

---

## 2. Operational Workflows

### Workflow A: Preparing and Creating a Conventional Commit
1. Verify working directory status:
   ```bash
   git status
   ```
2. Validate commit message against [Conventional Commits](./references/conventional-commits.md):
   - Format: `<type>(<scope>): <description>`
   - Constraint: Zero emojis, imperative verb, under 72 chars.
3. Commit with cryptographic SSH signing:
   ```bash
   git commit -S -m "<type>(<scope>): <description>"
   ```

### Workflow B: Opening a Pull Request via GitHub CLI
1. Push branch to remote:
   ```bash
   git push -u origin <branch-name>
   ```
2. Create PR targeting `develop` (or target branch):
   ```bash
   gh pr create --base develop --title "<type>(<scope>): <description>"
   ```
3. Monitor PR status:
   ```bash
   gh pr status
   gh pr checks
   ```

### Workflow C: Submodule Pointer Updates in `org-core`
When updating submodule pointers:
1. Verify clean status in submodules.
2. Stage modified submodule pointers:
   ```bash
   git add agent-mesh platform docs .github
   git commit -S -m "chore(submodules): bump pointers to latest development heads"
   git push origin main
   ```

---

## 3. Best Practices

- Always ensure SSH signing is configured: `git config user.signingkey` and `git config commit.gpgsign true`.
- Never bypass branch rulesets; all code reviews and automated checks must pass before merging.
- Consult [GitHub Developer Workflow Rules](../../rules/AGENTS.md) for organization policies.
