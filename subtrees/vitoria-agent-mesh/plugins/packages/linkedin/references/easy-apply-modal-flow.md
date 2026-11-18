# LinkedIn Easy Apply Modal Flow & Lifecycle Specification

This reference outlines the technical state machine, input schemas, and validation contracts governing LinkedIn Easy Apply modals.

---

## 1. Easy Apply Multi-Step Flow

The Easy Apply workflow executes through a sequential multi-step modal dialog:

```text
[Step 1: Contact Info]
  ├── Email Address (verified primary account email)
  ├── Country Phone Code
  └── Mobile Phone Number
          │
          ▼
[Step 2: Resume Selection]
  ├── Existing Cached LinkedIn Resumes
  └── Upload New File (.pdf, .docx, .txt from $PLUGIN_DATA/resumes/)
          │
          ▼
[Step 3: Screening Questions (Varies by Posting)]
  ├── Numeric Years of Experience (e.g., "Years with TypeScript")
  ├── Single-Select Dropdowns (e.g., Work Authorization, Education level)
  ├── Radio Buttons (e.g., "Comfortable working remote? Yes/No")
  └── Free-Text Short Responses (e.g., Portfolio URL, Expected Salary)
          │
          ▼
[Step 4: Review Application]
  ├── Summary of answers
  ├── Attached resume preview
  └── Submission confirmation gate
          │
          ▼
[Step 5: Gated Submission]
  └── Explicit user confirmation (confirm_submit: true) required
```

---

## 2. Safety & Dry-Run Invariant

Under the **Zero-Accidental-Submission Invariant**:

1. The agent must never call `submit_easy_apply` with `confirm_submit: true` without explicit prior consent from the developer.
2. The agent executes a dry-run first (`confirm_submit: false` or `get_easy_apply_form`), presenting the answers, attached resume, and question mappings in chat.
3. Once the developer gives positive confirmation, the agent completes the submission.
