import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

function loadFallbackEnv() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '..', '.env'),
    path.resolve(process.cwd(), '..', '..', '.env'),
    path.resolve(process.cwd(), '..', '..', '..', '.env'),
  ];

  for (const envPath of candidates) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      break;
    }
  }
}

loadFallbackEnv();

export const config = {
  PORT: parseInt(process.env.PORT || '8080', 10),
  HOST_URL: process.env.INFISICAL_HOST_URL || 'https://app.infisical.com',
  CLIENT_ID: process.env.INFISICAL_UNIVERSAL_AUTH_CLIENT_ID || process.env.INFISICAL_CLIENT_ID || '',
  CLIENT_SECRET: process.env.INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET || process.env.INFISICAL_CLIENT_SECRET || '',
  PROJECT_ID: process.env.INFISICAL_PROJECT_ID || '134783dd-8a83-4dfc-9fd5-979b52bed86d',
  ENVIRONMENT: process.env.INFISICAL_ENVIRONMENT || 'dev',
};
