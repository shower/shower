casper.test.begin(
// ------------------------------------------------------------------
    'Using timer in List mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/timer.html#2').then(function() {

        this.wait(4000);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Slide #2 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Using timer in Full mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/timer.html?full#2').then(function() {

        this.wait(4000);

    }).then(function() {

        test.assertExists('[id="3"].active', 'Slide #3 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Skipping timer by Left', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/timer.html?full#2').then(function() {

        this.wait(2000);
        this.sendKeys('body', casper.page.event.key.Left);
        this.wait(4000);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Skipping timer by Right', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/timer.html?full#2').then(function() {

        this.wait(2000);
        this.sendKeys('body', casper.page.event.key.Right);
        this.wait(4000);

    }).then(function() {

        test.assertExists('[id="3"].active', 'Slide #3 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Going through nexts using timer', 4,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/timer.html?full#4').then(function() {

        this.wait(4000);

    }).then(function() {

        test.assertExists('[id="5"].active', 'Slide #5 is .active');
        test.assertExists('[id="4"] li:nth-child(1).active', 'Item #1 on Slide #4 is .active');
        test.assertExists('[id="4"] li:nth-child(2).active', 'Item #2 on Slide #4 is .active');
        test.assertExists('[id="4"] li:nth-child(3).active', 'Item #3 on Slide #4 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Finishing timed nexts by Right', 4,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/timer.html?full#4').then(function() {

        this.wait(2000, function () {
            this.sendKeys('body', casper.page.event.key.Right);
            this.sendKeys('body', casper.page.event.key.Right);
        });

    }).then(function() {

        test.assertExists('[id="5"].active', 'Slide #5 is .active');
        test.assertExists('[id="4"] li:nth-child(1).active', 'Item #1 on Slide #4 is .active');
        test.assertExists('[id="4"] li:nth-child(2).active', 'Item #2 on Slide #4 is .active');
        test.assertExists('[id="4"] li:nth-child(3).active', 'Item #3 on Slide #4 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Stopping timer by Right', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/timer.html?full#4').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.wait(4000);

    }).then(function() {

        test.assertExists('[id="4"].active', 'Slide #4 is .active');
        test.assertExists('[id="4"] li:nth-child(1).active', 'Item #1 on Slide #4 is .active');

    }).run(function() { test.done() }).clear();
});
