describe('core', () => {
    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    it('enables list mode in lack of any state class', () => {
        browser.url('/core/none.html');
        browser.isExisting('.shower.list').should.equal(true);
    });

    it('stays in list mode if `list` class name is present', () => {
        browser.url('/core/list.html');
        browser.isExisting('.shower.list').should.equal(true);
    });

    it('enables IDs for slides if it’s not already set', () => {
        browser.url('/core/list.html');
        browser.isExisting('[id="1"]').should.equal(true);
        browser.isExisting('[id="2"]').should.equal(false);
        browser.isExisting('[id="ID"]').should.equal(true);
        browser.isExisting('[id="3"]').should.equal(true);
    });
});
