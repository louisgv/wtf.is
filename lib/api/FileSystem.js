'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileSystem = function () {
	function FileSystem() {
		(0, _classCallCheck3.default)(this, FileSystem);
	}

	(0, _createClass3.default)(FileSystem, null, [{
		key: 'access',
		value: function access(path, mode) {
			return new _promise2.default(function (resolve, reject) {
				_fs2.default.access(path, mode, function (err) {
					resolve(err ? false : true);
				});
			});
		}
	}, {
		key: 'checkExecutable',
		value: function checkExecutable(path) {
			return FileSystem.access(path, _fs2.default.constants.X_OK);
		}
	}, {
		key: 'checkRead',
		value: function checkRead(path) {
			return FileSystem.access(path, _fs2.default.constants.R_OK);
		}
	}, {
		key: 'status',
		value: function status(path) {
			return new _promise2.default(function (resolve, reject) {
				_fs2.default.stat(path, function (err, stats) {
					if (err) {
						return reject({ err: err });
					}
					resolve(stats);
				});
			});
		}
	}, {
		key: 'readdir',
		value: function readdir(path) {
			return new _promise2.default(function (resolve, reject) {
				_fs2.default.readdir(path, function (err, files) {
					if (err) {
						return reject({ err: err });
					}
					resolve(files);
				});
			});
		}
	}, {
		key: 'isBinaryDirectory',
		value: function isBinaryDirectory(name) {
			switch (name) {
				case 'bin':
				case 'sbin':
					return true;
				default:
					return false;
			}
		}
	}]);
	return FileSystem;
}();

exports.default = FileSystem;