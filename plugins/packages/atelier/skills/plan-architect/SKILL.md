---
name: plan-architect
description: Authors, structures, and audits master architectural plans, technical analyses, and governance/audit reports inside plans/<slug>/ (or .agents/plans/<slug>/) for both single-artifact documents and multi-artifact suites following the enterprise dual-storage standard.
---

# Architectural Plan, Analysis & Report Architect

This skill guides the design, structuring, authoring, and auditing of master architectural plans, technical analyses, and governance/audit reports across the `tupynambalucas-dev` organization.

---

## 1. Storage Location & Dual-Storage Invariant

All architectural plans, technical analyses, and governance reports must reside strictly within:

```plaintext
<workspace-root>/plans/<artifact-slug>/
# or for single-file artifacts:
<workspace-root>/plans/<artifact-slug>.md
# with full backward compatibility for:
<workspace-root>/.agents/plans/<artifact-slug>/
```

### The Three Artifact Classes:
1. **Architectural Plans & Implementation Blueprints**: Master plans, migration strategies, execution roadmaps, and multi-artifact suites.
2. **Architectural Analyses & Technical Deep-Dives**: Architectural trade-off reviews, RFC-style evaluations, protocol analyses, and library assessments.
3. **Governance, Audit & Verification Reports**: Compliance audits, refactoring reports, post-mortems, security assessments, and verification logs.

### The Dual-Storage Invariant for Artifacts:
Whenever an agent creates or updates an architectural plan, technical analysis, design blueprint, or report artifact:
1. **Internal Session Artifact**: The agent writes the artifact to the Antigravity conversation directory (`<appDataDir>/brain/<conversation-id>/`).
2. **Workspace Mirror (Mandatory)**: An identical, synchronized copy MUST ALWAYS be authored directly in the target workspace's planning container at `<workspace-root>/plans/<artifact-slug>/` (or `<workspace-root>/plans/<artifact-slug>.md`).
3. **Rationale**: This guarantees that architectural artifacts are permanently persisted within the codebase, accessible across different developer sessions, fully resolvable offline, and immediately available for `@` mention context resolution.

### The Universal Ignore & Indexing Standard:
Every repository across the organization MUST declare the ignore-and-index triad:
- **`.gitignore`**: Ignores `plans/` and `.agents/plans/` so working blueprints, analyses, and reports never pollute Git history or trigger dirty working tree states in production.
- **`.ignore`**: Declares negative negation rules (`!plans/`, `!plans/**`, `!.agents/plans/`, `!.agents/plans/**`).
- **`.rgignore`**: Declares identical negative negation rules (`!plans/`, `!plans/**`, `!.agents/plans/`, `!.agents/plans/**`).
- **`.vscode/settings.json`**: Sets `"search.useIgnoreFiles": false` so IDE and CLI search engines index plan files for `@` mentions.

### Additional Constraints:
- **Slug Taxonomy**: `<artifact-slug>` must be kebab-case (e.g. `github-app-architecture`, `cortex-gateway-migration`, `agent-mesh-refactoring-and-governance-report`).
- **Layer 4+ Context Anti-Proliferation**: Planning containers (`plans/`, `.agents/plans/`) MUST NOT declare child `AGENTS.md` context routers. The parent repository or subsystem context router governs the entire repository.

---

## 2. Canonical Topologies: Single-File vs Multi-Artifact Suite

Artifacts must be authored in one of two distinct structural topologies:

| Topology | Best For | Directory & File Anatomy |
| :--- | :--- | :--- |
| **Topology 1: Single-File Artifact** | Atomic features, single-domain analyses, refactoring reports, self-contained runbooks | `<workspace>/plans/<slug>.md` (or `<workspace>/plans/<slug>/README.md`) |
| **Topology 2: Multi-Artifact Suite** | Multi-subsystem architectures, enterprise governance frameworks, complex multi-domain workflows | `<workspace>/plans/<slug>/` with Master `README.md` + numbered domain documents |

---

## 3. Topology 2: Multi-Artifact Suite Standard (The Gold Standard)

Multi-artifact plan suites follow the enterprise architecture exemplified by `.github/.agents/plans/github-app-architecture/`:

```plaintext
plans/<plan-slug>/
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

- [Parent Plans Index](../README.md)
- [Repository Root](../../README.md)
- [Enterprise Agent Mesh Context Router](../../agent-mesh/AGENTS.md)
```

---

## 4. Topology 1: Single-File Artifact Templates

### Template 1A: Architectural Implementation Plan

For focused, atomic features or isolated domain refactors, author a single document (`plans/<plan-slug>.md` or `plans/<plan-slug>/README.md`):

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

### Template 1B: Technical Analysis & Architectural Deep-Dive

For evaluating architectural alternatives, trade-offs, performance benchmarks, or migration feasibility (`plans/<slug>-analysis.md`):

```markdown
# [Domain/Subsystem] Architectural Analysis & Technical Evaluation

Deep architectural evaluation, risk assessment, and technical trade-off matrix for [Domain/Subsystem].

---

## 1. Executive Overview & Problem Statement
Detailed context, architectural friction points, and evaluation motivation.

---

## 2. Architectural Comparison Matrix

| Dimension | Pattern A ([Option 1]) | Pattern B ([Option 2]) | Selected Approach |
| :--- | :--- | :--- | :--- |
| **Complexity** | Low | High | Pattern A |
| **Security / Isolation** | Isolated sandbox | Shared process | Pattern A |
| **Performance Overhead** | Minimal | Moderate | Pattern A |
| **Maintainability** | High | Low | Pattern A |

---

## 3. Structural Topology & Risk Assessment
\`\`\`mermaid
flowchart TD
    Current["Current State"] --> Transition["Refactoring Path"]
    Transition --> Target["Target Architecture"]
\`\`\`

---

## 4. Architectural Recommendations & Next Steps
- **Immediate Action 1**: Technical mitigation and baseline implementation.
- **Immediate Action 2**: Policy updates and automated rule enforcement.
```

### Template 1C: Governance, Audit & Verification Report

For documenting refactoring results, compliance audits, or security inspections (`plans/<slug>-report.md`):

```markdown
# [Domain/Subsystem] Governance & Refactoring Audit Report

Executive audit report and verification findings for [Domain/Subsystem].

---

## 1. Audit Scope & Baseline Objectives
Audit parameters, checked components, and organizational governance criteria.

---

## 2. Compliance & Verification Findings

| Component / File | Compliance Status | Rule Reference | Remediated Action |
| :--- | :--- | :--- | :--- |
| `component-a` | Compliant | Rule 1 | Verified zero drift |
| `component-b` | Remediated | Rule 7 | Scaffolding updated |

---

## 3. Terminal Runbook & Verification Evidence
Terminal outputs, status checks, and cryptographic verification logs.

---

## 4. Final Disposition & Sign-off
Summary of remediations and sign-off criteria.
```

---

## 5. Quality Checklist & Verification for Artifacts

Before finalizing any plan, analysis, or report artifact:
- [ ] **Dual-Storage Invariant**: An identical copy is persisted at `<workspace-root>/plans/<artifact-slug>/` (or `<workspace-root>/plans/<artifact-slug>.md`).
- [ ] **Universal Ignore & Indexing**: The workspace maintains `.gitignore`, `.ignore`, and `.rgignore` ignoring `plans/` while preserving `@` indexing.
- [ ] **Topology Alignment**: Correctly chosen between Topology 1 (Single-File) and Topology 2 (Multi-Artifact Suite).
- [ ] **Strategic Baseline**: Plan or analysis starts with clear Strategic Decisions and Architecture Baseline.
- [ ] **Mermaid Visualizations**: Includes at least one Mermaid topology diagram (`flowchart TD` or `sequenceDiagram`).
- [ ] **Document Suite Catalog**: Multi-artifact suites contain a structured catalog table indexing all child documents.
- [ ] **Phased Roadmap / Action Items**: Implementation plans contain explicit phased checkboxes (`- [ ]`).
- [ ] **Zero-Emoji Policy**: Strictly zero emojis across all headings, tables, code blocks, and body text.
- [ ] **Link Integrity**: All relative markdown links point to existing files on disk.
- [ ] **Layer 4+ Anti-Proliferation**: The plan container does NOT declare a child `AGENTS.md` context router.
