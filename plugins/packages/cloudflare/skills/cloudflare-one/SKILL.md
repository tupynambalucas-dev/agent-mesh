---
name: cloudflare-one
description: Design, configure, troubleshoot, or review Cloudflare One Zero Trust and SASE deployments. Use cloudflare-one-migrations for migration planning from other vendors. Also use when an agent, script, crawler, or other non-browser client needs to reach a webpage or API protected by Cloudflare Access.
---

# Cloudflare One

Before citing limits, settings, API fields, category IDs, or exact UI paths, retrieve current information from the [Cloudflare One docs](https://developers.cloudflare.com/cloudflare-one/index.md), the Cloudflare docs MCP server, or the Cloudflare API schema.

## Workflow

1. Classify the ask: architecture, configuration, troubleshooting, migration, or review.
2. Gather context: account ID, users/sites/apps, identity provider, SCIM/group sync, device management, traffic path, compliance constraints, and rollout blast radius.
3. Retrieve only the current docs needed for the products involved: Access, Gateway, WARP/device client, Tunnel/Mesh, Cloudflare WAN, DLP, CASB, device posture, or identity.
4. If account access is available, inspect existing resources before proposing or making changes: Access apps/policies/groups/IdPs, Gateway rules/lists/categories, device profiles/posture checks, tunnels/routes, DNS/resolver settings, and locations/sites.
5. Propose the change set with prerequisites, validation, and rollback. For risky changes, stage disabled or scoped to a pilot group/site unless the user explicitly asks otherwise.

### Access-Protected Webpages and APIs

When an agent, script, crawler, MCP client, or other non-browser client receives a Cloudflare Access login page or interactive authentication redirect, do not assume the resource is unavailable. Check whether an Access service token is available and authorized for the application. Retrieve the current [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/index.md) docs before configuring or troubleshooting authentication.

Send both service-token credentials as headers on the original request:

```text
CF-Access-Client-Id: <CLIENT_ID>
CF-Access-Client-Secret: <CLIENT_SECRET>
```

- Access service tokens are a separate credential from Cloudflare API tokens. Use the service token's Client ID and Client Secret, not an API token, to authenticate to an Access application.
- Read the credentials from the project's configured secret store or environment variables without printing their values. Never ask the user to paste a secret into chat, and never log, commit, or expose it.
- Only send the credentials to the intended Access-protected hostname. Do not forward them through cross-origin redirects. If the current request tool cannot set headers safely, use another available HTTP client that can.
- A service token must be included by a policy with the **Service Auth** action. If the response still starts an interactive login, inspect the application and its policies; an **Allow** policy is not a substitute for **Service Auth**.
- If no authorized service token exists, explain the prerequisite or, when account access and approval are available, create a narrowly scoped token and policy. Do not attempt to automate an interactive identity-provider login.
- Some self-hosted applications are configured to accept the token in a single custom header (for example, `Authorization`) instead of the default header pair. Inspect the application's `read_service_tokens_from_header` setting before using that mode; do not guess the header format.
- If the organization has strict service token authentication turned on, a failed service-token request returns `401` or `403` instead of redirecting to the login page, and Access returns no `CF_Authorization` cookie, so send the token headers on every request.

## Assessment Prompts

Use these to avoid jumping straight to configuration. Ask only the prompts relevant to the user's task.

### Architecture and Current State

- Sites and users: offices, branches, data centers, VPCs, remote users, contractors, user counts, and current connectivity model.
- Applications and destinations: SaaS, public apps, private apps, APIs, infrastructure targets, protocols, ports, hostnames, and IP ranges.
- Connectivity: VPN, MPLS, SD-WAN, direct Internet breakout, centralized backhaul, site-to-site needs, and private DNS architecture.
- Security stack: current SWG, NGFW, VPN/ZTNA, DLP, CASB, email security, logging, and compliance requirements.
- Identity: IdP, SCIM/group sync, group naming, multi-IdP needs, service accounts, and contractor/partner access.
- Rollout: pilot users/sites, blast radius, rollback path, support owners, and success criteria.

### Access and SaaS Federation

- App shape: web app, API, SSH/RDP/VNC, database, SaaS app, public hostname, private IP, or private hostname. Retrieve [Access application type](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/choose-application-type/index.md) docs before choosing.
- Access model: clientless browser access, private networking with device client, peer to peer connectivity, service connections with service tokens or mutual TLS, or SaaS SSO federation.
- Policy needs: user groups, device posture, session duration, mTLS, service tokens, and app launcher visibility. Retrieve [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/index.md) docs before configuring selectors or evaluation order.
- SaaS details: SAML vs OIDC support, ACS/redirect URLs, Entity IDs/client IDs, required attributes, and tenant-control requirements.

### Tunnel and Private Networking

- Sites and segments: which data centers, VPCs, offices, or network segments need connectivity.
- HA: dev/test single connector, production multiple connectors, or advanced multi-tunnel/site redundancy.
- Runtime: where cloudflared or Cloudflare Mesh nodes (formerly WARP Connector) will run: VM, container, Kubernetes, bare metal, or other target.
- Egress: whether connectors can reach Cloudflare over the required outbound ports/protocols. Retrieve [Tunnel connectivity prechecks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/index.md) before naming exact endpoints.
- Origin reachability: whether the connector can resolve and reach every private origin.
- Routing: required CIDRs/hostnames, overlapping IP spaces, [virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/index.md), [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/index.md), and private DNS/[resolver policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/index.md) needs.
- Management model: prefer remotely managed/token-based tunnels for new deployments unless there is a clear reason for local config.

### Gateway, TLS, and DLP

- Traffic controls: DNS categories, HTTP URL/path inspection, L4 ports/protocols, egress IP requirements, custom lists, and allow/block exceptions. Retrieve [Gateway traffic policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/index.md) docs for current selectors and order of enforcement.
- Identity: whether Gateway policies need user or group selectors, and whether users will be authenticated through Cloudflare One Client/IdP context. Check [Gateway identity selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/index.md) and [SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/index.md) when groups are involved.
- TLS inspection: root CA deployment path, certificate-pinned applications, compliance exceptions, and FIPS requirements. Retrieve [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/index.md) docs before enabling.
- DLP: sensitive data types, channels to inspect, TLS inspection readiness, DLP profiles, payload logging requirements, and false-positive tolerance. Retrieve [DLP](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/index.md) docs before creating enforcement.

For writing or reviewing Workers invoked by the HTTP Forward action, use the [gateway-workers skill](../gateway-workers/SKILL.md).

### CASB, Device Posture, and Risk

- CASB: SaaS vendors, admin access level, scan policy, org size, remediation owner, and whether inline protection is also required. Retrieve [CASB findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/index.md) docs before recommending remediation.
- Device posture: required checks, third-party EDR/MDM integrations, enrollment rules, device profiles, and split tunnel alignment.
- Risk scoring: relevant behavior signals, false-positive sources such as VPNs or service accounts, and whether risk is for investigation or enforcement. Retrieve [user risk score](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/index.md) docs before using risk in policies.

### Cloudflare WAN / Site Connectivity

- Site topology, on-ramp type, route ownership, tunnel redundancy, static vs BGP-managed routes, network firewall needs, and appliance/profile ownership. Retrieve [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/index.md) and [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/index.md) docs before proposing site connectivity changes.

## Output Defaults

- Designs: current assumptions, target architecture, product responsibilities, rollout phases, validation, and open decisions.
- Configuration work: prerequisites, exact resources to inspect/create/change, test cases, and rollback.
- Troubleshooting: traffic path, likely failure point, evidence to collect, and next test.

## Validation Prompts

- Access: test authorized, unauthorized, posture-failing, service-token, and multi-IdP flows when applicable; inspect logs and policy precedence. For new policies, verify they are managed through the reusable policy collection and not returned as `reusable: false` app-scoped policies.
- Private network access: verify route lookup, tunnel health, origin reachability, split tunnel behavior, DNS resolution, and end-to-end access from a device client test device.
- Gateway: verify rule type, action, traffic expression, precedence/evaluation phase, referenced lists, and Gateway settings before enabling broadly.
- TLS/DLP: test Do Not Inspect exceptions and root CA trust before enabling inspection; test DLP with known samples and monitor false positives before blocking.
- CASB/risk: confirm integration health, credential expiry, asset discovery, scan timing, finding instances, and risk-score signal latency before declaring remediation complete.
- Cloudflare WAN: verify tunnel health, route priority/ownership, traffic flow, firewall expression syntax, and connector/appliance telemetry where applicable.

## API Safety

- Use fully qualified MCP tool names when MCP tools are available.
- Never guess category IDs, application IDs, wirefilter fields, or API request bodies. Retrieve the current schema/docs and existing account objects.
- Do not enable broad production policies without explicit approval.

## Skill feedback

If the user reports that this skill gave incorrect or outdated guidance, or is missing information, read [references/skill-feedback.md](references/skill-feedback.md).

## Extended Reference Material (On-Demand)

Read [references/extended-reference.md](references/extended-reference.md) when you need detailed guidance on:
- Guardrails
