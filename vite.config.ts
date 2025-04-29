import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 配置代理，使其能够跨域访问并存储cookie
  server: {
    proxy: {
      '/api': {
        target: 'http://120.46.86.24:8101/',
        changeOrigin: true,
        ws: true,
        // 路径重写规则：移除请求路径开头的斜杠
        // 例如 /api/user → api/user（注意目标服务器地址末尾已包含斜杠）
        rewrite: (path) => path.replace(/^\//, ''),
      },
    },
  },
})
