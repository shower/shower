import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const mimeTypes = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css',
	'.js': 'application/javascript',
};

const root = new URL('..', import.meta.url).pathname;
const port = Number(process.argv[2]) || 8483;

createServer(async (request, response) => {
	const { pathname } = new URL(request.url, 'http://localhost');
	const filePath = join(root, decodeURIComponent(pathname));

	try {
		const body = await readFile(filePath);
		const contentType = mimeTypes[extname(filePath)] || 'application/octet-stream';
		response.writeHead(200, { 'Content-Type': contentType });
		response.end(body);
	} catch {
		response.writeHead(404);
		response.end();
	}
}).listen(port, () => {
	console.log(`Test server listening on http://localhost:${port}`);
});
