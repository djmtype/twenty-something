import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { site } from './src/data/config.json';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: site.url,
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
