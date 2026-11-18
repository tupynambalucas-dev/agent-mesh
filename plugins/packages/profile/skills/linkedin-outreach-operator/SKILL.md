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
- Designing GitHub profile READMEs (use `developer-profile-architect`).

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
Hi Alex, I saw you are hiring Staff Engineers for Autonomous Systems. With 7+ years in TypeScript, distributed architectures, and MCP servers, I would love to connect and follow your team's engineering work!
```

Execution with confirmation gate:
```json
// Gated dispatch
{
  "tool": "connect_with_person",
  "arguments": {
    "profile_id": "alex-rivera-talent",
    "message": "Hi Alex...",
    "confirm_send": true
  }
}
```

### Workflow C: Direct InMail & Messaging
```json
{
  "tool": "send_message",
  "arguments": {
    "profile_id": "alex-rivera-talent",
    "message": "Hi Alex,\n\nI reviewed your team's open Platform Architect position...",
    "confirm_send": true
  }
}
```

---

## 3. Governance Constraints

1. **Zero-Accidental-Dispatch Invariant**: Every `connect_with_person`, `send_message`, and `reply_to_conversation` tool call requires explicit confirmation (`confirm_send: true`).
2. **Character Budget Discipline**: Connection invitation notes MUST NOT exceed 300 characters.
3. **Zero-Emoji Invariant**: Never output emojis in connection notes, InMails, follow-ups, or audit logs.
