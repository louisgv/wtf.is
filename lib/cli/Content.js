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

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = function () {
	function Content() {
		(0, _classCallCheck3.default)(this, Content);
	}

	(0, _createClass3.default)(Content, null, [{
		key: 'generateManContent',
		value: function generateManContent(filename) {
			return new _promise2.default(function (resolve, reject) {
				_child_process2.default.exec('man ' + filename, function (err, stdout, stderr) {
					if (err || stderr) {
						return reject({ err: err, stderr: stderr });
					}
					resolve(stdout);
				});
			});
		}
	}, {
		key: 'generateApplicationList',
		value: function generateApplicationList(filename, _ref) {
			var info = _ref.info;

			if (!info.applications) {
				return "";
			}
			return '' + _chalk2.default.bold("APPLICATIONS") + info.applications.reduce(function (p, c) {
				return p + ('\n\t\t' + _chalk2.default.green(c.name) + '\n\t\t' + c.description + '\n');
			}, "");
		}
	}, {
		key: 'generateStatContent',
		value: function generateStatContent(filename, _ref2) {
			var fileStats = _ref2.fileStats,
			    siblingDirectoryReliability = _ref2.siblingDirectoryReliability,
			    siblingFileReliability = _ref2.siblingFileReliability;

			return _chalk2.default.bold("STATISTIC") + '\n\t\tStandard sibling directory matches: ' + _chalk2.default.bold(siblingDirectoryReliability) + '%\n\t\t' + (siblingDirectoryReliability > 50 ? _chalk2.default.green("Sibling directory structure is", _chalk2.default.bold("RELIABLE")) : _chalk2.default.red("Sibling directory structure is", _chalk2.default.bold("UNRELIABLE"), "or", _chalk2.default.bold("NONSTANDARD"))) + '\n\n\t\tStandard sibling file matches: ' + _chalk2.default.bold(siblingFileReliability) + '%\n\t\t' + (siblingFileReliability > 50 ? _chalk2.default.green("Sibling files structure is", _chalk2.default.bold("RELIABLE")) : _chalk2.default.red("Sibling file structure is", _chalk2.default.bold("UNRELIABLE"), "or", _chalk2.default.bold("NONSTANDARD")));
		}
	}, {
		key: 'generateNameContent',
		value: function generateNameContent(filename, _ref3) {
			var cwd = _ref3.cwd;

			return _chalk2.default.bold("NAME") + '\n\t\t' + _chalk2.default.green.bold(filename) + '\n\t\t' + _chalk2.default.yellow(cwd);
		}
	}, {
		key: 'generateDescContent',
		value: function generateDescContent(filename, _ref4) {
			var info = _ref4.info;

			return _chalk2.default.bold("DESCRIPTION") + '\n\t\t' + info.description;
		}
	}, {
		key: 'generateUsgContent',
		value: function generateUsgContent(filename, _ref5) {
			var info = _ref5.info;

			return _chalk2.default.bold("USAGE") + '\n\t\t' + info.usage;
		}
	}, {
		key: 'generateInfoContent',
		value: function generateInfoContent(filename, data) {

			// TODO: If file size is bigger than info.maxSize, roll up a FLAG for unconventional file

			// TODO: If the filesize is smaller than info.minSize, roll up a FLAG for unconventional
			// file

			return '\n\n' + Content.generateNameContent(filename, data) + '\n\n' + Content.generateStatContent(filename, data) + '\n\n' + Content.generateDescContent(filename, data) + '\n\n' + Content.generateUsgContent(filename, data) + '\n\n' + Content.generateApplicationList(filename, data) + '\n\n\n';
		}
	}]);
	return Content;
}();

exports.default = Content;