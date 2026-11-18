# Applicant Tracking System (ATS) Keyword & Parsing Matrix

This technical specification details how modern Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever, Ashby, and LinkedIn Recruiter) parse, score, and rank candidate resumes.

---

## 1. ATS Parsing Engines & Token Extraction

Modern ATS platforms convert candidate CVs into normalized entity graphs:

1. **Section Disambiguation**:
   - Standard section headers are mandatory: `Experience` (or `Work Experience`), `Education`, `Skills`, `Projects`, `Certifications`. Non-standard headers (e.g., `What I Do`, `My Journey`) often cause parser failure.
2. **Deterministic Date Parsing**:
   - Dates should follow unambiguous formats: `YYYY-MM` or `Month YYYY` (e.g., `2024-01 - Present`, `Jan 2022 - Dec 2023`).
3. **Keyword Frequency vs Density**:
   - Repeating keywords more than 4-5 times flags resumes for keyword stuffing.
   - Ideal keyword integration embeds core tools inside contextual achievement descriptions rather than comma-separated lists alone.

---

## 2. Hard Skills Taxonomy by Seniority Level

| Role Target | Core Languages & Runtimes | Distributed Architecture & Cloud | Specialized AI / Tooling |
| :--- | :--- | :--- | :--- |
| **Staff AI Engineer** | TypeScript, Python, Node.js, Go | Docker, Kubernetes, Fastify, gRPC, Redis | Model Context Protocol (MCP), Playwright, Vector DBs, LangChain |
| **Principal Full Stack** | TypeScript, React, Next.js, GraphQL | Microfrontends, Turborepo, AWS/GCP, PostgreSQL | Design Systems, CI/CD, Vite, Tailwind |
| **Lead Backend Engineer** | TypeScript, Node.js, Go, Rust | Kafka, RabbitMQ, PostgreSQL, Kubernetes | Microservices, Event Sourcing, Distributed Tracing |

---

## 3. STAR Bullet Structure Framework

Every bullet point in the candidate's experience section should follow the **STAR Framework**:

- **Situation / Task**: The business or architectural context and challenge.
- **Action**: The specific technologies and methodologies authored or driven by the candidate.
- **Result**: Quantifiable business impact, performance improvements, or developer productivity multipliers.

### Example STAR Bullets

- *Poor*: "Worked on microservices and MCP servers."
- *STAR Optimized*: "Architected self-contained dual-transport MCP servers using TypeScript and Fastify, reducing agent tool response latency by 42% across 14 enterprise services."
- *Poor*: "Optimized build times in the monorepo."
- *STAR Optimized*: "Migrated 8 micro-packages to Turborepo with pnpm catalogs, decreasing CI/CD verification cycles from 18 minutes to 4.5 minutes."
