import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		host: true,
		fs: {
			allow: ['..'],
		},
	},
	plugins: [
		{
			name: 'serve-shower-packages',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url?.startsWith('/node_modules/@shower/')) {
						const rest = req.url.slice('/node_modules/@shower/'.length);
						req.url = '/@fs/' + resolve(import.meta.dirname, '..', rest);
					}
					next();
				});
			},
		},
	],
});
