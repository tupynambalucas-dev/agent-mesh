#!/usr/bin/env node

/**
 * Enterprise Root Package Publisher for @tupynambalucas-dev/agent-mesh
 * Idempotently publishes the root umbrella package, gracefully handling E409
 * when the exact version has already been published to GitHub Packages.
 */

const { spawnSync } = require('child_process');

console.log('[publish-root] Publishing root umbrella package @tupynambalucas-dev/agent-mesh...');

const res = spawnSync(
  process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
  ['publish', '--access', 'public', '--no-git-checks', '--report-summary'],
  {
    encoding: 'utf8',
    env: process.env,
    shell: false,
  }
);

if (res.stdout) process.stdout.write(res.stdout);
if (res.stderr) process.stderr.write(res.stderr);

if (res.status !== 0) {
  const combined = (res.stdout || '') + (res.stderr || '');
  if (
    combined.includes('409 Conflict') ||
    combined.includes('Cannot publish over existing version') ||
    combined.includes('E409')
  ) {
    console.log('[publish-root] Version is already published on registry. Skipping idempotently.');
    process.exit(0);
  }
  console.error(`[publish-root] Error: pnpm publish exited with code ${res.status}`);
  process.exit(res.status || 1);
}

console.log('[publish-root] Successfully published @tupynambalucas-dev/agent-mesh.');
