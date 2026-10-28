#!/usr/bin/env node

/**
 * Automated GitHub App Provisioning via Manifest Flow
 * Encapsulated within @tupynambalucas-dev/agent-plugin-github-manager
 *
 * Usage:
 *   node provision-app.js --profile=manager
 *   node provision-app.js --profile=assistant
 */

const http = require('http');
const https = require('https');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3333;
const ORG_NAME = 'tupynambalucas-dev';

const profileArg = process.argv.find((a) => a.startsWith('--profile='));
const profile = profileArg ? profileArg.split('=')[1] : 'manager';

const PROFILES = {
  manager: {
    appName: 'tupynambalucas-github-manager',
    description: 'High-privilege organizational governance operator for tupynambalucas-dev.',
    permissions: {
      organization_administration: 'write',
      organization_custom_roles: 'write',
      members: 'write',
      organization_projects: 'write',
      team_discussions: 'write',
      administration: 'write',
      rulesets: 'write',
      contents: 'write',
      pull_requests: 'write',
      issues: 'write',
      actions: 'write',
      secret_scanning_alerts: 'write',
      dependabot_alerts: 'write',
      code_scanning_alerts: 'write',
    },
  },
  assistant: {
    appName: 'tupynambalucas-github-assistant',
    description: 'Developer productivity assistant for daily workflows in tupynambalucas-dev.',
    permissions: {
      contents: 'write',
      pull_requests: 'write',
      issues: 'write',
      actions: 'read',
    },
  },
};

const selected = PROFILES[profile] || PROFILES.manager;

const MANIFEST = {
  name: selected.appName,
  url: 'https://docs.tupynambalucas.dev',
  description: selected.description,
  hook_attributes: {
    active: false,
  },
  redirect_url: `http://localhost:${PORT}/callback`,
  public: false,
  default_permissions: selected.permissions,
  default_events: [],
};

function openBrowser(url) {
  const start =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
      ? 'start ""'
      : 'xdg-open';
  exec(`${start} "${url}"`);
}

function exchangeCode(code) {
  return new Promise((resolve, reject) => {
    const postData = '';
    const req = https.request(
      `https://api.github.com/app-manifests/${code}/conversions`,
      {
        method: 'POST',
        headers: {
          'User-Agent': 'tupynamba-github-app-provisioner/1.0.0',
          Accept: 'application/vnd.github+json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (err) {
              reject(new Error(`Failed to parse response: ${err.message}`));
            }
          } else {
            reject(new Error(`Conversion failed with status ${res.statusCode}: ${body}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/') {
    const formHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Provisioning GitHub App: ${selected.appName}</title>
  <style>
    body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0d1117; color: #c9d1d9; }
    .card { background: #161b22; padding: 2rem; border-radius: 8px; border: 1px solid #30363d; max-width: 500px; text-align: center; }
    button { background: #238636; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 6px; cursor: pointer; margin-top: 15px; }
    button:hover { background: #2ea043; }
  </style>
</head>
<body>
  <div class="card">
    <h2>GitHub App Manifest Provisioning</h2>
    <p>Creating <strong>${selected.appName}</strong> (Profile: <code>${profile}</code>) in organization <strong>${ORG_NAME}</strong>.</p>
    <form id="manifestForm" action="https://github.com/organizations/${ORG_NAME}/settings/apps/new" method="post">
      <input type="hidden" name="manifest" value='${JSON.stringify(MANIFEST)}' />
      <button type="submit">Click Here to Confirm on GitHub</button>
    </form>
  </div>
  <script>
    document.getElementById('manifestForm').submit();
  </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(formHtml);
    return;
  }

  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing code parameter.');
      return;
    }

    try {
      const appData = await exchangeCode(code);

      console.log('\n======================================================');
      console.log(`GITHUB APP CREATED: ${appData.name}`);
      console.log('======================================================');
      console.log(`App ID:          ${appData.id}`);
      console.log(`Client ID:       ${appData.client_id}`);
      console.log(`Slug:            ${appData.slug}`);
      console.log('------------------------------------------------------');
      console.log('INSTALLATION URL:');
      console.log(`https://github.com/organizations/${ORG_NAME}/settings/apps/${appData.slug}/installations`);
      console.log('------------------------------------------------------');
      console.log('CREDENTIALS:');
      console.log(`GITHUB_APP_ID=${appData.id}`);
      console.log(`GITHUB_APP_CLIENT_ID=${appData.client_id}`);
      console.log(`GITHUB_APP_SLUG=${appData.slug}`);

      // Save .pem file locally if desired
      const pemFileName = `${appData.slug}.private-key.pem`;
      const pemPath = path.resolve(process.cwd(), pemFileName);
      fs.writeFileSync(pemPath, appData.pem, { mode: 0o600 });
      console.log(`Private key written to: ${pemPath}`);
      console.log('======================================================\n');

      const successHtml = `<!DOCTYPE html>
<html>
<head>
  <title>GitHub App Created</title>
  <style>
    body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0d1117; color: #c9d1d9; }
    .card { background: #161b22; padding: 2rem; border-radius: 8px; border: 1px solid #30363d; max-width: 600px; text-align: left; }
    code { background: #21262d; padding: 2px 6px; border-radius: 4px; color: #58a6ff; }
    a { color: #58a6ff; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="color: #3fb950; text-align: center;">GitHub App Provisioned Successfully</h2>
    <p><strong>App Name:</strong> ${appData.name}</p>
    <p><strong>App ID:</strong> <code>${appData.id}</code></p>
    <p><strong>Private Key:</strong> Saved to <code>${pemFileName}</code></p>
    <hr style="border-color: #30363d;" />
    <p><strong>Next Step:</strong> Install the App in your organization:</p>
    <p><a href="https://github.com/organizations/${ORG_NAME}/settings/apps/${appData.slug}/installations" target="_blank">Open Installation Page on GitHub</a></p>
  </div>
</body>
</html>`;

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(successHtml);

      setTimeout(() => {
        const installUrl = `https://github.com/organizations/${ORG_NAME}/settings/apps/${appData.slug}/installations`;
        console.log(`Opening installation page: ${installUrl}`);
        openBrowser(installUrl);
      }, 1000);

      setTimeout(() => {
        console.log('Provisioning complete. Closing server.');
        server.close();
        process.exit(0);
      }, 5000);
    } catch (err) {
      console.error('Error exchanging code:', err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error: ${err.message}`);
    }
  }
});

server.listen(PORT, () => {
  console.log(`GitHub App Provisioner listening on http://localhost:${PORT}`);
  console.log(`Initiating flow for profile '${profile}' (${selected.appName})...`);
  console.log(`If your browser did not open automatically, please open: http://localhost:${PORT}`);
  openBrowser(`http://localhost:${PORT}`);
});
