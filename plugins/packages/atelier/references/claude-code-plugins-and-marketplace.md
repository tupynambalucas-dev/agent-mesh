# Claude Code Plugins and Marketplace Architecture

Authoritative guide for packaging plugins and configuring multi-plugin marketplaces for Anthropic Claude Code.

---

## 1. Marketplace Structure (`.claude-plugin/marketplace.json`)

Claude Code discovers plugins through a marketplace catalog. A marketplace must define a `.claude-plugin/marketplace.json` file:

```json
{
  "name": "tupynambalucas-dev",
  "owner": {
    "name": "Tupynamba Lucas Development Team",
    "email": "contato@tupynambalucas.dev",
    "url": "https://tupynambalucas.dev"
  },
  "metadata": {
    "description": "Official Tupynamba Lucas Enterprise Agent Mesh Marketplace."
  },
  "plugins": [
    {
      "name": "atelier",
      "description": "AI Agent Atelier for crafting routers, skills, hooks, and rules.",
      "version": "1.0.0",
      "source": "./plugins/packages/atelier"
    }
  ]
}
```

### Marketplace Rules
- **Relative Paths**: `source` must point to a directory relative to the repository root without directory traversal (`..`).
- **No Duplicate Names**: Every plugin in the `plugins` array must possess a unique `name`.
- **Kebab-Case Names**: Upper-case or space characters in plugin names are rejected during sync.

---

## 2. Namespacing & Component Invocation

When a plugin is installed from a marketplace:
- **Skills**: Surfaced as `<plugin>:<skill>` (e.g., `atelier:skill-architect`, `github-flow:github-flow-operator`).
- **Agents/Subagents**: Surfaced as `<plugin>:<agent>` (e.g., `atelier:agent-creator`).
- **Rules**: Merged into the active rule context when the plugin is enabled.

---

## 3. Frontmatter & Skill Validation

Claude Code enforces strict skill frontmatter validation:
- `name`: Max 64 characters, lowercase alphanumeric and hyphens.
- Reserved Words: The words `anthropic` and `claude` cannot be used in skill names.
- `description`: Max 1024 characters, non-empty, no XML tags.
- Hook validation: `hooks/hooks.json` syntax is strictly checked.
