import type { Plugin } from 'vite'
import type { Options, PublicPluginAPI } from './types'
import { existsSync } from 'node:fs'
import chokidar from 'chokidar'
import { createFilter } from 'vite'
import { Context } from './context'
import { shouldTransform, stringifyComponentImport } from './utils'

export default function VitePluginComponents(options: Options = {}): Plugin & { api: PublicPluginAPI } {
  const filter = createFilter(
    options.include || [
      /\.vue($|\?)/,
    ],
    options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  )
  const ctx: Context = new Context(options)

  return {
    name: 'vite-plugin-uni-components',
    enforce: 'post',
    api: {
      async findComponent(name, filename) {
        return await ctx.findComponent(name, 'component', filename ? [filename] : [])
      },
      stringifyImport(info) {
        return stringifyComponentImport(info, ctx)
      },
    },
    configResolved(config) {
      ctx.setRoot(config.root)
      ctx.sourcemap = true

      if (ctx.options.dts) {
        ctx.searchGlob()
        if (!existsSync(ctx.options.dts))
          ctx.generateDeclaration()
      }

      if (ctx.options.dumpComponentsInfo && ctx.dumpComponentsInfoPath) {
        if (!existsSync(ctx.dumpComponentsInfoPath))
          ctx.generateComponentsJson()
      }

      if (config.build.watch && config.command === 'build')
        ctx.setupWatcher(chokidar.watch(ctx.options.globs))
    },
    configureServer(server) {
      ctx.setupViteServer(server)
    },
    async transform(code, id) {
      if (!shouldTransform(code) || !filter(id))
        return null
      try {
        const result = await ctx.transform(code, id)
        ctx.generateDeclaration()
        ctx.generateComponentsJson()
        return result
      }
      catch (e) {
        this.error(e as string)
      }
    },
  }
}

export * from './types'
export { camelCase, kebabCase, pascalCase } from './utils'
