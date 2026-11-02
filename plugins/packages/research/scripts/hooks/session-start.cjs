#!/usr/bin/env node

/**
 * Research Domain Enforcement Hook - SessionStart
 * Injects guidance reminding the agent of Rule 0: Autonomous Research Mandate.
 */

const fs = require('fs');

function main() {
  let input = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { input += chunk; });
  process.stdin.on('end', () => {
    const output = {
      injectSteps: [
        {
          systemMessage: {
            systemMessage: "Domain Mandate Active (research): For external documentation, API syntax, or web lookups, autonomously use research_context7 (resolve-library-id, query-docs) or research_firecrawl (search, scrape, crawl). Cite canonical source URLs."
          }
        }
      ]
    };
    process.stdout.write(JSON.stringify(output));
  });
}

main();
