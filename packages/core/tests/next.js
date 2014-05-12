// -------------------------------
// Through Nexts to the next slide
// -------------------------------
casper.test.begin('Through Nav to next slide', 4, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#5').then(function() {

		this.sendKeys('body', casper.page.event.key.Right);
		this.sendKeys('body', casper.page.event.key.Right);
		this.sendKeys('body', casper.page.event.key.Right);

	}).then(function() {

		test.assertExists('[id="5"].active', 'Slide #5 is active');
		test.assertUrlMatch(/\/\?full#5/, 'Slide #5 in Full mode URL');

	}).then(function() {

		this.sendKeys('body', casper.page.event.key.Right);

	}).then(function() {

		test.assertExists('[id="6"].active', 'Slide #6 is active');
		test.assertUrlMatch(/\/\?full#6/, 'Slide #6 in Full mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// UNDER CONSTRUCTION
// -------------------------------
// casper.test.begin('Resetting Nexts by reload', 0, function suite(test) {
// 	casper.start('http://0.0.0.0:7497/tests/?full#5', function() {

// 		this.sendKeys('body', casper.page.event.key.Right);
// 		this.sendKeys('body', casper.page.event.key.Right);
// 		this.reload();

// 		test.assertDoesntExist('.next.active', 'No active Next items on slide #5');

// 	}).run(function() {
// 		this.clear();
// 		test.done();
// 	});
// });