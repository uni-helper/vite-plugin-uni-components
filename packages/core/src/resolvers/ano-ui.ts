import type { ComponentResolver } from '../types'

export function AnoResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^A[A-Z]/))
        return { name, from: `ano-ui/components/${name}/${name}.vue` }
    },
  }
}
