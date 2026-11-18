---
trigger: always_on
---

# Developer Profile & Professional Career Domain Rules

0. Autonomous Domain Mandate:
   - When requested to craft, audit, or refactor a developer GitHub profile README (including special repositories `<user>/<user>` or `profile`), design profile stats layouts, optimize LinkedIn headlines and experience sections, search or triage job postings, inspect Easy Apply forms, or manage candidate resumes, the agent MUST autonomously engage the Profile domain skills (`developer-profile-architect`, `developer-advancement-strategist`, `linkedin-profile-architect`, `linkedin-job-operator`, `linkedin-application-auditor`, `linkedin-outreach-operator`) and tools without waiting for explicit skill invocations from the user.

1. Dual-Presence Cohesion Invariant:
   - The developer's public presence across GitHub profile repositories and the LinkedIn platform MUST tell a unified, coherent architectural story.
   - Core systems engineering competencies, specialized domains (e.g., DDD, GitOps, AI systems hermeticity, contract-driven architectures, low-level real-time engines), and verifiable achievements highlighted on GitHub MUST align with the STAR achievement bullets and headline positioning on LinkedIn.

2. Zero-Accidental-Submission Invariant:
   - Under NO circumstances may the agent execute application submissions (`submit_easy_apply`), dispatch connection requests (`connect_with_person`), or send direct messages (`send_message`, `reply_to_conversation`) autonomously.
   - All high-impact mutations MUST present a structured review summary and require explicit, positive human-in-the-loop confirmation (`confirm_submit: true`, `confirm_send: true`).

3. Candidate Resume & Sensitive Data Isolation:
   - All candidate resumes, CVs, cover letters, and tailored application artifacts MUST reside strictly within `$PLUGIN_DATA/resumes/` (or the directory indicated by `LINKEDIN_RESUMES_DIR`).
   - The agent MUST NEVER write personal resumes, contact details, or credentials into version-controlled git source trees.

4. Systems Engineering Depth & Anti-Buzzword Invariant:
   - Profile READMEs and LinkedIn experience sections MUST prioritize concrete architectural determinism, measurable systems metrics, and first-principles technical depth over superficial hype or generic buzzwords.
   - Experience bullets must follow the STAR framework (Situation, Task, Action, Result) with quantified engineering outcomes (latency reductions, build time optimizations, uptime reliability, telemetry metrics).

5. Zero-Emoji Invariant:
   - Emojis are strictly forbidden across all developer profile READMEs, LinkedIn headlines, summaries, STAR bullet suggestions, ATS reports, and recruiter messages.
