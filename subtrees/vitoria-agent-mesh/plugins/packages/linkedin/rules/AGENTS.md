---
trigger: always_on
---

# LinkedIn Professional Domain Rules

0. Autonomous Domain Mandate:
   - When requested to review, optimize, or tailor a LinkedIn profile, search or triage job postings, inspect Easy Apply applications, or manage candidate resumes, the agent MUST autonomously engage the LinkedIn domain skills and tools without waiting for explicit tool invocations from the user.

1. Zero-Accidental-Submission Invariant:
   - Under NO circumstances may the agent execute application submissions (`submit_easy_apply`), send connection invitations (`connect_with_person`), or dispatch direct messages (`send_message`) autonomously.
   - All high-impact mutations MUST present a structured review diff and require explicit, positive user confirmation (`confirm_submit: true`, `confirm_send: true`).

2. Candidate Resume Isolation Invariant:
   - All candidate CVs, cover letters, and tailored resumes MUST reside strictly within `$PLUGIN_DATA/resumes/` (or the directory indicated by `LINKEDIN_RESUMES_DIR`).
   - The agent MUST NEVER write personal resumes or credentials into version-controlled git source trees.

3. Anti-Bot Discipline & Respectful Automation:
   - The agent MUST maintain respectful pacing and avoid tight polling loops against the LinkedIn platform.
   - Automated queries MUST prioritize targeted filtering over unbounded bulk crawling.

4. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all profile recommendations, ATS audits, job triage reports, and recruiter messages.
