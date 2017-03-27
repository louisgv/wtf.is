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

async function getAndPrintData(name, api) {

	try {
		const wtf = new WTF(api);

		const data = await wtf.is(name);

		const {useMan} = data;

		const content = useMan
			? await Content.generateManContent(name)
			: Content.generateInfoContent(name, data);

		if (api) {
			console.log(content);
			return process.exit(0);
		}

		const term = new Terminal(name, content);

		term.render();
	} catch (e) {
		console.log(`${Chalk.green.bold(name)} cannot be found in the database.\nPlease file an investigation issue, or contribute to ${Chalk.green.bold('wtf.is')}'s database!\n The database repo is at ${Chalk.black.bgWhite.underline('https://github.com/louisgv/wtf-is-db')}\n${Chalk.yellow.bold('Papa bless!')}`);
		console.log(`\nAlso, the ${Chalk.red.bold('error message')} below is relevant:\n`);
		console.error(e);
		return process.exit(1);
	}
}

function processFile(name) {
	getAndPrintData(name);
}

function processFileDevMode(name) {
	getAndPrintData(name, LOCAL_API);
}

Commander
	.version('0.0.1')
	.command('<name>', 'Tell you what that file is')
	.action(processFile);

Commander
	.command('is <name>')
	.action(processFile);

Commander
	.command('dis <name>')
	.action(processFileDevMode);

Commander.parse(process.argv);
