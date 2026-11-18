import { z } from 'zod';
import { resumeManager } from '../resumes/resume-manager.js';

export const listResumesToolDefinition = {
  name: 'list_resumes',
  description: 'List all candidate resume files stored in $PLUGIN_DATA/resumes/ along with metadata (format, size, lastModified, and text preview).',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export async function handleListResumesTool(_args: unknown) {
  try {
    const resumes = resumeManager.listResumes();
    const directory = resumeManager.getDirectoryPath();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'success',
              directory,
              count: resumes.length,
              resumes,
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
      content: [{ type: 'text', text: `Failed to list resumes: ${message}` }],
    };
  }
}

const getResumeContentSchema = z.object({
  filename: z.string().describe('Filename of the resume to read (e.g. resume-fullstack.md, resume-pt.pdf)'),
});

export const getResumeContentToolDefinition = {
  name: 'get_resume_content',
  description: 'Read the text content or metadata of a candidate resume from $PLUGIN_DATA/resumes/ for job tailoring and ATS matching.',
  inputSchema: {
    type: 'object',
    properties: {
      filename: { type: 'string', description: 'Filename of the resume (e.g. resume-sample.md)' },
    },
    required: ['filename'],
  },
};

export async function handleGetResumeContentTool(args: unknown) {
  try {
    const parsed = getResumeContentSchema.parse(args);
    const resume = resumeManager.getResume(parsed.filename);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'success',
              filename: resume.filename,
              path: resume.path,
              isText: resume.isText,
              sizeBytes: resume.sizeBytes,
              content: resume.content || '[Binary file: PDF/DOCX format - ready for Easy Apply attachment]',
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
      content: [{ type: 'text', text: `Failed to retrieve resume content: ${message}` }],
    };
  }
}
