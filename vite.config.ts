import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project sites are served from a subpath, so the production build
// must emit that prefix or every asset 404s. The dev server keeps the root base
// so `npm run dev` stays on http://localhost:5173/.
// Change this to '/' for a custom domain or a <user>.github.io site, and to the
// new folder name if the repository is renamed.
const PRODUCTION_BASE = '/Vouken-tech/';

const genmbDataJson: Plugin = {
  name: 'genmb-data-json',
  transform(code: string, id: string) {
    if (!/\.geojson(?:$|\?)/.test(id)) return null;
    if (/[?&](?:raw|url|worker|sharedworker)\b/.test(id)) return null;
    return { code: `export default JSON.parse(${JSON.stringify(code)})`, map: null };
  },
};

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? PRODUCTION_BASE : '/',
  plugins: [genmbDataJson, react(), tailwindcss()],
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  build: {
    outDir: 'dist',
    minify: true,
  },
}));
