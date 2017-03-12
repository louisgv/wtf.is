// https://raw.githubusercontent.com/louisgv/wtf-is-db/master/name/package.json
const DEFAULT_API = {
	protocol: "https",
	host: "raw.githubusercontent.com",
	port: 443,
	route: "/louisgv/wtf-is-db/master/"
}

import FileSystem from './FileSystem';
import Fetch from 'node-fetch';
import Path from 'path';

export default class WTF {

	constructor(api) {

		const {protocol, host, port, route, url} = (api && !api.url)
			? api
			: DEFAULT_API;

		this.url = url || `${protocol}://${host}:${port}${route}`
	}

	async getInfoByExtension(ext) {
		try {
			const res = await Fetch(`${this.url}/ext/${ext}.json`);
			return await res.json();
		} catch (error) {
			return {error, useMan: true};
		}
	}

	async getInfoByName(filename) {
		try {
			const res = await Fetch(`${this.url}/name/${filename}.json`);
			return await res.json();
		} catch (error) {
			return {error, useMan: true};
		}
	}

	calculateMatchingPercentage(theirArray, ourMap) {
		return (ourMap && theirArray && theirArray[0])
			? theirArray.reduce((p, c) => {
				return p = ourMap[c]
					? p + 1
					: p;
			}, 0) / theirArray.length * 100
			: 0;
	}

	async is(name) {

		const filename = name.toLowerCase();

		// Get path
		const cwd = process.cwd();

		const cwdData = Path.parse(cwd);

		const filePath = Path.join(cwd, filename);

		const [executable,
			readable] = await Promise.all([
			FileSystem.checkExecutable(filePath),
			FileSystem.checkRead(filePath)
		]);

		// Get a list of siblings (both directory and files)

		const [fileStats,
			siblings] = readable
			? await Promise.all([
				FileSystem.status(filePath),
				FileSystem.readdir(cwd)
			])
			: [null, null];

		const siblingsMap = siblings
			? siblings.reduce((map, key) => {
				map[key] = true;
				return map;
			}, {})
			: null;

		// Get the metadata for this file
		const info = await this.getInfoByName(filename);

		const {siblingDirs, siblingFiles} = info.useMan
			? {
				null,
				null
			}
			: info;

		const useMan = info.useMan || FileSystem.isBinaryDirectory(cwdData.name);

		const siblingDirectoryReliability = this.calculateMatchingPercentage(siblingDirs, siblingsMap);

		const siblingFileReliability = this.calculateMatchingPercentage(siblingFiles, siblingsMap);

		return {
			cwd,
			cwdData,
			filePath,
			executable,
			readable,
			fileStats,
			siblings,
			siblingsMap,
			info,
			useMan,
			siblingDirectoryReliability,
			siblingFileReliability
		};
	}
};
