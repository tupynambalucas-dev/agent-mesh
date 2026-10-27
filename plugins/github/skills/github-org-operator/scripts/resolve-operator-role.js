#!/usr/bin/env node

/**
 * resolve-operator-role.js
 * Deterministically resolves the authenticated GitHub caller identity,
 * organization team memberships, and authorized governance domains
 * for tupynambalucas-dev operator workflows.
 */

const { execSync } = require("child_process");

const targetOrg = process.argv[2] && !process.argv[2].startsWith("--") 
  ? process.argv[2] 
  : "tupynambalucas-dev";

const isJsonOutput = process.argv.includes("--json");

function runGh(args) {
  try {
    return execSync(`gh ${args}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    }).trim();
  } catch (err) {
    return null;
  }
}

// 1. Resolve authenticated user identity
const userRaw = runGh("api /user");
if (!userRaw) {
  process.stderr.write("Error: Unauthenticated. Please run 'gh auth login' or provide a valid GITHUB_TOKEN.\n");
  process.exit(1);
}

let user;
try {
  user = JSON.parse(userRaw);
} catch {
  process.stderr.write("Error: Failed to parse GitHub user response.\n");
  process.exit(1);
}

const username = user.login;
const name = user.name || user.login;

// 2. Query team memberships across the target organization
const teamsRaw = runGh("api /user/teams");
let allTeams = [];
if (teamsRaw) {
  try {
    allTeams = JSON.parse(teamsRaw);
  } catch {
    allTeams = [];
  }
}

const orgTeams = allTeams
  .filter((t) => t.organization && t.organization.login === targetOrg)
  .map((t) => t.slug);

// 3. Evaluate highest governance domain and capabilities
const teamSet = new Set(orgTeams);

const hasLeadArchitects = teamSet.has("lead-architects");
const hasSecurityManagers = teamSet.has("security-managers");
const hasInfraOps = teamSet.has("infra-ops");
const hasCoreEngineers = teamSet.has("core-engineers");
const hasTechnicalWriters = teamSet.has("technical-writers");
const hasCreativeTeam = teamSet.has("creative-team");
const hasContractors = teamSet.has("contractors");

let primaryDomain = "domain-1-developer";
let privilegeLevel = "level-1";
let infisicalProject = "tupynambalucas-dev-agent-mesh";
let infisicalEnv = "dev";

if (hasLeadArchitects) {
  primaryDomain = "domain-3-admin";
  privilegeLevel = "level-3";
  infisicalProject = "tupynambalucas-dev-platform";
  infisicalEnv = "prod";
} else if (hasSecurityManagers) {
  primaryDomain = "domain-2-security";
  privilegeLevel = "level-2";
  infisicalProject = "tupynambalucas-dev-agent-mesh";
  infisicalEnv = "dev";
} else if (hasInfraOps) {
  primaryDomain = "domain-2-security";
  privilegeLevel = "level-2";
  infisicalProject = "tupynambalucas-dev-platform";
  infisicalEnv = "staging";
}

const capabilities = {
  developerOperations: true,
  securityAuditing: privilegeLevel === "level-2" || privilegeLevel === "level-3",
  organizationAdmin: privilegeLevel === "level-3",
};

// 4. Output results
if (isJsonOutput) {
  const result = {
    organization: targetOrg,
    username,
    name,
    teams: orgTeams,
    governanceDomain: primaryDomain,
    privilegeLevel,
    infisicalProject,
    infisicalEnvironment: infisicalEnv,
    capabilities,
  };
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
} else {
  process.stdout.write("Caller Identity Verification:\n");
  process.stdout.write(`  User:                ${username} (${name})\n`);
  process.stdout.write(`  Organization:        ${targetOrg}\n`);
  process.stdout.write(`  Teams:               ${orgTeams.join(", ") || "none"}\n`);
  process.stdout.write(`  Governance Domain:   ${primaryDomain}\n`);
  process.stdout.write(`  Privilege Level:     ${privilegeLevel}\n`);
  process.stdout.write(`  Infisical Target:    ${infisicalProject} [${infisicalEnv}]\n\n`);

  process.stdout.write("Permitted Operations:\n");
  process.stdout.write("  [x] Domain 1: Developer Operations (PRs, signed commits, submodule bumps)\n");

  if (capabilities.securityAuditing) {
    process.stdout.write("  [x] Domain 2: Security & Auditing (Secret scanning, Dependabot triage, signature verification)\n");
  } else {
    process.stdout.write("  [ ] Domain 2: Security & Auditing (Blocked: Requires security-managers or lead-architects)\n");
  }

  if (capabilities.organizationAdmin) {
    process.stdout.write("  [x] Domain 3: Organization Admin (Team provisioning, RBAC binding, branch rulesets, org secrets)\n");
  } else {
    process.stdout.write("  [ ] Domain 3: Organization Admin (Blocked: Restricted strictly to lead-architects)\n");
  }
}
