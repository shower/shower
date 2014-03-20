module.exports = {
	'Navigation doesn’t work in List mode': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/#5')
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="6"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	'Right Arrow key is switching first Next item to Active': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#5')
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="5"] .next:first-of-type', 'class').to.contain('active', 'First Next item is Active')
		.done();
	},
	'Left Arrow key is switching Active items back to Next': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#5')
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE012') // Left
			.sendKeys('body', '\uE012') // Left
			.assert.numberOfElements('[id="5"] .next.active', 0, 'There are no Active items')
		.done();
	},
	'Right Arrow key is switching to next slide once all Next items becomes Active': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#5')
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="6"]', 'class').to.contain('active', 'Next slide is Active')
		.done();
	},
	'Left Arrow key is switching to previous slide when all Next items becomes Active': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#5')
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE014') // Right
			.sendKeys('body', '\uE012') // Left
			.assert.attr('[id="4"]', 'class').to.contain('active', 'Previous slide is Active')
		.done();
	},
	'Reload reset navigation': function (test) {
		test
			.open('http://0.0.0.0:7497/tests/?full#5')
			.sendKeys('body', '\uE014') // Right
			.reload()
			.assert.numberOfElements('[id="5"] .next.active', 0, 'There are no Active items')
		.done();
	}
};