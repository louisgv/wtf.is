"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _FileSystem = require("./FileSystem");

var _FileSystem2 = _interopRequireDefault(_FileSystem);

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://raw.githubusercontent.com/louisgv/wtf-is-db/master/name/package.json
var DEFAULT_API = {
	protocol: "https",
	host: "raw.githubusercontent.com",
	port: 443,
	route: "/louisgv/wtf-is-db/master/"
};

var WTF = function () {
	function WTF(api) {
		(0, _classCallCheck3.default)(this, WTF);

		var _ref = api && !api.url ? api : DEFAULT_API,
		    protocol = _ref.protocol,
		    host = _ref.host,
		    port = _ref.port,
		    route = _ref.route,
		    url = _ref.url;

		this.url = url || protocol + "://" + host + ":" + port + route;
	}

	(0, _createClass3.default)(WTF, [{
		key: "getInfoByExtension",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ext) {
				var res;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return (0, _nodeFetch2.default)(this.url + "/ext/" + ext + ".json");

							case 3:
								res = _context.sent;
								return _context.abrupt("return", res.json());

							case 7:
								_context.prev = 7;
								_context.t0 = _context["catch"](0);
								return _context.abrupt("return", _context.t0);

							case 10:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 7]]);
			}));

			function getInfoByExtension(_x) {
				return _ref2.apply(this, arguments);
			}

			return getInfoByExtension;
		}()
	}, {
		key: "getInfoByName",
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(filename) {
				var res;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								_context2.next = 3;
								return (0, _nodeFetch2.default)(this.url + "/name/" + filename + ".json");

							case 3:
								res = _context2.sent;
								return _context2.abrupt("return", res.json());

							case 7:
								_context2.prev = 7;
								_context2.t0 = _context2["catch"](0);
								return _context2.abrupt("return", _context2.t0);

							case 10:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this, [[0, 7]]);
			}));

			function getInfoByName(_x2) {
				return _ref3.apply(this, arguments);
			}

			return getInfoByName;
		}()
	}, {
		key: "calculateMatchingPercentage",
		value: function calculateMatchingPercentage(theirArray, ourMap) {
			return theirArray.reduce(function (p, c) {
				return p = ourMap[c] ? p + 1 : p;
			}, 0) / theirArray.length * 100;
		}
	}, {
		key: "is",
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(filename) {
				var cwd, cwdData, filePath, _ref5, _ref6, executable, readable, _ref7, _ref8, fileStats, siblings, siblingsMap, info, _ref9, siblingDirs, siblingFiles, useMan, siblingDirectoryReliability, siblingFileReliability;

				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								// Get path
								cwd = process.cwd();
								cwdData = _path2.default.parse(cwd);
								filePath = _path2.default.join(cwd, filename);
								_context3.next = 5;
								return _promise2.default.all([_FileSystem2.default.checkExecutable(filePath), _FileSystem2.default.checkRead(filePath)]);

							case 5:
								_ref5 = _context3.sent;
								_ref6 = (0, _slicedToArray3.default)(_ref5, 2);
								executable = _ref6[0];
								readable = _ref6[1];

								if (!readable) {
									_context3.next = 15;
									break;
								}

								_context3.next = 12;
								return _promise2.default.all([_FileSystem2.default.status(filePath), _FileSystem2.default.readdir(cwd)]);

							case 12:
								_context3.t0 = _context3.sent;
								_context3.next = 16;
								break;

							case 15:
								_context3.t0 = [null, null];

							case 16:
								_ref7 = _context3.t0;
								_ref8 = (0, _slicedToArray3.default)(_ref7, 2);
								fileStats = _ref8[0];
								siblings = _ref8[1];
								siblingsMap = siblings ? siblings.reduce(function (map, key) {
									map[key] = true;
									return map;
								}, {}) : null;

								// Get the metadata for this file

								if (!fileStats) {
									_context3.next = 27;
									break;
								}

								_context3.next = 24;
								return this.getInfoByName(filename);

							case 24:
								_context3.t1 = _context3.sent;
								_context3.next = 28;
								break;

							case 27:
								_context3.t1 = {
									useMan: true
								};

							case 28:
								info = _context3.t1;
								_ref9 = info.useMan ? (0, _defineProperty3.default)({
									null: null
								}, "null", null) : info, siblingDirs = _ref9.siblingDirs, siblingFiles = _ref9.siblingFiles;
								useMan = info.useMan || !readable || _FileSystem2.default.isBinaryDirectory(cwdData.name);
								siblingDirectoryReliability = siblingDirs ? this.calculateMatchingPercentage(siblingDirs, siblingsMap) : 0;
								siblingFileReliability = siblingFiles ? this.calculateMatchingPercentage(siblingFiles, siblingsMap) : 0;
								return _context3.abrupt("return", {
									cwd: cwd,
									cwdData: cwdData,
									filePath: filePath,
									executable: executable,
									readable: readable,
									fileStats: fileStats,
									siblings: siblings,
									siblingsMap: siblingsMap,
									info: info,
									useMan: useMan,
									siblingDirectoryReliability: siblingDirectoryReliability,
									siblingFileReliability: siblingFileReliability
								});

							case 34:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function is(_x3) {
				return _ref4.apply(this, arguments);
			}

			return is;
		}()
	}]);
	return WTF;
}();

exports.default = WTF;
;