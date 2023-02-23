import { resolve } from 'path'
import type { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-uni-components'
import { AnoResolver } from 'vite-plugin-uni-components/resolvers'
import Inspect from 'vite-plugin-inspect'

const config: UserConfig = {
  resolve: {
    alias: {
      '/~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    Inspect(),
    Components({
      directoryAsNamespace: true,
      dts: true,
      globalNamespaces: ['global'],
      resolvers: [AnoResolver()],
    }),
  ],
  build: {
    sourcemap: true,
  },
}

export default config
