import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/llama-bot/',
  server: {
    port: 5175 // 원하는 포트로 고정
  }
});
