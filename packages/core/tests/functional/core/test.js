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
        browser.keys('\uE014'); // Right
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
        browser.keys('\uE014'); // Right
        browser.keys('\uE014'); // Right
        browser.isExisting('[id="1"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="ID"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="3"].active').should.equal(true);
    });

    it('changes slide states while moving backward', () => {
        browser.url('/core/list.html#3');
        browser.keys('\uE012'); // Left
        browser.keys('\uE012'); // Left
        browser.isExisting('[id="1"].active').should.equal(true);
        browser.isExisting('[id="ID"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="3"].visited:not(.active)').should.equal(true);
    });

    it('changes slide states while moving forward and backward', () => {
        browser.url('/core/list.html#1');
        browser.keys('\uE014'); // Right
        browser.keys('\uE014'); // Right
        browser.keys('\uE012'); // Left
        browser.keys('\uE012'); // Left
        browser.isExisting('[id="1"].visited.active').should.equal(true);
        browser.isExisting('[id="ID"].visited:not(.active)').should.equal(true);
        browser.isExisting('[id="3"].visited:not(.active)').should.equal(true);
    });

    // History

    it('goes to previous and next slides while moving back and forward in history', () => {
        browser.url('/core/list.html#1');
        browser.keys('\uE014'); // Right
        browser.keys('\uE014'); // Right
        browser.back();
        browser.back();
        browser.forward();
        browser.isExisting('[id="1"].visited').should.equal(true);
        browser.isExisting('[id="ID"].visited.active').should.equal(true);
        browser.isExisting('[id="3"].visited').should.equal(true);
    });

    // Forward

    it('moves forward when Right Arrow key is pressed', () => {
        browser.url('/core/list.html#1');
        browser.keys('\uE014'); // Right
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('moves forward when Down Arrow key is pressed', () => {
        browser.url('/core/list.html#1');
        browser.keys('\uE015'); // Down
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('moves forward when Page Down key is pressed', () => {
        browser.url('/core/list.html#1');
        browser.keys('\uE00F'); // Page Down
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('moves forward when J key is pressed', () => {
        browser.url('/core/list.html#1');
        browser.keys('J');
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('moves forward when L key is pressed', () => {
        browser.url('/core/list.html#1');
        browser.keys('L');
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('moves forward when Enter key is pressed', () => {
        browser.url('/core/list.html#1');
        browser.keys('Enter'); //
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('moves forward when Space key is pressed in Full mode', () => {
        browser.url('/core/list.html');
        browser.click('[id="1"]');
        browser.keys('Space');
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('doesn’t move forward when Space key is pressed in List mode', () => {
        browser.url('/core/list.html#1');
        browser.keys('Space');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    // Backward

    it('moves backward when Left Arrow key is pressed', () => {
        browser.url('/core/list.html#ID');
        browser.keys('\uE012'); // Left
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when Up Arrow key is pressed', () => {
        browser.url('/core/list.html#ID');
        browser.keys('\uE013'); // Up
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when Page Up key is pressed', () => {
        browser.url('/core/list.html#ID');
        browser.keys('\uE00E'); // Page Up
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when K key is pressed', () => {
        browser.url('/core/list.html#ID');
        browser.keys('K');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when H key is pressed', () => {
        browser.url('/core/list.html#ID');
        browser.keys('H');
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when Shift Enter keys are pressed in List mode', () => {
        browser.url('/core/list.html#ID');
        browser.keys(['Shift', 'Enter']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('moves backward when Shift Enter keys are pressed in Full mode', () => {
        browser.url('/core/list.html');
        browser.click('[id="ID"]');
        browser.keys(['Shift', 'Enter']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('doesn’t move backward when Shift Space keys are pressed in List mode', () => {
        browser.url('/core/list.html#ID')
        browser.keys(['Shift', 'Space']);
        browser.isExisting('[id="ID"].active').should.equal(true);
    });

    it('moves backward when Shift Space keys are pressed in Full mode', () => {
        browser.url('/core/list.html');
        browser.click('[id="ID"]');
        browser.keys(['Shift', 'Space']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    // Home
    // End
    // F5
    // Shift F5

    it('keeps page title unchanged in List mode', () => {
        browser.url('/core/title.html');
        browser.getTitle().should.equal('Title');
    });

    it('prepends page title with current slide title in Full mode', () => {
        browser.url('/core/title.html');
        browser.click('[id="1"]');
        browser.getTitle().should.equal('1 — Title')
    });

    it('doesn’t change page title in lack of slide title', () => {
        browser.url('/core/title.html');
        browser.click('[id="2"]');
        browser.getTitle().should.equal('Title');
    });

    it('strips tags from slide title while prepending', () => {
        browser.url('/core/title.html');
        browser.click('[id="3"]');
        browser.getTitle().should.equal('3 — Title');
    });

});
