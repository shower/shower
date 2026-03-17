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

	pdf: {
		command: 'pdf',
		describe: 'Converts the presentation to PDF',
		requireProject: true
	},

	serve: {
		command: 'serve',
		describe: 'Serve the presentation in development mode',
		requireProject: true
	},

	bundle: {
		command: 'bundle',
		describe: 'Gather the necessary files in a separate folder',
		requireProject: true
	},

	archive: {
		command: 'archive',
		describe: 'Create an archive of the presentation',
		requireProject: true
	},

	publish: {
		command: 'publish',
		describe: 'Publish your presentation to GitHub Pages',
		requireProject: true
	}
};

app.middleware((argv, app) => {
	argv.project = getEnv(argv.cwd);

	const name = argv._[0];

	if (commandsList[name]?.requireProject && !argv.project) {
		process.stdout.write(
			styleText('red', 'Shower presentation not found') + '\n\n' +
			`Use ${styleText('yellow', 'shower create')} to create a presentation\n` +
			`Run ${styleText('yellow', 'shower create --help')} to learn more\n`
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
			const { start, end } = messages(options);

			if (start) {
				await runTask(start, () => handler(options));
			} else {
				await handler(options);
			}

			if (end) {
				process.stdout.write(`${end}\n`);
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
