# How to Select Antigravity Models & Reasoning Effort (`how-to-guides/selecting-antigravity-models-and-reasoning-effort.md`)

This guide outlines practical decision criteria, workload archetypes, and concrete repository scenarios across the `tupynambalucas-dev` organization for selecting the optimal Antigravity model and reasoning effort.

---

## 1. Decision Matrix & Selection Framework

Choosing the correct model requires balancing three engineering dimensions:
1. **Reasoning Depth**: The complexity of the problem, number of interacting systems, and risk of subtle bugs.
2. **Execution Latency**: The turnaround speed required for interactive developer pairing or automated CI/CD loops.
3. **Quota Preservation**: Distributing workloads across the independent **Gemini** and **Claude/GPT** quota pools.

```text
                               +-----------------------------+
                               | WHAT TYPE OF TASK IS THIS?  |
                               +-----------------------------+
                                              |
             +--------------------------------+-------------------------------+
             |                                |                               |
             v                                v                               v
+------------------------+      +---------------------------+      +----------------------+
| RAPID / MECHANICAL     |      | STANDARD FEATURE / BUG    |      | DEEP ARCHITECTURE /  |
| - Boilerplate scripts  |      | - Multi-file refactoring  |      |   SUBTLE CONCURRENCY |
| - Doc updates & lint   |      | - API endpoint addition   |      | - Distributed mesh   |
| - Dependency upgrades  |      | - Test suite authoring    |      | - Greenfield design  |
+------------------------+      +---------------------------+      +----------------------+
             |                                |                               |
             v                                v                               v
+------------------------+      +---------------------------+      +----------------------+
|   Gemini 4 Hydrogen    |      |    Orchestrator (Carbon)  |      |    Gemini 4 Neon     |
|   (Effort: low/medium) |      |    (Enterprise Default)   |      |    (Effort: high/    |
+------------------------+      +---------------------------+      |     xhigh)           |
                                              |                    +----------------------+
                                              |                               |
                               [Claude Pool Preference?]                      |
                                              |                               v
                                              v                    +----------------------+
                                +---------------------------+      |    Claude Opus 5.5   |
                                |     Claude Sonnet 5.5     |      |    (Effort: high)    |
                                |     (Effort: medium)      |      +----------------------+
                                +---------------------------+
```

---

## 2. Model Selection by Organizational Repository

The meta-repository workspace (`org/`) orchestrates several specialized sovereign repositories. The table below matches concrete engineering domains to recommended models:

| Repository | Domain & Architecture | Recommended Primary Model | Recommended Secondary / Fallback | Recommended Effort |
| :--- | :--- | :--- | :--- | :--- |
| **`platform`** | Kubernetes Cortex Gateway, Envoy filters, distributed failover | **Gemini 4 Neon** | **Orchestrator (Neon)** | `high` or `xhigh` |
| **`agent-mesh`** | MCP servers (`dist/bin.cjs`), Playwright engine, domain plugins | **Orchestrator (Carbon)** | **Gemini 4 Carbon** | `high` |
| **`foundation`** | Domain-Driven Design (DDD) contracts, shared kernel abstractions | **Gemini 4 Neon** | **Claude Opus 5.5** | `high` |
| **`docs`** | Docusaurus v3 hub, MDX v3 components, Diátaxis quadrant structuring | **Claude Sonnet 5.5** | **Gemini 4 Hydrogen** | `medium` |
| **`.github` / `.github-private`** | Bot machine identity, GitHub App security, release workflows | **Claude Opus 5.5** | **Gemini 4 Carbon** | `high` |
| **`user`** | Developer profile README, STAR experience bullets, ATS optimization | **Claude Opus 5.5** | **Gemini 4 Carbon** | `high` |
| **`ecosystem`** | Multi-repo toolchain utilities, shared CLI extensions | **Orchestrator (Carbon)** | **Gemini 4 Hydrogen** | `medium` |
| **`org` (Meta-Root)** | `mani.yaml` multi-repo sync, cross-repository catalog alignment | **Gemini 4 Hydrogen** | **Gemini 4 Carbon** | `low` or `medium` |

---

## 3. Concrete Repository Scenarios

### Scenario A: Debugging Playwright CDP Race Conditions in `agent-mesh`
- **Context**: In `agent-mesh/mcp/servers/playwright`, browser automation fails intermittently during simultaneous headless session initialization and CDP extension bridge attachment.
- **Model Choice**: `Gemini 4 Neon` at `--effort high` (or `gemini-pro-orchestrator-neon`).
- **Rationale**: Isolating race conditions across Chrome DevTools Protocol websockets, profile directory locks (`${PLUGIN_DATA}/browser-profile`), and Fastify SSE streaming requires deep multi-step tracing across asynchronous lifecycle boundaries.

### Scenario B: Implementing Fastify MCP Endpoints & Building Bundles in `agent-mesh`
- **Context**: Adding a new tool handler to an existing MCP server, recompiling with `tsup`, and verifying standalone Stdio output.
- **Model Choice**: `Orchestrator (Carbon)` (CLI: `gemini-pro-orchestrator`) or `Gemini 4 Hydrogen` (`--effort medium`).
- **Rationale**: The task consists of well-defined interface extensions followed by mechanical bundling (`pnpm mcp:build`). Orchestrator efficiently plans the route schema and lets Hydrogen apply the code edits and execute the verification build.

### Scenario C: Drafting Enterprise Architecture Blueprints in `platform`
- **Context**: Authoring a master specification in `platform/.agents/plans/cortex-mesh-failover/` describing zero-downtime traffic migration between Kubernetes Envoy gateways and local sovereign agent launchers.
- **Model Choice**: `Gemini 4 Neon` at `--effort xhigh`.
- **Rationale**: Greenfield distributed systems architecture requires maximum reasoning depth (`xhigh`) to analyze latency budgets, failure domains, and secret propagation topologies.

### Scenario D: Scaffolding MDX Documentation in `docs`
- **Context**: Migrating technical notes into Docusaurus Diátaxis quadrants (`tutorials/`, `how-to-guides/`, `reference/`, `explanation/`) ensuring strict MDX v3 parser compliance (closing tags, JSX comment notation).
- **Model Choice**: `Claude Sonnet 5.5` at `--effort medium` or `Gemini 4 Hydrogen` at `--effort low`.
- **Rationale**: Fast markdown parsing and frontmatter layout tasks benefit from high generation speed with moderate reasoning.

### Scenario E: Hardening GitHub App Machine Identity in `.github-private`
- **Context**: Implementing automated private key rotation, JWT minting with 10-minute validity envelopes, and Infisical Universal Auth credential synchronization.
- **Model Choice**: `Claude Opus 5.5` at `--effort high` or `Gemini 4 Carbon` at `--effort high`.
- **Rationale**: Security-critical identity lifecycles require rigorous verification against cryptographic side-channel leaks and strict least-privilege permission validation.

### Scenario F: Mass Dependency Bumping Across Meta-Repo in `org`
- **Context**: Updating pnpm catalog versions in `agent-mesh`, `platform`, and `docs` via Mani batch execution (`mani run update-deps`).
- **Model Choice**: `Gemini 4 Hydrogen` at `--effort low`.
- **Rationale**: Purely mechanical execution with minimal reasoning overhead. Saves high-tier quota while executing edits at maximum token throughput.

---

## 4. Selecting the Optimal Reasoning Effort

The reasoning effort parameter controls how many internal thinking tokens the model generates before emitting code or text:

### 1. When to Use `low` (`--effort low`)
- Performing straightforward formatting or typo fixes.
- Scaffolding standard boilerplate from established project templates.
- Updating version numbers, `.gitignore` entries, or simple JSON configs.
- Executing routine CI checks or running test commands without modifications.

### 2. When to Use `medium` (`--effort medium` - Default)
- Standard feature implementation within existing file patterns.
- Adding unit or integration tests for clearly specified functions.
- Updating documentation pages adhering to Diátaxis structures.
- Routine API route additions with existing controllers.

### 3. When to Use `high` (`--effort high`)
- Multi-file refactoring spanning shared packages and TypeScript project references.
- Implementing cryptographic workflows (SSH commit signing, JWT generation, Infisical vault integrations).
- Investigating asynchronous race conditions, deadlock scenarios, or memory leaks.
- Authoring architectural context routers (`AGENTS.md`) and governance rules.

### 4. When to Use `xhigh` (`--effort xhigh` / `Extra`)
- Designing greenfield distributed architectures from scratch.
- Untangling complex monorepo circular dependencies and catalog reconciliation failures.
- Designing high-concurrency protocols or critical security boundaries.
- Solely available on **Gemini 4 Neon** and **Gemini 4 Hydrogen**.

---

## 5. Quota Optimization & Failover Playbook

Because Antigravity enforces two independent quota pools (Gemini Models vs. Claude/GPT Models), developers can strategically preserve capacity:

### The Claude Depletion Recovery Playbook
When telemetry indicates that the Claude & GPT weekly limit is constrained (for example, below 5% remaining), execute the following pivot:

1. **Shift Interactive Planning to Gemini 4 Carbon**:
   ```bash
   agy --model gemini-4-carbon-high
   ```
   Gemini 4 Carbon delivers frontier-class reasoning and AST precision comparable to Sonnet/Opus while consuming from the independent Gemini quota pool (which typically retains 90%+ capacity).

2. **Shift Everyday Coding to Orchestrator (Carbon)**:
   ```bash
   agy --model "Orchestrator (Carbon)"
   ```
   Combines Carbon's planning depth with Hydrogen's economical token execution, stretching the remaining weekly ceiling.

3. **Reserve Claude Opus 5.5 for High-Impact Narrative Tasks**:
   Preserve remaining Claude quota strictly for nuanced career positioning (`user`), strategic investor memos, or complex legal/licensing audits.

---

## 6. Common CLI Operational Commands

```bash
# Launch interactive session for daily development (Balanced Workhorse)
agy --model "Orchestrator (Carbon)"

# Launch interactive session for distributed architecture (Maximum Frontier Reasoning)
agy --model gemini-4-neon-xhigh

# Launch high-speed non-interactive prompt for catalog verification
agy -p "Verify pnpm catalog consistency across workspace packages." --model gemini-4-hydrogen-low

# Switch model interactively inside active CLI session
/model

# Switch reasoning effort interactively inside active CLI session
/effort
```
