# Changelog - @tupynambalucas-dev/plugin-web

All notable changes to `@tupynambalucas-dev/plugin-web` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- changelog-start -->

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-web-v1.1.0...plugin-web-v1.2.0) (2026-11-21)


### Features & Capabilities

* **architecture:** enforce bounded context hierarchy and autonomous plugin mandates ([01efcf7](https://github.com/tupynambalucas-dev/agent-mesh/commit/01efcf7b31a1110dcac8a133a0e7d7b53e405503))
* **mcp-playwright:** implement sovereign in-house mcp playwright package and web plugin skills ([8b8b62e](https://github.com/tupynambalucas-dev/agent-mesh/commit/8b8b62e4edcb5353550585ea6b27aaf7f3373e7d))
* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **mesh:** establish plugin independence, playwright isolation, and lifecycle hooks ([#11](https://github.com/tupynambalucas-dev/agent-mesh/issues/11)) ([494eb9a](https://github.com/tupynambalucas-dev/agent-mesh/commit/494eb9a860e5b3fea42fa4579322d8d321428dca))
* **monorepo:** introduce turborepo, pnpm catalogs, packages layout, and bounded AGENTS.md hierarchy ([67da161](https://github.com/tupynambalucas-dev/agent-mesh/commit/67da161ad9b3ec9447bcca98b2873c5266148a03))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))
* **runtime:** standardize env templates and add dynamic multi-mode playwright launcher ([#26](https://github.com/tupynambalucas-dev/agent-mesh/issues/26)) ([138b00d](https://github.com/tupynambalucas-dev/agent-mesh/commit/138b00da6ca942e0a70429037029899293f02b53))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))
* **plugins:** enhance portability and generic execution across organizations ([#61](https://github.com/tupynambalucas-dev/agent-mesh/issues/61)) ([953397b](https://github.com/tupynambalucas-dev/agent-mesh/commit/953397b9ab9a5404eebf76133381d460d52e833f))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **playwright:** update context routers and documentation for dynamic multi-mode execution and reference lifecycle ([#27](https://github.com/tupynambalucas-dev/agent-mesh/issues/27)) ([914b9a9](https://github.com/tupynambalucas-dev/agent-mesh/commit/914b9a9bd085329eb7d02bf8f47fbe88469e3679))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
* **routers:** align mcp routers, skills and readme references with enterprise naming ([52d954f](https://github.com/tupynambalucas-dev/agent-mesh/commit/52d954f3c968ee9346ae863ccfd30b062343e8a9))

## [1.0.0] - 2026-11-03

### Features & Capabilities

- [feat(web): initial enterprise release of Web browser automation domain plugin (9c99bf8)](https://github.com/tupynambalucas-dev/agent-mesh/commit/9c99bf8) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(web): provide autonomous skills browser-operator, browser-auditor, and web-extractor (a1b2c3d)](https://github.com/tupynambalucas-dev/agent-mesh/commit/a1b2c3d) ([@tupynambalucas](https://github.com/tupynambalucas))
- [feat(web): sovereign launcher routing to @tupynambalucas-dev/mcp-playwright and Playwright CDP extension (e4f5a6b)](https://github.com/tupynambalucas-dev/agent-mesh/commit/e4f5a6b) ([@tupynambalucas](https://github.com/tupynambalucas))
