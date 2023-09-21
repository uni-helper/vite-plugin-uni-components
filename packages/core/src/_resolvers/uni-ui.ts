import type { ComponentResolver } from '../types'
import { kebabCase } from '../utils'

export function UniUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      // Compatible with @uni-helper/vite-plugin-uni-layouts
      if (name !== 'UniLayout' && name.match(/^Uni[A-Z]/)) {
        const partialName = kebabCase(name)
        return {
          name,
          from: `@dcloudio/uni-ui/lib/${partialName}/${partialName}.vue`,
        }
      }
    },
  }
}
