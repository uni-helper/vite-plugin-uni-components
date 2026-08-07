import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'

export function HyAppResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Hy[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `@hy-app/ui/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
