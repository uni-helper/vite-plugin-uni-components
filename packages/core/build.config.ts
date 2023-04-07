import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/resolvers',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    'vite',
    'estree-walker',
  ],
})
