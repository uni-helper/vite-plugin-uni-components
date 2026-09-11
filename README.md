<a href="https://uni-helper.js.org/vite-plugin-uni-components"><img src="./banner.svg" alt="banner" width="100%"/></a>

# uni-helper/vite-plugin-uni-components

<p style="text-align: center">
<a href="https://github.com/uni-helper/vite-plugin-uni-components/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/vite-plugin-uni-components?colorA=005947&colorB=eee&style=for-the-badge" alt="GitHub Stars"/></a>
<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-components"><img src="https://img.shields.io/npm/dm/@uni-helper/vite-plugin-uni-components?colorA=005947&colorB=eee&style=for-the-badge" alt="npm downloads"/></a>
<a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-components"><img src="https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-components?colorA=005947&colorB=eee&style=for-the-badge" alt="npm version"/></a>
</p>
<p style="text-align: center">
<a href="https://github.com/nei1ee"><img src="https://img.shields.io/badge/Author-nei1ee-blue?style=for-the-badge" alt="Author"></a>
  <a href="https://github.com/ModyQyW"><img src="https://img.shields.io/badge/Maintainer-ModyQyW-blue?style=for-the-badge" alt="Maintainer"></a>
</p>

适用于 uni-app (Vue3) 的 unplugin-vue-components。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/vite-plugin-uni-components"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

## 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-components
```

## 使用

📖 **请阅读[完整文档](https://uni-helper.js.org/vite-plugin-uni-components)了解完整使用方法。**

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
