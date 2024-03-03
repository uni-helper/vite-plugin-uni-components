import { resolve } from 'path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver, WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { AnoResolver } from 'ano-ui'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Components({
      directoryAsNamespace: true,
      dts: true,
      globalNamespaces: ['global'],
      resolvers: [
        AnoResolver(),
        UniUIResolver(),
        WotResolver(),
      ],
    }),
    Uni(),
    Inspect(),
  ],
})
