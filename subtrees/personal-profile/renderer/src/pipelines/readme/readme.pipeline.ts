import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { brandColors } from '@profile/assets/tokens';
import { fillTemplate } from '../../utils/template-fill.js';
import { renderStatsCards } from '../../renderers/stats-card.js';
import { uploadFileContents } from '../../clients/github.js';
import type { Pipeline } from '../../schemas/pipeline.schema.js';
import type { GitHubStats } from '../../schemas/githubstats.schema.js';
import type { Config } from '../../schemas/env.schema.js';
import ProjectConfig from '../../../../project.config.js';

export const readmePipeline: Pipeline = {
  id: 'readme',
  name: 'Root README',
  description: 'Compiles the main README and its respective statistics cards.',
  targets: [
    {
      name: 'Root Profile README',
      templatePath: 'src/pipelines/readme/readme.template.md',
      outputPath: '../README.md',
      ciPath: 'README.md',
      ciBranches: ['main'],
    },
  ],
  async run(stats: GitHubStats, config: Config, workspaceRoot: string): Promise<void> {
    // 1. Resolve asset paths from the studio-assets package
    const overviewTemplatePath = fileURLToPath(
      import.meta.resolve('@profile/assets/renderer/github/cards/stats/overview.template.svg'),
    );
    const languagesTemplatePath = fileURLToPath(
      import.meta.resolve('@profile/assets/renderer/github/cards/stats/languages.template.svg'),
    );
    const logoHorizontalSrcPath = fileURLToPath(
      import.meta.resolve('@profile/assets/logos/logo-horizontal-multicolor.svg'),
    );
    const logoMarkSrcPath = fileURLToPath(
      import.meta.resolve('@profile/assets/logos/logo-mark-round-purple.svg'),
    );

    // 2. Generate Stats Cards (Returns SVG strings instead of writing to disk)
    console.info('Generating SVG stats cards...');
    const { overviewSvg, languagesSvg } = renderStatsCards({
      stats,
      config,
      defaultOverviewTemplatePath: overviewTemplatePath,
      defaultLanguagesTemplatePath: languagesTemplatePath,
    });

    // 3. Load Static Logo SVGs
    console.info('Reading static logos from assets...');
    const logoSvgContent = readFileSync(logoHorizontalSrcPath, 'utf8');
    const logoMarkSvgContent = readFileSync(logoMarkSrcPath, 'utf8');

    const totalContributions =
      stats.repo_contributions +
      stats.issue_contributions +
      stats.commit_contributions +
      stats.pr_contributions +
      stats.review_contributions;

    const totalStars = stats.repositories.reduce((acc, r) => acc + r.stars, 0);
    const totalForks = stats.repositories.reduce((acc, r) => acc + r.forks, 0);
    const totalLinesChanged = stats.repositories.reduce((acc, r) => acc + r.lines_changed, 0);
    const totalViews = stats.repositories.reduce((acc, r) => acc + r.views, 0);

    const assetsBaseUrl = `https://raw.githubusercontent.com/${config.repositoryOwner}/${config.repositoryName}/generated/cards`;
    const urlSuffix = '?raw=true';

    // Logo image tags
    const logoImage = `<img alt="Tupynambá Lucas" src="${assetsBaseUrl}/static/logo-horizontal.svg${urlSuffix}" width="340px" />`;
    const logoMarkImage = `<img alt="${ProjectConfig.PROJECT_DISPLAY_NAME}" src="${assetsBaseUrl}/static/logo-mark.svg${urlSuffix}" width="68px" />`;
    const headerImage = logoImage;

    const overviewImages = `<picture>
    <source media="(prefers-color-scheme: dark)" srcset="${assetsBaseUrl}/stats/overview.svg${urlSuffix}#gh-dark-mode-only" />
    <source media="(prefers-color-scheme: light)" srcset="${assetsBaseUrl}/stats/overview.svg${urlSuffix}" />
    <img alt="${stats.name}'s GitHub Stats" src="${assetsBaseUrl}/stats/overview.svg${urlSuffix}" height="200px" />
  </picture>`;

    const languagesImages = `<picture>
    <source media="(prefers-color-scheme: dark)" srcset="${assetsBaseUrl}/stats/languages.svg${urlSuffix}#gh-dark-mode-only" />
    <source media="(prefers-color-scheme: light)" srcset="${assetsBaseUrl}/stats/languages.svg${urlSuffix}" />
    <img alt="Languages Used" src="${assetsBaseUrl}/stats/languages.svg${urlSuffix}" height="200px" />
  </picture>`;

    const readmeData = {
      name: stats.name,
      user: stats.user,
      contributions: totalContributions,
      stars: totalStars,
      forks: totalForks,
      lines_changed: totalLinesChanged,
      views: totalViews,
      repos: stats.repositories.length,
      assetsBaseUrl,
      urlSuffix,
      logoImage,
      logoMarkImage,
      headerImage,
      overviewImages,
      languagesImages,
      colors: {
        brandPurple: brandColors.identity.brandPurple,
        brandBlue: brandColors.identity.brandBlue,
        brandViolet: brandColors.identity.brandViolet,
        baseLight: brandColors.surface.baseLight,
        baseDark: brandColors.surface.baseDark,
        borderLight: brandColors.neutral.borderLight,
        borderDark: brandColors.neutral.borderDark,
        accent: brandColors.feedback.accent,
        success: brandColors.feedback.success,
        error: brandColors.feedback.error,
        titleLight: brandColors.typography.titles.light,
        titleDark: brandColors.typography.titles.dark,
        subtitleLight: brandColors.typography.subtitles.light,
        subtitleDark: brandColors.typography.subtitles.dark,
        paragraphLight: brandColors.typography.paragraphs.light,
        paragraphDark: brandColors.typography.paragraphs.dark,
      },
    };

    console.info('Executing document rendering pipeline targets...');
    for (const target of this.targets) {
      console.info(`Compiling target: ${target.name}...`);

      const templateFullPath = resolve(workspaceRoot, target.templatePath);
      const templateContent = readFileSync(templateFullPath, 'utf8');
      let compiledContent = fillTemplate(templateContent, readmeData);

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

    // Save generated cards locally to generated/cards
    const generatedCardsDir = resolve(workspaceRoot, '../generated/cards');
    mkdirSync(resolve(generatedCardsDir, 'stats'), { recursive: true });
    mkdirSync(resolve(generatedCardsDir, 'static'), { recursive: true });
    writeFileSync(resolve(generatedCardsDir, 'stats/overview.svg'), overviewSvg, 'utf8');
    writeFileSync(resolve(generatedCardsDir, 'stats/languages.svg'), languagesSvg, 'utf8');
    writeFileSync(resolve(generatedCardsDir, 'static/logo-horizontal.svg'), logoSvgContent, 'utf8');
    writeFileSync(resolve(generatedCardsDir, 'static/logo-mark.svg'), logoMarkSvgContent, 'utf8');
    console.info(`Saved generated cards locally to ${generatedCardsDir}`);

    if (config.isGitHubAction) {
      console.info('\nUploading assets to GitHub...');
      console.info('Uploading SVGs to "generated" branch...');
      try {
        await uploadFileContents(
          config.repositoryOwner,
          config.repositoryName,
          'cards/stats/overview.svg',
          overviewSvg,
          'generated',
          config.githubToken,
          'chore: update overview stats',
        );
        await uploadFileContents(
          config.repositoryOwner,
          config.repositoryName,
          'cards/stats/languages.svg',
          languagesSvg,
          'generated',
          config.githubToken,
          'chore: update languages stats',
        );
        await uploadFileContents(
          config.repositoryOwner,
          config.repositoryName,
          'cards/static/logo-horizontal.svg',
          logoSvgContent,
          'generated',
          config.githubToken,
          'chore: update static horizontal logo',
        );
        await uploadFileContents(
          config.repositoryOwner,
          config.repositoryName,
          'cards/static/logo-mark.svg',
          logoMarkSvgContent,
          'generated',
          config.githubToken,
          'chore: update static logo mark',
        );
        console.info('GitHub Profile successfully generated and assets synced to all branches!');
      } catch (uploadError) {
        console.warn('Warning: Failed to upload assets to GitHub branch "generated":', uploadError);
      }
    } else {
      console.info('Local execution completed: assets generated and saved to disk.');
    }
  },
};

export default readmePipeline;
