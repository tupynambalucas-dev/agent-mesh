import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.coerce.number().default(8080),
  HOST: z.string().default('0.0.0.0'),
  PLAYWRIGHT_CDP_URL: z.string().default('http://localhost:9222'),
  PLAYWRIGHT_MODE: z.enum(['auto', 'extension', 'channel', 'cdp', 'headless']).default('auto'),
  PLAYWRIGHT_CHANNEL: z.enum(['chrome', 'msedge', 'chrome-beta', 'chrome-canary', 'chromium']).default('chrome'),
  PLAYWRIGHT_HEADLESS: z
    .string()
    .transform((val) => val === 'true' || val === '1')
    .default('false'),
  PLAYWRIGHT_MCP_EXTENSION_TOKEN: z.string().optional().default(''),
  NODE_ENV: z.string().default('development'),
});

export const config = configSchema.parse(process.env);
