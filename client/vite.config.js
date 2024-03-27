/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin'],
    },
  })],
  resolve: {
    alias: {
      assets: '/src/assets',
      auth: '/src/auth',
      common: '/src/common',
      const: '/src/const',
      errors: '/src/errors',
      game: '/src/game',
      root: '/src/root',
      util: '/src/util',
      websocket: '/src/websocket',
    },
  },
});
