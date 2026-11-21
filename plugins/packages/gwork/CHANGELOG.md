# Changelog - @tupynambalucas-dev/plugin-gwork

All notable changes to `@tupynambalucas-dev/plugin-gwork` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- changelog-start -->

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-gwork-v1.1.0...plugin-gwork-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **plugins:** make skills generic and hermetic per spec v1.0.0 ([#67](https://github.com/tupynambalucas-dev/agent-mesh/issues/67)) ([25070f8](https://github.com/tupynambalucas-dev/agent-mesh/commit/25070f8b01b8ba1382ec2901990b18153ef6ae8e))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
* **routers:** align mcp routers, skills and readme references with enterprise naming ([52d954f](https://github.com/tupynambalucas-dev/agent-mesh/commit/52d954f3c968ee9346ae863ccfd30b062343e8a9))

## [1.0.0] - 2026-11-03

### Features & Capabilities

- [feat(gwork): initial enterprise release of Google Workspace domain plugin (9c99bf8)](https://github.com/tupynambalucas-dev/agent-mesh/commit/9c99bf8) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(gwork): provide autonomous skills gwork-drive-operator, gwork-sheets-architect, and gwork-docs-architect (a1b2c3d)](https://github.com/tupynambalucas-dev/agent-mesh/commit/a1b2c3d) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(gwork): sovereign launcher routing to @tupynambalucas-dev/mcp-gwork and 1NF normalized Sheets synthesis (e4f5a6b)](https://github.com/tupynambalucas-dev/agent-mesh/commit/e4f5a6b) ([@tupynambalucas](https://github.com/tupynambalucas))
