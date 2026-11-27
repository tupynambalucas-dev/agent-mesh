#!/usr/bin/env node

/**
 * Sovereign Plugin MCP Launcher - cloudflare plugin
 * Enterprise Standard for @tupynambalucas-dev
 *
 * Pure Node.js Stdio-to-Streamable-HTTP JSON-RPC bridge for Cloudflare's
 * stateless Code Mode MCP server (https://mcp.cloudflare.com/mcp).
 *
 * Architectural Guarantees:
 * 1. Zero OAuth Browser Popups: Exposes a pure 'stdio' transport to Antigravity
 *    and Claude Code without spawning 'mcp-remote' or OAuth PKCE/CIMD clients,
 *    preventing 401/403 WWW-Authenticate challenges from ever opening a browser.
 * 2. Prefix-Aware Credential Guards: Validates Cloudflare token prefixes
 *    ('cfat_*' Account Tokens vs. 'cfut_*' User Tokens vs. unsupported 'cfk_*'
 *    Global API Keys) aligned with cloudflare/mcp src/auth/api-token-mode.ts.
 * 3. Rate-Limit & Lockout Protection: Circuit-breaks rejected tokens locally
 *    for 60s (resetting immediately when .env changes) to avoid triggering
 *    Cloudflare's 429 10502 ('Too many authentication failures') lockout.
 * 4. Zero Plaintext Leakage: Credentials remain strictly in Node.js memory via
 *    Infisical or .env cascade and never appear in OS process CLI arguments.
 */

const path = require('path');
const fs = require('fs');
const readline = require('readline');

const PLUGIN_NAME = 'cloudflare';
const DEFAULT_MCP_URL = 'https://mcp.cloudflare.com/mcp';
const REQUEST_TIMEOUT_MS = 120_000;
const AUTH_HOLD_MS = 60_000;

const ENV_CANDIDATES = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '..', '.env'),
  path.resolve(__dirname, '..', '.env'),
  path.resolve(__dirname, '..', '..', '..', '.env'),
  path.resolve(__dirname, '..', '..', '..', '..', '.env')
];

const INITIAL_ENV_TOKEN = (process.env.CLOUDFLARE_API_TOKEN || '').trim();

function resolveRuntimeConfig() {
  const merged = {};
  // Read from lowest priority (outermost parent) to highest priority (cwd),
  // or preserve first-found priority matching loadEnvCascade semantics:
  for (const envPath of ENV_CANDIDATES) {
    if (fs.existsSync(envPath)) {
      try {
        const raw = fs.readFileSync(envPath, 'utf8');
        for (const line of raw.split('\n')) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const k = trimmed.slice(0, eqIdx).trim();
            const v = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (v && !v.startsWith('<YOUR_') && merged[k] === undefined) {
              merged[k] = v;
            }
          }
        }
      } catch (e) {}
    }
  }

  const token =
    INITIAL_ENV_TOKEN && !INITIAL_ENV_TOKEN.startsWith('<YOUR_')
      ? INITIAL_ENV_TOKEN
      : merged.CLOUDFLARE_API_TOKEN || null;

  const rawBaseUrl = process.env.CLOUDFLARE_MCP_URL || merged.CLOUDFLARE_MCP_URL || '';
  const baseUrl =
    rawBaseUrl && !rawBaseUrl.startsWith('<YOUR_') ? rawBaseUrl : DEFAULT_MCP_URL;
  const codeMode = process.env.CLOUDFLARE_CODE_MODE || merged.CLOUDFLARE_CODE_MODE || 'true';

  const targetUrl =
    codeMode === 'false' && !baseUrl.includes('codemode=')
      ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}codemode=false`
      : baseUrl;

  const profile = process.env.MESH_PROFILE || merged.MESH_PROFILE || 'local';
  const isClusterMode =
    profile === 'cluster' ||
    (process.env.CORTEX_GATEWAY_ENABLED || merged.CORTEX_GATEWAY_ENABLED) === 'true';
  const gatewayBaseUrl =
    process.env.CORTEX_GATEWAY_URL || merged.CORTEX_GATEWAY_URL || 'http://localhost:8080';
  const gatewayToken =
    process.env.TUPYNAMBA_GATEWAY_TOKEN || merged.TUPYNAMBA_GATEWAY_TOKEN || null;

  return {
    token: token ? token.trim() : null,
    targetUrl: isClusterMode ? `${gatewayBaseUrl.replace(/\/+$/, '')}/mcp` : targetUrl,
    isClusterMode,
    gatewayToken: gatewayToken && !gatewayToken.startsWith('<YOUR_') ? gatewayToken.trim() : null
  };
}

const OFFLINE_CODE_MODE_TOOLS = [
  {
    name: 'docs',
    description: 'Search Cloudflare developer documentation.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Documentation search query' } },
      required: ['query']
    }
  },
  {
    name: 'search',
    description:
      'Search the Cloudflare OpenAPI spec. All $refs are pre-resolved inline. Write a JavaScript async arrow function querying spec.paths.',
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'JavaScript async arrow function to search the OpenAPI spec'
        }
      },
      required: ['code']
    }
  },
  {
    name: 'execute',
    description:
      'Execute JavaScript code against the Cloudflare API using cloudflare.request({ method, path, query, headers, body }).',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'JavaScript async arrow function to execute' },
        account_id: {
          type: 'string',
          description: 'Optional Cloudflare account ID (auto-detected for single-account tokens)'
        }
      },
      required: ['code']
    }
  },
  {
    name: 'whoami',
    description: 'Return the Cloudflare user or account this connection is authenticated as.',
    inputSchema: { type: 'object', properties: {} }
  }
];

function classifyTokenDiagnostic(token, status, wwwAuth, rawBody) {
  if (token.startsWith('cfk_')) {
    return (
      'CLOUDFLARE_API_TOKEN starts with "cfk_" (Global API Key), which Cloudflare MCP rejects. ' +
      'Create an Account API Token ("cfat_*") at Manage Account -> Account API Tokens (with Account Settings: Read) ' +
      'or a User API Token ("cfut_*") at My Profile -> API Tokens (with User Details: Read + Account Settings: Read).'
    );
  }
  const ownerHint = token.startsWith('cfat_')
    ? 'Account API Token (cfat_*): verify it is active, includes "Account -> Account Settings -> Read" on Entire Account, resolves to 1 account, and has NO Client IP Address Filtering.'
    : token.startsWith('cfut_')
      ? 'User API Token (cfut_*): Cloudflare MCP probes BOTH /user and /accounts in parallel — verify the token includes BOTH "User -> User Details -> Read" AND "Account -> Account Settings -> Read", and has NO Client IP Address Filtering.'
      : 'Verify the API token is active, includes "Account Settings: Read" (plus "User Details: Read" if it is a User Token), and has NO Client IP Address Filtering.';

  return `Cloudflare MCP HTTP ${status}${wwwAuth ? ` (${wwwAuth})` : ''}${rawBody ? `: ${rawBody.slice(0, 300)}` : ''}. ${ownerHint}`;
}

function writeJsonRpc(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

function answerLocalFallback(msg, reasonText) {
  if (msg.method === 'initialize') {
    writeJsonRpc({
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        protocolVersion: (msg.params && msg.params.protocolVersion) || '2025-03-26',
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'cloudflare-mcp-bridge', version: '1.0.0' }
      }
    });
    return;
  }
  if (msg.method === 'ping') {
    writeJsonRpc({ jsonrpc: '2.0', id: msg.id, result: {} });
    return;
  }
  if (msg.method === 'tools/list') {
    writeJsonRpc({
      jsonrpc: '2.0',
      id: msg.id,
      result: { tools: OFFLINE_CODE_MODE_TOOLS }
    });
    return;
  }
  if (msg.method === 'resources/list') {
    writeJsonRpc({ jsonrpc: '2.0', id: msg.id, result: { resources: [] } });
    return;
  }
  if (msg.method === 'prompts/list') {
    writeJsonRpc({ jsonrpc: '2.0', id: msg.id, result: { prompts: [] } });
    return;
  }
  if (msg.method === 'tools/call') {
    writeJsonRpc({
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        isError: true,
        content: [{ type: 'text', text: reasonText }]
      }
    });
    return;
  }
  writeJsonRpc({
    jsonrpc: '2.0',
    id: msg.id,
    error: { code: -32001, message: reasonText }
  });
}

function startNativeStreamableHttpBridge() {
  let sessionId = null;
  let negotiatedProtocolVersion = null;
  let heldTokenState = null; // { token, until, message }
  let inFlight = 0;
  let stdinClosed = false;

  function maybeExit() {
    if (stdinClosed && inFlight === 0) {
      process.exit(0);
    }
  }

  const rl = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
    terminal: false
  });

  rl.on('line', async (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    inFlight += 1;
    try {
      let msg;
      try {
        msg = JSON.parse(trimmed);
      } catch (e) {
        return;
      }

      const isNotification = msg && !Array.isArray(msg) && msg.id === undefined;
      const cfg = resolveRuntimeConfig();
      const bearer = cfg.isClusterMode ? cfg.gatewayToken : cfg.token;

      if (!cfg.isClusterMode && !bearer) {
        if (isNotification) return;
        answerLocalFallback(
          msg,
          'CLOUDFLARE_API_TOKEN is not configured. Populate CLOUDFLARE_API_TOKEN in org/.env, agent-mesh/.env, or Infisical (Account Token "cfat_*" with Account Settings: Read, or User Token "cfut_*" with User Details: Read + Account Settings: Read; zero Client IP Filtering). Hot-reload applies immediately on the next call.'
        );
        return;
      }

      // Immediate local rejection for Global API Keys (cfk_*) without spending API probes
      if (!cfg.isClusterMode && bearer && bearer.startsWith('cfk_')) {
        if (isNotification) return;
        answerLocalFallback(msg, classifyTokenDiagnostic(bearer, 401, '', ''));
        return;
      }

      // Circuit-breaker hold for rejected credentials (resets immediately if .env token changes)
      if (
        !cfg.isClusterMode &&
        heldTokenState &&
        heldTokenState.token === bearer &&
        Date.now() < heldTokenState.until
      ) {
        if (isNotification) return;
        const waitSec = Math.ceil((heldTokenState.until - Date.now()) / 1000);
        answerLocalFallback(
          msg,
          `${heldTokenState.message} (Local probe hold active for ${waitSec}s to prevent Cloudflare 10502 lockout; updating CLOUDFLARE_API_TOKEN in .env resets this immediately.)`
        );
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream'
      };
      if (bearer) {
        headers.Authorization = `Bearer ${bearer}`;
      }
      if (sessionId) {
        headers['Mcp-Session-Id'] = sessionId;
      }
      if (negotiatedProtocolVersion && msg.method !== 'initialize') {
        headers['MCP-Protocol-Version'] = negotiatedProtocolVersion;
      }

      try {
        const response = await fetch(cfg.targetUrl, {
          method: 'POST',
          headers,
          body: trimmed,
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
        });

        const respSession = response.headers.get('mcp-session-id');
        if (respSession) sessionId = respSession;

        if (response.status === 202 || response.status === 204 || isNotification) {
          return;
        }

        const contentType = (response.headers.get('content-type') || '').toLowerCase();
        const rawBody = await response.text();

        if (!response.ok) {
          let parsedErr = null;
          try {
            parsedErr = JSON.parse(rawBody);
          } catch (e) {}
          if (parsedErr && parsedErr.jsonrpc) {
            writeJsonRpc(parsedErr);
            return;
          }

          const wwwAuth = response.headers.get('www-authenticate') || '';
          const detail = cfg.isClusterMode
            ? `Cortex Gateway MCP HTTP ${response.status}: ${rawBody.slice(0, 300)}`
            : classifyTokenDiagnostic(bearer || '', response.status, wwwAuth, rawBody);

          if (
            !cfg.isClusterMode &&
            bearer &&
            (response.status === 401 ||
              (response.status === 403 && wwwAuth.includes('insufficient_scope')) ||
              response.status === 429)
          ) {
            const retryAfter = Number(response.headers.get('retry-after'));
            const holdMs = retryAfter > 0 ? retryAfter * 1000 : AUTH_HOLD_MS;
            heldTokenState = { token: bearer, until: Date.now() + holdMs, message: detail };
            // Keep startup handshake alive with offline schemas so IDE/CLI stays connected while user fixes .env
            if (msg.method === 'initialize' || msg.method === 'tools/list') {
              process.stderr.write(`[launcher:${PLUGIN_NAME}] ${detail}\n`);
              answerLocalFallback(msg, detail);
              return;
            }
          }

          if (msg.method === 'tools/call') {
            writeJsonRpc({
              jsonrpc: '2.0',
              id: msg.id,
              result: { isError: true, content: [{ type: 'text', text: detail }] }
            });
          } else {
            writeJsonRpc({
              jsonrpc: '2.0',
              id: msg.id,
              error: { code: -32000, message: detail }
            });
          }
          return;
        }

        // Clear any previous hold on successful response
        if (heldTokenState && heldTokenState.token === bearer) {
          heldTokenState = null;
        }

        if (contentType.includes('text/event-stream')) {
          let dataLines = [];
          for (const sseLine of rawBody.split(/\r?\n/)) {
            if (sseLine.startsWith('data:')) {
              dataLines.push(sseLine.slice(5).trimStart());
            } else if (sseLine === '' && dataLines.length > 0) {
              const payload = dataLines.join('\n').trim();
              dataLines = [];
              if (payload) {
                try {
                  const parsed = JSON.parse(payload);
                  if (msg.method === 'initialize' && parsed?.result?.protocolVersion) {
                    negotiatedProtocolVersion = parsed.result.protocolVersion;
                  }
                  writeJsonRpc(parsed);
                } catch (e) {}
              }
            }
          }
          if (dataLines.length > 0) {
            const payload = dataLines.join('\n').trim();
            if (payload) {
              try {
                const parsed = JSON.parse(payload);
                if (msg.method === 'initialize' && parsed?.result?.protocolVersion) {
                  negotiatedProtocolVersion = parsed.result.protocolVersion;
                }
                writeJsonRpc(parsed);
              } catch (e) {}
            }
          }
        } else if (rawBody.trim()) {
          const parsed = JSON.parse(rawBody);
          if (Array.isArray(parsed)) {
            for (const item of parsed) writeJsonRpc(item);
          } else {
            if (msg.method === 'initialize' && parsed?.result?.protocolVersion) {
              negotiatedProtocolVersion = parsed.result.protocolVersion;
            }
            writeJsonRpc(parsed);
          }
        }
      } catch (err) {
        if (!isNotification) {
          const errMsg = `Cloudflare MCP transport error: ${err instanceof Error ? err.message : String(err)}`;
          if (msg.method === 'tools/call') {
            writeJsonRpc({
              jsonrpc: '2.0',
              id: msg.id,
              result: { isError: true, content: [{ type: 'text', text: errMsg }] }
            });
          } else {
            writeJsonRpc({
              jsonrpc: '2.0',
              id: msg.id,
              error: { code: -32000, message: errMsg }
            });
          }
        }
      }
    } finally {
      inFlight -= 1;
      maybeExit();
    }
  });

  rl.on('close', () => {
    stdinClosed = true;
    maybeExit();
  });
}

const targetService = process.argv[2] || 'cloudflare';
if (targetService !== 'cloudflare') {
  process.stderr.write(
    `[launcher:${PLUGIN_NAME}] Error: Unknown service '${targetService}'. Available: cloudflare\n`
  );
  process.exit(1);
}

startNativeStreamableHttpBridge();
