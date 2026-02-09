import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/resolvers.ts',
  ],
  dts: true,
  format: ['esm', 'cjs'],
  external: [
    'vite',
    'estree-walker',
    '@antfu/utils',
  ],
  outputOptions: {
    exports: 'named',
  },
})
