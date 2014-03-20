module.exports = {
	'Timer is switching to the next slide when finished': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#3')
			.wait(5000)
			.assert.attr('[id="4"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	'Timer becomes Active and switching to the next slide when finished': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#4')
			.sendKeys('body', '\uE012') // Left
			.wait(5000)
			.assert.attr('[id="4"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	'Left Arrow key is skipping timer while it’s not finished': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#3')
			.sendKeys('body', '\uE012') // Left
			.assert.attr('[id="2"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	'Right Arrow key is skipping timer while it’s not finished': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#3')
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="4"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	}
};