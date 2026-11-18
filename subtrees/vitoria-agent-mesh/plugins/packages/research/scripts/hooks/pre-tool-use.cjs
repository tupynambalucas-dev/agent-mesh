#!/usr/bin/env node

/**
 * Research Domain Enforcement Hook - PreToolUse
 * Intercepts search_web and read_url_content to enforce Firecrawl / Context7 usage.
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

    if (process.env.MESH_ALLOW_NATIVE_WEB === '1') {
      process.stdout.write(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const toolName = payload.toolCall?.name || '';
    if (toolName === 'search_web' || toolName === 'read_url_content') {
      // During initial rollout week, use 'ask' with descriptive guidance
      const output = {
        decision: 'ask',
        reason: `Rule 0 Mandatory Directive: External web research must use research_firecrawl (search, scrape, crawl) or research_context7 (resolve-library-id, query-docs) to cite canonical sources. Proceed only if Firecrawl/Context7 are unavailable, or set MESH_ALLOW_NATIVE_WEB=1.`
      };
      process.stdout.write(JSON.stringify(output));
      return;
    }

    if (toolName === 'scrape' || toolName === 'research_firecrawl_scrape') {
      const args = payload.toolCall?.args || {};
      if (args.onlyMainContent === undefined) {
        process.stdout.write(JSON.stringify({
          decision: 'allow',
          overwrite: { onlyMainContent: true }
        }));
        return;
      }
    }

    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  });
}

main();
