"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = {
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

var WTF = function () {
	function WTF() {
		(0, _classCallCheck3.default)(this, WTF);
	}

	(0, _createClass3.default)(WTF, null, [{
		key: "getInfo",
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filename) {
				var url, res, json;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								url = API.PROTOCOL + "://" + API.HOST + ":" + API.PORT + API.ROUTE + "/" + filename + ".json";
								_context.next = 4;
								return (0, _nodeFetch2.default)(url);

							case 4:
								res = _context.sent;
								_context.next = 7;
								return res.json();

							case 7:
								json = _context.sent;
								return _context.abrupt("return", json);

							case 11:
								_context.prev = 11;
								_context.t0 = _context["catch"](0);
								return _context.abrupt("return", _context.t0);

							case 14:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 11]]);
			}));

			function getInfo(_x) {
				return _ref.apply(this, arguments);
			}

			return getInfo;
		}()
	}, {
		key: "is",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(filename) {
				var cwd, cwdData, filePath, fileExist, fileStats, siblings, info;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								// Get path
								cwd = process.cwd();
								cwdData = _path2.default.parse(cwd);
								filePath = _path2.default.join(cwd, filename);
								fileExist = _fs2.default.existsSync(filePath);
								fileStats = false && fileExist ? _fs2.default.lstatSync(filePath) : null;

								// Get a list of siblings (both directory and files)

								siblings = fileExist ? _fs2.default.readdirSync(cwd) : null;

								// Get the metadata for this file

								_context2.next = 8;
								return WTF.getInfo(filename);

							case 8:
								info = _context2.sent;


								// TODO: If 50% of sibling directory doesn't
								// match data.siblingDirs, role up a FLAG for unreliable directory structure.
								if (siblings) {}
								// TODO: Get a list of sibling files

								// TODO: If 50% of sibling files doesn't
								// match data.siblingDirs, role up a FLAG for unreliable file structure.

								// TODO: Get filesize

								// TODO: If file size is bigger than data.maxSize,
								// roll up a FLAG for unconventional file

								// TODO: If the filesize is smaller than data.minSize,
								// roll up a FLAG for unconventional file

								return _context2.abrupt("return", {
									info: info,
									cwd: cwd,
									cwdData: cwdData,
									filePath: filePath,
									fileExist: fileExist
								});

							case 11:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function is(_x2) {
				return _ref2.apply(this, arguments);
			}

			return is;
		}()
	}]);
	return WTF;
}();

exports.default = WTF;
;