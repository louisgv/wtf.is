'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log;
// TODO: Instead of the naive console.log, use a scorllable/interactive clid display
function processFile(filename) {

	var resp = _api2.default.is(filename);

	log('\n  ' + _chalk2.default.green(filename) + '\n\n  Usage:\n\n   ' + resp.usage + '\n\n  Description:\n\n   ' + resp.description + '\n    ');
}

_commander2.default.version('0.0.1').command('<filename>', 'Tell you what that file was supposed to do').action(processFile);

_commander2.default.command('is <filename>').action(processFile);

_commander2.default.parse(process.argv);