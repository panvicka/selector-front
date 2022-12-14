import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		files: {
			lib: 'src/lib'
		},
		alias: {
			components: 'src/lib/components',
			utils: 'src/utils',
			api: 'src/api'
		}
	}
};

export default config;
