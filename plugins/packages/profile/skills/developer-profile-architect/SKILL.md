---
name: developer-profile-architect
description: Authors, structures, and audits developer GitHub profile READMEs (including special profile repositories <user>/<user> or profile), designing high-impact technical positioning, dynamic stats card layouts, deep systems engineering narratives, and automated document compilation pipelines.
---

# Developer Profile Architect

Specialized agent skill for authoring, auditing, and structuring elite GitHub profile READMEs that showcase senior engineering depth, systems architecture, and technical authority.

---

## 1. When to Use

Activate this skill when:
- Designing, authoring, or refactoring a GitHub special profile repository (`<user>/<user>` or `<user>/profile`, such as `tupynambalucas/tupynambalucas` or `user/profile`).
- Structuring an elite technical positioning narrative for senior, lead, staff, or principal engineers.
- Configuring dynamic GitHub profile cards, SVG templates, light/dark mode `<picture>` wrappers, or GraphQL metrics compilation pipelines.
- Articulating architectural competencies across distributed systems, cloud-native GitOps, autonomous AI substrates, contract-driven full-stack engineering, and cryptographic governance.
- Designing or maintaining automated profile compilation tools (such as `@profile/renderer`).

Do NOT activate this skill when:
- Optimizing LinkedIn profile sections, headlines, or experience bullets (use `linkedin-profile-architect`).
- Formulating broader career advancement strategies or public presence synchronization (use `developer-advancement-strategist`).
- Managing standard software repository READMEs (use `readme-architect` from `repo` plugin).

---

## 2. GitHub Profile Architectural Standards

A senior developer profile repository is a technical document that establishes technical credibility and engineering philosophy. It avoids superficial badges and generic introductory fluff, organizing content around structured architectural sections:

### 2.1 Canonical Heading & Positioning
1. **Canonical H1 Title**: `# <Senior Title> / <Comprehensive Specialty>`
   - Example: `# Principal Platform & AI Systems Architect / Full-Spectrum Systems Engineer`
2. **Executive Summary**: A concise 1-2 sentence positioning statement defining the engineer's operational continuum across the full stack and infrastructure layers.

### 2.2 Dynamic SVG Stats Cards & Theme Adaptation
Center-aligned GitHub stats cards must support dynamic GitHub dark and light modes using standard HTML `<picture>` elements:

```html
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/overview.svg?raw=true#gh-dark-mode-only" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/overview.svg?raw=true" />
    <img alt="GitHub Stats" src="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/overview.svg?raw=true" height="200px" />
  </picture>&nbsp;&nbsp;<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/languages.svg?raw=true#gh-dark-mode-only" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/languages.svg?raw=true" />
    <img alt="Languages Used" src="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/languages.svg?raw=true" height="200px" />
  </picture>
</p>
```

### 2.3 Core Systems Narrative Taxonomy
Structure the developer's experience across authoritative, self-contained technical domains:
1. **Systems Diagnosis & Operational Precision**: Root-cause triage, first-principles reasoning, diagnostic depth, paved-road developer platforms.
2. **Cloud-Native Infrastructure, GitOps & Telemetry**: Declarative Kubernetes orchestration, ArgoCD GitOps, Cloudflare Zero Trust ingress, OpenTelemetry/Prometheus/Loki/Tempo observability.
3. **AI-Driven Bounded Contexts & Sovereign Gateways**: Domain-Driven Design (DDD) synthesis with autonomous agents, cognitive hermeticity, MCP tool brokering, CEL policy attachments.
4. **Semantic Vector Memory (RAG)**: High-dimensional vector topologies, sub-millisecond similarity queries, durable multi-agent context retrieval.
5. **Contract-Driven Full-Stack Systems**: Shared core schemas (Zod `z.infer`), Fastify HTTP/2 type providers, modern reactive frontends (React, Vite, Zustand), kinetic motion and 3D scenes.
6. **Low-Level Toolmaking & Real-Time Computing**: Graphics engines, WebAssembly (Wasm), WebGL/WebGPU pipelines, Diataxis documentation hubs.
7. **Cryptographic Invariants & Defensive Security**: Zero-trust secret governance (Infisical Universal Auth), SSH Ed25519 commit signing (`git commit -S`), linear branch protection rulesets.

### 2.4 Engineering Leadership Table
Conclude with a clean, borderless HTML table featuring the developer's mark or avatar, current role, and canonical domain link.

---

## 3. Operational Workflows

### Workflow A: Profile Repository Analysis & Audit
1. Inspect the target profile repository (`package.json`, `README.md`, existing assets, or `renderer/` workspace).
2. Evaluate technical depth against the 7-domain systems narrative taxonomy.
3. Identify generic filler, buzzwords, or outdated stats badges and formulate structured refactoring proposals.

### Workflow B: Profile README Scaffolding & Refactoring
1. Draft the canonical H1 title and executive summary.
2. Structure the dark/light mode SVG `<picture>` tags pointing to raw GitHub URLs or generated assets.
3. Author the structured technical domain sections with concrete architectural patterns and technologies.
4. Format the final output to 2-space indentation and max 100-character line width.

### Workflow C: Document Generation Pipeline Integration
When operating in repositories featuring dynamic compilation pipelines (like `@profile/renderer` in `user/profile`):
1. Maintain source templates under `renderer/src/pipelines/readme/readme.template.md`.
2. Ensure GraphQL schema inputs, stats calculations, and SVG templates remain synchronized with the rendered output.
3. Trigger generation scripts (`pnpm generate` or `pnpm renderer:generate`) to update `README.md` deterministically.

---

## 4. Governance Constraints

1. **Zero-Emoji Invariant**: Strictly forbidden across all profile README files, comments, and technical descriptions.
2. **Fact-Based Verifiability**: Never invent technologies, statistics, or metrics not verified in the codebase or confirmed by the developer.
3. **Typography & Styling**: Clean GitHub Flavored Markdown (GFM), standard HTML tags for alignment, and zero broken links.
