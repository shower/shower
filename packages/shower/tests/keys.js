module.exports = {
	'Body class is switching from `list` to `full` on F5': function (test) {
		test
			.open('themes/ribbon/index.html')
			.sendKeys('body', '\uE035') // F5
			.assert.attr('body', 'class', 'full')
		.done();
	},
	'Body class is switching from `full` to `list` on F5': function (test) {
		test
			.open('themes/ribbon/index.html?full')
			.sendKeys('body', '\uE035') // F5
			.assert.attr('body', 'class', 'list')
		.done();
	},
	// 'Body class is switching from `list` to `full` on Cmd Alt P': function (test) {
	// 	test
	// 		.open('themes/ribbon/index.html')
	// 		.sendKeys('body', '\uE03D\uE00A\u0050') // Cmd Alt P
	// 		.assert.attr('body', 'class', 'full')
	// 	.done();
	// },
	'Body class is switching from `full` to `list` on Esc': function (test) {
		test
			.open('themes/ribbon/index.html?full')
			.sendKeys('body', '\uE00C') // Esc
			.assert.attr('body', 'class', 'list')
		.done();
	},
	'End key works as expected': function (test) {
		test
			.open('themes/ribbon/index.html')
			.sendKeys('body', '\uE010') // End
			.assert.attr('.slide:last-of-type', 'class', 'slide active')
		.done();
	},
	'Home key works as expected': function (test) {
		test
			.open('themes/ribbon/index.html#20')
			.sendKeys('body', '\uE011') // Home
			.assert.attr('.slide:first-of-type', 'class', 'slide active')
		.done();
	},
	'Enter is not opening slide if there’s no current': function (test) {
		test
			.open('themes/ribbon/index.html')
			.sendKeys('body', '\uE007') // Enter
			.assert.attr('body', 'class', 'list')
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