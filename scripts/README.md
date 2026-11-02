# Orchestration & Automation Scripts (`scripts/`)

This directory previously housed legacy publishing scripts. In accordance with enterprise monorepo standards, all package publication is now handled natively via `pnpm -r publish` and Turborepo.

> [!NOTE]
> Workstation onboarding and readiness gate verification scripts (`bootstrap-workstation.ps1`, `verify-workstation.ps1`) are maintained in the organization governance repository at [`.github/scripts/`](../../.github/scripts/README.md).

---

## 1. Zero-Script Release Architecture

The custom script `publish-packages.js` has been deprecated and retired. Package publication is executed through native pnpm primitives:
- Native recursive publish: `pnpm -r publish --access public --no-git-checks --report-summary`
- Declarative registries configured in [`pnpm-workspace.yaml`](../pnpm-workspace.yaml)
- Automated CI/CD pipeline orchestrated via [`.github/workflows/publish.yml`](../.github/workflows/publish.yml)

---

## 2. Sovereign Plugin Launchers Architecture

The legacy central script `mcp-gateway-router.js` has been retired in favor of sovereign, self-contained launchers located within each plugin at `plugins/packages/<plugin-name>/scripts/launcher.cjs`.

Each launcher operates independently:
1. Cascades `.env` file discovery deterministically.
2. If `MESH_PROFILE=cluster` or `CORTEX_GATEWAY_ENABLED=true`, routes to the cluster gateway via `mcp-remote`.
3. If running inside the monorepo, executes local precompiled binary `mcp/packages/<service>/dist/bin.js`.
4. If installed standalone outside the monorepo, executes via `npx -y @tupynambalucas-dev/mcp-<service>`.
