import { config } from '../config.js';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let cachedToken: TokenCache | null = null;

export async function getInfisicalAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60000) {
    return cachedToken.accessToken;
  }

  const clientId = config.CLIENT_ID;
  const clientSecret = config.CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      'Infisical credentials not configured. Please set INFISICAL_UNIVERSAL_AUTH_CLIENT_ID and INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET.'
    );
  }

  const hostUrl = config.HOST_URL.replace(/\/$/, '');
  const url = `${hostUrl}/api/v1/auth/universal-auth/login`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId,
      clientSecret,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to authenticate with Infisical Universal Auth (${res.status}): ${errorText}`);
  }

  const data = (await res.json()) as { accessToken: string; expiresIn: number };
  cachedToken = {
    accessToken: data.accessToken,
    expiresAt: now + (data.expiresIn || 7200) * 1000,
  };

  return cachedToken.accessToken;
}
