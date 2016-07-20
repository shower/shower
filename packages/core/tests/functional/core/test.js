describe('core', () => {

    beforeEach(() => {
        browser.url('about:blank');
    });

    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    // Initialisation

    it('uses List mode in lack of any state', () => {
        browser.url('/core/none.html');
        browser.isExisting('.shower.list').should.equal(true);
    });

    it('stays in List mode if `list` state is present', () => {
        browser.url('/core/list.html');
        browser.isExisting('.shower.list').should.equal(true);
    });

    it('stays in Full mode if `full` state is present', () => {
        browser.url('/core/full.html');
        browser.isExisting('.shower.full').should.equal(true);
    });

    it('keeps Full mode after reload', () => {
        browser.url('/core/full.html');
        browser.refresh();
        browser.isExisting('.shower.full').should.equal(true);
    });

    it('adds ID for all slides if it’s not alredy set', () => {
        browser.url('/core/list.html');
        browser.isExisting('[id="1"]').should.equal(true);
        browser.isExisting('[id="2"]').should.equal(false);
        browser.isExisting('[id="ID"]').should.equal(true);
        browser.isExisting('[id="3"]').should.equal(true);
    });

    it('doesn’t set any slide states on initialisation', () => {
        browser.url('/core/list.html');
        browser.isExisting('.active').should.equal(false);
        browser.isExisting('.visited').should.equal(false);
    });

    it('doesn’t set any `visited` slide states and activates only current slide', () => {
        browser.url('/core/list.html#ID');
        browser.isExisting('[id="1"]:not(.active):not(.visited)').should.equal(true);
        browser.isExisting('[id="ID"].active:not(.visited)').should.equal(true);
        browser.isExisting('[id="3"]:not(.active):not(.visited)').should.equal(true);
    });

    // URL

    it('activates a slide if its ID is present in URL', () => {
        browser.url('/core/list.html#ID');
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('changes non-existing ID to ID of the first slide in URL', () => {
        browser.url('/core/list.html#404');
        browser.getUrl().should.match(/#1/, 'URL in Full mode')
    });

    it('activates the first slide if ID in URL doesn’t exist', () => {
        browser.url('/core/list.html#404');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    // Action

    it('activates the first slide in the List mode if Right Arrow key is pressed', () => {
        browser.url('/core/list.html');
        browser.keys(['Right arrow']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('goes to Full mode when a slide is clicked', () => {
        browser.url('/core/list.html');
        browser.click('[id="1"]');
        browser.isExisting('.shower.full').should.equal(true);
    });

    // Traverse

    it('changes slide states while moving forward', () => {
        browser.url('/core/list.html#1');
        browser.keys(['Right arrow']); // 2
        browser.keys(['Right arrow']); // 3
        browser.isExisting('[id="1"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="ID"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="3"].active').should.equal(true);
    });

    it('changes slide states while moving backward', () => {
        browser.url('/core/list.html#3');
        browser.keys(['Left arrow']); // 2
        browser.keys(['Left arrow']); // 1
        browser.isExisting('[id="1"].active').should.equal(true);
        browser.isExisting('[id="ID"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="3"].visited:not(.active)').should.equal(true);
    });

    it('changes slide states while moving forward and backward', () => {
        browser.url('/core/list.html#1');
        browser.keys(['Right arrow']); // 2
        browser.keys(['Right arrow']); // 3
        browser.keys(['Left arrow']); // 2
        browser.keys(['Left arrow']); // 1
        browser.isExisting('[id="1"].visited.active').should.equal(true);
        browser.isExisting('[id="ID"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="3"].visited:not(.active)').should.equal(true);
    });

    // History

    // history.html#1
    // Right
    // back()

    // history.html#1
    // Right
    // Right
    // back()
    // back()
    // forward()

    // Keys

    // keys.html#1
    // Right
    // keys.html#1
    // Down
    // keys.html#1
    // Tab
    // keys.html#1
    // Ctrl Tab
    // keys.html#1
    // J
    // keys.html#1
    // L
    // keys.html#1
    // Space
    // keys.html#1
    // PageDown
    // keys.html#2
    // Left
    // keys.html#2
    // Up
    // keys.html#2
    // Shift Tab
    // keys.html#2
    // Ctrl Shift Tab
    // keys.html#2
    // K
    // keys.html#2
    // H
    // keys.html#2
    // Shift Space
    // keys.html#2
    // PageUp
    // keys.html#2
    // Home
    // keys.html#2
    // End
    // keys.html#2
    // F5
    // keys.html#2
    // Shift F5
    // keys.html#2
    // Enter
    // keys.html#2
    // Shift Enter

    // Title

    it('keeps page title unchanged in List mode', () => {
        browser.url('/core/title.html');
        browser.getTitle().should.equal('Title')
    });

    it('prepends page title with current slide title in Full mode', () => {
        browser.url('/core/title.html');
        browser.click('[id="1"]');
        browser.getTitle().should.equal('1 — Title')
    });

    it('doesn’t change page title in lack of slide title', () => {
        browser.url('/core/title.html');
        browser.click('[id="2"]');
        browser.getTitle().should.equal('Title')
    });

    it('strips tags from slide title while prepending', () => {
        browser.url('/core/title.html');
        browser.click('[id="3"]');
        browser.getTitle().should.equal('3 — Title')
    });

});
