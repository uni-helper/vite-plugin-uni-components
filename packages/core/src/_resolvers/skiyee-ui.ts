import type { ComponentResolver } from '../types'
import { kebabCase } from '../utils'

export default function SkResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(?:Sk[A-Z]|sk-[a-z])/)) {
        let kebabCaseName: string = kebabCase(name)

        return {
          name,
          from: `@skiyee/uni-ui/components/${kebabCaseName}.vue`
        }
      }
    },
  }
}
