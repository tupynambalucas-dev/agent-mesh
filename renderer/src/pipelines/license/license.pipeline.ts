import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fillTemplate } from '../../utils/template-fill.js';
import { uploadFileContents } from '../../clients/github.js';
import type { Pipeline } from '../../schemas/pipeline.schema.js';
import type { GitHubStats } from '../../schemas/githubstats.schema.js';
import type { Config } from '../../schemas/env.schema.js';
import ProjectConfig from '../../../../project.config.js';

export const licensePipeline: Pipeline = {
  id: 'license',
  name: 'License',
  description: 'Compiles the License with dynamic project variables.',
  targets: [
    {
      name: 'License',
      templatePath: 'src/pipelines/license/license.template.md',
      outputPath: '../LICENSE.md',
      ciPath: 'LICENSE.md',
      ciBranches: ['main'],
    },
  ],
  async run(_stats: GitHubStats, config: Config, workspaceRoot: string): Promise<void> {
    console.info('Executing document rendering pipeline targets for License...');
    for (const target of this.targets) {
      console.info(`Compiling target: ${target.name}...`);

      const templateFullPath = resolve(workspaceRoot, target.templatePath);
      const templateContent = readFileSync(templateFullPath, 'utf8');

      // Just pass an empty object since we use ProjectConfig globally
      let compiledContent = fillTemplate(templateContent, {});

      for (const [key, value] of Object.entries(ProjectConfig)) {
        compiledContent = compiledContent.replace(
          new RegExp('%' + key + '%', 'g'),
          value as string,
        );
      }

      const outputFullPath = resolve(workspaceRoot, target.outputPath);
      console.info(`Writing compiled document locally to ${outputFullPath}...`);
      mkdirSync(dirname(outputFullPath), { recursive: true });
      writeFileSync(outputFullPath, compiledContent, 'utf8');

      if (config.isGitHubAction) {
        for (const branch of target.ciBranches) {
          console.info(
            `Uploading compiled target to branch [${branch}] at path "${target.ciPath}"...`,
          );
          await uploadFileContents(
            config.repositoryOwner,
            config.repositoryName,
            target.ciPath,
            compiledContent,
            branch,
            config.githubToken,
            `docs: dynamically update ${target.name.toLowerCase()}`,
          );
        }
      }
    }
  },
};

export default licensePipeline;
