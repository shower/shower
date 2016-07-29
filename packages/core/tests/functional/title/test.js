describe('title', () => {

    beforeEach(() => {
        browser.url('about:blank');
    });

    afterEach(() => {
        browser.sessionStorage('DELETE');
    });

    it('stays unchanged in `list` mode', () => {
        browser.url('/title/list.html');
        browser.getTitle().should.equal('Title');
    });

    it('gets prepended with current slide title in `full` mode', () => {
        browser.url('/title/list.html');
        browser.click('[id="1"]');
        browser.getTitle().should.equal('1 — Title')
    });

    it('doesn’t change in lack of slide title', () => {
        browser.url('/title/list.html');
        browser.click('[id="2"]');
        browser.getTitle().should.equal('Title');
    });

    it('gets stripped from HTML tags while prepending', () => {
        browser.url('/title/list.html');
        browser.click('[id="3"]');
        browser.getTitle().should.equal('3 — Title');
    });

});
