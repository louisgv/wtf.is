import Chalk from 'chalk';

export default class Content {
    static generateApplicationList({applications}) {
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

    static generateInfoContent({filename, info, cwd}) {
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
