casper.test.begin(
// ------------------------------------------------------------------
    'List mode auto-initialisation in lack of mode class', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core.html').then(function() {

        test.assertExists('.shower.list', 'Shower in List mode');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Full mode initialisation by mode class name', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-full.html').then(function() {

        test.assertExists('.shower.full', 'Shower in Full mode');
        test.assertUrlMatch(/\?full/, 'URL in Full mode')

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Automatically initialised slide IDs', 4,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html').then(function() {

        test.assertExists('[id="1"]', 'There’s #1');
        test.assertDoesntExist('[id="2"]', 'There’s no #2');
        test.assertExists('[id="MyID"]', 'There’s MyID');
        test.assertExists('[id="3"]', 'There’s #3');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Entering Full mode by URL query', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html?full').then(function() {

        test.assertExists('.shower.full', 'Shower in Full mode');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Keeping Full mode after reload', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html?full').then(function() {

        this.reload();

    }).then(function() {

        test.assertExists('.shower.full', 'Shower in Full mode');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Slide activated by URL hash', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#1').then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Activating first slide from List mode by Right', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Entering Full mode by click on slide', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html').then(function() {

        this.click('[id="1"]');

    }).then(function() {

        test.assertExists('.shower.full', 'Shower in Full mode');
        test.assertUrlMatch(/html\?full#1/, 'Slide #1 in Full mode URL');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Entering Full mode from active slide by Enter', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Enter);

    }).then(function() {

        test.assertExists('.shower.full', 'Shower in Full mode');
        test.assertUrlMatch(/html\?full#1/, 'Slide #1 in Full mode URL');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward in List mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right); // 2
        this.sendKeys('body', casper.page.event.key.Right); // 3

    }).then(function() {

        test.assertExists('[id="3"].active', 'Slide #3 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward in List mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#3').then(function() {

        this.sendKeys('body', casper.page.event.key.Left); // 2
        this.sendKeys('body', casper.page.event.key.Left); // 1

    }).then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving forward in Full mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html?full#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right); // 2
        this.sendKeys('body', casper.page.event.key.Right); // 3

    }).then(function() {

        test.assertExists('[id="3"].active', 'Slide #3 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Moving backward in Full mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html?full#3').then(function() {

        this.sendKeys('body', casper.page.event.key.Left); // 2
        this.sendKeys('body', casper.page.event.key.Left); // 1

    }).then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Non-existing ID in List mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#404').then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Non-existing ID in Full mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html?full#404').then(function() {

        test.assertExists('[id="1"].active', 'Slide #1 is active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'State classes on initialisation', 2,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html').then(function() {

        test.assertDoesntExist('.active', 'No active slides');
        test.assertDoesntExist('.visited', 'No visited slides');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'State classes with current slide in List mode', 5,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#MyID').then(function() {

        test.assertDoesntExist('[id="1"].active', 'No active class name on slide #1');
        test.assertDoesntExist('[id="1"].visited', 'No visited class name on slide #1');
        test.assertExists('#MyID.active', 'Slide #MyID is active');
        test.assertDoesntExist('[id="3"].active', 'No active class name on slide #3');
        test.assertDoesntExist('[id="3"].visited', 'No visited class name on slide #3');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
   'State classes with current slide in Full mode', 5,
// ------------------------------------------------------------------
   function suite(test) {
   casper.start('tests/functional/core-list.html?full#MyID').then(function() {

        test.assertDoesntExist('[id="1"].active', 'No active class name on slide #1');
        test.assertDoesntExist('[id="1"].visited', 'No visited class name on slide #1');
        test.assertExists('#MyID.active', 'Slide #MyID is active');
        test.assertDoesntExist('[id="3"].active', 'No active class name on slide #3');
        test.assertDoesntExist('[id="3"].visited', 'No visited class name on slide #3');

   }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'State classes while moving forward in List mode', 3,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="1"].visited:not(.active)', 'Slide #1 is visited but not active');
        test.assertExists('#MyID.visited:not(.active)', 'Slide #MyID is visited but not active');
        test.assertExists('[id="3"].active:not(.visited)', 'Slide #MyID is active but not visited');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'State classes while moving forward in Full mode', 3,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html?full#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);

    }).then(function() {

        test.assertExists('[id="1"].visited:not(.active)', 'Slide #1 is visited but not active');
        test.assertExists('#MyID.visited:not(.active)', 'Slide #MyID is visited but not active');
        test.assertExists('[id="3"].active:not(.visited)', 'Slide #MyID is active but not visited');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'State classes while moving backward in List mode', 3,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#3').then(function() {

        this.sendKeys('body', casper.page.event.key.Left);
        this.sendKeys('body', casper.page.event.key.Left);

    }).then(function() {

        test.assertExists('[id="1"].active:not(.visited)', 'Slide #1 is active but not visited');
        test.assertExists('#MyID.visited:not(.active)', 'Slide #MyID is visited but not active');
        test.assertExists('[id="3"].visited:not(.active)', 'Slide #MyID is visited but not active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
   'State classes while moving backward in Full mode', 3,
// ------------------------------------------------------------------
   function suite(test) {
   casper.start('tests/functional/core-list.html?full#3').then(function() {

       this.sendKeys('body', casper.page.event.key.Left);
       this.sendKeys('body', casper.page.event.key.Left);

   }).then(function() {

       test.assertExists('[id="1"].active:not(.visited)', 'Slide #1 is active but not visited');
       test.assertExists('#MyID.visited:not(.active)', 'Slide #MyID is visited but not active');
       test.assertExists('[id="3"].visited:not(.active)', 'Slide #MyID is visited but not active');

   }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'State classes while moving forward and backward in List mode', 3,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Left);
        this.sendKeys('body', casper.page.event.key.Left);

    }).then(function() {

        test.assertExists('[id="1"].visited.active', 'Slide #1 is visited and active');
        test.assertExists('#MyID.visited:not(.active)', 'Slide #MyID is visited but not active');
        test.assertExists('[id="3"].visited:not(.active)', 'Slide #MyID is visited but not active');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'State classes while moving forward and backward in Full mode', 3,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/core-list.html?full#1').then(function() {

        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Right);
        this.sendKeys('body', casper.page.event.key.Left);
        this.sendKeys('body', casper.page.event.key.Left);

    }).then(function() {

        test.assertExists('[id="1"].visited.active', 'Slide #1 is visited and active');
        test.assertExists('#MyID.visited:not(.active)', 'Slide #MyID is visited but not active');
        test.assertExists('[id="3"].visited:not(.active)', 'Slide #MyID is visited but not active');

    }).run(function() { test.done() }).clear();
});
