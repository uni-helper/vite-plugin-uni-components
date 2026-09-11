import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'

export function WotV2Resolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^Wd[A-Z]/.test(name)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `@wot-ui/ui/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
