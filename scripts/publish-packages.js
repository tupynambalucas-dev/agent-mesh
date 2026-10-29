#!/usr/bin/env node

/**
 * Authoritative Idempotent Multi-Package Publisher for GitHub Packages
 * tupynambalucas-dev Enterprise Standard
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagesDirs = ['plugins/packages', 'mcp/packages'];
const packages = [];

// Include root package if present and publishable
const rootDir = path.resolve(__dirname, '..');
const rootPkgPath = path.join(rootDir, 'package.json');
if (fs.existsSync(rootPkgPath)) {
  packages.push(rootDir);
}

// Collect all workspace packages
for (const dir of packagesDirs) {
  const fullDir = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) continue;
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pkgJsonPath = path.join(fullDir, entry.name, 'package.json');
      if (fs.existsSync(pkgJsonPath)) {
        packages.push(path.join(fullDir, entry.name));
      }
    }
  }
}

console.log(`[mesh-publish] Found ${packages.length} workspace packages to evaluate for registry publication.`);

for (const pkgPath of packages) {
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgPath, 'package.json'), 'utf8'));
  const name = pkgJson.name;
  const version = pkgJson.version;

  if (!name || !version || pkgJson.private) {
    console.log(`[mesh-publish] Skipping private/unnamed package at ${pkgPath}`);
    continue;
  }

  console.log(`\n[mesh-publish] Evaluating package: ${name}@${version}...`);

  let remoteVersion = null;
  try {
    remoteVersion = execSync(`npm view "${name}@${version}" version --registry=https://npm.pkg.github.com`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
  } catch {
    remoteVersion = null;
  }

  if (remoteVersion === version) {
    console.log(`[mesh-publish] Notice: Version ${version} of ${name} is already published to GitHub Packages. Skipping.`);
  } else {
    console.log(`[mesh-publish] New version detected (${version}). Publishing ${name} to GitHub Packages...`);
    try {
      execSync(`npm publish --registry=https://npm.pkg.github.com --access=public`, {
        cwd: pkgPath,
        stdio: 'inherit',
      });
      console.log(`[mesh-publish] Successfully published ${name}@${version}`);
    } catch (err) {
      console.error(`[mesh-publish] Error publishing ${name}@${version}:`, err.message);
      process.exitCode = 1;
    }
  }
}
