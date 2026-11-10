#!/usr/bin/env node

/**
 * Sovereign Plugin MCP Launcher - secrets plugin
 * Enterprise Standard for @tupynambalucas-dev
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLUGIN_NAME = 'secrets';

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

function resolveMcpLauncher(pkgName, monorepoDir) {
  if (pkgName) {
    try {
      const pkgJsonPath = require.resolve(`${pkgName}/package.json`, {
        paths: [process.cwd(), __dirname]
      });
      const pkgDir = path.dirname(pkgJsonPath);
      const pkgLauncher = path.join(pkgDir, 'scripts', 'launcher.cjs');
      if (fs.existsSync(pkgLauncher)) return { type: 'launcher', path: pkgLauncher };
      const pkgBin = path.join(pkgDir, 'dist', 'bin.cjs');
      if (fs.existsSync(pkgBin)) return { type: 'bin', path: pkgBin };
    } catch (e) {}
  }

  if (monorepoDir) {
    const umbrellaCandidates = [
      path.resolve(__dirname, '..', '..', '..', 'mcp', 'servers', monorepoDir),
      path.resolve(__dirname, '..', '..', '..', '..', 'mcp', 'servers', monorepoDir)
    ];

    for (const dir of umbrellaCandidates) {
      const launcher = path.join(dir, 'scripts', 'launcher.cjs');
      if (fs.existsSync(launcher)) return { type: 'launcher', path: launcher };
      const binCjs = path.join(dir, 'dist', 'bin.cjs');
      if (fs.existsSync(binCjs)) return { type: 'bin', path: binCjs };
      const binTs = path.join(dir, 'src', 'bin.ts');
      if (fs.existsSync(binTs)) return { type: 'ts', path: binTs };
    }
  }

  return null;
}

const SERVICE_CONFIGS = {
  infisical: {
    pkg: '@tupynambalucas-dev/mcp-infisical',
    upstream: '@infisical/mcp-server',
    monorepoDir: 'infisical'
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
} else {
  const resolved = resolveMcpLauncher(serviceConfig.pkg, serviceConfig.monorepoDir);

  if (resolved) {
    if (resolved.type === 'launcher' || resolved.type === 'bin') {
      process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging sovereign MCP executable for '${targetService}': node ${resolved.path}\n`);
      const child = spawn(process.execPath, [resolved.path, ...forwardedArgs], {
        stdio: 'inherit',
        shell: false,
        env: process.env
      });
      child.on('exit', (code) => process.exit(code || 0));
    } else if (resolved.type === 'ts') {
      process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging monorepo TypeScript binary for '${targetService}': tsx ${resolved.path}\n`);
      const child = spawnCommand('npx', ['-y', 'tsx', resolved.path, ...forwardedArgs]);
      child.on('exit', (code) => process.exit(code || 0));
    }
  } else {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging standalone package for '${targetService}': npx -y ${serviceConfig.pkg}\n`);
    const child = spawnCommand('npx', ['-y', serviceConfig.pkg, ...forwardedArgs]);
    child.on('exit', (code) => process.exit(code || 0));
  }
}
