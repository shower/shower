module.exports = {
	// --------------------------------
	// Click
	// --------------------------------
	'Click on slide is switching from List to Full': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.click('[id="1"]')
			.assert.attr('body', 'class').to.contain('full', 'Mode is Full')
		.done();
	},
	// --------------------------------
	// Walking
	// --------------------------------
	'All slides could be switched from first to last in List mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/#1')
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="6"]', 'class').to.contain('active', 'Last slide is Active')
		.done();
	},
	'All slides could be switched from last to first in List mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/#6')
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.assert.attr('[id="1"]', 'class').to.contain('active', 'First slide is Active')
		.done();
	},
	'All slides could be switched from first to last in Full mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#1')
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="6"]', 'class').to.contain('active', 'Last slide is Active')
		.done();
	},
	'All slides could be switched from last to first in Full mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#6')
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.assert.attr('[id="1"]', 'class').to.contain('active', 'First slide is Active')
		.done();
	},
	// --------------------------------
	// Back
	// --------------------------------
	'Back is switching from Full to List': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.click('[id="1"]')
			.back()
			.assert.attr('body', 'class').to.contain('list', 'Mode is List')
		.done();
	},
	// --------------------------------
	// Zoom
	// --------------------------------
	'Back from Full to List is restoring scale': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/')
			.click('[id="1"]')
			.back()
			.assert.attr('body', 'style').to.contain('none', 'Scale is restored')
		.done();
	}
};