import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'

export function UvResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Uv[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `@climblee/uv-ui/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
