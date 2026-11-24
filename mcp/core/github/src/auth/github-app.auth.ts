import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { config } from '../config.js';

export type GitHubIdentityTier =
  | 'org-manager'
  | 'automation'
  | 'guardian'
  | 'ci-bot'
  | 'developer-tools'
  | 'auto';

interface CachedToken {
  token: string;
  expiresAt: number;
}

const TOKEN_CACHE_TTL_MS = 55 * 60 * 1000; // 55 minutes
const tokenCache = new Map<string, CachedToken>();
let cachedGhCliToken: string | null = null;

export function clearTokenCache(): void {
  tokenCache.clear();
  cachedGhCliToken = null;
}

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

/**
 * Attempts to retrieve an installation access token from the centralized Token Broker
 * if TOKEN_BROKER_URL is configured.
 */
async function fetchTokenFromBroker(tier: string, repository?: string): Promise<string | null> {
  if (!config.TOKEN_BROKER_URL) {
    return null;
  }

  try {
    const brokerUrl = `${config.TOKEN_BROKER_URL.replace(/\/+$/, '')}/v1/github/token`;
    const res = await fetch(brokerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.TOKEN_BROKER_API_KEY ? { Authorization: `Bearer ${config.TOKEN_BROKER_API_KEY}` } : {}),
        'X-Caller-ID': config.TOKEN_BROKER_CALLER_ID || 'mcp-server',
      },
      body: JSON.stringify({ tier, repository }),
    });

    if (!res.ok) {
      process.stderr.write(`[github-app.auth] Token Broker returned HTTP ${res.status}: ${res.statusText}\n`);
      return null;
    }

    const data = (await res.json()) as { token?: string };
    if (data.token) {
      return data.token;
    }
    return null;
  } catch (err: unknown) {
    process.stderr.write(`[github-app.auth] Token Broker request failed: ${(err as Error).message}\n`);
    return null;
  }
}

function resolveAppCredentials(tier: 'org-manager' | 'automation' | 'guardian') {
  if (tier === 'org-manager') {
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

    return { appId, privateKey, installationIdStr };
  }

  if (tier === 'automation') {
    const appId =
      config.AUTOMATION_APP_ID ||
      config.GITHUB_AUTOMATION_APP_ID ||
      config.CI_BOT_APP_ID ||
      config.GITHUB_CI_BOT_APP_ID ||
      config.CI_APP_ID;

    const privateKey = resolvePrivateKey({
      keyPath:
        config.AUTOMATION_APP_PRIVATE_KEY_PATH ||
        config.GITHUB_AUTOMATION_APP_PRIVATE_KEY_PATH ||
        config.CI_BOT_APP_PRIVATE_KEY_PATH ||
        config.GITHUB_CI_BOT_APP_PRIVATE_KEY_PATH ||
        config.CI_APP_PRIVATE_KEY_PATH,
      keyBase64:
        config.AUTOMATION_APP_PRIVATE_KEY_BASE64 ||
        config.GITHUB_AUTOMATION_APP_PRIVATE_KEY_BASE64 ||
        config.CI_BOT_APP_PRIVATE_KEY_BASE64 ||
        config.GITHUB_CI_BOT_APP_PRIVATE_KEY_BASE64 ||
        config.CI_APP_PRIVATE_KEY_BASE64,
      rawKey:
        config.AUTOMATION_APP_PRIVATE_KEY ||
        config.GITHUB_AUTOMATION_APP_PRIVATE_KEY ||
        config.CI_BOT_APP_PRIVATE_KEY ||
        config.GITHUB_CI_BOT_APP_PRIVATE_KEY ||
        config.CI_APP_PRIVATE_KEY,
    });

    const installationIdStr =
      config.AUTOMATION_APP_INSTALLATION_ID ||
      config.GITHUB_AUTOMATION_APP_INSTALLATION_ID ||
      config.CI_BOT_APP_INSTALLATION_ID ||
      config.GITHUB_CI_BOT_APP_INSTALLATION_ID ||
      config.CI_APP_INSTALLATION_ID;

    return { appId, privateKey, installationIdStr };
  }

  // guardian
  const appId =
    config.GUARDIAN_APP_ID ||
    config.GITHUB_GUARDIAN_APP_ID;

  const privateKey = resolvePrivateKey({
    keyPath:
      config.GUARDIAN_APP_PRIVATE_KEY_PATH ||
      config.GITHUB_GUARDIAN_APP_PRIVATE_KEY_PATH,
    keyBase64:
      config.GUARDIAN_APP_PRIVATE_KEY_BASE64 ||
      config.GITHUB_GUARDIAN_APP_PRIVATE_KEY_BASE64,
    rawKey:
      config.GUARDIAN_APP_PRIVATE_KEY ||
      config.GITHUB_GUARDIAN_APP_PRIVATE_KEY,
  });

  const installationIdStr =
    config.GUARDIAN_APP_INSTALLATION_ID ||
    config.GITHUB_GUARDIAN_APP_INSTALLATION_ID;

  return { appId, privateKey, installationIdStr };
}

async function createOrgManagerOctokit(): Promise<Octokit | null> {
  const cacheKey = 'tier:org-manager';
  const cached = tokenCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return new Octokit({ auth: cached.token });
  }

  // 1. Centralized Token Broker
  const brokerToken = await fetchTokenFromBroker('org-manager');
  if (brokerToken) {
    tokenCache.set(cacheKey, { token: brokerToken, expiresAt: Date.now() + TOKEN_CACHE_TTL_MS });
    return new Octokit({ auth: brokerToken });
  }

  // 2. Local PEM / GitHub App Auth
  const { appId, privateKey, installationIdStr } = resolveAppCredentials('org-manager');
  if (!appId || !privateKey || !installationIdStr) {
    return null;
  }

  const auth = createAppAuth({
    appId,
    privateKey,
    installationId: parseInt(installationIdStr, 10),
  });

  const installationAuth = await auth({ type: 'installation' });
  tokenCache.set(cacheKey, { token: installationAuth.token, expiresAt: Date.now() + TOKEN_CACHE_TTL_MS });
  return new Octokit({ auth: installationAuth.token });
}

async function createAutomationOctokit(): Promise<Octokit | null> {
  const cacheKey = 'tier:automation';
  const cached = tokenCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return new Octokit({ auth: cached.token });
  }

  // 1. Centralized Token Broker
  const brokerToken = await fetchTokenFromBroker('automation');
  if (brokerToken) {
    tokenCache.set(cacheKey, { token: brokerToken, expiresAt: Date.now() + TOKEN_CACHE_TTL_MS });
    return new Octokit({ auth: brokerToken });
  }

  // 2. Local PEM / GitHub App Auth
  const { appId, privateKey, installationIdStr } = resolveAppCredentials('automation');
  if (!appId || !privateKey || !installationIdStr) {
    return null;
  }

  const auth = createAppAuth({
    appId,
    privateKey,
    installationId: parseInt(installationIdStr, 10),
  });

  const installationAuth = await auth({ type: 'installation' });
  tokenCache.set(cacheKey, { token: installationAuth.token, expiresAt: Date.now() + TOKEN_CACHE_TTL_MS });
  return new Octokit({ auth: installationAuth.token });
}

async function createGuardianOctokit(): Promise<Octokit | null> {
  const cacheKey = 'tier:guardian';
  const cached = tokenCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return new Octokit({ auth: cached.token });
  }

  // 1. Centralized Token Broker
  const brokerToken = await fetchTokenFromBroker('guardian');
  if (brokerToken) {
    tokenCache.set(cacheKey, { token: brokerToken, expiresAt: Date.now() + TOKEN_CACHE_TTL_MS });
    return new Octokit({ auth: brokerToken });
  }

  // 2. Local PEM / GitHub App Auth
  const { appId, privateKey, installationIdStr } = resolveAppCredentials('guardian');
  if (!appId || !privateKey || !installationIdStr) {
    return createAutomationOctokit();
  }

  const auth = createAppAuth({
    appId,
    privateKey,
    installationId: parseInt(installationIdStr, 10),
  });

  const installationAuth = await auth({ type: 'installation' });
  tokenCache.set(cacheKey, { token: installationAuth.token, expiresAt: Date.now() + TOKEN_CACHE_TTL_MS });
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
 * Returns an Octokit instance authenticated as the GitHub App itself (using JWT),
 * suitable for app-level API endpoints such as GET /app, GET /app/installations.
 */
export async function getAppJwtOctokit(
  tier: 'org-manager' | 'automation' | 'guardian' = 'org-manager'
): Promise<Octokit | null> {
  const { appId, privateKey } = resolveAppCredentials(tier);
  if (!appId || !privateKey) {
    return null;
  }

  const auth = createAppAuth({
    appId,
    privateKey,
  });

  const appAuth = await auth({ type: 'app' });
  return new Octokit({ auth: appAuth.token });
}

/**
 * Resolves an authenticated Octokit client adhering strictly to Separation of Duties (SoD)
 * and the No-Privilege-Escalation Fallback Invariant:
 * - 'org-manager' (Tier 1): Explicit sovereign governance identity; never used as an implicit fallback.
 * - 'automation' / 'ci-bot' (Tier 2A): Autonomous CI/CD, release generation, and repository automation identity.
 * - 'guardian' (Tier 2B): Autonomous policy enforcement, quality gate verification, and PR review identity.
 * - 'developer-tools' / 'auto' (Tier 3): Workstation token / gh CLI identity with Tier 2A ('automation') fallback.
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

  if (tier === 'guardian') {
    const guardianClient = await createGuardianOctokit();
    if (guardianClient) {
      return guardianClient;
    }
    const tokenClient = createTokenOctokit(false);
    if (tokenClient) {
      return tokenClient;
    }
    return new Octokit();
  }

  if (tier === 'automation' || tier === 'ci-bot') {
    const automationClient = await createAutomationOctokit();
    if (automationClient) {
      return automationClient;
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

  const automationFallbackClient = await createAutomationOctokit();
  if (automationFallbackClient) {
    return automationFallbackClient;
  }

  return new Octokit();
}
