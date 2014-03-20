module.exports = {
	// --------------------------------
	// F5
	// --------------------------------
	'F5 is switching from List to Full': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.sendKeys('body', '\uE035') // F5
			.assert.attr('body', 'class').to.contain('full', 'Mode is Full')
		.done();
	},
	'F5 is switching from Full to List': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full')
			.sendKeys('body', '\uE035') // F5
			.assert.attr('body', 'class').to.contain('list', 'Mode is List')
		.done();
	},
	// --------------------------------
	// Cmd Alt P
	// --------------------------------
	'Cmd Alt P keys are switching from List to Full': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.sendKeys('body', '\uE03D\uE00A\u0070') // Cmd Alt P
			.assert.attr('body', 'class').to.contain('full', 'Mode is Full')
		.done();
	},
	'Cmd Alt P keys are not switching from Full to List': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE03D\uE00A\u0070') // Cmd Alt P
			.assert.attr('body', 'class').to.contain('full', 'Mode is Full')
		.done();
	},
	// --------------------------------
	// Esc
	// --------------------------------
	'Esc is switching from Full to List': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE00C') // Esc
			.assert.attr('body', 'class').to.contain('list', 'Mode is List')
		.done();
	},
	// --------------------------------
	// Left
	// --------------------------------
	'Left Arrow key is switching to the previous slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#2')
			.sendKeys('body', '\uE012') // Left
			.assert.attr('[id="1"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	// --------------------------------
	// Right
	// --------------------------------
	'Right Arrow key is switching to the next slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	// --------------------------------
	// Up
	// --------------------------------
	'Up Arrow key is switching to the previous slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#2')
			.sendKeys('body', '\uE013') // Up
			.assert.attr('[id="1"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	// --------------------------------
	// Down
	// --------------------------------
	'Down Arrow key is switching to the next slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE015') // Down
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	// --------------------------------
	// H
	// --------------------------------
	'H key is switching to the previous slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#2')
			.sendKeys('body', '\u0068') // H
			.assert.attr('[id="1"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	// --------------------------------
	// K
	// --------------------------------
	'K key is switching to the previous slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#2')
			.sendKeys('body', '\u006B') // K
			.assert.attr('[id="1"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	// --------------------------------
	// J
	// --------------------------------
	'J key is switching to the next slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\u006A') // J
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	// --------------------------------
	// L
	// --------------------------------
	'L key is switching to the next slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\u006C') // L
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	// --------------------------------
	// Space
	// --------------------------------
	'Space key is switching to the next slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE00D') // Space
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	'Shift Space keys are switching to the previous slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#2')
			.sendKeys('body', '\uE008\uE00D') // Shift Space
			.assert.attr('[id="1"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	// --------------------------------
	// Tab
	// --------------------------------
	'Dumb': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
		.done();
	},
	'Tab key is switching to the next slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE004') // Tab
			// Not sure why it’s failing. It works fine manually
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	'Dumb': function (test) {
		test
			.open('about:blank')
		.done();
	},
	'Shift Tab keys are switching to the previous slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#2')
			.sendKeys('body', '\uE008\uE004') // Shift Tab
			// Not sure why it’s failing. It works fine manually
			.assert.attr('[id="1"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	// --------------------------------
	// PageUp
	// --------------------------------
	'PageUp key is switching to the previous slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#2')
			.sendKeys('body', '\uE00E') // PageUp
			.assert.attr('[id="1"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	// --------------------------------
	// PageDown
	// --------------------------------
	'PageDown key is switching to the next slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE00F') // PageDown
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	// --------------------------------
	// Home
	// --------------------------------
	'Home key select the first slide in List mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.sendKeys('body', '\uE011') // Home
			// Failing unlike next one with current slide
			.assert.attr('[id="1"]', 'class').to.contain('active', 'First slide is active')
		.done();
	},
	'Home key select the first slide in List mode (with current)': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/#5')
			.sendKeys('body', '\uE011') // Home
			.assert.attr('[id="1"]', 'class').to.contain('active', 'First slide is active')
		.done();
	},
	'Home key select the first slide in Full mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#5')
			.sendKeys('body', '\uE011') // Home
			.assert.attr('[id="1"]', 'class').to.contain('active', 'First slide is active')
		.done();
	},
	// --------------------------------
	// End
	// --------------------------------
	'End key select the last slide in List mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.sendKeys('body', '\uE010') // End
			// Failing unlike next one with current slide
			.assert.attr('[id="6"]', 'class').to.contain('active', 'Last slide is active')
		.done();
	},
	'End key select the last slide in List mode (with current)': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/#1')
			.sendKeys('body', '\uE010') // End
			.assert.attr('[id="6"]', 'class').to.contain('active', 'Last slide is active')
		.done();
	},
	'End key select the last slide in Full mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE010') // End
			.assert.attr('[id="6"]', 'class').to.contain('active', 'Last slide is active')
		.done();
	},
	// --------------------------------
	// Enter
	// --------------------------------
	'Enter is opening current slide': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/#1')
			.sendKeys('body', '\uE007') // Enter
			.assert.attr('body', 'class', 'full', 'Full mode')
			.assert.attr('[id="1"]', 'class').to.contain('active', 'First slide is active')
		.done();
	},
	'Enter is not opening any slide if there’s no current': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.sendKeys('body', '\uE007') // Enter
			.assert.attr('body', 'class', 'list', 'Mode is List')
		.done();
	}
};