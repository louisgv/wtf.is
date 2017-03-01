import Commander from 'commander';
import Chalk from 'chalk';
import WTF from '../';

import TerminalKit from 'terminal-kit';


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
` + resp.applications.reduce((p, c) => {
			return p +
				`
    ${c.name}
    ${c.description}
`
		}, "");

		const term = TerminalKit.realTerminal;

		term.fullscreen(true);

		term.grabInput({
			mouse: 'button'
		});

		const sbuf = TerminalKit.ScreenBuffer.create({
			dst: term
		});

		const tbuf = TerminalKit.TextBuffer.create({
			dst: sbuf
		});

		term.on('key', function(name, matches, data) {
			// console.log("'key' event:", name);
			if (name === 'CTRL_C') {
				term.grabInput(false);
				setTimeout(function() {
					process.exit()
				}, 100);
			}
			if (name === 'UP') {
				tbuf.move(0, -1);
			}
			if (name === 'DOWN') {
				tbuf.move(0, 1);
			}
		});

		tbuf.setText(content);

		tbuf.draw();

		sbuf.draw();


		// term(content);

		// const screen = TerminalUtils.generateScreen();
		//
		// screen.title = `WTF is ${filename};`
		//
		// const box = TerminalUtils.generateBox(content, screen);
		//
		// box.focus();
		//
		// const footnote = TerminalUtils.generateFootNote(box);
		//
		// screen.append(box);
		//
		// screen.append(footnote);
		//
		// screen.render();
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
