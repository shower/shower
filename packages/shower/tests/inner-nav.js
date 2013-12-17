module.exports = {
	// Right
	'Right Arrow key is switching .next to .active': function (test) {
		test
			.open('themes/ribbon/index.html?full#20')
			.sendKeys('body', '\uE014') // Right
			.assert.attr('[id="20"] li:nth-child(2)', 'class', 'next active', 'First .next is .active')
		.done();
	}
};