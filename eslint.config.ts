import path from 'node:path';
import { fileURLToPath } from 'node:url';

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintReact from '@eslint-react/eslint-plugin';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as mdx from 'eslint-plugin-mdx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // ========================================================================
  // 1. GLOBAL CONFIGURATION - Base for the entire repository
  // ========================================================================
  {
    name: 'monorepo/global-typescript-config',
    files: ['**/*.{js,mjs,ts,tsx}'],
    ignores: ['**/*.md/**', '**/*.mdx/**'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['vite.config.ts', 'vitest.config.ts'],
          noWarnOnMultipleProjects: true,
        },
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      'import-x': eslintPluginImportX,
    },
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['tsconfig.json', 'renderer/tsconfig.json', 'assets/tsconfig.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import-x/ignore': [
        '.css$',
        '.scss$',
        '.sass$',
        '.less$',
        '.styl$',
        '.module.(css|scss|sass|less|styl)$',
      ],
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/naming-convention': 'off',

      'import-x/no-duplicates': 'warn',
      'import-x/no-unresolved': [
        'error',
        {
          ignore: [
            '.css$',
            '.scss$',
            '.sass$',
            '.less$',
            '.styl$',
            '.module.(css|scss|sass|less|styl)$',
          ],
        },
      ],
      'import-x/order': 'off',
      'import-x/newline-after-import': 'off',
      'import-x/first': 'off',
      'import-x/no-default-export': 'off',
    },
  },

  // ========================================================================
  // 2. ROOT CONFIG & SCRIPTS
  // ========================================================================
  {
    name: 'monorepo/root-config-files',
    files: [
      '*.{js,mjs,ts}',
      '*.config.{js,mjs,ts}',
      '**/*.config.{js,mjs,cjs,ts}',
      'project.config.ts',
    ],
    languageOptions: {
      globals: {
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        exports: 'writable',
        URLSearchParams: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    name: 'monorepo/scripts',
    files: ['scripts/**/*.ts'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-control-regex': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // ========================================================================
  // 3. ASSETS WORKSPACE
  // ========================================================================
  {
    name: 'monorepo/assets-workspace',
    files: ['assets/**/*.{ts,tsx}'],
    ignores: ['**/*.md/**', '**/*.mdx/**'],
    plugins: {
      '@eslint-react': eslintReact,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      ...eslintReact.configs['strict-type-checked'].rules,
      'react-refresh/only-export-components': 'off',
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },

  // ========================================================================
  // 4. RENDERER WORKSPACE
  // ========================================================================
  {
    name: 'monorepo/renderer-workspace',
    files: ['renderer/**/*.ts', 'renderer/**/*.tsx'],
    ignores: ['**/*.md/**', '**/*.mdx/**'],
    rules: {
      'no-console': ['warn', { allow: ['info', 'warn', 'error', 'log'] }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'warn',
    },
  },

  // ========================================================================
  // 5. MDX AND AGENT SCRIPTS
  // ========================================================================
  {
    ...mdx.flat,
    name: 'monorepo/mdx-files',
    files: ['**/*.mdx'],
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
  },
  {
    name: 'monorepo/disable-typecheck-for-non-project-files',
    files: ['**/*.{js,cjs,mjs,jsx,mdx}', '.agents/**/*.ts', '**/.agents/**/*.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    name: 'monorepo/agents-scripts',
    files: ['.agents/**/*.{js,cjs,mjs,ts}', '**/.agents/**/*.{js,cjs,mjs,ts}'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        module: 'writable',
        exports: 'writable',
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
  {
    name: 'monorepo/mdx-prettier',
    files: ['**/*.mdx'],
    rules: {
      'prettier/prettier': ['error', { parser: 'mdx' }],
    },
  },

  // ========================================================================
  // 6. TEST FILES
  // ========================================================================
  {
    name: 'monorepo/test-files',
    files: ['**/*.{test,spec}.{js,mjs,ts,tsx}', '**/__tests__/**/*.{js,mjs,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-console': 'off',
    },
  },

  // ========================================================================
  // 7. GLOBAL IGNORES
  // ========================================================================
  {
    name: 'monorepo/ignores',
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/build/**',
      '**/generated/**',
      '**/.turbo/**',
      '**/.eslintcache',
      '**/*.json',
      '**/*.css',
      '**/*.scss',
      '**/*.sass',
      '**/*.less',
      '**/*.styl',
      '**/types/**/*.d.ts',
      '**/*.d.ts',
    ],
  },

  // ========================================================================
  // 8. PRETTIER INTEGRATION
  // ========================================================================
  {
    name: 'monorepo/prettier',
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  eslintConfigPrettier,
]);
