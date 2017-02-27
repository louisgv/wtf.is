'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getAndPrintData = function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filename) {
		var resp, content, screen, box, footnote;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _2.default.is(filename);

					case 3:
						resp = _context.sent;
						content = '\n\t  ' + _chalk2.default.green(filename) + '\n\n\t  Usage:\n\n\t   ' + resp.usage + '\n\n\t  Description:\n\n\t   ' + resp.description + '\n\n\t  Applications:\n' + resp.applications.reduce(function (p, c) {
							return p + ('\n\t   ' + c.name + '\n\t   ' + c.description + '\n      ');
						}, "");
						screen = _TerminalUtils2.default.generateScreen();


						screen.title = 'WTF is ' + filename + ';';

						box = _TerminalUtils2.default.generateBox(content, screen);


						box.focus();

						footnote = _TerminalUtils2.default.generateFootNote(box);


						screen.append(box);

						screen.append(footnote);

						screen.render();
						_context.next = 19;
						break;

					case 15:
						_context.prev = 15;
						_context.t0 = _context['catch'](0);

						console.error(_context.t0);
						return _context.abrupt('return', process.exit(1));

					case 19:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 15]]);
	}));

	return function getAndPrintData(_x) {
		return _ref.apply(this, arguments);
	};
}();

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _TerminalUtils = require('./TerminalUtils');

var _TerminalUtils2 = _interopRequireDefault(_TerminalUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processFile(filename) {
	getAndPrintData(filename);
}

_commander2.default.version('0.0.1').command('<filename>', 'Tell you what that file was supposed to do').action(processFile);

_commander2.default.command('is <filename>').action(processFile);

_commander2.default.parse(process.argv);