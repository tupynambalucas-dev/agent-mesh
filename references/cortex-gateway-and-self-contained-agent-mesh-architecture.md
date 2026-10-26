# Cortex MCP Engine & Self-Contained Agent Mesh Architecture

This specification establishes the authoritative enterprise architecture linking the **Cortex MCP Control Plane**
in [platform/hub/cortex/mcp](file:///C:/Users/tupyn/projects/organizations/tupynambalucas-dev/org-core/platform/hub/cortex/mcp)
with the **Agent Mesh Workspace** in `agent-mesh` (formerly `agent-toolkit`).

It codifies seven foundational architectural decisions:
1. **Renaming to `agent-mesh`**: Resolves semantic collision with `platform` and `cortex`. The repository represents the decentralized, composable mesh of agent plugins, personas, rules, skills, and MCP tool servers.
2. **Consolidation of MCP Servers in `agent-mesh/servers/*`**: All in-house Model Context Protocol implementations (`firecrawl`, `memory`, `google-workspace`, `appsheet`) reside exclusively in `agent-mesh/servers/*` as clean TypeScript packages published to GitHub Packages (`npm.pkg.github.com`).
3. **Complete Elimination of Custom Dockerfiles**: Eliminates all custom Dockerfiles across the MCP ecosystem. Upstream servers use official pre-built container images (`github`, `grafana`, `kubectl`, `playwright`), while in-house TypeScript MCP servers run directly on official `node:22-alpine` base images using declarative Kubernetes manifests with `npx -y`.
4. **Purging of `platform/hub/cortex/mcp/services/`**: The `platform` repository ceases hosting application tool code, retaining strictly the **Control Plane Infrastructure**: Envoy `agentgateway`, gRPC `mcp-guardrails`, developer `inspector`, and declarative GitOps manifests in `platform/k8s/manifests/hub/cortex/mcp/`.
5. **Enterprise Google Workspace & AppSheet MCPs**: Implements dedicated services for Google Workspace automation (`@tupynambalucas-dev/cortex-mcp-gwork`) and AppSheet hybrid lifecycle management (`@tupynambalucas-dev/cortex-mcp-appsheet`).
6. **Environment-Aware Playwright Isolation**: Replaces custom browser Dockerfiles with the official Microsoft container (`mcr.microsoft.com/playwright/mcp:latest`) in Kubernetes, while supporting interactive headed/DevTools execution locally.
7. **Autonomous Plugins with `agent-plugin-` Prefix**: Every plugin in `agent-mesh/plugins/<domain>` is an independent pnpm workspace package named `@tupynambalucas-dev/agent-plugin-<domain>`, containing modularized, professional skills.

---

## 1. High-Level Architecture & Component Boundaries

```mermaid
flowchart TD
    subgraph AgentMeshRepo ["agent-mesh/ (Autonomous Agent Capabilities Monorepo)"]
        subgraph MCPServersWorkspace ["servers/ (Clean TypeScript MCP Packages - SSOT)"]
            MCPFirecrawl["servers/firecrawl (@tupynambalucas-dev/cortex-mcp-firecrawl)"]
            MCPMemory["servers/memory (@tupynambalucas-dev/cortex-mcp-memory)"]
            MCPGoogleWorkspace["servers/google-workspace (@tupynambalucas-dev/cortex-mcp-gwork)"]
            MCPAppSheet["servers/appsheet (@tupynambalucas-dev/cortex-mcp-appsheet)"]
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

        MCPServersWorkspace -. "pnpm publish (dist/index.js + bin: dist/bin.js)" .-> GitHubPackages["GitHub Packages Registry (npm.pkg.github.com)"]
    end

    subgraph PlatformRepo ["platform/ (Cloud Services, GitOps & Infrastructure Monorepo)"]
        subgraph CortexControlPlane ["platform/hub/cortex/mcp/ (MCP Control Plane Only)"]
            ExtMCPGuardrails["guardrails/ (gRPC ExtMCP Transparent Policy Proxy)"]
            MCPInspector["inspector/ (Web UI for Dev Testing)"]
        end

        subgraph KubernetesCluster ["Kubernetes Manifests (Zero Custom Dockerfiles)"]
            K8sFirecrawl["mcp-firecrawl (image: node:22-alpine + npx -y)"]
            K8sMemory["mcp-memory (image: node:22-alpine + npx -y)"]
            K8sGoogleWorkspace["mcp-google-workspace (image: node:22-alpine + npx -y)"]
            K8sAppSheet["mcp-appsheet (image: node:22-alpine + npx -y)"]
            K8sContext7["mcp-context7 (image: node:22-alpine + npx -y @upstash/context7-mcp)"]
            K8sGitHub["mcp-github (image: ghcr.io/github/github-mcp-server:latest)"]
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
| **`agent-mesh/`** *(formerly `agent-toolkit`)* | **AI Agent Substrate & Capability Monorepo** | Antigravity plugins (`plugins/*`), Model Context Protocol servers (`servers/*`), skills, behavioral rules, and smart gateway fallback routers. |
| **`docs/`** | **Sovereign Documentation Hub** | Docusaurus v3 knowledge base, MDX specifications, Crowdin localization pipelines. |
| **`.github/`** | **Enterprise Governance** | Organization standards, GitHub Actions reusable workflows, community health, and public profiles. |

---

## 3. The Zero-Dockerfile Architecture: Pure Manifest Execution

A major optimization in this architecture is the **complete elimination of custom Dockerfiles** for all MCP servers:

### 3.1 Upstream & In-House MCP Execution Matrix

| MCP Service | Previous State in `platform` | New Zero-Dockerfile Strategy | Kubernetes Manifest Configuration (`platform/k8s/manifests/hub/cortex/mcp/`) |
| :--- | :--- | :--- | :--- |
| **`github`** | Custom Dockerfile wrapping upstream | **Official Container Image** | `image: ghcr.io/github/github-mcp-server:latest`<br>`command: ["/server/github-mcp-server"]`<br>`args: ["http", "--listen-host", "0.0.0.0", "--port", "8080"]` |
| **`playwright`**| Custom Alpine Dockerfile installing Chromium | **Official Microsoft Image** | `image: mcr.microsoft.com/playwright/mcp:latest`<br>`command: ["node", "/app/cli.js"]`<br>`args: ["--headless", "--browser", "chromium", "--no-sandbox", "--port", "8080", "--host", "0.0.0.0"]` |
| **`grafana`** | Custom Dockerfile wrapping upstream | **Official Container Image** | `image: grafana/mcp-grafana:latest`<br>`args: ["-t", "streamable-http", "--address", "0.0.0.0:8080", "-allowed-hosts", "*", "-allowed-origins", "*"]` |
| **`kubectl`** | No Dockerfile (Manifest only) | **Official Container Image** | `image: ghcr.io/rohitg00/kubectl-mcp-server:latest`<br>`args: ["--transport", "streamable-http", "--host", "0.0.0.0", "--port", "8080"]` |
| **`context7`** | Custom Dockerfile installing npm package | **Base Node + npx Execution** | `image: node:22-alpine`<br>`command: ["npx", "-y", "@upstash/context7-mcp"]`<br>`args: ["--transport", "http", "--port", "8080"]` |
| **`firecrawl`**| Custom TypeScript in `services/firecrawl` | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-firecrawl"]` |
| **`memory`** | Custom TypeScript in `services/memory` | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-memory"]` |
| **`google-workspace`**| Greenfield planning | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-gwork"]` |
| **`appsheet`**| Greenfield planning | **Base Node + GitHub Packages npx** | `image: node:22-alpine`<br>`command: ["sh", "-c"]`<br>`args: ["npx -y @tupynambalucas-dev/cortex-mcp-appsheet"]` |

### 3.2 Architectural Benefits of Zero-Dockerfile Execution
1. **Radical Acceleration of Skaffold & CI/CD**:
   `platform/k8s/skaffold.hub.yaml` eliminates 6 Docker build targets. Skaffold no longer builds `cortex-mcp-*` containers, slashing local cluster bootstrap time from minutes to seconds.
2. **Zero Base OS CVE Maintenance**:
   Eliminating custom Dockerfiles removes the burden of tracking Linux distribution patches, OpenSSL updates, and container vulnerabilities.
3. **Single Build Artifact (`.tgz` npm package)**:
   A single `pnpm publish` to GitHub Packages provides the exact same tested code for both local agents (`pnpm dlx`) and Kubernetes pods (`npx -y`).
4. **Purged `platform/hub/cortex/mcp/services/`**:
   The entire `services/` directory is purged from `platform`, leaving `platform/hub/cortex/mcp` strictly as the control plane (`guardrails/` and `inspector/`).

---

## 4. In-House MCP Servers in `agent-mesh/servers/*`

All in-house MCP servers are structured as clean TypeScript packages within `agent-mesh/servers/*`:

```plaintext
agent-mesh/
├── pnpm-workspace.yaml
├── package.json
│
├── servers/                           # Clean TypeScript Model Context Protocol Servers
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

## 5. Google Workspace & Google AppSheet MCP Architecture

The agent ecosystem requires enterprise-grade access to Google Workspace (Drive, Docs, Sheets, Gmail, Calendar) and Google AppSheet.

### 5.1 Authentication Patterns: Cluster Infra vs Local Plugins

Connecting to Google APIs requires distinct authentication strategies depending on execution context:

| Context | Recommended Method | Technical Implementation | Security Posture |
| :--- | :--- | :--- | :--- |
| **K8s Infra (Microservice behind Gateway)** | **Google Service Account with Domain-Wide Delegation** or **Workload Identity Federation** | Mounted JSON credentials via Infisical / K8s Secret (`GOOGLE_APPLICATION_CREDENTIALS`). Uses `google-auth-library` JWT signing in-memory. | **Zero Human Interaction**: Headless, deterministic, scoped strictly to organizational service account or delegated user. |
| **Local Plugin (`pnpm dlx` / Stdio Fallback)** | **Local Service Account Key** or **OAuth 2.0 PKCE User Token** | Reads `GOOGLE_SERVICE_ACCOUNT_JSON` or cached token in `~/.gemini/auth/google-oauth.json`. Can trigger browser consent on initial setup. | **Interactive**: Developer authorizes personal or test Google account on localhost callback. |

### 5.2 Google Workspace MCP (`servers/google-workspace`)
Published as `@tupynambalucas-dev/cortex-mcp-gwork`, this service unifies core Workspace capabilities:
- **Google Sheets API v4**: Reading ranges, appending rows, updating cell formatting, setting frozen headers, adding data validation dropdowns, batch updates.
- **Google Drive API v3**: Creating folders, searching files (`name contains '...'`), setting permissions (`anyoneWithLink`, `domain`, `user`), moving files.
- **Google Docs API v1**: Creating documents, batch inserting styled text, generating Diátaxis templates.
- **Gmail & Calendar APIs**: Reading thread metadata, creating draft emails, querying calendar event free/busy blocks.

### 5.3 Google AppSheet MCP (`servers/appsheet`)
Published as `@tupynambalucas-dev/cortex-mcp-appsheet`, this service executes the **Hybrid AppSheet Lifecycle**:
1. **Greenfield Prompt-to-App**: Automates multi-table Google Sheet generation via Sheets API and triggers direct initialization via `https://www.appsheet.com/start/initialize?docId={SPREADSHEET_ID}`.
2. **Brownfield Operational Management**: Connects to AppSheet Inbound REST API v2 (`/api/v2/apps/{appId}/tables/{tableName}/Action`) to query schemas, filter rows, execute mutations, and trigger actions.

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

## 7. The Agent Mesh Workspace Structure (`agent-mesh`)

In `agent-mesh`, root `pnpm-workspace.yaml` manages both plugins and servers:

```yaml
packages:
  - 'plugins/*'
  - 'servers/*'
  - 'packages/*'
```

```plaintext
agent-mesh/
├── pnpm-workspace.yaml
├── package.json
│
├── plugins/                           # Self-Contained Antigravity & agy Plugins
│   ├── docusaurus/                    # @tupynambalucas-dev/agent-plugin-docusaurus
│   ├── meta/                          # @tupynambalucas-dev/agent-plugin-meta
│   ├── github/                        # @tupynambalucas-dev/agent-plugin-github
│   ├── google-workspace/              # @tupynambalucas-dev/agent-plugin-google-workspace
│   ├── web/                           # @tupynambalucas-dev/agent-plugin-web
│   ├── knowledge/                     # @tupynambalucas-dev/agent-plugin-knowledge
│   └── secrets/                       # @tupynambalucas-dev/agent-plugin-secrets
│
├── servers/                           # Clean TypeScript Model Context Protocol Servers
│   ├── firecrawl/                     # @tupynambalucas-dev/cortex-mcp-firecrawl
│   ├── memory/                        # @tupynambalucas-dev/cortex-mcp-memory
│   ├── google-workspace/              # @tupynambalucas-dev/cortex-mcp-gwork
│   └── appsheet/                      # @tupynambalucas-dev/cortex-mcp-appsheet
│
└── packages/                          # Shared Agent Mesh Libraries
    ├── core/                          # Base Zod schemas and IPC types
    └── runner/                        # Smart Gateway probing & fallback router
```

---

## 8. Smart Gateway Probe & Fallback Router Mechanics

To prevent agent failures when the Kubernetes cluster is offline, every MCP runner executes the **Smart Gateway Probe**:

```mermaid
sequenceDiagram
    autonumber
    actor Agent as Antigravity Agent
    participant Runner as MCP Smart Runner (scripts/mcp-runner.js)
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

## 9. Migration & Execution Checklist

1. [x] Document the Zero-Dockerfile Architecture and official upstream image mappings.
2. [x] Document manifest-based `node:22-alpine` execution for custom MCP servers.
3. [x] Update AgentGateway configuration to define targets for Workspace, AppSheet, Playwright, and custom MCPs.
4. [ ] Move `platform/hub/cortex/mcp/services/firecrawl` and `services/memory` to `agent-toolkit/servers/`.
5. [ ] Purge `platform/hub/cortex/mcp/services/` and remove from `platform/pnpm-workspace.yaml`.
6. [ ] Update `platform/k8s/manifests/hub/cortex/mcp/*.yaml` to use official images (`github`, `grafana`, `playwright`, `kubectl`) and `node:22-alpine` with `npx -y` (`firecrawl`, `memory`, `context7`).
7. [ ] Clean `platform/k8s/skaffold.hub.yaml` to remove unneeded custom Docker builds.
8. [ ] Update `agent-toolkit/pnpm-workspace.yaml` to include `'servers/*'`.
9. [ ] Rename repository from `agent-toolkit` to `agent-mesh` and update `org-core/.gitmodules`.
