---
name: linkedin-outreach-operator
description: Identifies hiring managers and recruiters, drafts hyper-personalized connection notes and InMail messages, coordinates recruiter conversation threads, and enforces human-in-the-loop confirmation before message dispatch.
---

# LinkedIn Outreach Operator

Specialized agent skill for professional networking, recruiter communication, and tailored job outreach on LinkedIn.

---

## 1. When to Use

Activate this skill when:
- The user requests to connect with a recruiter, hiring manager, or technical peer on LinkedIn.
- Drafting concise, high-converting connection invitation notes (<= 300 characters).
- Drafting detailed InMail messages referencing specific projects, mutual technologies, or company needs.
- Preparing replies to ongoing recruiter conversation threads.

Do NOT activate this skill when:
- Rewriting candidate experience bullets or headline (use `linkedin-profile-architect`).
- Searching or ranking job listings (use `linkedin-job-operator`).
- Handling Easy Apply form questionnaires (use `linkedin-application-auditor`).

---

## 2. Operational Workflows

### Workflow A: Recruiter Inspection & Context Gathering
```json
// Inspect recruiter profile details and focus areas
{
  "tool": "get_person_profile",
  "arguments": {
    "profile_id": "alex-rivera-talent"
  }
}
```

### Workflow B: Personalized Connection Request
Draft invitation notes strictly under 300 characters:
```text
Hi Alex, I saw you're hiring Staff Engineers for Autonomous Systems. With 6+ years in TypeScript, distributed architectures, and MCP servers, I'd love to connect and follow your team's engineering work!
```

Execution with confirmation gate:
```json
// Gated dispatch
{
  "tool": "connect_with_person",
  "arguments": {
    "profile_id": "alex-rivera-talent",
    "note": "Hi Alex, saw you lead engineering at Autonomous Systems. Having built self-contained MCP servers in TypeScript, I'd love to connect!",
    "confirm_send": true
  }
}
```

### Workflow C: Thread Replies & Ongoing Communication
```json
// Gated reply to recruiter
{
  "tool": "reply_to_conversation",
  "arguments": {
    "thread_id": "thread_892110",
    "message": "Thank you for reaching out, Alex. Yes, I am open to discussing the Staff AI Engineer role. My current timezone is UTC-3 and I work 100% remotely. Would Thursday at 14:00 UTC work for a quick conversation?",
    "confirm_send": true
  }
}
```

---

## 3. Governance Constraints

1. **Zero-Spam Discipline**: Never dispatch repetitive, generic, or mass connection requests. Every outreach must cite specific technical relevance.
2. **Character Limits**: Connection notes MUST NOT exceed 300 characters. InMail messages should target <= 600 characters for optimal recruiter response.
3. **Confirmation Invariant**: Never send connection requests or direct messages without explicit developer authorization (`confirm_send: true`).
4. **Zero-Emoji Invariant**: Zero emojis across all invitation notes, messages, and reports.
