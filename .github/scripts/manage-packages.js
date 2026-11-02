#!/usr/bin/env node

/**
 * Enterprise GitHub Packages Administration & Purge Tool
 * tupynambalucas-dev Organization
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ORG = 'tupynambalucas-dev';
const TOKEN = process.env.ADMIN_TOKEN || process.env.NODE_AUTH_TOKEN || process.env.GITHUB_TOKEN;
const ACTION = process.env.ADMIN_ACTION || process.argv[2] || 'list';
const TARGET_PACKAGE = process.env.TARGET_PACKAGE || process.argv[3] || '';
const DRY_RUN = process.env.DRY_RUN !== 'false';

if (!TOKEN) {
  console.error('[admin-packages] Error: No authentication token found. Provide ADMIN_TOKEN or GITHUB_TOKEN.');
  process.exit(1);
}

// Discover current active packages in workspace
function getActivePackages() {
  const active = new Set();
  const dirs = ['mcp/packages', 'plugins/packages'];
  const root = path.resolve(__dirname, '../..');

  for (const d of dirs) {
    const full = path.join(root, d);
    if (!fs.existsSync(full)) continue;
    const entries = fs.readdirSync(full, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const pkgPath = path.join(full, entry.name, 'package.json');
        if (fs.existsSync(pkgPath)) {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
          if (pkg.name) {
            active.add(pkg.name);
          }
        }
      }
    }
  }
  return active;
}

async function fetchPackages() {
  const url = `https://api.github.com/orgs/${ORG}/packages?package_type=npm`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'tupynambalucas-dev-package-admin',
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to list packages (HTTP ${res.status}): ${errText}`);
  }

  return await res.json();
}

async function deletePackage(packageName) {
  // Package name in URL path needs to be URL-encoded (e.g. %40tupynambalucas-dev%2Fname)
  const encodedName = encodeURIComponent(packageName);
  const url = `https://api.github.com/orgs/${ORG}/packages/npm/${encodedName}`;

  if (DRY_RUN) {
    console.log(`[admin-packages] [DRY RUN] Would DELETE: ${packageName} (${url})`);
    return true;
  }

  console.log(`[admin-packages] Executing DELETE: ${packageName}...`);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'tupynambalucas-dev-package-admin',
    },
  });

  if (res.status === 204) {
    console.log(`[admin-packages] Successfully deleted package: ${packageName}`);
    return true;
  } else {
    const err = await res.text();
    console.error(`[admin-packages] Failed to delete ${packageName} (HTTP ${res.status}): ${err}`);
    return false;
  }
}

async function run() {
  console.log(`[admin-packages] Organization: ${ORG}`);
  console.log(`[admin-packages] Action: ${ACTION} | DryRun: ${DRY_RUN}`);

  const activePackages = getActivePackages();
  console.log(`[admin-packages] Active workspace packages count: ${activePackages.size}`);

  let remotePackages = [];
  try {
    remotePackages = await fetchPackages();
    console.log(`[admin-packages] Remote packages found on GitHub Packages: ${remotePackages.length}`);
  } catch (err) {
    console.warn(`[admin-packages] Notice: ${err.message}`);
    console.log('[admin-packages] If the token lacks "read:packages" / "delete:packages", configure an administrative token.');
    return;
  }

  if (ACTION === 'list') {
    console.log('\n--- Remote Packages Status ---');
    for (const pkg of remotePackages) {
      const isCurrent = activePackages.has(pkg.name);
      console.log(`- ${pkg.name} (v${pkg.version_count || 1}) -> ${isCurrent ? 'ACTIVE' : 'OBSOLETE / ORPHAN'}`);
    }
  } else if (ACTION === 'delete-one') {
    if (!TARGET_PACKAGE) {
      console.error('[admin-packages] Error: TARGET_PACKAGE must be specified for delete-one action.');
      process.exit(1);
    }
    await deletePackage(TARGET_PACKAGE);
  } else if (ACTION === 'purge-obsolete') {
    const obsolete = remotePackages.filter((p) => !activePackages.has(p.name));
    console.log(`[admin-packages] Found ${obsolete.length} obsolete packages to purge.`);
    for (const pkg of obsolete) {
      await deletePackage(pkg.name);
    }
  } else if (ACTION === 'purge-all') {
    console.log(`[admin-packages] WARNING: Purging ALL ${remotePackages.length} packages for clean release initialization.`);
    for (const pkg of remotePackages) {
      await deletePackage(pkg.name);
    }
  }
}

run().catch((err) => {
  console.error('[admin-packages] Uncaught error:', err);
  process.exit(1);
});
