---
name: hook-architect
description: Authors and validates Antigravity lifecycle hooks (hooks.json), event handlers (SessionStart, PreToolUse, PostToolUse, PreInvocation, Stop), tool matchers, and execution timeouts.
---

# Hook Architect

This skill defines the authoritative specification for designing, authoring, and auditing Antigravity agent lifecycle hooks configured via `hooks.json`.

---

## 1. Overview & Placement

Lifecycle hooks execute external shell scripts or commands at deterministic phases during the agent's reasoning and execution loop.

> [!IMPORTANT]
> **Placement Invariant for Native Plugins:**
> In native Antigravity plugins, `hooks.json` **MUST** be placed directly at the plugin root directory (`plugins/<plugin_name>/hooks.json`). Subdirectories like `hooks/hooks.json` are not discovered by native plugin loaders.

---

## 2. Event Types & Schema

Each top-level key in `hooks.json` is a distinct hook identifier:

```json
{
  "linter-gate": {
    "PostToolUse": [
      {
        "matcher": "edit_file|write_file",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/lint.sh",
            "timeout": 15
          }
        ]
      }
    ]
  },
  "session-init": {
    "SessionStart": [
      {
        "type": "command",
        "command": "./scripts/verify-env.sh"
      }
    ]
  }
}
```

### Event Specifications

| Event | Firing Trigger | Matcher Target | Structure |
| :--- | :--- | :--- | :--- |
| `SessionStart` | Once when a new session begins. | *(none)* | Flat list of handler objects. |
| `PreToolUse` | Immediately before a tool step executes. | Tool name regex (e.g. `run_command`). | Grouped (`matcher` + `hooks` list). |
| `PostToolUse` | Immediately after a tool step completes. | Tool name regex (e.g. `write_file`). | Grouped (`matcher` + `hooks` list). |
| `PreInvocation` | Immediately before the model is called. | *(none)* | Flat list of handler objects. |
| `PostInvocation`| After tool execution concludes. | *(none)* | Flat list of handler objects. |
| `Stop` | When the agent execution terminates. | *(none)* | Flat list of handler objects. |

---

## 3. Operational Guardrails

- **Timeouts**: Always set explicit `timeout` values (seconds) to prevent hanging the agent loop if a background script deadlocks.
- **Fail-Safe Exit Codes**: Non-zero exit codes in `PreToolUse` block tool execution; use this deliberately for safety gates.
- **Zero Secrets**: Never pass plaintext tokens in hook command strings. Use environment variable expansion.

---

## 4. Reference Links

- [Antigravity Customizations & Plugins](../../references/antigravity-customizations-and-plugins.md)
- [Enterprise Naming Conventions Standard](../../references/naming-conventions-standard.md)
- [Claude Code Plugins & Marketplace](../../references/claude-code-plugins-and-marketplace.md)
