import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		fs: {
			allow: ['..'],
		},
	},
	plugins: [
		{
			name: 'serve-core',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url?.startsWith('/core/')) {
						req.url = '/@fs/' + resolve(import.meta.dirname, '..', req.url.slice(1));
					}
					next();
				});
			},
		},
	],
});
