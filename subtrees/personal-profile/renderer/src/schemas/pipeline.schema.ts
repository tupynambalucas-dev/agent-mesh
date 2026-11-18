import { z } from 'zod';
import type { GitHubStats } from './githubstats.schema.js';
import type { Config } from './env.schema.js';

export const PipelineTargetSchema = z.object({
  name: z.string(),
  templatePath: z.string(), // path to template file (relative to workspaceRoot)
  outputPath: z.string(), // path to write the generated file locally (relative to workspaceRoot)
  ciPath: z.string(), // repository target path in CI/CD environment
  ciBranches: z.array(z.string()), // branches to publish to in CI/CD
});

export type PipelineTarget = z.infer<typeof PipelineTargetSchema>;

export const PipelineBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  targets: z.array(PipelineTargetSchema),
});

export interface Pipeline extends z.infer<typeof PipelineBaseSchema> {
  run(stats: GitHubStats, config: Config, workspaceRoot: string): Promise<void>;
}
