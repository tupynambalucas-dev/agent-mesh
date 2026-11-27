#!/usr/bin/env node

/**
 * Deterministic Architectural Plan Suite Validator
 * Part of @tupynambalucas-dev/plugin-atelier (plan-architect)
 *
 * Usage:
 *   node scripts/validate-plan.cjs <plan-dir> [--state pending|completed|superseded] [--brain <brain-dir>]
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const EMOJI_REGEX =
  /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;

function parseArgs(argv) {
  const args = argv.slice(2);
  let planDir = null;
  let state = null;
  let brainDir = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--state' && args[i + 1]) {
      state = args[++i];
    } else if (args[i] === '--brain' && args[i + 1]) {
      brainDir = args[++i];
    } else if (!args[i].startsWith('--') && !planDir) {
      planDir = args[i];
    }
  }
  return { planDir, state, brainDir };
}

function sha256File(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function main() {
  const { planDir, state: explicitState, brainDir } = parseArgs(process.argv);
  if (!planDir) {
    console.error(
      'Usage: node scripts/validate-plan.cjs <plan-dir> [--state pending|completed|superseded] [--brain <brain-dir>]'
    );
    process.exit(1);
  }

  const resolvedPlanDir = path.resolve(planDir);
  if (!fs.existsSync(resolvedPlanDir) || !fs.statSync(resolvedPlanDir).isDirectory()) {
    console.error(`[FAIL] Plan directory does not exist: ${resolvedPlanDir}`);
    process.exit(1);
  }

  const errors = [];
  const normalizedPath = resolvedPlanDir.replace(/\\/g, '/');
  const lifecycleMatch = normalizedPath.match(/\/\.agents\/plans\/(pending|completed|superseded)\/([^/]+)$/);

  if (!lifecycleMatch) {
    errors.push(
      `Plan directory must follow <target-repo>/.agents/plans/{pending,completed,superseded}/<plan-slug>/ (got: ${normalizedPath})`
    );
  }

  const inferredState = explicitState || (lifecycleMatch ? lifecycleMatch[1] : 'pending');
  const slug = lifecycleMatch ? lifecycleMatch[2] : path.basename(resolvedPlanDir);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.push(`Plan slug must be strict kebab-case: '${slug}'`);
  }

  const entries = fs.readdirSync(resolvedPlanDir, { withFileTypes: true });
  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)
    .sort();

  // Check forbidden AGENTS.md
  for (const e of entries) {
    if (e.name.toUpperCase() === 'AGENTS.MD') {
      errors.push('Forbidden Layer 4+ AGENTS.md detected inside plan suite directory.');
    }
  }

  // Required files for pending and completed suites
  if (inferredState === 'pending' || inferredState === 'completed') {
    const requiredFiles = ['README.md', 'roadmap.md', 'manual-actions.md'];
    if (inferredState === 'completed') {
      requiredFiles.push('report.md');
    }
    for (const req of requiredFiles) {
      if (!mdFiles.includes(req)) {
        errors.push(`Missing required suite artifact for state '${inferredState}': ${req}`);
      }
    }
    const hasOrderedSpec = mdFiles.some((f) => /^\d{2}-.+\.md$/.test(f));
    if (!hasOrderedSpec) {
      errors.push("Suite must include at least one ordered technical specification ('01-*.md').");
    }
  }

  // Validate content invariants on all markdown files
  for (const fileName of mdFiles) {
    const fullPath = path.join(resolvedPlanDir, fileName);
    const content = fs.readFileSync(fullPath, 'utf8');

    if (EMOJI_REGEX.test(content)) {
      errors.push(`Zero-Emoji violation detected in ${fileName}`);
    }
    if (content.includes('file:///')) {
      errors.push(`Forbidden absolute 'file:///' link detected in ${fileName}`);
    }

    const linkRegex = /\[[^\]]+\]\((\.\.?\/[^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const targetRel = match[1].split('#')[0];
      if (!targetRel) continue;
      const targetAbs = path.resolve(resolvedPlanDir, targetRel);
      if (!fs.existsSync(targetAbs)) {
        errors.push(`Broken relative link in ${fileName}: '${match[1]}'`);
      }
    }
  }

  // Verify roadmap completion if state is completed
  if (inferredState === 'completed' && mdFiles.includes('roadmap.md')) {
    const roadmapTxt = fs.readFileSync(path.join(resolvedPlanDir, 'roadmap.md'), 'utf8');
    const unchecked = (roadmapTxt.match(/^\s*-\s*\[\s\]/gm) || []).length;
    if (unchecked > 0) {
      errors.push(`Completed plan still contains ${unchecked} unchecked item(s) in roadmap.md.`);
    }
  }

  // Dual-Storage SHA-256 parity check when --brain is provided
  if (brainDir) {
    const resolvedBrainDir = path.resolve(brainDir);
    if (!fs.existsSync(resolvedBrainDir)) {
      errors.push(`Dual-Storage brain mirror directory does not exist: ${resolvedBrainDir}`);
    } else {
      for (const fileName of mdFiles) {
        const repoPath = path.join(resolvedPlanDir, fileName);
        const brainPath = path.join(resolvedBrainDir, fileName);
        if (!fs.existsSync(brainPath)) {
          errors.push(`Missing Dual-Storage mirror file: ${brainPath}`);
        } else if (sha256File(repoPath) !== sha256File(brainPath)) {
          errors.push(`Dual-Storage SHA-256 mismatch for ${fileName}`);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`[FAIL] Plan suite validation failed (${errors.length} issue(s)):`);
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(
    `[OK] Plan suite '${slug}' (${inferredState}) passed validation (${mdFiles.length} markdown artifacts, zero errors).`
  );
}

main();
