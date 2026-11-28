# Changelog - @tupynambalucas-dev/plugin-github-org

<!-- changelog-start -->

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-github-org-v1.1.0...plugin-github-org-v1.2.0) (2026-11-28)


### Features & Capabilities

* **github-org:** implement declarative apps drift auditor and webhook reconciler ([#78](https://github.com/tupynambalucas-dev/agent-mesh/issues/78)) ([1f1f643](https://github.com/tupynambalucas-dev/agent-mesh/commit/1f1f64368e7657670a474254bb7c711cd419429f))
* **identity:** integrate github app token generation and package governance ([#24](https://github.com/tupynambalucas-dev/agent-mesh/issues/24)) ([fbe6f2e](https://github.com/tupynambalucas-dev/agent-mesh/commit/fbe6f2e9f94685e9ea274bf6cfe381773935261a))
* **mcp-github:** align Token Broker contract, add 7-gate PR evaluator, and harden app auditor ([#81](https://github.com/tupynambalucas-dev/agent-mesh/issues/81)) ([f8725e3](https://github.com/tupynambalucas-dev/agent-mesh/commit/f8725e3c620193abfc4d171d73ccd50861619914))
* **mcp:** evolve github servers to governance and delivery planes ([#77](https://github.com/tupynambalucas-dev/agent-mesh/issues/77)) ([901979b](https://github.com/tupynambalucas-dev/agent-mesh/commit/901979b5ef7f6cfda5342e394ae97323f905e738))
* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **plugins:** add @tupynambalucas-dev/plugin-identity for apps, portal, and broker governance ([#83](https://github.com/tupynambalucas-dev/agent-mesh/issues/83)) ([d685f39](https://github.com/tupynambalucas-dev/agent-mesh/commit/d685f39b88c69cfda509c077aaa1304042808b54))
* **plugins:** decouple 5 modular github plugins and configure release please ([#68](https://github.com/tupynambalucas-dev/agent-mesh/issues/68)) ([84ffc27](https://github.com/tupynambalucas-dev/agent-mesh/commit/84ffc2778bd1ceb1c2ee84e10e3288f63dc0fa16))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **plugins:** make skills generic and hermetic per spec v1.0.0 ([#67](https://github.com/tupynambalucas-dev/agent-mesh/issues/67)) ([25070f8](https://github.com/tupynambalucas-dev/agent-mesh/commit/25070f8b01b8ba1382ec2901990b18153ef6ae8e))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **release:** support guardian tier and docusaurus changelog format ([#75](https://github.com/tupynambalucas-dev/agent-mesh/issues/75)) ([c2a1d3e](https://github.com/tupynambalucas-dev/agent-mesh/commit/c2a1d3e0048b0eac5cfaba06b07612b4189610ef))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))


### Bug Fixes & Corrections

* **ci:** strip utf-8 bom and configure ci-bot app token for release-please ([#72](https://github.com/tupynambalucas-dev/agent-mesh/issues/72)) ([31f9d93](https://github.com/tupynambalucas-dev/agent-mesh/commit/31f9d93b7dab7d8e40d70901807a60d976fb7e6a))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))
* **paths:** align references to org and ecosystem meta-repositories ([#76](https://github.com/tupynambalucas-dev/agent-mesh/issues/76)) ([005cdba](https://github.com/tupynambalucas-dev/agent-mesh/commit/005cdba72937a83396b8e9bbb7146af363698d02))
* **plugins:** enhance portability and generic execution across organizations ([#61](https://github.com/tupynambalucas-dev/agent-mesh/issues/61)) ([953397b](https://github.com/tupynambalucas-dev/agent-mesh/commit/953397b9ab9a5404eebf76133381d460d52e833f))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **mesh:** restructure references into diataxis and enforce 3-layer ceiling ([#10](https://github.com/tupynambalucas-dev/agent-mesh/issues/10)) ([86b990f](https://github.com/tupynambalucas-dev/agent-mesh/commit/86b990faaaaefcc989eecb9d177e8613b928a4fe))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
* **routers:** align mcp routers, skills and readme references with enterprise naming ([52d954f](https://github.com/tupynambalucas-dev/agent-mesh/commit/52d954f3c968ee9346ae863ccfd30b062343e8a9))
* **skills:** align github-flow-operator and onboarding with mani multi-repo model ([#2](https://github.com/tupynambalucas-dev/agent-mesh/issues/2)) ([6db3351](https://github.com/tupynambalucas-dev/agent-mesh/commit/6db33515a1edb8a14064b4b7026a015f86be6614))


### Maintenance

* **governance:** align apache-2.0 license, changesets, and skills ([#1](https://github.com/tupynambalucas-dev/agent-mesh/issues/1)) ([f123739](https://github.com/tupynambalucas-dev/agent-mesh/commit/f1237396a758fbf776af351763141060816e4a7f))

## [1.1.0] - 2026-11-20

### Features & Capabilities

- [#68](https://github.com/tupynambalucas-dev/agent-mesh/pull/68) feat(org): enforce enterprise-release-tags ruleset and release-from-trunk policy ([@tupynambalucas](https://github.com/tupynambalucas))
- [#68](https://github.com/tupynambalucas-dev/agent-mesh/pull/68) feat(org): implement idempotent configure-rulesets automation with strict error propagation ([@tupynambalucas](https://github.com/tupynambalucas))

### Committers: 1

- Tupynambá Lucas V. R. ([@tupynambalucas](https://github.com/tupynambalucas))

---

## [1.0.0] - 2026-11-03

### Features & Capabilities

- [9c99bf8](https://github.com/tupynambalucas-dev/agent-mesh/commit/9c99bf8) feat(org): initial enterprise release of GitHub Organization Domain Plugin ([@tupynambalucas](https://github.com/tupynambalucas))
- [a1b2c3d](https://github.com/tupynambalucas-dev/agent-mesh/commit/a1b2c3d) feat(org): provide autonomous skills github-org-operator, github-ruleset-operator, and github-security-auditor ([@tupynambalucas](https://github.com/tupynambalucas))
- **Dual MCP Manifests**: Native `mcp.json` for Antigravity and `mcp_config.json` for Claude Code.

### Committers: 1

- Tupynambá Lucas V. R. ([@tupynambalucas](https://github.com/tupynambalucas))
