---
name: plan-architect
description: Designs, authors, updates, validates, and manages the full lifecycle of structured architectural plan suites inside <target-repo>/.agents/plans/{pending,completed,superseded}/<plan-slug>/ in pt-BR, enforcing ordered technical modules, living roadmap.md updates, manual-actions.md runbooks, post-execution report.md generation, and Dual-Storage synchronization. Use whenever creating, executing, auditing, updating roadmaps, finalizing, or archiving architectural plans, analyses, or execution reports.
---

# Architectural Plan & Lifecycle Architect (`plan-architect`)

Governs the Spec-Driven Development (SDD) planning lifecycle across all sovereign repositories, enforcing deterministic folder-suite anatomy, Brazilian Portuguese (`pt-BR`) plan authoring, incremental `roadmap.md` tracking, manual-action separation, post-execution reporting, and Dual-Storage parity.

---

## 1. Mandatory 3-State Lifecycle Directory Taxonomy

Every repository MUST organize `.agents/plans/` into three strict lifecycle containers. Loose files directly under `.agents/plans/` and root `<target-repo>/plans/` directories are strictly prohibited:

```text
<target-repo>/.agents/plans/
├── pending/                      # ALL newly created or actively executing plan suites
│   └── <plan-slug>/
├── completed/                    # Fully executed plans (MUST contain report.md before moving here)
│   └── <plan-slug>/
└── superseded/                   # Obsolete, abandoned, or consolidated plans kept for historical lineage
    └── <plan-slug>/
```

### Target Repository Resolution (Multi-Root Workspaces)
- Always resolve the **specific sovereign child repository** (`<target-repo>`) that owns the implementation (for example, `foundation/.agents/plans/pending/<slug>/` for identity/portal/broker work, `agent-mesh/.agents/plans/pending/<slug>/` for plugins/MCPs, `platform/.agents/plans/pending/<slug>/` for platform services).
- Use `org/.agents/plans/pending/<slug>/` ONLY when a plan governs cross-repository meta-orchestration itself (`mani.yaml`, multi-root workspaces, `.gitconfig`).
- Create `<target-repo>/.agents/plans/pending/` automatically if it does not yet exist.

---

## 2. Mandatory Folder-Suite Anatomy (`pending/<plan-slug>/`)

Every architectural plan MUST be authored as a **modular folder suite** (`kebab-case` slug) — never a monolithic loose file — containing ordered execution modules:

```text
<target-repo>/.agents/plans/pending/<plan-slug>/
├── README.md                     # Mandatory: Master blueprint, baseline, Mermaid diagrams, suite catalog
├── 01-<domain-or-audit>.md       # Mandatory: Ordered technical specifications in execution sequence
├── 02-<architecture-module>.md   # Modular domain specs (02, 03, ... as needed by complexity)
├── manual-actions.md             # Mandatory: Explicit human-in-the-loop UI, OAuth, dashboard & vault steps
├── roadmap.md                    # Mandatory: Living phased checklist (- [ ] / - [x]) updated after EVERY step
└── report.md                     # Mandatory upon completion: Forensic verification report created BEFORE moving to completed/
```

### Core Content Invariants
1. **Language Mandate (`pt-BR`)**: All plan artifacts inside `.agents/plans/` (`README.md`, `01-*.md`, `roadmap.md`, `manual-actions.md`, `report.md`) MUST be written strictly in **Brazilian Portuguese (`pt-BR`)**. Code blocks, CLI commands, API paths, and identifiers remain in their exact technical notation.
2. **Six Elements of Spec-Driven Quality**: Every plan suite MUST explicitly capture: (1) target outcomes, (2) in-scope and explicit out-of-scope boundaries, (3) constraints and assumptions, (4) architectural decisions already ratified, (5) ordered phased task breakdown in `roadmap.md`, and (6) executable verification criteria.
3. **Zero-Emoji & Relative-Link Policy**: Strictly zero Unicode emojis anywhere. All intra-repository links MUST use relative forward-slash paths (`./`, `../`); `file:///` links are strictly prohibited inside repository files.
4. **Dual-Storage Invariant**: Every file created or updated inside `<target-repo>/.agents/plans/{pending,completed}/<plan-slug>/` MUST be mirrored identically (byte-for-byte SHA-256 parity) in the active session brain directory (`<appDataDir>/brain/<conversation-id>/<plan-slug>/`).
5. **Layer 4+ Anti-Proliferation & Ignore Triad**: NEVER create `AGENTS.md` inside `.agents/plans/` or any subfolder. Ensure `<target-repo>` ignores `.agents/plans/` in `.gitignore` while un-ignoring `!.agents/plans/` and `!.agents/plans/**` in `.ignore` and `.rgignore`.

---

## 3. Conditional Operational Workflows

Select the exact workflow matching the current phase of work. For full state-transition rules and edge cases, read [references/lifecycle-state-machine.md](references/lifecycle-state-machine.md).

### Workflow A: Creating a New Architectural Plan
1. Resolve `<target-repo>` and verify existing plans in `<target-repo>/.agents/plans/pending/` so duplicate suites are not created.
2. Read [references/suite-templates.md](references/suite-templates.md) for the exact `pt-BR` templates (`README.md`, `01-*.md`, `manual-actions.md`, `roadmap.md`).
3. Create `<target-repo>/.agents/plans/pending/<plan-slug>/` with:
   - `README.md` (baseline, Mermaid topology/sequence diagrams, Document Suite Catalog table, navigation).
   - Ordered technical modules (`01-*.md`, `02-*.md`, ...) strictly in execution order.
   - `manual-actions.md` detailing every manual UI/dashboard/secret step the user must perform (or explicitly declaring `"Nenhuma acao manual necessaria neste plano"` when 100% automated).
   - `roadmap.md` with phased checkboxes (`- [ ]`) and an explicit progress log table.
4. Mirror the entire folder identically to `<appDataDir>/brain/<conversation-id>/<plan-slug>/`.
5. Run the deterministic validator:
   ```bash
   node scripts/validate-plan.cjs "<target-repo>/.agents/plans/pending/<plan-slug>" --brain "<appDataDir>/brain/<conversation-id>/<plan-slug>"
   ```

### Workflow B: Incremental Execution, Living `roadmap.md` & Checkpoint `report.md`
Whenever executing any phase or partial subset of a plan inside `pending/<plan-slug>/`:
1. Read `roadmap.md` and the active numbered module (`0N-*.md`) before writing code.
2. Execute the scoped tasks and verify with real builds/tests/API checks.
3. **Mandatory Step-End Update**: Before concluding the turn (especially when not all phases are completed in one turn), update `roadmap.md`:
   - Flip completed items from `- [ ]` to `- [x]` with commit SHA, PR number, or verification note.
   - Append a dated row to the **Registro Incremental de Execucao** table recording what was finished and what remains next.
4. **Living Technical `report.md` on Manual Handoff**: Whenever all automated engineering phases complete and execution pauses for human-in-the-loop `manual-actions.md` steps, author or update a **robust living `report.md`** inside `pending/<plan-slug>/report.md` explaining in technical depth every currently implemented capability, architecture/endpoints/contracts, PRs, CI/CodeQL evidence, and remaining manual actions.
5. Sync updated `roadmap.md` and `report.md` to Dual-Storage Brain.

### Workflow C: Finalizing a Plan (Robust `report.md` -> `completed/`)
Once all phases in `roadmap.md` are marked `[x]` and verified:
1. Author or finalize a **robust, deep technical `report.md`** inside `pending/<plan-slug>/` using the `pt-BR` template in [references/suite-templates.md](references/suite-templates.md) — NEVER a thin summary. It MUST document: (1) executive verdict & active architecture Mermaid diagram, (2) deep subsystem-by-subsystem explanation of all implemented capabilities (endpoints, bindings, security controls, contracts, operational flows), (3) PR/commit/CI/CodeQL matrix, (4) forensic terminal/test evidence, (5) engineering decisions, deviations & lessons learned, and (6) formal closure sign-off.
2. Move the entire folder from `<target-repo>/.agents/plans/pending/<plan-slug>/` to `<target-repo>/.agents/plans/completed/<plan-slug>/`.
3. Mirror `report.md` and updated `roadmap.md` to Dual-Storage Brain and validate:
   ```bash
   node scripts/validate-plan.cjs "<target-repo>/.agents/plans/completed/<plan-slug>" --state completed
   ```

### Workflow D: Superseding or Consolidating Obsolete Plans (`superseded/`)
When a plan becomes obsolete, abandoned, or consolidated into a newer suite:
1. Move the legacy file or folder into `<target-repo>/.agents/plans/superseded/`.
2. Record its lineage inside the **Linhagem de Planos Substituidos** table of the replacing suite's `README.md` or `01-*.md`.

---

## 4. Reference Material & Validation Scripts (On-Demand)

- **Authoritative `pt-BR` Templates**: Read [references/suite-templates.md](references/suite-templates.md) for canonical skeletons of `README.md`, numbered modules (`01-*.md`), `manual-actions.md`, `roadmap.md`, and `report.md`.
- **Lifecycle Rules & Edge Cases**: Read [references/lifecycle-state-machine.md](references/lifecycle-state-machine.md) for multi-session handoffs, consolidation procedures, and Dual-Storage synchronization rules.
- **Deterministic Validator**: Run `node scripts/validate-plan.cjs <plan-dir> [--state pending|completed|superseded] [--brain <brain-dir>]` to verify lifecycle placement, required suite files, zero emojis, relative links, Layer 4+ compliance, and Dual-Storage SHA-256 parity.
