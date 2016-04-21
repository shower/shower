describe('core', () => {

    beforeEach(() => {
        browser.url('about:blank');
    });

    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    it('uses List mode in lack of any global state', () => {
        browser.url('/core/none.html');
        browser.isExisting('.shower.list').should.equal(true);
    });

    it('stays in List mode if global `list` state is present', () => {
        browser.url('/core/list.html');
        browser.isExisting('.shower.list').should.equal(true);
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

    it('activates the first slide in the List mode if Right arrow key is pressed', () => {
        browser.url('/core/list.html');
        browser.keys(['Right arrow']);
        browser.isExisting('[id="1"].active').should.equal(true);
    });

    it('goes to Full mode when Enter key is pressed in the list mode with an active slide', () => {
        browser.url('/core/list.html#1');
        browser.keys(['Enter']);
        browser.isExisting('.shower.full').should.equal(true);
    });

    it('goes to Full mode when a slide is clicked', () => {
        browser.url('/core/list.html');
        browser.click('[id="1"]');
        browser.isExisting('.shower.full').should.equal(true);
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

});
