# @uni-helper/vite-plugin-uni-components

Forked from [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) and modified to adapt UniApp.

[![NPM version](https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-components?color=a1b858&label=)](https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-components)

## Install

```bash
pnpm i -D @uni-helper/vite-plugin-uni-components
```

## Usage

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

## Component type prompt

If you use `pnpm`, please create a `.npmrc` file in root, see [issue](https://github.com/antfu/unplugin-vue-components/issues/389).

```
// .npmrc
public-hoist-pattern[]=@vue*
// or 
// shamefully-hoist = true
```

see more in [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation)

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Neil Lee](https://github.com/zguolee)
