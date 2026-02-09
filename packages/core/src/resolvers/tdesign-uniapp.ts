import type { FilterPattern } from '@rollup/pluginutils'
import type { ComponentResolver } from '../types'
import { isExclude, kebabCase } from '../utils'

export interface ResolverOptions {
  /**
   * RegExp or string to match component names that will NOT be imported
   */
  exclude?: FilterPattern
}

function isChat(name: string) {
  return name === 'TAttachments' || name.startsWith('TChat')
}

export function TDesignUniappResolver(
  options: ResolverOptions = {},
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (isExclude(name, options.exclude))
        return

      if (name.match(/^T[A-Z]/)) {
        const pureName = name.slice(1)
        const partialName = pureName === 'QRCode' ? 'qrcode' : kebabCase(pureName)
        const packagesName = isChat(name) ? 'uniapp-chat' : 'uniapp'

        return {
          name,
          from: `@tdesign/${packagesName}/${partialName}/${partialName}.vue`,
          sideEffects: '@tdesign/uniapp/common/style/theme/index.less',
        }
      }
    },
  }
}
