describe('core', function() {
    beforeEach(function() {
        //force page reload
        browser.url('about:blank');
    });

    it('List mode auto-initialisation in lack of mode class', function() {
        browser.url('/core.html');
        browser.waitForVisible('.shower.list');
    });

    // test seems to be outdated
    xit('Full mode initialisation by mode class name', function() {
        browser.url('/core-full.html');
        browser.waitForVisible('.shower.full');
        browser.getUrl().should.match(/\?full/, 'URL in Full mode')
    });

    it('Automatically initialised slide IDs', function() {
        browser.url('/core-list.html');
        browser.element('[id="1"]');
        browser.elements('[id="2"]').value.should.have.lengthOf(0);
        browser.element('[id="MyID"]');
        browser.element('[id="3"]');
    });

    // test seems to be outdated
    xit('Entering Full mode by URL query', function() {
        browser.url('/core-list.html?full');
        browser.element('.shower.full');
    });

    // test seems to be outdated
    xit('Keeping Full mode after reload', function() {
        browser.url('/core-list.html?full')
        browser.refresh();
        browser.element('.shower.full');
    });

    it('Slide activated by URL hash', function() {
        browser.url('/core-list.html#1');
        browser.element('[id="1"].active');
    });

    // TODO: figure out why it doesn't work
    xit('Activating first slide from List mode by Right', function() {
        browser.url('/core-list.html');
        browser.waitForVisible('[id="1"]');
        browser.keys(['Right arrow']);
        browser.element('[id="1"].active');
    });

    it('Entering Full mode by click on slide', function() {
        browser.url('/core-list.html');
        browser.click('[id="1"]');
        browser.element('.shower.full');
        //?full query param seems to be not supported anymore
        // browser.getUrl().should.match(/html\?full#1/, 'Slide #1 in Full mode URL');
    });

    it('Entering Full mode from active slide by Enter', function() {
        browser.url('/core-list.html#1');
        browser.keys(['Enter']);
        browser.element('.shower.full');
        //?full query param seems to be not supported anymore
        // browser.getUrl().should.match(/html\?full#1/, 'Slide #1 in Full mode URL');
    });

    ['list', 'full'].forEach(function(mode) {
        var page = '/core-' + mode + '.html';
        describe(mode + ' mode: ', function() {
            it('Moving forward', function() {
                browser.url(page + '#1');
                browser.keys(['Right arrow']); // 2
                browser.keys(['Right arrow']); // 3
                browser.element('[id="3"].active');
            });

            it('Moving backward', function() {
                browser.url(page + '#3');
                browser.keys(['Left arrow']); // 2
                browser.keys(['Left arrow']); // 1
                browser.element('[id="1"].active');
            });

            it('Non-existing ID', function() {
                browser.url(page + '#404');
                browser.element('[id="1"].active');
            });

            // browser inherits state from previous tests
            xit('State classes on initialisation', function() {
                browser.url(page);
                // console.log(browser.elementIdAttribute(browser.element('.active'), 'id')
                browser.elements('.active').value.should.have.lengthOf(0);
                browser.elements('.visited').value.should.have.lengthOf(0);
            });

            xit('State classes with current slide', function() {
                browser.url(page + '#MyID');
                browser.element('#MyID.active');
                // TODO: figure out why slide #1 marked as visible
                browser.elements('.visited').value.should.have.lengthOf(0);
                browser.elements('[id="1"].active').value.should.have.lengthOf(0);
                browser.elements('[id="3"].active').value.should.have.lengthOf(0);
            });

            it('State classes while moving forward', function() {
                browser.url('/core-list.html#1');
                browser.keys(['Right arrow']); // 2
                browser.keys(['Right arrow']); // 3
                browser.element('[id="1"].visited:not(.active)');
                browser.element('#MyID.visited:not(.active)');
                browser.element('[id="3"].active:not(.visited)');
            });

            it('State classes while moving backward', function() {
                browser.url(page + '#3');
                browser.keys(['Left arrow']); // 2
                browser.keys(['Left arrow']); // 1
                // TODO: figure out why slide #1 marked as visible
                browser.element('[id="1"].active');
                browser.element('#MyID.visited:not(.active)');
                browser.element('[id="3"].visited:not(.active)');
            });

            it('State classes while moving forward and backward', function() {
                browser.url(page + '#1');
                browser.keys(['Right arrow']); // 2
                browser.keys(['Right arrow']); // 3
                browser.keys(['Left arrow']); // 2
                browser.keys(['Left arrow']); // 1
                browser.element('[id="1"].visited.active');
                browser.element('#MyID.visited:not(.active)');
                browser.element('[id="3"].visited:not(.active)');
            });
        });
    });
});
