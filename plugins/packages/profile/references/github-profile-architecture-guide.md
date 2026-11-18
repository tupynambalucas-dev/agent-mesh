# GitHub Developer Profile Architecture Guide

This technical guide provides the architectural blueprint and design patterns for creating elite developer profile repositories on GitHub (`<user>/<user>` or `<user>/profile`), inspired by the sovereign systems engineering standard established in `@tupynambalucas/profile`.

---

## 1. The GitHub Profile Repository Mechanism

GitHub renders the root `README.md` of a repository matching the account username (e.g. `github.com/username/username`) prominently on the developer's public profile page.

### Strategic Objectives
1. **Immediate Senior Positioning**: Instantly articulate technical breadth, engineering maturity, and architectural leadership within the first fold.
2. **First-Principles Systems Narrative**: Replace superficial badge clutter with deep, structured technical domains demonstrating real-world problem solving.
3. **Automated Dynamic Verification**: Incorporate verifiable telemetry, automated build pipelines, and dynamic SVG cards reflecting live metrics.

---

## 2. Document Structure & Layout

A standard profile README conforms to the following hierarchy:

```text
README.md
├── H1 Canonical Title & Subtitle
├── Executive Summary (1-2 sentences)
├── Centered <picture> Dynamic Stats Cards (Dark & Light SVG)
├── Core Systems Architecture Sections
│   ├── Surgical Systems Diagnosis & Operational Precision
│   ├── Cloud-Native Infrastructure, GitOps & Real-Time Telemetry
│   ├── AI-Driven Bounded Contexts & Sovereign Gateway Infrastructure
│   ├── Semantic Vector Architecture & Persistent Memory (RAG)
│   ├── Full-Stack Software Engineering & Contract-Driven Systems
│   ├── Low-Level Toolmaking & Real-Time Computing
│   └── Cryptographic Invariants & Defensive Security
└── Engineering Leadership & Canonical Domain Profile Table
```

---

## 3. Dynamic Stats Cards & SVG Theme Switching

To support GitHub's dynamic light and dark theme switching without visual degradation, wrap SVGs inside HTML `<picture>` elements with media scheme queries:

```html
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/overview.svg?raw=true#gh-dark-mode-only" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/overview.svg?raw=true" />
    <img alt="GitHub Stats Overview" src="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/overview.svg?raw=true" height="200px" />
  </picture>&nbsp;&nbsp;<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/languages.svg?raw=true#gh-dark-mode-only" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/languages.svg?raw=true" />
    <img alt="Languages Used" src="https://raw.githubusercontent.com/<user>/<repo>/generated/cards/stats/languages.svg?raw=true" height="200px" />
  </picture>
</p>
```

Key requirements:
- Use `#gh-dark-mode-only` suffix on dark mode srcset URLs for GitHub image proxy cache disambiguation.
- Keep card heights aligned (e.g. `height="200px"`) for balanced visual symmetry.

---

## 4. The 7 Systems Engineering Narrative Domains

When authoring profile narratives for senior, staff, and principal engineers, organize technical accomplishments into explicit operational domains:

1. **Surgical Systems Diagnosis & Operational Precision**:
   - Focus: Root-cause triage, race conditions, memory bottlenecks, asynchronous state divergence.
   - Paved-road tooling: Automated workstation compliance, hermetic environment boundaries.
2. **Cloud-Native Infrastructure & GitOps**:
   - Focus: Kubernetes Helm/Kustomize, ArgoCD GitOps reconciliation, Cloudflare Zero Trust ingress.
   - Telemetry: OpenTelemetry, Prometheus metrics, Loki log streams, Tempo traces, Pyroscope profiling.
3. **AI-Driven Bounded Contexts & Sovereign Gateways**:
   - Focus: Domain-Driven Design (DDD) synthesis with autonomous AI agents, cognitive attention hermeticity.
   - Architecture: Model Context Protocol (MCP) tool brokering, CEL policy execution gates.
4. **Semantic Vector Memory (RAG)**:
   - Focus: High-dimensional vector topologies, sub-millisecond similarity retrieval, durable agent state.
5. **Contract-Driven Full-Stack Systems**:
   - Focus: Shared core Zod schemas (`z.infer`), Fastify HTTP/2 type providers, React/Vite/Zustand state slices.
   - User experience: Kinetic motion (GSAP), interactive 3D scenes (Three.js WebGL).
6. **Low-Level Toolmaking & Real-Time Computing**:
   - Focus: WebAssembly (Wasm) modules, WebGL/WebGPU graphics runtimes, Diataxis documentation hubs.
7. **Cryptographic Invariants & Defensive Security**:
   - Focus: Dynamic secret injection via Infisical Universal Auth, Ed25519 SSH commit signing (`git commit -S`), linear branch protection.

---

## 5. Automated Document Compilation Pipelines

In advanced setups (such as `@profile/renderer`), the root `README.md` is compiled automatically from structured source templates:

1. **Pipeline Schema (`pipeline.schema.ts`)**: Defines typed inputs for GitHub GraphQL metrics, stats card colors, and profile templates.
2. **Template Interpolation (`template-fill.ts`)**: Injects live repository counts, star counts, and language percentages into `readme.template.md`.
3. **Automation Trigger**: Automated via GitHub Actions workflows or pre-commit hooks (`pnpm generate`).
