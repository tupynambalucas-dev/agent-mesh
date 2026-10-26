# Cortex MCP Engine & Self-Contained Agent Mesh Master Architecture

This specification establishes the authoritative, enterprise-grade architecture linking the **Cortex MCP Control Plane**
in [platform/hub/cortex/mcp](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/platform/hub/cortex/mcp)
with the **Agent Mesh Capability Workspace** in `agent-mesh` (formerly `agent-toolkit`).

It codifies eight foundational architectural decisions:
1. **Renaming to `agent-mesh`**: Resolves semantic collision with `platform` and `cortex`. The repository represents the decentralized, composable mesh of agent plugins, personas, rules, skills, and Model Context Protocol (MCP) tool packages.
2. **Consolidation of MCP Servers in `agent-mesh/mcp/*`**: All in-house MCP servers (`github`, `firecrawl`, `memory`, `google-workspace`, `appsheet`) reside exclusively in `agent-mesh/mcp/*` as clean TypeScript packages published to the GitHub Packages registry (`npm.pkg.github.com`).
3. **Complete Elimination of Custom Dockerfiles**: Eliminates all custom Dockerfiles across the MCP ecosystem. Upstream servers use official pre-built container images (`github`, `grafana`, `kubectl`, `playwright`), while in-house TypeScript MCP servers execute directly on official `node:22-alpine` base images using declarative Kubernetes manifests with `npx -y`.
4. **Purging of `platform/hub/cortex/mcp/services/`**: The `platform` repository ceases hosting application tool code, retaining strictly the **Control Plane Infrastructure**: Envoy `agentgateway`, gRPC `mcp-guardrails`, developer `inspector`, and declarative GitOps manifests in `platform/k8s/manifests/hub/cortex/mcp/`.
5. **Custom GitHub App MCP (`mcp/github`)**: Upgrades from Fine-Grained Personal Access Tokens (blocked by HTTP 403 on organizational security endpoints) to a dedicated in-house GitHub App operator (`@tupynambalucas-dev/cortex-mcp-github`) powered by `@octokit/auth-app`.
6. **Enterprise Google Workspace & AppSheet MCPs**: Implements dedicated packages for Google Workspace automation (`@tupynambalucas-dev/cortex-mcp-gwork`) and AppSheet hybrid prompt-to-app lifecycle management (`@tupynambalucas-dev/cortex-mcp-appsheet`).
7. **Environment-Aware Playwright Isolation**: Replaces custom browser Dockerfiles with the official Microsoft container (`mcr.microsoft.com/playwright/mcp:latest`) in Kubernetes, while supporting interactive headed/DevTools execution locally.
8. **Autonomous Plugins with `agent-plugin-` Prefix**: Every plugin in `agent-mesh/plugins/<domain>` is an independent pnpm workspace package named `@tupynambalucas-dev/agent-plugin-<domain>`, containing modularized, professional skills.

---

## 1. High-Level Architecture & Component Boundaries

```mermaid
flowchart TD
    subgraph AgentMeshRepo ["agent-mesh/ (Autonomous Agent Capabilities Monorepo)"]
        subgraph MCPWorkspace ["mcp/ (Clean TypeScript MCP Packages - SSOT)"]
            MCPGitHub["mcp/github (@tupynambalucas-dev/cortex-mcp-github)"]
            MCPFirecrawl["mcp/firecrawl (@tupynambalucas-dev/cortex-mcp-firecrawl)"]
            MCPMemory["mcp/memory (@tupynambalucas-dev/cortex-mcp-memory)"]
            MCPGoogleWorkspace["mcp/google-workspace (@tupynambalucas-dev/cortex-mcp-gwork)"]
            MCPAppSheet["mcp/appsheet (@tupynambalucas-dev/cortex-mcp-appsheet)"]
        end

        subgraph PluginsWorkspace ["plugins/ (Self-Contained Antigravity & agy Plugins)"]
            PluginGH["@tupynambalucas-dev/agent-plugin-github"]
            PluginDocusaurus["@tupynambalucas-dev/agent-plugin-docusaurus"]
            PluginMeta["@tupynambalucas-dev/agent-plugin-meta (Router, Skills, Markdown)"]
            PluginWeb["@tupynambalucas-dev/agent-plugin-web (Firecrawl / Browser)"]
            PluginKnowledge["@tupynambalucas-dev/agent-plugin-knowledge (Memory / Context7)"]
            PluginGoogleWorkspace["@tupynambalucas-dev/agent-plugin-google-workspace"]
            PluginSecrets["@tupynambalucas-dev/agent-plugin-secrets (Infisical)"]
        end

        MCPWorkspace -. "pnpm publish (dist/index.js + bin: dist/bin.js)" .-> GitHubPackages["GitHub Packages Registry (npm.pkg.github.com)"]
    end

    subgraph PlatformRepo ["platform/ (Cloud Services, GitOps & Infrastructure Monorepo)"]
        subgraph CortexControlPlane ["platform/hub/cortex/mcp/ (Control Plane Infrastructure Only)"]
            ExtMCPGuardrails["guardrails/ (gRPC ExtMCP Transparent Policy Proxy :9001)"]
            MCPInspector["inspector/ (Web UI for Dev Testing :6274)"]
        end

        subgraph KubernetesCluster ["Kubernetes Manifests (Zero Custom Dockerfiles)"]
            K8sGitHub["mcp-github (node:22-alpine + npx cortex-mcp-github)"]
            K8sFirecrawl["mcp-firecrawl (node:22-alpine + npx cortex-mcp-firecrawl)"]
            K8sMemory["mcp-memory (node:22-alpine + npx cortex-mcp-memory)"]
            K8sGoogleWorkspace["mcp-google-workspace (node:22-alpine + npx cortex-mcp-gwork)"]
            K8sAppSheet["mcp-appsheet (node:22-alpine + npx cortex-mcp-appsheet)"]
            K8sContext7["mcp-context7 (node:22-alpine + npx @upstash/context7-mcp)"]
            K8sPlaywright["mcp-playwright (image: mcr.microsoft.com/playwright/mcp:latest)"]
            K8sGrafana["mcp-grafana (image: grafana/mcp-grafana:latest)"]
            K8sKubectl["mcp-kubectl (image: ghcr.io/rohitg00/kubectl-mcp-server:latest)"]
        end

        EnvoyGateway["AgentGateway (Envoy Ingress :8080)"]
        KubernetesCluster -->|HTTP / Streamable HTTP :8080| EnvoyGateway
        ExtMCPGuardrails -.->|Request Mutation & Security Policies| EnvoyGateway
    end

    GitHubPackages ==>|npx -y on container start| KubernetesCluster
    GitHubPackages ==>|pnpm dlx on-demand execution (Stdio fallback)| PluginsWorkspace
    EnvoyGateway ==>|Direct HTTP / SSE streaming (Cluster mode)| PluginsWorkspace
```

---

## 2. Resolving Repository Naming & Structural Boundaries

To eliminate architectural overlap across organizational repositories, the taxonomy is strictly aligned:

| Submodule | Architectural Role | Bounded Context Contents |
| :--- | :--- | :--- |
| **`platform/`** | **Cloud-Native Infrastructure & Control Plane** | Envoy `agentgateway`, gRPC `guardrails`, MongoDB vector store, Kubernetes Helm/Kustomize manifests, Traefik ingress, Cert-Manager, studio web apps, corporate services. |
| **`agent-mesh/`** *(formerly `agent-toolkit`)* | **AI Agent Substrate & Capability Monorepo** | Antigravity plugins (`plugins/*`), Model Context Protocol servers (`mcp/*`), skills, behavioral rules, and smart gateway fallback routers. |
| **`docs/`** | **Sovereign Documentation Hub** | Docusaurus v3 knowledge base, MDX specifications, Crowdin localization pipelines. |
| **`.github/`** | **Enterprise Governance** | Organization standards, GitHub Actions reusable workflows, community health, and public profiles. |

---

## 3. The Zero-Dockerfile Architecture: Pure Manifest Execution

A major optimization in this architecture is the **complete elimination of custom Dockerfiles** for all MCP servers:

### 3.1 Upstream & In-House MCP Execution Matrix

| MCP Service | Previous State in `platform` | New Zero-Dockerfile Strategy | Kubernetes Manifest Configuration (`platform/k8s/manifests/hub/cortex/mcp/`) |
| :--- | :--- | :--- | :--- |
| **`github`** | Custom Dockerfile wrapping upstream | **In-House GitHub App MCP or Upstream** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-github"]`<br>*(Fallback: `ghcr.io/github/github-mcp-server:latest`)* |
| **`playwright`**| Custom Alpine Dockerfile installing Chromium | **Official Microsoft Image** | `image: mcr.microsoft.com/playwright/mcp:latest`<br>`command: ["node", "/app/cli.js"]`<br>`args: ["--headless", "--browser", "chromium", "--no-sandbox", "--port", "8080", "--host", "0.0.0.0"]` |
| **`grafana`** | Custom Dockerfile wrapping upstream | **Official Container Image** | `image: grafana/mcp-grafana:latest`<br>`args: ["-t", "streamable-http", "--address", "0.0.0.0:8080", "-allowed-hosts", "*", "-allowed-origins", "*"]` |
| **`kubectl`** | No Dockerfile (Manifest only) | **Official Container Image** | `image: ghcr.io/rohitg00/kubectl-mcp-server:latest`<br>`args: ["--transport", "streamable-http", "--host", "0.0.0.0", "--port", "8080"]` |
| **`context7`** | Custom Dockerfile installing npm package | **Base Node + npx Execution** | `image: node:22-alpine`<br>`command: ["npx", "-y", "@upstash/context7-mcp"]`<br>`args: ["--transport", "http", "--port", "8080"]` |
| **`firecrawl`**| Custom TypeScript in `services/firecrawl` | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-firecrawl"]` |
| **`memory`** | Custom TypeScript in `services/memory` | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-memory"]` |
| **`google-workspace`**| Greenfield planning | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-gwork"]` |
| **`appsheet`**| Greenfield planning | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-appsheet"]` |

### 3.2 Purging of `platform/hub/cortex/mcp/services/`
- The entire `platform/hub/cortex/mcp/services/` directory is permanently purged.
- All Dockerfiles (`context7/Dockerfile`, `github/Dockerfile`, `firecrawl/Dockerfile`, `grafana/Dockerfile`, `memory/Dockerfile`, `playwright/Dockerfile`) are permanently removed.
- [platform/k8s/skaffold.hub.yaml](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/platform/k8s/skaffold.hub.yaml) eliminates lines 21-41 (no more Docker image builds for MCPs during local cluster bootstrap).

---

## 4. Complete Declarative Kubernetes Manifests (`platform/k8s/manifests/hub/cortex/mcp/`)

Below are the exact declarative Kubernetes manifests deployed in the cluster:

### 4.1 In-House Node.js Manifest Pattern (`firecrawl.yaml`)
```yaml
# platform/k8s/manifests/hub/cortex/mcp/firecrawl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-firecrawl
  namespace: cortex
  labels:
    app: mcp-firecrawl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mcp-firecrawl
  template:
    metadata:
      labels:
        app: mcp-firecrawl
    spec:
      containers:
        - name: mcp-firecrawl
          image: node:22-alpine
          command: ["sh", "-c"]
          args:
            - |
              if [ -n "$NODE_AUTH_TOKEN" ]; then
                npm config set //npm.pkg.github.com/:_authToken ${NODE_AUTH_TOKEN}
                npm config set @tupynambalucas-dev:registry https://npm.pkg.github.com
              fi
              npx -y @tupynambalucas-dev/cortex-mcp-firecrawl
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: '64Mi'
              cpu: '25m'
            limits:
              memory: '256Mi'
              cpu: '200m'
          env:
            - name: NODE_AUTH_TOKEN
              valueFrom:
                secretKeyRef:
                  name: cortex-secrets
                  key: NODE_AUTH_TOKEN
                  optional: true
            - name: FIRECRAWL_API_KEY
              valueFrom:
                secretKeyRef:
                  name: cortex-secrets
                  key: FIRECRAWL_API_KEY
                  optional: true
---
apiVersion: v1
kind: Service
metadata:
  name: mcp-firecrawl
  namespace: cortex
spec:
  ports:
    - port: 8080
      targetPort: 8080
  selector:
    app: mcp-firecrawl
```

### 4.2 Upstream Official Container Manifest Pattern (`playwright.yaml`)
```yaml
# platform/k8s/manifests/hub/cortex/mcp/playwright.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-playwright
  namespace: cortex
  labels:
    app: mcp-playwright
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mcp-playwright
  template:
    metadata:
      labels:
        app: mcp-playwright
    spec:
      containers:
        - name: mcp-playwright
          image: mcr.microsoft.com/playwright/mcp:latest
          command: ["node", "/app/cli.js"]
          args:
            - "--headless"
            - "--browser"
            - "chromium"
            - "--no-sandbox"
            - "--port"
            - "8080"
            - "--host"
            - "0.0.0.0"
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: '256Mi'
              cpu: '100m'
            limits:
              memory: '1Gi'
              cpu: '500m'
---
apiVersion: v1
kind: Service
metadata:
  name: mcp-playwright
  namespace: cortex
spec:
  ports:
    - port: 8080
      targetPort: 8080
  selector:
    app: mcp-playwright
```

### 4.3 Official Container Manifest Pattern (`github.yaml`)
```yaml
# platform/k8s/manifests/hub/cortex/mcp/github.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-github
  namespace: cortex
  labels:
    app: mcp-github
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mcp-github
  template:
    metadata:
      labels:
        app: mcp-github
    spec:
      containers:
        - name: mcp-github
          image: ghcr.io/github/github-mcp-server:latest
          command: ["/server/github-mcp-server"]
          args:
            - "http"
            - "--listen-host"
            - "0.0.0.0"
            - "--port"
            - "8080"
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: '64Mi'
              cpu: '25m'
            limits:
              memory: '256Mi'
              cpu: '200m'
          env:
            - name: GITHUB_PERSONAL_ACCESS_TOKEN
              valueFrom:
                secretKeyRef:
                  name: cortex-secrets
                  key: GITHUB_PERSONAL_ACCESS_TOKEN
                  optional: true
---
apiVersion: v1
kind: Service
metadata:
  name: mcp-github
  namespace: cortex
spec:
  ports:
    - port: 8080
      targetPort: 8080
  selector:
    app: mcp-github
```

---

## 5. In-House MCP Packages in `agent-mesh/mcp/*`

All in-house MCP servers are structured as clean TypeScript packages within `agent-mesh/mcp/*`:

```plaintext
agent-mesh/
├── pnpm-workspace.yaml                # packages: ['plugins/*', 'mcp/*', 'packages/*']
├── package.json
│
├── mcp/                               # Clean TypeScript Model Context Protocol Packages
│   ├── github/                        # @tupynambalucas-dev/cortex-mcp-github
│   │   ├── package.json               # main: dist/index.js, bin: dist/bin.js
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts               # Fastify HTTP server on port 8080 (for K8s)
│   │       ├── bin.ts                 # Stdio CLI binary (for pnpm dlx)
│   │       ├── auth/                  # GitHub App JWT minting (@octokit/auth-app)
│   │       └── tools/                 # repos, PRs, issues, rulesets, secrets
│   │
│   ├── firecrawl/                     # @tupynambalucas-dev/cortex-mcp-firecrawl
│   │   ├── package.json               # main: dist/index.js, bin: dist/bin.js
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts               # Fastify HTTP server on port 8080 (for K8s)
│   │       ├── bin.ts                 # Stdio CLI binary (for pnpm dlx)
│   │       └── tools/                 # scrape, crawl, search, map, extract
│   │
│   ├── memory/                        # @tupynambalucas-dev/cortex-mcp-memory
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts               # Fastify HTTP server on port 8080 (for K8s)
│   │       ├── bin.ts                 # Stdio CLI binary (for pnpm dlx)
│   │       └── tools/                 # search_knowledge, store_episodic, query_graph
│   │
│   ├── google-workspace/              # @tupynambalucas-dev/cortex-mcp-gwork
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts               # Fastify HTTP server on port 8080 (for K8s)
│   │       ├── bin.ts                 # Stdio CLI binary (for pnpm dlx)
│   │       └── tools/                 # sheets, drive, docs, gmail, calendar
│   │
│   └── appsheet/                      # @tupynambalucas-dev/cortex-mcp-appsheet
│       ├── package.json
│       └── src/
│           ├── index.ts               # Fastify HTTP server on port 8080 (for K8s)
│           ├── bin.ts                 # Stdio CLI binary (for pnpm dlx)
│           └── tools/                 # list_tables, get_schema, query, mutate, invoke
```

---

## 6. Envoy AgentGateway Configuration (`platform/k8s/manifests/hub/cortex/gateway`)

In the Kubernetes cluster, Envoy `agentgateway` acts as the unified reverse proxy, authenticating agents and mutating payloads via gRPC ExtMCP guardrails:

```yaml
# platform/k8s/manifests/hub/cortex/gateway/config.yaml
config:
  adminAddr: '[::]:15000'
  statsAddr: '[::]:15001'
  logging:
    format: json
  tracing:
    otlpEndpoint: http://otel-collector:4317
    randomSampling: true

gateways:
  default:
    port: 8080

mcp:
  gateways: [default]
  statefulMode: stateless
  prefixMode: conditional
  failureMode: failOpen
  policies:
    cors:
      allowOrigins:
        - '*'
        - 'https://agentgateway.tupynambalucas.dev'
      allowMethods:
        - GET
        - POST
        - OPTIONS
      allowHeaders:
        - '*'
      exposeHeaders:
        - Mcp-Session-Id
    mcpGuardrails:
      processors:
        - kind: remote
          host: 'mcp-guardrails:9001'
          failureMode: failClosed
          methods:
            tools/call: request
            tools/list: response
  targets:
    - name: github
      mcp:
        host: http://mcp-github:8080/sse
      policies:
        backendAuth:
          key: '$GITHUB_PERSONAL_ACCESS_TOKEN'
    - name: context7
      mcp:
        host: http://mcp-context7:8080/mcp
      policies:
        backendAuth:
          key: '$CONTEXT7_API_KEY'
    - name: firecrawl
      mcp:
        host: http://mcp-firecrawl:8080/mcp
    - name: google-workspace
      mcp:
        host: http://mcp-google-workspace:8080/mcp
    - name: appsheet
      mcp:
        host: http://mcp-appsheet:8080/mcp
    - name: playwright
      mcp:
        host: http://mcp-playwright:8080/mcp
    - name: memory
      mcp:
        host: http://mcp-memory:8080/mcp
    - name: grafana
      mcp:
        host: http://mcp-grafana:8080/mcp
    - name: kubectl
      mcp:
        host: http://mcp-kubectl:8080/mcp
```

---

## 7. The Agent Mesh Workspace Structure (`agent-mesh`) & Detailed Skill Topology

In `agent-mesh`, the root `pnpm-workspace.yaml` manages plugins, MCP packages, and shared libraries:

```yaml
packages:
  - 'plugins/*'
  - 'mcp/*'
  - 'packages/*'
```

### 7.1 Authoritative Workspace Directory Tree

The complete physical directory hierarchy explicitly details every plugin, every modular skill, its `SKILL.md` instruction specification, reference documentation, and execution helper scripts:

```plaintext
agent-mesh/
├── pnpm-workspace.yaml                      # Workspace manifest: plugins/*, mcp/*, packages/*
├── package.json                             # Root metadata and shared scripts
├── .env.example                             # Environment variable template
├── scripts/
│   └── mcp-gateway-router.js                # Smart Gateway probing (300ms) & local fallback router
│
├── plugins/                                 # Self-Contained Antigravity & agy Plugins
│   ├── github/                              # @tupynambalucas-dev/agent-plugin-github
│   │   ├── package.json                     # Plugin package manifest (npm.pkg.github.com)
│   │   ├── plugin.json                      # Antigravity plugin manifest
│   │   ├── README.md                        # Developer runbook and skill catalog
│   │   ├── mcp_config.json                  # MCP connection to cortex-mcp-github
│   │   └── skills/                          # Modular Domain Skills
│   │       ├── github-org-operator/         # Organization RBAC, team & repository lifecycle
│   │       │   ├── SKILL.md                 # Operating instructions, triggers, and guidelines
│   │       │   ├── references/              # GitHub REST API v3 org and team specifications
│   │       │   └── scripts/                 # CLI automation helpers
│   │       │       └── org-helper.js
│   │       ├── github-ruleset-enforcer/     # Branch rulesets, SSH commit signing, bypass rules
│   │       │   ├── SKILL.md                 # Ruleset configuration contracts
│   │       │   ├── references/              # Ruleset JSON schema documentation
│   │       │   └── scripts/                 # Ruleset verification and sync script
│   │       │       └── ruleset-sync.js
│   │       ├── github-security-auditor/     # Dependabot, secret scanning, code scanning alerts
│   │       │   ├── SKILL.md                 # Security triage instructions (GitHub App auth)
│   │       │   ├── references/              # Security alerts API schema and remediation
│   │       │   └── scripts/                 # Security audit reporting script
│   │       │       └── security-audit.js
│   │       └── github-actions-manager/      # Workflows, runs, jobs, secrets dispatch, failure diagnosis
│   │           ├── SKILL.md                 # Workflow orchestration instructions
│   │           ├── references/              # GitHub Actions REST API reference
│   │           └── scripts/                 # Workflow dispatch and polling helper
│   │               └── workflow-helper.js
│   │
│   ├── google-workspace/                    # @tupynambalucas-dev/agent-plugin-google-workspace
│   │   ├── package.json                     # Plugin package manifest
│   │   ├── plugin.json                      # Antigravity plugin manifest
│   │   ├── README.md                        # Workspace automation documentation
│   │   ├── mcp_config.json                  # MCP connection to cortex-mcp-gwork
│   │   └── skills/                          # Modular Google Workspace Skills
│   │       ├── gwork-drive-manager/         # Google Drive search, folder taxonomy, permission sharing
│   │       │   ├── SKILL.md                 # Drive operations instructions and search syntax
│   │       │   ├── references/              # Google Drive API v3 documentation
│   │       │   └── scripts/                 # Drive management utility script
│   │       │       └── drive-helper.js
│   │       ├── gwork-sheets-builder/        # Multi-tab spreadsheet creation, typing, cell formatting
│   │       │   ├── SKILL.md                 # Sheets generation guidelines for AppSheet & analytics
│   │       │   ├── references/              # Google Sheets API v4 batchUpdate specifications
│   │       │   └── scripts/                 # Workbook synthesizer script
│   │       │       └── create-sheet.js
│   │       └── gwork-docs-publisher/        # Diátaxis technical docs publishing to Google Docs
│   │           ├── SKILL.md                 # Document formatting and header hierarchy instructions
│   │           ├── references/              # Google Docs API v1 batchUpdate reference
│   │           └── scripts/                 # Docs publishing helper
│   │               └── docs-publisher.js
│   │
│   ├── appsheet/                            # @tupynambalucas-dev/agent-plugin-appsheet
│   │   ├── package.json                     # Plugin package manifest
│   │   ├── plugin.json                      # Antigravity plugin manifest
│   │   ├── README.md                        # AppSheet hybrid lifecycle runbook
│   │   ├── mcp_config.json                  # MCP connection to cortex-mcp-appsheet
│   │   └── skills/                          # Modular AppSheet Skills
│   │       ├── appsheet-prompt-architect/   # Prompt-to-App schema modeling & initialization URL
│   │       │   ├── SKILL.md                 # Relational schema design, Ref inference, docId ingestion
│   │       │   ├── references/              # AppSheet column type mapping and URL schemas
│   │       │   └── scripts/                 # Schema synthesis helper
│   │       │       └── schema-generator.js
│   │       ├── appsheet-data-operator/      # REST API v2 querying (Find), mutations, action triggers
│   │       │   ├── SKILL.md                 # AppSheet API v2 execution instructions
│   │       │   ├── references/              # REST API v2 request/response schemas
│   │       │   └── scripts/                 # Data operation client script
│   │       │       └── appsheet-client.js
│   │       └── appsheet-ui-designer/        # View layout, format rules, card views, conditional styling
│   │           ├── SKILL.md                 # UI customization guidelines
│   │           ├── references/              # View types and format rule syntax reference
│   │           └── scripts/                 # UI validation script
│   │               └── ui-validator.js
│   │
│   ├── docusaurus/                          # @tupynambalucas-dev/agent-plugin-docusaurus
│   │   ├── package.json                     # Plugin package manifest
│   │   ├── plugin.json                      # Antigravity plugin manifest
│   │   ├── README.md                        # Documentation governance runbook
│   │   └── skills/                          # Modular Docusaurus Skills
│   │       ├── docusaurus-architect/        # Taxonomy, sidebars, i18n Crowdin, Diátaxis quadrant structuring
│   │       │   ├── SKILL.md                 # Taxonomy and sidebar management instructions
│   │       │   ├── references/              # Diátaxis framework specifications
│   │       │   └── scripts/                 # Sidebar validator script
│   │       │       └── sidebar-check.js
│   │       ├── docusaurus-mdx-author/       # MDX components, tabs, admonitions, frontmatter validation
│   │       │   ├── SKILL.md                 # MDX syntax standards and component recipes
│   │       │   ├── references/              # MDX v3 specification and admonition tags
│   │       │   └── scripts/                 # MDX linting helper
│   │       │       └── mdx-linter.js
│   │       └── docusaurus-validator/        # Dead link detection, build verification, asset path audits
│   │           ├── SKILL.md                 # Verification procedures and failure triage
│   │           ├── references/              # Docusaurus build troubleshooting guides
│   │           └── scripts/                 # Link and build audit runner
│   │               └── build-audit.js
│   │
│   ├── meta/                                # @tupynambalucas-dev/agent-plugin-meta
│   │   ├── package.json                     # Plugin package manifest
│   │   ├── plugin.json                      # Antigravity plugin manifest
│   │   ├── README.md                        # Meta-governance and core agent tooling
│   │   └── skills/                          # Modular Meta Skills
│   │       ├── markdown-architect/          # GFM authoring, tables, mermaid, zero-emoji enforcement
│   │       │   ├── SKILL.md                 # Markdown style guide and formatting rules
│   │       │   ├── references/              # GitHub Flavored Markdown specification
│   │       │   └── scripts/                 # Markdown linter helper
│   │       │       └── gfm-lint.js
│   │       ├── agent-router-architect/      # Multi-tier AGENTS.md router authoring & context discovery
│   │       │   ├── SKILL.md                 # Router topology guidelines (Layer 1 to Layer 3)
│   │       │   ├── references/              # AGENTS.md schema and routing patterns
│   │       │   └── scripts/                 # Router validation helper
│   │       │       └── router-audit.js
│   │       ├── skill-architect/             # Agent Skill engineering, SKILL.md authoring, eval design
│   │       │   ├── SKILL.md                 # Skill authoring instructions and quality standards
│   │       │   ├── references/              # Antigravity Skill specification
│   │       │   └── scripts/                 # Skill validator helper
│   │       │       └── skill-lint.js
│   │       └── plugin-manifest-architect/   # plugin.json authoring, MCP bundling, lifecycle hooks
│   │           ├── SKILL.md                 # Plugin manifest schema and packaging instructions
│   │           ├── references/              # Plugin manifest JSON schema
│   │           └── scripts/                 # Manifest validator script
│   │               └── manifest-check.js
│   │
│   └── secrets/                             # @tupynambalucas-dev/agent-plugin-secrets
│       ├── package.json                     # Plugin package manifest
│       ├── plugin.json                      # Antigravity plugin manifest
│       ├── README.md                        # Infisical secret governance runbook
│       └── skills/                          # Modular Secrets Skills
│           ├── infisical-vault-manager/     # Infisical Cloud project management, folder hierarchies, CRUD
│           │   ├── SKILL.md                 # Secret operations and machine identity management
│           │   ├── references/              # Infisical CLI commands and Universal Auth specifications
│           │   └── scripts/                 # Secret sync helper
│           │       └── infisical-sync.js
│           └── secret-rotation-operator/    # Zero-downtime secret rotation & K8s InfisicalSecret sync
│               ├── SKILL.md                 # Secret rotation workflows and validation checks
│               ├── references/              # Kubernetes InfisicalSecret CRD specification
│               └── scripts/                 # Rotation verifier script
│                   └── rotate-check.js
│
├── mcp/                                     # Clean TypeScript Model Context Protocol Packages
│   ├── github/                              # @tupynambalucas-dev/cortex-mcp-github
│   │   ├── package.json                     # main: dist/index.js, bin: dist/bin.js
│   │   ├── tsconfig.json                    # Self-contained NodeNext TypeScript config
│   │   ├── tsconfig.build.json              # Emit dist/ declaration & source maps
│   │   ├── README.md                        # Documentation & tool catalog
│   │   └── src/
│   │       ├── index.ts                     # Fastify HTTP server on port 8080 (for K8s Envoy Gateway)
│   │       ├── bin.ts                       # Stdio CLI binary (for local fallback via pnpm dlx)
│   │       ├── config.ts                    # Zod environment variable parsing
│   │       ├── auth/                        # GitHub App JWT & Installation Token minter (@octokit/auth-app)
│   │       │   └── github-app.auth.ts
│   │       └── tools/                       # MCP Tool Handlers
│   │           ├── index.ts                 # Tool registration registry
│   │           ├── repos.tool.ts            # Repository operations & metadata
│   │           ├── rulesets.tool.ts         # Branch protection and ruleset management
│   │           └── security.tool.ts         # Dependabot & secret scanning triage
│   │
│   ├── firecrawl/                           # @tupynambalucas-dev/cortex-mcp-firecrawl
│   │   ├── package.json                     # main: dist/index.js, bin: dist/bin.js
│   │   ├── tsconfig.json                    # TypeScript compiler configuration
│   │   ├── tsconfig.build.json              # Build output configuration
│   │   ├── README.md                        # Tool catalog and usage examples
│   │   └── src/
│   │       ├── index.ts                     # Fastify HTTP server on port 8080
│   │       ├── bin.ts                       # Stdio CLI binary
│   │       ├── config.ts                    # Environment config
│   │       ├── client.ts                    # Firecrawl SDK client wrapper
│   │       └── tools/                       # Scrape, crawl, map, extract, batch_scrape
│   │
│   ├── memory/                              # @tupynambalucas-dev/cortex-mcp-memory
│   │   ├── package.json                     # main: dist/index.js, bin: dist/bin.js
│   │   ├── tsconfig.json                    # TypeScript compiler configuration
│   │   ├── tsconfig.build.json              # Build output configuration
│   │   ├── README.md                        # Memory plane documentation
│   │   └── src/
│   │       ├── index.ts                     # Fastify HTTP server on port 8080
│   │       ├── bin.ts                       # Stdio CLI binary
│   │       ├── config.ts                    # Environment config
│   │       ├── client/                      # Memory API client (fetch to MEMORY_API_URL)
│   │       │   └── memory-api.client.ts
│   │       └── tools/                       # Search, store, query_graph, ingest
│   │
│   ├── google-workspace/                    # @tupynambalucas-dev/cortex-mcp-gwork
│   │   ├── package.json                     # main: dist/index.js, bin: dist/bin.js
│   │   ├── tsconfig.json                    # TypeScript compiler configuration
│   │   ├── tsconfig.build.json              # Build output configuration
│   │   ├── README.md                        # Google Workspace tool catalog
│   │   └── src/
│   │       ├── index.ts                     # Fastify HTTP server on port 8080
│   │       ├── bin.ts                       # Stdio CLI binary
│   │       ├── config.ts                    # OAuth / Service Account credentials
│   │       ├── auth/                        # GoogleAuth client provider
│   │       │   └── google-auth.ts
│   │       └── tools/                       # Drive, Sheets, Docs, Calendar tool handlers
│   │           ├── index.ts
│   │           ├── drive.tool.ts
│   │           ├── sheets.tool.ts
│   │           └── docs.tool.ts
│   │
│   └── appsheet/                            # @tupynambalucas-dev/cortex-mcp-appsheet
│       ├── package.json                     # main: dist/index.js, bin: dist/bin.js
│       ├── tsconfig.json                    # TypeScript compiler configuration
│       ├── tsconfig.build.json              # Build output configuration
│       ├── README.md                        # AppSheet REST API tool catalog
│       └── src/
│           ├── index.ts                     # Fastify HTTP server on port 8080
│           ├── bin.ts                       # Stdio CLI binary
│           ├── config.ts                    # AppSheet ApplicationAccessKey & AppID config
│           ├── client/                      # REST API v2 HTTP client
│           │   └── appsheet-api.client.ts
│           └── tools/                       # Find, Add, Edit, Delete, Action handlers
│               ├── index.ts
│               ├── find.tool.ts
│               ├── mutate.tool.ts
│               └── action.tool.ts
│
└── packages/                                # Shared Domain Libraries
    └── runner/                              # Smart Gateway router engine
```

### 7.2 Detailed Plugin & Modular Skill Specification

Each plugin is an independent, versioned package with a dedicated domain boundary. Below is the comprehensive deep-dive into every plugin and its modular skills:

#### 7.2.1 Plugin `@tupynambalucas-dev/agent-plugin-github`
- **Domain**: Comprehensive GitHub Organization management, security triage, ruleset enforcement, and CI/CD operations.
- **Package**: `@tupynambalucas-dev/agent-plugin-github` (`plugins/github`)
- **MCP Backend**: Uses `@tupynambalucas-dev/cortex-mcp-github` (Mode A: via Envoy Gateway `:8080/mcp`; Mode B: local Stdio fallback).
- **Skills**:
  1. `github-org-operator`:
     - **Purpose**: Automates organization-level governance, team creation, membership assignments, repository provisioning, and repository transfer runbooks.
     - **Triggers**: Prompts regarding creating new repositories, managing organization teams, inviting or removing collaborators, or altering repository visibility.
     - **Input Contract**: `{ organization: string, repository?: string, team?: string, role?: "admin" | "maintainer" | "member" }`.
     - **Output Contract**: Standardized JSON report confirming RBAC state changes, repository URLs, and permission audit logs.
  2. `github-ruleset-enforcer`:
     - **Purpose**: Defines, audits, and enforces branch protection rulesets and tag rules across repositories in the organization.
     - **Triggers**: Prompts regarding branch protection, enforcing signed commits, restricting pushes to `main`, configuring bypass actors, or setting up merge queues.
     - **Input Contract**: `{ repository: string, rulesetName: string, enforceSignedCommits: boolean, requiredApprovals: number, bypassActorIds?: string[] }`.
     - **Output Contract**: Validated GitHub Ruleset payload and confirmation of synchronization via GitHub REST API v3.
  3. `github-security-auditor`:
     - **Purpose**: Interrogates GitHub Security APIs (Secret Scanning, Dependabot, Code Scanning) to identify and prioritize vulnerabilities. Resolves the Fine-Grained PAT HTTP 403 limitation by executing under GitHub App installation credentials.
     - **Triggers**: Security audit requests, vulnerability remediation tasks, checking Dependabot alerts, or validating secret scanning incidents.
     - **Input Contract**: `{ repository?: string, severity?: "critical" | "high" | "medium" | "low", state?: "open" | "fixed" | "dismissed" }`.
     - **Output Contract**: Detailed vulnerability matrix with CVE/GHSA identifiers, affected packages, patched versions, and recommended remediations.
  4. `github-actions-manager`:
     - **Purpose**: Manages GitHub Actions workflows, triggers manual workflow dispatches, interrogates run logs, and diagnoses CI/CD build failures.
     - **Triggers**: Prompts regarding checking CI status, debugging failed GitHub Actions runs, triggering release workflows, or configuring workflow secrets.
     - **Input Contract**: `{ repository: string, workflowId: string, ref?: string, inputs?: Record<string, string> }`.
     - **Output Contract**: Workflow run status, exit codes, failing job step logs, and recommended fixes.

#### 7.2.2 Plugin `@tupynambalucas-dev/agent-plugin-google-workspace`
- **Domain**: Sovereign automation across Google Drive, Google Sheets, Google Docs, and Google Calendar.
- **Package**: `@tupynambalucas-dev/agent-plugin-google-workspace` (`plugins/google-workspace`)
- **MCP Backend**: Uses `@tupynambalucas-dev/cortex-mcp-gwork` (Mode A: via Envoy Gateway `:8080/mcp`; Mode B: local Stdio fallback).
- **Skills**:
  1. `gwork-drive-manager`:
     - **Purpose**: Provides deep search and lifecycle management over Google Drive folders, permissions, file sharing, and cross-format exports.
     - **Triggers**: Prompts requiring creating drive folders, finding existing documents, sharing files with team members, or organizing project drive workspaces.
     - **Input Contract**: `{ query?: string, folderName?: string, parentFolderId?: string, shareWithEmail?: string, role?: "reader" | "commenter" | "writer" }`.
     - **Output Contract**: Google Drive resource identifiers, webViewLinks, permissions metadata, and MIME types.
  2. `gwork-sheets-builder`:
     - **Purpose**: Programmatically synthesizes enterprise-grade multi-table workbooks formatted specifically to serve as backing databases for Google AppSheet or analytics.
     - **Triggers**: Requests to generate spreadsheets, create AppSheet databases, format header rows, configure cell validation dropdowns, or insert relational seed data.
     - **Input Contract**: `{ title: string, tables: Array<{ name: string, columns: string[], validations?: Record<string, string[]>, seedRows?: Array<Record<string, unknown>> }> }`.
     - **Output Contract**: Spreadsheet ID (`docId`), table sheet IDs, and public/editor URLs.
  3. `gwork-docs-publisher`:
     - **Purpose**: Converts markdown technical plans and specifications into richly formatted Google Docs conforming to organizational typographic standards.
     - **Triggers**: Requests to publish architecture plans, Diátaxis specifications, or reports directly to Google Docs.
     - **Input Contract**: `{ title: string, markdownContent: string, parentFolderId?: string }`.
     - **Output Contract**: Document ID, document URL, and structural heading outline.

#### 7.2.3 Plugin `@tupynambalucas-dev/agent-plugin-appsheet`
- **Domain**: End-to-end prompt-to-app synthesis, schema inference, database initialization, and brownfield AppSheet administration.
- **Package**: `@tupynambalucas-dev/agent-plugin-appsheet` (`plugins/appsheet`)
- **MCP Backend**: Uses `@tupynambalucas-dev/cortex-mcp-appsheet` (Mode A: via Envoy Gateway `:8080/mcp`; Mode B: local Stdio fallback).
- **Skills**:
  1. `appsheet-prompt-architect`:
     - **Purpose**: Translates natural language requirements into relational schemas, deduces `Ref` parent-child relationships, derives key columns (`_ID`), and constructs deterministic AppSheet initialization URLs (`https://www.appsheet.com/start/initialize?docId=...`).
     - **Triggers**: Prompts requesting the creation of a new AppSheet app from scratch, modeling domain data, or structuring AppSheet relational tables.
     - **Input Contract**: `{ prompt: string, appName: string, docId?: string }`.
     - **Output Contract**: Relational entity-relationship model, column dictionary, and the exact AppSheet App Editor ingestion URL.
  2. `appsheet-data-operator`:
     - **Purpose**: Interacts directly with existing AppSheet applications via the AppSheet REST API v2 to execute `Find` queries, `Add`/`Edit`/`Delete` mutations, and `Invoke Action` workflow triggers.
     - **Triggers**: Requests to query data in an AppSheet app, update table records, trigger custom actions, or inspect data integrity.
     - **Input Contract**: `{ appId: string, tableName: string, action: "Find" | "Add" | "Edit" | "Delete" | "Invoke Action", rows?: Array<Record<string, unknown>>, selector?: string }`.
     - **Output Contract**: Array of table records, mutation status codes, or action invocation results.
  3. `appsheet-ui-designer`:
     - **Purpose**: Models and validates UI/UX configurations including deck views, table views, form views, card views, and conditional format rules (colors, icon badges).
     - **Triggers**: Prompts regarding customizing the appearance of an AppSheet application, adding format rules, configuring view layouts, or setting up action buttons.
     - **Input Contract**: `{ appId: string, viewName: string, viewType: "table" | "form" | "card" | "deck" | "detail", columns: string[], formatRules?: Array<{ condition: string, color: string, icon: string }> }`.
     - **Output Contract**: Structured UX specification and declarative configuration recipe.

#### 7.2.4 Plugin `@tupynambalucas-dev/agent-plugin-docusaurus`
- **Domain**: Sovereign technical documentation authoring, Diátaxis quadrant structuring, and MDX compilation verification.
- **Package**: `@tupynambalucas-dev/agent-plugin-docusaurus` (`plugins/docusaurus`)
- **Skills**:
  1. `docusaurus-architect`:
     - **Purpose**: Structures documentation taxonomies adhering to the Diátaxis framework (Tutorials, How-To Guides, Technical References, Explanations), configures sidebars, manages Crowdin i18n locales, and orchestrates doc versioning.
     - **Triggers**: Creating new documentation directories, re-organizing `sidebars.js`, configuring multi-language translation, or planning major doc refactors.
     - **Input Contract**: `{ workspaceRoot: string, quadrant: "tutorials" | "how-to" | "reference" | "explanation", topic: string }`.
     - **Output Contract**: Document tree structure, updated `sidebars.js` entries, and frontmatter metadata.
  2. `docusaurus-mdx-author`:
     - **Purpose**: Authors pristine MDX files with tabs, admonitions (`:::tip`, `:::note`, `:::warning`), code blocks with line highlighting, and embeds custom React components.
     - **Triggers**: Writing, editing, or converting technical documentation into MDX format.
     - **Input Contract**: `{ filePath: string, title: string, description: string, content: string, admonitions?: string[] }`.
     - **Output Contract**: Fully compliant `.mdx` file written to disk with frontmatter validation.
  3. `docusaurus-validator`:
     - **Purpose**: Audits MDX documents for broken internal hyperlinks, invalid JSX syntax, missing assets, and unescaped HTML characters.
     - **Triggers**: Pre-commit documentation checks, validating Docusaurus build readiness, or triaging `pnpm build` failures in the `docs` workspace.
     - **Input Contract**: `{ docsPath: string, strictLinkCheck?: boolean }`.
     - **Output Contract**: Lint and build report listing passing files, broken link URLs, and recommended fixes.

#### 7.2.5 Plugin `@tupynambalucas-dev/agent-plugin-meta`
- **Domain**: Meta-agent governance, root routing, skill engineering, and plugin packaging.
- **Package**: `@tupynambalucas-dev/agent-plugin-meta` (`plugins/meta`)
- **Skills**:
  1. `markdown-architect`:
     - **Purpose**: Enforces strict GitHub Flavored Markdown (GFM) standards, constructs complex Mermaid diagrams, formats tables, and strictly enforces the Zero-Emoji Policy across all text.
     - **Triggers**: Authoring or editing Markdown documents, architectural plans, READMEs, or Mermaid diagrams.
     - **Input Contract**: `{ content: string, enforceZeroEmoji?: boolean, validateMermaid?: boolean }`.
     - **Output Contract**: Formatted, linted Markdown text conforming to organizational typography.
  2. `agent-router-architect`:
     - **Purpose**: Creates, analyzes, and updates multi-tier `AGENTS.md` router context files across Layer 1 (Meta Root), Layer 2 (Monorepos: `platform`, `agent-mesh`, `docs`, `.github`), and Layer 3 (Packages/Services).
     - **Triggers**: Creating new workspaces, updating repository navigation, adding new skills to agent routers, or restructuring folders.
     - **Input Contract**: `{ targetPath: string, layer: 1 | 2 | 3, navigationLinks: Record<string, string>, activeSkills: string[] }`.
     - **Output Contract**: Validated `AGENTS.md` router file following the standard schema.
  3. `skill-architect`:
     - **Purpose**: Engineers new agent skills, formats `SKILL.md` frontmatter, designs executable helper scripts (`scripts/*`), authors evaluation benchmarks, and refines skill descriptions.
     - **Triggers**: Designing a new skill, modularizing existing skills into focused units, or testing skill evals.
     - **Input Contract**: `{ skillName: string, domain: string, description: string, instructions: string, scriptLanguage?: "javascript" | "python" | "bash" }`.
     - **Output Contract**: Complete skill directory containing `SKILL.md`, `references/`, and `scripts/`.
  4. `plugin-manifest-architect`:
     - **Purpose**: Authors and validates `plugin.json` manifests, registers MCP connectors (`mcp_config.json`), configures lifecycle hooks, and bundles plugins into npm packages.
     - **Triggers**: Creating new plugins, packaging skills, configuring plugin sidecars, or publishing plugins to GitHub Packages.
     - **Input Contract**: `{ pluginName: string, description: string, skills: string[], mcpServers?: string[] }`.
     - **Output Contract**: Validated `plugin.json`, `package.json`, and `mcp_config.json`.

#### 7.2.6 Plugin `@tupynambalucas-dev/agent-plugin-secrets`
- **Domain**: Secrets lifecycle management, Infisical Cloud synchronization, and Kubernetes Secret integration.
- **Package**: `@tupynambalucas-dev/agent-plugin-secrets` (`plugins/secrets`)
- **Skills**:
  1. `infisical-vault-manager`:
     - **Purpose**: Manages secrets across Infisical Cloud projects, folders, and environments (`dev`, `staging`, `prod`), issues Machine Identity credentials, and enforces secret hygiene.
     - **Triggers**: Managing API tokens, configuring new service secrets, setting up Infisical projects, or retrieving secret keys.
     - **Input Contract**: `{ project: string, environment: string, secretPath: string, action: "get" | "set" | "list" | "delete", secretName?: string, secretValue?: string }`.
     - **Output Contract**: Secret resolution status without exposing plaintext secrets in logs or responses.
  2. `secret-rotation-operator`:
     - **Purpose**: Orchestrates zero-downtime secret rotation, regenerates GitHub App private keys, rotates database credentials, and synchronizes Kubernetes `InfisicalSecret` custom resources.
     - **Triggers**: Rotating expired credentials, updating service account keys, or validating secret synchronization between Infisical Cloud and Kubernetes pods.
     - **Input Contract**: `{ secretKey: string, serviceTarget: string, syncK8sCluster?: boolean }`.
     - **Output Contract**: Rotation confirmation report with timestamp, target services, and restart annotations.

---

## 8. Smart Gateway Probe & Dynamic Fallback Execution Mechanics

To prevent agent tool failures when the Kubernetes cluster is offline, every MCP runner executes the **Smart Gateway Probe**:

```mermaid
sequenceDiagram
    autonumber
    actor Agent as Antigravity Agent
    participant Runner as MCP Smart Runner (scripts/mcp-gateway-router.js)
    participant Gateway as AgentGateway (http://localhost:8080)
    participant CloudService as Cluster Microservice (Pod)
    participant LocalProcess as Local Fallback Engine (pnpm dlx)

    Agent->>Runner: Execute MCP Tool Request
    Runner->>Gateway: Fast Health Probe (GET /health, 300ms timeout)
    alt Gateway Healthy (Status 200 OK)
        Gateway-->>Runner: 200 OK
        Runner->>Gateway: Dispatch Tool Request over Streamable HTTP / SSE
        Gateway->>CloudService: Forward via gRPC Guardrails
        CloudService-->>Gateway: Execution Result
        Gateway-->>Runner: Streamed Response
    else Gateway Offline (ECONNREFUSED / ETIMEDOUT)
        Runner->>Runner: Log to stderr: "[cortex-mcp] Gateway offline; activating local fallback"
        Runner->>LocalProcess: Spawn in-process Stdio transport (pnpm dlx @tupynambalucas-dev/cortex-mcp-*)
        LocalProcess-->>Runner: Tool Execution Result via stdout
    end
    Runner-->>Agent: Deliver Result to Agent Context
```

---

## 9. Mandatory Tool Directives & Post-Execution Verification

### 9.1 Mandatory Context7 & Firecrawl Research Rule
During the execution of any migration step, if external documentation, API parameter references, or upstream library changes are required, the agent **MUST ALWAYS** utilize:
- **`agent-toolkit_context7-mcp`**: For authoritative framework, library, and TypeScript SDK documentation (`resolve-library-id` followed by `query-docs`).
- **`agent-toolkit_firecrawl-mcp`**: For web documentation, GitHub repository inspection, and live upstream release research (`firecrawl_search`, `firecrawl_scrape`, `firecrawl_map`).

### 9.2 Mandatory Post-Execution Verification Artifact
Immediately upon completing the execution of this architectural plan, the agent **MUST** author and commit a comprehensive verification artifact in [agent-toolkit/references/](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/agent-toolkit/references):
- **Title**: `cortex-mcp-execution-state-and-fallback-verification.md`
- **Mandatory Contents**:
  1. Complete inventory and live verification of all MCP packages relocated to `agent-mesh/mcp/*`.
  2. Complete inventory and live verification of all declarative Kubernetes manifests in `platform/k8s/manifests/hub/cortex/mcp/`.
  3. Live end-to-end testing results of the **Smart Gateway Probe** validating both execution states:
     - State 1: Active Gateway routing over HTTP/SSE.
     - State 2: Simulated Gateway offline failure validating graceful `pnpm dlx` Stdio fallback.
  4. Confirmation of zero remaining Dockerfiles in `platform/hub/cortex/mcp/services/`.

---

## 10. Step-by-Step Execution Plan

The execution of this master plan proceeds across seven sequential, deterministic phases:

### Phase 1: Relocate In-House MCP Implementations to `agent-toolkit/mcp/`
1. Move `platform/hub/cortex/mcp/services/firecrawl` to `agent-toolkit/mcp/firecrawl`.
2. Move `platform/hub/cortex/mcp/services/memory` to `agent-toolkit/mcp/memory`.
3. Scaffold `agent-toolkit/mcp/github` (`@tupynambalucas-dev/cortex-mcp-github`) with GitHub App authentication.
4. Scaffold `agent-toolkit/mcp/google-workspace` (`@tupynambalucas-dev/cortex-mcp-gwork`).
5. Scaffold `agent-toolkit/mcp/appsheet` (`@tupynambalucas-dev/cortex-mcp-appsheet`).
6. Update `agent-toolkit/pnpm-workspace.yaml` to include `'mcp/*'`.
7. Purge `Dockerfile` from each relocated MCP package in `agent-toolkit/mcp/*`.

### Phase 2: Purge `platform/hub/cortex/mcp/services/`
1. Remove all remaining subdirectories in `platform/hub/cortex/mcp/services/` (`context7`, `github`, `grafana`, `playwright`, `kubectl`).
2. Remove the `services/` folder itself from `platform/hub/cortex/mcp/`.
3. Update `platform/pnpm-workspace.yaml` to remove `'hub/cortex/mcp/services/*'`.

### Phase 3: Update Kubernetes Manifests to Zero-Dockerfile Standard
1. Update `platform/k8s/manifests/hub/cortex/mcp/github.yaml` (use `ghcr.io/github/github-mcp-server:latest` or `node:22-alpine` with `cortex-mcp-github`).
2. Update `platform/k8s/manifests/hub/cortex/mcp/playwright.yaml` (use `mcr.microsoft.com/playwright/mcp:latest`).
3. Update `platform/k8s/manifests/hub/cortex/mcp/grafana.yaml` (use `grafana/mcp-grafana:latest`).
4. Update `platform/k8s/manifests/hub/cortex/mcp/context7.yaml` (use `node:22-alpine` + `npx -y @upstash/context7-mcp`).
5. Update `platform/k8s/manifests/hub/cortex/mcp/firecrawl.yaml` (use `node:22-alpine` + `npx -y @tupynambalucas-dev/cortex-mcp-firecrawl`).
6. Update `platform/k8s/manifests/hub/cortex/mcp/memory.yaml` (use `node:22-alpine` + `npx -y @tupynambalucas-dev/cortex-mcp-memory`).
7. Create `platform/k8s/manifests/hub/cortex/mcp/google-workspace.yaml` and `appsheet.yaml`.
8. Update `platform/k8s/manifests/hub/cortex/mcp/kustomization.yaml` to include all resources.

### Phase 4: Clean `platform/k8s/skaffold.hub.yaml`
1. Remove build artifacts for `cortex-mcp-github`, `context7`, `firecrawl`, `grafana`, `playwright`, `memory`.
2. Retain only infrastructure images (`cortex-mcp-guardrails`, `cortex-mcp-inspector`, `cortex-memory-api`, `studio-*`).

### Phase 5: Test Smart Gateway Fallback Execution
1. Verify syntax and live execution of `node agent-toolkit/scripts/mcp-gateway-router.js firecrawl`.
2. Verify probe timeout and stderr logging when Gateway is offline.

### Phase 6: Author Post-Execution Verification Artifact
1. Write `agent-toolkit/references/cortex-mcp-execution-state-and-fallback-verification.md`.
2. Copy to conversation artifact directory.

### Phase 7: Meta-Repository Commit & Submodule Synchronization
1. Commit all changes in `platform` with SSH signature (`git commit -S -m "..."`).
2. Commit all changes in `agent-toolkit` with SSH signature (`git commit -S -m "..."`).
3. Bump submodule pointers in `org-core`, commit with SSH signature, and push to origin `main`.
