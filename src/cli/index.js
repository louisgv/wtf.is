import Commander from 'commander';
import Chalk from 'chalk';
import WTF from '../';
import Blessed from 'blessed';
import TerminalUils from './TerminalUils';

async function getAndPrintData(filename) {
	try {
		const resp = await WTF.is(filename);

		const content = `
	  ${Chalk.green(filename)}

	  Usage:

	   ${resp.usage}

	  Description:

	   ${resp.description}

		Applications:

	   ${resp.applications.reduce((acc, current) => {
			 return `
    ${acc}

		${current.name}
		${current.description}
			 `;
		 }, "")}
	    `;

		const screen = TerminalUils.generateScreen();

		screen.title = `WTF is ${filename};`

		const box = Blessed.box({
			content,
			scrollable: true
		})

		const footnote = TerminalUils.generateFootNote(box);

		screen.append(box);

		screen.append(footnote);

		screen.render();
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
