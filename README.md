# @uni-helper/vite-plugin-uni-components

Forked from [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) and modified to adapt UniApp.

[![NPM version](https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-components?color=a1b858&label=)](https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-components)

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

// https://vitejs.dev/config/
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

## UI 组件类型提示

如果你使用 `pnpm` ，请在根目录下创建一个 `.npmrc` 文件，参见[issue](https://github.com/antfu/unplugin-vue-components/issues/389)。

```
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

see more in [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation)

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Neil Lee](https://github.com/zguolee)
