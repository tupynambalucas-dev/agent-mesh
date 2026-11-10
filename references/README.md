# Universal Agent Mesh Documentation Hub (`references/`)

Authoritative technical documentation for the `tupynambalucas-dev/agent-mesh` capability workspace, organized according to the **Diátaxis Framework**.

---

## 1. Documentation Quadrants

The documentation is partitioned into four distinct quadrants, each serving a specific developer and agent interaction mode:

```text
references/
├── tutorials/       # Learning-oriented: step-by-step guidance for beginners
├── how-to-guides/   # Problem-oriented: task-focused recipes for specific goals
├── reference/       # Information-oriented: technical descriptions, schemas, APIs
└── explanation/     # Understanding-oriented: architectural rationale & concepts
```

---

## 2. Master Navigation Index

### 2.1 Tutorials (Learning-Oriented)
Practical lessons to onboard new engineers and AI agents by building from scratch:
- [Getting Started with Agent Mesh](./tutorials/getting-started-with-agent-mesh.md): Complete setup guide, pnpm catalogs, `tsup` self-contained MCP bundling, plugin validation, and workspace integration.
- [Authoring Your First Domain Plugin](./tutorials/authoring-your-first-plugin.md): Step-by-step tutorial creating a domain plugin complying with `agent-plugins.org` v1.0.0.

### 2.2 How-To Guides (Problem-Oriented)
Task-focused runbooks and recipes to accomplish specific operational goals:
- [Consuming Plugins in Antigravity and Claude Code](./how-to-guides/consuming-plugins-in-antigravity-and-claude.md): External umbrella package consumption (zero-token Git channel vs. GitHub Packages registry), `.agents/plugins.json` bulk and `include_only` patterns, sovereign MCP execution, and troubleshooting.
- [Configuring GitHub Apps and Credentials](./how-to-guides/configuring-github-apps-and-credentials.md): Automated manifest provisioning, manual UI setup, and Infisical secret vaulting.
- [Pairing Desktop Browsers with Playwright MCP](./how-to-guides/pairing-desktop-browser-with-playwright.md): Connecting to active developer browser sessions via CDP or extension bridge.
- [Configuring Sovereign Launcher & Cluster Gateway Routing](./how-to-guides/configuring-smart-gateway-local-failover.md): Routing between local self-contained `dist/bin.cjs` bundles and the Kubernetes Envoy AgentGateway.

### 2.3 Technical Reference (Information-Oriented)
Declarative specifications, catalogs, schemas, and matrices:
- [Umbrella Package & Presets Specification](./reference/umbrella-package-and-presets.md): Specification for the `@tupynambalucas-dev/agent-mesh` (`v1.2.0`) umbrella distribution package, installation channels, presets, and two-tier launcher resolution.
- [Enterprise Naming Conventions & Scoping Standard](./reference/naming-conventions-and-scoping-standard.md): Package names (`@tupynambalucas-dev/*`), closed role vocabulary, and directory invariants for plugins and sovereign MCP servers.
- [Domain Plugin Catalog](./reference/domain-plugin-catalog.md): Comprehensive matrix of all 10 domain plugins, included skills, rules, and sovereign launcher targets.
- [MCP Server Catalog](./reference/mcp-server-catalog.md): Technical breakdown of all 8 self-contained MCP servers (`dist/bin.cjs` + `scripts/launcher.cjs`) and 1 shared core library.
- [GitHub App Permissions Matrix](./reference/github-app-permissions-matrix.md): Permission scopes, token lifecycles, and Infisical project mappings.

### 2.4 Architecture Explanation (Understanding-Oriented)
Deep architectural context, design tradeoffs, and system mechanics:
- [Agent Mesh Architecture & Topology](./explanation/agent-mesh-architecture-and-topology.md): Why we decoupled the monolithic toolkit into sovereign packages and a hybrid umbrella distribution.
- [Dual-Transport & Sovereign Failover Architecture](./explanation/dual-transport-and-zero-downtime-failover.md): Rationale for Fastify Streamable HTTP (`dist/index.cjs`) paired with self-contained Stdio bundles (`dist/bin.cjs`) and two-tier sovereign launchers.
- [Browser Automation & Extension Bridge Architecture](./explanation/browser-automation-and-extension-bridge.md): Universal Browser Engine design and non-intrusive desktop pairing philosophy.
- [Least Privilege & Token Security Architecture](./explanation/least-privilege-and-token-security.md): Bot machine identity, Infisical Universal Auth, and eliminating plaintext tokens.

---

## 3. Governance & Documentation Standards

- All documents strictly adhere to GitHub Flavored Markdown (GFM) and the Zero-Emoji Invariant.
- All intra-repository links must be relative and resolve to valid files on disk. Absolute `file:///` links are strictly forbidden.
- Technical documentation is authored strictly in en-US.
- Historical execution plans and audit reports are archived under [../.agents/](../.agents/README.md).
