'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getAndPrintData = function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filename) {
		var resp, content, term, sbuf, tbuf;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _2.default.is(filename);

					case 3:
						resp = _context.sent;
						content = '\n  ' + _chalk2.default.green(filename) + '\n\n  Usage:\n\n    ' + resp.usage + '\n\n  Description:\n\n    ' + resp.description + '\n\n\tApplications:\n' + resp.applications.reduce(function (p, c) {
							return p + ('\n    ' + c.name + '\n    ' + c.description + '\n');
						}, "");
						term = _terminalKit2.default.realTerminal;


						term.fullscreen(true);

						term.grabInput({
							mouse: 'button'
						});

						sbuf = _terminalKit2.default.ScreenBuffer.create({
							dst: term
						});
						tbuf = _terminalKit2.default.TextBuffer.create({
							dst: sbuf
						});


						term.on('key', function (name, matches, data) {
							// console.log("'key' event:", name);
							if (name === 'CTRL_C') {
								term.grabInput(false);
								setTimeout(function () {
									process.exit();
								}, 100);
							}
							if (name === 'UP') {
								tbuf.move(0, -1);
							}
							if (name === 'DOWN') {
								tbuf.move(0, 1);
							}
						});

						tbuf.setText(content);

						tbuf.draw();

						sbuf.draw();

						// term(content);

						// const screen = TerminalUtils.generateScreen();
						//
						// screen.title = `WTF is ${filename};`
						//
						// const box = TerminalUtils.generateBox(content, screen);
						//
						// box.focus();
						//
						// const footnote = TerminalUtils.generateFootNote(box);
						//
						// screen.append(box);
						//
						// screen.append(footnote);
						//
						// screen.render();
						_context.next = 20;
						break;

					case 16:
						_context.prev = 16;
						_context.t0 = _context['catch'](0);

						console.error(_context.t0);
						return _context.abrupt('return', process.exit(1));

					case 20:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 16]]);
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

var _terminalKit = require('terminal-kit');

var _terminalKit2 = _interopRequireDefault(_terminalKit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processFile(filename) {
	getAndPrintData(filename);
}

_commander2.default.version('0.0.1').command('<filename>', 'Tell you what that file was supposed to do').action(processFile);

_commander2.default.command('is <filename>').action(processFile);

_commander2.default.parse(process.argv);