import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import settings from './src/data/settings.json';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: settings.url,
	integrations: [mdx(), sitemap()],
	vite: {
		server: {
			watch: {
				ignored: ['_backup/**']
			  },
			  
		},
		plugins: [],
		ssr: {},
		css: {
		  devSourcemap: true
		}
	  },
});
