import fs from 'node:fs';
import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { config } from '../config.js';

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
      // Auto-detect base64 even if passed in rawKey
      return Buffer.from(trimmed, 'base64').toString('utf8').trim();
    }
    return trimmed.replace(/\\n/g, '\n');
  }

  return '';
}

export async function getOctokitClient(): Promise<Octokit> {
  const appId = config.GITHUB_ORG_MANAGER_APP_ID || config.GITHUB_APP_ID;
  const privateKey = resolvePrivateKey({
    keyPath: config.GITHUB_ORG_MANAGER_APP_PRIVATE_KEY_PATH || config.GITHUB_APP_PRIVATE_KEY_PATH,
    keyBase64: config.GITHUB_ORG_MANAGER_APP_PRIVATE_KEY_BASE64 || config.GITHUB_APP_PRIVATE_KEY_BASE64,
    rawKey: config.GITHUB_ORG_MANAGER_APP_PRIVATE_KEY || config.GITHUB_APP_PRIVATE_KEY,
  });
  const installationIdStr = config.GITHUB_ORG_MANAGER_APP_INSTALLATION_ID || config.GITHUB_APP_INSTALLATION_ID;

  const hasAppCreds = appId && privateKey && installationIdStr;

  if (hasAppCreds) {
    const auth = createAppAuth({
      appId,
      privateKey,
      installationId: parseInt(installationIdStr, 10),
    });

    const installationAuth = await auth({ type: 'installation' });
    return new Octokit({ auth: installationAuth.token });
  }

  const token = config.GITHUB_PERSONAL_ACCESS_TOKEN || config.GITHUB_TOKEN;
  if (token) {
    return new Octokit({ auth: token });
  }

  return new Octokit();
}
