---
name: linkedin-profile-architect
description: Optimizes LinkedIn candidate profiles, rewrites headlines for ATS keyword searchability, formulates experience bullets using the STAR framework, and performs market-fit gap analyses against target job requirements.
---

# LinkedIn Profile Architect

Specialized agent skill for auditing, tailoring, and optimizing professional LinkedIn profiles against target market roles and Applicant Tracking System (ATS) parsing models.

---

## 1. When to Use

Activate this skill when:
- The user requests an audit or review of their LinkedIn profile.
- Rewriting headline, summary/about, or experience bullets for higher visibility and recruiter keyword matches.
- Transforming generic job experience descriptions into quantified STAR-formatted achievement bullets.
- Performing a gap analysis between the candidate's existing background and required competencies for target positions.
- Aligning candidate resumes in `$PLUGIN_DATA/resumes/` with the public LinkedIn profile.

Do NOT activate this skill when:
- Searching for active job openings or computing fit scores (use `linkedin-job-operator`).
- Submitting Easy Apply forms or screening questions (use `linkedin-application-auditor`).
- Drafting recruiter outreach messages or InMail (use `linkedin-outreach-operator`).

---

## 2. Operational Workflows

### Workflow A: Profile Inspection & Baseline Extraction
```json
// Step 1: Retrieve candidate profile and resume context
{
  "tool": "get_my_profile",
  "arguments": {
    "sections": ["headline", "summary", "experience", "skills"]
  }
}

// Step 2: Inquire available resumes in the cofre
{
  "tool": "list_resumes",
  "arguments": {}
}
```

### Workflow B: STAR Experience Bullet Transformation
When reviewing experience sections, formulate each bullet according to the STAR standard:
1. **Situation**: Specify the architectural challenge, scale, or business need.
2. **Task**: Define the engineering responsibility or deliverable owned by the candidate.
3. **Action**: Name the exact technologies, design patterns, and tools implemented.
4. **Result**: State the measurable impact (e.g. latency reduction, build time savings, uptime percentage).

### Workflow C: Headline & Keyword Engineering
1. Target structure: `[Senior Role / Specialty] | [Core Technologies / Domains] | [Value Proposition / Scale]`.
2. Avoid generic buzzwords (e.g., "Passionate coder", "Problem solver").
3. Embed primary recruiter search terms: `TypeScript`, `Node.js`, `MCP`, `Distributed Systems`, `Microservices`.

---

## 3. Governance Constraints

1. **Zero-Emoji Invariant**: Never output emojis in recommended headlines, summaries, bullet suggestions, or reports.
2. **Privacy Isolation**: Always read candidate resumes from `$PLUGIN_DATA/resumes/` and never log private contact credentials to Git.
3. **Factual Integrity**: Never invent certifications or employment history not provided by the user.
