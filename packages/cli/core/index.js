import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { styleText } from 'node:util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

process.title = pkg.name;

const requiredMajor = parseInt(pkg.engines.node.replace(/[^\d]/g, ''));
const currentMajor = parseInt(process.versions.node);

if (currentMajor < requiredMajor) {
	console.log(
		styleText('red',
			`You are using Node ${styleText('bold', process.version)}, ` +
			`but this version of ${styleText('bold', pkg.name)} requires Node ${styleText('bold', pkg.engines.node)}.\n` +
			'Please upgrade your Node version.'
		)
	);

	process.exit(1);
}

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runTask } from './lib/task.js';
import { getEnv } from './lib/env.js';

const app = yargs(hideBin(process.argv));

app.strict();
app.locale('en');
app.version(pkg.version);
app.scriptName('shower');
app.usage(`Usage: ${styleText('bold', '$0 [--version] [--help] <command> [<args>]')}`);
app.epilog(`See ${styleText('bold', '$0 <command> --help')} to read about a specific subcommand.`);

app.alias('h', 'help');
app.alias('v', 'version');

app.options({
	cwd: {
		default: process.cwd(),
		describe: 'working directory to use',
		type: 'string'
	}
});

const commandsList = {
	new: {
		command: 'new [<directory>]',
		aliases: ['create'],
		describe: 'Create a new project'
	},

	serve: {
		command: 'serve',
		describe: 'Serve the slides in development mode',
		requireProject: true
	},

	bundle: {
		command: 'bundle',
		describe: 'Gather the necessary files in a separate folder',
		requireProject: true
	},

	archive: {
		command: 'archive',
		describe: 'Create an archive of the slides',
		requireProject: true
	},

	publish: {
		command: 'publish',
		describe: 'Publish your slides to GitHub Pages',
		requireProject: true
	},

	pdf: {
		command: 'pdf',
		describe: 'Converts the slides to PDF',
		requireProject: true
	}
};

app.middleware((argv, app) => {
	argv.project = getEnv(argv.cwd);

	const name = argv._[0];

	if (commandsList[name]?.requireProject && !argv.project) {
		process.stdout.write(
			styleText('red', 'Shower slides not found') + '\n\n' +
			`Use ${styleText('yellow', 'shower new')} to create slides\n` +
			`Run ${styleText('yellow', 'shower new --help')} to learn more\n`
		);

		app.exit(1);
	}
});

function lazyLoadCommand (id) {
	const command = commandsList[id];

	return {
		command: command.command,
		aliases: command.aliases,
		describe: styleText('yellow', command.describe),

		async builder (...args) {
			const { builder } = await import(`./command/${id}.js`);

			return builder.call(this, ...args);
		},

		async handler (options) {
			const { handler, messages } = await import(`./command/${id}.js`);
			const { start } = messages(options);

			let result;
			if (start) {
				await runTask(start, async () => { result = await handler(options); });
			} else {
				result = await handler(options);
			}

			const { end } = messages(options, result);

			if (end) {
				process.stdout.write(styleText('green', '✔') + ` ${end}\n`);
			}
		}
	};
}

for (const commandID in commandsList) {
	app.command(lazyLoadCommand(commandID));
}

app.parse();

if (!process.argv.slice(2).length) {
	app.showHelp();
}

process.on('uncaughtException', (error) => {
	console.error(error);

	process.exit(1);
});

process.on('SIGINT', () => {
	console.log(styleText('red', '\nAborted'));

	process.exit(0);
});
