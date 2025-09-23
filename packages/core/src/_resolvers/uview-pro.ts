import type { ComponentResolver } from '../types'

import { kebabCase } from '../utils'
/**
 * uView Pro 组件解析器
 * @param prefix - 组件导入路径的前缀，默认为 'uview-pro'
 * @param [prefix='uview-pro'] - 可传入 uni_modules 路径以支持 uni_modules
 * @returns uView Pro 组件的解析器函数
 * @example
 * // 基本用法
 * uViewProResolver()
 *
 * // 支持 uni_modules
 * uViewProResolver('@/uni_modules/uview-pro')
 */
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
