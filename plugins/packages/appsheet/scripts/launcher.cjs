#!/usr/bin/env node

/**
 * Sovereign Plugin MCP Launcher - appsheet plugin
 * Enterprise Standard for @tupynambalucas-dev
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLUGIN_NAME = 'appsheet';

function loadEnvCascade() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '..', '.env'),
    path.resolve(__dirname, '..', '.env'),
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

const SERVICE_CONFIGS = {
  appsheet: {
    pkg: '@tupynambalucas-dev/mcp-appsheet',
    upstream: '@tupynambalucas-dev/mcp-appsheet',
    monorepoDir: 'appsheet'
  }
};

const targetService = process.argv[2];
const forwardedArgs = process.argv.slice(3);
const serviceConfig = SERVICE_CONFIGS[targetService];

if (!serviceConfig) {
  process.stderr.write(`[launcher:${PLUGIN_NAME}] Error: Unknown service '${targetService}'. Available: ${Object.keys(SERVICE_CONFIGS).join(', ')}\n`);
  process.exit(1);
}

const profile = process.env.MESH_PROFILE || 'local';
const isClusterMode = profile === 'cluster' || process.env.CORTEX_GATEWAY_ENABLED === 'true';
const gatewayBaseUrl = process.env.CORTEX_GATEWAY_URL || 'http://localhost:8080';

if (isClusterMode) {
  process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging cluster gateway for '${targetService}' via ${gatewayBaseUrl}/mcp\n`);
  const child = spawnCommand('npx', ['-y', 'mcp-remote', `${gatewayBaseUrl}/mcp`]);
  child.on('exit', (code) => process.exit(code || 0));
} else if (serviceConfig.monorepoDir) {
  const localPkgDir = path.resolve(__dirname, '..', '..', '..', '..', 'mcp', 'servers', serviceConfig.monorepoDir);
  const localJsBin = path.join(localPkgDir, 'dist', 'bin.js');
  const localTsBin = path.join(localPkgDir, 'src', 'bin.ts');

  if (fs.existsSync(localJsBin)) {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging monorepo precompiled binary for '${targetService}': node ${localJsBin}\n`);
    const child = spawn(process.execPath, [localJsBin, ...forwardedArgs], {
      stdio: 'inherit',
      shell: false,
      env: process.env
    });
    child.on('exit', (code) => process.exit(code || 0));
  } else if (fs.existsSync(localTsBin)) {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging monorepo TypeScript binary for '${targetService}': tsx ${localTsBin}\n`);
    const child = spawnCommand('npx', ['-y', 'tsx', localTsBin, ...forwardedArgs]);
    child.on('exit', (code) => process.exit(code || 0));
  } else {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging standalone package for '${targetService}': npx -y ${serviceConfig.pkg}\n`);
    const child = spawnCommand('npx', ['-y', serviceConfig.pkg, ...forwardedArgs]);
    child.on('exit', (code) => process.exit(code || 0));
  }
} else {
  process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging standalone package for '${targetService}': npx -y ${serviceConfig.pkg}\n`);
  const child = spawnCommand('npx', ['-y', serviceConfig.pkg, ...forwardedArgs]);
  child.on('exit', (code) => process.exit(code || 0));
}
