#!/usr/bin/env node

/**
 * GitHub Flow Domain Enforcement Hook - PreToolUse
 * Validates git commit signing (-S), Conventional Commits, zero-emoji, and branch protection.
 */

// Common emoji unicode ranges
const EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;

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

    if (process.env.MESH_ALLOW_UNSAFE_GIT === '1') {
      process.stdout.write(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const toolName = payload.toolCall?.name || '';
    if (toolName === 'run_command') {
      const cmd = payload.toolCall?.args?.CommandLine || '';

      // 1. Direct pushes to main or master
      if (/git\s+push\s+(?:--\S+\s+)*(?:origin\s+)?\b(main|master)\b/.test(cmd)) {
        process.stdout.write(JSON.stringify({
          decision: 'deny',
          reason: 'GitHub Flow Invariant: Direct pushes to main/master are strictly blocked. Push to a feature branch and open a PR.'
        }));
        return;
      }

      // 2. Commit signing check
      if (/git\s+commit\b/.test(cmd)) {
        if (!/(-S|--gpg-sign)\b/.test(cmd)) {
          process.stdout.write(JSON.stringify({
            decision: 'ask',
            reason: 'Cryptographic Signature Invariant: All git commits must be signed with -S (e.g. git commit -S -m "...").'
          }));
          return;
        }

        // 3. Emoji invariant in commit messages
        if (EMOJI_REGEX.test(cmd)) {
          process.stdout.write(JSON.stringify({
            decision: 'deny',
            reason: 'Zero-Emoji Invariant: Emojis are strictly forbidden across commit messages, PRs, and documentation.'
          }));
          return;
        }
      }

      // 4. Release Engineering: tag creation must be signed and annotated
      if (/git\s+tag\b/.test(cmd) && !/\s-(?:d|l|v)\b|--(?:delete|list|verify)\b/.test(cmd)) {
        if (!/\s(-s|--sign)\b/.test(cmd) || !/\s(-a|--annotate)\b|\s-sa\b/.test(cmd)) {
          process.stdout.write(JSON.stringify({
            decision: 'deny',
            reason: 'Release Invariant: tags must be signed and annotated (git tag -s -a vX.Y.Z -m "release: vX.Y.Z").'
          }));
          return;
        }
      }

      // 5. Release Engineering: deleting or force-moving release tags is prohibited
      if (/git\s+tag\s+(?:-\S+\s+)*(?:-d|--delete)\b/.test(cmd) && /\bv\d/.test(cmd)) {
        process.stdout.write(JSON.stringify({
          decision: 'deny',
          reason: 'Release Invariant: production tags are immutable. Roll forward with the next PATCH instead of deleting or moving a tag.'
        }));
        return;
      }

      // 6. Release Engineering: pushing version tags and mutating releases require human confirmation
      if (/git\s+push\b[^\n]*(?:\bv\d+\.\d+\.\d+\S*|--tags\b)/.test(cmd)) {
        process.stdout.write(JSON.stringify({
          decision: 'ask',
          reason: 'Release Confirmation Gate: pushing a version tag triggers production publication. Confirm version, commit range, and changelog first.'
        }));
        return;
      }
      if (/gh\s+release\s+(?:create|edit|delete|upload)\b/.test(cmd)) {
        process.stdout.write(JSON.stringify({
          decision: 'ask',
          reason: 'Release Confirmation Gate: creating, editing, deleting, or uploading to a GitHub Release is production-impacting. Confirm before proceeding.'
        }));
        return;
      }
    }

    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  });
}

main();
