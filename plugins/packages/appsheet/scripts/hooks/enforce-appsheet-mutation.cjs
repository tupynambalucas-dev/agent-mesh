#!/usr/bin/env node

/**
 * AppSheet Domain Enforcement Hook - PreToolUse
 * Validates deterministic keys and idempotency on mutate_records calls.
 */

function main() {
  let input = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { input += chunk; });
  process.stdin.on('end', () => {
    let payload = {};
    try {
      payload = JSON.parse(input);
    } catch (e) {
      process.stdout.write(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const toolName = payload.toolCall?.name || '';
    if (toolName === 'mutate_records' || toolName === 'appsheet_mutate_records') {
      const args = payload.toolCall?.args || {};
      const action = args.Action || args.action || '';
      const rows = args.Rows || args.rows || [];

      if ((action === 'Add' || action === 'Edit') && Array.isArray(rows)) {
        for (const row of rows) {
          const hasKey = Object.keys(row).some(k => /(^id$|id$)/i.test(k));
          if (!hasKey) {
            process.stdout.write(JSON.stringify({
              decision: 'ask',
              reason: 'AppSheet Domain Invariant: Mutating records without a deterministic primary key (<Entity>Id or Id) risks duplicate insertion.'
            }));
            return;
          }
        }
      }
    }

    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  });
}

main();
