#!/usr/bin/env node

/**
 * Sovereign Plugin MCP Launcher - web plugin
 * Enterprise Standard for @tupynambalucas-dev
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLUGIN_NAME = 'web';

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

const targetService = process.argv[2];
const forwardedArgs = process.argv.slice(3);

const profile = process.env.MESH_PROFILE || 'local';
const isClusterMode = profile === 'cluster' || process.env.CORTEX_GATEWAY_ENABLED === 'true';
const gatewayBaseUrl = process.env.CORTEX_GATEWAY_URL || 'http://localhost:8080';

if (isClusterMode) {
  process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging cluster gateway for '${targetService}' via ${gatewayBaseUrl}/mcp\n`);
  const child = spawnCommand('npx', ['-y', 'mcp-remote', `${gatewayBaseUrl}/mcp`]);
  child.on('exit', (code) => process.exit(code || 0));
} else if (targetService === 'playwright') {
  const mode = process.env.PLAYWRIGHT_MODE || 'auto';
  const hasExtensionToken = Boolean(
    process.env.PLAYWRIGHT_MCP_EXTENSION_TOKEN &&
    process.env.PLAYWRIGHT_MCP_EXTENSION_TOKEN.trim()
  );
  const effectiveMode = (mode === 'auto')
    ? (hasExtensionToken ? 'extension' : 'headless')
    : mode;

  const resolvedArgs = [];
  if (effectiveMode === 'extension') {
    resolvedArgs.push('--extension');
  } else if (effectiveMode === 'cdp') {
    resolvedArgs.push('--cdp-endpoint', process.env.PLAYWRIGHT_CDP_URL || 'http://localhost:9222');
  } else if (effectiveMode === 'channel') {
    resolvedArgs.push('--browser', process.env.PLAYWRIGHT_CHANNEL || 'chrome');
    if (process.env.PLAYWRIGHT_HEADLESS === 'true') {
      resolvedArgs.push('--headless');
    }
  } else {
    // headless standalone
    const pluginDataDir = process.env.PLUGIN_DATA || path.resolve(process.cwd(), '.agent-data');
    resolvedArgs.push('--user-data-dir', path.join(pluginDataDir, 'browser-profile'), '--headless');
  }

  if (process.env.PLAYWRIGHT_MCP_EXECUTABLE_PATH) {
    resolvedArgs.push('--executable-path', process.env.PLAYWRIGHT_MCP_EXECUTABLE_PATH);
  }

  resolvedArgs.push(...forwardedArgs);

  process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging Playwright MCP in '${effectiveMode}' mode\n`);
  const child = spawnCommand('npx', ['-y', '@playwright/mcp@0.0.84', ...resolvedArgs]);
  child.on('exit', (code) => process.exit(code || 0));
} else if (targetService === 'firecrawl') {
  const localPkgDir = path.resolve(__dirname, '..', '..', '..', '..', 'mcp', 'packages', 'firecrawl');
  const localJsBin = path.join(localPkgDir, 'dist', 'bin.js');
  const localTsBin = path.join(localPkgDir, 'src', 'bin.ts');

  if (fs.existsSync(localJsBin)) {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging monorepo precompiled binary for 'firecrawl': node ${localJsBin}\n`);
    const child = spawn(process.execPath, [localJsBin, ...forwardedArgs], {
      stdio: 'inherit',
      shell: false,
      env: process.env
    });
    child.on('exit', (code) => process.exit(code || 0));
  } else if (fs.existsSync(localTsBin)) {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging monorepo TypeScript binary for 'firecrawl': tsx ${localTsBin}\n`);
    const child = spawnCommand('npx', ['-y', 'tsx', localTsBin, ...forwardedArgs]);
    child.on('exit', (code) => process.exit(code || 0));
  } else {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging standalone package for 'firecrawl': npx -y @tupynambalucas-dev/mcp-firecrawl\n`);
    const child = spawnCommand('npx', ['-y', '@tupynambalucas-dev/mcp-firecrawl', ...forwardedArgs]);
    child.on('exit', (code) => process.exit(code || 0));
  }
} else {
  process.stderr.write(`[launcher:${PLUGIN_NAME}] Error: Unknown service '${targetService}'. Available: firecrawl, playwright\n`);
  process.exit(1);
}
