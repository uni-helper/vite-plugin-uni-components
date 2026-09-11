import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp(): { app: ReturnType<typeof createSSRApp> } {
  const app = createSSRApp(App)
  return {
    app,
  }
}
