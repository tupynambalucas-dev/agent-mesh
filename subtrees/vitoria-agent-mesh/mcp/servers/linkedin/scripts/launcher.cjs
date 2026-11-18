#!/usr/bin/env node

/**
 * Sovereign MCP Launcher - @vitoria-rodrigues/mcp-linkedin
 * Enterprise Standard for @vitoria-rodrigues
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SERVER_NAME = 'linkedin';

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
        'The @vitoria-rodrigues/mcp-linkedin server scans this location during job applications',
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

    const sampleTemplate = path.join(resumesDir, 'resume-sample.md');
    if (!fs.existsSync(sampleTemplate)) {
      const sampleContent = [
        '# Software Engineer Resume',
        '',
        '## Contact',
        '- Location: Remote / Hybrid',
        '- Email: contato@vitoriarodrigues.dev',
        '',
        '## Professional Summary',
        'Senior Software Engineer specializing in distributed architectures, TypeScript monorepos,',
        'Model Context Protocol (MCP) integrations, and autonomous AI agent systems.',
        '',
        '## Core Competencies',
        '- Languages: TypeScript, JavaScript, Python, Go, SQL',
        '- Frameworks: React, Next.js, Fastify, Node.js',
        '- Architecture: Monorepos (pnpm, Turborepo), Microservices, REST, MCP, Docker, Kubernetes',
        '',
        '## Professional Experience',
        '### Staff Software Engineer (2024 - Present)',
        '- Architected enterprise agent mesh coordinating autonomous multi-agent workflows.',
        '- Built self-contained dual-transport MCP servers for developer tooling and web automation.',
        ''
      ].join('\n');
      fs.writeFileSync(sampleTemplate, sampleContent, 'utf8');
    }
  } catch (err) {
    process.stderr.write(`[launcher:mcp-${SERVER_NAME}] Warning: could not initialize resumes directory: ${err.message}\n`);
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

const forwardedArgs = process.argv.slice(2);
const isNativeRequested = (process.env.LINKEDIN_ENGINE || '').trim().toLowerCase() === 'native';
const bundledBin = path.resolve(__dirname, '..', 'dist', 'bin.cjs');
const srcTsBin = path.resolve(__dirname, '..', 'src', 'bin.ts');

if (isNativeRequested && fs.existsSync(bundledBin)) {
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
} else if (isNativeRequested && fs.existsSync(srcTsBin)) {
  const child = spawnCommand('npx', ['-y', 'tsx', srcTsBin, ...forwardedArgs]);
  child.on('exit', (code) => process.exit(code || 0));
} else {
  // Primary execution: upstream runner
  const upstreamArgs = resolveUpstreamArgs(forwardedArgs);
  process.stderr.write(`[launcher:mcp-${SERVER_NAME}] Engaging primary upstream runner: uvx ${upstreamArgs.join(' ')}\n`);
  const child = spawnCommand('uvx', upstreamArgs);
  child.on('exit', (code) => process.exit(code || 0));
  child.on('error', (err) => {
    process.stderr.write(`[launcher:mcp-${SERVER_NAME}] Upstream uvx runner failed: ${err.message}. Ensure uv is installed.\n`);
    process.exit(1);
  });
}
