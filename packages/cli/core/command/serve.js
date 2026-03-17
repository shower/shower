import { createServer } from 'vite';
import { resolve } from 'node:path';

async function handler ({ cwd, port, open }) {
	const server = await createServer({
		root: cwd,
		server: {
			port,
			open,
			fs: {
				allow: ['..'],
			},
		},
		plugins: [
			{
				name: 'serve-shower-packages',
				configureServer(server) {
					server.middlewares.use((req, res, next) => {
						if (req.url?.startsWith('/core/')) {
							req.url = '/@fs/' + resolve(cwd, 'node_modules/@shower', req.url.slice(1));
						}
						next();
					});
				},
			},
		],
	});

	await server.listen();
	server.printUrls();
}

function builder (yargs) {
	return yargs
		.options({
			open: {
				alias: 'o',
				type: 'bool',
				default: false,
				describe: 'Open browser'
			},
			port: {
				alias: 'p',
				type: 'number',
				default: 8080,
				describe: 'Listening Port'
			}
		});
}

function messages () {
	return {};
}

export { handler, builder, messages };
