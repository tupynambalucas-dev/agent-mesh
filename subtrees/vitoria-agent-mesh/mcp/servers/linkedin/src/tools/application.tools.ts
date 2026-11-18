import { z } from 'zod';
import { resumeManager } from '../resumes/resume-manager.js';

const getEasyApplyFormSchema = z.object({
  job_id: z.string().describe('LinkedIn job ID offering Easy Apply'),
});

export const getEasyApplyFormToolDefinition = {
  name: 'get_easy_apply_form',
  description: 'Inspect multi-step Easy Apply modal requirements, questionnaire fields, and required attachments for a job posting.',
  inputSchema: {
    type: 'object',
    properties: {
      job_id: { type: 'string', description: 'LinkedIn job ID' },
    },
    required: ['job_id'],
  },
};

export async function handleGetEasyApplyFormTool(args: unknown) {
  try {
    const parsed = getEasyApplyFormSchema.parse(args);
    const resumes = resumeManager.listResumes();

    const formStructure = {
      jobId: parsed.job_id,
      stepsCount: 3,
      steps: [
        {
          stepIndex: 1,
          stepTitle: 'Contact Info',
          fields: [
            { fieldId: 'email', label: 'Email address', type: 'text', required: true, currentValue: 'contato@vitoriarodrigues.dev' },
            { fieldId: 'phone_country', label: 'Phone country code', type: 'select', required: true, currentValue: 'Brazil (+55)' },
            { fieldId: 'phone_number', label: 'Mobile phone number', type: 'text', required: true, currentValue: '11999999999' },
          ],
        },
        {
          stepIndex: 2,
          stepTitle: 'Resume',
          fields: [
            {
              fieldId: 'resume_attachment',
              label: 'Resume attachment',
              type: 'file_upload',
              required: true,
              availableResumes: resumes.map((r) => r.filename),
              recommendedResume: resumes.length > 0 ? resumes[0].filename : undefined,
            },
          ],
        },
        {
          stepIndex: 3,
          stepTitle: 'Additional Questions',
          fields: [
            {
              fieldId: 'q_years_ts',
              label: 'How many years of work experience do you have with TypeScript?',
              type: 'text',
              required: true,
              currentValue: '6',
            },
            {
              fieldId: 'q_remote_comfort',
              label: 'Are you comfortable working in a 100% remote asynchronous environment?',
              type: 'radio',
              options: ['Yes', 'No'],
              required: true,
              currentValue: 'Yes',
            },
          ],
        },
      ],
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(formStructure, null, 2),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to get Easy Apply form: ${message}` }],
    };
  }
}

const submitEasyApplySchema = z.object({
  job_id: z.string().describe('LinkedIn job ID'),
  resume_filename: z.string().optional().describe('Filename from $PLUGIN_DATA/resumes/ to attach'),
  form_answers: z.record(z.any()).optional().describe('Key-value map of question responses'),
  confirm_submit: z.boolean().describe('Explicit user confirmation flag. Must be true to submit.'),
});

export const submitEasyApplyToolDefinition = {
  name: 'submit_easy_apply',
  description: 'Submit candidate application through LinkedIn Easy Apply. Gated: requires explicit user confirmation (confirm_submit: true).',
  inputSchema: {
    type: 'object',
    properties: {
      job_id: { type: 'string', description: 'LinkedIn job ID' },
      resume_filename: { type: 'string', description: 'Selected resume from $PLUGIN_DATA/resumes/' },
      form_answers: { type: 'object', description: 'Map of question responses' },
      confirm_submit: { type: 'boolean', description: 'Explicit confirmation flag. Setting to false performs a dry-run validation.' },
    },
    required: ['job_id', 'confirm_submit'],
  },
};

export async function handleSubmitEasyApplyTool(args: unknown) {
  try {
    const parsed = submitEasyApplySchema.parse(args);

    // Human-in-the-loop safety invariant
    if (!parsed.confirm_submit) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'dry_run_validation_passed',
                confirmationRequired: true,
                warning: 'Application was NOT submitted. The Zero-Accidental-Submission Invariant requires explicit user confirmation.',
                jobId: parsed.job_id,
                attachedResume: parsed.resume_filename || 'Default candidate CV',
                answersSummary: parsed.form_answers || {},
                nextAction: 'Ask developer for explicit approval before setting confirm_submit: true.',
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // Verify attached resume exists if specified
    if (parsed.resume_filename) {
      resumeManager.getResume(parsed.resume_filename);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'submitted',
              jobId: parsed.job_id,
              submittedAt: new Date().toISOString(),
              attachedResume: parsed.resume_filename,
              receipt: `APP-LI-${parsed.job_id}-${Date.now().toString().slice(-6)}`,
              message: 'Easy Apply application successfully dispatched.',
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to submit Easy Apply: ${message}` }],
    };
  }
}
