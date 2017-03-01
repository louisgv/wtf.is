import Blessed from 'blessed';

export default class TerminalUtils {

	static generateBox(content, screen) {
		const box = Blessed.box({
			content,
			scrollable: true
		})

		const stack = [];

		box.key(['up'],
			(ch, key) => {
				// if (stack.length === 0) {
				// 	return;
				// }
				// box.unshiftLine(stack.pop());
				// if (box.top === 0) {
				// 	return;
				// }
				box.atop++;
				screen.insertTop(stack.pop(),0);
				screen.render();
			});

		box.key(['down'],
			(ch, key) => {
				// if (box.getLines().length === 3) {
				// 	return;
				// }
				stack.push(screen.deleteTop(0,0));
				// box.shiftLine(1);
				screen.render();
			});

		return box;
	}

	static generateScreen() {
		const screen = Blessed.screen({
			smartCSR: true
		});

		screen.key(['escape', 'q', 'C-c'],
			(ch, key) => {
				return process.exit(0);
			});

		screen.key(['down'],
			(ch, key) => {
				// screen.focusOffset(10);
			});

		return screen;
	}

	static generateFootNote(parent) {
		return Blessed.box({
			parent,
			bottom: 0,
			type: "overlay",
			width: "shrink",
			height: "shrink",
			content: "> Press q to quit <",
			style: {
				bg: 'white',
				fg: 'black'
			}
		})
	}
}
