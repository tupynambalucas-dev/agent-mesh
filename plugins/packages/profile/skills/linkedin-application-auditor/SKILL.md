---
name: linkedin-application-auditor
description: Inspects multi-step LinkedIn Easy Apply modal forms, pre-fills screening answers, selects matching candidate resumes from $PLUGIN_DATA/resumes/, formats structured application review diffs, and enforces safety confirmation gates before submission.
---

# LinkedIn Application Auditor

Specialized agent skill for automating and auditing LinkedIn Easy Apply workflows with strict human-in-the-loop safety gating.

---

## 1. When to Use

Activate this skill when:
- The user requests to apply or prepare an application for a LinkedIn Easy Apply position.
- Inspecting screening questions, radio options, and required attachments in an application modal.
- Pre-filling applicant questionnaires and matching the best resume from `$PLUGIN_DATA/resumes/`.
- Validating application readiness and presenting a structured review diff before submission.

Do NOT activate this skill when:
- Auditing or optimizing general profile text (use `linkedin-profile-architect`).
- Searching or ranking broad job postings (use `linkedin-job-operator`).
- Sending connection requests or InMail messages (use `linkedin-outreach-operator`).
- Designing GitHub profile READMEs (use `developer-profile-architect`).

---

## 2. Operational Workflows

### Workflow A: Easy Apply Modal Inspection (Dry-Run)
```json
// Step 1: Inspect form structure, questions, and required fields
{
  "tool": "get_easy_apply_form",
  "arguments": {
    "job_id": "412891001"
  }
}

// Step 2: List candidate resumes to choose the best version
{
  "tool": "list_resumes",
  "arguments": {}
}
```

### Workflow B: Structured Review Presentation
Before executing any submission, present a clear markdown table summarizing:
- **Target Role & Company**: Title and company name.
- **Attached Resume**: Exact filename from `$PLUGIN_DATA/resumes/`.
- **Contact Details**: Email and phone number.
- **Screening Question Answers**: Full list of pre-filled answers (years of experience, work authorization, salary expectations).

### Workflow C: Confirmed Application Submission
Only when the user provides explicit, positive confirmation:
```json
{
  "tool": "submit_easy_apply",
  "arguments": {
    "job_id": "412891001",
    "resume_filename": "resume-staff-engineer.md",
    "answers": {
      "years_experience_typescript": 7,
      "sponsorship_required": false
    },
    "confirm_submit": true
  }
}
```

---

## 3. Governance Constraints

1. **Zero-Accidental-Submission Invariant**: Never call `submit_easy_apply` with `confirm_submit: true` without explicit user instruction.
2. **Resume Vault Discipline**: All resumes must be sourced from `$PLUGIN_DATA/resumes/` and never written to git tracked trees.
3. **Zero-Emoji Invariant**: Never output emojis in application diffs, confirmation dialogs, or audit summaries.
