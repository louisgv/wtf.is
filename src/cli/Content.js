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
		return `${Chalk.bold("APPLICATIONS")}` + info
			.applications
			.reduce((p, c) => {
				return p + `\n\t${Chalk.green(c.name)}
\t${c.description}\n`
			}, "");

	}

	static generateStatContent(filename, {fileStats, executable, siblingDirectoryReliability, siblingFileReliability}) {
		return `${Chalk.bold("STATISTIC")}
\tExecutable: ${executable
			? Chalk.bold.red("YES")
			: Chalk.bold.green("NO")}

\tStandard sibling directory matches: ${Chalk.bold(siblingDirectoryReliability)}%
\t${siblingDirectoryReliability > 50
				? Chalk.green("Sibling directory structure is", Chalk.bold("RELIABLE"))
				: Chalk.red("Sibling directory structure is", Chalk.bold("UNRELIABLE"), "or", Chalk.bold("NONSTANDARD"))}

\tStandard sibling file matches: ${Chalk.bold(siblingFileReliability)}%
\t${siblingFileReliability > 50
					? Chalk.green("Sibling files structure is", Chalk.bold("RELIABLE"))
					: Chalk.red("Sibling file structure is", Chalk.bold("UNRELIABLE"), "or", Chalk.bold("NONSTANDARD"))}`
	}

	static generateNameContent(filename, {cwd}) {
		return `${Chalk.bold("NAME")}
\t${Chalk
			.green
			.bold(filename)}
\t${Chalk
			.yellow(cwd)}`
	}

	static generateDescContent(filename, {info}) {
		return `${Chalk.bold("DESCRIPTION")}
\t${info.description}`
	}

	static generateUsgContent(filename, {info}) {
		return `${Chalk.bold("USAGE")}
\t${info.usage}`
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
