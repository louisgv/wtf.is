import Blessed from 'blessed';

export default class Terminal {

	constructor(filename, content) {
		const {
			generateScreen,
			generateBody,
			generateFooter,
			generateHeader,
			getFooterContent,
			update
		} = this;

		const screen = generateScreen();
		screen.title = `WTF is ${filename}`;

		const body = generateBody(content);
		body.focus();

		const {header} = generateHeader(body, `What the fuck is ${filename}?`, `${filename}(1)`);
		const footer = generateFooter(body, getFooterContent(filename, 1, 0));

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

	getFooterContent(filename, line, scrollPercentage) {
		const percentText = scrollPercentage === 100 ? '(END)' : `${scrollPercentage.toFixed(2)}%`;
		return ` WTF is ${filename} line ${line} ${percentText} (press q to quit) `;
	}

	render() {
		this
			.screen
			.render();
	}

	update() {
		const {screen, body, footer, getFooterContent, filename} = this;

		screen.key([
			'escape', 'q', 'C-c'
		], (ch, key) => {
			return process.exit(0);
		});

		body.key(['up'], (ch, key) => {
			const scrollPercentage = body.getScrollPerc();
			if (scrollPercentage === 0) {
				return;
			}
			body.scroll(-1);
			this.scrollAmount--;
			footer.setContent(getFooterContent(filename, this.scrollAmount, body.getScrollPerc()));
			screen.render();
		});

		body.key(['down'], (ch, key) => {
			const scrollPercentage = body.getScrollPerc();
			if (scrollPercentage === 100) {
				return;
			}
			body.scroll(1);
			this.scrollAmount++;
			footer.setContent(getFooterContent(filename, this.scrollAmount, body.getScrollPerc()));
			screen.render();
		});
	}

	generateBody(content) {
		return Blessed.box({content, scrollable: true, alwaysScroll: true})
	}

	generateScreen() {
		return Blessed.screen({smartCSR: true, autoPadding: true, tabSize: 8});
	}

	generateHeader(parent, title, filename) {
		const content = filename.toUpperCase();
		const header = Blessed.box({parent: parent, content: `{center}${title}{/center}`, tags: true, height: "54"})
		const leftText = Blessed.text({parent: header, content, left: 0})
		const rightText = Blessed.text({parent: header, content, right: 0})
		return {header, leftText, rightText};
	}

	generateFooter(parent, content) {
		return Blessed.box({
			parent,
			content,
			bottom: 0,
			type: "overlay",
			width: "shrink",
			height: "shrink",
			style: {
				bg: 'white',
				fg: 'black'
			}
		})
	}
}
