casper.test.begin(
// ------------------------------------------------------------------
    'No page title initialization in List mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/title.html').then(function() {

        test.assertTitle('Title', 'Page title is not changed');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Page title initialization in Full mode', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/title.html?full#1').then(function() {

        test.assertTitle('1 — Title', 'Page title is prepended with slide title');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'No slide title, no page title', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/title.html?full#2').then(function() {

        test.assertTitle('Title', 'Original page title in lack of slide title');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
    'Stripping tags from slide title', 1,
// ------------------------------------------------------------------
    function suite(test) {
    casper.start('tests/functional/title.html?full#4').then(function() {

        test.assertTitle('4 — Title', 'Page title is free from tags left from slide title');

    }).run(function() { test.done() }).clear();
});

casper.test.begin(
// ------------------------------------------------------------------
   'Changing page title', 1,
// ------------------------------------------------------------------
   function suite(test) {
   casper.start('tests/functional/title.html?full#1').then(function() {

       this.sendKeys('body', casper.page.event.key.Right); // 2
       this.sendKeys('body', casper.page.event.key.Right); // 3

   }).then(function() {

       test.assertTitle('3 — Title', 'Page title is prepended with slide #3 title');

   }).run(function() { test.done() }).clear();
});

//casper.test.begin(
//// ------------------------------------------------------------------
//    'Switching from Full to List mode', 1,
//// ------------------------------------------------------------------
//    function suite(test) {
//    casper.start('tests/functional/title.html?full#1').then(function() {
//
//        this.sendKeys('body', casper.page.event.key.Esc); // List
//
//    }).then(function() {
//
//        test.assertTitle('Title', 'Default page title in List mode');
//
//    }).run(function() { test.done() }).clear();
//});
