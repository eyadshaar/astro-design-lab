import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astro-design-lab.pages.dev',
  output: 'static',
  build: {
    assets: '_assets'
  },
  vite: {
    build: {
      cssCodeSplit: true
    }
  }
});
