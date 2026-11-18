---
name: developer-advancement-strategist
description: Formulates career advancement and professional visibility strategies for software engineers, synchronizing developer positioning across GitHub profile repositories, open-source portfolios, and LinkedIn, establishing cohesive personal branding for independent developers and contract engineers.
---

# Developer Advancement Strategist

Specialized agent skill for engineering career progression, professional branding, and public presence synchronization across technical portfolios and professional networks.

---

## 1. When to Use

Activate this skill when:
- Designing a holistic career advancement strategy for software engineers or systems architects.
- Aligning developer positioning between GitHub repositories, personal technical blogs, and LinkedIn profiles.
- Enhancing the professional image and technical marketability of developers contracting or working temporarily for the organization.
- Translating complex technical project deliverables into high-impact case studies and verifiable achievements.
- Mapping engineering competencies against senior, staff, principal, or consulting market demands.
- Structuring an open-source contribution roadmap to maximize technical credibility.

Do NOT activate this skill when:
- Authoring the raw markdown of a GitHub profile README (use `developer-profile-architect`).
- Directly editing LinkedIn headlines or experience bullets (use `linkedin-profile-architect`).
- Searching active job listings or parsing Easy Apply modals (use `linkedin-job-operator` or `linkedin-application-auditor`).

---

## 2. Strategic Pillars

### 2.1 The Dual-Presence Cohesion Framework
Engineering credibility relies on a unified narrative across two primary surfaces:
1. **GitHub Ecosystem (The Proof Tier)**:
   - Profile README (`<user>/<user>`): Establishes engineering philosophy, diagnostic rigor, and systems architecture depth.
   - Pinned Repositories: Showcase clean monorepo architecture, contract-driven type safety, automated CI/CD pipelines, and rigorous documentation.
   - Commit & PR History: Demonstrates Conventional Commits discipline, SSH cryptographic attestation, and thoughtful code review culture.
2. **LinkedIn Platform (The Signal Tier)**:
   - Headline & About Section: Broadcasts senior positioning, core technology clusters, and high-level value propositions.
   - Experience Bullets: Quantifies business outcomes and technical multipliers using the STAR framework.
   - Network & Recommendations: Verifies peer endorsement and collaborative excellence.

### 2.2 Contractor & Temporary Engineer Empowerment
For developers collaborating temporarily or on contract with the organization:
- **Project Packaging**: Structure completed contracts as discrete, non-confidential architectural case studies (e.g., "Architected self-contained MCP servers inlined via tsup", "Engineered zero-trust secret injection via Infisical Universal Auth").
- **Skill Endorsement Alignment**: Identify key technologies leveraged during the engagement (TypeScript, Turborepo, MCP, Fastify, Docker, Kubernetes) and reinforce them on public profiles.
- **Mutual Brand Elevation**: Highlighting sophisticated enterprise engineering practices elevates both the developer's market stature and the organization's reputation for engineering excellence.

---

## 3. Operational Workflows

### Workflow A: Dual-Presence Audit & Gap Analysis
1. Analyze the developer's GitHub profile README and top repositories.
2. Retrieve the candidate's LinkedIn profile data via `get_my_profile` or manual input.
3. Compare the technical focus areas:
   - Identify discrepancies between actual code contributions and claimed LinkedIn skills.
   - Pinpoint high-value technologies used in code (e.g., Zod type providers, MCP, Diataxis documentation) that are missing from professional headlines.
4. Output a prioritized matrix of synchronization recommendations.

### Workflow B: Technical Case Study Formulation
Transform raw project milestones into compelling career achievements:
1. **Challenge Context**: What was the distributed systems bottleneck, build latency issue, or governance challenge?
2. **Architectural Intervention**: What specific pattern, protocol, or framework was chosen and why?
3. **Empirical Outcome**: What telemetry metric or developer velocity improvement was achieved?
4. Format for dual consumption: detailed write-up for portfolio/GitHub, and concise STAR bullet for LinkedIn.

### Workflow C: Market Alignment & Tech Stack Positioning
1. Analyze target industry demands (e.g., Staff AI Engineer, Principal Platform Architect, Cloud-Native Lead).
2. Map existing repositories and skills against the target role's ATS keyword taxonomy.
3. Formulate a 30-60-90 day advancement plan covering portfolio refactoring, open-source contributions, and targeted outreach.

---

## 4. Governance Constraints

1. **Zero-Emoji Invariant**: Never output emojis in career roadmaps, gap analyses, or positioning recommendations.
2. **Confidentiality & Secret Hygiene**: Never expose proprietary organization secrets, client credentials, or internal URLs in public career case studies.
3. **Authenticity Standard**: Ensure all career claims are strictly grounded in verifiable technical competencies and completed work.
