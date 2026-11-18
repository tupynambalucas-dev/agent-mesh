# Assets Package

The `assets` package (`@tupynambalucas/assets`) exports brand identity assets, design system tokens, CSS theme definitions, and React SVG icon components.

---

## Package Contents

- **[tokens/](./src/tokens/)**: CSS variables, color scales, and theme configuration.
- **[icons/](./src/icons/)**: React SVG icon library.
- **[org/](./src/org/)**: SVG logos and identity mark source files.
- **[renderer/](./src/renderer/)**: SVG card templates for stats and language generation.
- **[assets-manifest.json](./src/assets-manifest.json)**: Asset inventory manifest.

---

## Usage in Monorepo

Import styles and components directly in consuming applications:

```tsx
import { IconGithub } from '@tupynambalucas/assets/icons';
import '@tupynambalucas/assets/theme.css';
```

---

## Development Scripts

- `pnpm typecheck`: Validates TypeScript type compliance across assets and token exports.
- `pnpm lint`: Runs ESLint checks.
