import Blessed from 'blessed';

export default class Terminal {

	constructor(filename, content) {
		const {
			generateScreen,
			generateBox,
			generateFooter,
			getFooterContent,
			update
		} = this;

		const screen = generateScreen();
		screen.title = `WTF is ${filename};`

		const box = generateBox(content);
		box.focus();

		const footer = generateFooter(box, getFooterContent(filename, 1));

		screen.append(box);
		screen.append(footer);

		this.screen = screen;
		this.box = box;
		this.footer = footer;
		this.filename = filename;
		this.content = content;

		update.bind(this)();
	}

	getFooterContent(filename, line) {
		return ` wtf page ${filename} line ${line} (press q to quit) `;
	}

	render() {
		this.screen.render();
	}

	update() {
		const {
			screen,
			box,
			footer,
			getFooterContent,
			filename
		} = this;

		screen.key(['escape', 'q', 'C-c'],
			(ch, key) => {
				return process.exit(0);
			});

		box.key(['up'],
			(ch, key) => {
				box.scroll(-1);
				footer.setContent(getFooterContent(filename, box.getScroll()));
				screen.render();
			});

		box.key(['down'],
			(ch, key) => {
				box.scroll(1);
				footer.setContent(getFooterContent(filename, box.getScroll()));
				screen.render();
			});
	}

	generateBox(content) {
		const box = Blessed.box({
			content,
			scrollable: true,
			alwaysScroll: true
		})

		return box;
	}

	generateScreen() {
		const screen = Blessed.screen({
			smartCSR: true
		});

		return screen;
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
