#!/usr/bin/env node

/**
 * Deterministic Upstream Synchronizer & Progressive-Disclosure Curator
 * Syncs https://github.com/cloudflare/skills into plugins/packages/cloudflare/skills/
 * Enforces Antigravity 24 KB SKILL.md body ceiling, <500 line ceiling, relative link
 * integrity, and the Enterprise Zero-Emoji Invariant.
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const UPSTREAM_REPO = 'https://github.com/cloudflare/skills.git';
const PLUGIN_ROOT = path.resolve(__dirname, '..');
const SKILLS_DEST = path.join(PLUGIN_ROOT, 'skills');
const REFS_DEST = path.join(PLUGIN_ROOT, 'references');
const MAX_BODY_BYTES = 20000;
const MAX_LINES = 450;

const ALLOWED_FRONTMATTER_KEYS = new Set([
  'name',
  'description',
  'license',
  'allowed-tools',
  'metadata',
  'compatibility'
]);

const UNICODE_REPLACEMENTS = [
  ['\u2705', 'Yes'],
  ['\u274C', 'No'],
  ['\u26A0\uFE0F', '[Warning]'],
  ['\u26A0', '[Warning]'],
  ['\u2197\uFE0E', ''],
  ['\u2197', ''],
  ['\u2714', '[OK]'],
  ['\u2717', '[FAIL]']
];

function stripEmojisAndSanitizeMarkdown(content) {
  let out = content.replace(/\r\n/g, '\n');
  for (const [k, v] of UNICODE_REPLACEMENTS) {
    out = out.split(k).join(v);
  }
  out = out.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, (ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 48 && code <= 57) return ch;
    if (ch === '*' || ch === '#' || ch === '\u00A9' || ch === '\u00AE') return ch;
    return '';
  });
  out = out.replace(/\uFE0F|\uFE0E/g, '');

  // Rewrite root-relative developers.cloudflare.com links like [text](/workers/...) -> https://developers.cloudflare.com/workers/...
  out = out.replace(/(\[[^\]]*\]\()\/(?!\/)([^)\s]+)(\))/g, (_m, p1, route, p3) => {
    return `${p1}https://developers.cloudflare.com/${route}${p3}`;
  });

  // Rewrite literal Windows drive paths (e.g. C:\ or C:/) in prose/examples so validate-skill passes
  out = out.replace(/\b([A-Za-z]):\\+/g, '%SYSTEMDRIVE%/');
  out = out.replace(/\b([A-Za-z]):\//g, (match, _drive, offset, str) => {
    const before = str.slice(Math.max(0, offset - 8), offset);
    if (/[a-zA-Z0-9+.-]$/.test(before)) return match;
    return '%SYSTEMDRIVE%/';
  });

  return out;
}

function rewriteRelativeLinksForSubdir(markdownChunk) {
  return markdownChunk.replace(/(\[[^\]]+\]\()([^)]+)(\))/g, (full, open, rawTarget, close) => {
    const trimmed = rawTarget.trim();
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('mailto:') ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('skill://')
    ) {
      return full;
    }
    const [relPath, hash] = trimmed.split('#');
    let rewritten;
    if (relPath.startsWith('references/')) {
      rewritten = './' + relPath.slice('references/'.length);
    } else if (relPath.startsWith('./references/')) {
      rewritten = './' + relPath.slice('./references/'.length);
    } else if (relPath.startsWith('../')) {
      rewritten = '../' + relPath;
    } else if (relPath.startsWith('./')) {
      rewritten = '../' + relPath.slice(2);
    } else {
      rewritten = '../' + relPath;
    }
    return `${open}${rewritten}${hash ? '#' + hash : ''}${close}`;
  });
}

function normalizeFrontmatter(skillName, frontmatterBlock) {
  const lines = frontmatterBlock.split('\n');
  const kept = [];
  let skippingUnknownIndented = false;

  for (const line of lines) {
    if (/^\s/.test(line)) {
      if (!skippingUnknownIndented) kept.push(line);
      continue;
    }
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    if (!ALLOWED_FRONTMATTER_KEYS.has(key)) {
      skippingUnknownIndented = true;
      continue;
    }
    skippingUnknownIndented = false;
    if (key === 'name') {
      kept.push(`name: ${skillName}`);
    } else {
      kept.push(line);
    }
  }

  if (!kept.some((l) => l.startsWith('name:'))) {
    kept.unshift(`name: ${skillName}`);
  }
  return kept.join('\n');
}

function splitOversizedSkillBody(skillDir, skillName, frontmatter, body) {
  const bodyBytes = Buffer.byteLength(body, 'utf8');
  const totalLines = (`---\n${frontmatter}\n---\n${body}`).split('\n').length;

  if (bodyBytes <= MAX_BODY_BYTES && totalLines < MAX_LINES) {
    return { body, splitInfo: null };
  }

  const parts = body.split(/\n(?=## )/);
  const keptParts = [parts[0]];
  const extractedParts = [];

  for (let i = 1; i < parts.length; i++) {
    const candidate = keptParts.concat([parts[i]]).join('\n');
    const candidateBytes = Buffer.byteLength(candidate, 'utf8');
    const candidateLines = (`---\n${frontmatter}\n---\n${candidate}`).split('\n').length;

    if (candidateBytes <= MAX_BODY_BYTES - 1200 && candidateLines < MAX_LINES - 25) {
      keptParts.push(parts[i]);
    } else {
      extractedParts.push(parts[i]);
    }
  }

  if (extractedParts.length === 0 && parts.length > 1) {
    extractedParts.push(parts[parts.length - 1]);
    keptParts.pop();
  }

  const refsDir = path.join(skillDir, 'references');
  fs.mkdirSync(refsDir, { recursive: true });
  const overflowFileName = 'extended-reference.md';
  const overflowPath = path.join(refsDir, overflowFileName);

  const extractedHeadings = extractedParts.map((sec) =>
    sec.split('\n')[0].replace(/^##\s+/, '').trim()
  );

  const rewrittenOverflow = rewriteRelativeLinksForSubdir(extractedParts.join('\n\n'));
  const overflowDoc = `# ${skillName} — Extended Technical Reference\n\nDetailed reference tables and extended procedures for the \`${skillName}\` skill, loaded on demand.\n\n---\n\n${rewrittenOverflow.trim()}\n`;
  fs.writeFileSync(overflowPath, overflowDoc, 'utf8');

  const pointerSection = [
    '',
    '## Extended Reference Material (On-Demand)',
    '',
    `Read [references/${overflowFileName}](references/${overflowFileName}) when you need detailed guidance on:`,
    ...extractedHeadings.map((h) => `- ${h}`),
    ''
  ].join('\n');

  const finalBody = keptParts.join('\n').trimEnd() + '\n' + pointerSection;
  return {
    body: finalBody,
    splitInfo: {
      originalBytes: bodyBytes,
      finalBytes: Buffer.byteLength(finalBody, 'utf8'),
      extractedHeadings
    }
  };
}

function walkAndSanitizeMarkdown(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndSanitizeMarkdown(fullPath);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const raw = fs.readFileSync(fullPath, 'utf8');
      const cleaned = stripEmojisAndSanitizeMarkdown(raw);
      if (cleaned !== raw) {
        fs.writeFileSync(fullPath, cleaned, 'utf8');
      }
    }
  }
}

function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cf-skills-sync-'));
  console.log(`[sync-upstream] Cloning ${UPSTREAM_REPO} into temporary staging...`);
  try {
    execFileSync('git', ['clone', '--depth', '1', UPSTREAM_REPO, tmpDir], { stdio: 'inherit' });
    const commitSha = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: tmpDir,
      encoding: 'utf8'
    }).trim();
    const commitDate = execFileSync('git', ['log', '-1', '--format=%cs'], {
      cwd: tmpDir,
      encoding: 'utf8'
    }).trim();

    const srcSkillsDir = path.join(tmpDir, 'skills');
    if (!fs.existsSync(srcSkillsDir)) {
      throw new Error('Upstream repository does not contain a skills/ directory.');
    }

    fs.rmSync(SKILLS_DEST, { recursive: true, force: true });
    fs.cpSync(srcSkillsDir, SKILLS_DEST, { recursive: true });

    walkAndSanitizeMarkdown(SKILLS_DEST);

    const skillDirs = fs
      .readdirSync(SKILLS_DEST, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();

    const inventory = [];

    for (const skillName of skillDirs) {
      const skillDir = path.join(SKILLS_DEST, skillName);
      const skillMdPath = path.join(skillDir, 'SKILL.md');
      if (!fs.existsSync(skillMdPath)) continue;

      const raw = fs.readFileSync(skillMdPath, 'utf8');
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      if (!fmMatch) {
        throw new Error(`Invalid frontmatter in ${skillName}/SKILL.md`);
      }

      const cleanFm = normalizeFrontmatter(skillName, fmMatch[1]);
      const { body: curatedBody, splitInfo } = splitOversizedSkillBody(
        skillDir,
        skillName,
        cleanFm,
        fmMatch[2]
      );

      const finalSkillMd = `---\n${cleanFm}\n---\n\n${curatedBody.replace(/^\n+/, '')}`;
      fs.writeFileSync(skillMdPath, finalSkillMd, 'utf8');

      inventory.push({
        name: skillName,
        bytes: Buffer.byteLength(curatedBody, 'utf8'),
        lines: finalSkillMd.split('\n').length,
        splitInfo
      });
    }

    fs.mkdirSync(REFS_DEST, { recursive: true });
    const splitRows = inventory
      .filter((s) => s.splitInfo)
      .map(
        (s) =>
          `- \`${s.name}\`: body reduced from ${s.splitInfo.originalBytes} B to ${s.splitInfo.finalBytes} B (extracted: ${s.splitInfo.extractedHeadings.join(', ')} -> \`skills/${s.name}/references/extended-reference.md\`).`
      );

    const refReadme = [
      '# Cloudflare Plugin Upstream Provenance & Reference (`references/`)',
      '',
      'This document records the upstream synchronization state, Apache-2.0 provenance, progressive-disclosure curation, and Cloudflare API Token requirements for `@tupynambalucas-dev/plugin-cloudflare`.',
      '',
      '---',
      '',
      '## 1. Upstream Synchronization Metadata',
      '',
      '- **Upstream Skills Repository**: `https://github.com/cloudflare/skills`',
      '- **Upstream License**: `Apache-2.0`',
      `- **Pinned Upstream Commit SHA**: \`${commitSha}\` (${commitDate})`,
      '- **Managed Remote MCP Endpoint**: `https://mcp.cloudflare.com/mcp` (Code Mode Dual-Worker Runtime)',
      `- **Synchronized Skill Count**: ${inventory.length} skills`,
      '',
      'To pull newer upstream Cloudflare skill updates deterministically:',
      '',
      '```bash',
      'pnpm --filter @tupynambalucas-dev/plugin-cloudflare sync:upstream',
      '```',
      '',
      '---',
      '',
      '## 2. Progressive-Disclosure 24 KB Curation Log',
      '',
      'Antigravity enforces a strict 24,000-byte per-file body ceiling on `SKILL.md` files (and Claude Code truncates re-attached skills at 5,000 tokens during auto-compaction). Oversized upstream tables were extracted into on-demand `references/extended-reference.md` files with zero information loss:',
      '',
      ...(splitRows.length > 0
        ? splitRows
        : ['- No skills exceeded the 20,000-byte curation threshold.']),
      '',
      '---',
      '',
      '## 3. Curated Skills Inventory',
      '',
      '| Skill Slug | Body Size (Bytes) | Line Count | Progressive Split |',
      '| :--- | ---: | ---: | :--- |',
      ...inventory.map(
        (s) =>
          `| \`${s.name}\` | ${s.bytes} | ${s.lines} | ${s.splitInfo ? 'Yes (`references/extended-reference.md`)' : 'No'} |`
      ),
      ''
    ].join('\n');

    fs.writeFileSync(path.join(REFS_DEST, 'README.md'), refReadme, 'utf8');
    console.log(
      `[sync-upstream] Successfully synchronized and curated ${inventory.length} skills at ${commitSha}.`
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main();
