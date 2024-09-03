import { defineConfig } from 'vite';
import font from 'unplugin-fonts/vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

const fontOptions = {
  custom: {
    families: [
      {
        name: 'Geist',
        src: './src/assets/fonts/geist/*.woff2',
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), font(fontOptions)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
