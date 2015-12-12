casper.test.begin(
// ------------------------------------------------------------------
    'Switching slides by history back', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/history.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.back();

    }).then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Switching slides by history back and forward', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/history.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.back();
        this.back();
        this.forward();

    }).then(function() {

        test.assertExists('[id="2"].active', 'Slide #2 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Switching back to Full mode by Back', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/history.html').then(function() {

        this.click('[id="1"]');
        this.back();

    }).then(function() {

        test.assertExists('.shower.list', 'Shower in List mode');

    }).run(function() { test.done() }).clear();
});
