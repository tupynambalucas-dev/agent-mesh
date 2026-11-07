import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.coerce.number().default(8080),
  APPSHEET_APP_ID: z.string().optional().default(''),
  APPSHEET_APPLICATION_ACCESS_KEY: z.string().optional().default(''),
  APPSHEET_API_URL: z.string().default('https://api.appsheet.com/api/v2'),
  NODE_ENV: z.string().default('development'),
});

export const config = configSchema.parse(process.env);
