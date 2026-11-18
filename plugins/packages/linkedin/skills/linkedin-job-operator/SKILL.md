---
name: linkedin-job-operator
description: Queries and filters active LinkedIn job postings, calculates semantic fit scores (0-100) against candidate profile and resumes, triages opportunities into actionable tiers, and manages discovery queues.
---

# LinkedIn Job Operator

Specialized agent skill for discovering, evaluating, and triaging LinkedIn job openings aligned with candidate skills, compensation goals, and remote workplace preferences.

---

## 1. When to Use

Activate this skill when:
- The user requests to search for jobs on LinkedIn (by title, technology, location, remote status).
- Evaluating whether a specific job description aligns with the candidate's skills and experience.
- Calculating a quantitative Fit Score (0-100) and identifying qualification gaps.
- Dismissing irrelevant or predatory job postings from the candidate queue.

Do NOT activate this skill when:
- Rewriting profile headlines, about sections, or experience bullets (use `linkedin-profile-architect`).
- Submitting Easy Apply forms or inspecting modal fields (use `linkedin-application-auditor`).
- Contacting recruiters or hiring managers directly (use `linkedin-outreach-operator`).

---

## 2. Operational Workflows

### Workflow A: Multi-Filter Job Discovery
```json
// Query remote opportunities matching core stack
{
  "tool": "search_jobs",
  "arguments": {
    "keywords": "Staff Software Engineer TypeScript",
    "location": "Remote",
    "remote_only": true,
    "limit": 10
  }
}
```

### Workflow B: Detailed Opportunity Inspection & Scoring
```json
// Inspect full job description and requirements
{
  "tool": "get_job_details",
  "arguments": {
    "job_id": "412891001"
  }
}
```

### Workflow C: Semantic Relevance Scoring Algorithm
Calculate the **Fit Score (0 to 100)** based on 4 weighted pillars:
1. **Hard Prerequisites Match (50% weight)**: Required languages, frameworks, and minimum years of experience.
2. **Domain & Problem Fit (25% weight)**: Distributed systems, agent platforms, SaaS architecture scale.
3. **Bonus & Nice-to-Have Skills (15% weight)**: Secondary tools, cloud certifications, specific devops tooling.
4. **Logistics & Alignment (10% weight)**: Remote eligibility, timezone compatibility.

### Workflow D: Triage Categorization
- `Tier 1 (Instant Easy Apply Candidate)`: Fit Score >= 85%, Easy Apply available.
- `Tier 2 (High Alignment External Application)`: Fit Score >= 80%, company ATS application.
- `Tier 3 (Stretch Role)`: Fit Score 65-79%, requires custom resume positioning.
- `Dismissed`: Under-qualified or misaligned location/stack (`dismiss_job`).

---

## 3. Governance Constraints

1. **Anti-Bot Throttling**: Avoid rapid-fire job lookups; adhere to natural pacing and targeted searches.
2. **Deterministic Triage**: Always provide transparent reasoning for the computed Fit Score.
3. **Zero-Emoji Invariant**: No emojis anywhere in job reports, summaries, or scorecards.
