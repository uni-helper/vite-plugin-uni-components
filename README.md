# @uni-helper/vite-plugin-uni-components

从[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)派生并修改以适应UniApp。

<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-components"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-components" alt="NPM version"></a></p>

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-components
```

## 使用

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'

export default defineConfig({
  plugins: [
    // make sure put it before `Uni()`
    Components(),
    Uni(),
  ],
})
```

## 从 UI 库导入

支持的 UI 库：

- [Ano UI](./packages/core/src/_resolvers/ano-ui.ts)
- [uni-ui](./packages/core/src/_resolvers/uni-ui.ts)
- [wot-design-uni](./packages/core/src/_resolvers/wot-design-uni.ts)
- [uv-uni](./packages/core/src/_resolvers/uv-uni.ts)

## UI 组件类型提示

如果你使用 `pnpm` ，请在根目录下创建一个 `.npmrc` 文件，参见[issue](https://github.com/antfu/unplugin-vue-components/issues/389)。

```
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

### 更多信息请查看[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation)

> [!TIP]
> 对于第三方组件(如 [dcloudio/uni-ui](https://github.com/dcloudio/uni-ui)，[ano-ui](https://github.com/ano-ui/ano-ui)) 使用 `vite-plugin-uni-components` 会生成 `default` 属性，解决在 H5 端无法正确处理组件的问题。
>```diff
>declare module 'vue' {
>  export interface GlobalComponents {
>-  AButton: typeof import('ano-ui/components/AButton/AButton.vue')['AButton']
>+  AButton: typeof import('ano-ui/components/AButton/AButton.vue')['default']
>    Book: typeof import('./src/components/book/index.vue')['default']
>    ComponentA: typeof import('./src/components/ComponentA.vue')['default']
>-  UniCalendar: typeof import('@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue')['UniCalendar']
>+  UniCalendar: typeof import('@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue')['default']
>  }
>}
>```

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Neil Lee](https://github.com/zguolee)
