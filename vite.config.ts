import { defineConfig } from 'vite';

export default defineConfig({
  base: '/guangdian-app/',
  server: {
    host: '0.0.0.0',
    port: 5190,
    strictPort: true,
  },
});
