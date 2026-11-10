---
name: plan-architect
description: Authors, structures, and audits master architectural plans and execution blueprints inside .agents/plans/<plan-slug>/ for both single-artifact plans and multi-artifact suites following the enterprise standard.
---

# Architectural Plan & Blueprint Architect

This skill guides the design, structuring, authoring, and auditing of master architectural plans and execution blueprints across the `tupynambalucas-dev` organization.

---

## 1. Plan Storage & Dual-Storage Invariant

All architectural plans, master plans, and implementation blueprints must reside strictly within:

```plaintext
<repo-root>/.agents/plans/<plan-slug>/
```

### The Dual-Storage Invariant for Artifacts:
Whenever an agent creates or updates an architectural plan, design blueprint, or specification artifact:
1. **Internal Session Artifact**: The agent may write the artifact to the Antigravity conversation directory (`<appDataDir>/brain/<conversation-id>/`).
2. **Repository Mirror (Mandatory)**: An identical, synchronized copy MUST ALWAYS be authored directly in the target repository's planning container at `<repo-root>/.agents/plans/<plan-slug>/` (or `<repo-root>/plans/<plan-slug>/`).
3. **Rationale**: This guarantees that architectural artifacts are permanently persisted within the codebase, accessible across different developer sessions, fully resolvable offline, and immediately available for `@` mention context resolution.

### The Universal Ignore & Indexing Standard:
Every repository across the organization MUST declare the ignore-and-index triad:
- **`.gitignore`**: Ignores `.agents/plans/` and `plans/` so working blueprints never pollute Git history or trigger dirty working tree states in production.
- **`.ignore`**: Declares negative negation rules (`!.agents/plans/`, `!.agents/plans/**`, `!plans/`, `!plans/**`).
- **`.rgignore`**: Declares identical negative negation rules (`!.agents/plans/`, `!.agents/plans/**`, `!plans/`, `!plans/**`).
- **`.vscode/settings.json`**: Sets `"search.useIgnoreFiles": false` so IDE and CLI search engines index plan files for `@` mentions.

### Additional Constraints:
- **Slug Taxonomy**: `<plan-slug>` must be kebab-case (e.g. `github-app-architecture`, `cortex-gateway-migration`, `omnichannel-guided-flow`).
- **Layer 4+ Context Anti-Proliferation**: Planning containers (`.agents/plans/`) MUST NOT declare child `AGENTS.md` context routers. The parent repository or subsystem context router governs the entire repository.

---

## 2. Two Canonical Plan Topologies

Plans must be authored in one of two distinct structural topologies:

| Topology | Best For | Directory & File Anatomy |
| :--- | :--- | :--- |
| **Topology 1: Single-File Plan** | Atomic features, single-domain refactors, self-contained runbooks | `<repo>/.agents/plans/<plan-slug>/README.md` (or `<plan-slug>.md`) |
| **Topology 2: Multi-Artifact Plan Suite** | Multi-subsystem architectures, enterprise governance frameworks, complex workflows | `<repo>/.agents/plans/<plan-slug>/` with Master `README.md` + numbered domain documents |

---

## 3. Topology 2: Multi-Artifact Plan Suite Standard (The Gold Standard)

Multi-artifact plan suites follow the enterprise architecture exemplified by `.github/.agents/plans/github-app-architecture/`:

```plaintext
.agents/plans/<plan-slug>/
├── README.md                                             # Master Plan, Strategic Baseline & Document Suite Catalog
├── 01-core-fundamentals-and-webhooks.md                  # Core principles, protocols, taxonomy, and comparison matrix
├── 02-topology-and-permissions-catalog.md                # Multi-tier topology, models, exhaustive permissions matrix
├── setup-<component-a>.md                                # Step-by-step manual/automated configuration runbook
├── setup-<component-b>.md                                # Step-by-step manual/automated configuration runbook
├── secrets-governance-and-workflows.md                   # Secret generation, Infisical vault storage, and CI injection
├── ci-cd-workflow-integration-and-runner-architecture.md # Actions triggers, expressions, and runner security
└── execution-checklist-and-roadmap.md                    # Phased execution checklist and milestones
```

### Master `README.md` Template for Plan Suites:

```markdown
# [Domain] Enterprise Identity & Architecture Suite

Master architectural plan, operational framework, and execution suite for [System/Domain] across the tupynambalucas-dev organization.

---

## 1. Strategic Decisions & Architecture Baseline

- **Decision 1**: Architectural rationale and trade-offs.
- **Decision 2**: Security model, least privilege, and separation of duties.
- **Decision 3**: Integration patterns and lifecycle guarantees.

---

## 2. Architecture & Topology

\`\`\`mermaid
flowchart TD
    subgraph Tier1 ["Domain A"]
        NodeA["Component A"]
    end
    subgraph Tier2 ["Domain B"]
        NodeB["Component B"]
    end
    NodeA --> NodeB
\`\`\`

---

## 3. Defense-in-Depth / Lifecycle Execution Model

\`\`\`mermaid
flowchart TD
    Step1["Step 1"] --> Step2["Step 2"]
\`\`\`

---

## 4. Document Suite Catalog

| # | Document | Primary Focus | Key Audience / Consumers |
| :-: | :--- | :--- | :--- |
| **01** | [Core Fundamentals & Protocols](./01-core-fundamentals-and-webhooks.md) | Architectural modes, token types, and foundational invariants. | Architects, Security Engineers |
| **02** | [Topology & Permissions Catalog](./02-topology-and-permissions-catalog.md) | Multi-tier topology, role segregation, and permissions matrix. | Lead Architects, Security Auditors |
| **03** | [Setup Runbook: Component A](./setup-component-a.md) | Step-by-step setup guide with explicit field values. | System Administrators, Operators |
| **04** | [Secrets Governance & Workflows](./secrets-governance-and-workflows.md) | Key generation, Infisical Cloud Vault storage, and secret hygiene. | DevOps, SecOps |
| **05** | [Actionable Execution Checklist & Roadmap](./execution-checklist-and-roadmap.md) | Phased step-by-step checklist with verification criteria. | Implementation Leads, Reviewers |

---

## 5. Navigation

- [Parent Architectural Plans Index](../README.md)
- [Repository Root](../../README.md)
- [Enterprise Agent Mesh Context Router](../../agent-mesh/AGENTS.md)
```

---

## 4. Topology 1: Single-File Plan Standard

For focused, atomic features or isolated domain tasks, author a single document (`.agents/plans/<plan-slug>/README.md` or `.agents/plans/<plan-slug>.md`):

```markdown
# [Feature/Refactor Slug] Implementation Plan

Master implementation blueprint and technical specification for [Feature Name] in [Target Repository].

---

## 1. Executive Summary & Problem Statement
Brief description of the objective, business value, technical problem, and desired end state.

---

## 2. Strategic Baseline & Architectural Decisions
- **Decision 1**: Architectural rationale, chosen pattern, and trade-offs.
- **Decision 2**: Security considerations, least privilege, and secret hygiene.
- **Decision 3**: Integration boundaries and API contracts.

---

## 3. Architecture & Data Flow
\`\`\`mermaid
flowchart TD
    Client["Client Interface"] --> Controller["Domain Controller"]
    Controller --> Service["Core Workflow Engine"]
    Service --> Storage["Persistent Storage"]
\`\`\`

---

## 4. Phased Implementation Roadmap
- [ ] **Phase 1: Schemas & Types**: Foundational schemas, TypeScript types, and database models.
- [ ] **Phase 2: Core Domain Logic**: Service layer, state machines, and business rules.
- [ ] **Phase 3: Integration & Testing**: API routes, CLI commands, and automated test suites.
- [ ] **Phase 4: Documentation & Verification**: Workspace configuration, ignore rules, and runbook tests.

---

## 5. Verification & Acceptance Testing Runbook
Step-by-step verification commands, assertion criteria, and expected terminal outputs.

```bash
# Execute verification test suite
pnpm test

# Verify type contracts
pnpm typecheck
```

---

## 6. Navigation
- [Repository Root](../../README.md)
- [Parent Plans Index](../README.md)
```

---

## 5. Quality Checklist & Verification for Plans

Before finalizing any architectural plan:
- [ ] **Dual-Storage Invariant**: An identical copy is persisted at `<repo-root>/.agents/plans/<plan-slug>/`.
- [ ] **Universal Ignore & Indexing**: The repository maintains `.gitignore`, `.ignore`, and `.rgignore` for plans.
- [ ] **Topology Alignment**: Correctly chosen between Topology 1 (Single-File) and Topology 2 (Multi-Artifact Suite).
- [ ] **Strategic Baseline**: Plan starts with clear Strategic Decisions and Architecture Baseline.
- [ ] **Mermaid Visualizations**: Includes at least one Mermaid topology diagram (`flowchart TD` or `sequenceDiagram`).
- [ ] **Document Suite Catalog**: Multi-artifact plans contain a structured catalog table indexing all child documents.
- [ ] **Phased Roadmap**: Implementation roadmap contains explicit phased checkboxes (`- [ ]`).
- [ ] **Zero-Emoji Policy**: Strictly zero emojis across all headings, tables, code blocks, and body text.
- [ ] **Link Integrity**: All relative markdown links point to existing files on disk.
- [ ] **Layer 4+ Anti-Proliferation**: The plan container does NOT declare a child `AGENTS.md` context router.
