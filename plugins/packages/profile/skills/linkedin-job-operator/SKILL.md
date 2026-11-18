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
- Designing GitHub profile READMEs (use `developer-profile-architect`).

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

Evaluate alignment across four core vectors:
1. **Tech Stack Overlap**: Match candidate core languages and frameworks against requirements.
2. **Seniority Alignment**: Verify years of experience, architectural leadership, and scope.
3. **Domain Fit**: Compare background (distributed systems, AI agents, platform engineering) to the role's business domain.
4. **Workplace Preference**: Validate remote, hybrid, or relocation terms.

Output an explicit **Fit Score (0-100)**:
- **85-100**: Strong Fit (Immediate application recommended).
- **70-84**: Moderate Fit (Requires targeted resume tailoring).
- **< 70**: Weak Fit (Substantial qualification gap).

---

## 3. Governance Constraints

1. **Anti-Bot Throttling**: Avoid rapid consecutive requests; respect natural pacing when fetching multiple job descriptions.
2. **Zero-Emoji Invariant**: Never output emojis in job summaries, fit score breakdowns, or triage reports.
