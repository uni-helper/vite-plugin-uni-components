import type { FilterPattern } from '@rollup/pluginutils'
import type { ComponentResolver } from '../types'
import { isExclude, kebabCase } from '../utils'

export interface ZPagingResolverOptions {
  /**
   * RegExp or string to match component names that will NOT be imported
   */
  exclude?: FilterPattern
}

export function ZPagingResolver(
  options: ZPagingResolverOptions = {},
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (isExclude(name, options.exclude))
        return

      if (name.match(/^(?!ZPagingRefresh|ZPagingLoadMore)ZPaging(.*)/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `z-paging/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
