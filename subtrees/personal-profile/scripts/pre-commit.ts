import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const gitDir = path.join(rootDir, '.git');
const reportFile = path.join(gitDir, 'LINT_REPORT.tmp');

// Clean up previous temporary report
if (fs.existsSync(reportFile)) {
  try {
    fs.unlinkSync(reportFile);
  } catch {
    // ignore cleanup error
  }
}

console.log('🔍 [PRE-COMMIT] Executing lint-staged (non-blocking)...');
const result = spawnSync('pnpm', ['exec', 'lint-staged', '--no-stash'], {
  encoding: 'utf-8',
  shell: true,
  env: process.env,
});

const rawOutput = (result.stdout || '') + '\n' + (result.stderr || '');
const cleanOutput = rawOutput.replace(/\u001b\[\d+m/g, '').replace(/\r\n/g, '\n');

if (result.status !== 0 || cleanOutput.includes('✖') || cleanOutput.includes('error')) {
  const lines = cleanOutput.split('\n');
  const errorStartIndex = lines.findIndex(
    (line) => line.includes('✖ eslint') || line.includes('error'),
  );

  let lintDetails = cleanOutput.trim();
  if (errorStartIndex !== -1) {
    lintDetails = lines.slice(errorStartIndex).join('\n').trim();
  }

  // Normalize absolute paths to relative paths for clean message
  const rootEscaped = rootDir.replace(/\\/g, '\\\\');
  lintDetails = lintDetails.replace(new RegExp(rootEscaped + '[\\\\/]', 'gi'), '');

  const formattedReport = `

[LINT WARNINGS & ERRORS]
Pre-commit linting identified the following issues in staged files:

${lintDetails}
`;

  fs.writeFileSync(reportFile, formattedReport, 'utf-8');
  console.warn('\n⚠️ [PRE-COMMIT] Linting issues detected.');
  console.warn(
    '⚠️ [PRE-COMMIT] Non-blocking mode enabled: commit will proceed with lint report attached.\n',
  );
} else {
  console.log('✅ [PRE-COMMIT] All staged files passed linting.');
}

process.exit(0);
