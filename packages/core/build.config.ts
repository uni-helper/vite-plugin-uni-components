import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/resolvers/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    'vite',
    'vitest',
    'estree-walker',
  ],
})
