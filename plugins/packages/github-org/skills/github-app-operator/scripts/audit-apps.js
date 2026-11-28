#!/usr/bin/env node

/**
 * Declarative GitHub Apps Drift Auditor & Webhook Reconciler
 * Part of @tupynambalucas-dev/plugin-github-org
 *
 * Usage:
 *   node audit-apps.js
 *   node audit-apps.js --reconcile-webhooks
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORG_NAME = 'tupynambalucas-dev';
const reconcileWebhooks = process.argv.includes('--reconcile-webhooks');

// Resolve .env file
function loadEnv() {
  const candidatePaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '..', '.env'),
    path.resolve(__dirname, '../../../../../../.env'),
  ];
  for (const envPath of candidatePaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
      break;
    }
  }
}

loadEnv();

function findFoundationDir() {
  const candidates = [
    path.resolve(process.cwd(), 'foundation', 'identity', 'apps', 'github'),
    path.resolve(process.cwd(), '..', 'foundation', 'identity', 'apps', 'github'),
    path.resolve(__dirname, '../../../../../../foundation/identity/apps/github'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return null;
}

function generateAppJwt(appId, privateKeyPem) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iat: now - 60,
    exp: now + 600,
    iss: appId,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${encodedHeader}.${encodedPayload}`);
  const signature = sign.sign(privateKeyPem, 'base64url');
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function requestGithub(jwtToken, endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint.startsWith('http') ? endpoint : `https://api.github.com${endpoint}`);
    const req = https.request(
      url,
      {
        method,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'tupynambalucas-app-auditor',
          'X-GitHub-Api-Version': '2026-03-10',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(raw));
            } catch {
              resolve(raw);
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${raw}`));
          }
        });
      }
    );
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

function resolveCredentials(slug) {
  const prefixMap = {
    'org-manager': 'ORG_MANAGER_APP',
    automation: 'AUTOMATION_APP',
    guardian: 'GUARDIAN_APP',
    'developer-tools': 'DEVELOPER_TOOLS_APP',
  };
  const prefix = prefixMap[slug] || slug.toUpperCase().replace(/-/g, '_');
  let appId = process.env[`${prefix}_ID`];
  let keyB64 = process.env[`${prefix}_PRIVATE_KEY_BASE64`];
  let keyPath = process.env[`${prefix}_PRIVATE_KEY_PATH`];

  // Fallback for legacy CI_BOT_APP
  if (slug === 'automation' && !appId) {
    appId = process.env.CI_BOT_APP_ID;
    keyB64 = keyB64 || process.env.CI_BOT_APP_PRIVATE_KEY_BASE64;
    keyPath = keyPath || process.env.CI_BOT_APP_PRIVATE_KEY_PATH;
  }

  let privateKey = null;
  if (keyB64) {
    try {
      privateKey = Buffer.from(keyB64, 'base64').toString('utf8');
    } catch {
      privateKey = keyB64;
    }
  } else if (keyPath && fs.existsSync(keyPath)) {
    privateKey = fs.readFileSync(keyPath, 'utf8');
  }

  return { appId, privateKey };
}

async function audit() {
  const foundationDir = findFoundationDir();
  if (!foundationDir) {
    console.error('Error: Unable to locate foundation/identity/apps/github/ directory.');
    process.exit(1);
  }

  console.log('--- GitHub Apps Declarative Drift Audit ---');
  console.log(`Organization: ${ORG_NAME}`);
  console.log(`Manifests Source: ${foundationDir}\n`);

  const apps = ['org-manager', 'automation', 'guardian', 'developer-tools'];
  let totalDrifts = 0;

  // Pre-fetch org installations using org-manager for public Tier 3 (developer-tools) auditing
  let orgInstallations = [];
  const orgCreds = resolveCredentials('org-manager');
  const orgInstId = process.env.ORG_MANAGER_APP_INSTALLATION_ID;
  if (orgCreds.appId && orgCreds.privateKey && orgInstId) {
    try {
      const orgJwt = generateAppJwt(orgCreds.appId, orgCreds.privateKey);
      const tokenRes = await requestGithub(
        orgJwt,
        `/app/installations/${orgInstId}/access_tokens`,
        'POST',
        {}
      );
      if (tokenRes?.token) {
        const instRes = await requestGithub(tokenRes.token, `/orgs/${ORG_NAME}/installations`);
        orgInstallations = instRes?.installations || [];
      }
    } catch {
      // Non-fatal fallback
    }
  }

  for (const slug of apps) {
    const manifestPath = path.join(foundationDir, slug, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      console.log(`[${slug.toUpperCase()}] Manifest not found at ${manifestPath}`);
      continue;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const { appId, privateKey } = resolveCredentials(slug);

    console.log(`=======================================================`);
    console.log(`Target: ${slug} (${manifest.name})`);
    console.log(`=======================================================`);

    // Public Tier 3 OAuth Device-Flow client does not require a private PEM key
    if (slug === 'developer-tools' && !privateKey) {
      const inst = orgInstallations.find((i) => i.app_slug === manifest.name);
      if (!inst) {
        console.log(`Status: PENDING_PROVISIONING / NOT_INSTALLED`);
        console.log(`Note: Public CLI app '${manifest.name}' was not found in org installations.\n`);
        continue;
      }
      console.log(`App ID: ${inst.app_id} (Installation ID: ${inst.id}, Public Device-Flow Client)`);
      const drifts = [];
      const manifestPerms = manifest.default_permissions || {};
      const livePerms = inst.permissions || {};
      const permDrifts = [];
      for (const [perm, access] of Object.entries(manifestPerms)) {
        if (livePerms[perm] !== access) {
          permDrifts.push(`${perm}: expected '${access}', actual '${livePerms[perm] || 'none'}'`);
        }
      }
      if (permDrifts.length > 0) {
        drifts.push({
          field: 'permissions',
          details: permDrifts,
          fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${inst.app_slug}/permissions`,
        });
      }
      if (drifts.length === 0) {
        console.log(`Status: IN_SYNC (Public Tier 3 Verified via Org Installations)\n`);
      } else {
        totalDrifts += drifts.length;
        console.log(`Status: DRIFT_DETECTED (${drifts.length} divergence(s))\n`);
        for (const d of drifts) {
          console.log(`  - Field: ${d.field}`);
          for (const item of d.details || []) {
            console.log(`    * ${item}`);
          }
          console.log(`    Action: Update via ${d.fixUrl}`);
        }
        console.log('');
      }
      continue;
    }

    if (!appId || !privateKey) {
      console.log(`Status: PENDING_PROVISIONING / NO_CREDENTIALS`);
      console.log(`Note: App ID or Private Key not found in environment for ${slug}.`);
      console.log(`Provision URL: https://github.com/organizations/${ORG_NAME}/settings/apps/new\n`);
      continue;
    }

    try {
      const jwt = generateAppJwt(appId, privateKey);
      const liveApp = await requestGithub(jwt, '/app');

      console.log(`App ID: ${liveApp.id} (Slug: ${liveApp.slug})`);
      console.log(`Created: ${liveApp.created_at} | Updated: ${liveApp.updated_at}`);

      const drifts = [];

      // Check Name
      if (liveApp.name !== manifest.name) {
        drifts.push({
          field: 'name',
          expected: manifest.name,
          actual: liveApp.name,
          fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${liveApp.slug}`,
        });
      }

      // Check Description (normalize CRLF/LF because GitHub Web UI stores \r\n)
      const norm = (s) => String(s || '').replace(/\r\n/g, '\n').trim();
      if (manifest.description && norm(liveApp.description) !== norm(manifest.description)) {
        drifts.push({
          field: 'description',
          expected: manifest.description,
          actual: liveApp.description,
          fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${liveApp.slug}`,
        });
      }

      // Check Permissions
      const manifestPerms = manifest.default_permissions || {};
      const livePerms = liveApp.permissions || {};
      const permDrifts = [];

      for (const [perm, access] of Object.entries(manifestPerms)) {
        if (livePerms[perm] !== access) {
          permDrifts.push(`${perm}: expected '${access}', actual '${livePerms[perm] || 'none'}'`);
        }
      }
      if (permDrifts.length > 0) {
        drifts.push({
          field: 'permissions',
          expected: manifestPerms,
          actual: livePerms,
          details: permDrifts,
          fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${liveApp.slug}/permissions`,
        });
      }

      // Check Webhook Events
      const expectedEvents = manifest.default_events || [];
      const liveEvents = new Set(liveApp.events || []);
      const missingEvents = expectedEvents.filter((ev) => !liveEvents.has(ev));
      if (missingEvents.length > 0) {
        drifts.push({
          field: 'events',
          details: missingEvents.map((ev) => `missing subscribed event '${ev}'`),
          fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${liveApp.slug}/permissions`,
        });
      }

      // Check Webhook URL & Active Flag
      if (manifest.hook_attributes?.url) {
        try {
          const webhookConfig = await requestGithub(jwt, '/app/hook/config');
          if (webhookConfig.url !== manifest.hook_attributes.url) {
            if (reconcileWebhooks) {
              console.log(`[RECONCILING WEBHOOK] Updating URL to ${manifest.hook_attributes.url}...`);
              await requestGithub(jwt, '/app/hook/config', 'PATCH', {
                url: manifest.hook_attributes.url,
                content_type: 'json',
              });
              console.log(`[RECONCILED] Webhook URL updated successfully.`);
            } else {
              drifts.push({
                field: 'webhook_url',
                expected: manifest.hook_attributes.url,
                actual: webhookConfig.url,
                fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${liveApp.slug}`,
              });
            }
          }
          if (
            typeof manifest.hook_attributes.active === 'boolean' &&
            typeof webhookConfig.active === 'boolean' &&
            webhookConfig.active !== manifest.hook_attributes.active
          ) {
            drifts.push({
              field: 'webhook_active',
              expected: String(manifest.hook_attributes.active),
              actual: String(webhookConfig.active),
              fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${liveApp.slug}`,
            });
          }
        } catch {
          if (manifest.hook_attributes.active === true) {
            drifts.push({
              field: 'webhook_active',
              expected: 'true',
              actual: 'unavailable',
              fixUrl: `https://github.com/organizations/${ORG_NAME}/settings/apps/${liveApp.slug}`,
            });
          }
        }
      }

      if (drifts.length === 0) {
        console.log(`Status: IN_SYNC (100% Declarative Alignment)\n`);
      } else {
        totalDrifts += drifts.length;
        console.log(`Status: DRIFT_DETECTED (${drifts.length} divergence(s))\n`);
        for (const d of drifts) {
          console.log(`  - Field: ${d.field}`);
          if (d.details) {
            for (const item of d.details) {
              console.log(`    * ${item}`);
            }
          } else {
            console.log(`    Expected: ${d.expected}`);
            console.log(`    Actual:   ${d.actual}`);
          }
          console.log(`    Action: Update via ${d.fixUrl}`);
        }
        console.log('');
      }
    } catch (err) {
      console.log(`Status: ERROR`);
      console.log(`Message: ${err.message}\n`);
    }
  }

  console.log(`--- Audit Summary: ${totalDrifts} drift(s) detected across all apps. ---`);
  if (totalDrifts > 0) {
    console.log('Tip: Run with --reconcile-webhooks to automatically patch webhook configurations via REST API.');
  }
}

audit();
