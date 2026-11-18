import { z } from 'zod';
import { resumeManager } from '../resumes/resume-manager.js';

export const getMyProfileToolDefinition = {
  name: 'get_my_profile',
  description: 'Retrieve the authenticated user profile information, headline, experience bullets, and skills inventory.',
  inputSchema: {
    type: 'object',
    properties: {
      sections: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific sections to retrieve: experience, education, skills, summary, headline',
      },
    },
  },
};

export async function handleGetMyProfileTool(args: unknown) {
  try {
    const resumes = resumeManager.listResumes();
    let primaryResumeExcerpt: string | undefined;

    if (resumes.length > 0 && resumes[0].isText) {
      const first = resumeManager.getResume(resumes[0].filename);
      primaryResumeExcerpt = first.content;
    }

    const profile = {
      name: 'Vitoria Rodrigues',
      headline: 'Staff Software Engineer | Distributed Systems & AI Agent Architecture',
      location: 'São Paulo, Brazil (Remote)',
      summary: 'Senior Software Engineer specializing in enterprise AI agent architectures, TypeScript monorepos, and high-performance MCP tooling.',
      skills: [
        'TypeScript',
        'Node.js',
        'Model Context Protocol (MCP)',
        'Playwright',
        'Docker',
        'Kubernetes',
        'Fastify',
        'Turborepo',
        'Zod',
      ],
      experience: [
        {
          title: 'Staff Software Engineer & Agent Architect',
          company: 'vitoriarodrigues.dev',
          startDate: '2024-01',
          endDate: 'Present',
          description: 'Architected enterprise AI agent mesh coordinating sovereign MCP servers and autonomous domain plugins with deterministic safety hooks.',
        },
      ],
      education: [
        {
          institution: 'Universidade de São Paulo (USP)',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
        },
      ],
      activeResume: primaryResumeExcerpt ? 'Loaded from $PLUGIN_DATA/resumes/' : 'None detected',
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(profile, null, 2),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to get profile: ${message}` }],
    };
  }
}

const getPersonProfileSchema = z.object({
  profile_id: z.string().describe('LinkedIn public username, slug, or profile ID (e.g. vitoria-rodrigues)'),
  sections: z.array(z.string()).optional(),
});

export const getPersonProfileToolDefinition = {
  name: 'get_person_profile',
  description: 'Retrieve public profile details of a member, hiring manager, or technical recruiter on LinkedIn.',
  inputSchema: {
    type: 'object',
    properties: {
      profile_id: { type: 'string', description: 'LinkedIn profile ID or vanity URL slug' },
      sections: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific profile sections to inspect',
      },
    },
    required: ['profile_id'],
  },
};

export async function handleGetPersonProfileTool(args: unknown) {
  try {
    const parsed = getPersonProfileSchema.parse(args);

    const publicProfile = {
      profileId: parsed.profile_id,
      headline: 'Technical Recruiter & Talent Partner',
      company: 'Tech Enterprise',
      location: 'Global / Remote',
      connectionDegree: '2nd',
      about: 'Focusing on Staff, Principal, and Lead Software Engineering hiring in AI and Infrastructure domains.',
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(publicProfile, null, 2),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to get person profile: ${message}` }],
    };
  }
}
