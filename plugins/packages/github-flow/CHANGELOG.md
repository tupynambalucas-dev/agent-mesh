# Changelog - @tupynambalucas-dev/plugin-github-flow

All notable changes to `@tupynambalucas-dev/plugin-github-flow` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-github-flow-v1.1.0...plugin-github-flow-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **mesh:** establish plugin independence, playwright isolation, and lifecycle hooks ([#11](https://github.com/tupynambalucas-dev/agent-mesh/issues/11)) ([494eb9a](https://github.com/tupynambalucas-dev/agent-mesh/commit/494eb9a860e5b3fea42fa4579322d8d321428dca))
* **plugins:** decouple 5 modular github plugins and configure release please ([#68](https://github.com/tupynambalucas-dev/agent-mesh/issues/68)) ([84ffc27](https://github.com/tupynambalucas-dev/agent-mesh/commit/84ffc2778bd1ceb1c2ee84e10e3288f63dc0fa16))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))


### Bug Fixes & Corrections

* **ci:** strip utf-8 bom and configure ci-bot app token for release-please ([#72](https://github.com/tupynambalucas-dev/agent-mesh/issues/72)) ([31f9d93](https://github.com/tupynambalucas-dev/agent-mesh/commit/31f9d93b7dab7d8e40d70901807a60d976fb7e6a))
* **hooks:** add word boundary to git push branch protection regex ([#33](https://github.com/tupynambalucas-dev/agent-mesh/issues/33)) ([aab25c6](https://github.com/tupynambalucas-dev/agent-mesh/commit/aab25c6febf380bb21a22809137f32e7af48e9f2))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))
* **plugins:** enhance portability and generic execution across organizations ([#61](https://github.com/tupynambalucas-dev/agent-mesh/issues/61)) ([953397b](https://github.com/tupynambalucas-dev/agent-mesh/commit/953397b9ab9a5404eebf76133381d460d52e833f))
* **plugins:** unify repo and github-repo into consolidated domain plugin ([#69](https://github.com/tupynambalucas-dev/agent-mesh/issues/69)) ([9260b72](https://github.com/tupynambalucas-dev/agent-mesh/commit/9260b7236f436634e10f5661b5a666a3e07c535b))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
* **skills:** align github-flow-operator and onboarding with mani multi-repo model ([#2](https://github.com/tupynambalucas-dev/agent-mesh/issues/2)) ([6db3351](https://github.com/tupynambalucas-dev/agent-mesh/commit/6db33515a1edb8a14064b4b7026a015f86be6614))

## [1.1.0] - 2026-11-20

### Features & Capabilities

- [feat(flow): codify release engineering standard, signed annotated tags, and JIT maintenance branches #68](https://github.com/tupynambalucas-dev/agent-mesh/pull/68) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(flow): enforce SSH signature hook safeguards and confirmation gates for releases #68](https://github.com/tupynambalucas-dev/agent-mesh/pull/68) ([@tupynambalucas](https://github.com/tupynambalucas))

---

## [1.0.0] - 2026-11-03

### Features & Capabilities

- [feat(flow): initial enterprise release of GitHub Flow Domain Plugin (9c99bf8)](https://github.com/tupynambalucas-dev/agent-mesh/commit/9c99bf8) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(flow): provide autonomous skills github-flow-operator and github-actions-operator (a1b2c3d)](https://github.com/tupynambalucas-dev/agent-mesh/commit/a1b2c3d) ([@tupynambalucas](https://github.com/tupynambalucas))
