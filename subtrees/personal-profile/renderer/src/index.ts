import { getGitHubStats } from './clients/github.js';
import { ConfigSchema } from './schemas/env.schema.js';
import { config as rawConfig } from './config/env.config.js';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve, join, basename } from 'path';
import { readdirSync } from 'fs';
import type { Pipeline } from './schemas/pipeline.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workspaceRoot = resolve(__dirname, '..');

async function main(): Promise<void> {
  try {
    const config = ConfigSchema.parse(rawConfig);

    console.info('Starting Renderer Document Generator...');

    const stats = await getGitHubStats({
      token: config.githubToken,
      maxRetries: config.maxRetries,
    });

    console.info('Scanning and loading active pipelines...');
    const pipelinesDir = resolve(workspaceRoot, 'src/pipelines');

    const scanPipelines = (dir: string): string[] => {
      const results: string[] = [];
      const list = readdirSync(dir, { withFileTypes: true });
      for (const entry of list) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          results.push(...scanPipelines(fullPath));
        } else if (
          entry.isFile() &&
          (entry.name.endsWith('.pipeline.ts') || entry.name.endsWith('.pipeline.js'))
        ) {
          results.push(fullPath);
        }
      }
      return results;
    };

    const pipelineFiles = scanPipelines(pipelinesDir);

    let executedCount = 0;
    for (const pipelinePath of pipelineFiles) {
      const filename = basename(pipelinePath);
      const moduleUrl = pathToFileURL(pipelinePath).href;

      console.info(`Loading pipeline from ${filename}...`);
      const module = (await import(moduleUrl)) as { default: Pipeline | undefined };
      const pipeline = module.default;

      if (pipeline && typeof pipeline.run === 'function') {
        // Dynamically override target branches in CI/CD based on the resolved targetBranch
        if (config.isGitHubAction) {
          for (const target of pipeline.targets) {
            target.ciBranches = [config.targetBranch];
          }
        }

        console.info(`\n--- Running Pipeline: ${pipeline.name} (${pipeline.id}) ---`);
        await pipeline.run(stats, config, workspaceRoot);
        executedCount++;
      } else {
        console.warn(
          `[Pipeline Loader] Warning: File ${filename} does not export a valid Pipeline object as default export.`,
        );
      }
    }

    console.info(`\nCompleted processing. Total executed pipelines: ${executedCount}`);
  } catch (error) {
    console.error('Fatal error during document generation:', error);
    process.exit(1);
  }
}

void main();
