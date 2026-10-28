import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.coerce.number().default(8080),
  GITHUB_APP_ID: z.string().optional().default(''),
  GITHUB_APP_PRIVATE_KEY: z.string().optional().default(''),
  GITHUB_APP_INSTALLATION_ID: z.string().optional().default(''),
  GITHUB_PERSONAL_ACCESS_TOKEN: z.string().optional().default(''),
  GITHUB_TOKEN: z.string().optional().default(''),
  GITHUB_ORG: z.string().default('tupynambalucas-dev'),
  NODE_ENV: z.string().default('development'),
});

export const config = configSchema.parse(process.env);
