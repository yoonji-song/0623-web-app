// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        chatbot: resolve(__dirname, 'basicChatbot.html')
      },
    },
  },
})

/* 페이지 추가될 때만 vite.config.js 건드림 */
/* 폴더 이름 바뀌면 vite에서 인식하는것도 바뀌어서 폴더이름 바꿀 때는 다른것도 알아봐야함 */
/*.env 파일에서 vite에서 정해둔 환경변수 이름임. 그대로. */
