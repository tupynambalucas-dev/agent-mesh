# Authoring Your First Domain Plugin

This tutorial guides you through the creation of a brand new, self-contained domain plugin within the `tupynambalucas-dev/agent-mesh` capability workspace, adhering to the `agent-plugins.org` v1.0.0 specification and Tupynamba Lucas enterprise standards.

---

## What You Will Build

You will create a domain plugin containing:
1. `plugin.json`: Authoritative plugin manifest conforming to `agent-plugins.org` v1.0.0.
2. `package.json`: Scoped monorepo package manifest (`@tupynambalucas-dev/plugin-<slug>`).
3. `rules/AGENTS.md`: Mandatory domain rules with an Autonomous Domain Mandate (Rule 0).
4. `skills/<skill_name>/SKILL.md`: A modular, single-responsibility agent skill.
5. `README.md`: Subsystem documentation and usage runbook.

---

## Step 1: Scaffold Directory Structure

Choose a concise kebab-case slug for the plugin (e.g., `analytics`):

```bash
mkdir -p plugins/packages/analytics/rules
mkdir -p plugins/packages/analytics/skills/analytics-operator
mkdir -p plugins/packages/analytics/references
```

---

## Step 2: Author Plugin Manifest (`plugin.json`)

Create `plugins/packages/analytics/plugin.json`:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "analytics",
  "version": "1.0.0",
  "description": "Enterprise analytics and metric reporting domain plugin.",
  "author": {
    "name": "Tupynamba Lucas Development Team",
    "email": "contato@tupynambalucas.dev",
    "url": "https://tupynambalucas.dev"
  },
  "keywords": ["analytics", "metrics", "monitoring", "telemetry"]
}
```

---

## Step 3: Author Package Manifest (`package.json`)

Create `plugins/packages/analytics/package.json`:

```json
{
  "name": "@tupynambalucas-dev/plugin-analytics",
  "version": "1.0.0",
  "description": "Enterprise analytics domain plugin for AI agents.",
  "license": "Apache-2.0",
  "private": false,
  "publishConfig": {
    "access": "public",
    "registry": "https://npm.pkg.github.com"
  },
  "files": [
    "plugin.json",
    "README.md",
    "rules",
    "skills",
    "references"
  ]
}
```

---

## Step 4: Define Domain Rules (`rules/AGENTS.md`)

Create `plugins/packages/analytics/rules/AGENTS.md`. Every domain plugin must define an **Autonomous Domain Mandate** as Rule 0:

```markdown
---
trigger: always_on
---

# Analytics Domain Rules

0. Autonomous Domain Mandate:
   - When requested to query, inspect, or format analytics metrics or telemetry dashboards, the agent MUST autonomously engage the Analytics skills (`analytics-operator`) without waiting for explicit skill invocations from the user.

1. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all generated reports, queries, and summaries.

2. Technical Language Policy:
   - All metric definitions and data schemas must be authored in en-US.
```

---

## Step 5: Author Modular Skill (`skills/analytics-operator/SKILL.md`)

Create `plugins/packages/analytics/skills/analytics-operator/SKILL.md`:

```markdown
---
name: analytics-operator
description: Queries analytics APIs, aggregates performance indicators, and formats metric summaries.
---

# Analytics Operator

This skill provides operational workflows for extracting, aggregating, and inspecting analytics metrics.

---

## 1. Capabilities

- Queries telemetry endpoints for system performance data.
- Synthesizes tabular summaries of error rates and request latencies.

---

## 2. Usage Instructions

1. Identify the target service and time interval.
2. Formulate metric aggregation queries.
3. Present results in standard GitHub Flavored Markdown tables.
```

---

## Step 6: Validate the Plugin

Run strict Antigravity validation against the newly created plugin:

```bash
agy plugin validate plugins/packages/analytics --strict
```

Ensure the output confirms that all rules and skills pass validation with zero errors.

---

## Step 7: Register in Claude Code Marketplace

Add the plugin to `.claude-plugin/marketplace.json`:

```json
{
  "name": "analytics",
  "description": "Enterprise analytics and metric reporting domain plugin.",
  "version": "1.0.0",
  "source": "./plugins/packages/analytics"
}
```

---

## Next Steps

- Review the [Domain Plugin Catalog](../reference/domain-plugin-catalog.md) to see how existing plugins are structured.
- Refer to [Naming Conventions & Scoping Standard](../reference/naming-conventions-and-scoping-standard.md) for naming guidelines.
