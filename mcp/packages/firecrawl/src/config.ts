import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.coerce.number().default(8080),
  FIRECRAWL_API_KEY: z.string().optional().default(''),
  FIRECRAWL_API_URL: z.string().optional().default('https://api.firecrawl.dev'),
  NODE_ENV: z.string().optional().default('development'),
});

export const config = configSchema.parse(process.env);
