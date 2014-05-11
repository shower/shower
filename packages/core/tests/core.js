// -------------------------------
// Slides state on loading
// -------------------------------
casper.test.begin('Slides state on loading', 1, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/', function() {

		test.assertDoesntExist('.slide.active', 'No active slides');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// ID initialization check
// -------------------------------
casper.test.begin('ID initialization check', 7, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/', function() {

		test.assertExists('[id="1"]', 'There’s #1');
		test.assertExists('[id="2"]', 'There’s #2');
		test.assertExists('[id="3"]', 'There’s #3');

		test.assertDoesntExist('[id="4"]', 'There’s no #4');
		test.assertExists('[id="MyID"]', 'There’s MyID');

		test.assertExists('[id="5"]', 'There’s #5');
		test.assertExists('[id="6"]', 'There’s #6');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Progress bar resizing
// -------------------------------
casper.test.begin('Progress resizing', 6, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/', function() {

		this.sendKeys('body', casper.page.event.key.Right);
		test.assertNot(this.getElementAttribute('.progress div', 'style').indexOf('width: 0%'), '1st step, width is 0%');

		this.sendKeys('body', casper.page.event.key.Right);
		test.assertNot(this.getElementAttribute('.progress div', 'style').indexOf('width: 20%'), '2nd step, width is 20%');

		this.sendKeys('body', casper.page.event.key.Right);
		test.assertNot(this.getElementAttribute('.progress div', 'style').indexOf('width: 40%'), '3rd step, width is 40%');

		this.sendKeys('body', casper.page.event.key.Right);
		test.assertNot(this.getElementAttribute('.progress div', 'style').indexOf('width: 60%'), '4th step, width is 60%');

		this.sendKeys('body', casper.page.event.key.Right);
		test.assertNot(this.getElementAttribute('.progress div', 'style').indexOf('width: 80%'), '5th step, width is 80%');

		this.sendKeys('body', casper.page.event.key.Right);
		test.assertNot(this.getElementAttribute('.progress div', 'style').indexOf('width: 100%'), '6th step, width is 100%');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Full mode by click
// -------------------------------
casper.test.begin('Full mode by click', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/', function() {

		this.click('[id="1"]');

		test.assertExists('body.full', 'Body in Full mode');
		test.assertUrlMatch(/\/\?full#1/, 'Slide #1 in Full mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// First slide activation
// -------------------------------
casper.test.begin('First slide activation', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/', function() {

		this.sendKeys('body', casper.page.event.key.Right);

		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Full mode from active slide by Enter
// -------------------------------
casper.test.begin('First slide activation', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.Enter);

		test.assertExists('body.full', 'Body in Full mode');
		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/\?full#1/, 'Slide #1 in Full mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving forward in List mode
// -------------------------------
casper.test.begin('Moving forward in List mode', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.Right); // 2
		this.sendKeys('body', casper.page.event.key.Right); // 3
		this.sendKeys('body', casper.page.event.key.Right); // 4
		this.sendKeys('body', casper.page.event.key.Right); // 5
		this.sendKeys('body', casper.page.event.key.Right); // 6

		test.assertExists('[id="6"].active', 'Slide #6 is active');
		test.assertUrlMatch(/\/#6/, 'Slide #6 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward in List mode
// -------------------------------
casper.test.begin('Moving backward in List mode', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#6', function() {

		this.sendKeys('body', casper.page.event.key.Left); // 5
		this.sendKeys('body', casper.page.event.key.Left); // 4
		this.sendKeys('body', casper.page.event.key.Left); // 3
		this.sendKeys('body', casper.page.event.key.Left); // 2
		this.sendKeys('body', casper.page.event.key.Left); // 1

		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving forward in Full mode
// -------------------------------
casper.test.begin('Moving forward in Full mode', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#1', function() {

		this.sendKeys('body', casper.page.event.key.Right); // 2
		this.sendKeys('body', casper.page.event.key.Right); // 3
		this.sendKeys('body', casper.page.event.key.Right); // 4
		this.sendKeys('body', casper.page.event.key.Right); // 5
		this.sendKeys('body', casper.page.event.key.Right); // 5.1
		this.sendKeys('body', casper.page.event.key.Right); // 5.2
		this.sendKeys('body', casper.page.event.key.Right); // 5.3
		this.sendKeys('body', casper.page.event.key.Right); // 6

		test.assertExists('[id="6"].active', 'Slide #6 is active');
		test.assertUrlMatch(/\/\?full#6/, 'Slide #6 in Full mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward in Full mode
// -------------------------------
casper.test.begin('Moving backward in Full mode', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#6', function() {

		this.sendKeys('body', casper.page.event.key.Left); // 5
		this.sendKeys('body', casper.page.event.key.Left); // 4
		this.sendKeys('body', casper.page.event.key.Left); // 3
		this.sendKeys('body', casper.page.event.key.Left); // 2
		this.sendKeys('body', casper.page.event.key.Left); // 1

		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/\?full#1/, 'Slide #1 in Full mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Non-existing ID in List mode
// -------------------------------
casper.test.begin('Non-existing ID in List mode', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#404', function() {

		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Non-existing ID in Full mode
// -------------------------------
casper.test.begin('Non-existing ID in Full mode', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#404', function() {

		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/\?full#1/, 'Slide #1 in Full mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// UNDER CONSTRUCTION
// -------------------------------
// casper.test.begin('Entering Full and pressing Back', 1, function suite(test) {
// 	casper.start('http://0.0.0.0:7497/tests/', function() {

// 		this.click('[id="1"]');
// 		this.back();

// 		test.assertExists('body.list', 'Body in List mode');
// 		test.assertExists('[id="1"].active', 'Slide #1 is active');
// 		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

// 	}).run(function() {
// 		this.clear();
// 		test.done();
// 	});
// });