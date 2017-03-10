const API = {
	PROTOCOL: "http",
	HOST: "localhost",
	PORT: 5000,
	ROUTE: "/"
};

// https://raw.githubusercontent.com/louisgv/wtf-is/master/db/package.json
// const API = {
// 		PROTOCOL: "https",
// 		HOST: "raw.githubusercontent.com",
// 		PORT: 443,
// 		ROUTE: "/louisgv/wtf-is/master/db/"
// }

import Fs from 'fs';
import Fetch from 'node-fetch';
import Path from 'path';

export default class WTF {

	static async getInfo(filename) {
		try {
			const url = `${API.PROTOCOL}://${API.HOST}:${API.PORT}${API.ROUTE}/${filename}.json`
			const res = await Fetch(url);
			const json = await res.json();
			return json;
		} catch (e) {
			return e;
		}
	}

	static async is(filename) {
		// Get path
		const cwd = process.cwd();

		const cwdData = Path.parse(cwd);

		const filePath = Path.join(cwd, filename);

		const fileExist = Fs.existsSync(filePath);

		const fileStats =  false && fileExist ?
			Fs.lstatSync(filePath) :
			null;

		// Get a list of siblings (both directory and files)
		const siblings = fileExist ?
			Fs.readdirSync(cwd) :
			null;

		// Get the metadata for this file
		const info = await WTF.getInfo(filename);

		// TODO: If 50% of sibling directory doesn't
		// match data.siblingDirs, role up a FLAG for unreliable directory structure.
		if (siblings) {
			
		}
		// TODO: Get a list of sibling files

		// TODO: If 50% of sibling files doesn't
		// match data.siblingDirs, role up a FLAG for unreliable file structure.

		// TODO: Get filesize

		// TODO: If file size is bigger than data.maxSize,
		// roll up a FLAG for unconventional file

		// TODO: If the filesize is smaller than data.minSize,
		// roll up a FLAG for unconventional file

		return {
			info,
			cwd,
			cwdData,
			filePath,
			fileExist
		};
	}
};
