#!/usr/bin/env node

/**
 * Enterprise Root Package Publisher for @tupynambalucas-dev/agent-mesh
 * Idempotently publishes the root umbrella package, gracefully handling E409
 * when the exact version has already been published to GitHub Packages.
 */

const { execSync } = require('child_process');

try {
  console.log('[publish-root] Publishing root umbrella package @tupynambalucas-dev/agent-mesh...');
  execSync('pnpm publish --access public --no-git-checks --report-summary', {
    stdio: 'inherit',
    env: process.env,
  });
  console.log('[publish-root] Successfully published @tupynambalucas-dev/agent-mesh.');
} catch (err) {
  const output = (err.stdout?.toString() || '') + (err.stderr?.toString() || '') + (err.message || '');
  if (
    output.includes('409 Conflict') ||
    output.includes('Cannot publish over existing version') ||
    output.includes('E409')
  ) {
    console.log('[publish-root] Version is already published on registry. Skipping idempotently.');
    process.exit(0);
  }
  console.error('[publish-root] Error publishing root package:', err.message);
  process.exit(1);
}
