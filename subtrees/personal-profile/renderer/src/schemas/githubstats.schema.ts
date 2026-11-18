import { z } from 'zod';

export const LanguageSchema = z.object({
  name: z.string(),
  size: z.number(),
  color: z.string().nullable().optional(),
});

export type Language = z.infer<typeof LanguageSchema>;

export const RepositorySchema = z.object({
  name: z.string(),
  stars: z.number(),
  forks: z.number(),
  languages: z.array(LanguageSchema).nullable().optional(),
  lines_changed: z.number().default(0),
  views: z.number().default(0),
  private: z.boolean(),
});

export type Repository = z.infer<typeof RepositorySchema>;

export const GitHubStatsSchema = z.object({
  user: z.string(),
  name: z.string(),
  emails: z.array(z.string()),
  repo_contributions: z.number().default(0),
  issue_contributions: z.number().default(0),
  commit_contributions: z.number().default(0),
  pr_contributions: z.number().default(0),
  review_contributions: z.number().default(0),
  repositories: z.array(RepositorySchema),
});

export type GitHubStats = z.infer<typeof GitHubStatsSchema>;
