import Commander from 'commander';
import Chalk from 'chalk';
import WTF from '../';
import Blessed from 'blessed';

import TerminalUtils from './TerminalUtils';

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
` +
			resp.applications.reduce((p, c) => {
				return p +
					`
	   ${c.name}
	   ${c.description}
      `
			}, "");

		const screen = TerminalUtils.generateScreen();

		screen.title = `WTF is ${filename};`

		const box = TerminalUtils.generateBox(content, screen);

		box.focus();

		const footnote = TerminalUtils.generateFootNote(box);

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
