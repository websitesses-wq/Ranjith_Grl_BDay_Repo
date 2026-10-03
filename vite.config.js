import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Expose to local network (same Wi-Fi)
    port: 5173,
    strictPort: true,
  }
});
