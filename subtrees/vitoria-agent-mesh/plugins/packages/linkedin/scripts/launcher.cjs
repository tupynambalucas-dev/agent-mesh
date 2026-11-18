#!/usr/bin/env node

/**
 * Sovereign Plugin MCP Launcher - linkedin plugin
 * Enterprise Standard for @vitoria-rodrigues
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLUGIN_NAME = 'linkedin';

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
            if (v.startsWith('<YOUR_') && v.endsWith('>')) continue;
            if (!process.env[k]) process.env[k] = v;
          }
        }
      } catch (e) {}
    }
  }
}
loadEnvCascade();

function initializeResumesDirectory() {
  const homeDir = process.env.HOME || process.env.USERPROFILE || '.';
  const pluginData = process.env.PLUGIN_DATA || path.join(homeDir, '.antigravity', 'data', 'linkedin');
  const resumesDir = process.env.LINKEDIN_RESUMES_DIR || path.join(pluginData, 'resumes');

  try {
    if (!fs.existsSync(resumesDir)) {
      fs.mkdirSync(resumesDir, { recursive: true });
    }

    const readmePath = path.join(resumesDir, 'README.md');
    if (!fs.existsSync(readmePath)) {
      const readmeContent = [
        '# Candidate Resumes Vault',
        '',
        'Place your tailored resume files (.md, .txt, .pdf) in this directory.',
        'The @vitoria-rodrigues/plugin-linkedin agent inspects this location during job applications',
        'to match requirements and extract candidate profile context.',
        '',
        'Recommended naming convention:',
        '- resume-general.md',
        '- resume-fullstack.md',
        '- resume-backend.md',
        '- resume-ai-engineer.md',
        ''
      ].join('\n');
      fs.writeFileSync(readmePath, readmeContent, 'utf8');
    }
  } catch (err) {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Warning: could not initialize resumes directory: ${err.message}\n`);
  }

  process.env.LINKEDIN_RESUMES_DIR = resumesDir;
  return resumesDir;
}

const resolvedResumesDir = initializeResumesDirectory();

function spawnCommand(bin, args, options = {}) {
  const isWin = process.platform === 'win32';
  if (isWin && (bin === 'npx' || bin === 'uvx' || bin === 'uv' || bin.endsWith('.cmd') || bin.endsWith('.bat'))) {
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

function isUpstreamEngineRequested() {
  const engine = (process.env.LINKEDIN_ENGINE || '').trim().toLowerCase();
  const useUpstream = (process.env.LINKEDIN_USE_UPSTREAM || '').trim().toLowerCase();
  return engine === 'upstream' || engine === 'uvx' || useUpstream === 'true' || useUpstream === '1';
}

function resolveUpstreamArgs(forwarded = []) {
  const upstreamPkg = process.env.LINKEDIN_UPSTREAM_PACKAGE || 'mcp-server-linkedin@latest';
  const args = [upstreamPkg];

  const hasImportBrowser = forwarded.some(
    (arg) => arg === '--import-from-browser' || arg.startsWith('--import-from-browser=')
  );
  if (!hasImportBrowser) {
    const browser = process.env.LINKEDIN_BROWSER || process.env.LINKEDIN_IMPORT_BROWSER || 'auto';
    args.push('--import-from-browser', browser);
  }

  const hasHeadlessFlag = forwarded.some(
    (arg) => arg === '--headless' || arg === '--no-headless'
  );
  if (!hasHeadlessFlag) {
    if (process.env.LINKEDIN_HEADLESS === 'false' || process.env.LINKEDIN_NO_HEADLESS === 'true') {
      args.push('--no-headless');
    } else {
      args.push('--headless');
    }
  }

  const hasUserDataDir = forwarded.some(
    (arg) => arg === '--user-data-dir' || arg.startsWith('--user-data-dir=')
  );
  if (!hasUserDataDir && process.env.LINKEDIN_USER_DATA_DIR) {
    args.push('--user-data-dir', process.env.LINKEDIN_USER_DATA_DIR);
  }

  args.push(...forwarded);
  return args;
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
  'linkedin': {
    pkg: '@vitoria-rodrigues/mcp-linkedin',
    upstream: 'uvx mcp-server-linkedin@latest',
    monorepoDir: 'linkedin'
  }
};

const targetService = process.argv[2] || 'linkedin';
const forwardedArgs = process.argv.slice(3);

const isNativeRequested = (process.env.LINKEDIN_ENGINE || '').trim().toLowerCase() === 'native';

if (isNativeRequested) {
  const resolved = resolveMcpLauncher(serviceConfig.pkg, serviceConfig.monorepoDir);

  if (resolved) {
    let child;
    if (resolved.type === 'launcher') {
      child = spawn(process.execPath, [resolved.path, ...forwardedArgs], {
        stdio: 'inherit',
        shell: false,
        env: process.env
      });
    } else if (resolved.type === 'bin') {
      child = spawn(process.execPath, [resolved.path, ...forwardedArgs], {
        stdio: 'inherit',
        shell: false,
        env: process.env
      });
    } else if (resolved.type === 'ts') {
      child = spawnCommand('npx', ['-y', 'tsx', resolved.path, ...forwardedArgs]);
    }
    child.on('exit', (code) => process.exit(code || 0));
    child.on('error', (err) => {
      process.stderr.write(`[launcher:${PLUGIN_NAME}] Failed to spawn resolved launcher for '${targetService}': ${err.message}\n`);
      process.exit(1);
    });
  } else {
    const upstreamArgs = resolveUpstreamArgs(forwardedArgs);
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging primary upstream runner for '${targetService}': uvx ${upstreamArgs.join(' ')}\n`);
    const child = spawnCommand('uvx', upstreamArgs);
    child.on('exit', (code) => process.exit(code || 0));
    child.on('error', (err) => {
      process.stderr.write(`[launcher:${PLUGIN_NAME}] Upstream uvx runner failed: ${err.message}. Ensure uv is installed.\n`);
      process.exit(1);
    });
  }
} else {
  // Primary execution: upstream runner
  const upstreamArgs = resolveUpstreamArgs(forwardedArgs);
  process.stderr.write(`[launcher:${PLUGIN_NAME}] Engaging primary upstream runner for '${targetService}': uvx ${upstreamArgs.join(' ')}\n`);
  const child = spawnCommand('uvx', upstreamArgs);
  child.on('exit', (code) => process.exit(code || 0));
  child.on('error', (err) => {
    process.stderr.write(`[launcher:${PLUGIN_NAME}] Upstream uvx runner failed: ${err.message}. Ensure uv is installed.\n`);
    process.exit(1);
  });
}
