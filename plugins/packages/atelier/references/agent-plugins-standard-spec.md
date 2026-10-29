# Agent Plugins Specification (agent-plugins.org v1.0.0)

Open, vendor-neutral standard for packaging portable AI agent plugins across major industry clients (Antigravity, Claude Code, Cursor, GitHub Copilot, OpenAI ChatGPT, VS Code).

---

## 1. Specification Overview

Introduced in August 2026 by an industry technical steering committee (AWS, Anysphere, Google, Microsoft, OpenAI, Vercel), the **Agent Plugins standard** solves agent fragmentation by establishing a predictable layout and interoperability contract.

Key principle: Extensions are packaged once and consumed seamlessly by any compliant agent host without code modifications.

---

## 2. Directory Layout Standard

```text
<plugin-slug>/
├── plugin.json         # Required: Portable plugin manifest
├── mcp.json            # Optional: Model Context Protocol declarations
├── skills/             # Optional: Standard Agent Skills directory
│   └── <skill-name>/
│       ├── SKILL.md    # YAML frontmatter + instructions
│       ├── scripts/    # Optional execution scripts
│       └── references/ # Optional reference documentation
└── com.vendor.client/  # Optional: Reverse-domain client extension namespace
```

---

## 3. Manifest Specification (`plugin.json`)

The root `plugin.json` uses a closed schema validated against `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`.

### Required Fields
- **`$schema`**: Schema URI reference.
- **`name`**: Unique kebab-case identifier (`^[a-z0-9]+(-[a-z0-9]+)*$`). Maximum 64 characters.

### Optional Standard Metadata
- **`version`**: Semantic versioning string (`MAJOR.MINOR.PATCH`).
- **`description`**: Human-readable overview of capabilities.
- **`author`**: String or object (`{"name": "...", "url": "..."}`).
- **`homepage`**: Public documentation or landing page URL.
- **`repository`**: Git repository URL.
- **`license`**: SPDX license identifier (e.g. `Apache-2.0`, `MIT`).
- **`keywords`**: Array of search discovery tags.

### Example Manifest
```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "developer-flow",
  "version": "1.0.0",
  "description": "Git developer flow automation and CI/CD operations.",
  "author": {
    "name": "Tupynamba Lucas Development Team",
    "url": "https://tupynambalucas.dev"
  },
  "homepage": "https://docs.tupynambalucas.dev",
  "repository": "https://github.com/tupynambalucas-dev/agent-mesh",
  "license": "Apache-2.0",
  "keywords": ["git", "workflow", "ci-cd"]
}
```

---

## 4. MCP Servers Specification (`mcp.json`)

MCP servers must declare an explicit transport `"type"` (`stdio` or `streamable-http`):

```json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "node",
      "args": ["dist/bin.js"],
      "env": {
        "DEBUG": "false"
      }
    },
    "remote-gateway": {
      "type": "streamable-http",
      "url": "https://mcp.domain.com/mcp"
    }
  }
}
```

---

## 5. Agent Skills Specification (`skills/`)

Skills follow the open Agent Skills standard (`agentskills.io`):
- Directory name MUST match the `name` field in `SKILL.md` frontmatter exactly.
- Identifier constraints: 1 to 64 characters, lowercase alphanumeric and hyphens, no leading/trailing hyphens, no consecutive `--`.
- Frontmatter requires `name` and `description` (non-empty, max 1024 chars, no XML tags).

---

## 6. Client Extension Isolation (`<reverse-domain>/`)

To prevent breaking portability across runtimes, client-specific features (such as proprietary IDE commands, non-portable hooks, or custom editor views) must be placed inside a reverse-domain directory:

- `com.google.antigravity/`
- `com.anthropic.claude/`
- `com.github.copilot/`
- `com.anysphere.cursor/`

Runtimes that do not recognize an extension directory automatically ignore it without failing plugin validation.
