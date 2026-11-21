:robot: I have created a release *beep* *boop*
---


<details><summary>agent-mesh: 1.4.0</summary>

## [1.4.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/agent-mesh-v1.3.0...agent-mesh-v1.4.0) (2026-11-21)


### Features & Capabilities

* **agent-mesh:** introduce docusaurus and meta plugins with smart mcp router ([5e27e8e](https://github.com/tupynambalucas-dev/agent-mesh/commit/5e27e8e4f46fd6edf499cddd4c7c4170d8530953))
* **architecture:** enforce bounded context hierarchy and autonomous plugin mandates ([01efcf7](https://github.com/tupynambalucas-dev/agent-mesh/commit/01efcf7b31a1110dcac8a133a0e7d7b53e405503))
* **atelier:** add workspace context detection and npm packaging standards to plugin-architect ([e7205e3](https://github.com/tupynambalucas-dev/agent-mesh/commit/e7205e3b2d9712685495893dfb81c4c55325b8f7))
* **atelier:** enforce target-repo .agents/plans artifact storage ([#63](https://github.com/tupynambalucas-dev/agent-mesh/issues/63)) ([1848855](https://github.com/tupynambalucas-dev/agent-mesh/commit/1848855ffe77d89402eb5caa58c300ff95f5c381))
* **ci:** discover historical packages dynamically via git history ([#43](https://github.com/tupynambalucas-dev/agent-mesh/issues/43)) ([e568eba](https://github.com/tupynambalucas-dev/agent-mesh/commit/e568ebaebad16646db9aa893a02854b24cf417e0))
* **ci:** modularize workflow composite actions and enhance repo standards ([#22](https://github.com/tupynambalucas-dev/agent-mesh/issues/22)) ([a2858ac](https://github.com/tupynambalucas-dev/agent-mesh/commit/a2858acd7fa3c51da4819754680f034d2e8da734))
* **distribution:** implement hybrid umbrella package and presets ([#49](https://github.com/tupynambalucas-dev/agent-mesh/issues/49)) ([4932bea](https://github.com/tupynambalucas-dev/agent-mesh/commit/4932bea2314a7d6e7295f0feb4c8c3cac42b5980))
* **github-org-manager:** add dynamic caller role resolution and document infisical vs env ([5bfc461](https://github.com/tupynambalucas-dev/agent-mesh/commit/5bfc461d20c94dc703b329062e926ecf1ad2b5b2))
* **github-org-manager:** add security-managers team to rbac matrix and automation runbooks ([fd1b3df](https://github.com/tupynambalucas-dev/agent-mesh/commit/fd1b3df4f8dbfb7b3b54db56787c4ec17d1e4b35))
* **github-org-manager:** expand team topology and repository rbac matrix ([353dfc4](https://github.com/tupynambalucas-dev/agent-mesh/commit/353dfc4f9d06cbbd3c8616a0482c8fe94631ad59))
* **identity:** integrate github app token generation and package governance ([#24](https://github.com/tupynambalucas-dev/agent-mesh/issues/24)) ([fbe6f2e](https://github.com/tupynambalucas-dev/agent-mesh/commit/fbe6f2e9f94685e9ea274bf6cfe381773935261a))
* **infisical:** add infisical_list_projects tool and update vault manager docs ([07c02ef](https://github.com/tupynambalucas-dev/agent-mesh/commit/07c02efa7efb275a33cae9ecb9616a4cd3126de8))
* **infisical:** add project provisioning tools (create, get, delete) ([6b82b90](https://github.com/tupynambalucas-dev/agent-mesh/commit/6b82b90ebf2d198762f37380085d0a96fcf1e812))
* initial commit for universal agent-toolkit ([69f408a](https://github.com/tupynambalucas-dev/agent-mesh/commit/69f408affe27c675ada7160880eff09b007ee2f4))
* **mcp-core-github:** enforce tier isolation and ci-bot client resolution ([#46](https://github.com/tupynambalucas-dev/agent-mesh/issues/46)) ([4ff7485](https://github.com/tupynambalucas-dev/agent-mesh/commit/4ff7485fb503049f0bf9fd310de7567fe340c55a))
* **mcp-github:** add base64 and filesystem path private key resolution ([#34](https://github.com/tupynambalucas-dev/agent-mesh/issues/34)) ([0a4cd26](https://github.com/tupynambalucas-dev/agent-mesh/commit/0a4cd265341b017b7c2cda86d2e7d4ceb567f4c7))
* **mcp-playwright:** implement sovereign in-house mcp playwright package and web plugin skills ([8b8b62e](https://github.com/tupynambalucas-dev/agent-mesh/commit/8b8b62e4edcb5353550585ea6b27aaf7f3373e7d))
* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** implement universal layered mcp runner to enable seamless local execution without blocking setup prompt ([37c1ecc](https://github.com/tupynambalucas-dev/agent-mesh/commit/37c1eccf42ccfde26b8a4954e70bdae21a4f585f))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **mcp:** relocate in-house mcp servers and scaffold domain plugins with zero-dockerfile standard ([e89d2e4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e89d2e452162e1b17ecb69975d924578ec83df5f))
* **mcp:** support dual-mode execution and document cluster playwright ([#15](https://github.com/tupynambalucas-dev/agent-mesh/issues/15)) ([981ddfd](https://github.com/tupynambalucas-dev/agent-mesh/commit/981ddfd214ef47de7b16c366933c8ee646cdfcab))
* **mcp:** support universal auth in infisical-mcp and add comprehensive fine-grained env documentation ([019bff8](https://github.com/tupynambalucas-dev/agent-mesh/commit/019bff8393f41da49f1a9d05ead87519357ab93b))
* **mesh:** align package identities, multi-package publish workflow, and mesh nomenclature ([a4a7f36](https://github.com/tupynambalucas-dev/agent-mesh/commit/a4a7f36535ff5e81a4a32ab668205ee0c39ba16b))
* **mesh:** establish plugin independence, playwright isolation, and lifecycle hooks ([#11](https://github.com/tupynambalucas-dev/agent-mesh/issues/11)) ([494eb9a](https://github.com/tupynambalucas-dev/agent-mesh/commit/494eb9a860e5b3fea42fa4579322d8d321428dca))
* **mesh:** purge root plugin artifacts, add cortex-mcp-infisical, and convert to marketplace structure ([b80e97e](https://github.com/tupynambalucas-dev/agent-mesh/commit/b80e97e83e83b0e47060cab56579fec612bd780f))
* **monorepo:** introduce turborepo, pnpm catalogs, packages layout, and bounded AGENTS.md hierarchy ([67da161](https://github.com/tupynambalucas-dev/agent-mesh/commit/67da161ad9b3ec9447bcca98b2873c5266148a03))
* **playwright:** add official mcp references and automated extension token bypass ([36d9554](https://github.com/tupynambalucas-dev/agent-mesh/commit/36d95541f9c874a6f9b92d9520d4b9614efabff7))
* **playwright:** adopt universal zero-path extension bridge and channel architecture ([8e3d84f](https://github.com/tupynambalucas-dev/agent-mesh/commit/8e3d84f841ee0d96fcec9f386641384ec54b14fc))
* **plugins:** decouple 5 modular github plugins and configure release please ([#68](https://github.com/tupynambalucas-dev/agent-mesh/issues/68)) ([84ffc27](https://github.com/tupynambalucas-dev/agent-mesh/commit/84ffc2778bd1ceb1c2ee84e10e3288f63dc0fa16))
* **plugins:** decouple ai meta engineering and introduce repo-manager plugin ([05ea9e9](https://github.com/tupynambalucas-dev/agent-mesh/commit/05ea9e99e9ef59d104fbbf2f46d027b55e356e74))
* **plugins:** enable total autonomy with appsheet playwright and web plugin ([bc35e47](https://github.com/tupynambalucas-dev/agent-mesh/commit/bc35e474f68a371314cb251746c269f670a1a0a6))
* **plugins:** fortify all domain plugins with dedicated rules, references, and enhanced skills ([7f58296](https://github.com/tupynambalucas-dev/agent-mesh/commit/7f58296dadddd83452fb761bea1a3a78cc26dded))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **plugins:** introduce research plugin with firecrawl and context7 ([1c2df5a](https://github.com/tupynambalucas-dev/agent-mesh/commit/1c2df5a61b297914e385783736f457578721db64))
* **plugins:** make skills generic and hermetic per spec v1.0.0 ([#67](https://github.com/tupynambalucas-dev/agent-mesh/issues/67)) ([25070f8](https://github.com/tupynambalucas-dev/agent-mesh/commit/25070f8b01b8ba1382ec2901990b18153ef6ae8e))
* **plugins:** split github into github-manager and github-assistant plugins ([5405c79](https://github.com/tupynambalucas-dev/agent-mesh/commit/5405c7976362055e9ed322aa95ee700eefa61cd6))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))
* **references:** establish centralized github operator architecture for multi-team governance ([efff3cb](https://github.com/tupynambalucas-dev/agent-mesh/commit/efff3cba37172b3f1409f0f8b69a40db8285b23e))
* **release:** adopt zero-script pnpm publishing and add github standards skill ([#20](https://github.com/tupynambalucas-dev/agent-mesh/issues/20)) ([d1d7ed7](https://github.com/tupynambalucas-dev/agent-mesh/commit/d1d7ed73816fcee05a9dd9cf27ed5c7be0866538))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add enterprise package scoping and naming taxonomy to monorepo-architect ([af2bd4f](https://github.com/tupynambalucas-dev/agent-mesh/commit/af2bd4fe32dc3e4a85b6392285f03d02bc983183))
* **repo:** add enterprise readme standard and readme-auditor skill ([#62](https://github.com/tupynambalucas-dev/agent-mesh/issues/62)) ([63bdac9](https://github.com/tupynambalucas-dev/agent-mesh/commit/63bdac9b93cbd894d4a9404aacb85ba076b8d42d))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))
* **runtime:** standardize env templates and add dynamic multi-mode playwright launcher ([#26](https://github.com/tupynambalucas-dev/agent-mesh/issues/26)) ([138b00d](https://github.com/tupynambalucas-dev/agent-mesh/commit/138b00da6ca942e0a70429037029899293f02b53))
* **scripts:** add automated GitHub App manifest provisioning helper ([004d71d](https://github.com/tupynambalucas-dev/agent-mesh/commit/004d71dc43364f6777cc15f5f161dee2f1b23e54))
* **scripts:** add automated workstation bootstrapper and 7-gate pre-flight readiness verifier ([93110e5](https://github.com/tupynambalucas-dev/agent-mesh/commit/93110e54f78fc9260f9e20e34224ea131e8f036f))
* **skills:** add mani-operator and plan-architect domain skills ([#57](https://github.com/tupynambalucas-dev/agent-mesh/issues/57)) ([11f29c4](https://github.com/tupynambalucas-dev/agent-mesh/commit/11f29c4f61ef8ed2c5fd5120efa95540fb65915d))
* **vscode,mcp:** add vscode workspace settings and fallback mcp definitions ([3da43d1](https://github.com/tupynambalucas-dev/agent-mesh/commit/3da43d1b1783e9ef5baa6eb90fe250b93a9d1aaf))


### Bug Fixes & Corrections

* **agent-mesh:** position node shebang at start of router script ([#7](https://github.com/tupynambalucas-dev/agent-mesh/issues/7)) ([88bf1ab](https://github.com/tupynambalucas-dev/agent-mesh/commit/88bf1ab85af1a926f1650c5fb8b27f4851ca4a77))
* **atelier:** refine diataxis quadrant regex to allow root references readme ([#35](https://github.com/tupynambalucas-dev/agent-mesh/issues/35)) ([5af2296](https://github.com/tupynambalucas-dev/agent-mesh/commit/5af2296702915419b926ab658a5e66f6b0420091))
* **ci:** add ^build dependency to turbo typecheck and use GITHUB_TOKEN for npm registry publish ([#41](https://github.com/tupynambalucas-dev/agent-mesh/issues/41)) ([f7a57c3](https://github.com/tupynambalucas-dev/agent-mesh/commit/f7a57c337a335d2965c71cfd31fd1870489efe47))
* **ci:** fix release-please action repository name to googleapis ([#70](https://github.com/tupynambalucas-dev/agent-mesh/issues/70)) ([a5bc930](https://github.com/tupynambalucas-dev/agent-mesh/commit/a5bc9303d7516a241994e1e28fa005add2e59f93))
* **ci:** map secrets to env context before conditional evaluation in publish and admin workflows ([#28](https://github.com/tupynambalucas-dev/agent-mesh/issues/28)) ([fd8c4f2](https://github.com/tupynambalucas-dev/agent-mesh/commit/fd8c4f26ba8302f7465812dd1aa541d4a8581433))
* **ci:** reconcile package registry and purge obsolete packages ([#42](https://github.com/tupynambalucas-dev/agent-mesh/issues/42)) ([92ffafc](https://github.com/tupynambalucas-dev/agent-mesh/commit/92ffafc6973e8804ddc1264346348338f4e1647b))
* **ci:** remove glob comment delimiter in manage-packages.js ([#44](https://github.com/tupynambalucas-dev/agent-mesh/issues/44)) ([c60c0a3](https://github.com/tupynambalucas-dev/agent-mesh/commit/c60c0a3a13f89c58e71f85a62f53cedfb3919e9b))
* **ci:** strip utf-8 bom and configure ci-bot app token for release-please ([#72](https://github.com/tupynambalucas-dev/agent-mesh/issues/72)) ([31f9d93](https://github.com/tupynambalucas-dev/agent-mesh/commit/31f9d93b7dab7d8e40d70901807a60d976fb7e6a))
* **ci:** synchronize pnpm lockfile, fix playwright config zod transform, and constrain dependabot majors ([#18](https://github.com/tupynambalucas-dev/agent-mesh/issues/18)) ([2974aa7](https://github.com/tupynambalucas-dev/agent-mesh/commit/2974aa769c90426f451dbcd87556dc1260849a8a))
* **hooks:** add word boundary to git push branch protection regex ([#33](https://github.com/tupynambalucas-dev/agent-mesh/issues/33)) ([aab25c6](https://github.com/tupynambalucas-dev/agent-mesh/commit/aab25c6febf380bb21a22809137f32e7af48e9f2))
* **mcp-playwright:** ensure resilient fallback to @playwright/mcp when unbundled ([#54](https://github.com/tupynambalucas-dev/agent-mesh/issues/54)) ([9a97d53](https://github.com/tupynambalucas-dev/agent-mesh/commit/9a97d5348b64cda1b753a3523e867034b59b8085))
* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))
* **provisioner:** add required hook_attributes url and safe json textarea serialization ([cd5f29d](https://github.com/tupynambalucas-dev/agent-mesh/commit/cd5f29d48c69fc8c6fc0bda8bae7ab654c8c360e))
* **provisioner:** clean manifest permissions to valid GitHub App scopes ([db0f841](https://github.com/tupynambalucas-dev/agent-mesh/commit/db0f841f0eda195f6fbc423485ab930ee6a259cb))
* **provisioner:** improve browser launch and auto open installation page ([83b93e7](https://github.com/tupynambalucas-dev/agent-mesh/commit/83b93e729eebfbe748ba0ea3af7b29337f600590))
* **publish:** bump agent-mesh to 1.0.1 and add publish-root script ([#50](https://github.com/tupynambalucas-dev/agent-mesh/issues/50)) ([a5d4c54](https://github.com/tupynambalucas-dev/agent-mesh/commit/a5d4c5430221a801d1eb9e1d9c146e5ccb775357))
* **publish:** bump agent-mesh to 1.1.0 and capture publish output ([#51](https://github.com/tupynambalucas-dev/agent-mesh/issues/51)) ([99005f2](https://github.com/tupynambalucas-dev/agent-mesh/commit/99005f2dd2f8aa515dd24831a0ea226465fa7039))
* **router:** enforce repository sovereignty and relative depth bounds in AGENTS.md ([25bae9a](https://github.com/tupynambalucas-dev/agent-mesh/commit/25bae9a55fd3bbf3c359c3f26b111f59cb13b8dc))
* **vscode:** enable deep workspace search indexing without ignore file restrictions ([#8](https://github.com/tupynambalucas-dev/agent-mesh/issues/8)) ([c939d67](https://github.com/tupynambalucas-dev/agent-mesh/commit/c939d6784f8fe68944398889273a5ebf94b2deea))


### Refactoring & Internal Architecture

* **mcp-github:** standardize app env vars and workflow secrets without github prefix ([#36](https://github.com/tupynambalucas-dev/agent-mesh/issues/36)) ([d83877a](https://github.com/tupynambalucas-dev/agent-mesh/commit/d83877af3710b269e76cf6d14df464060253b9b6))
* **mcp:** align package names with agent-mcp prefix ([f976a0d](https://github.com/tupynambalucas-dev/agent-mesh/commit/f976a0d28871b2cd517e11be9c4dc82717bd3278))
* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))
* **plugins:** enhance portability and generic execution across organizations ([#61](https://github.com/tupynambalucas-dev/agent-mesh/issues/61)) ([953397b](https://github.com/tupynambalucas-dev/agent-mesh/commit/953397b9ab9a5404eebf76133381d460d52e833f))
* **plugins:** unify repo and github-repo into consolidated domain plugin ([#69](https://github.com/tupynambalucas-dev/agent-mesh/issues/69)) ([9260b72](https://github.com/tupynambalucas-dev/agent-mesh/commit/9260b7236f436634e10f5661b5a666a3e07c535b))
* **scripts:** relocate workstation scripts to governance repository ([#9](https://github.com/tupynambalucas-dev/agent-mesh/issues/9)) ([1c32cb7](https://github.com/tupynambalucas-dev/agent-mesh/commit/1c32cb727e630cced5e879134e9f4eab7b77abf8))


### Documentation & Specifications

* **agents:** document plan dual-storage and register plugins ([#60](https://github.com/tupynambalucas-dev/agent-mesh/issues/60)) ([aeea9cb](https://github.com/tupynambalucas-dev/agent-mesh/commit/aeea9cba119f293df2adad85c4ad0dade3b1e83e))
* **analyses:** add recursive AGENTS.md and README.md governance matrix ([#39](https://github.com/tupynambalucas-dev/agent-mesh/issues/39)) ([b2ceab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/b2ceab4107ed527448b0a1b001df94933f1fe57d))
* **analyses:** author comparative analysis on monolithic vs scoped mcp servers for github apps ([#37](https://github.com/tupynambalucas-dev/agent-mesh/issues/37)) ([1a1a825](https://github.com/tupynambalucas-dev/agent-mesh/commit/1a1a82597da41533eab8ecb79d5dfb330dd306a9))
* **analyses:** document env hygiene and router deprecation roadmap ([#16](https://github.com/tupynambalucas-dev/agent-mesh/issues/16)) ([44200f0](https://github.com/tupynambalucas-dev/agent-mesh/commit/44200f0e1b583eb19c47a87999c51e7c695a0b4d))
* **analyses:** document playwright isolation and lifecycle hooks architecture ([#14](https://github.com/tupynambalucas-dev/agent-mesh/issues/14)) ([dc097ac](https://github.com/tupynambalucas-dev/agent-mesh/commit/dc097acbc4823dddb6f82ee495a3f0ee97c14820))
* **analyses:** incorporate bounded context monorepo directory taxonomy into mcp architecture record ([#38](https://github.com/tupynambalucas-dev/agent-mesh/issues/38)) ([efcda74](https://github.com/tupynambalucas-dev/agent-mesh/commit/efcda740fdef9cf9c86699a4d584b2e9ca86cc7b))
* **architecture:** adopt agent-mesh naming and agent-plugin prefix with pnpm dlx ([248875e](https://github.com/tupynambalucas-dev/agent-mesh/commit/248875e2d803691e37c1dcb1b7640b131bda257c))
* **architecture:** consolidate cortex mcp ssot and plugin package distribution ([84df288](https://github.com/tupynambalucas-dev/agent-mesh/commit/84df28862d16dd00fdc5d888a2019a2b194c4513))
* **architecture:** define cortex gateway fallback and self-contained agent mesh ([1c73fe5](https://github.com/tupynambalucas-dev/agent-mesh/commit/1c73fe53565d97f343df6a54a23c42cca05e3171))
* **architecture:** document marketplace layout and granular consumption patterns ([1147f87](https://github.com/tupynambalucas-dev/agent-mesh/commit/1147f874705e298137c975f50e0866226fa016dd))
* **architecture:** refine cortex mcp services and dual-target pattern ([9b7108d](https://github.com/tupynambalucas-dev/agent-mesh/commit/9b7108de972245b9fe72b572586cd71a072eecba))
* **architecture:** specify agent monorepo structure and github app integration ([dbc50ed](https://github.com/tupynambalucas-dev/agent-mesh/commit/dbc50ed2654225393765f8b7e1f1c917852f8cef))
* **architecture:** specify zero-dockerfile and agent-mesh servers layout ([c293893](https://github.com/tupynambalucas-dev/agent-mesh/commit/c29389383c6d9418c05c70bc3f04f6c5c557eed0))
* **atelier,repo:** codify artifact dual-storage and plan topologies ([#58](https://github.com/tupynambalucas-dev/agent-mesh/issues/58)) ([99d4547](https://github.com/tupynambalucas-dev/agent-mesh/commit/99d45475c038eb9cde298879b7b601f48e1d9304))
* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **env:** add github app machine identity variables to template ([#25](https://github.com/tupynambalucas-dev/agent-mesh/issues/25)) ([94fc0ca](https://github.com/tupynambalucas-dev/agent-mesh/commit/94fc0cab38450fef6fdd902eaaf69108d9fa36f2))
* **env:** reorganize env templates partitioned by domain plugin ([#56](https://github.com/tupynambalucas-dev/agent-mesh/issues/56)) ([3fd4543](https://github.com/tupynambalucas-dev/agent-mesh/commit/3fd4543dff3fd7de1df2c00c278b14e285ea3fc7))
* **github-org-manager:** add developer onboarding and gh cli runbook ([7d2cf0a](https://github.com/tupynambalucas-dev/agent-mesh/commit/7d2cf0ab9ac37041bb8fab3998434e42d9709673))
* **governance:** update org-core references to mani workspace orchestration ([#6](https://github.com/tupynambalucas-dev/agent-mesh/issues/6)) ([4705907](https://github.com/tupynambalucas-dev/agent-mesh/commit/4705907fc41c3b9f0667e32e5684d580d05a457e))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **mesh:** restructure references into diataxis and enforce 3-layer ceiling ([#10](https://github.com/tupynambalucas-dev/agent-mesh/issues/10)) ([86b990f](https://github.com/tupynambalucas-dev/agent-mesh/commit/86b990faaaaefcc989eecb9d177e8613b928a4fe))
* **plans:** add agent plugins distribution presets and external consumption architecture ([#47](https://github.com/tupynambalucas-dev/agent-mesh/issues/47)) ([187865e](https://github.com/tupynambalucas-dev/agent-mesh/commit/187865ea8cdcdabe6ff4e6d3525be752ecab77ca))
* **plans:** add github packages visibility and dynamic lifecycle specification ([#45](https://github.com/tupynambalucas-dev/agent-mesh/issues/45)) ([df47398](https://github.com/tupynambalucas-dev/agent-mesh/commit/df473982ae490c21ae127d730cb9f38100b9bc6b))
* **playwright:** add vivaldi cdp integration and browser ecosystem evaluation ([61749bc](https://github.com/tupynambalucas-dev/agent-mesh/commit/61749bca52d8e4bf815cfba463911b7d99b7fb52))
* **playwright:** document chromium security mandate for remote debugging flag ([87dd85b](https://github.com/tupynambalucas-dev/agent-mesh/commit/87dd85b33f6d336fc5ff83ab902ef95991273faa))
* **playwright:** update context routers and documentation for dynamic multi-mode execution and reference lifecycle ([#27](https://github.com/tupynambalucas-dev/agent-mesh/issues/27)) ([914b9a9](https://github.com/tupynambalucas-dev/agent-mesh/commit/914b9a9bd085329eb7d02bf8f47fbe88469e3679))
* **plugins:** expand hybrid umbrella specification and cross-repo mcp execution ([#48](https://github.com/tupynambalucas-dev/agent-mesh/issues/48)) ([9341c51](https://github.com/tupynambalucas-dev/agent-mesh/commit/9341c51ceb84375ec1aa784ac3d9909d36684602))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
* **readme:** detail secret governance and multi-context execution modes ([2a52180](https://github.com/tupynambalucas-dev/agent-mesh/commit/2a521809ac03a874d63d994c26f0e7c687ee0d5f))
* **references:** add authoritative GitHub Apps configuration runbook ([d92cca6](https://github.com/tupynambalucas-dev/agent-mesh/commit/d92cca6b8cc9874e5e60305eb446029a1b6958ab))
* **references:** add github app architecture and least-privilege governance guide ([5be15d7](https://github.com/tupynambalucas-dev/agent-mesh/commit/5be15d7530866935211af269f59aefb14e7e14c6))
* **references:** add in-house playwright mcp and dual-mode spec ([2c2ea5a](https://github.com/tupynambalucas-dev/agent-mesh/commit/2c2ea5a00d99640f0160088c04e77a48ece69767))
* **references:** evaluate github mcp ecosystem and domain 3 cli justification ([e3601f2](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3601f24f2b20b83cc8d9f53cc3eaa52d4560951))
* **references:** tailor github app governance for org-manager and mcp integration ([2adf3ea](https://github.com/tupynambalucas-dev/agent-mesh/commit/2adf3ea70b9834c0d95d22ae1c3f6a065910a771))
* **references:** update GitHub Apps manual configuration runbook with UI steps ([7cc148e](https://github.com/tupynambalucas-dev/agent-mesh/commit/7cc148ecf7be1ff1e4f2affaa57705ebbd3ccda3))
* **routers:** align mcp routers, skills and readme references with enterprise naming ([52d954f](https://github.com/tupynambalucas-dev/agent-mesh/commit/52d954f3c968ee9346ae863ccfd30b062343e8a9))
* **scripts:** remove mcp-runner catalog references ([#5](https://github.com/tupynambalucas-dev/agent-mesh/issues/5)) ([dc8f218](https://github.com/tupynambalucas-dev/agent-mesh/commit/dc8f218075cbce086eec5112a977ef97535be72c))
* **skills:** align github-flow-operator and onboarding with mani multi-repo model ([#2](https://github.com/tupynambalucas-dev/agent-mesh/issues/2)) ([6db3351](https://github.com/tupynambalucas-dev/agent-mesh/commit/6db33515a1edb8a14064b4b7026a015f86be6614))
* **verification:** record package publish results and submodule migration alignment ([ebd8b82](https://github.com/tupynambalucas-dev/agent-mesh/commit/ebd8b825f021ec12538c10ef7290a76e6f439f0d))
</details>

<details><summary>mcp-appsheet: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-appsheet-v1.1.0...mcp-appsheet-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>mcp-firecrawl: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-firecrawl-v1.1.0...mcp-firecrawl-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>mcp-github-flow: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-github-flow-v1.1.0...mcp-github-flow-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>mcp-github-org: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-github-org-v1.1.0...mcp-github-org-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>mcp-gwork: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-gwork-v1.1.0...mcp-gwork-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>mcp-infisical: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-infisical-v1.1.0...mcp-infisical-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>mcp-linkedin: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-linkedin-v1.1.0...mcp-linkedin-v1.2.0) (2026-11-21)


### Features & Capabilities

* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
</details>

<details><summary>mcp-memory: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-memory-v1.1.0...mcp-memory-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>mcp-playwright: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/mcp-playwright-v1.1.0...mcp-playwright-v1.2.0) (2026-11-21)


### Features & Capabilities

* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Bug Fixes & Corrections

* **mcp-playwright:** ensure resilient fallback to @playwright/mcp when unbundled ([#54](https://github.com/tupynambalucas-dev/agent-mesh/issues/54)) ([9a97d53](https://github.com/tupynambalucas-dev/agent-mesh/commit/9a97d5348b64cda1b753a3523e867034b59b8085))
* **mcp:** persist minified self-contained bundles for git package distribution ([#53](https://github.com/tupynambalucas-dev/agent-mesh/issues/53)) ([2e85aba](https://github.com/tupynambalucas-dev/agent-mesh/commit/2e85aba5247cf82ace4271829150249a254c0285))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
</details>

<details><summary>plugin-appsheet: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-appsheet-v1.1.0...plugin-appsheet-v1.2.0) (2026-11-21)


### Features & Capabilities

* **architecture:** enforce bounded context hierarchy and autonomous plugin mandates ([01efcf7](https://github.com/tupynambalucas-dev/agent-mesh/commit/01efcf7b31a1110dcac8a133a0e7d7b53e405503))
* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **mesh:** establish plugin independence, playwright isolation, and lifecycle hooks ([#11](https://github.com/tupynambalucas-dev/agent-mesh/issues/11)) ([494eb9a](https://github.com/tupynambalucas-dev/agent-mesh/commit/494eb9a860e5b3fea42fa4579322d8d321428dca))
* **monorepo:** introduce turborepo, pnpm catalogs, packages layout, and bounded AGENTS.md hierarchy ([67da161](https://github.com/tupynambalucas-dev/agent-mesh/commit/67da161ad9b3ec9447bcca98b2873c5266148a03))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **playwright:** update context routers and documentation for dynamic multi-mode execution and reference lifecycle ([#27](https://github.com/tupynambalucas-dev/agent-mesh/issues/27)) ([914b9a9](https://github.com/tupynambalucas-dev/agent-mesh/commit/914b9a9bd085329eb7d02bf8f47fbe88469e3679))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
</details>

<details><summary>plugin-atelier: 1.2.0</summary>

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
</details>

<details><summary>plugin-docusaurus: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-docusaurus-v1.1.0...plugin-docusaurus-v1.2.0) (2026-11-21)


### Features & Capabilities

* **architecture:** enforce bounded context hierarchy and autonomous plugin mandates ([01efcf7](https://github.com/tupynambalucas-dev/agent-mesh/commit/01efcf7b31a1110dcac8a133a0e7d7b53e405503))
* **monorepo:** introduce turborepo, pnpm catalogs, packages layout, and bounded AGENTS.md hierarchy ([67da161](https://github.com/tupynambalucas-dev/agent-mesh/commit/67da161ad9b3ec9447bcca98b2873c5266148a03))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))
* **plugins:** enhance portability and generic execution across organizations ([#61](https://github.com/tupynambalucas-dev/agent-mesh/issues/61)) ([953397b](https://github.com/tupynambalucas-dev/agent-mesh/commit/953397b9ab9a5404eebf76133381d460d52e833f))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
</details>

<details><summary>plugin-github-actions: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-github-actions-v1.1.0...plugin-github-actions-v1.2.0) (2026-11-21)


### Features & Capabilities

* **plugins:** decouple 5 modular github plugins and configure release please ([#68](https://github.com/tupynambalucas-dev/agent-mesh/issues/68)) ([84ffc27](https://github.com/tupynambalucas-dev/agent-mesh/commit/84ffc2778bd1ceb1c2ee84e10e3288f63dc0fa16))


### Refactoring & Internal Architecture

* **plugins:** unify repo and github-repo into consolidated domain plugin ([#69](https://github.com/tupynambalucas-dev/agent-mesh/issues/69)) ([9260b72](https://github.com/tupynambalucas-dev/agent-mesh/commit/9260b7236f436634e10f5661b5a666a3e07c535b))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
</details>

<details><summary>plugin-github-flow: 1.2.0</summary>

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
</details>

<details><summary>plugin-github-org: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-github-org-v1.1.0...plugin-github-org-v1.2.0) (2026-11-21)


### Features & Capabilities

* **identity:** integrate github app token generation and package governance ([#24](https://github.com/tupynambalucas-dev/agent-mesh/issues/24)) ([fbe6f2e](https://github.com/tupynambalucas-dev/agent-mesh/commit/fbe6f2e9f94685e9ea274bf6cfe381773935261a))
* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **plugins:** decouple 5 modular github plugins and configure release please ([#68](https://github.com/tupynambalucas-dev/agent-mesh/issues/68)) ([84ffc27](https://github.com/tupynambalucas-dev/agent-mesh/commit/84ffc2778bd1ceb1c2ee84e10e3288f63dc0fa16))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **plugins:** make skills generic and hermetic per spec v1.0.0 ([#67](https://github.com/tupynambalucas-dev/agent-mesh/issues/67)) ([25070f8](https://github.com/tupynambalucas-dev/agent-mesh/commit/25070f8b01b8ba1382ec2901990b18153ef6ae8e))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))


### Bug Fixes & Corrections

* **ci:** strip utf-8 bom and configure ci-bot app token for release-please ([#72](https://github.com/tupynambalucas-dev/agent-mesh/issues/72)) ([31f9d93](https://github.com/tupynambalucas-dev/agent-mesh/commit/31f9d93b7dab7d8e40d70901807a60d976fb7e6a))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))
* **plugins:** enhance portability and generic execution across organizations ([#61](https://github.com/tupynambalucas-dev/agent-mesh/issues/61)) ([953397b](https://github.com/tupynambalucas-dev/agent-mesh/commit/953397b9ab9a5404eebf76133381d460d52e833f))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **mesh:** restructure references into diataxis and enforce 3-layer ceiling ([#10](https://github.com/tupynambalucas-dev/agent-mesh/issues/10)) ([86b990f](https://github.com/tupynambalucas-dev/agent-mesh/commit/86b990faaaaefcc989eecb9d177e8613b928a4fe))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
* **routers:** align mcp routers, skills and readme references with enterprise naming ([52d954f](https://github.com/tupynambalucas-dev/agent-mesh/commit/52d954f3c968ee9346ae863ccfd30b062343e8a9))
* **skills:** align github-flow-operator and onboarding with mani multi-repo model ([#2](https://github.com/tupynambalucas-dev/agent-mesh/issues/2)) ([6db3351](https://github.com/tupynambalucas-dev/agent-mesh/commit/6db33515a1edb8a14064b4b7026a015f86be6614))
</details>

<details><summary>plugin-github-releases: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-github-releases-v1.1.0...plugin-github-releases-v1.2.0) (2026-11-21)


### Features & Capabilities

* **plugins:** decouple 5 modular github plugins and configure release please ([#68](https://github.com/tupynambalucas-dev/agent-mesh/issues/68)) ([84ffc27](https://github.com/tupynambalucas-dev/agent-mesh/commit/84ffc2778bd1ceb1c2ee84e10e3288f63dc0fa16))


### Bug Fixes & Corrections

* **ci:** strip utf-8 bom and configure ci-bot app token for release-please ([#72](https://github.com/tupynambalucas-dev/agent-mesh/issues/72)) ([31f9d93](https://github.com/tupynambalucas-dev/agent-mesh/commit/31f9d93b7dab7d8e40d70901807a60d976fb7e6a))


### Refactoring & Internal Architecture

* **plugins:** unify repo and github-repo into consolidated domain plugin ([#69](https://github.com/tupynambalucas-dev/agent-mesh/issues/69)) ([9260b72](https://github.com/tupynambalucas-dev/agent-mesh/commit/9260b7236f436634e10f5661b5a666a3e07c535b))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
</details>

<details><summary>plugin-github-repo: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-github-repo-v1.1.0...plugin-github-repo-v1.2.0) (2026-11-21)


### Features & Capabilities

* **plugins:** decouple 5 modular github plugins and configure release please ([#68](https://github.com/tupynambalucas-dev/agent-mesh/issues/68)) ([84ffc27](https://github.com/tupynambalucas-dev/agent-mesh/commit/84ffc2778bd1ceb1c2ee84e10e3288f63dc0fa16))


### Refactoring & Internal Architecture

* **plugins:** unify repo and github-repo into consolidated domain plugin ([#69](https://github.com/tupynambalucas-dev/agent-mesh/issues/69)) ([9260b72](https://github.com/tupynambalucas-dev/agent-mesh/commit/9260b7236f436634e10f5661b5a666a3e07c535b))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
</details>

<details><summary>plugin-gwork: 1.2.0</summary>

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
</details>

<details><summary>plugin-profile: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-profile-v1.1.0...plugin-profile-v1.2.0) (2026-11-21)


### Features & Capabilities

* **profile:** implement developer profile and career advancement plugin with linkedin mcp ([#64](https://github.com/tupynambalucas-dev/agent-mesh/issues/64)) ([e3d6ac4](https://github.com/tupynambalucas-dev/agent-mesh/commit/e3d6ac424d6631466e3017d3b8dcb8df5b9febfe))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
</details>

<details><summary>plugin-research: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-research-v1.1.0...plugin-research-v1.2.0) (2026-11-21)


### Features & Capabilities

* **architecture:** enforce bounded context hierarchy and autonomous plugin mandates ([01efcf7](https://github.com/tupynambalucas-dev/agent-mesh/commit/01efcf7b31a1110dcac8a133a0e7d7b53e405503))
* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **mesh:** establish plugin independence, playwright isolation, and lifecycle hooks ([#11](https://github.com/tupynambalucas-dev/agent-mesh/issues/11)) ([494eb9a](https://github.com/tupynambalucas-dev/agent-mesh/commit/494eb9a860e5b3fea42fa4579322d8d321428dca))
* **monorepo:** introduce turborepo, pnpm catalogs, packages layout, and bounded AGENTS.md hierarchy ([67da161](https://github.com/tupynambalucas-dev/agent-mesh/commit/67da161ad9b3ec9447bcca98b2873c5266148a03))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
</details>

<details><summary>plugin-secrets: 1.2.0</summary>

## [1.2.0](https://github.com/tupynambalucas-dev/agent-mesh/compare/plugin-secrets-v1.1.0...plugin-secrets-v1.2.0) (2026-11-21)


### Features & Capabilities

* **architecture:** enforce bounded context hierarchy and autonomous plugin mandates ([01efcf7](https://github.com/tupynambalucas-dev/agent-mesh/commit/01efcf7b31a1110dcac8a133a0e7d7b53e405503))
* **mcp:** implement sovereign launchers and self-contained bundling ([#52](https://github.com/tupynambalucas-dev/agent-mesh/issues/52)) ([320fab4](https://github.com/tupynambalucas-dev/agent-mesh/commit/320fab447dc1304caafc86973bca91682d17f528))
* **mcp:** partition into mcp/servers and mcp/core with scoped github-org and github-flow servers ([#40](https://github.com/tupynambalucas-dev/agent-mesh/issues/40)) ([42ed739](https://github.com/tupynambalucas-dev/agent-mesh/commit/42ed739c5220b663e50d95876f73470bd083dd84))
* **monorepo:** introduce turborepo, pnpm catalogs, packages layout, and bounded AGENTS.md hierarchy ([67da161](https://github.com/tupynambalucas-dev/agent-mesh/commit/67da161ad9b3ec9447bcca98b2873c5266148a03))
* **plugins:** implement sovereign per-plugin launchers and retire root router ([#17](https://github.com/tupynambalucas-dev/agent-mesh/issues/17)) ([bfa15eb](https://github.com/tupynambalucas-dev/agent-mesh/commit/bfa15eb7bb91b5ad6e7b7c1d2a7a6e40eba57633))
* **plugins:** make skills generic and hermetic per spec v1.0.0 ([#67](https://github.com/tupynambalucas-dev/agent-mesh/issues/67)) ([25070f8](https://github.com/tupynambalucas-dev/agent-mesh/commit/25070f8b01b8ba1382ec2901990b18153ef6ae8e))
* **release:** author v1.0.0 changelogs and update package manifest files ([#23](https://github.com/tupynambalucas-dev/agent-mesh/issues/23)) ([d3a0f02](https://github.com/tupynambalucas-dev/agent-mesh/commit/d3a0f025a1fc3f36437e28870a6a76ca51a5e926))
* **repo:** add monorepo-architect skill, upgrade to typescript 6.0.3, and adopt project references ([67fc682](https://github.com/tupynambalucas-dev/agent-mesh/commit/67fc6827cd449fe2ab3b75476ea3ff2fc6fdb359))
* **runtime:** standardize env templates and add dynamic multi-mode playwright launcher ([#26](https://github.com/tupynambalucas-dev/agent-mesh/issues/26)) ([138b00d](https://github.com/tupynambalucas-dev/agent-mesh/commit/138b00da6ca942e0a70429037029899293f02b53))


### Refactoring & Internal Architecture

* **naming:** align monorepo, plugins, mcps, and skills with enterprise conventions ([066894f](https://github.com/tupynambalucas-dev/agent-mesh/commit/066894fbcfe4ea77799a11c628b5053e080a3ad5))


### Documentation & Specifications

* **changelog:** standardize changelog author attribution and monorepo hierarchy ([#71](https://github.com/tupynambalucas-dev/agent-mesh/issues/71)) ([986fa71](https://github.com/tupynambalucas-dev/agent-mesh/commit/986fa71917b301712ce160987a7b8724fb154670))
* **mesh:** align docs with umbrella package and sovereign launchers ([#55](https://github.com/tupynambalucas-dev/agent-mesh/issues/55)) ([a33b2f6](https://github.com/tupynambalucas-dev/agent-mesh/commit/a33b2f6d71340b63e018d1023ba9006fa01d4194))
* **plugins:** expand plugin readmes with comprehensive skills layouts and configurations ([d44fe0c](https://github.com/tupynambalucas-dev/agent-mesh/commit/d44fe0c6e279d2be582fe0ec5618bee54a03b950))
* **routers:** align mcp routers, skills and readme references with enterprise naming ([52d954f](https://github.com/tupynambalucas-dev/agent-mesh/commit/52d954f3c968ee9346ae863ccfd30b062343e8a9))
</details>

<details><summary>plugin-web: 1.2.0</summary>

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
</details>

---
This PR was generated with [Release Please](https://github.com/googleapis/release-please). See [documentation](https://github.com/googleapis/release-please#release-please).