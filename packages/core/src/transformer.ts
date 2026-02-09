import type { TransformResult } from 'rollup'
import type { Context } from './context'
import type { SupportedTransformer, Transformer } from './types'
import Debug from 'debug'
import MagicString from 'magic-string'
import { DISABLE_COMMENT } from './constants'
import transformComponent from './transforms/component'
import transformDirectives from './transforms/directive'

const debug = Debug('vite-plugin-uni-components:transformer')

export interface ResolveResult {
  rawName: string
  replace: (resolved: string) => void
}

export default function transformer(ctx: Context, transformer: SupportedTransformer): Transformer {
  return async (code, id, path) => {
    ctx.searchGlob()

    const sfcPath = ctx.normalizePath(path)
    debug(sfcPath)

    const s = new MagicString(code)

    await transformComponent(code, transformer, s, ctx, sfcPath)
    if (ctx.options.directives)
      await transformDirectives(code, transformer, s, ctx, sfcPath)

    s.prepend(DISABLE_COMMENT)

    const result: TransformResult = { code: s.toString() }
    if (ctx.sourcemap)
      result.map = s.generateMap({ source: id, includeContent: true, hires: 'boundary' })
    return result
  }
}
