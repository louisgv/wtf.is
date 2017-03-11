import fs from 'fs';

export default class FileSystem {

	static access(path, mode) {
		return new Promise((resolve, reject) => {
			fs.access(path, mode, (err) => {
				resolve(err
					? false
					: true);
			})
		});
	}

	static checkExecutable(path) {
		return FileSystem.access(path, fs.constants.X_OK);
	}

	static checkRead(path) {
		return FileSystem.access(path, fs.constants.R_OK);
	}

	static status(path) {
		return new Promise((resolve, reject) => {
			fs.stat(path, (err, stats) => {
				if (err) {
					return reject({err});
				}
				resolve(stats);
			})
		});
	}

	static readdir(path) {
		return new Promise((resolve, reject) => {
			fs.readdir(path, (err, files) => {
				if (err) {
					return reject({err});
				}
				resolve(files);
			})
		});
	}

	static isBinaryDirectory(name) {
		switch (name) {
			case 'bin':
			case 'sbin':
				return true;
			default:
				return false;
		}
	}

}
