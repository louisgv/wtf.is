'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var getAndPrintData = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filename) {
        var _ref2, info, cwd, cwdData, filePath, fileExist, manInfo, content, term;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _2.default.is(filename);

                    case 3:
                        _ref2 = _context.sent;
                        info = _ref2.info;
                        cwd = _ref2.cwd;
                        cwdData = _ref2.cwdData;
                        filePath = _ref2.filePath;
                        fileExist = _ref2.fileExist;
                        _context.t0 = cwdData.name;
                        _context.next = _context.t0 === 'bin' ? 12 : _context.t0 === 'sbin' ? 12 : 14;
                        break;

                    case 12:
                        info.tryMan = true;
                        return _context.abrupt('break', 14);

                    case 14:
                        if (!(info.tryMan || !fileExist)) {
                            _context.next = 20;
                            break;
                        }

                        _context.next = 17;
                        return getManInfo(filename);

                    case 17:
                        _context.t1 = _context.sent;
                        _context.next = 21;
                        break;

                    case 20:
                        _context.t1 = null;

                    case 21:
                        manInfo = _context.t1;
                        content = manInfo || _Content2.default.generateInfoContent({ filename: filename, info: info, cwd: cwd });
                        term = new _Terminal2.default(filename, content);


                        term.render();
                        _context.next = 32;
                        break;

                    case 27:
                        _context.prev = 27;
                        _context.t2 = _context['catch'](0);

                        console.log(_chalk2.default.green.bold(filename) + ' cannot be found in the database.\nPlease file an investigation issue, or contribute to ' + _chalk2.default.green.bold('wtf.is') + '\'s database!\n The database repo is at ' + _chalk2.default.black.bgWhite.underline('https://github.com/louisgv/wtf-is-db') + '\n' + _chalk2.default.yellow.bold('Papa bless!'));

                        console.error(_context.t2);

                        return _context.abrupt('return', process.exit(1));

                    case 32:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 27]]);
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

var _Terminal = require('./Terminal');

var _Terminal2 = _interopRequireDefault(_Terminal);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getManInfo(filename) {
    return new _promise2.default(function (resolve, reject) {
        _child_process2.default.exec('man ' + filename, function (err, stdout, stderr) {
            if (err || stderr) {
                return reject({ err: err, stderr: stderr });
            }
            resolve(stdout);
        });
    });
}

function processFile(filename) {
    getAndPrintData(filename);
}

_commander2.default.version('0.0.1').command('<filename>', 'Tell you what that file was supposed to do').action(processFile);

_commander2.default.command('is <filename>').action(processFile);

_commander2.default.parse(process.argv);