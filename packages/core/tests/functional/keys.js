casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by Right', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Next slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by Down', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Down);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Next slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by Tab', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Tab);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Next slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Not moving forward by Ctrl Tab', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Tab , { modifiers: 'ctrl' });

    }).then(function() {

        test.assertExists('[id="1"].active', 'Current slide #1 is still active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by J', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.J);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Next slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by L', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.L);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Next slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by Space in list mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Space);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Current slide #1 is still active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by Space in slide mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Enter);
        this.sendKeys('body', casper.page.event.key.Space);
        this.sendKeys('body', casper.page.event.key.Escape);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Next slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward by PageDown', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.PageDown);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Next slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by Left', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Left);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Previous slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by Up', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Up);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Previous slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by Shift Tab', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Tab, { modifiers: 'shift' });

    }).then(function() {

        test.assertExists('[id="1"].active', 'Previous slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Not moving backward by Ctrl Shift Tab', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Tab, { modifiers: 'ctrl+shift' });

    }).then(function() {

        test.assertExists('[id="2"].active', 'Current slide #1 is still active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by K', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.K);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Previous slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by H', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.H);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Previous slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by Shift Space in list mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Space, { modifiers: 'shift' });

    }).then(function() {

        test.assertExists('[id="2"].active', 'Current slide #2 is still active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by Shift Space in slide mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Enter);
        this.sendKeys('body', casper.page.event.key.Space, { modifiers: 'shift' });
        this.sendKeys('body', casper.page.event.key.Escape);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Previous slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by PageUp', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.PageUp);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Previous slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by Home', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Home);

    }).then(function() {

        test.assertExists('[id="1"].active', 'First slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward by End', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.End);

    }).then(function() {

        test.assertExists('[id="3"].active', 'Last slide #3 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Entering Full from the first slide by F5', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.F5);

    }).then(function() {

        test.assertExists('[id="1"].active', 'First slide #1 is active');
        test.assertExists('.shower.full', 'Shower in Full mode');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Entering Full from the current slide by Shift F5', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html#2').then(function() {

        this.sendKeys('body', casper.page.event.key.F5, { modifiers: 'shift' });

    }).then(function() {

        test.assertExists('[id="2"].active', 'Current #2 slide is active');
        test.assertExists('.shower.full', 'Shower in Full mode');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Exiting Full by F5', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html?full#1').then(function() {

        this.sendKeys('body', casper.page.event.key.F5);

    }).then(function() {

        test.assertExists('.shower.list', 'Shower in List mode');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Exiting Full by Escape', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/keys.html?full#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Escape);

    }).then(function() {

        test.assertExists('.shower.list', 'Shower in List mode');

    }).run(function() { test.done() }).clear();
});
