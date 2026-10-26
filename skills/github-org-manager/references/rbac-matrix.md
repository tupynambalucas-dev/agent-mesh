# Organization RBAC Matrix and Role Specifications

This document defines the Role-Based Access Control (RBAC) matrix for the `tupynambalucas-dev`
organization and monorepo repositories.

---

## 1. Functional Teams & Granular Roles

Access to repositories and services within the organization is managed through functional teams
rather than direct user bindings.

| Team Slug           | Description                                                    | Typical Role    | Primary Repositories & Workspaces       |
| :------------------ | :------------------------------------------------------------- | :-------------- | :-------------------------------------- |
| `lead-architects`   | Technical leads, system architects, and global code owners     | Admin / Maintain| Global CODEOWNERS, `org-core`, all repos|
| `security-managers` | Security operations, compliance, vulnerability auditing       | Audit / Read    | All organization repositories (read/sec)|
| `infra-ops`         | Platform and DevOps engineers managing infrastructure and CI/CD| Maintain        | `platform`, `.github`, `org-core`       |
| `core-engineers`    | Core software engineers and application developers             | Write           | `agent-mesh`, `platform`, `tessel`   |
| `technical-writers` | Technical writers, documentation maintainers, content curators | Maintain / Read | `docs` (maintain), other repos (read)   |
| `creative-team`     | Designers and creative professionals managing brand assets     | Write / Read    | `docs` (write), `.github` (write)       |
| `contractors`       | External contractors, specialized consultants, and partners   | Write (scoped)  | Delegated repositories only (on demand) |

---

## 2. Organization Repository Access Matrix

The current active access matrix across organization repositories is enforced as follows:

| Repository        | `lead-architects` | `security-managers` | `infra-ops` | `core-engineers` | `technical-writers` | `creative-team` | `contractors` |
| :---------------- | :---------------: | :-----------------: | :---------: | :--------------: | :-----------------: | :-------------: | :-----------: |
| `org-core`        | `admin`           | `pull`              | `maintain`  | `push`           | `pull`              | `pull`          | None          |
| `agent-mesh`      | `maintain`        | `pull`              | `maintain`  | `push`           | `pull`              | `pull`          | Delegated     |
| `platform`        | `maintain`        | `pull`              | `maintain`  | `push`           | `pull`              | `pull`          | None          |
| `docs`            | `maintain`        | `pull`              | `pull`      | `push`           | `maintain`          | `push`          | Delegated     |
| `.github`         | `maintain`        | `pull`              | `maintain`  | `push`           | `pull`              | `push`          | None          |
| `tessel`          | `maintain`        | `pull`              | `pull`      | `push`           | `pull`              | `pull`          | None          |

---

## 3. Organization Fine-Grained PAT Permissions

When configuring a Fine-Grained Personal Access Token (PAT) for the organization, assign the
following scopes:

### Repository Permissions (`tupynambalucas-dev/*`)

- **Administration**: `Read & Write`
- **Metadata**: `Read-only`
- **Contents**: `Read & Write`
- **Pull Requests**: `Read & Write`
- **Issues**: `Read & Write`
- **Actions**: `Read & Write`
- **Secrets**: `Read & Write`
- **Custom Properties**: `Read & Write`
- **Security Events**: `Read-only`

### Organization Permissions (`@tupynambalucas-dev`)

- **Members**: `Read & Write`
- **Secrets**: `Read & Write`
- **Administration**: `Read-only`
