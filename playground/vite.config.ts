import path from 'path'
import type { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-uni-components'
import Inspect from 'vite-plugin-inspect'

const config: UserConfig = {
  resolve: {
    alias: {
      '/~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    Inspect(),
    Components({
      directoryAsNamespace: true,
      dts: true,
      globalNamespaces: ['global'],
    }),
  ],
  build: {
    sourcemap: true,
  },
}

export default config
