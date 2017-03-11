import Chalk from 'chalk';
import ChildProcess from 'child_process';

export default class Content {

	static generateManContent(filename) {
		return new Promise((resolve, reject) => {
			ChildProcess.exec(`man ${filename}`, (err, stdout, stderr) => {
				if (err || stderr) {
					return reject({err, stderr});
				}
				resolve(stdout);
			});
		});
	}

	static generateApplicationList(filename, {info}) {
		if (!info.applications) {
			return "";
		}
		return `${Chalk.bold("APPLICATIONS")}` + info.applications.reduce((p, c) => {
			return p + `\n\t\t${Chalk.green(c.name)}
\t\t${c.description}\n`
		}, "");

	}

	static generateStatContent(filename, {fileStats, siblingDirectoryReliability, siblingFileReliability}) {
		return `${Chalk.bold("STATISTIC")}
\t\tStandard sibling directory matches: ${Chalk.bold(siblingDirectoryReliability)}%
\t\t${siblingDirectoryReliability > 50
			? Chalk.green("Sibling directory structure is", Chalk.bold("RELIABLE"))
			: Chalk.red("Sibling directory structure is", Chalk.bold("UNRELIABLE"), "or", Chalk.bold("NONSTANDARD"))}

\t\tStandard sibling file matches: ${Chalk.bold(siblingFileReliability)}%
\t\t${siblingFileReliability > 50
				? Chalk.green("Sibling files structure is", Chalk.bold("RELIABLE"))
				: Chalk.red("Sibling file structure is", Chalk.bold("UNRELIABLE"), "or", Chalk.bold("NONSTANDARD"))}`
	}

	static generateNameContent(filename, {cwd}) {
		return `${Chalk.bold("NAME")}
\t\t${Chalk
			.green
			.bold(filename)}
\t\t${Chalk
			.yellow(cwd)}`
	}

	static generateDescContent(filename, {info}) {
		return `${Chalk.bold("DESCRIPTION")}
\t\t${info.description}`
	}

	static generateUsgContent(filename, {info}) {
		return `${Chalk.bold("USAGE")}
\t\t${info.usage}`
	}

	static generateInfoContent(filename, data) {

		// TODO: If file size is bigger than info.maxSize, roll up a FLAG for unconventional file

		// TODO: If the filesize is smaller than info.minSize, roll up a FLAG for unconventional
		// file

		return `

${Content.generateNameContent(filename, data)}

${Content.generateStatContent(filename, data)}

${Content.generateDescContent(filename, data)}

${Content.generateUsgContent(filename, data)}

${Content.generateApplicationList(filename, data)}


`
	}
}
