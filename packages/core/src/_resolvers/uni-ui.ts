import type { FilterPattern } from '@rollup/pluginutils'
import type { ComponentResolver } from '../types'
import { isExclude, kebabCase } from '../utils'

export interface UniUIResolverOptions {
  /**
   * RegExp or string to match component names that will NOT be imported
   */
  excludes?: FilterPattern
}

export function UniUIResolver(
  options: UniUIResolverOptions = {},
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      // Compatible with @uni-helper/vite-plugin-uni-layouts
      if (isExclude(name, options.excludes) || name === 'UniLayout')
        return

      if (name.match(/^Uni[A-Z]/)) {
        const partialName = kebabCase(name)
        return {
          name,
          from: `@dcloudio/uni-ui/lib/${partialName}/${partialName}.vue`,
        }
      }
    },
  }
}
