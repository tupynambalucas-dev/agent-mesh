<context-hierarchy>
  <parent src="../AGENTS.md" type="global-rules" />
  <system-instruction>
    AGENT: You are operating in the references bounded context of agent-mesh. If you have not read "../AGENTS.md" in this session, read it first before proceeding.
  </system-instruction>
</context-hierarchy>

# Documentation Subsystem Agent Context (`references/`)

This document serves as the sovereign bounded context router for technical documentation in `agent-mesh/references/`, structured according to the **Diátaxis Framework**.

## Navigation by Quadrant

- [README.md](./README.md): Master documentation hub and comprehensive quadrant index.
- **Tutorials (`tutorials/`)**: Learning-oriented step-by-step guides ([Getting Started](./tutorials/getting-started-with-agent-mesh.md), [Authoring Plugins](./tutorials/authoring-your-first-plugin.md)).
- **How-To Guides (`how-to-guides/`)**: Problem-oriented recipes ([Consuming Plugins](./how-to-guides/consuming-plugins-in-antigravity-and-claude.md), [GitHub Apps](./how-to-guides/configuring-github-apps-and-credentials.md), [Playwright Pairing](./how-to-guides/pairing-desktop-browser-with-playwright.md), [Gateway Failover](./how-to-guides/configuring-smart-gateway-local-failover.md)).
- **Technical Reference (`reference/`)**: Information-oriented specifications ([Naming Conventions](./reference/naming-conventions-and-scoping-standard.md), [Plugin Catalog](./reference/domain-plugin-catalog.md), [MCP Catalog](./reference/mcp-server-catalog.md), [Permissions Matrix](./reference/github-app-permissions-matrix.md)).
- **Architecture Explanation (`explanation/`)**: Understanding-oriented design principles ([Mesh Topology](./explanation/agent-mesh-architecture-and-topology.md), [Dual Transport](./explanation/dual-transport-and-zero-downtime-failover.md), [Browser Engine](./explanation/browser-automation-and-extension-bridge.md), [Token Security](./explanation/least-privilege-and-token-security.md)).

## Scoped Guardrails

- MUST adhere strictly to the Diátaxis quadrant separation when authoring new documentation.
- MUST write all documentation strictly in en-US.
- MUST NOT use emojis anywhere in titles, callouts, or body text (Zero-Emoji Invariant).
- MUST use relative paths for all cross-document and cross-subsystem links. Never use absolute `file:///` filesystem paths.
- AI-generated architectural plans, reviews, and verification reports must NOT reside here; archive them under [../.agents/](../.agents/README.md).
