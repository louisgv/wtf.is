'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getAndPrintData = function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name, api) {
		var wtf, data, useMan, content, term;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						wtf = new _2.default(api);
						_context.next = 4;
						return wtf.is(name);

					case 4:
						data = _context.sent;
						useMan = data.useMan;

						if (!useMan) {
							_context.next = 12;
							break;
						}

						_context.next = 9;
						return _Content2.default.generateManContent(name);

					case 9:
						_context.t0 = _context.sent;
						_context.next = 13;
						break;

					case 12:
						_context.t0 = _Content2.default.generateInfoContent(name, data);

					case 13:
						content = _context.t0;
						term = new _Terminal2.default(name, content);


						term.render();
						_context.next = 24;
						break;

					case 18:
						_context.prev = 18;
						_context.t1 = _context['catch'](0);

						console.log(_chalk2.default.green.bold(name) + ' cannot be found in the database.\nPlease file an investigation issue, or contribute to ' + _chalk2.default.green.bold('wtf.is') + '\'s database!\n The database repo is at ' + _chalk2.default.black.bgWhite.underline('https://github.com/louisgv/wtf-is-db') + '\n' + _chalk2.default.yellow.bold('Papa bless!'));
						console.log('\nAlso, the ' + _chalk2.default.red.bold('error message') + ' below is relevant:\n');
						console.error(_context.t1);
						return _context.abrupt('return', process.exit(1));

					case 24:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 18]]);
	}));

	return function getAndPrintData(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _Terminal = require('./Terminal');

var _Terminal2 = _interopRequireDefault(_Terminal);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCAL_API = {
	protocol: "http",
	host: "localhost",
	port: 5000,
	route: "/"
};

function processFile(name) {
	getAndPrintData(name);
}

function processFileDevMode(name) {
	getAndPrintData(name, LOCAL_API);
}

_commander2.default.version('0.0.1').command('<name>', 'Tell you what that file is').action(processFile);

_commander2.default.command('is <name>').action(processFile);

_commander2.default.command('dis <name>').action(processFileDevMode);

_commander2.default.parse(process.argv);