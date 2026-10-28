# GitHub CLI (`gh`) Developer Cheatsheet

Quick operational reference for developers and agents interacting with GitHub via `gh`.

---

## 1. Authentication and Status

```bash
# Verify authentication status
gh auth status

# Refresh or switch active account
gh auth refresh -s read:org,repo
```

---

## 2. Pull Requests

```bash
# Create a pull request targeting develop
gh pr create --base develop --title "feat(scope): concise description" --body-file .github/PULL_REQUEST_TEMPLATE.md

# View status of PRs relevant to current branch
gh pr status

# View checks and CI run status on a PR
gh pr checks <pr-number>

# Checkout a pull request locally
gh pr checkout <pr-number>

# Review and approve a PR
gh pr review <pr-number> --approve --body "LGTM. Verification checks pass."
```

---

## 3. Issues and Discussions

```bash
# List open issues assigned to you
gh issue list --assignee @me

# View issue details
gh issue view <issue-number>

# Create an issue
gh issue create --title "fix(mcp): handle unhandled rejection on socket close" --body "Details..."
```

---

## 4. Repository Operations

```bash
# Clone a repository with SSH
gh repo clone tupynambalucas-dev/<repo-name>

# View repository details
gh repo view tupynambalucas-dev/<repo-name>
```
