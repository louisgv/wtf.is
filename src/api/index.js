// const API = {
// 	PROTOCOL: "http",
// 	HOST: "localhost",
// 	PORT: 3000,
// 	ROUTE: "/"
// };

// https://raw.githubusercontent.com/louisgv/wtf-is/master/db/package.json
const API = {
		PROTOCOL: "https",
		HOST: "raw.githubusercontent.com",
		PORT: 443,
		ROUTE: "/louisgv/wtf-is/master/db/"
}

import Fetch from 'node-fetch';

export default class WTF {

	static async getInfo(filename) {
		const url = `${API.PROTOCOL}://${API.HOST}:${API.PORT}${API.ROUTE}/${filename}`
		const res = await Fetch(url);
		const json = await res.json();
		return json;
	}

	static async is(filename) {
		const info = await WTF.getInfo(filename);

		// TODO: Get dirname

		// TODO: If CWD is `bin`, invoke `man $filename`

		// TODO: If `man` success, print out the data.

		// TODO: If `man` returns nothing, continue

		// TODO: Check if filename exist in our database.

		// TODO: If name exist, get the metadata for this file

		// TODO: Get a list of sibling directory

		// TODO: If 50% of sibling directory doesn't
		// match data.siblingDirs, role up a FLAG for unreliable data.

		// TODO: Get a list of sibling files

		// TODO: If 50% of sibling files doesn't
		// match data.siblingDirs, role up a FLAG for unreliable data.

		// TODO: Get filesize

		// TODO: If file size is bigger than data.maxSize,
		// roll up a FLAG for unconventional file

		// TODO: If the filesize is smaller than data.minSize,
		// roll up a FLAG for unconventional file

		return info;
	}
};
