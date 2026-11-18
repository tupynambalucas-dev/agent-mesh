#!/usr/bin/env node

/**
 * LinkedIn Domain Enforcement Hook - PreToolUse
 * Enforces Zero-Accidental-Submission Invariant and explicit human-in-the-loop confirmation
 * on high-impact state-mutating actions (job applications, connection requests, and messages).
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

    const toolCall = payload.toolCall || {};
    const toolName = toolCall.name || '';
    const args = toolCall.args || {};

    let targetAction = toolName;
    let actionArgs = args;

    // Support nested call_mcp_tool framing
    if (toolName === 'call_mcp_tool') {
      targetAction = args.ToolName || '';
      actionArgs = args.Arguments || {};
    }

    // 1. Easy Apply Submission Gate
    if (targetAction === 'submit_easy_apply') {
      if (actionArgs.confirm_submit !== true) {
        process.stdout.write(JSON.stringify({
          decision: 'ask',
          reason: 'Zero-Accidental-Submission Invariant: Submitting a job application to LinkedIn requires explicit user confirmation. Please verify the application diff, attached resume, and answers before confirming.'
        }));
        return;
      }
    }

    // 2. Connection Request & Outreach Gate
    if (targetAction === 'connect_with_person') {
      if (actionArgs.confirm_send !== true) {
        process.stdout.write(JSON.stringify({
          decision: 'ask',
          reason: 'Zero-Accidental-Submission Invariant: Sending a connection request on LinkedIn requires explicit user approval. Review the recipient and invitation note.'
        }));
        return;
      }
    }

    // 3. Direct Message & Reply Gate
    if (targetAction === 'send_message' || targetAction === 'reply_to_conversation') {
      if (actionArgs.confirm_send !== true) {
        process.stdout.write(JSON.stringify({
          decision: 'ask',
          reason: 'Zero-Accidental-Submission Invariant: Sending a message on LinkedIn requires explicit user approval. Review the draft message and recipient.'
        }));
        return;
      }
    }

    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  });
}

main();
