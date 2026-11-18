import { z } from 'zod';

const searchJobsSchema = z.object({
  keywords: z.string().describe('Target job titles, technologies, or keywords (e.g. Staff Software Engineer TypeScript)'),
  location: z.string().optional().default('Remote').describe('Geographic location or Remote'),
  remote_only: z.coerce.boolean().optional().default(true).describe('Filter for fully remote positions'),
  limit: z.coerce.number().optional().default(10).describe('Maximum number of job postings to return'),
});

export const searchJobsToolDefinition = {
  name: 'search_jobs',
  description: 'Search for active job postings on LinkedIn by keywords, seniority, technology stack, and remote filters.',
  inputSchema: {
    type: 'object',
    properties: {
      keywords: { type: 'string', description: 'Job title or skills keywords' },
      location: { type: 'string', description: 'Target location (e.g. Remote, Brazil, US)' },
      remote_only: { type: 'boolean', description: 'Filter only remote opportunities' },
      limit: { type: 'number', description: 'Maximum results to return' },
    },
    required: ['keywords'],
  },
};

export async function handleSearchJobsTool(args: unknown) {
  try {
    const parsed = searchJobsSchema.parse(args);

    // Simulated / normalized job discoveries adhering to LinkedIn schema
    const results = [
      {
        jobId: '412891001',
        title: 'Senior / Staff AI Agent Engineer',
        company: 'Autonomous Systems Inc.',
        location: parsed.location || 'Remote',
        workplaceType: 'remote',
        postedDate: '1 day ago',
        easyApply: true,
        snippet: 'Seeking a Staff Engineer experienced in Model Context Protocol (MCP), TypeScript monorepos, and agentic workflows.',
      },
      {
        jobId: '412891002',
        title: 'Lead Distributed Systems Architect',
        company: 'Cloud Scale Platforms',
        location: parsed.location || 'Remote',
        workplaceType: 'remote',
        postedDate: '3 days ago',
        easyApply: true,
        snippet: 'Lead our next-generation gateway infrastructure using Fastify, Docker, and Kubernetes.',
      },
      {
        jobId: '412891003',
        title: 'Principal Full Stack Engineer (TypeScript/React)',
        company: 'Enterprise AI Workspace',
        location: parsed.location || 'Remote',
        workplaceType: 'remote',
        postedDate: 'Just now',
        easyApply: false,
        snippet: 'Architect modern web interfaces and backend services for developer platforms.',
      },
    ].slice(0, parsed.limit);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'success',
              query: parsed.keywords,
              location: parsed.location,
              count: results.length,
              jobs: results,
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
      content: [{ type: 'text', text: `Failed to search jobs: ${message}` }],
    };
  }
}

const getJobDetailsSchema = z.object({
  job_id: z.string().describe('LinkedIn job posting ID'),
});

export const getJobDetailsToolDefinition = {
  name: 'get_job_details',
  description: 'Retrieve full job description, requirements, hiring team details, and Easy Apply eligibility.',
  inputSchema: {
    type: 'object',
    properties: {
      job_id: { type: 'string', description: 'LinkedIn job ID' },
    },
    required: ['job_id'],
  },
};

export async function handleGetJobDetailsTool(args: unknown) {
  try {
    const parsed = getJobDetailsSchema.parse(args);

    const details = {
      jobId: parsed.job_id,
      title: 'Senior / Staff AI Agent Engineer',
      company: 'Autonomous Systems Inc.',
      location: 'Remote',
      workplaceType: 'remote',
      postedDate: '1 day ago',
      applicantCount: 14,
      easyApply: true,
      description: `About the Role:
We are looking for a Staff AI Engineer to drive our autonomous agent mesh and MCP server ecosystem.

Key Responsibilities:
- Design and maintain production Model Context Protocol (MCP) servers using TypeScript, Fastify, and Stdio transports.
- Implement robust human-in-the-loop lifecycle hooks and safety controls for agent execution.
- Maintain high code coverage, monorepo project references, and zero-drift configurations.

Required Qualifications:
- 5+ years of software development experience with TypeScript and Node.js.
- Deep hands-on experience with AI agent frameworks, MCP, and browser automation (Playwright).
- Strong background in distributed systems, CI/CD pipelines, and cloud containers.`,
      requiredSkills: ['TypeScript', 'Node.js', 'Model Context Protocol (MCP)', 'Fastify', 'Playwright', 'Docker'],
      hiringTeam: {
        name: 'Alex Rivera',
        title: 'Head of Engineering',
        profileId: 'alex-rivera-talent',
      },
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(details, null, 2),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to get job details: ${message}` }],
    };
  }
}

const dismissJobSchema = z.object({
  job_id: z.string().describe('LinkedIn job ID to dismiss'),
});

export const dismissJobToolDefinition = {
  name: 'dismiss_job',
  description: 'Dismiss a job posting from candidate recommendation queues and discovery streams.',
  inputSchema: {
    type: 'object',
    properties: {
      job_id: { type: 'string', description: 'LinkedIn job ID' },
    },
    required: ['job_id'],
  },
};

export async function handleDismissJobTool(args: unknown) {
  try {
    const parsed = dismissJobSchema.parse(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'success',
              jobId: parsed.job_id,
              dismissed: true,
              message: `Job ${parsed.job_id} dismissed from active queue.`,
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
      content: [{ type: 'text', text: `Failed to dismiss job: ${message}` }],
    };
  }
}
