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

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = {
	PROTOCOL: "http",
	HOST: "localhost",
	PORT: 3000,
	ROUTE: "/"
};

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
								url = API.PROTOCOL + "://" + API.HOST + ":" + API.PORT + API.ROUTE + "/" + filename;
								_context.next = 3;
								return (0, _nodeFetch2.default)(url);

							case 3:
								res = _context.sent;
								_context.next = 6;
								return res.json();

							case 6:
								json = _context.sent;
								return _context.abrupt("return", json);

							case 8:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
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
				var info;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return WTF.getInfo(filename);

							case 2:
								info = _context2.sent;
								return _context2.abrupt("return", info);

							case 4:
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