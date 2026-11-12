---
name: mani-operator
description: Orchestrates multi-repository workspaces, executes batch tasks across managed projects, maintains declarative mani.yaml manifests, handles selective tag filtering, and enforces multi-repo workspace hygiene.
---

# Mani Multi-Repository Operator

This skill provides comprehensive operational runbooks and standards for managing multi-repository workspaces using the [Mani CLI](https://manicli.com) (`mani`) across any multi-repository environment, with production reference configurations from the `tupynambalucas-dev` organization (`org-core`, `org-ecosystem`).

---

## 1. Overview and Core Philosophy

In our architecture, meta-repositories (such as `org-core`, `org-ecosystem`, or any multi-repo workspace) use **Mani** rather than Git submodules (`160000` gitlinks) or monolithic monorepos. This provides:
- **Independent Git Histories**: Each repository maintains sovereign branches, commits, tags, and PR lifecycles.
- **Unified Workspace Experience**: Developers and AI agents can execute cross-cutting batch queries, status checks, and branch operations from a single terminal or IDE workspace.
- **Selective Tag Targeting**: Workflows can target subsets of repositories (e.g. `commercial`, `internal`, `core`, `governance`) without checking out unneeded code.

---

## 2. Declarative Manifest Specification (`mani.yaml`)

Every meta-repository must maintain a declarative `mani.yaml` file at its root.

```yaml
# Manifest specification: https://manicli.com
sync_gitignore: false

projects:
  project-slug:
    path: relative/path/to/project
    url: git@github.com:<org>/project-slug.git
    desc: Brief functional description of the repository and its role.
    tags:
      - category-tag
      - technology-tag

targets:
  all:
    all: true
  core:
    tags: [core]
  commercial:
    tags: [commercial]
  internal:
    tags: [internal]
  oss:
    tags: [oss]

tasks:
  status:
    desc: Check Git status across all projects
    target: all
    cmd: git status -s
    spec:
      output: stream

  fetch:
    desc: Fetch latest changes from remote origin across all projects
    target: all
    cmd: git fetch origin --prune
    spec:
      output: stream

  pull:
    desc: Pull latest main branch updates across all projects
    target: all
    cmd: git pull origin main
    spec:
      output: stream

  branch:
    desc: Display current active branch for all projects
    target: all
    cmd: git branch --show-current
    spec:
      output: table
```

### Critical Configuration Invariant: `sync_gitignore: false`

> [!IMPORTANT]
> The top-level `sync_gitignore` field MUST always be set to `false`.
> If `sync_gitignore` is omitted or `true`, Mani will automatically re-generate `.gitignore` on every `sync`, wiping out operational ignore rules, `.env` protections, and `.ignore` / `.rgignore` complements.

---

## 3. Essential Command Workflows

### Project Synchronization

```bash
# Clone and synchronize all missing repositories
mani sync

# Synchronize projects in parallel (up to 4 concurrent processes)
mani sync --parallel

# Synchronize only a specific subset by tag
mani sync --tags commercial
mani sync --tags internal

# Check sync status without modifying filesystem
mani sync --status
```

### Batch Task Execution

```bash
# Check git status across all managed repositories
mani run status

# Fetch origin and prune stale references across all projects
mani run fetch

# Fast-forward pull main across all repositories
mani run pull

# Display table of active branches across all projects
mani run branch

# Execute tasks on specific project or target
mani run status --projects agent-mesh
mani run pull --target commercial
```

### Ad-hoc Arbitrary Command Execution (`mani exec`)

```bash
# Run an arbitrary shell command across all projects
mani exec --all 'git log -1 --oneline'

# Run a build check across projects with a specific tag
mani exec --tags monorepo 'pnpm run build'

# Run in parallel with concurrency limit
mani exec --all --parallel --forks 8 'git fetch origin'
```

### Manifest Discovery and Validation

```bash
# Validate mani.yaml syntax and project paths
mani check

# List all configured projects, tags, and paths
mani list projects
mani list tags
mani list tasks

# Describe project details
mani describe projects
```

---

## 4. Multi-Root IDE Integration Standard

Meta-repositories must pair `mani.yaml` with a multi-root workspace file (`<repo>.code-workspace`) and `.vscode/settings.json`:

1. **Workspace Folders**: Explicitly bind root and each managed repository child path.
2. **VS Code Tasks**: Declare tasks matching the primary Mani workflows (`Mani: Sync Repositories`, `Mani: Check Git Status`, `Mani: Pull All Main`).
3. **Ignore Decoupling**: Combine `.gitignore` (ignoring child project paths from the meta-repo's Git tracking) with `.ignore` and `.rgignore` (un-ignoring them via `!path/` and `!path/**` for Antigravity `@` mention indexing and ripgrep text search).

---

## 5. Troubleshooting & Error Recovery

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| `.gitignore` unexpectedly modified after `mani sync` | `sync_gitignore: true` or default | Set `sync_gitignore: false` in `mani.yaml` and commit change. |
| Project path not found in `mani run` | Project not cloned locally | Execute `mani sync` or `mani sync --tags <tag>` to clone repository. |
| Untracked files reported by meta-repo Git | Project path not in meta-repo `.gitignore` | Add managed folder path to meta-repo `.gitignore` and add `!path/` to `.ignore` and `.rgignore`. |
| Search or `@` mention cannot find files in child project | Files excluded by search indexer | Verify `.ignore` and `.rgignore` declare `!path/` and `!path/**`. |
