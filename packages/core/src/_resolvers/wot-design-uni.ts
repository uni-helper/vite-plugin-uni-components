import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'

export function WotResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Wd[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `wot-design-uni/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
