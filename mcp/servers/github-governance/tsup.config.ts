import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/bin.ts', 'src/index.ts'],
  format: ['cjs'],
  target: 'node20',
  clean: true,
  noExternal: [/.*/],
  sourcemap: false,
  minify: true,
});
