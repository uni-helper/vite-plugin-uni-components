import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'

export function uViewProResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^u[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `uview-pro/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
