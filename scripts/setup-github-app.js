#!/usr/bin/env node

/**
 * Automated GitHub App Provisioning Helper via Manifest Flow
 * Tupynamba Lucas Enterprise Standard
 *
 * This script starts a local ephemeral web server on port 3333,
 * constructs the official GitHub App Manifest for 'tupynambalucas-cortex-operator',
 * opens the browser to GitHub for one-click organization approval,
 * captures the conversion code, and retrieves App ID + Private Key (.pem).
 */

const http = require('http');
const https = require('https');
const { exec } = require('child_process');

const PORT = 3333;
const ORG_NAME = 'tupynambalucas-dev';
const APP_NAME = 'tupynambalucas-cortex-operator';

const MANIFEST = {
  name: APP_NAME,
  url: 'https://docs.tupynambalucas.dev',
  hook_attributes: {
    active: false,
  },
  redirect_url: `http://localhost:${PORT}/callback`,
  public: false,
  default_permissions: {
    administration: 'write',
    contents: 'write',
    pull_requests: 'write',
    dependabot_alerts: 'read',
    secret_scanning_alerts: 'read',
    members: 'read',
    organization_administration: 'write',
  },
  default_events: [],
};

function openBrowser(url) {
  const start =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
      ? 'start'
      : 'xdg-open';
  exec(`${start} ${url}`);
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
            reject(
              new Error(
                `Conversion failed with status ${res.statusCode}: ${body}`
              )
            );
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
    // Serve auto-submitting form with manifest payload
    const formHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Provisioning GitHub App: ${APP_NAME}</title>
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
    <p>Creating <strong>${APP_NAME}</strong> in organization <strong>${ORG_NAME}</strong> with preconfigured permissions.</p>
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
      console.log('GITHUB APP CREATED SUCCESSFULLY');
      console.log('======================================================');
      console.log(`App Name:        ${appData.name}`);
      console.log(`App ID:          ${appData.id}`);
      console.log(`Client ID:       ${appData.client_id}`);
      console.log(`Slug:            ${appData.slug}`);
      console.log('------------------------------------------------------');
      console.log('NEXT STEP: INSTALL APP IN ORGANIZATION');
      console.log(`Open: https://github.com/organizations/${ORG_NAME}/settings/apps/${appData.slug}/installations`);
      console.log('------------------------------------------------------');
      console.log('INFISICAL CREDENTIALS TO ENROLL:');
      console.log(`GITHUB_APP_ID=${appData.id}`);
      console.log('GITHUB_APP_PRIVATE_KEY: (Private key RSA captured below)');
      console.log('======================================================\n');
      console.log(appData.pem);
      console.log('\n======================================================\n');

      const successHtml = `<!DOCTYPE html>
<html>
<head>
  <title>App Created Successfully</title>
  <style>
    body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0d1117; color: #c9d1d9; }
    .card { background: #161b22; padding: 2rem; border-radius: 8px; border: 1px solid #30363d; max-width: 600px; text-align: center; }
    a.btn { display: inline-block; background: #238636; color: white; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 6px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>GitHub App Created: ${appData.name}</h2>
    <p>App ID: <strong>${appData.id}</strong></p>
    <p>The private key and App ID have been captured in your terminal session.</p>
    <p>Now, install the App into the organization repositories:</p>
    <a class="btn" href="https://github.com/organizations/${ORG_NAME}/settings/apps/${appData.slug}/installations" target="_blank">Install App on Organization</a>
  </div>
</body>
</html>`;

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(successHtml);

      // Keep server open briefly for the response, then close
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 5000);
    } catch (err) {
      console.error('Error exchanging conversion code:', err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error exchanging conversion code: ${err.message}`);
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`GitHub App Provisioning Server started at http://localhost:${PORT}`);
  console.log(`Opening browser to initiate GitHub App Manifest creation for '${ORG_NAME}'...`);
  console.log(`======================================================\n`);
  openBrowser(`http://localhost:${PORT}`);
});
