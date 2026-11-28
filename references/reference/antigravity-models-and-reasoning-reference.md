# Antigravity Models & Reasoning Reference (`reference/antigravity-models-and-reasoning-reference.md`)

This document serves as the authoritative technical reference for reasoning models, dynamic thinking levels, dual quota architecture, and execution parameters within the Google Antigravity ecosystem (Antigravity CLI 1.5.15+, Antigravity App, and Antigravity IDE).

---

## 1. System Overview & Model Architecture

Google Antigravity integrates leading frontier reasoning models from Google DeepMind alongside select partner models from Anthropic and open-weight ecosystems. The runtime architecture decouples user intent into two execution paradigms:

1. **Standalone Single-Model Execution**: A single frontier model processes context, plans tool invocations, executes edits, and verifies results under a specified reasoning budget (`low`, `medium`, `high`, or `xhigh`).
2. **Dynamic Orchestrator Collaboration**: A dual-model collaboration runtime where a high-capacity planner model explores the repository, formulates architecture plans, and monitors progress, while a high-throughput executor model applies file mutations, executes shell commands, and conducts test suites.

---

## 2. Model Catalog & Technical Specifications

The following table details all models available in Antigravity CLI 1.5.15+:

| Model Display Name | CLI Identifier | Context Window | Supported Effort Levels | Quota Group | Lifecycle Status | Plan Availability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Gemini 4 Neon** | `gemini-4-neon` | 512,000 tokens | `low`, `medium`, `high`, `xhigh` | Gemini | Active (Flagship) | Ultra, Pro (Paid), Enterprise |
| **Gemini 4 Carbon** | `gemini-4-carbon` | 512,000 tokens | `low`, `medium`, `high` | Gemini | Active (Workhorse) | Ultra, Pro (Paid), Enterprise |
| **Gemini 4 Argon** | `gemini-4-argon` | 512,000 tokens | `low`, `medium`, `high` | Gemini | Deprecating (Nov 30, 2026) | Ultra, Pro (Paid), Enterprise |
| **Gemini 4 Hydrogen** | `gemini-4-hydrogen` | 512,000 tokens | `low`, `medium`, `high`, `xhigh` | Gemini | Active (Fast Executor) | All tiers (Free, Plus, Pro, Ultra, Enterprise) |
| **Orchestrator (Neon)** | `gemini-pro-orchestrator-neon` | Dynamic | Fixed (Planner: Neon Medium/High, Exec: Hydrogen) | Gemini | Active | Ultra, Pro (Paid) |
| **Orchestrator (Carbon)** | `gemini-pro-orchestrator` | Dynamic | Fixed (Planner: Carbon High, Exec: Hydrogen) | Gemini | Active (Enterprise Standard) | Ultra, Pro (Paid), Enterprise |
| **Orchestrator (Argon)** | `gemini-pro-orchestrator-argon` | Dynamic | Fixed (Planner: Argon Medium/High, Exec: Hydrogen) | Gemini | Deprecating (Nov 30, 2026) | Ultra, Pro (Paid) |
| **Claude Opus 5.5** | `claude-opus-5-5` | 200,000 tokens | `low`, `medium`, `high` | Claude & GPT | Active (Partner Frontier) | Ultra, Pro (Paid), Enterprise |
| **Claude Sonnet 5.5** | `claude-sonnet-5-5` | 200,000 tokens | `low`, `medium`, `high` | Claude & GPT | Active (Partner High-Speed) | Ultra, Pro (Paid), Enterprise |
| **GPT-OSS 120B** | `gpt-oss-120b-medium` | 128,000 tokens | `medium` | Claude & GPT | Deprecating (Nov 30, 2026) | Ultra, Pro, Plus, Free |
| **Gemini 3.8 Flash** | `gemini-3.8-flash` | 1,000,000 tokens | `low`, `medium`, `high` | Gemini | Deprecating (Nov 30, 2026) | All tiers |

### Internal & Subsystem Models (Non-Customizable)

- **Nano Banana 2**: Antigravity internal generative vision model. Invoked automatically by image generation and diagramming tools when synthesizing architecture blueprints, UI mockups, or visual assets.

---

## 3. Dual Quota Groups & Capacity Dynamics

Antigravity segregates model usage into two strictly independent quota pools. Consumption within one pool does not deplete the other:

```text
+-----------------------------------------------------------------------------------+
|                            ANTIGRAVITY ACCOUNT QUOTA                              |
+-------------------------------------------------+---------------------------------+
|               GEMINI MODELS GROUP               |      CLAUDE AND GPT MODELS      |
|  - Gemini 4 Neon       - Gemini 4 Carbon        |  - Claude Opus 5.5              |
|  - Gemini 4 Argon      - Gemini 4 Hydrogen      |  - Claude Sonnet 5.5            |
|  - Orchestrator (All)  - Gemini 3.8 Flash       |  - GPT-OSS 120B                 |
+-------------------------------------------------+---------------------------------+
|  Dual-Rate Envelopes:                           |  Dual-Rate Envelopes:           |
|  1. Five-Hour Rolling Window (100% smoothing)   |  1. Five-Hour Rolling Window    |
|  2. Weekly Limit Window (Tier-based ceiling)    |  2. Weekly Limit Window         |
+-------------------------------------------------+---------------------------------+
```

### Rate Envelope Mechanics

1. **Five-Hour Rolling Limit**: Designed to smooth out short-term aggregate demand and ensure fair global capacity distribution. Recharges continuously as the rolling window advances.
2. **Weekly Account Limit**: Directly tied to the user subscription tier (Free, Google AI Plus, Google AI Pro, Google AI Ultra, or Gemini Enterprise). Resets every 7 days from the initial consumption timestamp.
3. **Proportional Token Weighting**: Quota consumption is non-linear and reflects underlying compute intensity. A prompt processed on `Gemini 4 Neon (xhigh)` expends more capacity units per token than `Gemini 4 Hydrogen (low)`. Shorter tasks or high-throughput models prolong weekly capacity significantly.

---

## 4. Reasoning Effort Budget Matrix

Reasoning effort dictates the internal chain-of-thought token allocation before the model commits to tool invocations or final text generation:

| Effort Tier | CLI Flag | Selector Label | Reasoning Depth | Typical Token Overhead | Primary Intent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Low** | `--effort low` | `Low` | Minimal thinking | Baseline (Fastest) | Direct formatting, simple syntax fixes, one-line edits, boilerplate. |
| **Medium** | `--effort medium` | `Medium` | Balanced thinking | Balanced (Default) | Standard feature implementation, single-file bugfixes, regular test additions. |
| **High** | `--effort high` | `High` | Deep multi-step reasoning | Substantial | Complex multi-file refactoring, concurrency bugs, API contract design. |
| **Extra High** | `--effort xhigh` | `Extra` | Maximum architectural reasoning | Maximal | Greenfield architecture, distributed race conditions, monorepo migrations. |

> [!NOTE]
> `xhigh` (Extra) is supported exclusively on **Gemini 4 Neon** and **Gemini 4 Hydrogen**. On other models, the highest selectable budget is `high`.
> In the Antigravity CLI, effort can be supplied at startup via `--effort <tier>` or dynamically toggled via the `/effort` interactive prompt.

---

## 5. Orchestrator Dynamic Handoff Architecture

Orchestrator is not a naive upfront prompt classifier that routes a request to a single backend. Instead, it operates an interleaved state machine where planner and executor alternate turns within a single conversation turn:

```text
+-----------------------------------------------------------------------------+
|                        USER REQUEST / TASK PROMPT                           |
+-----------------------------------------------------------------------------+
                                      |
                                      v
                    +------------------------------------+
                    |   PHASE 1: ORCHESTRATOR PLANNING   |
                    |   (Gemini 4 Neon / Carbon / Argon) |
                    |   - Read-only exploration          |
                    |   - Identifies invariants & risks  |
                    |   - Authorizes execution roadmap   |
                    +------------------------------------+
                                      |
                                      v
                    +------------------------------------+
                    |   PHASE 2: EXECUTOR IMPLEMENTATION |
                    |   (Gemini 4 Hydrogen)              |
                    |   - File modifications             |
                    |   - Shell builds & test runs       |
                    |   - Verifies against plan steps    |
                    +------------------------------------+
                                      |
                 +--------------------+--------------------+
                 |                                         |
     [Execution Friction Encountered]              [Execution Succeeded]
                 |                                         |
                 v                                         v
+------------------------------------+   +------------------------------------+
|   PHASE 3: PLAN REPAIR & ADAPTATION|   |   PHASE 4: PROGRESS VERIFICATION   |
|   (Planner steps back in)          |   |   (Planner reviews all artifacts)  |
|   - Re-evaluates unexpected state  |   |   - Validates acceptance criteria  |
|   - Re-writes subsequent steps     |   |   - Formulates final response      |
+------------------------------------+   +------------------------------------+
                 |                                         |
                 +-------------------->+<------------------+
                                       |
                                       v
                             [COMPLETED RESPONSE]
```

### Orchestrator Behavioral Rules

1. **Read-Only Planning Phase**: Every new user turn begins with the planner performing non-destructive workspace exploration (file reads, searches, directory inspections) and formulating a concrete plan. If the turn is purely informational, the planner answers directly without invoking the executor.
2. **Automated Hand-off**: Once the action sequence is settled, control passes automatically to the executor model (default: `Gemini 4 Hydrogen`) to execute tool calls.
3. **Friction Loop**: If the executor fails a verification step twice (e.g., test fails consecutively, build syntax error, missing environment variable), execution halts immediately and yields back to the planner to diagnose and repair the plan.
4. **CLI Effort Invariance**: Because Orchestrator enforces a pre-calibrated reasoning budget between planner and executor, `--effort` and `/effort` do not apply to Orchestrator sessions in the CLI.

---

## 6. CLI Invocation & Configuration Standards

### Listing Available Models

To query the live roster of model identifiers bound to the current authentication token:

```bash
agy models
```

### Starting Sessions with Specific Models

```bash
# Start an interactive CLI session with Gemini 4 Neon at Extra High reasoning effort
agy --model gemini-4-neon-xhigh

# Start an interactive session with Orchestrator using Carbon as planner
agy --model "Orchestrator (Carbon)"

# Start an interactive session with Claude Opus 5.5 at High effort
agy --model claude-opus-5-5-high
```

### Non-Interactive (Headless) Automation

```bash
# Non-interactive script execution with Gemini 4 Hydrogen
agy -p "Run pnpm typecheck across all workspace packages and report errors." --model gemini-4-hydrogen-medium

# Non-interactive complex architectural audit with Orchestrator
agy -p "Audit .github/workflows/ against pinned action SHAs." --model gemini-pro-orchestrator
```

### Interactive TUI Commands

Within an active Antigravity CLI session:
- `/model`: Opens the interactive model selection interface. Navigate with `Up`/`Down`, adjust planner or effort with `Left`/`Right`, and press `Enter`.
- `/effort`: Toggles the reasoning budget (`low`, `medium`, `high`, `xhigh`) for the active standalone model.
- `/compact`: Compacts conversation history into a dense summary, immediately cutting per-turn input token overhead without losing active task state.

---

## 7. Token Economy, Context Hygiene & Anti-Drain Playbook

Because Antigravity re-sends the active system prompt (loaded plugins, `always_on` rules, skill catalogs, MCP tool manifests) plus the entire uncompacted conversation history on **every turn**, quota burn scales quadratically with conversation length and model weight.

### Primary Quota Drain Multipliers

| Drain Multiplier | Mechanism | Concrete Mitigation |
| :--- | :--- | :--- |
| **1. Standalone Flagship on Tool Loops** | Running 30+ mechanical tool calls (`git`, `gh`, `pnpm build`, file edits, `roadmap.md` updates) on standalone `Gemini 4 Neon` pays flagship quota weight on every round-trip. | Default to **`Orchestrator (Carbon)`** (or **`Orchestrator (Neon)`** for deep design) so mechanical execution is automatically delegated to **`Gemini 4 Hydrogen`**. Switch via `/model` to `Hydrogen` for pure execution turns. |
| **2. Long Multi-Milestone Sessions** | Executing multiple unrelated phases or repositories in one 40+ turn thread inflates input tokens on every follow-up prompt (even a 1-word prompt like `"Proceed"`). | Run **`/compact`** at the end of every completed phase, or open a **new conversation per phase/repository** relying on `.agents/plans/pending/<slug>/roadmap.md` for zero-loss handoff. |
| **3. Large Research Payloads in Main Thread** | Scraping full external documentation pages (30–50 KB each via Firecrawl) directly into the primary conversation persists massive text across all subsequent turns. | Delegate multi-page doc scraping or broad codebase surveys to the **`research`** subagent so only a concise synthesis enters the main context. |
| **4. Over-Loaded Workspace Plugins & Rules** | Opening the root `org/` meta-workspace loads all 14 plugins, ~75 skills, 16 MCP servers, and all `always_on` rules simultaneously (hitting the inline rules token budget on every turn). | Open the specific child repository (`foundation`, `docs`, `platform`) with a scoped preset (`presets/backend-api.json`, `presets/docs-portal.json`) when cross-repo orchestration is not needed. |

### Recommended Phase-by-Phase Execution Cadence

1. **Architecture & Planning Phase**: Start with **`Orchestrator (Neon)`** or **`Gemini 4 Neon (high)`** to design specs and write `.agents/plans/pending/<slug>/`.
2. **Implementation & Build Phase**: Switch via `/model` to **`Orchestrator (Carbon)`** (or start a fresh session pointing at `roadmap.md`) so **`Gemini 4 Hydrogen`** handles edits, builds, and tests economically.
3. **Verification, Git & Cleanup Phase**: Use **`Gemini 4 Hydrogen (low/medium)`** for PR merges, `roadmap.md` updates, and lint/typecheck runs.
4. **Documentation & MDX Phase**: Pivot to **`Claude Sonnet 5.5 (medium)`** to leverage the independent Claude/GPT quota pool while preserving Gemini capacity.
