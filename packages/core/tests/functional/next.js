casper.test.begin(
// ------------------------------------------------------------------
    'Using next in List mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="3"].active', 'Slide #3 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Using next in Full mode', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        // test.info(this.page.content)
        test.assertExists('[id="2"].active', 'Slide #2 is .active');
        test.assertExists('[id="2"] li:nth-child(1).active', 'Item #1 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Next class name is completed by active', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="2"] li:nth-child(1).next.active', 'Item #1 is .next and .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Completing next', 4,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Slide #2 is .active');
        test.assertExists('[id="2"] li:nth-child(1).active', 'Item #1 is .active');
        test.assertExists('[id="2"] li:nth-child(2).active', 'Item #2 is .active');
        test.assertExists('[id="2"] li:nth-child(3).active', 'Item #3 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Going back through slide with next', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#3').then(function() {

        this.sendKeys('body', casper.page.event.key.Left);
        this.sendKeys('body', casper.page.event.key.Left);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is .active');
        test.assertDoesntExist('[id="2"] li.active', 'There’s no .active items on slide #2');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Returning in next while it’s not finished', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Left);
        this.sendKeys('body', casper.page.event.key.Left);

    }).then(function() {

        test.assertExists('[id="2"].active', 'Slide #2 is .active');
        test.assertDoesntExist('[id="2"] li.active', 'There’s no .active items on slide #2');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Returning in next when it’s finished', 4,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Left);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is .active');
        test.assertExists('[id="2"] li:nth-child(1).active', 'Item #1 on Slide #2 is .active');
        test.assertExists('[id="2"] li:nth-child(2).active', 'Item #2 on Slide #2 is .active');
        test.assertExists('[id="2"] li:nth-child(3).active', 'Item #3 on Slide #2 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Going back and forward through finished next', 4,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Left);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="3"].active', 'Slide #3 is .active');
        test.assertExists('[id="2"] li:nth-child(1).active', 'Item #1 on Slide #2 is .active');
        test.assertExists('[id="2"] li:nth-child(2).active', 'Item #2 on Slide #2 is .active');
        test.assertExists('[id="2"] li:nth-child(3).active', 'Item #3 on Slide #2 is .active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Resetting next with reload', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/next.html?full#2').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.reload();

    }).then(function() {

        test.assertDoesntExist('[id="2"] li.active', 'There’s no .active items on slide #2');

    }).run(function() { test.done() }).clear();
});
