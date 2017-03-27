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
		    generateBody = this.generateBody,
		    generateFooter = this.generateFooter,
		    generateHeader = this.generateHeader,
		    getFooterContent = this.getFooterContent,
		    update = this.update;


		var screen = generateScreen();
		screen.title = 'WTF is ' + filename;

		var body = generateBody(content);
		body.focus();

		var _generateHeader = generateHeader(body, 'What the fuck is ' + filename + '?', filename + '(1)'),
		    header = _generateHeader.header;

		var footer = generateFooter(body, getFooterContent(filename, 1, 0));

		screen.append(body);
		screen.append(header);
		screen.append(footer);

		this.screen = screen;
		this.body = body;
		this.header = header;
		this.footer = footer;
		this.filename = filename;
		this.content = content;
		this.scrollAmount = 1;

		update.bind(this)();
	}

	(0, _createClass3.default)(Terminal, [{
		key: 'getFooterContent',
		value: function getFooterContent(filename, line, scrollPercentage) {
			var percentText = scrollPercentage === 100 ? '(END)' : scrollPercentage.toFixed(2) + '%';
			return ' WTF is ' + filename + ' line ' + line + ' ' + percentText + ' (press q to quit) ';
		}
	}, {
		key: 'render',
		value: function render() {
			this.screen.render();
		}
	}, {
		key: 'update',
		value: function update() {
			var _this = this;

			var screen = this.screen,
			    body = this.body,
			    footer = this.footer,
			    getFooterContent = this.getFooterContent,
			    filename = this.filename;


			screen.key(['escape', 'q', 'C-c'], function (ch, key) {
				return process.exit(0);
			});

			body.key(['up'], function (ch, key) {
				var scrollPercentage = body.getScrollPerc();
				if (scrollPercentage === 0) {
					return;
				}
				body.scroll(-1);
				_this.scrollAmount--;
				footer.setContent(getFooterContent(filename, _this.scrollAmount, body.getScrollPerc()));
				screen.render();
			});

			body.key(['down'], function (ch, key) {
				var scrollPercentage = body.getScrollPerc();
				if (scrollPercentage === 100) {
					return;
				}
				body.scroll(1);

				var newScrollPercentage = body.getScrollPerc();
				if (newScrollPercentage === 0) {
					return;
				}

				_this.scrollAmount++;
				footer.setContent(getFooterContent(filename, _this.scrollAmount, newScrollPercentage));
				screen.render();
			});
		}
	}, {
		key: 'generateBody',
		value: function generateBody(content) {
			return _blessed2.default.box({ content: content, scrollable: true, alwaysScroll: true });
		}
	}, {
		key: 'generateScreen',
		value: function generateScreen() {
			return _blessed2.default.screen({ smartCSR: true, autoPadding: true, tabSize: 8 });
		}
	}, {
		key: 'generateHeader',
		value: function generateHeader(parent, title, filename) {
			var content = filename.toUpperCase();
			var header = _blessed2.default.box({
				parent: parent,
				content: '{center}' + title + '{/center}',
				tags: true,
				height: 1
			});
			var leftText = _blessed2.default.text({ parent: header, content: content, left: 0 });
			var rightText = _blessed2.default.text({ parent: header, content: content, right: 0 });
			return { header: header, leftText: leftText, rightText: rightText };
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