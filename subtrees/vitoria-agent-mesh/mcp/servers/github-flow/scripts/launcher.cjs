#!/usr/bin/env node

/**
 * Sovereign MCP Launcher - @vitoria-rodrigues/mcp-github-flow
 * Enterprise Standard for @vitoria-rodrigues
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SERVER_NAME = 'github-flow';

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
            if (v.startsWith('<YOUR_') && v.endsWith('>')) continue;
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
