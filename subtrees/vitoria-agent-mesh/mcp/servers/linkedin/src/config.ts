import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config();

const defaultHome = process.env.HOME || process.env.USERPROFILE || '.';
const defaultPluginData = process.env.PLUGIN_DATA || path.join(defaultHome, '.antigravity', 'data', 'linkedin');
const defaultResumesDir = path.join(defaultPluginData, 'resumes');

export const linkedinConfigSchema = z.object({
  PORT: z.coerce.number().default(8080),
  LINKEDIN_ENGINE: z.string().default('upstream'),
  LINKEDIN_USE_UPSTREAM: z.string().optional().default('true'),
  LINKEDIN_IMPORT_BROWSER: z.string().optional().default('auto'),
  LINKEDIN_HEADLESS: z.string().optional().default('true'),
  LINKEDIN_RESUMES_DIR: z.string().default(defaultResumesDir),
  LINKEDIN_SESSION_COOKIE: z.string().optional().default(''),
  LINKEDIN_ACCOUNT_EMAIL: z.string().optional().default(''),
  NODE_ENV: z.string().default('development'),
});

export type LinkedInConfig = z.infer<typeof linkedinConfigSchema>;
export const config: LinkedInConfig = linkedinConfigSchema.parse(process.env);
