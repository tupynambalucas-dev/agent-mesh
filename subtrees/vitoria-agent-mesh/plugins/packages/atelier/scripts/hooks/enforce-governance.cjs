#!/usr/bin/env node

/**
 * Atelier AI Governance Enforcement Hook - PreToolUse
 * Validates 3-layer context router ceiling and zero-emoji invariant on file mutations.
 */

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

    if (process.env.MESH_ALLOW_UNSAFE_ATELIER === '1') {
      process.stdout.write(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const toolName = payload.toolCall?.name || '';
    if (['write_file', 'write_to_file', 'edit_file', 'replace_file_content', 'multi_replace_file_content'].includes(toolName)) {
      const args = payload.toolCall?.args || {};
      const filePath = args.Path || args.TargetFile || '';
      const content = args.Content || args.Replacement || args.ReplacementContent || args.CodeContent || '';

      // 1. Check for 3-layer ceiling violation
      const normalizedPath = filePath.replace(/\\/g, '/');
      const isRouterOrReadme = /(^|\/)(AGENTS\.md|README\.md)$/i.test(normalizedPath);
      const isForbiddenDir = /\/(\.agents\/(analyses|plans|reports)|(docs|references)\/(tutorials|how-to-guides|reference|explanation))\//i.test(normalizedPath);
      const isIntermediateGroupingRoot = /\/(mcp\/(servers|core)|plugins\/(packages|core))\/(AGENTS|README)\.md$/i.test(normalizedPath);

      if ((isRouterOrReadme && isForbiddenDir) || isIntermediateGroupingRoot) {
        process.stdout.write(JSON.stringify({
          decision: 'deny',
          reason: 'Bounded Context 3-Layer Ceiling: Creating AGENTS.md or boilerplate README.md files inside planning/reporting hubs, Diataxis documentation quadrants, or intermediate grouping containers (mcp/servers, mcp/core, plugins/packages, plugins/core) is strictly prohibited.'
        }));
        return;
      }

      // 2. Check for zero-emoji invariant
      if (EMOJI_REGEX.test(content)) {
        process.stdout.write(JSON.stringify({
          decision: 'deny',
          reason: 'Zero-Emoji Invariant: Emojis are strictly forbidden across all files, code comments, and documentation.'
        }));
        return;
      }
    }

    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  });
}

main();
