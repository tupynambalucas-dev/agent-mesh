#!/usr/bin/env node

/**
 * Sovereign MCP Launcher - @tupynambalucas-dev/mcp-playwright
 * Enterprise Standard for @tupynambalucas-dev
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SERVER_NAME = 'playwright';

function loadEnvCascade() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '..', '.env'),
    path.resolve(__dirname, '..', '.env'),
    path.resolve(__dirname, '..', '..', '.env'),
    path.resolve(__dirname, '..', '..', '..', '.env'),
    path.resolve(__dirname, '..', '..', '..', '..', '.env')
  ];
  for (const envPath of candidates) {
    if (fs.existsSync(envPath)) {
      try {
        const raw = fs.readFileSync(envPath, 'utf8');
        for (const line of raw.split('\n')) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const k = trimmed.slice(0, eqIdx).trim();
            const v = trimmed.slice(eqIdx + 1).trim();
            if (!process.env[k]) process.env[k] = v;
          }
        }
      } catch (e) {}
    }
  }
}
loadEnvCascade();

function spawnCommand(bin, args, options = {}) {
  const isWin = process.platform === 'win32';
  if (isWin && (bin === 'npx' || bin.endsWith('.cmd') || bin.endsWith('.bat'))) {
    return spawn('cmd.exe', ['/d', '/s', '/c', bin, ...args], {
      stdio: 'inherit',
      shell: false,
      env: process.env,
      ...options
    });
  }
  return spawn(bin, args, {
    stdio: 'inherit',
    shell: false,
    env: process.env,
    ...options
  });
}

const forwardedArgs = process.argv.slice(2);
const profile = process.env.MESH_PROFILE || 'local';
const isClusterMode = profile === 'cluster' || process.env.CORTEX_GATEWAY_ENABLED === 'true';
const gatewayBaseUrl = process.env.CORTEX_GATEWAY_URL || 'http://localhost:8080';

if (isClusterMode) {
  process.stderr.write(`[launcher:mcp-${SERVER_NAME}] Engaging cluster gateway via ${gatewayBaseUrl}/mcp\n`);
  const child = spawnCommand('npx', ['-y', 'mcp-remote', `${gatewayBaseUrl}/mcp`]);
  child.on('exit', (code) => process.exit(code || 0));
} else {
  const bundledBin = path.resolve(__dirname, '..', 'dist', 'bin.cjs');
  const srcTsBin = path.resolve(__dirname, '..', 'src', 'bin.ts');

  if (fs.existsSync(bundledBin)) {
    const child = spawn(process.execPath, [bundledBin, ...forwardedArgs], {
      stdio: 'inherit',
      shell: false,
      env: process.env
    });
    child.on('exit', (code) => process.exit(code || 0));
    child.on('error', (err) => {
      process.stderr.write(`[launcher:mcp-${SERVER_NAME}] Failed to spawn bundled binary: ${err.message}\n`);
      process.exit(1);
    });
  } else if (fs.existsSync(srcTsBin)) {
    const child = spawnCommand('npx', ['-y', 'tsx', srcTsBin, ...forwardedArgs]);
    child.on('exit', (code) => process.exit(code || 0));
    child.on('error', (err) => {
      process.stderr.write(`[launcher:mcp-${SERVER_NAME}] Failed to spawn TypeScript binary: ${err.message}\n`);
      process.exit(1);
    });
  } else {
    process.stderr.write(`[launcher:mcp-${SERVER_NAME}] Error: No executable binary found in package.\n`);
    process.exit(1);
  }
}
