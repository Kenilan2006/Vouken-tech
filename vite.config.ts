import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const genmbDataJson: Plugin = {
  name: 'genmb-data-json',
  transform(code: string, id: string) {
    if (!/\.geojson(?:$|\?)/.test(id)) return null;
    if (/[?&](?:raw|url|worker|sharedworker)\b/.test(id)) return null;
    return { code: `export default JSON.parse(${JSON.stringify(code)})`, map: null };
  },
};

export default defineConfig({
  plugins: [genmbDataJson, react(), tailwindcss()],
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  build: {
    outDir: 'dist',
    minify: true,
  },
});
