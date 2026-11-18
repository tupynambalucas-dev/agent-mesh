import fs from 'node:fs';
import path from 'node:path';

const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
  process.exit(0);
}

const rootDir = process.cwd();
const reportFile = path.join(rootDir, '.git', 'LINT_REPORT.tmp');

if (fs.existsSync(reportFile)) {
  try {
    const reportContent = fs.readFileSync(reportFile, 'utf-8');
    if (fs.existsSync(commitMsgFile)) {
      const originalMsg = fs.readFileSync(commitMsgFile, 'utf-8');
      const updatedMsg = originalMsg.trim() + '\n' + reportContent;
      fs.writeFileSync(commitMsgFile, updatedMsg, 'utf-8');
      console.log('📋 [PREPARE-COMMIT-MSG] Appended lint error report to commit message.');
    }
  } catch (err) {
    console.error('⚠️ [PREPARE-COMMIT-MSG] Error appending lint report:', err);
  } finally {
    try {
      fs.unlinkSync(reportFile);
    } catch {
      // ignore cleanup error
    }
  }
}
