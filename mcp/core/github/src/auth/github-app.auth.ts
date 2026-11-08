import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { config } from '../config.js';

export type GitHubIdentityTier = 'org-manager' | 'ci-bot' | 'developer-tools' | 'auto';

let cachedGhCliToken: string | null = null;

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

async function createCiBotOctokit(): Promise<Octokit | null> {
  const appId =
    config.CI_BOT_APP_ID ||
    config.GITHUB_CI_BOT_APP_ID ||
    config.CI_APP_ID;

  const privateKey = resolvePrivateKey({
    keyPath:
      config.CI_BOT_APP_PRIVATE_KEY_PATH ||
      config.GITHUB_CI_BOT_APP_PRIVATE_KEY_PATH ||
      config.CI_APP_PRIVATE_KEY_PATH,
    keyBase64:
      config.CI_BOT_APP_PRIVATE_KEY_BASE64 ||
      config.GITHUB_CI_BOT_APP_PRIVATE_KEY_BASE64 ||
      config.CI_APP_PRIVATE_KEY_BASE64,
    rawKey:
      config.CI_BOT_APP_PRIVATE_KEY ||
      config.GITHUB_CI_BOT_APP_PRIVATE_KEY ||
      config.CI_APP_PRIVATE_KEY,
  });

  const installationIdStr =
    config.CI_BOT_APP_INSTALLATION_ID ||
    config.GITHUB_CI_BOT_APP_INSTALLATION_ID ||
    config.CI_APP_INSTALLATION_ID;

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

function resolveGhCliToken(): string {
  if (cachedGhCliToken !== null) {
    return cachedGhCliToken;
  }
  try {
    const out = execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 3000,
    }).trim();
    cachedGhCliToken = out;
    return out;
  } catch {
    cachedGhCliToken = '';
    return '';
  }
}

function createTokenOctokit(includeGhCli = false): Octokit | null {
  const token =
    config.GITHUB_PERSONAL_ACCESS_TOKEN ||
    config.GITHUB_TOKEN ||
    (includeGhCli ? resolveGhCliToken() : '');
  if (!token) {
    return null;
  }
  return new Octokit({ auth: token });
}

/**
 * Resolves an authenticated Octokit client adhering strictly to Separation of Duties (SoD)
 * and the No-Privilege-Escalation Fallback Invariant:
 * - 'org-manager' (Tier 1): Explicit sovereign governance identity; never used as an implicit fallback.
 * - 'ci-bot' (Tier 2): Autonomous CI/CD and repository automation identity.
 * - 'developer-tools' / 'auto' (Tier 3): Workstation token / gh CLI identity with Tier 2 ('ci-bot') fallback.
 */
export async function getOctokitClient(tier: GitHubIdentityTier = 'auto'): Promise<Octokit> {
  if (tier === 'org-manager') {
    const orgClient = await createOrgManagerOctokit();
    if (orgClient) {
      return orgClient;
    }
    const tokenClient = createTokenOctokit(false);
    if (tokenClient) {
      return tokenClient;
    }
    return new Octokit();
  }

  if (tier === 'ci-bot') {
    const ciClient = await createCiBotOctokit();
    if (ciClient) {
      return ciClient;
    }
    const tokenClient = createTokenOctokit(false);
    if (tokenClient) {
      return tokenClient;
    }
    return new Octokit();
  }

  // 'developer-tools' or 'auto': strictly isolated from Tier 1 ('org-manager')
  const devTokenClient = createTokenOctokit(true);
  if (devTokenClient) {
    return devTokenClient;
  }

  const ciFallbackClient = await createCiBotOctokit();
  if (ciFallbackClient) {
    return ciFallbackClient;
  }

  return new Octokit();
}
