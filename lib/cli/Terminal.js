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

var Terminal = function () {
	function Terminal(filename, content) {
		(0, _classCallCheck3.default)(this, Terminal);
		var generateScreen = this.generateScreen,
		    generateBox = this.generateBox,
		    generateFooter = this.generateFooter,
		    getFooterContent = this.getFooterContent,
		    update = this.update;


		var screen = generateScreen();
		screen.title = 'WTF is ' + filename + ';';

		var box = generateBox(content);
		box.focus();

		var footer = generateFooter(box, getFooterContent(filename, 1));

		screen.append(box);
		screen.append(footer);

		this.screen = screen;
		this.box = box;
		this.footer = footer;
		this.filename = filename;
		this.content = content;

		update.bind(this)();
	}

	(0, _createClass3.default)(Terminal, [{
		key: 'getFooterContent',
		value: function getFooterContent(filename, line) {
			return ' wtf page ' + filename + ' line ' + line + ' (press q to quit) ';
		}
	}, {
		key: 'render',
		value: function render() {
			this.screen.render();
		}
	}, {
		key: 'update',
		value: function update() {
			var screen = this.screen,
			    box = this.box,
			    footer = this.footer,
			    getFooterContent = this.getFooterContent,
			    filename = this.filename;


			screen.key(['escape', 'q', 'C-c'], function (ch, key) {
				return process.exit(0);
			});

			box.key(['up'], function (ch, key) {
				box.scroll(-1);
				footer.setContent(getFooterContent(filename, box.getScroll()));
				screen.render();
			});

			box.key(['down'], function (ch, key) {
				box.scroll(1);
				footer.setContent(getFooterContent(filename, box.getScroll()));
				screen.render();
			});
		}
	}, {
		key: 'generateBox',
		value: function generateBox(content) {
			var box = _blessed2.default.box({
				content: content,
				scrollable: true,
				alwaysScroll: true
			});

			return box;
		}
	}, {
		key: 'generateScreen',
		value: function generateScreen() {
			var screen = _blessed2.default.screen({
				smartCSR: true
			});

			return screen;
		}
	}, {
		key: 'generateFooter',
		value: function generateFooter(parent, content) {
			return _blessed2.default.box({
				parent: parent,
				content: content,
				bottom: 0,
				type: "overlay",
				width: "shrink",
				height: "shrink",
				style: {
					bg: 'white',
					fg: 'black'
				}
			});
		}
	}]);
	return Terminal;
}();

exports.default = Terminal;