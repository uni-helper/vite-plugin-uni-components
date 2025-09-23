import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'

export function uViewProResolver(prefix = 'uview-pro'): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^U[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `${prefix}/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
