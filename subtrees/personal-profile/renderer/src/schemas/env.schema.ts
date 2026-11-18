import { z } from 'zod';
import dotenv from 'dotenv';
import ProjectConfig from '../../../project.config.js';

dotenv.config();

const fallbackOwner = ProjectConfig.REPOSITORY_OWNER;
const fallbackRepo = ProjectConfig.REPOSITORY_NAME;

export const ConfigSchema = z.object({
  githubToken: z.string().min(1, 'RENDERER_GH_PAT is required'),
  repositoryOwner: z.string().min(1, 'REPOSITORY_OWNER is required').default(fallbackOwner),
  repositoryName: z.string().min(1, 'REPOSITORY_NAME is required').default(fallbackRepo),
  targetBranch: z.string().min(1, 'TARGET_BRANCH is required').default('develop'),
  excludeRepos: z.array(z.string()).default([]),
  excludeLangs: z.array(z.string()).default([]),
  excludePrivate: z.boolean().default(false),
  isGitHubAction: z.boolean().default(false),
  maxRetries: z.number().int().min(0).max(10).default(3),
});

export type Config = z.infer<typeof ConfigSchema>;
