import Commander from 'commander';
import Chalk from 'chalk';
import WTF from '../';
import Terminal from './Terminal';

import Content from './Content';

async function getAndPrintData(filename) {

	try {
		const {
			info,
			cwd,
			cwdData,
			filePath,
			fileExist
		} = await WTF.is(filename);

		switch (cwdData.name) {
		case 'bin':
		case 'sbin':
			info.tryMan = true;
			break;
		default:
		}

		const content = (info.tryMan || !fileExist) ?
			await Content.generateManContent(filename) :
			Content.generateInfoContent({
				filename,
				info,
				cwd
			});

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

Commander.version('0.0.1')
	.command('<filename>', 'Tell you what that file was supposed to do')
	.action(processFile);

Commander.command('is <filename>')
	.action(processFile);

Commander.parse(process.argv);
