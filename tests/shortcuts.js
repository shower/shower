module.exports = {
	'Body class is switching from `list` to `full` on F5': function (test) {
		test
			.open('themes/ribbon/index.html')
			.sendKeys('body', '\uE035') // F5
			.assert.attr('body', 'class', 'full', 'Mode is full')
		.done();
	},
	// F5
	'Body class is switching from `full` to `list` on F5': function (test) {
		test
			.open('themes/ribbon/index.html?full')
			.sendKeys('body', '\uE035') // F5
			.assert.attr('body', 'class', 'list', 'Mode is list')
		.done();
	},
	// Cmd Alt P — how to test multiple keys?
	// 'Body class is switching from `list` to `full` on Cmd Alt P': function (test) {
	// 	test
	// 		.open('themes/ribbon/index.html')
	// 		.sendKeys('body', '\uE03D\uE00A\u0050') // Cmd Alt P
	// 		.assert.attr('body', 'class', 'full')
	// 	.done();
	// },
	// Esc
	'Body class is switching from `full` to `list` on Esc': function (test) {
		test
			.open('themes/ribbon/index.html?full')
			.sendKeys('body', '\uE00C') // Esc
			.assert.attr('body', 'class', 'list', 'Mode is list')
		.done();
	},
	// End
	'End key select the last slide': function (test) {
		test
			.open('themes/ribbon/index.html')
			.sendKeys('body', '\uE010') // End
			.assert.attr('.slide:last-of-type', 'class', 'slide active', 'Last slide is active')
		.done();
	},
	// Home
	'Home key select the first slide': function (test) {
		test
			.open('themes/ribbon/index.html#20')
			.sendKeys('body', '\uE011') // Home
			.assert.attr('.slide:first-of-type', 'class', 'slide active', 'First slide is active')
		.done();
	},
	// Enter
	'Enter is opening current slide': function (test) {
		test
			.open('themes/ribbon/index.html#1')
			.sendKeys('body', '\uE007') // Enter
			.assert.attr('body', 'class', 'full', 'Full mode')
			.assert.attr('[id="1"]', 'class', 'slide active', 'Slide #1 is active')
		.done();
	},
	// Enter
	'Enter is not opening any slide if there’s no current': function (test) {
		test
			.open('themes/ribbon/index.html')
			.sendKeys('body', '\uE007') // Enter
			.assert.attr('body', 'class', 'list', 'Mode is list')
		.done();
	}
	// uE004 Tab
	// uE008 Shift
	// uE00D Space
	// uE00E PageUp
	// uE00F PageDown
	// uE012 Left
	// uE013 Up
	// uE014 Right
	// uE015 Down
};