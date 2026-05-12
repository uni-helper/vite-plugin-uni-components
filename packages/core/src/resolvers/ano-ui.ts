import type { ComponentResolver } from '../types'

export function AnoResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^A[A-Z]/.test(name))
        return { name, from: `ano-ui/components/${name}/${name}.vue` }
    },
  }
}
