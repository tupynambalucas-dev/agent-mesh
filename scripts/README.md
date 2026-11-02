# Orchestration & Automation Scripts (`scripts/`)

This directory contains multi-package release automation and build utilities for `agent-mesh`.

> [!NOTE]
> Workstation onboarding and readiness gate verification scripts (`bootstrap-workstation.ps1`, `verify-workstation.ps1`) have been migrated to the organization governance repository at [`.github/scripts/`](../../.github/scripts/README.md).

---

## 1. Scripts Catalog

| Script | Purpose | Execution Mode |
| :--- | :--- | :--- |
| `publish-packages.js` | Idempotently checks package versions against GitHub Packages (`npm.pkg.github.com`) and publishes changed packages. | Invoked during CI release pipeline. |

---

## 2. Sovereign Plugin Launchers Architecture

The legacy central script `mcp-gateway-router.js` has been retired in favor of sovereign, self-contained launchers located within each plugin at `plugins/packages/<plugin-name>/scripts/launcher.cjs`.

Each launcher operates independently:
1. Cascades `.env` file discovery deterministically.
2. If `MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`, routes to the cluster gateway via `mcp-remote`.
3. If running inside the monorepo, executes local precompiled binary `mcp/packages/<service>/dist/bin.js`.
4. If installed standalone outside the monorepo, executes via `npx -y @tupynambalucas-dev/mcp-<service>`.
