// -------------------------------
// Moving forward by Right
// -------------------------------
casper.test.begin('Moving forward by Right', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.Right);

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving forward by Down
// -------------------------------
casper.test.begin('Moving forward by Down', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.Down);

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving forward by J
// -------------------------------
casper.test.begin('Moving forward by J', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.J);

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving forward by L
// -------------------------------
casper.test.begin('Moving forward by L', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.L);

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving forward by Space
// -------------------------------
casper.test.begin('Moving forward by Space', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.Space);

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving forward by PageDown
// -------------------------------
casper.test.begin('Moving forward by PageDown', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1', function() {

		this.sendKeys('body', casper.page.event.key.PageDown);

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward by Left
// -------------------------------
casper.test.begin('Moving backward by Left', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2', function() {

		this.sendKeys('body', casper.page.event.key.Left);

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward by Up
// -------------------------------
casper.test.begin('Moving backward by Up', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2', function() {

		this.sendKeys('body', casper.page.event.key.Left);

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward by K
// -------------------------------
casper.test.begin('Moving backward by K', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2', function() {

		this.sendKeys('body', casper.page.event.key.K);

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward by H
// -------------------------------
casper.test.begin('Moving backward by H', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2', function() {

		this.sendKeys('body', casper.page.event.key.H);

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward by Shift Space
// -------------------------------
casper.test.begin('Moving backward by Shift Space', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2', function() {

		this.sendKeys('body', casper.page.event.key.Space, { modifiers: 'shift' });

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving backward by PageUp
// -------------------------------
casper.test.begin('Moving backward by PageUp', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2', function() {

		this.sendKeys('body', casper.page.event.key.PageUp);

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving to the first slide by Home
// -------------------------------
casper.test.begin('Moving to the first slide by Home', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID', function() {

		this.sendKeys('body', casper.page.event.key.Home);

		test.assertExists('[id="1"].active', 'First slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Moving to the last slide by End
// -------------------------------
casper.test.begin('Moving to the first slide by End', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID', function() {

		this.sendKeys('body', casper.page.event.key.End);

		test.assertExists('[id="6"].active', 'Last slide #6 is active');
		test.assertUrlMatch(/\/#6/, 'Slide #6 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Entering Full by F5
// -------------------------------
casper.test.begin('Entering Full by F5', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID', function() {

		this.sendKeys('body', casper.page.event.key.F5);

		test.assertExists('body.full', 'Body in Full mode');
		test.assertExists('[id="1"].active', 'First slide #1 is active');
		test.assertUrlMatch(/\/\?full#1/, 'Slide #1 in Full mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Entering Full by Shift F5
// -------------------------------
casper.test.begin('Entering Full by Shift F5', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID', function() {

		this.sendKeys('body', casper.page.event.key.F5, { modifiers: 'shift' });

		test.assertExists('body.full', 'Body in Full mode');
		test.assertExists('[id="MyID"].active', 'Current slide #MyID is active');
		test.assertUrlMatch(/\/\?full#MyID/, 'Slide #MyID in Full mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Exiting Full by F5
// -------------------------------
casper.test.begin('Exiting Full by F5', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#1', function() {

		this.sendKeys('body', casper.page.event.key.F5);

		test.assertExists('body.list', 'Body in List mode');
		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});
// -------------------------------
// Exiting Full by Esc
// -------------------------------
casper.test.begin('Exiting Full by Esc', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#1', function() {

		this.sendKeys('body', casper.page.event.key.Escape);

		test.assertExists('body.list', 'Body in List mode');
		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() {
		this.clear();
		test.done();
	});
});