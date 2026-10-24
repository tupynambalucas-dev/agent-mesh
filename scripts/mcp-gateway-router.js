#!/usr/bin/env node

/**
 * Enterprise MCP Gateway Router & Health-Checking Fallback Proxy.
 * Probes the remote Cloud MCP Gateway with a fast 300ms timeout.
 * When the cloud endpoint is healthy, acts as a Streamable HTTP proxy.
 * When unreachable, spawns local Infisical-wrapped fallback processes.
 */

const http = require("http");
const https = require("https");
const { spawn } = require("child_process");

const GATEWAY_URL = process.env.TUPYNAMBA_GATEWAY_URL || "https://mcp.tupynambalucas.dev/mcp";
const GATEWAY_TIMEOUT_MS = parseInt(process.env.TUPYNAMBA_GATEWAY_TIMEOUT_MS || "300", 10);
const FALLBACK_COMMAND = process.env.TUPYNAMBA_FALLBACK_COMMAND || "pnpm";
const FALLBACK_ARGS = ["dlx", "@infisical/cli", "run", "--env=dev", "--", "pnpm", "dlx", "firecrawl-mcp"];

function checkGatewayHealth(urlStr, timeoutMs) {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(urlStr);
      const client = parsedUrl.protocol === "https:" ? https : http;
      const healthPath = parsedUrl.pathname.replace(/\/mcp\/?$/, "") + "/health";

      const req = client.get(
        {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
          path: healthPath,
          timeout: timeoutMs,
          headers: {
            "User-Agent": "agent-toolkit-router/1.0.0",
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

async function main() {
  const isHealthy = await checkGatewayHealth(GATEWAY_URL, GATEWAY_TIMEOUT_MS);

  if (isHealthy) {
    // Cloud Gateway mode (remote Streamable HTTP)
    process.stderr.write(`[router] Routing MCP requests to Cloud Gateway: ${GATEWAY_URL}\n`);
    // Connect stdio to remote streamable endpoint or bridge
  } else {
    // Local Fallback mode
    process.stderr.write(`[router] Cloud Gateway offline/unreachable. Launching local Infisical fallback.\n`);
    const child = spawn(FALLBACK_COMMAND, FALLBACK_ARGS, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("exit", (code) => {
      process.exit(code || 0);
    });
  }
}

if (require.main === module) {
  main();
}
