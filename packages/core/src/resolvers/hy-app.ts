import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'

export function HyAppResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^Hy[A-Z]/.test(name)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `@hy-app/ui/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
