import { existsSync } from 'fs'
import chokidar from 'chokidar'
import type { Plugin } from 'vite'
import { shouldTransform } from './utils'
import type { Options } from './types'
import { Context } from './context'

function VitePluginComponents(options: Options = {}): Plugin {
  const ctx: Context = new Context(options)

  return {
    name: 'vite-plugin-uni-components',
    enforce: 'post',
    configResolved(config) {
      ctx.setRoot(config.root)
      ctx.sourcemap = true

      if (config.plugins.find(i => i.name === 'vite-plugin-vue2'))
        ctx.setTransformer('vue2')

      if (ctx.options.dts) {
        ctx.searchGlob()
        if (!existsSync(ctx.options.dts))
          ctx.generateDeclaration()
      }

      if (config.build.watch && config.command === 'build')
        ctx.setupWatcher(chokidar.watch(ctx.options.globs))
    },
    configureServer(server) {
      ctx.setupViteServer(server)
    },
    async transform(code, id) {
      if (!shouldTransform(code))
        return null
      try {
        const result = await ctx.transform(code, id)
        ctx.generateDeclaration()
        return result
      }
      catch (e) {
        this.error(e as string)
      }
    },
  }
}

export * from './types'
export * from './resolvers'
export { camelCase, pascalCase, kebabCase } from './utils'

export default VitePluginComponents
