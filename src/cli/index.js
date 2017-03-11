import Commander from 'commander';
import Chalk from 'chalk';
import WTF from '../';
import Terminal from './Terminal';

import Content from './Content';

const LOCAL_API = {
	protocol: "http",
	host: "localhost",
	port: 5000,
	route: "/"
};

async function getAndPrintData(filename, api) {

	try {
		const wtf = new WTF(api);

		const data = await wtf.is(filename);

		const {useMan} = data;

		const content = useMan
			? await Content.generateManContent(filename)
			: Content.generateInfoContent(filename, data);

		const term = new Terminal(filename, content);

		term.render();
	} catch (e) {
		console.log(`${Chalk.green.bold(filename)} cannot be found in the database.\nPlease file an investigation issue, or contribute to ${Chalk.green.bold('wtf.is')}'s database!\n The database repo is at ${Chalk.black.bgWhite.underline('https://github.com/louisgv/wtf-is-db')}\n${Chalk.yellow.bold('Papa bless!')}`);
		console.log(`\nAlso, the ${Chalk.red.bold('error message')} below is relevant:\n`);
		console.error(e);
		return process.exit(1);
	}
}

function processFile(filename) {
	getAndPrintData(filename);
}

function processFileDevMode(filename) {
	getAndPrintData(filename, LOCAL_API);
}

Commander
	.version('0.0.1')
	.command('<filename>', 'Tell you what that file was supposed to do')
	.action(processFile);

Commander
	.command('is <filename>')
	.action(processFile);

Commander
	.command('dis <filename>')
	.action(processFileDevMode);

Commander.parse(process.argv);
