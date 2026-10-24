#!/usr/bin/env node

/**
 * Universal Layered MCP Runner for agent-toolkit.
 * Implements deterministic 3-tier secret resolution:
 *   Layer 1: Runtime process.env (Infisical CLI session, host environment)
 *   Layer 2: Local .env hierarchy (CWD, parent directories up to Git root, agent-toolkit/.env)
 *   Layer 3: Antigravity user config (~/.gemini/config/config.json)
 */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const result = {};
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let val = match[2].trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        result[key] = val;
      }
    }
    return result;
  } catch {
    return {};
  }
}

function loadLayeredEnv() {
  const mergedEnv = { ...process.env };

  // Candidate .env paths checked hierarchically
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "..", ".env"),
    path.resolve(__dirname, "..", ".env"),
    path.resolve(__dirname, "..", "..", ".env"),
  ];

  for (const envPath of candidates) {
    const parsed = parseEnvFile(envPath);
    for (const [k, v] of Object.entries(parsed)) {
      if (!mergedEnv[k] && v) {
        mergedEnv[k] = v;
      }
    }
  }

  // Layer 3: Check ~/.gemini/config/config.json
  const homeDir = process.env.USERPROFILE || process.env.HOME || "";
  if (homeDir) {
    const configPath = path.resolve(homeDir, ".gemini", "config", "config.json");
    if (fs.existsSync(configPath)) {
      try {
        const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
        if (cfg.variables && typeof cfg.variables === "object") {
          for (const [k, v] of Object.entries(cfg.variables)) {
            if (!mergedEnv[k] && v) mergedEnv[k] = v;
          }
        }
      } catch {}
    }
  }

  return mergedEnv;
}

const target = process.argv[2];
const env = loadLayeredEnv();

switch (target) {
  case "infisical": {
    env.INFISICAL_HOST_URL = env.INFISICAL_HOST_URL || "https://app.infisical.com";
    env.INFISICAL_AUTH_METHOD = env.INFISICAL_AUTH_METHOD || "universal-auth";
    env.INFISICAL_ENVIRONMENT = env.INFISICAL_ENVIRONMENT || "dev";
    env.INFISICAL_MASK_SECRET_VALUES = env.INFISICAL_MASK_SECRET_VALUES || "false";

    const child = spawn("pnpm", ["dlx", "@infisical/mcp"], {
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("exit", (code) => process.exit(code || 0));
    break;
  }

  case "github": {
    env.GITHUB_PERSONAL_ACCESS_TOKEN =
      env.GITHUB_PERSONAL_ACCESS_TOKEN || env.GITHUB_TOKEN || "";
    env.GITHUB_TOKEN =
      env.GITHUB_TOKEN || env.GITHUB_PERSONAL_ACCESS_TOKEN || "";

    const child = spawn("pnpm", ["dlx", "github-mcp-server-js"], {
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("exit", (code) => process.exit(code || 0));
    break;
  }

  case "firecrawl": {
    const child = spawn("pnpm", ["dlx", "firecrawl-mcp"], {
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("exit", (code) => process.exit(code || 0));
    break;
  }

  case "context7": {
    const apiKey = env.CONTEXT7_API_KEY || "";
    const args = ["dlx", "@upstash/context7-mcp"];
    if (apiKey) {
      args.push("--api-key", apiKey);
    }

    const child = spawn("pnpm", args, {
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("exit", (code) => process.exit(code || 0));
    break;
  }

  default: {
    process.stderr.write(`[mcp-runner] Unknown target: ${target}\n`);
    process.exit(1);
  }
}
