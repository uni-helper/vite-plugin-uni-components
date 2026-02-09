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
        if (isChat(name)) {
          return {
            name,
            from: `@tdesign/uniapp-chat/${partialName}/${partialName}.vue`,
          }
        }

        return {
          name,
          from: `@tdesign/uniapp/${partialName}/${partialName}.vue`,
        }
      }
    },
  }
}
