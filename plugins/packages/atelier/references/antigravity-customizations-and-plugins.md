# Antigravity Customizations and Plugin Runtime Specification

Authoritative reference for Google Antigravity (AGY) customization architecture, plugin loading, workspace rules, lifecycle hooks, MCP server configuration, and subagent orchestration.

---

## 1. Directory Structure

A native Antigravity plugin resides within a `plugins/<plugin_name>/` directory:

```text
plugins/<plugin_name>/
├── plugin.json         # Required: Plugin manifest
├── mcp_config.json     # Optional: Native Antigravity MCP servers
├── mcp.json            # Optional: Cross-vendor Agent Plugins 1.0.0 MCP servers
├── hooks.json          # Optional: Native lifecycle hooks
├── rules/              # Optional: Workspace rules (AGENTS.md recommended)
│   └── AGENTS.md
└── skills/             # Optional: Modular agent skills
    └── <skill_name>/
        ├── SKILL.md
        ├── scripts/
        └── references/
```

---

## 2. Workspace Rules Specification (`rules/AGENTS.md`)

Rules govern model behavior and enforce organizational invariants across bounded contexts.

### Discovery & Inheritance
- **Directory Walking**: The runtime traverses up from the current working directory to the repository root, loading all `AGENTS.md` (or `GEMINI.md`) files.
- **Plugin Rules**: Rules declared under `<plugin>/rules/AGENTS.md` are automatically merged when the plugin is active.
- **Deduplication**: Rules discovered through multiple paths are applied exactly once per conversation turn.

### Context Budget & Size Constraints
- **Per-File Ceiling**: Capped at **24 KB** (24,000 bytes) after resolving markdown includes (`@[label](path)`). Files exceeding this limit are truncated on clean line boundaries.
- **Aggregate Rules Budget**: Default budget of **20,000 tokens** (`defaultRulesBudget`), distinct from skills and MCP tool schemas.
- **Budget Eviction**: When total rules exceed 20,000 tokens, lower-priority rules are demoted from inline text to file path references loaded on demand. Builtin plugin rules are exempt from eviction.

### Rule Triggers
```markdown
---
trigger: always_on | model_decision
---

# Domain Rules Title

0. Autonomous Domain Mandate:
   - When requested to <action>, the agent MUST autonomously engage <skills> without waiting for explicit user prompts.
```

---

## 3. Lifecycle Hooks (`hooks.json`)

Lifecycle hooks execute external shell scripts or commands at deterministic phases of the agent execution loop.

### Supported Events
| Event | Trigger Point | Matcher Target | Structure |
| :--- | :--- | :--- | :--- |
| `SessionStart` | Once when a new session begins | N/A (ignored) | Flat list of handler objects |
| `PreToolUse` | Immediately before a tool executes | Tool name (e.g., `run_command`) | Grouped (`matcher` + `hooks`) |
| `PostToolUse` | Immediately after a tool completes | Tool name (e.g., `run_command`) | Grouped (`matcher` + `hooks`) |
| `PreInvocation` | Immediately before the LLM is invoked | N/A (ignored) | Flat list of handler objects |
| `PostInvocation` | Immediately after tool results return | N/A (ignored) | Flat list of handler objects |
| `Stop` | When the agent execution loop terminates | N/A (ignored) | Flat list of handler objects |

### Configuration Schema
```json
{
  "hook-name": {
    "enabled": true,
    "PreToolUse": [
      {
        "matcher": "run_command",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/safety-gate.sh",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

---

## 4. MCP Server Configuration (`mcp_config.json` vs `mcp.json`)

Antigravity natively accepts `mcp_config.json` and supports the cross-vendor `mcp.json` format:

```json
{
  "mcpServers": {
    "server-name": {
      "type": "stdio",
      "command": "node",
      "args": ["path/to/server.js"],
      "env": {
        "KEY": "value"
      }
    }
  }
}
```

- **Transports**: `stdio` (local subprocess) and `streamable-http` (remote endpoint at `/mcp`). Legacy HTTP+SSE (`/sse`) is deprecated.
- **Port Convention**: Internal MCP adapters expose Fastify Streamable HTTP on port `8080`.

---

## 5. Subagent Delegation Model

Subagents allow decomposing complex workflows into isolated execution contexts.

- **`invoke_subagent`**: Spawns an ephemeral agent with a distinct prompt and optional model override (`inherit`, `flash`, `pro`).
- **`define_subagent`**: Registers a dynamic subagent type available for repeated invocation in the session.
- **`send_message`**: Sends asynchronous messages between agents using unique Conversation IDs.
- **Workspaces**: Supports `inherit` (shared disk), `branch` (isolated copy), and `share` (git worktree).
