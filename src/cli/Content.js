import Chalk from 'chalk';
import ChildProcess from 'child_process';

export default class Content {

	static generateManContent(filename) {
		return new Promise((resolve, reject) => {
			ChildProcess.exec(`man ${filename}`, (err, stdout, stderr) => {
				if (err || stderr) {
					return reject({
						err,
						stderr
					});
				}
				resolve(stdout);
			});
		});
	}

	static generateApplicationList({
		applications
	}) {
		if (!applications) {
			return "";
		}
		return "\n\nApplications:\n" + applications.reduce((p, c) => {
			return p + `
  ${Chalk.green(c.name)}
    ${c.description}
`
		}, "");

	}

	static generateInfoContent({
		filename,
		info,
		cwd
	}) {
		return `
  ${Chalk.green(filename)}
  ${cwd}

Usage:

	${info.usage}

Description:

	${info.description}
` + Content.generateApplicationList(info);
	}
}
