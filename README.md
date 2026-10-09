<a href="https://uni-helper.js.org/vite-plugin-uni-components"><img src="https://cdn.jsdelivr.net/gh/uni-helper/vite-plugin-uni-components@main/banner.svg" alt="banner" width="100%"/></a>

# uni-helper/vite-plugin-uni-components

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

适用于 uni-app (Vue3) 的 unplugin-vue-components。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-components"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"/></a>

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-components
```

## 使用

📖 请阅读[在线文档](https://uni-helper.js.org/vite-plugin-uni-components)或各包 README 文档了解使用方法。

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

## 感谢

- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)

## 关联项目

- [vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) - 使用 TypeScript 编写 uni-app 的 pages.json，支持约定式路由
- [vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) - 为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统
- [vite-plugin-uni-manifest](https://github.com/uni-helper/vite-plugin-uni-manifest) - 使用 TypeScript 来编写 uni-app 的 manifest.json
- [vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform) - 基于文件名 (\*.<h5\|mp-weixin\|app>.*) 的按平台编译插件
- [vite-plugin-uni-platform-modifier](https://github.com/uni-helper/vite-plugin-uni-platform-modifier) - 为属性、指令提供平台修饰符并按需编译
- [vite-plugin-uni-middleware](https://github.com/uni-helper/vite-plugin-uni-middleware) - 在 `src/middleware` 中定义中间件
