'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TerminalUils = function () {
	function TerminalUils() {
		(0, _classCallCheck3.default)(this, TerminalUils);
	}

	(0, _createClass3.default)(TerminalUils, null, [{
		key: 'generateBox',
		value: function generateBox(content, screen) {
			var box = _blessed2.default.box({
				content: content,
				scrollable: true
			});

			var stack = [];

			box.key(['up'], function (ch, key) {
				// if (stack.length === 0) {
				// 	return;
				// }
				// box.unshiftLine(stack.pop());
				// if (box.top === 0) {
				// 	return;
				// }
				screen.insertTop("HOLA wqf", 0);
				screen.render();
			});

			box.key(['down'], function (ch, key) {
				// if (box.getLines().length === 3) {
				// 	return;
				// }
				// stack.push(box.getBaseLine(0));
				// box.shiftLine(1);

				screen.deleteTop(0, 0);
				screen.render();
			});

			return box;
		}
	}, {
		key: 'generateScreen',
		value: function generateScreen() {
			var screen = _blessed2.default.screen({
				smartCSR: true
			});

			screen.key(['escape', 'q', 'C-c'], function (ch, key) {
				return process.exit(0);
			});

			screen.key(['down'], function (ch, key) {
				// screen.focusOffset(10);
			});

			return screen;
		}
	}, {
		key: 'generateFootNote',
		value: function generateFootNote(parent) {
			return _blessed2.default.box({
				parent: parent,
				bottom: 0,
				type: "overlay",
				width: "shrink",
				height: "shrink",
				content: "> Press q to quit <",
				style: {
					bg: 'white',
					fg: 'black'
				}
			});
		}
	}]);
	return TerminalUils;
}();

exports.default = TerminalUils;