#!/usr/bin/env node

/**
 * Authoritative Smart MCP Gateway Router & Failover Engine
 * Enterprise Standard for tupynambalucas.dev
 */

const http = require("http");
const https = require("https");
const { spawn } = require("child_process");

const TARGET_SERVICE = process.argv[2]; // e.g., "firecrawl", "github", "google-workspace", "memory", "appsheet", "context7", "playwright"
const GATEWAY_BASE_URL = process.env.CORTEX_GATEWAY_URL || "http://localhost:8080";
const PROBE_TIMEOUT_MS = parseInt(process.env.CORTEX_PROBE_TIMEOUT_MS || "300", 10);

/**
 * Fast non-blocking health probe on Envoy AgentGateway
 */
function probeGateway(baseUrl, timeoutMs) {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(baseUrl);
      const client = parsedUrl.protocol === "https:" ? https : http;

      const req = client.get(
        {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
          path: "/health",
          timeout: timeoutMs,
          headers: {
            "User-Agent": "cortex-mcp-smart-router/1.0.0",
          },
        },
        (res) => {
          resolve(res.statusCode >= 200 && res.statusCode < 400);
        }
      );

      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
    } catch {
      resolve(false);
    }
  });
}

/**
 * Fallback command mapping for decentralized execution
 */
const FALLBACK_REGISTRY = {
  "firecrawl": {
    pkg: "@tupynambalucas-dev/cortex-mcp-firecrawl",
    upstream: "firecrawl-mcp"
  },
  "memory": {
    pkg: "@tupynambalucas-dev/cortex-mcp-memory",
    upstream: "@modelcontextprotocol/server-memory"
  },
  "github": {
    pkg: "@tupynambalucas-dev/cortex-mcp-github",
    upstream: "github-mcp-server-js"
  },
  "google-workspace": {
    pkg: "@tupynambalucas-dev/cortex-mcp-gwork",
    upstream: "@aaronsb/google-workspace-mcp"
  },
  "appsheet": {
    pkg: "@tupynambalucas-dev/cortex-mcp-appsheet",
    upstream: null
  },
  "context7": {
    pkg: "@upstash/context7-mcp",
    upstream: "@upstash/context7-mcp"
  },
  "playwright": {
    pkg: "@playwright/mcp",
    upstream: "@modelcontextprotocol/server-playwright"
  }
};

async function main() {
  if (!TARGET_SERVICE || !FALLBACK_REGISTRY[TARGET_SERVICE]) {
    process.stderr.write(`[cortex-router] Error: Unknown target service '${TARGET_SERVICE}'.\n`);
    process.exit(1);
  }

  const isGatewayHealthy = await probeGateway(GATEWAY_BASE_URL, PROBE_TIMEOUT_MS);

  if (isGatewayHealthy) {
    // Mode A: Cloud Gateway Ingress
    process.stderr.write(`[cortex-router] AgentGateway healthy. Routing '${TARGET_SERVICE}' via ${GATEWAY_BASE_URL}/mcp\n`);

    const sseBridge = spawn("npx", [
      "-y",
      "mcp-remote",
      `${GATEWAY_BASE_URL}/mcp`
    ], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    sseBridge.on("exit", (code) => process.exit(code || 0));
  } else {
    // Mode B: Local Standalone Fallback
    const targetConfig = FALLBACK_REGISTRY[TARGET_SERVICE];
    const executable = targetConfig.pkg;

    process.stderr.write(`[cortex-router] AgentGateway offline. Engaging local fallback: pnpm dlx ${executable}\n`);

    const fallbackProcess = spawn("pnpm", [
      "dlx",
      executable
    ], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    fallbackProcess.on("exit", (code) => process.exit(code || 0));
  }
}

if (require.main === module) {
  main();
}
