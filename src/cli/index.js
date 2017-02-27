import commander from 'commander';
import chalk from 'chalk';
import WTF from '../';
const log = console.log;
// TODO: Instead of the naive console.log, use a scorllable/interactive clid display
function processFile(filename) {

	const resp = WTF.is(filename);

	log(`
  ${chalk.green(filename)}

  Usage:

   ${resp.usage}

  Description:

   ${resp.description}
    `);
}

commander
	.version('0.0.1')
	.command('<filename>', 'Tell you what that file was supposed to do')
	.action(processFile);

commander
	.command('is <filename>')
	.action(processFile);

commander.parse(process.argv);
