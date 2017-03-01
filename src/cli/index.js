import Commander from 'commander';
import Chalk from 'chalk';
import WTF from '../';
import Terminal from './Terminal';

async function getAndPrintData(filename) {
	try {
		const resp = await WTF.is(filename);

		const content =
`
  ${Chalk.green(filename)}

  Usage:

    ${resp.usage}

  Description:

    ${resp.description}

  Applications:
` + resp.applications.reduce((p, c) => {
			return p +
`
    ${c.name}
    ${c.description}
`
		}, "");

		const term = new Terminal(filename, content);

		term.render();
	} catch (e) {
		console.error(e);
		return process.exit(1);
	}
}

function processFile(filename) {
	getAndPrintData(filename);
}

Commander
	.version('0.0.1')
	.command('<filename>', 'Tell you what that file was supposed to do')
	.action(processFile);

Commander
	.command('is <filename>')
	.action(processFile);

Commander.parse(process.argv);
