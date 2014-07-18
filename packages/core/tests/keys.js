// -------------------------------
// Moving forward by Right
// -------------------------------
casper.test.begin('Moving forward by Right', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.Right);

	}).then(function() {

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving forward by Down
// -------------------------------
casper.test.begin('Moving forward by Down', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.Down);

	}).then(function() {

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving forward by Tab
// -------------------------------
casper.test.begin('Moving forward by Tab', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.Tab);

	}).then(function() {

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Not moving forward by Ctrl Tab
// -------------------------------
casper.test.begin('Not moving forward by Ctrl Tab', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.Tab , { modifiers: 'ctrl' });

	}).then(function() {

		test.assertExists('[id="1"].active', 'Current slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving forward by J
// -------------------------------
casper.test.begin('Moving forward by J', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.J);

	}).then(function() {

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving forward by L
// -------------------------------
casper.test.begin('Moving forward by L', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.L);

	}).then(function() {

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving forward by Space
// -------------------------------
casper.test.begin('Moving forward by Space', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.Space);

	}).then(function() {

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving forward by PageDown
// -------------------------------
casper.test.begin('Moving forward by PageDown', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#1').then(function() {

		this.sendKeys('body', casper.page.event.key.PageDown);

	}).then(function() {

		test.assertExists('[id="2"].active', 'Next slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving backward by Left
// -------------------------------
casper.test.begin('Moving backward by Left', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.Left);

	}).then(function() {

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving backward by Up
// -------------------------------
casper.test.begin('Moving backward by Up', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.Left);

	}).then(function() {

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving backward by Shift Tab
// -------------------------------
casper.test.begin('Moving backward by Shift Tab', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.Tab, { modifiers: 'shift' });

	}).then(function() {

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Not moving backward by Ctrl Shift Tab
// -------------------------------
casper.test.begin('Not moving backward by Ctrl Shift Tab', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.Tab, { modifiers: 'ctrl+shift' });

	}).then(function() {

		test.assertExists('[id="2"].active', 'Current slide #2 is active');
		test.assertUrlMatch(/\/#2/, 'Slide #2 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving backward by K
// -------------------------------
casper.test.begin('Moving backward by K', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.K);

	}).then(function() {

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving backward by H
// -------------------------------
casper.test.begin('Moving backward by H', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.H);

	}).then(function() {

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving backward by Shift Space
// -------------------------------
casper.test.begin('Moving backward by Shift Space', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.Space, { modifiers: 'shift' });

	}).then(function() {

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving backward by PageUp
// -------------------------------
casper.test.begin('Moving backward by PageUp', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#2').then(function() {

		this.sendKeys('body', casper.page.event.key.PageUp);

	}).then(function() {

		test.assertExists('[id="1"].active', 'Previous slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving to the first slide by Home
// -------------------------------
casper.test.begin('Moving to the first slide by Home', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID').then(function() {

		this.sendKeys('body', casper.page.event.key.Home);

	}).then(function() {

		test.assertExists('[id="1"].active', 'First slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Moving to the last slide by End
// -------------------------------
casper.test.begin('Moving to the first slide by End', 2, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID').then(function() {

		this.sendKeys('body', casper.page.event.key.End);

	}).then(function() {

		test.assertExists('[id="6"].active', 'Last slide #6 is active');
		test.assertUrlMatch(/\/#6/, 'Slide #6 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Entering Full by F5
// -------------------------------
casper.test.begin('Entering Full by F5', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID').then(function() {

		this.sendKeys('body', casper.page.event.key.F5);

	}).then(function() {

		test.assertExists('body.full', 'Body in Full mode');
		test.assertExists('[id="1"].active', 'First slide #1 is active');
		test.assertUrlMatch(/\/\?full#1/, 'Slide #1 in Full mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Entering Full by Shift F5
// -------------------------------
casper.test.begin('Entering Full by Shift F5', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/#MyID').then(function() {

		this.sendKeys('body', casper.page.event.key.F5, { modifiers: 'shift' });

	}).then(function() {

		test.assertExists('body.full', 'Body in Full mode');
		test.assertExists('[id="MyID"].active', 'Current slide #MyID is active');
		test.assertUrlMatch(/\/\?full#MyID/, 'Slide #MyID in Full mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Exiting Full by F5
// -------------------------------
casper.test.begin('Exiting Full by F5', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#1').then(function() {

		this.sendKeys('body', casper.page.event.key.F5);

	}).then(function() {

		test.assertExists('body.list', 'Body in List mode');
		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
// -------------------------------
// Exiting Full by Esc
// -------------------------------
casper.test.begin('Exiting Full by Esc', 3, function suite(test) {
	casper.start('http://0.0.0.0:7497/tests/?full#1').then(function() {

		this.sendKeys('body', casper.page.event.key.Escape);

	}).then(function() {

		test.assertExists('body.list', 'Body in List mode');
		test.assertExists('[id="1"].active', 'Slide #1 is active');
		test.assertUrlMatch(/\/#1/, 'Slide #1 in List mode URL');

	}).run(function() { test.done() }).clear();
});
