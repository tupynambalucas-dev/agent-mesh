import fs from 'node:fs';
import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { config } from '../config.js';

export type GitHubIdentityTier = 'org-manager' | 'developer-tools' | 'auto';

export function resolvePrivateKey(options: {
  keyPath?: string;
  keyBase64?: string;
  rawKey?: string;
}): string {
  // 1. Filesystem Path priority (ideal for Kubernetes secrets / mounted volumes)
  if (options.keyPath && options.keyPath.trim() !== '') {
    const resolvedPath = options.keyPath.trim();
    if (fs.existsSync(resolvedPath)) {
      return fs.readFileSync(resolvedPath, 'utf8').trim();
    }
    throw new Error(`[github-app.auth] Private key file not found at path: ${resolvedPath}`);
  }

  // 2. Base64 encoded string priority (enterprise standard for .env and cloud env vars)
  if (options.keyBase64 && options.keyBase64.trim() !== '') {
    const cleanedBase64 = options.keyBase64.trim().replace(/^["']|["']$/g, '');
    return Buffer.from(cleanedBase64, 'base64').toString('utf8').trim();
  }

  // 3. Raw / escaped PEM string fallback
  if (options.rawKey && options.rawKey.trim() !== '') {
    const trimmed = options.rawKey.trim().replace(/^["']|["']$/g, '');
    if (!trimmed.startsWith('-----BEGIN')) {
      return Buffer.from(trimmed, 'base64').toString('utf8').trim();
    }
    return trimmed.replace(/\\n/g, '\n');
  }

  return '';
}

async function createOrgManagerOctokit(): Promise<Octokit | null> {
  const appId =
    config.ORG_MANAGER_APP_ID ||
    config.GITHUB_ORG_MANAGER_APP_ID ||
    config.GITHUB_APP_ID;

  const privateKey = resolvePrivateKey({
    keyPath:
      config.ORG_MANAGER_APP_PRIVATE_KEY_PATH ||
      config.GITHUB_ORG_MANAGER_APP_PRIVATE_KEY_PATH ||
      config.GITHUB_APP_PRIVATE_KEY_PATH,
    keyBase64:
      config.ORG_MANAGER_APP_PRIVATE_KEY_BASE64 ||
      config.GITHUB_ORG_MANAGER_APP_PRIVATE_KEY_BASE64 ||
      config.GITHUB_APP_PRIVATE_KEY_BASE64,
    rawKey:
      config.ORG_MANAGER_APP_PRIVATE_KEY ||
      config.GITHUB_ORG_MANAGER_APP_PRIVATE_KEY ||
      config.GITHUB_APP_PRIVATE_KEY,
  });

  const installationIdStr =
    config.ORG_MANAGER_APP_INSTALLATION_ID ||
    config.GITHUB_ORG_MANAGER_APP_INSTALLATION_ID ||
    config.GITHUB_APP_INSTALLATION_ID;

  if (!appId || !privateKey || !installationIdStr) {
    return null;
  }

  const auth = createAppAuth({
    appId,
    privateKey,
    installationId: parseInt(installationIdStr, 10),
  });

  const installationAuth = await auth({ type: 'installation' });
  return new Octokit({ auth: installationAuth.token });
}

function createTokenOctokit(): Octokit | null {
  const token = config.GITHUB_PERSONAL_ACCESS_TOKEN || config.GITHUB_TOKEN;
  if (!token) {
    return null;
  }
  return new Octokit({ auth: token });
}

export async function getOctokitClient(tier: GitHubIdentityTier = 'auto'): Promise<Octokit> {
  if (tier === 'developer-tools') {
    const tokenClient = createTokenOctokit();
    if (tokenClient) {
      return tokenClient;
    }
    const appClient = await createOrgManagerOctokit();
    if (appClient) {
      return appClient;
    }
    return new Octokit();
  }

  const appClient = await createOrgManagerOctokit();
  if (appClient) {
    return appClient;
  }

  const tokenClient = createTokenOctokit();
  if (tokenClient) {
    return tokenClient;
  }

  return new Octokit();
}
