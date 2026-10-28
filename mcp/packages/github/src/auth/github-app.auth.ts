import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { config } from '../config.js';

export async function getOctokitClient(): Promise<Octokit> {
  const hasAppCreds =
    config.GITHUB_APP_ID &&
    config.GITHUB_APP_PRIVATE_KEY &&
    config.GITHUB_APP_INSTALLATION_ID;

  if (hasAppCreds) {
    const auth = createAppAuth({
      appId: config.GITHUB_APP_ID,
      privateKey: config.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
      installationId: parseInt(config.GITHUB_APP_INSTALLATION_ID, 10),
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
