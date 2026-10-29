import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.coerce.number().default(8080),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional().default(''),
  GOOGLE_SERVICE_ACCOUNT_JSON: z.string().optional().default(''),
  NODE_ENV: z.string().default('development'),
});

export const config = configSchema.parse(process.env);
