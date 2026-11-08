#!/usr/bin/env node

/**
 * Enterprise GitHub Packages Administration & Dynamic Reconciliation Tool
 * tupynambalucas-dev Organization
 *
 * Dynamically discovers active packages from the current workspace tree and
 * historical/renamed/removed packages directly from Git commit history
 * (`git log --all -p -- "**/package.json"`), eliminating any need to maintain
 * static obsolete package lists in the repository.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ORG = 'tupynambalucas-dev';
const ROOT_PRIVATE_NAME = 'agent-mesh';
const TOKEN = process.env.ADMIN_TOKEN || process.env.NODE_AUTH_TOKEN || process.env.GITHUB_TOKEN;
const ACTION = process.env.ADMIN_ACTION || process.argv[2] || 'list';
const TARGET_PACKAGE = process.env.TARGET_PACKAGE || process.argv[3] || '';
const DRY_RUN = process.env.DRY_RUN !== 'false';

if (!TOKEN) {
  console.error('[admin-packages] Error: No authentication token found. Provide ADMIN_TOKEN or GITHUB_TOKEN.');
  process.exit(1);
}

function toShortName(name) {
  return String(name || '')
    .trim()
    .replace(new RegExp(`^@${ORG}\\/`), '');
}

function toScopedName(name) {
  const shortName = toShortName(name);
  return `@${ORG}/${shortName}`;
}

function getHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'tupynambalucas-dev-package-admin',
  };
}

// Discover current active package short names in workspace
function getActivePackages() {
  const active = new Set();
  const dirs = ['mcp/servers', 'mcp/core', 'plugins/packages', 'plugins/core'];
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
          if (pkg.name && pkg.private !== true) {
            active.add(toShortName(pkg.name));
          }
        }
      }
    }
  }
  return active;
}

// Dynamically discover every @tupynambalucas-dev/<name> package ever declared
// across the repository's Git commit history (zero hardcoded lists required).
function getHistoricalPackagesFromGit() {
  const historical = new Set();
  const root = path.resolve(__dirname, '../..');

  try {
    const output = execFileSync(
      'git',
      ['log', '--all', '-p', '--', '**/package.json', 'package.json'],
      { cwd: root, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }
    );
    const regex = new RegExp(`"name"\\s*:\\s*"@${ORG}\\/([a-z0-9-]+)"`, 'g');
    let match;
    while ((match = regex.exec(output)) !== null) {
      const shortName = match[1];
      if (shortName && shortName !== ROOT_PRIVATE_NAME) {
        historical.add(shortName);
      }
    }
  } catch (err) {
    console.warn(`[admin-packages] Warning: Could not inspect Git history (${err.message}).`);
  }

  return historical;
}

// Fetch packages via organization listing (returns public packages or all packages when using Classic PAT)
// and supplement with direct candidate probing from active workspace + Git commit history.
async function fetchPackages(activePackages) {
  const packageMap = new Map();
  let page = 1;

  while (true) {
    const url = `https://api.github.com/orgs/${ORG}/packages?package_type=npm&per_page=100&page=${page}`;
    const res = await fetch(url, { headers: getHeaders() });

    if (!res.ok) {
      break;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    for (const pkg of data) {
      packageMap.set(toShortName(pkg.name), pkg);
    }

    if (data.length < 100) {
      break;
    }
    page++;
  }

  const historicalPackages = getHistoricalPackagesFromGit();
  console.log(`[admin-packages] Unique package names discovered in Git history: ${historicalPackages.size}`);

  const candidates = new Set([
    ...activePackages,
    ...historicalPackages,
    ...(TARGET_PACKAGE ? [toShortName(TARGET_PACKAGE)] : []),
  ]);

  for (const shortName of candidates) {
    if (!shortName || packageMap.has(shortName)) {
      continue;
    }
    const url = `https://api.github.com/orgs/${ORG}/packages/npm/${encodeURIComponent(shortName)}`;
    const res = await fetch(url, { headers: getHeaders() });
    if (res.status === 200) {
      const pkg = await res.json();
      packageMap.set(toShortName(pkg.name || shortName), pkg);
    }
  }

  return Array.from(packageMap.values());
}

async function deletePackage(packageName) {
  const shortName = toShortName(packageName);
  const scopedName = toScopedName(shortName);
  const url = `https://api.github.com/orgs/${ORG}/packages/npm/${encodeURIComponent(shortName)}`;

  if (DRY_RUN) {
    console.log(`[admin-packages] [DRY RUN] Would DELETE: ${scopedName} (${url})`);
    return true;
  }

  console.log(`[admin-packages] Executing DELETE: ${scopedName}...`);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (res.status === 204) {
    console.log(`[admin-packages] Successfully deleted package: ${scopedName}`);
    return true;
  } else if (res.status === 404) {
    console.log(`[admin-packages] Package not found (already absent): ${scopedName}`);
    return true;
  } else {
    const err = await res.text();
    console.error(`[admin-packages] Failed to delete ${scopedName} (HTTP ${res.status}): ${err}`);
    return false;
  }
}

async function run() {
  console.log(`[admin-packages] Organization: ${ORG}`);
  console.log(`[admin-packages] Action: ${ACTION} | DryRun: ${DRY_RUN}`);

  const activePackages = getActivePackages();
  console.log(`[admin-packages] Active workspace packages count: ${activePackages.size}`);

  if (ACTION === 'delete-one') {
    if (!TARGET_PACKAGE) {
      console.error('[admin-packages] Error: TARGET_PACKAGE must be specified for delete-one action.');
      process.exit(1);
    }
    await deletePackage(TARGET_PACKAGE);
    return;
  }

  let remotePackages = [];
  try {
    remotePackages = await fetchPackages(activePackages);
    console.log(`[admin-packages] Remote packages found on GitHub Packages: ${remotePackages.length}`);
  } catch (err) {
    console.warn(`[admin-packages] Notice: ${err.message}`);
    console.log('[admin-packages] Ensure GITHUB_TOKEN has "packages: write" or provide ADMIN_PACKAGES_TOKEN.');
    return;
  }

  if (ACTION === 'list') {
    console.log('\n--- Remote Packages Status ---');
    for (const pkg of remotePackages) {
      const shortName = toShortName(pkg.name);
      const isCurrent = activePackages.has(shortName);
      console.log(
        `- ${toScopedName(shortName)} (v${pkg.version_count || 1}, visibility: ${pkg.visibility || 'private'}) -> ${isCurrent ? 'ACTIVE' : 'OBSOLETE / ORPHAN'}`
      );
    }
  } else if (ACTION === 'purge-obsolete') {
    const obsolete = remotePackages.filter((p) => !activePackages.has(toShortName(p.name)));
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
