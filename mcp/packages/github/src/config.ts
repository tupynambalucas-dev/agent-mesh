import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.coerce.number().default(8080),
  // Tier 1: tupynambalucas-org-manager
  ORG_MANAGER_APP_ID: z.string().optional().default(''),
  ORG_MANAGER_APP_CLIENT_ID: z.string().optional().default(''),
  ORG_MANAGER_APP_INSTALLATION_ID: z.string().optional().default(''),
  ORG_MANAGER_APP_PRIVATE_KEY: z.string().optional().default(''),
  ORG_MANAGER_APP_PRIVATE_KEY_BASE64: z.string().optional().default(''),
  ORG_MANAGER_APP_PRIVATE_KEY_PATH: z.string().optional().default(''),
  GITHUB_ORG_MANAGER_APP_ID: z.string().optional().default(''),
  GITHUB_ORG_MANAGER_APP_CLIENT_ID: z.string().optional().default(''),
  GITHUB_ORG_MANAGER_APP_INSTALLATION_ID: z.string().optional().default(''),
  GITHUB_ORG_MANAGER_APP_PRIVATE_KEY: z.string().optional().default(''),
  GITHUB_ORG_MANAGER_APP_PRIVATE_KEY_BASE64: z.string().optional().default(''),
  GITHUB_ORG_MANAGER_APP_PRIVATE_KEY_PATH: z.string().optional().default(''),

  // Tier 2: tupynambalucas-ci-bot
  CI_BOT_APP_ID: z.string().optional().default(''),
  CI_BOT_APP_CLIENT_ID: z.string().optional().default(''),
  CI_BOT_APP_INSTALLATION_ID: z.string().optional().default(''),
  CI_BOT_APP_PRIVATE_KEY: z.string().optional().default(''),
  CI_BOT_APP_PRIVATE_KEY_BASE64: z.string().optional().default(''),
  CI_BOT_APP_PRIVATE_KEY_PATH: z.string().optional().default(''),
  GITHUB_CI_BOT_APP_ID: z.string().optional().default(''),
  GITHUB_CI_BOT_APP_CLIENT_ID: z.string().optional().default(''),
  GITHUB_CI_BOT_APP_INSTALLATION_ID: z.string().optional().default(''),
  GITHUB_CI_BOT_APP_PRIVATE_KEY: z.string().optional().default(''),
  GITHUB_CI_BOT_APP_PRIVATE_KEY_BASE64: z.string().optional().default(''),
  GITHUB_CI_BOT_APP_PRIVATE_KEY_PATH: z.string().optional().default(''),

  // Tier 3: tupynambalucas-developer-tools
  DEVELOPER_TOOLS_APP_ID: z.string().optional().default(''),
  DEVELOPER_TOOLS_APP_CLIENT_ID: z.string().optional().default(''),
  GITHUB_DEVELOPER_TOOLS_APP_CLIENT_ID: z.string().optional().default(''),
  GITHUB_DEVELOPER_TOOLS_APP_ID: z.string().optional().default(''),
  // Legacy Aliases & Fallbacks
  GITHUB_APP_ID: z.string().optional().default(''),
  GITHUB_APP_CLIENT_ID: z.string().optional().default(''),
  GITHUB_APP_PRIVATE_KEY: z.string().optional().default(''),
  GITHUB_APP_PRIVATE_KEY_BASE64: z.string().optional().default(''),
  GITHUB_APP_PRIVATE_KEY_PATH: z.string().optional().default(''),
  GITHUB_APP_INSTALLATION_ID: z.string().optional().default(''),
  CI_APP_ID: z.string().optional().default(''),
  CI_APP_CLIENT_ID: z.string().optional().default(''),
  CI_APP_INSTALLATION_ID: z.string().optional().default(''),
  CI_APP_PRIVATE_KEY: z.string().optional().default(''),
  CI_APP_PRIVATE_KEY_BASE64: z.string().optional().default(''),
  CI_APP_PRIVATE_KEY_PATH: z.string().optional().default(''),
  GITHUB_DEVELOPER_TOOLS_CLIENT_ID: z.string().optional().default(''),
  GITHUB_PERSONAL_ACCESS_TOKEN: z.string().optional().default(''),
  GITHUB_TOKEN: z.string().optional().default(''),
  GITHUB_ORG: z.string().default('tupynambalucas-dev'),
  NODE_ENV: z.string().default('development'),
});

export const config = configSchema.parse(process.env);
