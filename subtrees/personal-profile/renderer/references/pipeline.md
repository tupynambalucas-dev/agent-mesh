# Code Pattern: Registering a New Pipeline

All pipelines MUST satisfy the `Pipeline` type schema and be registered inside `src/pipelines/`:

```typescript
import type { Pipeline } from './types.js';

export const customPipeline: Pipeline = {
  id: 'handbook-docs',
  name: 'Handbook Documents',
  description: 'Compiles project manuals and handbooks.',
  targets: [
    {
      name: 'User Guide',
      templatePath: 'src/templates/docs/guide.template.md',
      outputPath: '../docs/GUIDE.md',
      ciPath: 'docs/GUIDE.md',
      ciBranches: ['main'],
    },
  ],
};
```
