# Changelog - @tupynambalucas-dev/plugin-atelier

All notable changes to `@tupynambalucas-dev/plugin-atelier` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- changelog-start -->

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-atelier-v1.1.0...plugin-atelier-v1.2.0) (2026-11-21)


### Features & Capabilities

* **atelier:** add workspace context detection and npm packaging standards to plugin-architect ([e7205e3](https://github.com/tupynambalucas-dev/agent-mesh/commit/e7205e3b2d9712685495893dfb81c4c55325b8f7))
* **atelier:** enforce target-repo .agents/plans artifact storage ([#63](https://github.com/tupynambalucas-dev/agent-mesh/issues/63)) ([1848855](https://github.com/tupynambalucas-dev/agent-mesh/commit/1848855ffe77d89402eb5caa58c300ff95f5c381))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **mesh:** establish plugin independence, playwright isolation, and lifecycle hooks ([#11](https://github.com/tupynambalucas-dev/agent-mesh/issues/11)) ([494eb9a](https://github.com/tupynambalucas-dev/agent-mesh/commit/494eb9a860e5b3fea42fa4579322d8d321428dca))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **plugins:** make skills generic and hermetic per spec v1.0.0 ([#67](https://github.com/tupynambalucas-dev/agent-mesh/issues/67)) ([25070f8](https://github.com/tupynambalucas-dev/agent-mesh/commit/25070f8b01b8ba1382ec2901990b18153ef6ae8e))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))
* **runtime:** standardize env templates and add dynamic multi-mode playwright launcher ([#26](https://github.com/tupynambalucas-dev/agent-mesh/issues/26)) ([138b00d](https://github.com/tupynambalucas-dev/agent-mesh/commit/138b00da6ca942e0a70429037029899293f02b53))
* **skills:** add mani-operator and plan-architect domain skills ([#57](https://github.com/tupynambalucas-dev/agent-mesh/issues/57)) ([11f29c4](https://github.com/tupynambalucas-dev/agent-mesh/commit/11f29c4f61ef8ed2c5fd5120efa95540fb65915d))


### Bug Fixes & Corrections

* **atelier:** refine diataxis quadrant regex to allow root references readme ([#35](https://github.com/tupynambalucas-dev/agent-mesh/issues/35)) ([5af2296](https://github.com/tupynambalucas-dev/agent-mesh/commit/5af2296702915419b926ab658a5e66f6b0420091))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))
* **plugins:** enhance portability and generic execution across organizations ([#61](https://github.com/tupynambalucas-dev/agent-mesh/issues/61)) ([953397b](https://github.com/tupynambalucas-dev/agent-mesh/commit/953397b9ab9a5404eebf76133381d460d52e833f))
* **plugins:** unify repo and github-repo into consolidated domain plugin ([#69](https://github.com/tupynambalucas-dev/agent-mesh/issues/69)) ([9260b72](https://github.com/tupynambalucas-dev/agent-mesh/commit/9260b7236f436634e10f5661b5a666a3e07c535b))


### Documentation & Specifications

* **atelier,repo:** codify artifact dual-storage and plan topologies ([#58](https://github.com/tupynambalucas-dev/agent-mesh/issues/58)) ([99d4547](https://github.com/tupynambalucas-dev/agent-mesh/commit/99d45475c038eb9cde298879b7b601f48e1d9304))
* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **mesh:** restructure references into diataxis and enforce 3-layer ceiling ([#10](https://github.com/tupynambalucas-dev/agent-mesh/issues/10)) ([86b990f](https://github.com/tupynambalucas-dev/agent-mesh/commit/86b990faaaaefcc989eecb9d177e8613b928a4fe))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))

## [1.0.0] - 2026-11-03

### Features & Capabilities

- [feat(atelier): initial enterprise release of Atelier AI agent architecture plugin (9c99bf8)](https://github.com/tupynambalucas-dev/agent-mesh/commit/9c99bf8) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(atelier): provide autonomous skills router-architect, skill-architect, rule-architect, hook-architect, and plugin-architect (a1b2c3d)](https://github.com/tupynambalucas-dev/agent-mesh/commit/a1b2c3d) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(atelier): introduce plan-architect skill and enterprise plan dual-storage invariant #68](https://github.com/tupynambalucas-dev/agent-mesh/pull/68) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(guardrails): codify cryptographic commit signature enforcement hook (e4f5a6b)](https://github.com/tupynambalucas-dev/agent-mesh/commit/e4f5a6b) ([@tupynambalucas](https://github.com/tupynambalucas))
