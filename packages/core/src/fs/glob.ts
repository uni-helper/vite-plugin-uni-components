import type { Context } from '../context'
import Debug from 'debug'
import { globSync } from 'tinyglobby'

const debug = Debug('vite-plugin-uni-components:glob')

export function searchComponents(ctx: Context) {
  debug(`started with: [${ctx.options.globs.join(', ')}]`)
  const root = ctx.root

  const files = globSync(ctx.options.globs, {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: root,
    absolute: true,
  })

  if (!files.length && !ctx.options.resolvers?.length)

    console.warn('[vite-plugin-uni-components] no components found')

  debug(`${files.length} components found.`)

  ctx.addComponents(files)
}
