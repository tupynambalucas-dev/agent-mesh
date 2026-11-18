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
- **Screening Question Answers**: Pre-filled responses (experience years, remote willingness, sponsorship).

### Workflow C: Gated Application Submission
```json
// Execute dry-run validation first
{
  "tool": "submit_easy_apply",
  "arguments": {
    "job_id": "412891001",
    "resume_filename": "resume-sample.md",
    "form_answers": {
      "q_years_ts": "6",
      "q_remote_comfort": "Yes"
    },
    "confirm_submit": false
  }
}

// Upon explicit positive user consent, finalize submission
{
  "tool": "submit_easy_apply",
  "arguments": {
    "job_id": "412891001",
    "resume_filename": "resume-sample.md",
    "form_answers": {
      "q_years_ts": "6",
      "q_remote_comfort": "Yes"
    },
    "confirm_submit": true
  }
}
```

---

## 3. Governance Constraints

1. **Zero-Accidental-Submission Invariant**: Under no circumstances execute `submit_easy_apply` with `confirm_submit: true` without explicit prior approval from the developer.
2. **Resume Location Invariant**: Only attach or reference resumes stored inside `$PLUGIN_DATA/resumes/`.
3. **Zero-Emoji Invariant**: Maintain professional, emoji-free formatting in review diffs and status receipts.
