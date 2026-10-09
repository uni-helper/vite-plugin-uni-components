# @uni-helper/vite-plugin-uni-components

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/uni-helper/vite-plugin-uni-components@main/logo.svg" alt="logo" width="256" height="256"/>
</p>

<p align="center">
  <a href="https://github.com/uni-helper/vite-plugin-uni-components/blob/main/LICENSE"><img src="https://img.shields.io/github/license/uni-helper/vite-plugin-uni-components?style=for-the-badge&labelColor=005947&color=eee" alt="License"/></a>
  <a href="https://github.com/uni-helper/vite-plugin-uni-components/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/vite-plugin-uni-components?style=for-the-badge&labelColor=005947&color=eee" alt="Stars"/></a>
  <a href="https://npmx.dev/package/@uni-helper/vite-plugin-uni-components"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-components?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Version"/></a>
  <a href="https://npmx.dev/package/@uni-helper/vite-plugin-uni-components"><img src="https://img.shields.io/npm/dm/@uni-helper/vite-plugin-uni-components?style=for-the-badge&labelColor=005947&color=eee" alt="NPM Downloads"/></a>
</p>
<p align="center">
  <a href="https://github.com/nei1ee"><img src="https://img.shields.io/badge/Author-nei1ee-blue?style=for-the-badge" alt="Author"/></a>
  <a href="https://github.com/ModyQyW"><img src="https://img.shields.io/badge/Maintainer-ModyQyW-blue?style=for-the-badge" alt="Maintainer"/></a>
</p>

Fork 自 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)，修改以适配 uni-app (Vue3)：在模板中使用组件时无需手动注册，自动按需导入。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-components"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"/></a>

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-components
```

## 使用

```ts
// vite.config.ts
import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Components(), // 需要在 Uni() 之前调用
    Uni(),
  ],
})
```

插件默认扫描 `src/components` 目录。`components.d.ts` 会自动生成，提供组件类型提示。

📖 完整配置项请阅读[在线文档](https://uni-helper.js.org/vite-plugin-uni-components)，通用配置项可参考 [unplugin-vue-components 文档](https://github.com/unplugin/unplugin-vue-components)。

## 从 UI 库导入

内置以下 UI 库的 resolver，从 `@uni-helper/vite-plugin-uni-components/resolvers` 导入：

```ts
// vite.config.ts
import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [UniUIResolver()],
    }),
    Uni(),
  ],
})
```

| UI 库 | Resolver |
| --- | --- |
| [Ano UI](https://github.com/ano-ui/ano-ui) | `AnoResolver` |
| [TDesign UniApp](https://tdesign.tencent.com/uniapp) | `TDesignUniappResolver` |
| [uni-ui](https://github.com/dcloudio/uni-ui) | `UniUIResolver` |
| [uv-ui](https://www.npmjs.com/package/@climblee/uv-ui) | `UvResolver` |
| [uview-pro](https://github.com/anyup/uview-pro) | `uViewProResolver` |
| [wot-design-uni](https://github.com/Moonofweisheng/wot-design-uni) | `WotResolver` |
| [wot-ui](https://github.com/wot-ui/wot-ui) | `WotV2Resolver` |
| [z-paging](https://github.com/SmileZXLee/uni-z-paging) | `ZPagingResolver` |

`TDesignUniappResolver`、`UniUIResolver`、`ZPagingResolver` 支持 `exclude` 选项过滤不需要解析的组件名；`uViewProResolver` 可以传入路径前缀以支持 uni_modules 安装方式，例如 `uViewProResolver('@/uni_modules/uview-pro')`。

## 组件类型提示

如果使用 `pnpm`，请在项目根目录创建 `.npmrc` 文件提升 `@vue` 相关依赖，参见 [issue](https://github.com/unplugin/unplugin-vue-components/issues/389)：

```ini
// .npmrc
public-hoist-pattern[]=@vue*
// 或者
// shamefully-hoist = true
```

更多信息见 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components#installation)。

对第三方组件（如 [dcloudio/uni-ui](https://github.com/dcloudio/uni-ui)、[ano-ui](https://github.com/ano-ui/ano-ui)），本插件在 `components.d.ts` 中生成 `default` 类型入口，解决 H5 端无法正确处理组件的问题：

```diff
declare module 'vue' {
  export interface GlobalComponents {
-  AButton: typeof import('ano-ui/components/AButton/AButton.vue')['AButton']
+  AButton: typeof import('ano-ui/components/AButton/AButton.vue')['default']
    Book: typeof import('./src/components/book/index.vue')['default']
-  UniCalendar: typeof import('@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue')['UniCalendar']
+  UniCalendar: typeof import('@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue')['default']
  }
}
```

## 关联项目

- [vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) - 使用 TypeScript 编写 uni-app 的 pages.json，支持约定式路由
- [vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) - 为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统
- [vite-plugin-uni-manifest](https://github.com/uni-helper/vite-plugin-uni-manifest) - 使用 TypeScript 来编写 uni-app 的 manifest.json
- [vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform) - 基于文件名 (\*.<h5\|mp-weixin\|app>.*) 的按平台编译插件
- [vite-plugin-uni-platform-modifier](https://github.com/uni-helper/vite-plugin-uni-platform-modifier) - 为属性、指令提供平台修饰符并按需编译
- [vite-plugin-uni-middleware](https://github.com/uni-helper/vite-plugin-uni-middleware) - 在 `src/middleware` 中定义中间件

## 许可证

[MIT](./LICENSE) License © 2022-PRESENT [Neil Lee](https://github.com/nei1ee)
