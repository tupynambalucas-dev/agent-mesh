---
name: plan-architect
description: Authors, structures, and audits master architectural plans and execution blueprints inside .agents/plans/<plan-slug>/ for both single-artifact plans and multi-artifact suites following the enterprise standard.
---

# Architectural Plan & Blueprint Architect

This skill guides the design, structuring, authoring, and auditing of master architectural plans and execution blueprints across the `tupynambalucas-dev` organization.

---

## 1. Plan Storage & Directory Anatomy

All architectural plans, master plans, and implementation blueprints must reside strictly within:

```plaintext
<repo-root>/.agents/plans/<plan-slug>/
```

### Constraints & Invariants:
- **Slug Taxonomy**: `<plan-slug>` must be kebab-case (e.g. `github-app-architecture`, `cortex-gateway-migration`, `omnichannel-guided-flow`).
- **Layer 4+ Context Anti-Proliferation**: Planning containers (`.agents/plans/`) MUST NOT declare child `AGENTS.md` context routers. The parent repository or subsystem context router governs the entire repository.
- **Git Ignore & Search Visibility**: All plan directories must be ignored by `.gitignore` to prevent working blueprints from cluttering Git history, while being explicitly un-ignored in `.ignore` and `.rgignore` (`!.agents/plans/`, `!.agents/plans/**`) so developers and AI agents can seamlessly attach plan files via `@`.

---

## 2. Plan Topologies: Single-Artifact vs Multi-Artifact Suite

Choose the plan topology based on scope and architectural depth:

| Topology | Best For | Typical Structure |
| :--- | :--- | :--- |
| **Single-Artifact Plan** | Atomic features, single-subsystem refactors, self-contained runbooks | `.agents/plans/<plan-slug>/README.md` (or `<plan-slug>.md`) |
| **Multi-Artifact Plan Suite** | Multi-subsystem architectures, enterprise governance frameworks, complex workflows | `.agents/plans/<plan-slug>/README.md` + modular child documents |

---

## 3. Multi-Artifact Plan Suite Standard (The Gold Standard)

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

## 4. Single-Artifact Plan Template

For focused, atomic tasks, author a single document containing:

```markdown
# [Feature/Refactor Slug] Implementation Plan

## 1. Executive Summary & Problem Statement
Brief description of the objective, business value, and technical problem being solved.

## 2. Strategic Baseline & Architectural Decisions
Key technical constraints, package boundaries, and API contracts.

## 3. Architecture & Data Flow
\`\`\`mermaid
flowchart TD
    Client["Client Interface"] --> Service["Service Domain"]
\`\`\`

## 4. Phased Implementation Roadmap
- [ ] **Phase 1**: Foundational schemas, types, and database models.
- [ ] **Phase 2**: Core business logic and service workflows.
- [ ] **Phase 3**: Client interfaces, API routes, and testing.

## 5. Verification & Acceptance Testing Runbook
Step-by-step verification commands, test assertions, and expected outputs.

## 6. Navigation
- [Repository Root](../../README.md)
```

---

## 5. Quality Checklist for Plans

Before finalizing an architectural plan:
- [ ] Master plan starts with clear Strategic Decisions and Architecture Baseline.
- [ ] At least one Mermaid topology diagram (`flowchart TD` or `sequenceDiagram`) is included.
- [ ] Document suite catalog table indexes every modular child document with `#`, link, focus, and audience.
- [ ] Step-by-step execution roadmap contains phased checkboxes.
- [ ] Zero-Emoji Policy is strictly maintained across all headings, tables, and notes.
- [ ] All file paths in markdown links point to existing files on disk.
- [ ] Plan container does not declare a child `AGENTS.md` context router.
