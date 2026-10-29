#!/usr/bin/env node

/**
 * Authoritative Smart MCP Gateway Router & Failover Engine
 * Enterprise Standard for tupynambalucas.dev
 */

const http = require("http");
const https = require("https");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

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
            "User-Agent": "mesh-mcp-smart-router/1.0.0",
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
    pkg: "@tupynambalucas-dev/mcp-firecrawl",
    upstream: "firecrawl-mcp"
  },
  "memory": {
    pkg: "@tupynambalucas-dev/mcp-memory",
    upstream: "@modelcontextprotocol/server-memory"
  },
  "github": {
    pkg: "@tupynambalucas-dev/mcp-github",
    upstream: "github-mcp-server-js"
  },
  "gwork": {
    pkg: "@tupynambalucas-dev/mcp-gwork",
    upstream: "@aaronsb/google-workspace-mcp"
  },
  "google-workspace": {
    pkg: "@tupynambalucas-dev/mcp-gwork",
    upstream: "@aaronsb/google-workspace-mcp"
  },
  "appsheet": {
    pkg: "@tupynambalucas-dev/mcp-appsheet",
    upstream: null
  },
  "infisical": {
    pkg: "@tupynambalucas-dev/mcp-infisical",
    upstream: "@infisical/mcp"
  },
  "context7": {
    pkg: "@upstash/context7-mcp",
    upstream: "@upstash/context7-mcp"
  },
  "playwright": {
    pkg: "@tupynambalucas-dev/mcp-playwright",
    upstream: "@playwright/mcp"
  }
};

async function main() {
  if (!TARGET_SERVICE || !FALLBACK_REGISTRY[TARGET_SERVICE]) {
    process.stderr.write(`[mesh-router] Error: Unknown target service '${TARGET_SERVICE}'.\n`);
    process.exit(1);
  }

  const isGatewayHealthy = await probeGateway(GATEWAY_BASE_URL, PROBE_TIMEOUT_MS);

  if (isGatewayHealthy) {
    // Mode A: Cloud Gateway Ingress
    process.stderr.write(`[mesh-router] AgentGateway healthy. Routing '${TARGET_SERVICE}' via ${GATEWAY_BASE_URL}/mcp\n`);

    const sseBridge = spawn("npx", [
      "-y",
      "mcp-remote",
      `${GATEWAY_BASE_URL}/mcp`
    ], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    sseBridge.on("exit", (code) => process.exit(code || 0));
    return;
  }

  // Mode B: Local Standalone Fallback
  // Check if running inside agent-mesh repository with local package available
  let localMcpDir = path.resolve(__dirname, "..", "mcp", "packages", TARGET_SERVICE);
  if (!fs.existsSync(localMcpDir)) {
    localMcpDir = path.resolve(__dirname, "..", "mcp", TARGET_SERVICE);
  }
  const localJsBin = path.join(localMcpDir, "dist", "bin.js");
  const localTsBin = path.join(localMcpDir, "src", "bin.ts");
  const forwardedArgs = process.argv.slice(3);

  if (fs.existsSync(localJsBin)) {
    process.stderr.write(`[mesh-router] AgentGateway offline. Engaging local compiled binary: node ${localJsBin} ${forwardedArgs.join(" ")}\n`);
    const localProcess = spawn("node", [localJsBin, ...forwardedArgs], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    localProcess.on("exit", (code) => process.exit(code || 0));
    return;
  }

  if (fs.existsSync(localTsBin)) {
    process.stderr.write(`[mesh-router] AgentGateway offline. Engaging local TypeScript execution: npx tsx ${localTsBin} ${forwardedArgs.join(" ")}\n`);
    const localProcess = spawn("npx", ["-y", "tsx", localTsBin, ...forwardedArgs], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    localProcess.on("exit", (code) => process.exit(code || 0));
    return;
  }

  // Registry package execution via pnpm dlx
  const targetConfig = FALLBACK_REGISTRY[TARGET_SERVICE];
  const executable = targetConfig.pkg;

  process.stderr.write(`[mesh-router] AgentGateway offline. Engaging registry package fallback: pnpm dlx ${executable} ${forwardedArgs.join(" ")}\n`);

  const fallbackProcess = spawn("pnpm", [
    "dlx",
    executable,
    ...forwardedArgs
  ], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  fallbackProcess.on("exit", (code) => process.exit(code || 0));
}

if (require.main === module) {
  main();
}
